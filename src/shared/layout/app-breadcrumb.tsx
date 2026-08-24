'use client';

import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';

import { useTranslations } from 'next-intl';
import { IBreadcrumbItem } from '@/features/dashboard/lib/types/breadcrumb';

interface IAppBreadcrumbProps {
  items: IBreadcrumbItem[];
}

export default function AppBreadcrumb({ items }: IAppBreadcrumbProps) {
  // Translations
  const t = useTranslations('dashboard.breadcrumb');

  // Check if items is empty array
  if (!items.length) {
    return null;
  }

  return (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList className="font-mulish text-xs md:text-sm">
        {/* Map over items array */}
        {items.map((item, index) => {
          // Check if current item is the last item
          const isLast = index === items.length - 1;

          // Translate label
          const label = t(item.labelKey, item.values);
          return (
            <div key={`${item.labelKey}-${index}`} className="flex items-center">
              {/* Current item  */}
              <BreadcrumbItem>
                {/* Check if current item is the last item or does not have a href */}
                {isLast || !item.href ? (
                  // Last item or does not have a href
                  <BreadcrumbPage className="text-ds-text-primary">{label}</BreadcrumbPage>
                ) : (
                  // Previous items
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="text-ds-text-soft hover:text-ds-text-primary transition-colors">
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {/* Separator */}
              {!isLast && <BreadcrumbSeparator className="text-ds-text-soft" />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
