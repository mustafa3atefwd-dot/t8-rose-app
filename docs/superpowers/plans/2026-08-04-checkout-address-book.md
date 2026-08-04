# Checkout Address Book Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up `/checkout` with a fully working address book (list, add, edit, delete, select-for-order, set-primary) plus a read-only order summary panel, per `docs/superpowers/specs/2026-08-04-checkout-address-book-design.md`.

**Architecture:** New `src/features/checkout` feature following the repo's real conventions (verified against `features/notifications` and `features/auth`, not the generic feature-based-folder-architecture template — the two disagree and existing code wins): flat `hooks/` folder, `'use server'` actions in `lib/actions`, thin Next.js route handlers under `app/api/addresses`, `react-hook-form` + `zod` forms, `@tanstack/react-query` for server state. A new generic `Dialog` primitive is added to `shared/components/ui` (none exists yet) to power the add/edit modal.

**Tech Stack:** Next.js 16 (App Router), React 19, `@tanstack/react-query` v5, `react-hook-form` + `zod` v4 + `@hookform/resolvers`, `@base-ui/react` (headless primitives), `next-intl`, `next-auth`, Tailwind v4 with `ds-*` semantic tokens, `sonner` toasts via `shared/components/ui/toast`.

## Global Constraints

- Use `ds-*` semantic Tailwind utilities for all colors/borders/rings — never arbitrary or primitive color values (project convention; see design-system semantic tokens).
- No automated test framework exists in this repo (no `jest`/`vitest`, no test script in `package.json`, zero existing test files under `src`). Do not invent one for this feature. Verification per task is: `npx tsc --noEmit` (or `npm run build`) + `npm run lint` clean, plus a manual browser check for interactive tasks. The final task is a full manual QA pass.
- Server-side backend calls always go through `'use server'` action functions using `apiRequest` (from `shared/lib/utils/request.util.ts`) and `getNextAuthToken()` (from `shared/lib/utils/get-token.util.ts`) for the bearer token — mirrors `features/notifications/lib/actions/update-notification.action.ts`.
- Client hooks fetch the **internal** `/api/...` route, never the backend directly — mirrors `features/notifications/hooks/*`.
- Currency formatting: `new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 })` — copied from `features/products/components/product-card.tsx`, the only existing price-formatting code in the repo.
- Latitude/longitude are **not** collected or sent by this feature (explicit scope decision).
- `/checkout` is already auth-gated by `src/proxy.ts` (default-protected; not in `PUBLIC_PAGES`/`AUTH_PAGES`/`/products`), so no middleware changes are needed.

---

### Task 1: Address types and query-key constant

**Files:**
- Create: `src/features/checkout/lib/types/api.d.ts`
- Create: `src/features/checkout/lib/types/index.ts`
- Create: `src/features/checkout/lib/constants/index.ts`

**Interfaces:**
- Produces: `Address`, `AddressResponse`, `AddressesResponse`, `CreateAddressPayload`, `UpdateAddressPayload` (all re-exported from `lib/types/index.ts`); `ADDRESSES_QUERY_KEY` from `lib/constants/index.ts`. Every later task imports these.

- [ ] **Step 1: Create the types file**

`src/features/checkout/lib/types/api.d.ts`:

```ts
export interface Address {
  id: string;
  userId: string;
  title: string;
  isPrimary: boolean;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressResponse {
  status: boolean;
  code: number;
  payload: {
    address: Address;
  };
}

export interface AddressesResponse {
  status: boolean;
  code: number;
  payload: {
    addresses: Address[];
  };
}

export interface CreateAddressPayload {
  title: string;
  city: string;
  street: string;
  phone: string;
  isPrimary?: boolean;
}

export type UpdateAddressPayload = Partial<CreateAddressPayload>;
```

**Note on `AddressesResponse`:** the `GET /api/addresses` response body wasn't given to us — this shape assumes it mirrors the confirmed single-item envelope (`payload.address`) pluralized to `payload.addresses`. If the real backend response differs, this is the only place to fix.

