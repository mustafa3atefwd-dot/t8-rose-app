"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/components/ui/toast";
import {
  Tabs,
  TabsBadge,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { PaginationControl } from "@/shared/components/ui/pagination";
import { Breadcrumbs } from "@/shared/components/ui/breadcrumb";

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

export function ComponentsShowcase() {
  const t = useTranslations("demo");
  const tToast = useTranslations("toast");
  const tTabs = useTranslations("tabs");
  const tPag = useTranslations("pagination");
  const tCrumb = useTranslations("breadcrumb");

  const [page, setPage] = useState(1);
  const totalPages = 10;

  const paginationLabels = {
    first: tPag("first"),
    previous: tPag("previous"),
    next: tPag("next"),
    last: tPag("last"),
    page: (p: number) => tPag("goToPage", { page: p }),
  };

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-heading-lg font-bold">{t("title")}</h2>
        <p className="max-w-2xl text-body-sm text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Toast */}
        <ShowcaseCard title={t("toastHeading")} description={t("toastDesc")}>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => toast.success(tToast("accountCreated"))}
            >
              {tToast("success")}
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error(tToast("somethingWrong"))}
            >
              {tToast("error")}
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning(tToast("checkInput"))}
            >
              {tToast("warning")}
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info(tToast("infoMessage"))}
            >
              {tToast("info")}
            </Button>
          </div>
        </ShowcaseCard>

        {/* Tabs */}
        <ShowcaseCard title={t("tabsHeading")} description={t("tabsDesc")}>
        

          {/* Segmented (Active / Inactive) variant. */}
          <div className="flex flex-col gap-3 pt-2">
            <span className="text-caption font-semibold uppercase text-muted-foreground">
              {tTabs("segmented")}
            </span>
            <Tabs defaultValue="active">
              <TabsList variant="segmented" className="w-full max-w-xs">
                <TabsTrigger value="active">{tTabs("active")}</TabsTrigger>
                <TabsTrigger value="inactive">{tTabs("inactive")}</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs defaultValue="active">
              <TabsList variant="segmented" className="w-full max-w-xs">
                <TabsTrigger value="active" disabled>
                  {tTabs("active")}
                </TabsTrigger>
                <TabsTrigger value="inactive" disabled>
                  {tTabs("inactive")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </ShowcaseCard>

        {/* Pagination */}
        <ShowcaseCard
          title={t("paginationHeading")}
          description={t("paginationDesc")}
        >
          <div className="flex flex-col gap-4">
            <PaginationControl
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              labels={paginationLabels}
            />
            <p className="text-caption text-muted-foreground">
              {tPag("page", { page })} / {totalPages}
            </p>
            {/* Edge case: a single page disables every control. */}
            <PaginationControl
              page={1}
              totalPages={1}
              onPageChange={() => {}}
              labels={paginationLabels}
            />
          </div>
        </ShowcaseCard>

        {/* Breadcrumbs */}
        <ShowcaseCard
          title={t("breadcrumbHeading")}
          description={t("breadcrumbDesc")}
        >
          <Breadcrumbs
            ariaLabel={tCrumb("label")}
            items={[
              { label: tCrumb("home"), href: "/" },
              { label: tCrumb("projects"), href: "/" },
              { label: tCrumb("taskOne"), href: "/" },
              { label: tCrumb("taskTwo") },
            ]}
          />
        </ShowcaseCard>
      </div>
    </section>
  );
}
