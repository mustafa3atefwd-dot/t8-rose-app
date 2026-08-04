# Checkout — Address Book (design)

> **Revision 2.** The original version of this doc (address book as an inline
> page section, no map, "set primary" as an explicit action) is superseded by
> this revision. The user supplied a detailed ticket (user story, Gherkin
> acceptance scenarios, exact i18n strings, states, edge cases) partway
> through implementation, which changes the feature shape substantially: it's
> now a **modal** with a **2-step add/edit wizard** (contact details, then a
> Google Maps pin), not an inline section. Two already-implemented tasks
> (address types, i18n messages) are revised in place under the new plan
> rather than discarded, since most of their content still applies.

## Purpose

A "My Addresses" modal, reachable from the checkout page, where a user can
list, add, edit, and delete their saved shipping addresses, and pick one to
ship the current order to. Adding/editing an address is a 2-step wizard:
step 1 collects a label, city, street address, and phone; step 2 requires
placing a pin on a Google Map (drag, click, or "Find My Location") before the
address can be saved. Order summary remains a light read-only panel next to
the address section, unchanged from the original design.

## Source of truth

The user provided this ticket verbatim; it is the acceptance contract for
this feature and takes precedence over any earlier assumption in this doc:

- **User story:** manage saved shipping addresses in one place; add, edit,
  remove; pick one at checkout.
- **Tasks:** modal with address list (name label, full address, contact
  number, Edit/Delete per entry); 2-step add flow (step 1: city, address
  details, phone; step 2: Google Maps embed with draggable pin, "Find My
  Location", Add Address button, Back to Step 1); a step progress indicator;
  edit reuses the same 2-step form pre-filled; delete has inline
  confirmation; the list refreshes after add/edit/delete; Close dismisses
  without changes.
- **Validation:** step 1 fields all required, phone in valid format; step 2
  requires a placed pin before submit; edit uses the same validation as add.
- **Permissions:** address management requires an authenticated user —
  already satisfied structurally: `/checkout` is unconditionally
  auth-gated by `src/proxy.ts` (redirects to `/login` if there's no session
  token), so no additional gating code is needed for this feature.
- **States:** maps-loading spinner in the map container; empty state
  ("No saved addresses" + Add button); geolocation-denied error (exact
  copy given); success toasts (exact copy given) that return the modal to
  the list view.
- **Edge cases:** deleting the last address shows the empty state with its
  Add CTA; Cancel during edit returns to the list with no changes saved;
  offline map load fails gracefully with an error message; navigating Step 2
  → Back → Step 1 retains previously entered values.
- **i18n:** an explicit `address.*` key table (given verbatim, both
  languages) — see the i18n section below for the full key list, including
  keys inferred to fill gaps the table didn't cover (label field, button
  text, placeholders, empty/error states not in the given table).

## Resolved ambiguities

Three things the ticket didn't spell out, resolved with the user directly:

1. **Title/label field.** The ticket's Step 1 field list (city, address
   details, phone) omits a name/label field, but the list view needs a
   "name label" per entry and the backend `Address` model requires `title`.
   **Resolution: add a Title field to Step 1** (e.g. "Home", "Work") even
   though the ticket's task bullet didn't name it explicitly.
2. **Maps provider.** No Maps API key or library existed in the project.
   **Resolution: real Google Maps**, via `@react-google-maps/api` (a React
   wrapper over the Google Maps JavaScript API). The user has added
   `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to `.env`.
3. **Modal trigger.** The ticket describes the modal but not where it opens
   from. **Resolution:** a "Delivery Address" section on the checkout page
   shows the currently selected/primary address (or an empty state) with a
   "Manage addresses" button that opens the modal.

Two more resolved unilaterally (flagged here, not re-asked, since the
ticket's own Gherkin scenarios and task list settle them):

4. **Picking an address for the order.** The modal's task list only shows
   Edit/Delete per entry — no explicit "Select" control. Clicking anywhere
   on a card **except** the Edit/Delete buttons selects that address for the
   current order and closes the modal, returning to the checkout page with
   that address now shown as selected. This satisfies "pick one at
   checkout" from the user story without adding a UI control the ticket
   never asked for.
5. **"Set as primary."** Present in the original (pre-ticket) design; absent
   from this ticket's tasks, validation, states, and Gherkin scenarios.
   **Dropped from scope.** The checkout page still defaults its initial
   selection to whichever saved address has `isPrimary: true` (falling back
   to the first address) — that's just a sensible default using data the
   backend already returns, not a new UI control.

## Architecture

```
src/features/checkout/
  components/
    delivery-address-section.tsx  # checkout-page section: selected address summary + "Manage addresses" button
    address-book-modal.tsx        # Dialog wrapper; owns view ('list' | 'form') + which address is being edited
    address-list.tsx              # list of AddressCard + empty/loading/error states + "Add Address" trigger
    address-card.tsx              # one entry: title, street+city, phone, Edit/Delete; inline delete-confirm; click-to-select
    address-wizard-form.tsx       # owns step state (1 | 2) + the shared react-hook-form instance; renders ProgressSteps + the active step
    address-step1-fields.tsx      # Title, City, Address details, Phone + Next button
    address-step2-map.tsx         # GoogleMapPicker + "Find My Location" + Back/Submit buttons
    google-map-picker.tsx         # thin wrapper: useJsApiLoader + GoogleMap + Marker, lat/lng in, onPositionChange out
    order-summary.tsx             # unchanged from the original design — read-only cart panel
    index.ts
  hooks/
    use-addresses.ts / use-create-address.ts / use-update-address.ts / use-delete-address.ts
    use-address-wizard-form.ts    # react-hook-form + zod for both steps; step-scoped validation; create/edit submit
    use-geolocation.ts            # wraps navigator.geolocation.getCurrentPosition
    index.ts
  lib/
    types/api.d.ts, index.ts      # Address, AddressResponse, AddressesResponse, CreateAddressPayload (now includes latitude/longitude, required), UpdateAddressPayload
    schemas/address.schema.ts     # one zod schema spanning both steps
    actions/addresses.action.ts, index.ts   # unchanged shape: 'use server' + apiRequest + getNextAuthToken
    constants/index.ts            # ADDRESSES_QUERY_KEY, DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM

