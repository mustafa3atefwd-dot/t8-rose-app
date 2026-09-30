# Shared Components

A collection of reusable components located in `@/shared/components`.

The main goal of these components is to reduce code duplication, standardize the UI across the application, and make common logic reusable across different features.

---

## Components Overview

| Component           | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `FormField`         | Reusable input and textarea form fields         |
| `PasswordFormField` | Reusable password field with visibility control |
| `PhoneFormField`    | Reusable phone number field                     |
| `FormError`         | Displays general form errors                    |
| `SectionLabel`      | Standardized section labels                     |
| `SectionTitle`      | Standardized section titles                     |
| `Rating`            | Displays ratings from 0 to 5                    |
| `ImageWithSkeleton` | Image component with loading and error states   |

---

# Form Components

## FormField

A reusable form field component built on top of React Hook Form.

It handles the common boilerplate required for form fields, including:

- `Controller`
- `Field`
- `FieldLabel`
- `FieldError`
- Input / Textarea

Instead of repeating the same logic in every form, use `FormField`.

### Usage

```tsx
<FormField control={form.control} name="firstName" label={t('firstName')} placeholder={tInput('firstName')} required />
```

### Textarea

To render a `Textarea` instead of an `Input`, use the `variant` prop:

```tsx
<FormField control={form.control} name="description" label={t('description')} variant="textarea" required />
```

### Supported Props

| Prop       | Description                            |
| ---------- | -------------------------------------- |
| `name`     | The field name used by React Hook Form |
| `control`  | React Hook Form control                |
| `label`    | The field label                        |
| `variant`  | Field type: `input` or `textarea`      |
| `required` | Displays the required indicator        |
| `...props` | Additional Input or Textarea props     |

> The default value of `variant` is `input`.

### Features

`FormField` automatically handles:

- React Hook Form integration
- Label rendering
- Required indicator
- Invalid field state
- Validation error rendering
- Zod validation errors

---

## PasswordFormField

A reusable password field component with built-in password-specific behavior.

It handles:

- React Hook Form integration
- Password visibility
- Validation errors
- Required state

### Usage

```tsx
<PasswordFormField
  name="password"
  control={form.control}
  label={t('password')}
  placeholder={tInput('passwordPlaceholder')}
/>
```

---

## PhoneFormField

A reusable phone number field component integrated with React Hook Form and form validation.

### Usage

```tsx
<PhoneFormField name="phone" control={form.control} label={t('phoneNumber')} />
```

---

## FormError

A component used to display general form-level errors, especially errors returned from the backend.

Use it for errors that are not related to a specific field, such as:

- Login failed
- Invalid credentials
- User already exists
- Server errors
- Other general form errors

### Usage

```tsx
{
  mutation.isError && <FormError message={(mutation.error as Error).message} />;
}
```

The component does not render if no `message` is provided:

```tsx
if (!message) return null;
```

---

# Section Components

## SectionLabel

A reusable component for displaying standardized section labels.

### Usage

```tsx
<SectionLabel>{t('label')}</SectionLabel>
```

Custom classes can be added using `className`:

```tsx
<SectionLabel className="...">{t('label')}</SectionLabel>
```

---

## SectionTitle

A reusable component for displaying standardized section titles.

It centralizes the common styling and behavior used across section headings.

### Usage

```tsx
<SectionTitle>{t('title')}</SectionTitle>
```

### Features

- Typography
- Background decoration
- Underline
- RTL / LTR support
- Dark mode support
- Responsive font sizes

Custom styling can be added using `className`:

```tsx
<SectionTitle className="...">{t('title')}</SectionTitle>
```

---

# UI Components

## Rating

A reusable rating component that supports ratings from `0` to `5`.

### Usage

```tsx
<Rating rating={testimonial.rating} />
```

The component also supports fractional ratings.

### Example

```tsx
<Rating rating={4.5} />
```

This will display:

- 4 full stars
- Half of the fifth star

Custom styling can be added using `className`:

```tsx
<Rating rating={testimonial.rating} className="..." />
```

---

## ImageWithSkeleton

A wrapper around the Next.js `Image` component that provides better loading and error states.

### Features

- Displays a skeleton while the image is loading
- Hides the image during loading
- Adds a fade-in animation after loading
- Displays a fallback image if the image fails to load
- Supports most standard `next/image` props

### Usage

```tsx
<ImageWithSkeleton
  src={testimonial.image}
  alt={testimonial.name}
  fill
  sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
  className="object-cover"
/>
```

The component is built on top of `ImageProps`, so it supports common Next.js Image props, including:

- `src`
- `alt`
- `fill`
- `sizes`
- `width`
- `height`
- `className`

### Fallback Image

A custom fallback image can be provided using the `fallback` prop:

```tsx
<ImageWithSkeleton src={image} alt="Example" fallback="/images/custom-placeholder.png" />
```

The default fallback image is:

```text
/images/image-placeholder.png
```

---

# Guidelines

Before creating a new component, check whether an existing Shared Component can be reused.

If an existing component needs to support a new use case, prefer extending it while keeping it reusable instead of duplicating the same logic in multiple places.

## Goals of Shared Components

- Reduce code duplication
- Standardize the UI
- Reduce boilerplate
- Simplify form and validation handling
- Reuse common logic
- Keep feature components simpler and clearer
- Ensure design and behavior changes are reflected across all usages
