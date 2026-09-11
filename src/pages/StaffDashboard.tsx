import { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  PackageSearch,
  PencilRuler,
  BarChart3,
  Clock,
  TrendingUp,
  CheckCircle2,
  PackageCheck,
  IndianRupee,
  Search,
  Filter,
  Printer,
  Copy,
  BookOpen,
  ScanLine,
  FileText,
  ChevronRight,
  Users,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import StatusBadge from '@/components/StatusBadge';
import { useApp } from '@/context/AppContext';
import { mockStationery } from '@/data/mockData';
import type { StaffTab, Order, OrderType, OrderStatus } from '@/types';

const orderTypeIcons: Record<OrderType, typeof Printer> = {
  print: Printer,
  xerox: Copy,
  binding: BookOpen,
  scan: ScanLine,
  stationery: PencilRuler,
};

export default function StaffDashboard() {
  const { orders, updateOrderStatus, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<StaffTab>('overview');

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === 'pending').length;
    const inProgress = orders.filter((o) => o.status === 'in-progress').length;
    const ready = orders.filter((o) => o.status === 'ready').length;
    const completed = orders.filter((o) => o.status === 'completed').length;
    const revenue = orders.filter((o) => o.status === 'completed').reduce((sum, o) => sum + o.totalPrice, 0);
    const totalOrders = orders.filter((o) => o.status !== 'rejected').reduce((sum, o) => sum + o.totalPrice, 0);
    return { total, pending, inProgress, ready, completed, revenue, totalOrders };
  }, [orders]);

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar role="staff" activeTab={activeTab} onTabChange={(t) => setActiveTab(t as StaffTab)} />

      <main className="flex-1 overflow-x-hidden">
        {/* Top bar */}
        <div className="sticky top-0 z-30 border-b border-ink-200 bg-white/90 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-4 pt-2 sm:px-6 lg:px-8 lg:pt-0">
            <div className="flex items-center gap-3 pl-12 lg:pl-0">
              <h1 className="font-display text-lg font-bold text-ink-900 capitalize">
                {activeTab === 'all-orders' ? 'All Orders' : activeTab === 'stationery' ? 'Stationery Inventory' : activeTab === 'reports' ? 'Reports' : 'Overview'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200 sm:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Live
              </span>
              <button className="btn-secondary">
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'overview' && <StaffOverview stats={stats} orders={orders} onTabChange={setActiveTab} />}
          {activeTab === 'all-orders' && <AllOrdersTab orders={orders} updateOrderStatus={updateOrderStatus} showToast={showToast} />}
          {activeTab === 'stationery' && <StaffStationery />}
          {activeTab === 'reports' && <ReportsTab orders={orders} stats={stats} />}
        </div>
      </main>
    </div>
  );
}

