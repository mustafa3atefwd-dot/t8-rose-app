import { IBreadcrumbItem, IBreadcrumbRoute } from '@/features/dashboard/lib/types/breadcrumb';
import { slugToLabel } from '@/shared/lib/utils/route.util';

const dashboardItem: IBreadcrumbItem = {
  labelKey: 'dashboard',
  href: '/dashboard',
};

const categoriesItem: IBreadcrumbItem = {
  labelKey: 'categories',
  href: '/dashboard/categories',
};

const occasionsItem: IBreadcrumbItem = {
  labelKey: 'occasions',
  href: '/dashboard/occasions',
};

const productsItem: IBreadcrumbItem = {
  labelKey: 'products',
  href: '/dashboard/products',
};

const accountItem: IBreadcrumbItem = {
  labelKey: 'account',
  href: '/dashboard/account',
};

/**
 * Remove locale from pathname.
 *
 * Examples:
 *
 * /en/dashboard/products
 * /ar/dashboard/products
 *
 * become:
 *
 * /dashboard/products
 */
function normalizeDashboardPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] === 'dashboard') {
    return `/${segments.join('/')}`;
  }

  // [locale]/dashboard/...
  if (segments[1] === 'dashboard') {
    return `/${segments.slice(1).join('/')}`;
  }

  return pathname;
}

const routes: IBreadcrumbRoute[] = [
  // Dashboard
  {
    pattern: /^\/dashboard$/,
    getItems: () => [dashboardItem],
  },

  // Categories
  {
    pattern: /^\/dashboard\/categories$/,
    getItems: () => [dashboardItem, categoriesItem],
  },

  {
    pattern: /^\/dashboard\/categories\/add$/,
    getItems: () => [
      dashboardItem,
      categoriesItem,
      {
        labelKey: 'addCategory',
      },
    ],
  },

  {
    pattern: /^\/dashboard\/categories\/([^/]+)\/([^/]+)\/edit$/,
    getItems: ({ matches }) => {
      const [, , name] = matches;

      return [
        dashboardItem,
        categoriesItem,
        {
          labelKey: 'updateCategory',
          values: {
            name: slugToLabel(name),
          },
        },
      ];
    },
  },

  // Occasions
  {
    pattern: /^\/dashboard\/occasions$/,
    getItems: () => [dashboardItem, occasionsItem],
  },

  {
    pattern: /^\/dashboard\/occasions\/add$/,
    getItems: () => [
      dashboardItem,
      occasionsItem,
      {
        labelKey: 'addOccasion',
      },
    ],
  },

  {
    pattern: /^\/dashboard\/occasions\/([^/]+)\/([^/]+)\/edit$/,
    getItems: ({ matches }) => {
      const [, , name] = matches;

      return [
        dashboardItem,
        occasionsItem,
        {
          labelKey: 'updateOccasion',
          values: {
            name: slugToLabel(name),
          },
        },
      ];
    },
  },

  // Products
  {
    pattern: /^\/dashboard\/products$/,
    getItems: () => [dashboardItem, productsItem],
  },

  {
    pattern: /^\/dashboard\/products\/add$/,
    getItems: () => [
      dashboardItem,
      productsItem,
      {
        labelKey: 'addProduct',
      },
    ],
  },

  {
    pattern: /^\/dashboard\/products\/([^/]+)\/([^/]+)\/edit$/,
    getItems: ({ matches }) => {
      const [, , name] = matches;

      return [
        dashboardItem,
        productsItem,
        {
          labelKey: 'updateProduct',
          values: {
            name: slugToLabel(name),
          },
        },
      ];
    },
  },

  // Account
  {
    pattern: /^\/dashboard\/account$/,
    getItems: () => [dashboardItem, accountItem],
  },

  {
    pattern: /^\/dashboard\/account\/password$/,
    getItems: () => [
      dashboardItem,
      accountItem,
      {
        labelKey: 'changePassword',
      },
    ],
  },
];

export function getDashboardBreadcrumbItems(pathname: string): IBreadcrumbItem[] {
  const normalizedPath = normalizeDashboardPath(pathname);

  for (const route of routes) {
    const matches = normalizedPath.match(route.pattern);

    if (matches) {
      return route.getItems({
        pathname: normalizedPath,
        matches,
      });
    }
  }

  return [dashboardItem];
}
