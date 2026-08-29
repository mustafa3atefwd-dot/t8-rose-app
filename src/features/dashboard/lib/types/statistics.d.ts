// Dashboard summary
export interface IDashboardSummary {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
  currency: string;
}

// Category statistics
export interface IDashboardCategory {
  id: string;
  title: string;
  productCount: number;
}

// Top-selling product statistics
export interface ITopSellingProduct {
  productId: string;
  title: string;
  unitPrice: number;
  totalSales: number;
}

// Low-stock product statistics
export interface ILowStockProduct {
  id: string;
  title: string;
  stock: number;
}

// Complete dashboard statistics payload
export interface IDashboardStatistics {
  summary: IDashboardSummary;
  categories: IDashboardCategory[];
  topSellingProducts: ITopSellingProduct[];
  lowStockProducts: ILowStockProduct[];
}
