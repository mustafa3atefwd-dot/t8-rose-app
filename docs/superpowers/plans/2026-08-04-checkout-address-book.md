# Checkout Address Book Implementation Plan (Revision 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **This revision replaces the original plan.** The user supplied a detailed
> ticket (user story, Gherkin scenarios, exact i18n strings) mid-execution
> that reshapes the feature into a **modal** with a **2-step add/edit
> wizard** (contact details, then a Google Maps pin), dropping the earlier
> "set primary" control. Tasks 1 and 2 below were already implemented under
> the original plan (commits `a809d67` and `0571170`) and are revised here
> rather than rebuilt from scratch, since most of their content still
> applies. See `docs/superpowers/specs/2026-08-04-checkout-address-book-design.md`
> (Revision 2) for the full design rationale.

**Goal:** A "My Addresses" modal reachable from `/checkout` — list, add
(2-step: details then map pin), edit (same wizard, pre-filled), delete
(inline confirm) — plus a "Delivery Address" section on the checkout page
that shows the picked/primary address and opens the modal, per the user's
ticket and its Gherkin acceptance scenarios.

**Architecture:** Same `src/features/checkout` feature and repo conventions
as the original plan (flat `hooks/`, `'use server'` actions, thin Next.js
route handlers, react-hook-form + zod, react-query, the `Dialog` primitive
in `shared/components/ui`). New: a 2-step wizard sharing one form instance
across steps, a Google Maps picker component, a geolocation hook, and a
generalization of the existing `shared/components/progress-steps.tsx` (it
currently imports a feature-specific type from `features/auth`, which
violates the shared/features layering rule — this is fixed as part of Task 6
since checkout becomes its second consumer).

**Tech Stack:** Next.js 16 (App Router), React 19, `@tanstack/react-query`
v5, `react-hook-form` + `zod` v4, `@base-ui/react`, `next-intl`, `next-auth`,
Tailwind v4 `ds-*` tokens, `sonner` toasts, and (new) `@react-google-maps/api`
for the map picker.

## Global Constraints

