"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRightIcon,
  LogInIcon,
  PlusIcon,
  SaveIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";

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

function CheckboxRow({
  id,
  label,
  checked,
  onCheckedChange,
  disabled,
}: {
  id: string;
  label: string;
  checked: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex w-fit items-center gap-2 text-body-sm text-text-default has-disabled:cursor-not-allowed has-disabled:opacity-60"
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      {label}
    </label>
  );
}

export function ElementsShowcase() {
  const t = useTranslations("button");
  const tc = useTranslations("checkbox");
  const tb = useTranslations("badge");

  // Login button loading demo (the Gherkin scenario).
  const [loading, setLoading] = React.useState(false);
  const submit = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 2000);
  };

  // Checkbox "select all" with indeterminate — seeded so it loads indeterminate
  // (some, not all, children selected).
  const [items, setItems] = React.useState([true, true, false]);
  const allChecked = items.every(Boolean);
  const noneChecked = items.every((v) => !v);
  const parentState: boolean | "indeterminate" = allChecked
    ? true
    : noneChecked
      ? false
      : "indeterminate";
  const setItem = (index: number, value: boolean) =>
    setItems((prev) => prev.map((v, i) => (i === index ? value : v)));

  const badgeVariants = [
    "default",
    "success",
    "warning",
    "error",
    "info",
    "outline",
  ] as const;

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-heading-lg font-bold">{t("heading")}</h2>
        <p className="max-w-2xl text-body-sm text-muted-foreground">
          {t("subheading")}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Button variants */}
        <ShowcaseCard
          title={`Button — ${t("variants")}`}
          description="Primary, Secondary, Outline, Ghost, and Destructive variants."
        >
          <div className="flex flex-wrap items-center gap-2">
            <Button>{t("submit")}</Button>
            <Button variant="secondary">{t("save")}</Button>
            <Button variant="outline">{t("cancel")}</Button>
            <Button variant="ghost">{t("confirm")}</Button>
            <Button variant="destructive">{t("delete")}</Button>
          </div>
        </ShowcaseCard>

        {/* Button states */}
        <ShowcaseCard
          title={`Button — ${t("states")}`}
          description="Loading (spinner + disabled + text change), disabled, and the icon-only square."
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {/* Gherkin: login button shows loading state on submit. */}
              <Button
                loading={loading}
                loadingText={t("loading")}
                onClick={submit}
              >
                <LogInIcon />
                {t("login")}
              </Button>
              <Button disabled>{t("submit")}</Button>
              <Button variant="destructive" disabled>
                {t("delete")}
              </Button>
            </div>
            <p className="text-caption text-text-muted">{t("loadingDemo")}</p>
          </div>
        </ShowcaseCard>

        {/* Button icons */}
        <ShowcaseCard
          title={`Button — ${t("withIcons")} / ${t("iconOnly")}`}
          description="Icons sit before or after the label; an icon with no label renders a square button."
        >
          <div className="flex flex-wrap items-center gap-2">
            <Button>
              <PlusIcon />
              {t("save")}
            </Button>
            <Button variant="outline">
              {t("confirm")}
              <ArrowRightIcon className="rtl:rotate-180" />
            </Button>
            <Button size="icon" variant="outline" aria-label={t("save")}>
              <SaveIcon />
            </Button>
            <Button size="icon" variant="ghost" aria-label="Settings">
              <SettingsIcon />
            </Button>
            <Button size="icon" variant="destructive" aria-label={t("delete")}>
              <Trash2Icon />
            </Button>
          </div>
        </ShowcaseCard>

        {/* Checkbox */}
        <ShowcaseCard
          title={tc("title")}
          description="Default, checked, indeterminate, and disabled. The parent loads indeterminate because some children are selected."
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <CheckboxRow id="cb-default" label={tc("default")} checked={false} />
              <CheckboxRow id="cb-checked" label={tc("checked")} checked={true} />
              <CheckboxRow
                id="cb-indeterminate"
                label={tc("indeterminate")}
                checked="indeterminate"
              />
              <CheckboxRow
                id="cb-disabled"
                label={tc("disabled")}
                checked={false}
                disabled
              />
            </div>

            {/* Edge case: select-all parent reflecting partial child selection. */}
            <div className="flex flex-col gap-2 border-t border-border pt-4">
              <CheckboxRow
                id="cb-all"
                label={tc("selectAll")}
                checked={parentState}
                onCheckedChange={(c) =>
                  setItems(items.map(() => c === true))
                }
              />
              <div className="flex flex-col gap-2 ps-6">
                {(["one", "two", "three"] as const).map((key, i) => (
                  <CheckboxRow
                    key={key}
                    id={`cb-child-${i}`}
                    label={tc(`options.${key}`)}
                    checked={items[i]}
                    onCheckedChange={(c) => setItem(i, c === true)}
                  />
                ))}
              </div>
            </div>
          </div>
        </ShowcaseCard>

        {/* Badge */}
        <ShowcaseCard
          title={tb("title")}
          description="Default, Success (Emerald), Warning, Error, Info, and Outline."
        >
          <div className="flex flex-wrap items-center gap-2">
            {badgeVariants.map((variant) => (
              <Badge key={variant} variant={variant}>
                {tb(variant)}
              </Badge>
            ))}
          </div>
        </ShowcaseCard>
      </div>
    </section>
  );
}
