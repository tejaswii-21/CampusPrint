import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Page, User, Order, Toast, ToastType } from '@/types';
import { mockOrders } from '@/data/mockData';

interface AppContextValue {
  currentPage: Page;
  navigate: (page: Page) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const login = useCallback((u: User) => {
    setUser(u);
    setCurrentPage(u.role === 'staff' ? 'staff-dashboard' : 'student-dashboard');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentPage('landing');
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status, readyAt: status === 'ready' || status === 'completed' ? new Date().toISOString() : o.readyAt }
          : o,
      ),
    );
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigate,
        user,
        login,
        logout,
        orders,
        addOrder,
        updateOrderStatus,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