- Use `ds-*` semantic Tailwind utilities for all colors/borders/rings — never arbitrary or primitive color values.
- No automated test framework exists in this repo (no `jest`/`vitest`, no test script in `package.json`). Do not invent one. Verification per task is `npx tsc --noEmit` (or `npm run build`) + `npm run lint` clean, plus a manual browser check for interactive tasks. The final task is a manual QA pass mapped directly to the ticket's Gherkin scenarios.
- Server-side backend calls always go through `'use server'` action functions using `apiRequest` (from `shared/lib/utils/request.util.ts`) and `getNextAuthToken()` — mirrors `features/notifications/lib/actions/update-notification.action.ts`.
- Client hooks fetch the **internal** `/api/...` route, never the backend directly.
- `isPrimary` is never sent by this feature's create/update payloads — it's read-only, backend-controlled. The checkout page only *reads* it to pick a sensible default selection.
- Latitude/longitude are collected **only** through map interaction (drag pin, click map, or "Find My Location") — there are no visible text inputs for them, and submission is blocked with `address.pinRequired` until both are set.
- The Google Maps API key lives in `.env` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (already added by the user) — read it via `process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!`, matching the existing `process.env.NEXTAUTH_SECRET!` style in this codebase.
- `/checkout` is already auth-gated by `src/proxy.ts` (default-protected route) — this satisfies the ticket's "requires an authenticated user" permission requirement with no extra code.
- All new user-facing copy uses the exact i18n strings given in the ticket where provided; keys not covered by the ticket are added under the same flat `address.*` namespace (see Task 2's brief for the full list).

---

### Task 1 (REVISION): Address types for the map-based wizard

**Files:**
- Modify: `src/features/checkout/lib/types/api.d.ts` (already exists — created under the original plan)

**Interfaces:**
- Produces (revised): `CreateAddressPayload` now requires `latitude`/`longitude` and drops `isPrimary` entirely (the feature never sends it). `Address`, `AddressResponse`, `AddressesResponse` are unchanged. `UpdateAddressPayload = Partial<CreateAddressPayload>` is unchanged as a type (its effective shape updates automatically). Every later task imports these from `../types`.

- [ ] **Step 1: Read the current file**

Read `src/features/checkout/lib/types/api.d.ts`. It currently contains (from the original plan):

```ts
export interface CreateAddressPayload {
  title: string;
  city: string;
  street: string;
  phone: string;
  isPrimary?: boolean;
}
```

- [ ] **Step 2: Replace the `CreateAddressPayload` interface**

Replace it with:

```ts
export interface CreateAddressPayload {
  title: string;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
}
```

Leave `Address`, `AddressResponse`, `AddressesResponse`, and `UpdateAddressPayload` exactly as they are — only the `CreateAddressPayload` interface changes. `lib/types/index.ts` (the barrel) needs no changes — it already re-exports everything by name.

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/checkout/lib/types/api.d.ts
git commit -m "feat(checkout): add latitude/longitude to CreateAddressPayload, drop isPrimary"
```

---

### Task 2 (REVISION): Replace checkout i18n messages with the address.* namespace

**Files:**
- Modify: `src/i18n/messages/en.json`
- Modify: `src/i18n/messages/ar.json`

**Interfaces:**
- Produces: a top-level `address` message namespace (replacing the top-level `checkout` namespace added under the original plan, which nothing consumes yet) plus a small `checkoutPage.title` namespace for the page-level heading. Consumed by every component task below via `useTranslations('address')` / `useTranslations('checkoutPage')`. Also relies on the **existing** `validation.required` / `validation.invalidPhone` keys — unchanged, no new validation keys.

- [ ] **Step 1: Locate and remove the existing top-level `checkout` block in `en.json`**

Read `src/i18n/messages/en.json` and find the top-level `"checkout": { ... }` block added under the original plan (it sits immediately before the `"toast": {` key, and its top-level shape is `{ title, addressBook: {...}, addressForm: {...}, orderSummary: {...} }`). Delete that entire block.

- [ ] **Step 2: Insert the new blocks in `en.json`, in the same position (immediately before `"toast": {`)**

```json
  "checkoutPage": {
    "title": "Checkout"
  },
  "address": {
    "modal": {
      "title": "My Addresses"
    },
    "edit": "Edit",
    "delete": "Delete",
    "confirmDelete": "Are you sure you want to delete this address?",
    "deleted": "Address deleted",
    "updated": "Address updated",
    "add": {
      "step1Title": "Address Details",
      "step2Title": "Pin Your Location"
    },
    "city": "City",
    "cityPlaceholder": "e.g. Cairo",
    "details": "Address",
    "detailsPlaceholder": "e.g. 123 Main St, Apt 4",
    "phone": "Contact Number",
    "title": "Label",
    "titlePlaceholder": "e.g. Home, Work",
    "findMyLocation": "Find My Location",
    "locationDenied": "Location access denied. Please pin manually.",
    "added": "Address added",
    "addAddress": "Add Address",
    "saveChanges": "Save Changes",
    "next": "Next",
    "back": "Back",
    "cancel": "Cancel",
    "close": "Close",
    "manageAddresses": "Manage addresses",
    "selectedAddressTitle": "Delivery Address",
    "noAddressSelected": "No address selected",
    "empty": {
      "title": "No saved addresses",
      "description": "Add an address to get started."
    },
    "loadError": "We couldn't load your addresses.",
    "mapLoadError": "Maps failed to load. Please check your connection.",
    "pinRequired": "Please place a pin on the map before submitting."
  },
```

- [ ] **Step 3: Locate and remove the existing top-level `checkout` block in `ar.json`**

Same as Step 1, for `src/i18n/messages/ar.json` — find and delete the top-level `"checkout": { ... }` block (also sits immediately before `"toast": {`).

- [ ] **Step 4: Insert the new blocks in `ar.json`, in the same position**

```json
  "checkoutPage": {
    "title": "إتمام الطلب"
  },
  "address": {
    "modal": {
      "title": "عناويني"
    },
    "edit": "تعديل",
    "delete": "حذف",
    "confirmDelete": "هل أنت متأكد من حذف هذا العنوان؟",
    "deleted": "تم حذف العنوان",
    "updated": "تم تحديث العنوان",
    "add": {
      "step1Title": "تفاصيل العنوان",
      "step2Title": "حدد موقعك على الخريطة"
    },
    "city": "المدينة",
    "cityPlaceholder": "مثال: القاهرة",
    "details": "العنوان",
    "detailsPlaceholder": "مثال: 123 شارع الرئيسي، شقة 4",
    "phone": "رقم التواصل",
    "title": "التسمية",
    "titlePlaceholder": "مثال: المنزل، العمل",
    "findMyLocation": "حدد موقعي",
    "locationDenied": "تم رفض إذن الموقع. يرجى تحديد الموقع يدوياً.",
    "added": "تم إضافة العنوان",
    "addAddress": "إضافة عنوان",
    "saveChanges": "حفظ التغييرات",
    "next": "التالي",
    "back": "رجوع",
    "cancel": "إلغاء",
    "close": "إغلاق",
    "manageAddresses": "إدارة العناوين",
    "selectedAddressTitle": "عنوان التوصيل",
    "noAddressSelected": "لم يتم اختيار عنوان",
    "empty": {
      "title": "لا توجد عناوين محفوظة",
      "description": "أضف عنوانًا للبدء."
    },
    "loadError": "تعذر تحميل عناوينك.",
    "mapLoadError": "فشل تحميل الخريطة. يرجى التحقق من اتصالك.",
    "pinRequired": "يرجى تحديد موقع على الخريطة قبل الإرسال."
  },
```

- [ ] **Step 5: Verify both files are valid JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/i18n/messages/en.json','utf8')); JSON.parse(require('fs').readFileSync('src/i18n/messages/ar.json','utf8')); console.log('OK')"`
Expected: prints `OK`.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/messages/en.json src/i18n/messages/ar.json
git commit -m "feat(checkout): replace checkout i18n namespace with address.* per updated ticket"
```

---

### Task 3: Address server actions and API routes

**Files:**
- Create: `src/features/checkout/lib/actions/addresses.action.ts`
- Create: `src/features/checkout/lib/actions/index.ts`
- Create: `src/app/api/addresses/route.ts`
- Create: `src/app/api/addresses/[addressId]/route.ts`

**Interfaces:**
- Consumes: `Address`, `AddressResponse`, `AddressesResponse`, `CreateAddressPayload`, `UpdateAddressPayload` from Task 1 (`../types`); `apiRequest` from `shared/lib/utils/request.util.ts`; `getNextAuthToken` from `shared/lib/utils/get-token.util.ts`; `BACKEND_URL` from `shared/lib/constants/api.constant.ts`.
- Produces: `getAddresses()`, `createAddress(payload)`, `updateAddress(addressId, payload)`, `deleteAddress(addressId)` (all `'use server'`), and working routes `GET/POST /api/addresses`, `PATCH/DELETE /api/addresses/[addressId]`.

- [ ] **Step 1: Write the server actions**

`src/features/checkout/lib/actions/addresses.action.ts`:

```ts
'use server';

import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { apiRequest } from '@/shared/lib/utils/request.util';
import { AddressResponse, AddressesResponse, CreateAddressPayload, UpdateAddressPayload } from '../types';

async function getAccessToken() {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  return token;
}

// Get the current user's saved addresses
export async function getAddresses(): Promise<AddressesResponse> {
  const token = await getAccessToken();
  return apiRequest<AddressesResponse>(`${BACKEND_URL}/addresses`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
}

// Create a new address
export async function createAddress(payload: CreateAddressPayload): Promise<AddressResponse> {
  const token = await getAccessToken();
  return apiRequest<AddressResponse>(`${BACKEND_URL}/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

// Update an existing address
export async function updateAddress(addressId: string, payload: UpdateAddressPayload): Promise<AddressResponse> {
  const token = await getAccessToken();
  return apiRequest<AddressResponse>(`${BACKEND_URL}/addresses/${addressId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

// Delete an address
export async function deleteAddress(addressId: string): Promise<AddressResponse> {
  const token = await getAccessToken();
  return apiRequest<AddressResponse>(`${BACKEND_URL}/addresses/${addressId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
```

- [ ] **Step 2: Barrel the actions**

`src/features/checkout/lib/actions/index.ts`:

```ts
export { getAddresses, createAddress, updateAddress, deleteAddress } from './addresses.action';
```

- [ ] **Step 3: Write the list route handler**

`src/app/api/addresses/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { createAddress, getAddresses } from '@/features/checkout/lib/actions/addresses.action';

export async function GET() {
  try {
    const data = await getAddresses();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        code: 500,
        message: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await createAddress(body);
    return NextResponse.json(data, { status: data.code });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        code: 500,
        message: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 4: Write the single-address route handler**

`src/app/api/addresses/[addressId]/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { deleteAddress, updateAddress } from '@/features/checkout/lib/actions/addresses.action';

type AddressRouteContext = {
  params: Promise<{
    addressId: string;
  }>;
};

export async function PATCH(request: NextRequest, { params }: AddressRouteContext) {
  const { addressId } = await params;
  const body = await request.json();
  const data = await updateAddress(addressId, body);
  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: AddressRouteContext) {
  const { addressId } = await params;
  const data = await deleteAddress(addressId);
  return NextResponse.json(data);
}
```

- [ ] **Step 5: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Manual smoke test against the real backend**

Run: `npm run dev`, log in in the browser, then in a second terminal:

```bash
curl -i -b "next-auth.session-token=<copy from browser devtools cookie>" http://localhost:3000/api/addresses
```

Expected: `200` with a JSON body shaped like `{ status, code, payload: { addresses: [...] } }`. If the payload key differs from `addresses`, fix `AddressesResponse` in `src/features/checkout/lib/types/api.d.ts` now before continuing.

- [ ] **Step 7: Commit**

```bash
git add src/features/checkout/lib/actions src/app/api/addresses
git commit -m "feat(checkout): add address server actions and API routes"
```

---

### Task 4: Address validation schema

**Files:**
- Create: `src/features/checkout/lib/schemas/address.schema.ts`
- Create: `src/features/checkout/lib/schemas/index.ts`

**Interfaces:**
- Consumes: `libphonenumber-js/max`'s `isValidPhoneNumber`.
- Produces: `addressSchema(messages)` and `AddressSchema` type, consumed by Task 10's `useAddressWizardForm`. `latitude`/`longitude` are plain (unvalidated-by-zod) strings — presence is checked manually in the wizard hook before submit, since there's no visible input field to attach a zod field-error to (see Task 10).

- [ ] **Step 1: Write the schema**

`src/features/checkout/lib/schemas/address.schema.ts`:

```ts
import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js/max';

export function addressSchema(messages: { required: string; invalidPhone: string }) {
  return z.object({
    title: z.string().min(1, messages.required),
    city: z.string().min(1, messages.required),
    street: z.string().min(1, messages.required),
    phone: z
      .object({
        phone: z.string().trim(),
        country: z.string(),
      })
      .refine((val) => isValidPhoneNumber(val.phone), {
        message: messages.invalidPhone,
      }),
    latitude: z.string(),
    longitude: z.string(),
  });
}

export type AddressSchema = z.infer<ReturnType<typeof addressSchema>>;
```

- [ ] **Step 2: Barrel the schema**

`src/features/checkout/lib/schemas/index.ts`:

```ts
export { addressSchema } from './address.schema';
export type { AddressSchema } from './address.schema';
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/checkout/lib/schemas
git commit -m "feat(checkout): add address validation schema"
```

---

### Task 5: Address data hooks

**Files:**
- Create: `src/features/checkout/hooks/use-addresses.ts`
- Create: `src/features/checkout/hooks/use-create-address.ts`
- Create: `src/features/checkout/hooks/use-update-address.ts`
- Create: `src/features/checkout/hooks/use-delete-address.ts`
- Create: `src/features/checkout/hooks/index.ts`

**Interfaces:**
- Consumes: `AddressResponse`, `AddressesResponse`, `CreateAddressPayload`, `UpdateAddressPayload` (Task 1); `ADDRESSES_QUERY_KEY` from `../lib/constants` — **this file already exists** (`src/features/checkout/lib/constants/index.ts`, created by the original Task 1 run, exporting exactly `export const ADDRESSES_QUERY_KEY = ['addresses'] as const;`). Do not recreate it — just import from it. Hits `/api/addresses` and `/api/addresses/[id]` (Task 3).
- Produces: `useAddresses()` → `UseQueryResult<AddressesResponse>`; `useCreateAddress()` → mutation taking `CreateAddressPayload`; `useUpdateAddress()` → mutation taking `{ id: string; payload: UpdateAddressPayload }`; `useDeleteAddress()` → mutation taking `addressId: string`. Consumed by Task 10 (`useAddressWizardForm`), Task 12/13 (`AddressCard`/`AddressList`), and Task 14 (`DeliveryAddressSection`).

- [ ] **Step 1: Confirm the query-key constant already exists**

Read `src/features/checkout/lib/constants/index.ts` and confirm it already contains `export const ADDRESSES_QUERY_KEY = ['addresses'] as const;`. It does — this file was created under the original Task 1 and is unaffected by Task 1's revision. No edit needed here.

- [ ] **Step 2: Write the list query hook**

`src/features/checkout/hooks/use-addresses.ts`:

```ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { AddressesResponse } from '../lib/types';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

export function useAddresses() {
  return useQuery<AddressesResponse>({
    queryKey: ADDRESSES_QUERY_KEY,
    queryFn: async () => {
      const response = await fetch('/api/addresses');

      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      return response.json();
    },
  });
}
```

- [ ] **Step 3: Write the create mutation hook**

`src/features/checkout/hooks/use-create-address.ts`:

```ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddressResponse, CreateAddressPayload } from '../lib/types';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAddressPayload): Promise<AddressResponse> => {
      const response = await fetch('/api/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.message || 'Failed to create address');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
```

- [ ] **Step 4: Write the update mutation hook**

`src/features/checkout/hooks/use-update-address.ts`:

```ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddressResponse, UpdateAddressPayload } from '../lib/types';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

interface IUpdateAddressVariables {
  id: string;
  payload: UpdateAddressPayload;
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: IUpdateAddressVariables): Promise<AddressResponse> => {
      const response = await fetch(`/api/addresses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.message || 'Failed to update address');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
```

- [ ] **Step 5: Write the delete mutation hook**

`src/features/checkout/hooks/use-delete-address.ts`:

```ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddressResponse } from '../lib/types';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string): Promise<AddressResponse> => {
      const response = await fetch(`/api/addresses/${addressId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.message || 'Failed to delete address');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
```

- [ ] **Step 6: Barrel the hooks so far**

`src/features/checkout/hooks/index.ts`:

```ts
export { useAddresses } from './use-addresses';
export { useCreateAddress } from './use-create-address';
export { useUpdateAddress } from './use-update-address';
export { useDeleteAddress } from './use-delete-address';
```

(Tasks 8 and 10 add `useGeolocation` and `useAddressWizardForm` to this file.)

- [ ] **Step 7: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/features/checkout/hooks
git commit -m "feat(checkout): add address data hooks"
```

---

### Task 6: Generalize the shared ProgressSteps component

**Files:**
- Modify: `src/shared/components/progress-steps.tsx`

**Interfaces:**
- Produces: `ProgressSteps<T extends string>({ steps: T[]; currentStep: T; className?: string })` (default export), a generic version of the existing component. Consumed by Task 11's `AddressWizardForm` with `T = 'details' | 'location'`, and still consumed by the existing `src/app/[locale]/(auth)/register/page.tsx` with `T = RegisterStep`.

**Why:** the current file imports `RegisterStep` from `@/features/auth/lib/types/auth`, which violates this codebase's shared/features layering rule (`shared/*` must never import from `features/*`). Checkout becomes a second real consumer of this component, which is exactly when the promotion rule says to generalize its contract instead of duplicating it.

- [ ] **Step 1: Read the current file**

Read `src/shared/components/progress-steps.tsx`. It currently imports `RegisterStep` and types its props as `{ steps: RegisterStep[]; currentStep: RegisterStep; className?: string }`.

- [ ] **Step 2: Replace the whole file with a generic version**

`src/shared/components/progress-steps.tsx`:

```tsx
'use client';

import { Fragment, memo } from 'react';
import clsx from 'clsx';

interface ProgressStepsProps<T extends string> {
  steps: T[];
  currentStep: T;
  className?: string;
}

function ProgressSteps<T extends string>({ steps, currentStep, className }: ProgressStepsProps<T>) {
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <>
      {/* ===== Progress Container ===== */}
      <div className={clsx('progress mb-2.5 flex items-center', className)}>
        {/* ===== Steps Renderer ===== */}
        {steps.map((step, index) => (
          <Fragment key={step}>
            {/* Step Circle (state: completed / active / default) */}
            <div
              className={clsx('step', {
                completed: index < currentStepIndex,
                active: index === currentStepIndex,
              })}
            >
              {index + 1}
            </div>

            {/* Connector Line between steps (except last one) */}
            {index !== steps.length - 1 && (
              <div
                className={clsx('line flex-1', {
                  completed: index < currentStepIndex,
                })}
              />
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default memo(ProgressSteps) as typeof ProgressSteps;
```

The only functional change from the original is dropping the `RegisterStep` import and making `T extends string` generic instead. Visual output and the `.step`/`.line`/`.completed`/`.active` class names are unchanged. `React.memo` erases a generic component's type parameter, so the `as typeof ProgressSteps` cast restores it for callers — this is a standard, narrow cast (not an `any`-style escape hatch), needed because `memo()`'s return type is intentionally non-generic.

- [ ] **Step 3: Verify the existing consumer still compiles**

Run: `npx tsc --noEmit`
Expected: no errors — `src/app/[locale]/(auth)/register/page.tsx`'s `<ProgressSteps steps={registerSteps} currentStep={currentStep} className="..." />` call (where both are `RegisterStep`, a string union) must still type-check against the new generic signature without any changes to that file.

- [ ] **Step 4: Manual check**

Run `npm run dev`, visit `/register`, advance past the email step. Expected: the step indicator still renders and highlights the current step exactly as before — this task only changed types, not markup or styling.

- [ ] **Step 5: Commit**

```bash
git add src/shared/components/progress-steps.tsx
git commit -m "refactor(shared): generalize ProgressSteps to drop the features/auth import"
```

---

### Task 7: Shared Dialog primitive

**Files:**
- Create: `src/shared/components/ui/dialog.tsx`

**Interfaces:**
- Consumes: `@base-ui/react/dialog` (confirmed present in `node_modules/@base-ui/react/dialog`, exporting `Dialog.{Root,Trigger,Portal,Backdrop,Popup,Title,Description,Close}` — same library and pattern already used for `Menu` in `shared/components/ui/dropdown-menu.tsx`); `cn` from `@/shared/lib/utils`.
- Produces: `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogBackdrop`, `DialogClose`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription` — consumed by Task 13 (`AddressBookModal`). This is a generic design-system primitive (like `Button`/`Checkbox`), so it lives directly in `shared/components/ui` even though checkout is its first consumer.

- [ ] **Step 1: Write the primitive**

`src/shared/components/ui/dialog.tsx`:

```tsx
'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { XIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogBackdrop({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'data-open:animate-in data-open:fade-in-0',
        'data-closed:animate-out data-closed:fade-out-0',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & { showCloseButton?: boolean }) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          'bg-ds-bg-plain text-ds-text-plain ring-ds-border-plain/10',
          'fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2',
          'max-h-[85vh] overflow-y-auto rounded-lg p-6 shadow-lg ring-1 duration-100',
          'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
          'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="text-ds-text-muted hover:bg-ds-bg-muted focus-visible:ring-ds-ring absolute top-4 right-4 rounded-md p-1 outline-none focus-visible:ring-3 rtl:right-auto rtl:left-4"
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('mb-4 flex flex-col gap-1.5 text-center sm:text-start', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn('text-lg font-semibold', className)} {...props} />;
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-ds-text-muted text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/ui/dialog.tsx
git commit -m "feat(ui): add Dialog primitive"
```

---

### Task 8: Geolocation hook

**Files:**
- Create: `src/features/checkout/hooks/use-geolocation.ts`
- Modify: `src/features/checkout/hooks/index.ts`

**Interfaces:**
- Produces: `useGeolocation()` → `{ locate: (onSuccess: (coords: { lat: number; lng: number }) => void) => void; isLocating: boolean; denied: boolean }`. Consumed by Task 11's `AddressStep2Map` for the "Find My Location" button.

- [ ] **Step 1: Write the hook**

`src/features/checkout/hooks/use-geolocation.ts`:

```ts
'use client';

import { useState } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

export function useGeolocation() {
  const [isLocating, setIsLocating] = useState(false);
  const [denied, setDenied] = useState(false);

  function locate(onSuccess: (coords: Coordinates) => void) {
    if (!navigator.geolocation) {
      setDenied(true);
      return;
    }

    setIsLocating(true);
    setDenied(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        onSuccess({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        setIsLocating(false);
        setDenied(true);
      }
    );
  }

  return { locate, isLocating, denied };
}
```

- [ ] **Step 2: Add it to the hooks barrel**

In `src/features/checkout/hooks/index.ts`, add:

```ts
export { useGeolocation } from './use-geolocation';
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/checkout/hooks
git commit -m "feat(checkout): add geolocation hook"
```

---

### Task 9: Google Map picker component

**Files:**
- Modify: `package.json` (add `@react-google-maps/api`)
- Modify: `.env.example` (document the new env var)
- Create: `src/features/checkout/components/google-map-picker.tsx`

**Interfaces:**
- Consumes: `useJsApiLoader`, `GoogleMap`, `Marker` from `@react-google-maps/api`; `Spinner` from `@/shared/components/ui/spinner`; `process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (already set in `.env` by the user).
- Produces: `GoogleMapPicker` (default export), props `{ latitude: string; longitude: string; onPositionChange: (lat: number, lng: number) => void }`. No marker renders until both `latitude`/`longitude` are non-empty — that absence is what makes "pin must be placed before submit" enforceable upstream. Consumed by Task 11's `AddressStep2Map`.

- [ ] **Step 1: Install the dependency**

Run: `npm install @react-google-maps/api`
Expected: adds `@react-google-maps/api` to `package.json` dependencies and updates `package-lock.json`. If `npx tsc --noEmit` later reports missing types for the global `google` namespace, additionally run `npm install -D @types/google.maps`.

- [ ] **Step 2: Document the env var**

In `.env.example`, add a new line (anywhere in the file, e.g. after the existing `NEXT_PUBLIC_*` entries):

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

Do not put a real key in `.env.example` — it's committed to git. The real key already lives in the user's local `.env` (gitignored).

- [ ] **Step 3: Write the component**

`src/features/checkout/components/google-map-picker.tsx`:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Spinner } from '@/shared/components/ui/spinner';

interface IGoogleMapPickerProps {
  latitude: string;
  longitude: string;
  onPositionChange: (lat: number, lng: number) => void;
}

const CONTAINER_STYLE = { width: '100%', height: '280px' };
const DEFAULT_CENTER = { lat: 30.0444, lng: 31.2357 };
const DEFAULT_ZOOM = 6;
const PIN_ZOOM = 15;

export default function GoogleMapPicker({ latitude, longitude, onPositionChange }: IGoogleMapPickerProps) {
  const t = useTranslations('address');
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'checkout-google-map-picker',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const hasPin = latitude !== '' && longitude !== '';
  const center = hasPin ? { lat: Number(latitude), lng: Number(longitude) } : DEFAULT_CENTER;

  if (loadError) {
    return (
      <div
        style={CONTAINER_STYLE}
        className="border-ds-border-soft bg-ds-bg-muted text-ds-text-danger flex items-center justify-center rounded-lg border p-4 text-center text-sm"
      >
        {t('mapLoadError')}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={CONTAINER_STYLE} className="border-ds-border-soft bg-ds-bg-muted flex items-center justify-center rounded-lg border">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={CONTAINER_STYLE}
      mapContainerClassName="rounded-lg overflow-hidden"
      center={center}
      zoom={hasPin ? PIN_ZOOM : DEFAULT_ZOOM}
      onClick={(event) => {
        if (event.latLng) {
          onPositionChange(event.latLng.lat(), event.latLng.lng());
        }
      }}
    >
      {hasPin && (
        <Marker
          position={center}
          draggable
          onDragEnd={(event) => {
            if (event.latLng) {
              onPositionChange(event.latLng.lat(), event.latLng.lng());
            }
          }}
        />
      )}
    </GoogleMap>
  );
}
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors. If the `google` namespace is unresolved, see Step 1's fallback.

- [ ] **Step 5: Manual check**

This component has no consumer yet (Task 11 wires it up), so full interaction can't be checked until then — but confirm the build succeeds: `npm run build`.
Expected: build succeeds with no errors referencing `google-map-picker.tsx`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .env.example src/features/checkout/components/google-map-picker.tsx
git commit -m "feat(checkout): add Google Maps picker component"
```

---

### Task 10: Address wizard form hook

**Files:**
- Create: `src/features/checkout/hooks/use-address-wizard-form.ts`
- Modify: `src/features/checkout/hooks/index.ts`

**Interfaces:**
- Consumes: `addressSchema`, `AddressSchema` (Task 4); `useCreateAddress`, `useUpdateAddress` (Task 5); `Address`, `CreateAddressPayload` (Task 1); `toast` from `@/shared/components/ui/toast`.
- Produces: `WizardStep` type (`'details' | 'location'`), `WIZARD_STEPS` constant, and `useAddressWizardForm(props)` returning `{ form, currentStep, goNext, goBack, setPosition, onSubmit, isPending, pinError }`. Consumed by Task 11's `AddressWizardForm`.

- [ ] **Step 1: Write the hook**

`src/features/checkout/hooks/use-address-wizard-form.ts`:

```ts
'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/shared/components/ui/toast';
import { addressSchema, AddressSchema } from '../lib/schemas';
import { Address, CreateAddressPayload } from '../lib/types';
import { useCreateAddress } from './use-create-address';
import { useUpdateAddress } from './use-update-address';

export type WizardStep = 'details' | 'location';

export const WIZARD_STEPS: WizardStep[] = ['details', 'location'];

interface IUseAddressWizardFormProps {
  mode: 'create' | 'edit';
  address?: Address;
  onSuccess: () => void;
}

export function useAddressWizardForm({ mode, address, onSuccess }: IUseAddressWizardFormProps) {
  const t = useTranslations('validation');
  const tAddress = useTranslations('address');

  const [currentStep, setCurrentStep] = useState<WizardStep>('details');
  const [pinError, setPinError] = useState(false);

  const schema = useMemo(
    () =>
      addressSchema({
        required: t('required'),
        invalidPhone: t('invalidPhone'),
      }),
    [t]
  );

  const form = useForm<AddressSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: address?.title ?? '',
      city: address?.city ?? '',
      street: address?.street ?? '',
      phone: { phone: address?.phone ?? '', country: '' },
      latitude: address?.latitude ?? '',
      longitude: address?.longitude ?? '',
    },
  });

  const createMutation = useCreateAddress();
  const updateMutation = useUpdateAddress();
  const isPending = mode === 'create' ? createMutation.isPending : updateMutation.isPending;

  async function goNext() {
    const isValid = await form.trigger(['title', 'city', 'street', 'phone']);
    if (isValid) {
      setCurrentStep('location');
    }
  }

  function goBack() {
    setCurrentStep('details');
  }

  function setPosition(lat: number, lng: number) {
    form.setValue('latitude', String(lat));
    form.setValue('longitude', String(lng));
    setPinError(false);
  }

  function onSubmit(values: AddressSchema) {
    if (!values.latitude || !values.longitude) {
      setPinError(true);
      return;
    }

    const payload: CreateAddressPayload = {
      title: values.title,
      city: values.city,
      street: values.street,
      phone: values.phone.phone,
      latitude: values.latitude,
      longitude: values.longitude,
    };

    // Callers only ever pass mode: 'edit' together with an address (see AddressWizardForm).
    const request =
      mode === 'create'
        ? createMutation.mutateAsync(payload)
        : updateMutation.mutateAsync({ id: address!.id, payload });

    request
      .then(() => {
        toast.success(mode === 'create' ? tAddress('added') : tAddress('updated'));
        onSuccess();
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  }

  return {
    form,
    currentStep,
    goNext,
    goBack,
    setPosition,
    onSubmit,
    isPending,
    pinError,
  };
}
```

`useAddressWizardForm` must be called unconditionally by its consumer (never inside a branch) — `mode`/`address` are forwarded straight through, and the `mode === 'create' ? ... : ...` branching happens *inside* this hook, not at its call site.

- [ ] **Step 2: Add it to the hooks barrel**

In `src/features/checkout/hooks/index.ts`, add:

```ts
export { useAddressWizardForm, WIZARD_STEPS } from './use-address-wizard-form';
export type { WizardStep } from './use-address-wizard-form';
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/checkout/hooks
git commit -m "feat(checkout): add address wizard form hook"
```

---

### Task 11: Address wizard step components

**Files:**
- Create: `src/features/checkout/components/address-step1-fields.tsx`
- Create: `src/features/checkout/components/address-step2-map.tsx`
- Create: `src/features/checkout/components/address-wizard-form.tsx`

**Interfaces:**
- Consumes: `useAddressWizardForm`, `WIZARD_STEPS` (Task 10); `useGeolocation` (Task 8); `GoogleMapPicker` (Task 9); `ProgressSteps` (Task 6, generalized); `Address` (Task 1); `FormField`, `PhoneFormField`, `SubmitButton` from `@/shared/components`; `Button` from `@/shared/components/ui/button`.
- Produces: `AddressWizardForm` (default export) — the single entry point later tasks use. `AddressStep1Fields` and `AddressStep2Map` are internal to this task's file set (still default-exported for the barrel, but only `AddressWizardForm` is meant to be imported elsewhere). Consumed by Task 13's `AddressBookModal`.

These three files are one cohesive deliverable — `AddressWizardForm` owns the single `react-hook-form` instance and `<form>` element that both step components render into; splitting them across tasks would leave an unreviewable partial.

- [ ] **Step 1: Write `AddressStep1Fields`**

`src/features/checkout/components/address-step1-fields.tsx`:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { FormField, PhoneFormField } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { AddressSchema } from '../lib/schemas';

interface IAddressStep1FieldsProps {
  form: UseFormReturn<AddressSchema>;
  onNext: () => void;
  onCancel: () => void;
}

export default function AddressStep1Fields({ form, onNext, onCancel }: IAddressStep1FieldsProps) {
  const t = useTranslations('address');

  return (
    <div className="flex flex-col gap-4">
      <FormField name="title" control={form.control} label={t('title')} placeholder={t('titlePlaceholder')} required />
      <FormField name="city" control={form.control} label={t('city')} placeholder={t('cityPlaceholder')} required />
      <FormField name="street" control={form.control} label={t('details')} placeholder={t('detailsPlaceholder')} required />
      <PhoneFormField name="phone" control={form.control} label={t('phone')} />

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button type="button" onClick={onNext}>
          {t('next')}
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write `AddressStep2Map`**

`src/features/checkout/components/address-step2-map.tsx`:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { LocateFixed } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { SubmitButton } from '@/shared/components';
import { AddressSchema } from '../lib/schemas';
import { useGeolocation } from '../hooks';
import GoogleMapPicker from './google-map-picker';

interface IAddressStep2MapProps {
  form: UseFormReturn<AddressSchema>;
  onBack: () => void;
  onPositionChange: (lat: number, lng: number) => void;
  isPending: boolean;
  pinError: boolean;
  submitLabel: string;
}

export default function AddressStep2Map({
  form,
  onBack,
  onPositionChange,
  isPending,
  pinError,
  submitLabel,
}: IAddressStep2MapProps) {
  const t = useTranslations('address');
  const { locate, isLocating, denied } = useGeolocation();

  const latitude = form.watch('latitude');
  const longitude = form.watch('longitude');

  return (
    <div className="flex flex-col gap-4">
      <GoogleMapPicker latitude={latitude} longitude={longitude} onPositionChange={onPositionChange} />

      <Button
        type="button"
        variant="outline"
        size="sm"
        loading={isLocating}
        onClick={() => locate((coords) => onPositionChange(coords.lat, coords.lng))}
        className="w-fit gap-1.5"
      >
        <LocateFixed className="size-4" />
        {t('findMyLocation')}
      </Button>

      {denied && <p className="text-ds-text-danger text-sm">{t('locationDenied')}</p>}
      {pinError && <p className="text-ds-text-danger text-sm">{t('pinRequired')}</p>}

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onBack}>
          {t('back')}
        </Button>
        <SubmitButton isLoading={isPending} loadingText={submitLabel} className="my-0 w-full sm:w-auto">
          {submitLabel}
        </SubmitButton>
      </div>
    </div>
  );
}
```

`SubmitButton` defaults to `type="submit"`, so clicking it submits the wrapping `<form>` (owned by `AddressWizardForm`, Step 3 below) via `form.handleSubmit(onSubmit)`.

- [ ] **Step 3: Write `AddressWizardForm`**

`src/features/checkout/components/address-wizard-form.tsx`:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { ProgressSteps } from '@/shared/components';
import { useAddressWizardForm, WIZARD_STEPS } from '../hooks';
import { Address } from '../lib/types';
import AddressStep1Fields from './address-step1-fields';
import AddressStep2Map from './address-step2-map';

interface IAddressWizardFormProps {
  mode: 'create' | 'edit';
  address?: Address;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddressWizardForm({ mode, address, onSuccess, onCancel }: IAddressWizardFormProps) {
  const t = useTranslations('address');
  const { form, currentStep, goNext, goBack, setPosition, onSubmit, isPending, pinError } = useAddressWizardForm({
    mode,
    address,
    onSuccess,
  });

  return (
    <div className="flex flex-col gap-4">
      <ProgressSteps steps={WIZARD_STEPS} currentStep={currentStep} />

      <h3 className="text-base font-semibold">{currentStep === 'details' ? t('add.step1Title') : t('add.step2Title')}</h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {currentStep === 'details' ? (
          <AddressStep1Fields form={form} onNext={goNext} onCancel={onCancel} />
        ) : (
          <AddressStep2Map
            form={form}
            onBack={goBack}
            onPositionChange={setPosition}
            isPending={isPending}
            pinError={pinError}
            submitLabel={mode === 'create' ? t('addAddress') : t('saveChanges')}
          />
        )}
      </form>
    </div>
  );
}
```

Both steps render inside the same `<form>` element (only the children swap based on `currentStep`), so `react-hook-form`'s state (owned by the single `useForm` instance inside `useAddressWizardForm`) is never lost when navigating Step 2 → Back → Step 1 — this is what satisfies the "Back retains previously entered values" edge case.

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/features/checkout/components/address-step1-fields.tsx src/features/checkout/components/address-step2-map.tsx src/features/checkout/components/address-wizard-form.tsx
git commit -m "feat(checkout): add address wizard step components"
```

---

### Task 12: Address card component

**Files:**
- Create: `src/features/checkout/components/address-card.tsx`

**Interfaces:**
- Consumes: `Address` (Task 1); `Button` from `@/shared/components/ui/button`.
- Produces: `AddressCard` (default export), props `{ address: Address; onSelect: () => void; onEdit: () => void; onDelete: () => void; isDeleting: boolean }`. Clicking the card body calls `onSelect`; Edit/Delete are icon buttons that `stopPropagation` so they don't also trigger `onSelect`. Delete shows an inline confirm row (`address.confirmDelete`) before calling `onDelete` — no separate confirmation dialog. Consumed by Task 13's `AddressList`.

- [ ] **Step 1: Write the component**

`src/features/checkout/components/address-card.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Address } from '../lib/types';

interface IAddressCardProps {
  address: Address;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export default function AddressCard({ address, onSelect, onEdit, onDelete, isDeleting }: IAddressCardProps) {
  const t = useTranslations('address');
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      className="border-ds-border-soft focus-visible:ring-ds-ring flex cursor-pointer items-start justify-between gap-3 rounded-lg border p-4 outline-none transition-colors focus-visible:ring-3"
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium">{address.title}</span>
        <p className="text-ds-text-muted text-sm">
          {address.street}, {address.city}
        </p>
        <p className="text-ds-text-muted text-sm" dir="ltr">
          {address.phone}
        </p>
      </div>

      {confirmingDelete ? (
        <div
          className="flex shrink-0 flex-wrap items-center justify-end gap-2"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="text-ds-text-danger text-sm">{t('confirmDelete')}</span>
          <Button type="button" variant="destructive" size="sm" disabled={isDeleting} onClick={onDelete}>
            {t('delete')}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setConfirmingDelete(false)}>
            {t('cancel')}
          </Button>
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={t('edit')}
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={t('delete')}
            onClick={(event) => {
              event.stopPropagation();
              setConfirmingDelete(true);
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/features/checkout/components/address-card.tsx
git commit -m "feat(checkout): add address card component"
```

---

### Task 13: Address list and address book modal

**Files:**
- Create: `src/features/checkout/components/address-list.tsx`
- Create: `src/features/checkout/components/address-book-modal.tsx`

**Interfaces:**
- Consumes: `useAddresses`, `useDeleteAddress` (Task 5); `AddressCard` (Task 12); `AddressWizardForm` (Task 11); `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` (Task 7); `Address` (Task 1); `Skeleton` from `@/shared/components/ui/skeleton`; `Button` from `@/shared/components/ui/button`; `toast` from `@/shared/components/ui/toast`.
- Produces: `AddressList` (default export, props `{ onSelect, onAdd, onEdit }`) and `AddressBookModal` (default export, props `{ open, onOpenChange, onSelectAddress }`) — the modal owns which of `'list' | 'form'` is showing, resets to `'list'` whenever it closes. Consumed by Task 14's `DeliveryAddressSection`.

- [ ] **Step 1: Write `AddressList`**

`src/features/checkout/components/address-list.tsx`:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { toast } from '@/shared/components/ui/toast';
import { useAddresses, useDeleteAddress } from '../hooks';
import { Address } from '../lib/types';
import AddressCard from './address-card';

interface IAddressListProps {
  onSelect: (address: Address) => void;
  onAdd: () => void;
  onEdit: (address: Address) => void;
}

export default function AddressList({ onSelect, onAdd, onEdit }: IAddressListProps) {
  const t = useTranslations('address');
  const { data, isLoading, isError } = useAddresses();
  const deleteMutation = useDeleteAddress();

  const addresses = data?.payload.addresses ?? [];

  function handleDelete(address: Address) {
    deleteMutation.mutate(address.id, {
      onSuccess: () => toast.success(t('deleted')),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Button type="button" size="sm" onClick={onAdd} className="gap-1.5">
          <Plus className="size-4" />
          {t('addAddress')}
        </Button>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}

      {!isLoading && isError && <p className="text-ds-text-danger text-sm">{t('loadError')}</p>}

      {!isLoading && !isError && addresses.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="font-medium">{t('empty.title')}</p>
          <p className="text-ds-text-muted text-sm">{t('empty.description')}</p>
          <Button type="button" size="sm" onClick={onAdd} className="mt-2 gap-1.5">
            <Plus className="size-4" />
            {t('addAddress')}
          </Button>
        </div>
      )}

      {!isLoading && !isError && addresses.length > 0 && (
        <div className="flex flex-col gap-3">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onSelect={() => onSelect(address)}
              onEdit={() => onEdit(address)}
              onDelete={() => handleDelete(address)}
              isDeleting={deleteMutation.isPending && deleteMutation.variables === address.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write `AddressBookModal`**

`src/features/checkout/components/address-book-modal.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Address } from '../lib/types';
import AddressList from './address-list';
import AddressWizardForm from './address-wizard-form';

type ModalView = { view: 'list' } | { view: 'form'; mode: 'create' | 'edit'; address?: Address };

interface IAddressBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAddress: (address: Address) => void;
}

export default function AddressBookModal({ open, onOpenChange, onSelectAddress }: IAddressBookModalProps) {
  const t = useTranslations('address');
  const [modalView, setModalView] = useState<ModalView>({ view: 'list' });

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setModalView({ view: 'list' });
    }
    onOpenChange(nextOpen);
  }

  function handleSelect(address: Address) {
    onSelectAddress(address);
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('modal.title')}</DialogTitle>
        </DialogHeader>

        {modalView.view === 'list' ? (
          <AddressList
            onSelect={handleSelect}
            onAdd={() => setModalView({ view: 'form', mode: 'create' })}
            onEdit={(address) => setModalView({ view: 'form', mode: 'edit', address })}
          />
        ) : (
          <AddressWizardForm
            mode={modalView.mode}
            address={modalView.address}
            onSuccess={() => setModalView({ view: 'list' })}
            onCancel={() => setModalView({ view: 'list' })}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
```

Closing the dialog (built-in close button, outside click, or Escape) calls `handleOpenChange(false)`, which resets `modalView` to `{ view: 'list' }` before propagating the close — this is what satisfies "Close dismisses without changes" and "Cancel during edit returns to the list."

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/checkout/components/address-list.tsx src/features/checkout/components/address-book-modal.tsx
git commit -m "feat(checkout): add address list and address book modal"
```

---

### Task 14: Delivery address section, order summary, and route wiring

**Files:**
- Create: `src/features/checkout/components/delivery-address-section.tsx`
- Create: `src/features/checkout/components/order-summary.tsx`
- Create: `src/features/checkout/components/checkout-view.tsx`
- Create: `src/features/checkout/components/index.ts`
- Modify: `src/app/[locale]/(pages)/checkout/page.tsx`

**Interfaces:**
- Consumes: `useAddresses` (Task 5); `AddressBookModal` (Task 13); `Address` (Task 1); `useCart` from `@/shared/hooks/use-cart` (existing); `getTranslations` from `next-intl/server`.
- Produces: `CheckoutView` (default export), rendered by the `/checkout` route. This is the first task where the feature is actually visitable in the browser end-to-end.

- [ ] **Step 1: Write `DeliveryAddressSection`**

`src/features/checkout/components/delivery-address-section.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useAddresses } from '../hooks';
import { Address } from '../lib/types';
import AddressBookModal from './address-book-modal';

export default function DeliveryAddressSection() {
  const t = useTranslations('address');
  const { data, isLoading } = useAddresses();
  const addresses = data?.payload.addresses ?? [];

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (addresses.length === 0) {
      if (selectedAddress) setSelectedAddress(null);
      return;
    }

    const stillExists = selectedAddress && addresses.some((address) => address.id === selectedAddress.id);
    if (stillExists) return;

    const primary = addresses.find((address) => address.isPrimary);
    setSelectedAddress(primary ?? addresses[0]);
  }, [addresses, selectedAddress]);

  return (
    <section className="border-ds-border-soft rounded-lg border p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('selectedAddressTitle')}</h2>
        <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(true)}>
          {t('manageAddresses')}
        </Button>
      </div>

      {isLoading && <Skeleton className="h-16 w-full" />}

      {!isLoading && selectedAddress && (
        <div className="text-sm">
          <p className="font-medium">{selectedAddress.title}</p>
          <p className="text-ds-text-muted">
            {selectedAddress.street}, {selectedAddress.city}
          </p>
          <p className="text-ds-text-muted" dir="ltr">
            {selectedAddress.phone}
          </p>
        </div>
      )}

      {!isLoading && !selectedAddress && <p className="text-ds-text-muted text-sm">{t('noAddressSelected')}</p>}

      <AddressBookModal open={modalOpen} onOpenChange={setModalOpen} onSelectAddress={setSelectedAddress} />
    </section>
  );
}
```

The single effect covers three cases in one place: initial load (no selection yet → default to primary/first), the selected address getting deleted (no longer in `addresses` → re-default), and the list becoming empty (clear selection).

- [ ] **Step 2: Write `OrderSummary`**

`src/features/checkout/components/order-summary.tsx`:

```tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useCart } from '@/shared/hooks/use-cart';

export default function OrderSummary() {
  const t = useTranslations('checkoutPage.orderSummary');
  const locale = useLocale();
  const { cartItems, isLoading } = useCart();

  const formatPrice = (value: number | string) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(Number(value));

  const total = cartItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  return (
    <aside className="border-ds-border-soft flex h-fit flex-col gap-4 rounded-lg border p-5">
      <h2 className="text-lg font-semibold">{t('title')}</h2>

      {isLoading && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {!isLoading && cartItems.length === 0 && <p className="text-ds-text-muted text-sm">{t('empty')}</p>}

      {!isLoading && cartItems.length > 0 && (
        <ul className="flex flex-col gap-3">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex flex-col">
                <span className="font-medium">{item.product.title}</span>
                <span className="text-ds-text-muted">{t('quantity', { count: item.quantity })}</span>
              </div>
              <span className="font-medium">{formatPrice(Number(item.product.price) * item.quantity)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="border-ds-border-soft flex items-center justify-between border-t pt-4 font-semibold">
        <span>{t('total')}</span>
        <span>{formatPrice(total)}</span>
      </div>

      <Button type="button" disabled className="w-full">
        {t('placeOrder')}
      </Button>
      <p className="text-ds-text-muted text-center text-xs">{t('comingSoon')}</p>
    </aside>
  );
}
```

This reads a `checkoutPage.orderSummary` namespace that doesn't exist yet in the message files — add it now, in both `src/i18n/messages/en.json` and `src/i18n/messages/ar.json`, nested inside the `checkoutPage` block Task 2 already added (so the final `checkoutPage` shape is `{ title, orderSummary: { title, empty, quantity, total, placeOrder, comingSoon } }`):

English (inside `"checkoutPage": { "title": "Checkout", ... }`, add a sibling key):

```json
    "orderSummary": {
      "title": "Order Summary",
      "empty": "Your cart is empty.",
      "quantity": "Qty {count}",
      "total": "Total",
      "placeOrder": "Place order",
      "comingSoon": "Payment & order placement coming soon"
    }
```

Arabic:

```json
    "orderSummary": {
      "title": "ملخص الطلب",
      "empty": "سلتك فارغة.",
      "quantity": "الكمية {count}",
      "total": "الإجمالي",
      "placeOrder": "إتمام الطلب",
      "comingSoon": "الدفع وتقديم الطلب قريبًا"
    }
```

- [ ] **Step 3: Write `CheckoutView`**

`src/features/checkout/components/checkout-view.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';

import DeliveryAddressSection from './delivery-address-section';
import OrderSummary from './order-summary';

export default async function CheckoutView() {
  const t = await getTranslations('checkoutPage');

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <h1 className="text-ds-text-plain text-2xl font-bold">{t('title')}</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <DeliveryAddressSection />
        <OrderSummary />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Barrel the components**

`src/features/checkout/components/index.ts`:

```ts
export { default as CheckoutView } from './checkout-view';
export { default as DeliveryAddressSection } from './delivery-address-section';
export { default as AddressBookModal } from './address-book-modal';
export { default as AddressList } from './address-list';
export { default as AddressCard } from './address-card';
export { default as AddressWizardForm } from './address-wizard-form';
export { default as AddressStep1Fields } from './address-step1-fields';
export { default as AddressStep2Map } from './address-step2-map';
export { default as GoogleMapPicker } from './google-map-picker';
export { default as OrderSummary } from './order-summary';
```

- [ ] **Step 5: Wire the route**

Replace the entire contents of `src/app/[locale]/(pages)/checkout/page.tsx`:

```tsx
import CheckoutView from '@/features/checkout/components/checkout-view';

export default function CheckoutPage() {
  return <CheckoutView />;
}
```

- [ ] **Step 6: Verify it compiles and lints**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors in any `src/features/checkout/**`, `src/app/api/addresses/**`, `src/app/[locale]/(pages)/checkout/**`, `src/shared/components/ui/dialog.tsx`, or `src/shared/components/progress-steps.tsx` file.

- [ ] **Step 7: Manual browser check**

Run: `npm run dev`, log in, navigate to `/checkout`.
Expected: a "Delivery Address" section (address summary or "No address selected" + a "Manage addresses" button) and an "Order Summary" section reflecting your current cart, no console errors. Clicking "Manage addresses" opens the modal on the list view.

- [ ] **Step 8: Commit**

```bash
git add src/features/checkout/components/delivery-address-section.tsx src/features/checkout/components/order-summary.tsx src/features/checkout/components/checkout-view.tsx src/features/checkout/components/index.ts "src/app/[locale]/(pages)/checkout/page.tsx" src/i18n/messages/en.json src/i18n/messages/ar.json
git commit -m "feat(checkout): add delivery address section, order summary, and wire the /checkout route"
```

---

### Task 15: Full manual QA pass against the ticket's Gherkin scenarios

**Files:** none (verification only).

- [ ] **Step 1: Build check**

Run: `npm run build`
Expected: build succeeds with no type or lint errors.

- [ ] **Step 2: Gherkin — user deletes a saved address**

With a test account that has 2 saved addresses, open the modal, click Delete on the first address, confirm.
Expected: the address is removed, only 1 remains, and a toast reads "Address deleted" (`address.deleted`).

- [ ] **Step 3: Gherkin — user adds an address with a map pin**

Click "Add Address", fill in Step 1 (label, city, address details, phone), click Next, place a pin on the map (click or drag), click "Add Address" on Step 2.
Expected: the address is saved, a toast reads "Address added" (`address.added`), and the modal returns to the list with the new address visible.

- [ ] **Step 4: Empty state**

With zero saved addresses, open the modal.
Expected: "No saved addresses" (`address.empty.title`) with an Add button; the checkout page's Delivery Address section shows "No address selected."

- [ ] **Step 5: Step 1 validation**

On Step 1, leave a field empty (or enter an invalid phone) and click Next.
Expected: inline validation errors, cannot advance to Step 2 until all fields are valid.

- [ ] **Step 6: Step 2 validation — pin required**

Reach Step 2 without placing a pin, click the submit button.
Expected: `address.pinRequired` message shown, no request is sent (check the Network tab), the form does not close.

- [ ] **Step 7: Edit pre-fills correctly**

Click Edit on an existing address.
Expected: the same 2-step wizard opens with Step 1 pre-filled from that address's current values, and Step 2's map already shows a pin at the address's saved coordinates.

- [ ] **Step 8: Back retains Step 1 values**

On Step 1, enter values, click Next, then click Back.
Expected: Step 1 still shows everything you typed — nothing was cleared.

- [ ] **Step 9: Cancel during edit**

Open Edit on an address, change a field, then close the modal (X button or outside click) without submitting.
Expected: modal closes, no toast, no request sent, and reopening the modal shows the list view (not the form) with the address unchanged.

- [ ] **Step 10: Deleting the last address**

Delete addresses down to the last one, delete it too.
Expected: the empty state renders immediately with its Add CTA — no flash of a broken list.

- [ ] **Step 11: Geolocation denied**

Click "Find My Location" and deny the browser's permission prompt.
Expected: `address.locationDenied` ("Location access denied. Please pin manually.") shown inline near the button; the user can still click/drag to place a pin manually.

- [ ] **Step 12: Offline map load**

Simulate offline (e.g. DevTools Network → Offline) before opening Step 2, or throttle to block the Maps script.
Expected: the map container shows `address.mapLoadError` instead of crashing; the rest of the modal (Back button) remains usable.

- [ ] **Step 13: Selecting an address for checkout**

With 2+ addresses, open the modal from the checkout page, click a card's body (not Edit/Delete).
Expected: the modal closes and the Delivery Address section on the checkout page now shows that address.

- [ ] **Step 14: RTL check**

Switch the locale to Arabic (`/ar/checkout`).
Expected: all new copy is in Arabic, layout mirrors correctly (address cards, wizard, modal close button in the correct corner), the map itself renders fine (Google Maps handles its own internal LTR controls regardless of page direction — this is expected and not a bug).

- [ ] **Step 15: Final commit (if any fixes were needed)**

If steps 1–14 required fixes, commit them:

```bash
git add -A
git commit -m "fix(checkout): address issues found in manual QA pass"
```

If no fixes were needed, this task requires no commit.
