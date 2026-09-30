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

function namedItem(name: string, href?: string): IBreadcrumbItem {
  return {
    labelKey: 'routeName',
    href,
    values: { name: slugToLabel(decodeURIComponent(name)) },
  };
}

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
    pattern: /^\/dashboard\/categories\/new$/,
    getItems: () => [
      dashboardItem,
      categoriesItem,
      {
        labelKey: 'addCategory',
      },
    ],
  },

  {
    pattern: /^\/dashboard\/categories\/([^/]+)$/,
    getItems: () => [dashboardItem, categoriesItem, { labelKey: 'category' }],
  },

  {
    pattern: /^\/dashboard\/categories\/([^/]+)\/([^/]+)$/,
    getItems: ({ matches }) => [dashboardItem, categoriesItem, namedItem(matches[2])],
  },

  {
    pattern: /^\/dashboard\/categories\/([^/]+)\/([^/]+)\/edit$/,
    getItems: ({ matches }) => {
      const [, id, name] = matches;

      return [
        dashboardItem,
        categoriesItem,
        namedItem(name, `/dashboard/categories/${id}/${name}`),
        { labelKey: 'updateCategory' },
      ];
    },
  },

  // Occasions
  {
    pattern: /^\/dashboard\/occasions$/,
    getItems: () => [dashboardItem, occasionsItem],
  },

  {
    pattern: /^\/dashboard\/occasions\/new$/,
    getItems: () => [
      dashboardItem,
      occasionsItem,
      {
        labelKey: 'addOccasion',
      },
    ],
  },

  {
    pattern: /^\/dashboard\/occasions\/([^/]+)$/,
    getItems: () => [dashboardItem, occasionsItem, { labelKey: 'occasion' }],
  },

  {
    pattern: /^\/dashboard\/occasions\/([^/]+)\/([^/]+)$/,
    getItems: ({ matches }) => [dashboardItem, occasionsItem, namedItem(matches[2])],
  },

  {
    pattern: /^\/dashboard\/occasions\/([^/]+)\/([^/]+)\/edit$/,
    getItems: ({ matches }) => {
      const [, id, name] = matches;

      return [
        dashboardItem,
        occasionsItem,
        namedItem(name, `/dashboard/occasions/${id}/${name}`),
        { labelKey: 'updateOccasion' },
      ];
    },
  },

  // Products
  {
    pattern: /^\/dashboard\/products$/,
    getItems: () => [dashboardItem, productsItem],
  },

  {
    pattern: /^\/dashboard\/products\/new$/,
    getItems: () => [
      dashboardItem,
      productsItem,
      {
        labelKey: 'addProduct',
      },
    ],
  },

  {
    pattern: /^\/dashboard\/products\/([^/]+)\/edit$/,
    getItems: () => [dashboardItem, productsItem, { labelKey: 'updateProduct' }],
  },

  // Account
  {
    pattern: /^\/dashboard\/account$/,
    getItems: () => [dashboardItem, accountItem],
  },

  {
    pattern: /^\/dashboard\/account\/profile$/,
    getItems: () => [dashboardItem, accountItem, { labelKey: 'profile' }],
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
