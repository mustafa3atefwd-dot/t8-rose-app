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

export interface IOrderStatusItem {
  count: number;
  percent: number;
}

export interface IDashboardOrderStatus {
  completed: IOrderStatusItem;
  inProgress: IOrderStatusItem;
  canceled: IOrderStatusItem;
  totalOrders: number;
}

export interface IRevenuePoint {
  period: string;
  label: string;
  revenue: number;
}

export interface IDashboardRevenue {
  period: string;
  points: IRevenuePoint[];
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
  orderStatus: IDashboardOrderStatus;
  revenue: IDashboardRevenue;
  topSellingProducts: ITopSellingProduct[];
  lowStockProducts: ILowStockProduct[];
}

export interface IDashboardStatisticsResponse {
  status: boolean;
  code: number;
  payload: IDashboardStatistics;
}