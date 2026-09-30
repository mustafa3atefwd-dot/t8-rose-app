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
  const tToast = useTranslations("toast");
  const tPagination = useTranslations("pagination");
  const [page, setPage] = useState(1);
  const totalPages = 10;

  const paginationLabels = {
    first: tPagination("first"),
    previous: tPagination("previous"),
    next: tPagination("next"),
    last: tPagination("last"),
    page: (p: number) => tPagination("page", { page: p }),
  };

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-heading-lg font-bold">
          Feedback &amp; Navigation Components
        </h2>
        <p className="max-w-2xl text-body-sm text-muted-foreground">
          Toast, Tabs, Pagination, and Breadcrumbs — each wired for light/dark
          mode and full RTL support.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Toast */}
        <ShowcaseCard
          title="Toast"
          description="Triggers a toast that auto-dismisses after 3 seconds and can be closed manually. Multiple toasts stack vertically."
        >
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => toast.success(tToast("success"))}
            >
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error(tToast("error"))}
            >
              Error
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning(tToast("warning"))}
            >
              Warning
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info(tToast("info"))}
            >
              Info
            </Button>
          </div>
        </ShowcaseCard>

        {/* Tabs */}
        <ShowcaseCard
          title="Tabs"
          description="Horizontal tabs with an active indicator and an optional badge count."
        >
          {/* Segmented (Active / Inactive) variant. */}
          <div className="flex flex-col gap-3 pt-2">
            <span className="text-caption font-semibold uppercase text-muted-foreground">
              Segmented
            </span>
            <Tabs defaultValue="active">
              <TabsList variant="segmented" className="w-full max-w-xs">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs defaultValue="active">
              <TabsList variant="segmented" className="w-full max-w-xs">
                <TabsTrigger value="active" disabled>
                  Active
                </TabsTrigger>
                <TabsTrigger value="inactive" disabled>
                  Inactive
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </ShowcaseCard>

        {/* Pagination */}
        <ShowcaseCard
          title="Pagination"
          description="First / Previous / Next / Last controls disable on boundaries; the current page is highlighted."
        >
          <div className="flex flex-col gap-4">
            <PaginationControl
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              labels={paginationLabels}
            />
            <p className="text-caption text-muted-foreground">
              {`Page ${page}`} / {totalPages}
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
          title="Breadcrumbs"
          description="Separators between items; the last item is non-interactive and the trail collapses on small screens."
        >
          <Breadcrumbs
            ariaLabel="Breadcrumb"
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/" },
              { label: "Task 1", href: "/" },
              { label: "Task 2" },
            ]}
          />
        </ShowcaseCard>
      </div>
    </section>
  );
}