/* ---------- Staff Overview ---------- */
function StaffOverview({
  stats,
  orders,
  onTabChange,
}: {
  stats: { total: number; pending: number; inProgress: number; ready: number; completed: number; revenue: number; totalOrders: number };
  orders: Order[];
  onTabChange: (t: StaffTab) => void;
}) {
  const statCards = [
    { label: 'Total Orders', value: stats.total, icon: PackageSearch, color: 'brand', change: '+12%', up: true },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'amber', change: '+3', up: true },
    { label: 'In Progress', value: stats.inProgress, icon: TrendingUp, color: 'blue', change: '0', up: false },
    { label: 'Ready', value: stats.ready, icon: PackageCheck, color: 'teal', change: '+5', up: true },
  ];

  const recentOrders = orders.slice(0, 6);

  // Simple bar chart data
  const weeklyData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 62 },
    { day: 'Wed', value: 38 },
    { day: 'Thu', value: 78 },
    { day: 'Fri', value: 55 },
    { day: 'Sat', value: 30 },
  ];
  const maxBar = Math.max(...weeklyData.map((d) => d.value));

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="overflow-hidden rounded-xl bg-gradient-to-br from-ink-800 to-ink-950 p-6 text-white shadow-card-hover sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Staff Dashboard</h2>
            <p className="mt-1 text-ink-300">Manage and track all student print orders in real-time.</p>
          </div>
          <div className="hidden rounded-xl bg-ink-800/50 px-5 py-3 ring-1 ring-inset ring-ink-700 sm:block">
            <p className="text-xs text-ink-400">Today's Revenue</p>
            <p className="font-display text-2xl font-bold text-emerald-400">₹{stats.revenue}</p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-ink-500">{card.label}</p>
                  <p className="mt-1 font-display text-3xl font-bold text-ink-900">{card.value}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-${card.color}-50 text-${card.color}-600`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs">
                {card.up ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-ink-400" />}
                <span className={card.up ? 'text-emerald-600 font-medium' : 'text-ink-400'}>{card.change}</span>
                <span className="text-ink-400">vs yesterday</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts + recent */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink-900">Weekly Orders</h3>
            <span className="text-sm text-ink-400">Last 6 days</span>
          </div>
          <div className="mt-6 flex items-end justify-between gap-3" style={{ height: '200px' }}>
            {weeklyData.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end justify-center" style={{ height: '160px' }}>
                  <div
                    className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400 transition-all hover:from-brand-700 hover:to-brand-500"
                    style={{ height: `${(d.value / maxBar) * 100}%` }}
                  >
                    <span className="flex w-full justify-center pt-1 text-xs font-semibold text-white">{d.value}</span>
                  </div>
                </div>
                <span className="text-xs text-ink-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue summary */}
        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink-900">Revenue</h3>
          <div className="mt-4 rounded-xl bg-emerald-50 p-5 ring-1 ring-inset ring-emerald-200">
            <div className="flex items-center gap-2">
              <IndianRupee size={18} className="text-emerald-600" />
              <span className="text-sm text-emerald-700">Completed</span>
            </div>
            <p className="mt-2 font-display text-3xl font-bold text-emerald-800">₹{stats.revenue}</p>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Total order value</span>
              <span className="font-semibold text-ink-900">₹{stats.totalOrders}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Completed</span>
              <span className="font-semibold text-emerald-600">{stats.completed}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Active</span>
              <span className="font-semibold text-blue-600">{stats.pending + stats.inProgress}</span>
            </div>
          </div>
          <button onClick={() => onTabChange('reports')} className="btn-secondary mt-5 w-full">
            <BarChart3 size={16} />
            View Reports
          </button>
        </div>
      </div>

      {/* Recent orders */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink-900">Latest Orders</h3>
          <button onClick={() => onTabChange('all-orders')} className="text-sm font-medium text-brand-600 hover:text-brand-700">
            View all →
          </button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs font-semibold uppercase tracking-wider text-ink-400">
                <th className="pb-3 pr-4">Order</th>
                <th className="pb-3 pr-4">Student</th>
                <th className="pb-3 pr-4 hidden sm:table-cell">Department</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {recentOrders.map((order) => {
                const Icon = orderTypeIcons[order.items[0].type];
                return (
                  <tr key={order.id} className="transition-colors hover:bg-ink-50">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                          <Icon size={15} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-ink-900">{order.items[0].title}</p>
                          <p className="text-xs text-ink-400">{order.orderNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <p className="text-sm text-ink-700">{order.studentName}</p>
                      <p className="text-xs text-ink-400">{order.studentRollNo}</p>
                    </td>
                    <td className="py-3 pr-4 hidden sm:table-cell">
                      <span className="text-sm text-ink-600">{order.department}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={order.status} size="sm" />
                    </td>
                    <td className="py-3 text-right">
                      <span className="font-semibold text-ink-900">₹{order.totalPrice}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- All Orders Tab ---------- */
function AllOrdersTab({
  orders,
  updateOrderStatus,
  showToast,
}: {
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}) {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchFilter = filter === 'all' || o.status === filter;
      const matchSearch = !search ||
        o.orderNo.toLowerCase().includes(search.toLowerCase()) ||
        o.studentName.toLowerCase().includes(search.toLowerCase()) ||
        o.studentRollNo.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [orders, filter, search]);

  const filters = ['all', 'pending', 'in-progress', 'ready', 'completed', 'rejected'];

  const handleStatusChange = (order: Order, status: OrderStatus) => {
    updateOrderStatus(order.id, status);
    showToast(`Order ${order.orderNo} marked as ${status}`, 'success');
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium capitalize transition-all ${
                filter === f ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 ring-1 ring-inset ring-ink-200 hover:bg-ink-50'
              }`}
            >
              {f.replace('-', ' ')}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or order no..."
            className="input-field w-full pl-10 sm:w-72"
          />
        </div>
      </div>

      {/* Orders table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50 text-left text-xs font-semibold uppercase tracking-wider text-ink-500">
                <th className="px-4 py-3.5">Order</th>
                <th className="px-4 py-3.5">Student</th>
                <th className="px-4 py-3.5 hidden md:table-cell">Department</th>
                <th className="px-4 py-3.5 hidden lg:table-cell">Pages</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Price</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-ink-400">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const Icon = orderTypeIcons[order.items[0].type];
                  return (
                    <tr key={order.id} className="transition-colors hover:bg-ink-50">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <Icon size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-ink-900">{order.items[0].title}</p>
                            <p className="text-xs text-ink-400">{order.orderNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm text-ink-700">{order.studentName}</p>
                        <p className="text-xs text-ink-400">{order.studentRollNo}</p>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="text-sm text-ink-600">{order.department}</span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="text-sm text-ink-600">{order.totalPages}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={order.status} size="sm" />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className="font-semibold text-ink-900">₹{order.totalPrice}</span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
                        >
                          Manage
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="animate-scale-in relative w-full max-w-lg rounded-xl bg-white shadow-2xl">
            <div className="border-b border-ink-100 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-ink-900">Manage Order</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-ink-400 hover:text-ink-600">✕</button>
              </div>
            </div>
            <div className="p-5">
              <div className="rounded-lg bg-ink-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                    {(() => { const Icon = orderTypeIcons[selectedOrder.items[0].type]; return <Icon size={18} /> })()}
                  </div>
                  <div>
                    <p className="font-semibold text-ink-900">{selectedOrder.items[0].title}</p>
                    <p className="text-xs text-ink-500">{selectedOrder.orderNo}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-ink-500">Student:</span> <span className="font-medium text-ink-900">{selectedOrder.studentName}</span></div>
                  <div><span className="text-ink-500">Roll No:</span> <span className="font-medium text-ink-900">{selectedOrder.studentRollNo}</span></div>
                  <div><span className="text-ink-500">Department:</span> <span className="font-medium text-ink-900">{selectedOrder.department}</span></div>
                  <div><span className="text-ink-500">Pages:</span> <span className="font-medium text-ink-900">{selectedOrder.totalPages}</span></div>
                  <div><span className="text-ink-500">Copies:</span> <span className="font-medium text-ink-900">{selectedOrder.items[0].copies}</span></div>
                  <div><span className="text-ink-500">Total:</span> <span className="font-bold text-brand-600">₹{selectedOrder.totalPrice}</span></div>
                </div>
                {selectedOrder.notes && (
                  <div className="mt-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 ring-1 ring-inset ring-amber-200">
                    <span className="font-semibold">Note:</span> {selectedOrder.notes}
                  </div>
                )}
                <div className="mt-3">
                  <span className="text-sm text-ink-500">Current status: </span>
                  <StatusBadge status={selectedOrder.status} size="sm" />
                </div>
              </div>

              <p className="mt-5 text-sm font-semibold text-ink-700">Update Status</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {(['pending', 'in-progress', 'ready', 'completed', 'rejected'] as OrderStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(selectedOrder, status)}
                    disabled={selectedOrder.status === status}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-all ${
                      selectedOrder.status === status
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-ink-200 text-ink-600 hover:bg-ink-50'
                    }`}
                  >
                    {status.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Staff Stationery ---------- */
function StaffStationery() {
  const [search, setSearch] = useState('');
  const filtered = mockStationery.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  const lowStock = mockStationery.filter((s) => s.stock < 80);

  return (
    <div className="space-y-5">
      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 px-5 py-4 ring-1 ring-inset ring-amber-200">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <Clock size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-800">Low stock alert</p>
            <p className="text-xs text-amber-700">{lowStock.length} items are running low. Consider restocking soon.</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inventory..."
            className="input-field w-full pl-10 sm:w-72"
          />
        </div>
        <button className="btn-primary">
          <FileText size={16} />
          <span className="hidden sm:inline">Add Item</span>
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50 text-left text-xs font-semibold uppercase tracking-wider text-ink-500">
                <th className="px-4 py-3.5">Item</th>
                <th className="px-4 py-3.5 hidden sm:table-cell">Category</th>
                <th className="px-4 py-3.5 text-right">Price</th>
                <th className="px-4 py-3.5 text-right">Stock</th>
                <th className="px-4 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-50">
              {filtered.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-ink-50">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-50 text-ink-600">
                        <FileText size={16} />
                      </div>
                      <span className="text-sm font-medium text-ink-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <span className="text-sm text-ink-600">{item.category}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="font-semibold text-ink-900">₹{item.price}</span>
                    <span className="text-xs text-ink-400">/{item.unit}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm text-ink-700">{item.stock}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    {item.stock < 80 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        In Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reports Tab ---------- */
function ReportsTab({
  orders,
  stats,
}: {
  orders: Order[];
  stats: { total: number; pending: number; inProgress: number; ready: number; completed: number; revenue: number; totalOrders: number };
}) {
  // Service breakdown
  const serviceBreakdown = useMemo(() => {
    const types: OrderType[] = ['print', 'xerox', 'binding', 'scan', 'stationery'];
    return types.map((type) => {
      const typeOrders = orders.filter((o) => o.items[0].type === type);
      return {
        type,
        count: typeOrders.length,
        revenue: typeOrders.reduce((sum, o) => sum + o.totalPrice, 0),
      };
    });
  }, [orders]);
  const maxCount = Math.max(...serviceBreakdown.map((s) => s.count), 1);

  // Department breakdown
  const deptBreakdown = useMemo(() => {
    const depts = Array.from(new Set(orders.map((o) => o.department)));
    return depts.map((dept) => ({
      dept,
      count: orders.filter((o) => o.department === dept).length,
    })).sort((a, b) => b.count - a.count);
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Revenue', value: `₹${stats.revenue}`, icon: IndianRupee, color: 'emerald' },
          { label: 'Total Orders', value: stats.total, icon: PackageSearch, color: 'brand' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'teal' },
          { label: 'Avg. Order Value', value: `₹${Math.round(stats.totalOrders / Math.max(stats.total, 1))}`, icon: TrendingUp, color: 'amber' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink-500">{card.label}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-ink-900">{card.value}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-${card.color}-50 text-${card.color}-600`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service breakdown */}
      <div className="card p-6">
        <h3 className="font-display text-lg font-semibold text-ink-900">Orders by Service Type</h3>
        <div className="mt-5 space-y-4">
          {serviceBreakdown.map((s) => {
            const Icon = orderTypeIcons[s.type];
            return (
              <div key={s.type}>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-ink-400" />
                    <span className="font-medium text-ink-700 capitalize">{s.type}</span>
                  </div>
                  <span className="text-ink-500">{s.count} orders · ₹{s.revenue}</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all"
                    style={{ width: `${(s.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Department breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink-900">Orders by Department</h3>
          <div className="mt-5 space-y-3">
            {deptBreakdown.map((d) => (
              <div key={d.dept} className="flex items-center justify-between rounded-lg bg-ink-50 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <Users size={16} className="text-ink-400" />
                  <span className="text-sm font-medium text-ink-700">{d.dept}</span>
                </div>
                <span className="font-semibold text-ink-900">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink-900">Status Distribution</h3>
          <div className="mt-5 space-y-3">
            {[
              { label: 'Pending', value: stats.pending, color: 'bg-amber-500' },
              { label: 'In Progress', value: stats.inProgress, color: 'bg-blue-500' },
              { label: 'Ready', value: stats.ready, color: 'bg-teal-500' },
              { label: 'Completed', value: stats.completed, color: 'bg-emerald-500' },
            ].map((s) => {
              const pct = stats.total > 0 ? (s.value / stats.total) * 100 : 0;
              return (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-600">{s.label}</span>
                    <span className="font-semibold text-ink-900">{s.value} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ink-100">
                    <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn-secondary mt-6 w-full">
            <Download size={16} />
            Download Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
