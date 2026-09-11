export type Page =
  | 'landing'
  | 'student-login'
  | 'student-register'
  | 'staff-login'
  | 'student-dashboard'
  | 'staff-dashboard';

export type StudentTab = 'overview' | 'new-order' | 'my-orders' | 'stationery' | 'profile';
export type StaffTab = 'overview' | 'all-orders' | 'stationery' | 'reports';

export type Role = 'student' | 'staff';

export type OrderStatus = 'pending' | 'in-progress' | 'ready' | 'completed' | 'rejected';

export type OrderType = 'print' | 'xerox' | 'binding' | 'scan' | 'stationery';

export type PrintColor = 'black-white' | 'color';
export type PrintSide = 'single' | 'double';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  rollNo?: string;
  year?: string;
}

export interface OrderItem {
  id: string;
  type: OrderType;
  title: string;
  details: string;
  copies: number;
  color: PrintColor;
  side: PrintSide;
  price: number;
}

export interface Order {
  id: string;
  orderNo: string;
  studentName: string;
  studentRollNo: string;
  department: string;
  items: OrderItem[];
  status: OrderStatus;
  totalPages: number;
  totalPrice: number;
  notes?: string;
  createdAt: string;
  readyAt?: string;
}

export interface StationeryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  icon: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}