- [ ] **Step 2: Create the types barrel**

`src/features/checkout/lib/types/index.ts`:

```ts
export type {
  Address,
  AddressResponse,
  AddressesResponse,
  CreateAddressPayload,
  UpdateAddressPayload,
} from './api';
```

- [ ] **Step 3: Create the query-key constant**

`src/features/checkout/lib/constants/index.ts`:

```ts
export const ADDRESSES_QUERY_KEY = ['addresses'] as const;
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing `features/checkout`.

- [ ] **Step 5: Commit**

```bash
git add src/features/checkout/lib/types src/features/checkout/lib/constants
git commit -m "feat(checkout): add address types and query-key constant"
```

---

### Task 2: Checkout i18n messages (en/ar)

**Files:**
- Modify: `src/i18n/messages/en.json`
- Modify: `src/i18n/messages/ar.json`

**Interfaces:**
- Produces: a top-level `checkout` message namespace (`checkout.title`, `checkout.addressBook.*`, `checkout.addressForm.*`, `checkout.orderSummary.*`) consumed by every component task below via `useTranslations('checkout...')` / `getTranslations('checkout')`. Also relies on the **existing** top-level `validation.required` / `validation.invalidPhone` keys (already present in `en.json`/`ar.json`) for form validation messages — no new validation keys are added.

- [ ] **Step 1: Add the `checkout` namespace to `en.json`**

Insert immediately after the existing `productDetails` block (right before the `toast` key). Find this exact anchor:

```json
    "galleryLabel": "Product images",
    "imageLabel": "Product image"
  },
  "toast": {
```

Replace it with:

```json
    "galleryLabel": "Product images",
    "imageLabel": "Product image"
  },
  "checkout": {
    "title": "Checkout",
    "addressBook": {
      "title": "Delivery Address",
      "addAddress": "Add address",
      "edit": "Edit",
      "delete": "Delete",
      "setPrimary": "Set as primary",
      "primaryBadge": "Primary",
      "selectAddress": "Select this address",
      "empty": {
        "title": "No saved addresses yet",
        "description": "Add an address to continue with your order."
      },
      "loadError": "We couldn't load your addresses.",
      "deleteSuccess": "Address deleted.",
      "deleteError": "Failed to delete address.",
      "setPrimarySuccess": "Primary address updated.",
      "setPrimaryError": "Failed to update primary address."
    },
    "addressForm": {
      "addTitle": "Add address",
      "editTitle": "Edit address",
      "labels": {
        "title": "Label",
        "city": "City",
        "street": "Street address",
        "phone": "Phone number",
        "isPrimary": "Set as primary address"
      },
      "placeholders": {
        "title": "e.g. Home, Work",
        "city": "e.g. New York",
        "street": "e.g. 123 Main St, Apt 4"
      },
      "cancel": "Cancel",
      "save": "Save address",
      "saving": "Saving...",
      "createSuccess": "Address added.",
      "updateSuccess": "Address updated."
    },
    "orderSummary": {
      "title": "Order Summary",
      "empty": "Your cart is empty.",
      "quantity": "Qty {count}",
      "total": "Total",
      "placeOrder": "Place order",
      "comingSoon": "Payment & order placement coming soon"
    }
  },
  "toast": {
```

- [ ] **Step 2: Add the matching `checkout` namespace to `ar.json`**

Find this exact anchor:

```json
    "galleryLabel": "صور المنتج",
    "imageLabel": "صورة المنتج"
  },

  "toast": {
```

Replace it with:

```json
    "galleryLabel": "صور المنتج",
    "imageLabel": "صورة المنتج"
  },

  "checkout": {
    "title": "إتمام الطلب",
    "addressBook": {
      "title": "عنوان التوصيل",
      "addAddress": "إضافة عنوان",
      "edit": "تعديل",
      "delete": "حذف",
      "setPrimary": "تعيين كعنوان أساسي",
      "primaryBadge": "أساسي",
      "selectAddress": "اختيار هذا العنوان",
      "empty": {
        "title": "لا توجد عناوين محفوظة بعد",
        "description": "أضف عنوانًا للمتابعة في طلبك."
      },
      "loadError": "تعذر تحميل عناوينك.",
      "deleteSuccess": "تم حذف العنوان.",
      "deleteError": "فشل حذف العنوان.",
      "setPrimarySuccess": "تم تحديث العنوان الأساسي.",
      "setPrimaryError": "فشل تحديث العنوان الأساسي."
    },
    "addressForm": {
      "addTitle": "إضافة عنوان",
      "editTitle": "تعديل العنوان",
      "labels": {
        "title": "التسمية",
        "city": "المدينة",
        "street": "عنوان الشارع",
        "phone": "رقم الهاتف",
        "isPrimary": "تعيين كعنوان أساسي"
      },
      "placeholders": {
        "title": "مثال: المنزل، العمل",
        "city": "مثال: القاهرة",
        "street": "مثال: 123 شارع الرئيسي، شقة 4"
      },
      "cancel": "إلغاء",
      "save": "حفظ العنوان",
      "saving": "جارٍ الحفظ...",
      "createSuccess": "تمت إضافة العنوان.",
      "updateSuccess": "تم تحديث العنوان."
    },
    "orderSummary": {
      "title": "ملخص الطلب",
      "empty": "سلتك فارغة.",
      "quantity": "الكمية {count}",
      "total": "الإجمالي",
      "placeOrder": "إتمام الطلب",
      "comingSoon": "الدفع وتقديم الطلب قريبًا"
    }
  },

  "toast": {
```

- [ ] **Step 3: Verify both files are valid JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/i18n/messages/en.json','utf8')); JSON.parse(require('fs').readFileSync('src/i18n/messages/ar.json','utf8')); console.log('OK')"`
Expected: prints `OK` with no exception.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/messages/en.json src/i18n/messages/ar.json
git commit -m "feat(checkout): add checkout i18n messages (en/ar)"
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
- Produces: `getAddresses()`, `createAddress(payload)`, `updateAddress(addressId, payload)`, `deleteAddress(addressId)` (all `'use server'`), and two working Next.js routes: `GET /api/addresses`, `POST /api/addresses`, `PATCH /api/addresses/[addressId]`, `DELETE /api/addresses/[addressId]`.

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

// Update an existing address (also used to set/unset isPrimary)
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

Expected: `200` with a JSON body shaped like `{ status, code, payload: { addresses: [...] } }` (or `{ status: false, ... }` if you have no session cookie handy — either response confirms the route is wired end-to-end). If the payload key differs from `addresses`, fix `AddressesResponse` in Task 1 now before continuing.

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
- Consumes: `libphonenumber-js/max`'s `isValidPhoneNumber` (already a project dependency, used the same way in `features/auth/lib/schemas/user-info-step.schema.ts`).
- Produces: `addressSchema(messages)` and `AddressSchema` type, consumed by Task 6's `useAddressForm`.

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
    isPrimary: z.boolean(),
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
- Consumes: `AddressResponse`, `AddressesResponse`, `CreateAddressPayload`, `UpdateAddressPayload` (Task 1), `ADDRESSES_QUERY_KEY` (Task 1). Hits `/api/addresses` and `/api/addresses/[id]` (Task 3).
- Produces: `useAddresses()` → `UseQueryResult<AddressesResponse>`; `useCreateAddress()` → mutation taking `CreateAddressPayload`; `useUpdateAddress()` → mutation taking `{ id: string; payload: UpdateAddressPayload }`; `useDeleteAddress()` → mutation taking `addressId: string`. All consumed by Task 10 (`AddressBook`) and Task 6 (`useAddressForm`).

- [ ] **Step 1: Write the list query hook**

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

- [ ] **Step 2: Write the create mutation hook**

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

- [ ] **Step 3: Write the update mutation hook**

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

- [ ] **Step 4: Write the delete mutation hook**

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

- [ ] **Step 5: Barrel the hooks so far**

`src/features/checkout/hooks/index.ts`:

```ts
export { useAddresses } from './use-addresses';
export { useCreateAddress } from './use-create-address';
export { useUpdateAddress } from './use-update-address';
export { useDeleteAddress } from './use-delete-address';
```

(Task 6 adds one more export to this file — `useAddressForm`.)

- [ ] **Step 6: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/features/checkout/hooks
git commit -m "feat(checkout): add address data hooks"
```

---

### Task 6: Address form hook

**Files:**
- Create: `src/features/checkout/hooks/use-address-form.ts`
- Modify: `src/features/checkout/hooks/index.ts`

**Interfaces:**
- Consumes: `addressSchema`, `AddressSchema` (Task 4); `useCreateAddress`, `useUpdateAddress` (Task 5); `Address`, `CreateAddressPayload` (Task 1); `toast` from `@/shared/components/ui/toast`.
- Produces: `useAddressForm(props)` returning `{ form: UseFormReturn<AddressSchema>; onSubmit: (values: AddressSchema) => void; isPending: boolean }`, consumed by Task 8's `AddressForm`.

- [ ] **Step 1: Write the hook**

`src/features/checkout/hooks/use-address-form.ts`:

```ts
'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/shared/components/ui/toast';
import { addressSchema, AddressSchema } from '../lib/schemas';
import { Address, CreateAddressPayload } from '../lib/types';
import { useCreateAddress } from './use-create-address';
import { useUpdateAddress } from './use-update-address';

interface IUseAddressFormProps {
  mode: 'create' | 'edit';
  address?: Address;
  onSuccess: () => void;
}

export function useAddressForm({ mode, address, onSuccess }: IUseAddressFormProps) {
  const t = useTranslations('validation');
  const tForm = useTranslations('checkout.addressForm');

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
      isPrimary: address?.isPrimary ?? false,
    },
  });

  const createMutation = useCreateAddress();
  const updateMutation = useUpdateAddress();

  const isPending = mode === 'create' ? createMutation.isPending : updateMutation.isPending;

  function onSubmit(values: AddressSchema) {
    const payload: CreateAddressPayload = {
      title: values.title,
      city: values.city,
      street: values.street,
      phone: values.phone.phone,
      isPrimary: values.isPrimary,
    };

    // Callers only ever pass mode: 'edit' together with an address (see AddressForm).
    const request =
      mode === 'create'
        ? createMutation.mutateAsync(payload)
        : updateMutation.mutateAsync({ id: address!.id, payload });

    request
      .then(() => {
        toast.success(mode === 'create' ? tForm('createSuccess') : tForm('updateSuccess'));
        onSuccess();
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  }

  return { form, onSubmit, isPending };
}
```

- [ ] **Step 2: Add it to the hooks barrel**

In `src/features/checkout/hooks/index.ts`, add:

```ts
export { useAddressForm } from './use-address-form';
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/checkout/hooks
git commit -m "feat(checkout): add address form hook"
```

---

### Task 7: Shared Dialog primitive

**Files:**
- Create: `src/shared/components/ui/dialog.tsx`

**Interfaces:**
- Consumes: `@base-ui/react/dialog` (confirmed present in `node_modules/@base-ui/react/dialog`, exporting `Dialog.{Root,Trigger,Portal,Backdrop,Popup,Title,Description,Close}` — same library and pattern already used for `Menu` in `shared/components/ui/dropdown-menu.tsx`); `cn` from `@/shared/lib/utils`.
- Produces: `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogBackdrop`, `DialogClose`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription` — consumed by Task 8 (`AddressFormModal`). This is a generic design-system primitive (like `Button`/`Checkbox`), so it lives directly in `shared/components/ui` even though checkout is its first consumer.

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

### Task 8: Address form and modal components

**Files:**
- Create: `src/features/checkout/components/address-form.tsx`
- Create: `src/features/checkout/components/address-form-modal.tsx`

**Interfaces:**
- Consumes: `useAddressForm` (Task 6); `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` (Task 7); `Address` (Task 1); `FormField`, `PhoneFormField`, `SubmitButton` from `@/shared/components`; `Checkbox` from `@/shared/components/ui/checkbox`; `Button` from `@/shared/components/ui/button`.
- Produces: `AddressForm` (default export) and `AddressFormModal` (default export), consumed by Task 10 (`AddressBook`).

- [ ] **Step 1: Write `AddressForm`**

`src/features/checkout/components/address-form.tsx`:

```tsx
'use client';

import { Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { FormField, PhoneFormField, SubmitButton } from '@/shared/components';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Button } from '@/shared/components/ui/button';
import { useAddressForm } from '../hooks';
import { Address } from '../lib/types';

interface IAddressFormProps {
  mode: 'create' | 'edit';
  address?: Address;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddressForm({ mode, address, onSuccess, onCancel }: IAddressFormProps) {
  const t = useTranslations('checkout.addressForm');
  const { form, onSubmit, isPending } = useAddressForm({ mode, address, onSuccess });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormField name="title" control={form.control} label={t('labels.title')} placeholder={t('placeholders.title')} required />

      <FormField name="city" control={form.control} label={t('labels.city')} placeholder={t('placeholders.city')} required />

      <FormField
        name="street"
        control={form.control}
        label={t('labels.street')}
        placeholder={t('placeholders.street')}
        required
      />

      <PhoneFormField name="phone" control={form.control} label={t('labels.phone')} />

      <Controller
        control={form.control}
        name="isPrimary"
        render={({ field }) => (
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="address-is-primary"
              checked={Boolean(field.value)}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
            <label htmlFor="address-is-primary" className="cursor-pointer text-sm">
              {t('labels.isPrimary')}
            </label>
          </div>
        )}
      />

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('cancel')}
        </Button>
        <SubmitButton isLoading={isPending} loadingText={t('saving')} className="my-0 w-full sm:w-auto">
          {t('save')}
        </SubmitButton>
      </div>
    </form>
  );
}
```

`useAddressForm` is called unconditionally with `mode`/`address` forwarded straight through — never call a hook from inside a branch (that trips `react-hooks/rules-of-hooks`); branch on `mode` only *inside* the hook, as `use-address-form.ts` already does.

- [ ] **Step 2: Write `AddressFormModal`**

`src/features/checkout/components/address-form-modal.tsx`:

```tsx
'use client';

import { useTranslations } from 'next-intl';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import AddressForm from './address-form';
import { Address } from '../lib/types';

interface IAddressFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  address?: Address;
}

export default function AddressFormModal({ open, onOpenChange, mode, address }: IAddressFormModalProps) {
  const t = useTranslations('checkout.addressForm');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? t('addTitle') : t('editTitle')}</DialogTitle>
        </DialogHeader>

        <AddressForm
          mode={mode}
          address={address}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/checkout/components/address-form.tsx src/features/checkout/components/address-form-modal.tsx
git commit -m "feat(checkout): add address form and modal components"
```

---

### Task 9: Address card component

**Files:**
- Create: `src/features/checkout/components/address-card.tsx`

**Interfaces:**
- Consumes: `Address` (Task 1); `Button` from `@/shared/components/ui/button`; `Badge` from `@/shared/components/ui/badge`; `cn` from `@/shared/lib/utils`.
- Produces: `AddressCard` (default export), a single radio-selectable card with Edit/Delete/Set-primary actions. Consumed by Task 10 (`AddressBook`), which renders it inside a `role="radiogroup"` container.

- [ ] **Step 1: Write the component**

`src/features/checkout/components/address-card.tsx`:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { Pencil, Star, Trash2 } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { Address } from '../lib/types';

interface IAddressCardProps {
  address: Address;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSetPrimary: () => void;
  isDeleting: boolean;
  isSettingPrimary: boolean;
}

export default function AddressCard({
  address,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onSetPrimary,
  isDeleting,
  isSettingPrimary,
}: IAddressCardProps) {
  const t = useTranslations('checkout.addressBook');

  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        'border-ds-border-soft focus-visible:ring-ds-ring flex cursor-pointer items-start gap-3 rounded-lg border p-4 outline-none transition-colors focus-visible:ring-3',
        selected && 'border-ds-border-primary bg-ds-bg-primary/5'
      )}
    >
      <span
        aria-hidden
        className={cn(
          'border-ds-border-soft mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border',
          selected && 'border-ds-border-primary'
        )}
      >
        {selected && <span className="bg-ds-bg-primary-saturated size-2 rounded-full" />}
      </span>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{address.title}</span>
          {address.isPrimary && <Badge variant="default">{t('primaryBadge')}</Badge>}
        </div>

        <p className="text-ds-text-muted text-sm">
          {address.street}, {address.city}
        </p>
        <p className="text-ds-text-muted text-sm" dir="ltr">
          {address.phone}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
            className="gap-1 px-2"
          >
            <Pencil className="size-3.5" />
            {t('edit')}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isDeleting}
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            className="text-ds-text-danger hover:bg-destructive/10 gap-1 px-2"
          >
            <Trash2 className="size-3.5" />
            {t('delete')}
          </Button>

          {!address.isPrimary && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isSettingPrimary}
              onClick={(event) => {
                event.stopPropagation();
                onSetPrimary();
              }}
              className="gap-1 px-2"
            >
              <Star className="size-3.5" />
              {t('setPrimary')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
```

Selection is a custom `role="radio"` div (not a native `<input type="radio">` wrapped in `<label>`) specifically so the nested Edit/Delete/Set-primary `<button>`s can call `event.stopPropagation()` and not also trigger the card's own `onSelect` — native `<label>`-wrapped controls don't allow suppressing that bubcled activation.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/features/checkout/components/address-card.tsx
git commit -m "feat(checkout): add address card component"
```

---

### Task 10: Address book component

**Files:**
- Create: `src/features/checkout/components/address-book.tsx`

**Interfaces:**
- Consumes: `useAddresses`, `useDeleteAddress`, `useUpdateAddress` (Task 5); `AddressCard` (Task 9); `AddressFormModal` (Task 8); `Address` (Task 1); `toast` from `@/shared/components/ui/toast`; `Skeleton` from `@/shared/components/ui/skeleton`; `Button` from `@/shared/components/ui/button`.
- Produces: `AddressBook` (default export) — fully self-contained (owns its own data fetching, selection state, and modal state). Consumed by Task 12 (`CheckoutView`). No props.

- [ ] **Step 1: Write the component**

`src/features/checkout/components/address-book.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPinPen, Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { toast } from '@/shared/components/ui/toast';
import { useAddresses, useDeleteAddress, useUpdateAddress } from '../hooks';
import { Address } from '../lib/types';
import AddressCard from './address-card';
import AddressFormModal from './address-form-modal';

type ModalState = { mode: 'create' | 'edit'; address?: Address };

export default function AddressBook() {
  const t = useTranslations('checkout.addressBook');

  const { data, isLoading, isError } = useAddresses();
  const deleteMutation = useDeleteAddress();
  const updateMutation = useUpdateAddress();

  const addresses = data?.payload.addresses ?? [];

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState | null>(null);

  useEffect(() => {
    if (selectedAddressId || addresses.length === 0) return;

    const primary = addresses.find((address) => address.isPrimary);
    setSelectedAddressId((primary ?? addresses[0]).id);
  }, [addresses, selectedAddressId]);

  function handleDelete(address: Address) {
    deleteMutation.mutate(address.id, {
      onSuccess: () => {
        toast.success(t('deleteSuccess'));
        if (selectedAddressId === address.id) {
          setSelectedAddressId(null);
        }
      },
      onError: () => toast.error(t('deleteError')),
    });
  }

  function handleSetPrimary(address: Address) {
    updateMutation.mutate(
      { id: address.id, payload: { isPrimary: true } },
      {
        onSuccess: () => toast.success(t('setPrimarySuccess')),
        onError: () => toast.error(t('setPrimaryError')),
      }
    );
  }

  return (
    <section className="border-ds-border-soft rounded-lg border p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('title')}</h2>

        <Button type="button" size="sm" onClick={() => setModalState({ mode: 'create' })} className="gap-1.5">
          <Plus className="size-4" />
          {t('addAddress')}
        </Button>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {!isLoading && isError && <p className="text-ds-text-danger text-sm">{t('loadError')}</p>}

      {!isLoading && !isError && addresses.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <MapPinPen className="text-ds-text-muted size-8" />
          <p className="font-medium">{t('empty.title')}</p>
          <p className="text-ds-text-muted text-sm">{t('empty.description')}</p>
        </div>
      )}

      {!isLoading && !isError && addresses.length > 0 && (
        <div role="radiogroup" aria-label={t('title')} className="flex flex-col gap-3">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              selected={selectedAddressId === address.id}
              onSelect={() => setSelectedAddressId(address.id)}
              onEdit={() => setModalState({ mode: 'edit', address })}
              onDelete={() => handleDelete(address)}
              onSetPrimary={() => handleSetPrimary(address)}
              isDeleting={deleteMutation.isPending && deleteMutation.variables === address.id}
              isSettingPrimary={updateMutation.isPending && updateMutation.variables?.id === address.id}
            />
          ))}
        </div>
      )}

      {modalState && (
        <AddressFormModal
          open
          onOpenChange={(open) => {
            if (!open) setModalState(null);
          }}
          {...modalState}
        />
      )}
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/features/checkout/components/address-book.tsx
git commit -m "feat(checkout): add address book component"
```

---

### Task 11: Order summary component

**Files:**
- Create: `src/features/checkout/components/order-summary.tsx`

**Interfaces:**
- Consumes: `useCart` from `@/shared/hooks/use-cart` (existing hook — `{ cartItems: CartItem[]; isLoading: boolean }`); `Skeleton` from `@/shared/components/ui/skeleton`; `Button` from `@/shared/components/ui/button`.
- Produces: `OrderSummary` (default export), a read-only panel with a disabled "Place order" stub. Consumed by Task 12 (`CheckoutView`). No props.

- [ ] **Step 1: Write the component**

`src/features/checkout/components/order-summary.tsx`:

```tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useCart } from '@/shared/hooks/use-cart';

export default function OrderSummary() {
  const t = useTranslations('checkout.orderSummary');
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

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/features/checkout/components/order-summary.tsx
git commit -m "feat(checkout): add order summary component"
```

---

### Task 12: Checkout view and route wiring

**Files:**
- Create: `src/features/checkout/components/checkout-view.tsx`
- Create: `src/features/checkout/components/index.ts`
- Modify: `src/app/[locale]/(pages)/checkout/page.tsx`

**Interfaces:**
- Consumes: `AddressBook` (Task 10), `OrderSummary` (Task 11), `getTranslations` from `next-intl/server` (server-component translation API — matches `src/app/[locale]/(pages)/categories/page.tsx`, not the client-only `useTranslations`).
- Produces: `CheckoutView` (default export), rendered by the `/checkout` route. This is the first task where the feature is actually visitable in the browser.

- [ ] **Step 1: Write `CheckoutView`**

`src/features/checkout/components/checkout-view.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';

import AddressBook from './address-book';
import OrderSummary from './order-summary';

export default async function CheckoutView() {
  const t = await getTranslations('checkout');

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <h1 className="text-ds-text-plain text-2xl font-bold">{t('title')}</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <AddressBook />
        <OrderSummary />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Barrel the components**

`src/features/checkout/components/index.ts`:

```ts
export { default as CheckoutView } from './checkout-view';
export { default as AddressBook } from './address-book';
export { default as AddressCard } from './address-card';
export { default as AddressForm } from './address-form';
export { default as AddressFormModal } from './address-form-modal';
export { default as OrderSummary } from './order-summary';
```

- [ ] **Step 3: Wire the route**

Replace the entire contents of `src/app/[locale]/(pages)/checkout/page.tsx`:

```tsx
import CheckoutView from '@/features/checkout/components/checkout-view';

export default function CheckoutPage() {
  return <CheckoutView />;
}
```

- [ ] **Step 4: Verify it compiles and lints**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors in any `src/features/checkout/**`, `src/app/api/addresses/**`, `src/app/[locale]/(pages)/checkout/**`, or `src/shared/components/ui/dialog.tsx` file.

- [ ] **Step 5: Manual browser check**

Run: `npm run dev`, log in, navigate to `/checkout`.
Expected: the page renders a "Delivery Address" section (list or empty state) and an "Order Summary" section reflecting your current cart, with no console errors.

- [ ] **Step 6: Commit**

```bash
git add src/features/checkout/components/checkout-view.tsx src/features/checkout/components/index.ts "src/app/[locale]/(pages)/checkout/page.tsx"
git commit -m "feat(checkout): wire checkout view into the /checkout route"
```

---

### Task 13: Full manual QA pass

**Files:** none (verification only).

- [ ] **Step 1: Build check**

Run: `npm run build`
Expected: build succeeds with no type or lint errors.

- [ ] **Step 2: Empty state**

With a test account that has zero saved addresses, visit `/checkout`.
Expected: "No saved addresses yet" empty state with a visible "Add address" button; Order Summary shows cart contents (or "Your cart is empty.") independent of address state.

- [ ] **Step 3: Create an address**

Click "Add address", fill in title/city/street/phone, submit.
Expected: modal closes, a success toast appears, the new address appears in the list. If it's the only address, it should end up selected (highlighted) automatically.

- [ ] **Step 4: Select for this order**

With 2+ addresses saved, click a non-selected card.
Expected: the clicked card becomes visually selected; no network request fires (check the Network tab — selecting must not call the API).

- [ ] **Step 5: Set primary**

Click "Set as primary" on a non-primary card.
Expected: a `PATCH /api/addresses/{id}` request fires, a success toast appears, the "Primary" badge moves to that card, and the "Set as primary" button disappears from it (since it's now primary).

- [ ] **Step 6: Edit an address**

Click "Edit" on any card.
Expected: modal opens pre-filled with that address's current values; changing a field and saving updates the card in place with a success toast.

- [ ] **Step 7: Delete an address**

Click "Delete" on the currently-selected address.
Expected: it disappears from the list with a success toast, and selection re-defaults to the primary (or first remaining) address — verify no stale/removed address stays visually selected.

- [ ] **Step 8: Refresh persistence**

Reload `/checkout` after the above steps.
Expected: the address list reflects all changes (create/edit/delete/set-primary persisted server-side), and selection re-defaults to the primary address.

- [ ] **Step 9: RTL check**

Switch the locale to Arabic (`/ar/checkout`).
Expected: all new checkout copy is in Arabic, layout mirrors correctly (no broken alignment in the address cards, form, or modal), and the modal's close button sits in the correct corner.

- [ ] **Step 10: Final commit (if any fixes were needed)**

If steps 1–9 required fixes, commit them:

```bash
git add -A
git commit -m "fix(checkout): address issues found in manual QA pass"
```

If no fixes were needed, this task requires no commit.
