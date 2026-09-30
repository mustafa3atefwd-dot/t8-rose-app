"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import {
  FileInput,
  Input,
  InputField,
  NumberInput,
  OtpInput,
  PasswordInput,
  PhoneInput,
  SearchInput,
} from "@/shared/components/ui/inputs";

function ShowcaseCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 text-card-foreground">
      <div className="space-y-1">
        <h3 className="text-heading-md font-bold">{title}</h3>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

export function InputShowcase() {
  const t = useTranslations("input");

  // Email field — validated on submit (required + format).
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState<string | null>(null);

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError(t("required"));
      return false;
    }
    if (!EMAIL_RE.test(email)) {
      setEmailError(t("invalidEmail"));
      return false;
    }
    setEmailError(null);
    return true;
  };

  // OTP — success line once all six digits are filled.
  const [otp, setOtp] = React.useState("");
  const otpComplete = otp.length === 6;

  // File — inline error on rejected type/size.
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [fileError, setFileError] = React.useState<string | null>(null);

  // Phone — validity reflected as success / error after the user types.
  const [phoneTouched, setPhoneTouched] = React.useState(false);
  const [phoneValid, setPhoneValid] = React.useState(false);

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-heading-lg font-bold">{t("heading")}</h2>
        <p className="max-w-2xl text-body-sm text-muted-foreground">
          {t("subheading")}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Default + Email (validated on submit) */}
        <ShowcaseCard
          title="Default / Email"
          description="Label, placeholder, focus ring. Email is required and validated on submit."
        >
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              validateEmail();
            }}
            noValidate
          >
            <InputField label={t("labels.default")} htmlFor="demo-default">
              <Input
                id="demo-default"
                placeholder={t("placeholders.default")}
              />
            </InputField>

            <InputField
              label={t("labels.email")}
              htmlFor="demo-email"
              required
              error={emailError ?? undefined}
            >
              <Input
                id="demo-email"
                type="email"
                inputMode="email"
                placeholder={t("placeholders.email")}
                aria-invalid={emailError ? true : undefined}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
            </InputField>

            <button
              type="submit"
              className="h-9 self-start rounded-lg bg-primary px-4 text-body-sm font-medium text-text-inverse transition-colors hover:bg-primary-hover"
            >
              Submit
            </button>
          </form>
        </ShowcaseCard>

        {/* Search + Number */}
        <ShowcaseCard
          title="Search / Number"
          description="Search has a leading icon; Number has a numeric keyboard and up/down steppers (clamped 0–10)."
        >
          <div className="flex flex-col gap-4">
            <InputField label={t("labels.search")} htmlFor="demo-search">
              <SearchInput
                id="demo-search"
                placeholder={t("placeholders.search")}
              />
            </InputField>

            <InputField label={t("labels.number")} htmlFor="demo-number">
              <NumberInput
                id="demo-number"
                defaultValue={1}
                min={0}
                max={10}
                incrementLabel={t("increment")}
                decrementLabel={t("decrement")}
              />
            </InputField>
          </div>
        </ShowcaseCard>

        {/* Password */}
        <ShowcaseCard
          title="Password"
          description="The eye toggle switches the input between password and text."
        >
          <InputField label={t("labels.password")} htmlFor="demo-password">
            <PasswordInput
              id="demo-password"
              placeholder={t("placeholders.password")}
              showLabel={t("showPassword")}
              hideLabel={t("hidePassword")}
            />
          </InputField>
        </ShowcaseCard>

        {/* OTP */}
        <ShowcaseCard
          title="OTP"
          description="Six boxes — typing auto-advances, backspace steps back, and pasting a 6-digit code fills them all."
        >
          <InputField
            label={t("labels.otp")}
            success={otpComplete ? t("valid") : undefined}
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              success={otpComplete}
              digitLabel={t("digit")}
            />
          </InputField>
        </ShowcaseCard>

        {/* File */}
        <ShowcaseCard
          title="File"
          description="Custom trigger showing the filename. Click or drag a file in. Images only, max 2 MB."
        >
          <InputField
            label={t("labels.file")}
            htmlFor="demo-file"
            error={fileError ?? undefined}
            success={
              fileName && !fileError
                ? `${t("fileSelected")}: ${fileName}`
                : undefined
            }
          >
            <FileInput
              id="demo-file"
              accept="image/*"
              maxSize={MAX_FILE_SIZE}
              invalid={!!fileError}
              success={!!fileName && !fileError}
              uploadLabel={t("uploadFile")}
              placeholder={t("noFileSelected")}
              onFilesChange={(files) => {
                setFileError(null);
                setFileName(files[0]?.name ?? null);
              }}
              onError={(reason) => {
                setFileName(null);
                setFileError(
                  reason === "size"
                    ? t("fileTooLarge", { size: "2 MB" })
                    : t("fileWrongType"),
                );
              }}
            />
          </InputField>
        </ShowcaseCard>

        {/* Phone */}
        <ShowcaseCard
          title="Phone"
          description="Country dial-code dropdown with flag; the full number is validated against E.164."
        >
          <InputField
            label={t("labels.phone")}
            htmlFor="demo-phone"
            error={
              phoneTouched && !phoneValid ? t("invalidPhone") : undefined
            }
            success={phoneValid ? t("valid") : undefined}
          >
            <PhoneInput
              id="demo-phone"
              defaultCountry="EG"
              placeholder={t("placeholders.phone")}
              countryLabel={t("selectCountry")}
              invalid={phoneTouched && !phoneValid}
              success={phoneValid}
              onValueChange={(_value, meta) => {
                setPhoneTouched(meta.national.length > 0);
                setPhoneValid(meta.isValid);
              }}
            />
          </InputField>
        </ShowcaseCard>

        {/* States */}
        <ShowcaseCard
          title={t("states.title")}
          description="Error (red border + message), success (green border), and disabled (reduced opacity, non-interactive)."
        >
          <div className="flex flex-col gap-4">
            <InputField
              label={t("states.error")}
              htmlFor="demo-state-error"
              error={t("required")}
            >
              <Input
                id="demo-state-error"
                aria-invalid
                defaultValue=""
                placeholder={t("placeholders.default")}
              />
            </InputField>

            <InputField
              label={t("states.success")}
              htmlFor="demo-state-success"
              success={t("valid")}
            >
              <Input
                id="demo-state-success"
                data-success="true"
                defaultValue="rose@example.com"
              />
            </InputField>

            <InputField label={t("states.disabled")} htmlFor="demo-state-disabled">
              <Input
                id="demo-state-disabled"
                disabled
                placeholder={t("placeholders.default")}
              />
            </InputField>
          </div>
        </ShowcaseCard>
      </div>
    </section>
  );
}
