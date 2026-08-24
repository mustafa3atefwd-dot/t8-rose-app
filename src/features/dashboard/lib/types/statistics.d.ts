export interface IDashboardSummary {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
  currency: string;
}

export interface IDashboardCategory {
  id: string;
  title: string;
  productCount: number;
}

export interface ITopSellingProduct {
  productId: string;
  title: string;
  unitPrice: number;
  totalSales: number;
}

export interface ILowStockProduct {
  id: string;
  title: string;
  stock: number;
}

export interface IDashboardStatistics {
  summary: IDashboardSummary;
  categories: IDashboardCategory[];
  topSellingProducts: ITopSellingProduct[];
  lowStockProducts: ILowStockProduct[];
}