src/app/api/addresses/route.ts, [addressId]/route.ts   # unchanged from the original design
src/app/[locale]/(pages)/checkout/page.tsx              # thin — renders CheckoutView (DeliveryAddressSection + OrderSummary)

shared/components/ui/dialog.tsx        # unchanged — still the modal primitive
shared/components/progress-steps.tsx   # GENERALIZED: currently imports `RegisterStep` from `features/auth`, which
                                        # violates "shared/* must never import from features/*". Checkout is a second
                                        # real consumer, so this is the moment to generalize its props to `steps: string[]`
                                        # / `currentStep: string` instead — a backward-compatible change (RegisterStep IS
                                        # a string union, so the existing register-page call site keeps compiling).
```

**New dependency:** `@react-google-maps/api` (React wrapper for the Google
Maps JavaScript API — provides `useJsApiLoader`, `<GoogleMap>`, `<Marker>`).

## Data flow

1. `DeliveryAddressSection` (checkout page) calls `useAddresses()`, defaults
   its shown selection to the primary address (or first) once loaded, same
   pattern as the original design. A "Manage addresses" button opens
   `AddressBookModal` (controlled `open` state lives in this component).
2. `AddressBookModal` owns `view: 'list' | 'form'` and, when `'form'`,
   `{ mode: 'create' | 'edit'; address?: Address }`. It renders `AddressList`
   or `AddressWizardForm` depending on `view`, inside `DialogContent`.
3. `AddressList` renders `useAddresses()`'s data as `AddressCard`s (its own
   call — react-query dedupes against the same query key, no extra
   network cost), plus the empty/loading/error states and an "Add Address"
   button that flips the modal to `view: 'form'`, `mode: 'create'`.
4. Clicking a card's body (not its Edit/Delete buttons) calls
   `onSelectAddress(address)` (bubbled up to `DeliveryAddressSection`) and
   closes the modal. Clicking Edit flips the modal to
   `view: 'form'`, `mode: 'edit'`, `address`. Clicking Delete shows an
   inline confirm row on that card (`address.confirmDelete` copy);
   confirming calls `useDeleteAddress`; on success, `address.deleted` toast,
   list re-fetches (query invalidation), and if the deleted address was the
   checkout page's current selection, `DeliveryAddressSection` re-defaults.
5. `AddressWizardForm` holds one `react-hook-form` instance for **all**
   fields across both steps (title, city, street, phone, latitude,
   longitude), so navigating Step 2 → Back → Step 1 never loses data — no
   separate per-step state to reconcile. "Next" on step 1 calls
   `form.trigger(['title','city','street','phone'])`; only advances to
   step 2 if valid.
6. `AddressStep2Map` renders `GoogleMapPicker`. No marker is shown until a
   position exists (drag/click/"Find My Location" sets it) — that absence
   is exactly what "pin must be placed before submit" validates against.
   Dragging or clicking updates the form's `latitude`/`longitude` fields
   directly (not through zod's per-keystroke validation — it's a manual
   presence check on submit, since there's no visible text input for these
   fields). "Find My Location" calls `use-geolocation`'s `locate()`; on
   success it recenters the map and sets the position; on denial it shows
   `address.locationDenied` inline (not a toast — it's actionable in place:
   "pin manually").
7. Submitting step 2: if latitude/longitude are unset, show
   `address.pinRequired` inline and do not submit. Otherwise build the
   payload and call `useCreateAddress` (mode `create`) or `useUpdateAddress`
   (mode `edit`, using the address being edited's `id`). On success:
   `address.added` / `address.updated` toast, modal `view` resets to
   `'list'`.
8. Closing the modal (via the Dialog's built-in close button or an outside
   click) at any point discards in-progress form state — nothing is
   persisted until the step-2 submit succeeds — and resets `view` back to
   `'list'` so reopening never resumes mid-form.

## Form fields (final)

Step 1: `title` (text, required — "Label", e.g. "Home"/"Work"), `city`
(text, required), `street` (text, required — displayed as "Address" per the
given `address.details` label), `phone` (via the existing `PhoneFormField`
E.164 pattern). Step 2: `latitude`/`longitude` (strings, set only through
map interaction, required before submit — no visible text inputs for these).

`CreateAddressPayload` sent to the backend: `{ title, city, street, phone,
latitude, longitude }`. `isPrimary` is never sent by this feature (see
resolved ambiguity #5) — it's read-only, backend-controlled.

## i18n keys

Given verbatim by the ticket (EN / AR):

```
address.modal.title            My Addresses / عناويني
address.edit                   Edit / تعديل
address.delete                 Delete / حذف
address.confirmDelete          Are you sure you want to delete this address? / هل أنت متأكد من حذف هذا العنوان؟
address.deleted                Address deleted / تم حذف العنوان
address.updated                Address updated / تم تحديث العنوان
address.add.step1Title         Address Details / تفاصيل العنوان
address.add.step2Title         Pin Your Location / حدد موقعك على الخريطة
address.city                   City / المدينة
address.details                Address / العنوان
address.phone                  Contact Number / رقم التواصل
address.findMyLocation         Find My Location / حدد موقعي
address.locationDenied         Location access denied. Please pin manually. / تم رفض إذن الموقع. يرجى تحديد الموقع يدوياً.
address.added                  Address added / تم إضافة العنوان
address.empty.title            No saved addresses / لا توجد عناوين محفوظة   (from the ticket's Empty state)
```

Inferred to fill gaps the table didn't cover (same flat `address.*` style):

```
address.title                  Label / التسمية
address.titlePlaceholder       e.g. Home, Work / مثال: المنزل، العمل
address.cityPlaceholder        e.g. Cairo / مثال: القاهرة
address.detailsPlaceholder     e.g. 123 Main St, Apt 4 / مثال: 123 شارع الرئيسي، شقة 4
address.addAddress             Add Address / إضافة عنوان
address.saveChanges            Save Changes / حفظ التغييرات
address.next                   Next / التالي
address.back                   Back / رجوع
address.cancel                 Cancel / إلغاء
address.close                  Close / إغلاق
address.manageAddresses        Manage addresses / إدارة العناوين
address.selectedAddressTitle   Delivery Address / عنوان التوصيل
address.noAddressSelected      No address selected / لم يتم اختيار عنوان
address.empty.description      Add an address to get started. / أضف عنوانًا للبدء.
address.loadError              We couldn't load your addresses. / تعذر تحميل عناوينك.
address.mapLoadError           Maps failed to load. Please check your connection. / فشل تحميل الخريطة. يرجى التحقق من اتصالك.
address.pinRequired            Please place a pin on the map before submitting. / يرجى تحديد موقع على الخريطة قبل الإرسال.
```

Validation messages reuse the **existing** top-level `validation.required`
and `validation.invalidPhone` keys (already present in both message files) —
no new validation keys are added, consistent with the original design.

## States

- **Maps loading:** `useJsApiLoader`'s `isLoaded` false → a `Spinner` inside
  the map container (fixed height, so nothing jumps on load).
- **Maps failed to load** (e.g. offline): `loadError` from the loader →
  `address.mapLoadError`, no crash.
- **List loading / error / empty:** unchanged pattern from the original
  design (`Skeleton`s / inline error text / empty-state block with the
  ticket's exact copy).
- **Geolocation denied:** inline message (`address.locationDenied`) near the
  "Find My Location" button, not a toast — the user needs to see it while
  still on the map step to pin manually.
- **Success:** toasts with the ticket's exact copy; modal returns to the
  list view; list re-fetches.

## Edge cases (explicit test targets for the final QA pass)

- Deleting the last address → empty state with its Add CTA, immediately.
- Cancel during edit (Dialog close mid-form) → list view, no partial save.
- Offline on mount → map area shows `address.mapLoadError`, rest of the
  modal still usable.
- Step 2 → Back → Step 1 → step 1 fields still show what was typed.

## Explicitly out of scope

Order placement / payment (order summary panel stays read-only, as in the
original design). "Set as primary" UI (see resolved ambiguity #5).
Address list pagination (same as the original design — small unpaginated
set).
