# Checkout — Address Book (design)

## Purpose

Stand up the `checkout` route with a working, end-to-end address book: list saved
addresses, add/edit/delete an address, select one address to ship to for the current
order, and mark an address as the account's primary/default. Order summary is a light
read-only panel built on the existing cart data. Payment and order placement are out of
scope for this pass.

## Context

- `src/app/[locale]/(pages)/checkout/page.tsx` currently a one-line placeholder.
- Backend contract (given):
  - `GET /api/addresses`, `POST /api/addresses`
  - `GET|PATCH|DELETE /api/addresses/{id}`
  - `Address` shape:
    ```json
    {
      "id": "uuid",
      "userId": "uuid",
      "title": "Home",
      "isPrimary": true,
      "city": "New York",
      "street": "123 Main St, Apt 4",
      "phone": "+1234567890",
      "latitude": "40.7128",
      "longitude": "-74.006",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```
  - Response envelope: `{ status, code, payload: { address: Address } }` for
    single-item responses (confirmed from the POST example). The list (`GET
    /api/addresses`) response body wasn't given — this design assumes it mirrors
    the same envelope pluralized: `{ status, code, payload: { addresses: Address[] } }`.
    **This is an assumption, to be confirmed against the real backend response**; the
    fix if wrong is a one-line change to `AddressesResponse` in
    `lib/types/api.d.ts`.
- Established repo conventions this design follows (verified against
  `features/notifications` and `features/auth`, not the generic
  feature-based-folder-architecture template, since the two disagree and existing
  code wins):
  - Feature-level hooks live in a flat `hooks/` folder mixing queries and mutations
    (not split into `lib/queries` / `lib/mutations` — no feature in this repo does that).
  - Server-side calls to the backend are `'use server'` functions in
    `lib/actions/<resource>.action.ts`, using `apiRequest` (from
    `shared/lib/utils/request.util.ts`) + `getNextAuthToken()` for the bearer token.
  - Next.js route handlers under `app/api/**` are thin — they call into the
    feature's action/service layer and forward the response, mirroring
    `app/api/notifications/route.ts` and `app/api/notifications/[notificationId]/route.ts`.
  - Client data hooks are `'use client'` files using `@tanstack/react-query`,
    fetching the internal `/api/...` route (not the backend directly).
  - Forms use `react-hook-form` + `zod` via `@hookform/resolvers/zod`, with the
    shared `FormField` / `PhoneFormField` / `Field`/`FieldLabel`/`FieldError`
    primitives from `shared/components`.
  - Feature folders export a root `index.ts` barrel; `lib/actions`, `lib/schemas`,
    `lib/types` each get their own barrel too, matching `features/auth`.

## Architecture

```
src/features/checkout/
  components/
    checkout-view.tsx          # composes AddressBook + OrderSummary; rendered by the route
    address-book.tsx           # list, empty state, selection, "Add address" entry point
    address-card.tsx           # one address: radio-select, Edit, Delete, Set primary
    address-form-modal.tsx     # Dialog wrapper; create/edit modes
    address-form.tsx           # title/city/street/phone/isPrimary fields
    order-summary.tsx          # read-only cart items + total, disabled "Place order" stub
    index.ts
  hooks/
    use-addresses.ts           # useQuery — GET list
    use-create-address.ts      # useMutation — POST
    use-update-address.ts      # useMutation — PATCH (also drives "set primary")
    use-delete-address.ts      # useMutation — DELETE
    use-address-form.ts        # react-hook-form + zod; mode-aware (create | edit)
    index.ts
  lib/
    actions/
      addresses.action.ts      # 'use server': getAddresses, createAddress, updateAddress, deleteAddress
      index.ts
    schemas/
      address.schema.ts        # zod schema, shared by create & edit
      index.ts
    types/
      api.d.ts                 # Address, AddressesResponse, AddressResponse, payload/body types
      index.ts
    constants/
      index.ts                 # ADDRESSES_QUERY_KEY = ['addresses']

src/app/api/addresses/route.ts               # GET, POST
src/app/api/addresses/[addressId]/route.ts   # GET, PATCH, DELETE
src/app/[locale]/(pages)/checkout/page.tsx   # thin — renders <CheckoutView />

src/shared/components/ui/dialog.tsx  # new generic primitive (base-ui Dialog), same
                                      # pattern as shared/components/ui/dropdown-menu.tsx.
                                      # Belongs in shared/ui immediately (a generic
                                      # design-system primitive like Button/Checkbox,
                                      # not feature-specific), even though checkout is
                                      # its first consumer.
```

## Data flow

1. `useAddresses()` (`hooks/use-addresses.ts`) fetches `/api/addresses` on mount via
   `useQuery({ queryKey: ADDRESSES_QUERY_KEY, ... })`.
2. `app/api/addresses/route.ts` `GET` calls `getAddresses()` from
   `lib/actions/addresses.action.ts`, which reads the NextAuth bearer token and calls
   the backend via `apiRequest`, returning its JSON body as-is.
3. `CheckoutView` holds `selectedAddressId` (local `useState`, no persistence) and
   passes it + a setter down to `AddressBook`. On first successful load, if nothing is
   selected yet, it defaults to the primary address (`addresses.find(a =>
   a.isPrimary)`), falling back to the first address if none is primary.
4. Selecting a card is a pure client-side radio selection — no request. It's "which
   address this order ships to," independent of `isPrimary`.
5. "Set as primary" (a small action on a non-primary card) and the `isPrimary`
   checkbox inside the add/edit form both call the same `useUpdateAddress` mutation
   (`PATCH /api/addresses/{id}` with `{ isPrimary: true }` or the full edited fields).
   There is no separate "set primary" hook.
6. Create/edit share one `AddressForm` component and one `useAddressForm(mode,
   address?)` hook: `mode: 'create'` calls `useCreateAddress`, `mode: 'edit'` calls
   `useUpdateAddress` pre-filled from the passed `address`. On success: close the
   modal, `toast.success(...)`, and the mutation's `onSuccess` invalidates
   `ADDRESSES_QUERY_KEY` so the list refetches.
7. Delete asks no confirmation dialog in this pass (out of scope — flagged below);
   `useDeleteAddress` invalidates the list on success. If the deleted address was
   selected, `CheckoutView` re-defaults selection to the new primary/first address.

## Form fields

`title` (text, required), `city` (text, required), `street` (text, required), `phone`
(via the existing `PhoneFormField` — same `{ phone, country }` → E.164 string pattern
used in registration), `isPrimary` (checkbox, optional, default `false`).
**`latitude`/`longitude` are omitted from the form entirely** for this pass, per
decision — not collected, not sent.

## States

- **Loading:** skeleton/spinner while `useAddresses` is pending.
- **Empty:** no addresses yet — empty-state message + prominent "Add address" CTA in
  place of the list.
- **Error:** inline error message with the thrown error's text (matches the
  `mutation.isError` pattern already used in `LoginForm`).
- **Mutation errors** (create/update/delete): surfaced via `toast.error(...)`, not
  inline, since they're transient actions on an already-loaded list.

## Explicitly out of scope for this pass

- Latitude/longitude capture or a map picker.
- Payment method selection.
- Placing the order / order totals beyond a simple cart-items sum.
- Delete confirmation dialog (delete is a direct action for now).
- Address list pagination (addresses are assumed to be a small, unpaginated set —
  matches the shape of the example response).

## Testing

- Type-check (`tsc`/Next build) and lint clean.
- Manual verification in the browser: list loads, add/edit/delete round-trip against
  the real backend, selection defaults to primary and survives a refetch, set-primary
  updates the badge on the right card, empty state renders with zero addresses.
