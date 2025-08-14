// User types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName: string;
  emailVerified: boolean;
  notificationPreferences: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Receipt types
export interface Receipt {
  id: string;
  userId: string;
  merchantName?: string;
  receiptDate?: string;
  totalAmount?: number;
  imageUrl: string;
  ocrText?: string;
  ocrConfidence?: number;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
  products?: ReceiptProduct[];
}

// Product types
export interface Product {
  id: string;
  name: string;
  brand?: string;
  model?: string;
  upc?: string;
  categoryId?: string;
  defaultWarrantyMonths: number;
  imageUrl?: string;
  manualUrl?: string;
  createdAt: string;
  updatedAt: string;
  category?: ProductCategory;
}

export interface ProductCategory {
  id: string;
  name: string;
  defaultWarrantyMonths: number;
  createdAt: string;
}

// Receipt Product types
export interface ReceiptProduct {
  id: string;
  receiptId: string;
  productId: string;
  quantity: number;
  price?: number;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  returnEndDate?: string;
  createdAt: string;
  product?: Product;
  receipt?: Receipt;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  receiptProductId?: string;
  type: 'warranty_expiring' | 'return_expiring';
  title: string;
  message?: string;
  scheduledFor?: string;
  sentAt?: string;
  readAt?: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types
export interface ReceiptUploadForm {
  file: File;
  merchantName?: string;
  receiptDate?: string;
  totalAmount?: number;
}

export interface ProductForm {
  name: string;
  brand?: string;
  model?: string;
  upc?: string;
  categoryId?: string;
  defaultWarrantyMonths: number;
}

// Dashboard types
export interface DashboardStats {
  totalReceipts: number;
  totalProducts: number;
  expiringSoon: number;
  totalValue: number;
}

export interface ExpiringItem {
  id: string;
  productName: string;
  type: 'warranty' | 'return';
  expirationDate: string;
  daysRemaining: number;
  receiptProduct: ReceiptProduct;
}

// Theme types
export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Error types
export interface AppError {
  message: string;
  code?: string;
  field?: string;
}
