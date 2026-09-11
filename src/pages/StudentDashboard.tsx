import { useState, useMemo } from 'react';
import {
  PlusCircle,
  ClipboardList,
  TrendingUp,
  Clock,
  CheckCircle2,
  PackageCheck,
  Upload,
  Printer,
  Copy,
  BookOpen,
  ScanLine,
  PencilRuler,
  Trash2,
  Search,
  Filter,
  FileText,
  ShoppingCart,
  ArrowRight,
  UserCircle,
  Mail,
  Building2,
  Hash,
  Calendar,
  Phone,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import StatusBadge from '@/components/StatusBadge';
import { useApp } from '@/context/AppContext';
import { mockStationery, pricingRates } from '@/data/mockData';
import type { StudentTab, Order, OrderType, OrderItem, PrintColor, PrintSide } from '@/types';

const orderTypeIcons: Record<OrderType, typeof Printer> = {
  print: Printer,
  xerox: Copy,
  binding: BookOpen,
  scan: ScanLine,
  stationery: PencilRuler,
};

const orderTypeLabels: Record<OrderType, string> = {
  print: 'Print',
  xerox: 'Xerox',
  binding: 'Binding',
  scan: 'Scan',
  stationery: 'Stationery',
};

export default function StudentDashboard() {
  const { user, orders, addOrder, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<StudentTab>('overview');

  const myOrders = useMemo(
    () => orders.filter((o) => o.studentName === user?.name || o.studentRollNo === user?.rollNo),
    [orders, user],
  );

  const stats = useMemo(() => {
    const total = myOrders.length;
    const pending = myOrders.filter((o) => o.status === 'pending').length;
    const inProgress = myOrders.filter((o) => o.status === 'in-progress').length;
    const ready = myOrders.filter((o) => o.status === 'ready').length;
    const completed = myOrders.filter((o) => o.status === 'completed').length;
    const totalSpent = myOrders.filter((o) => o.status === 'completed').reduce((sum, o) => sum + o.totalPrice, 0);
    return { total, pending, inProgress, ready, completed, totalSpent };
  }, [myOrders]);

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar role="student" activeTab={activeTab} onTabChange={(t) => setActiveTab(t as StudentTab)} />

      <main className="flex-1 overflow-x-hidden">
        {/* Top bar */}
        <div className="sticky top-0 z-30 border-b border-ink-200 bg-white/90 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-4 pt-2 sm:px-6 lg:px-8 lg:pt-0">
            <div className="flex items-center gap-3 pl-12 lg:pl-0">
              <h1 className="font-display text-lg font-bold text-ink-900 capitalize">
                {activeTab === 'new-order' ? 'New Order' : activeTab === 'my-orders' ? 'My Orders' : activeTab === 'stationery' ? 'Stationery Shop' : activeTab === 'profile' ? 'My Profile' : 'Overview'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden items-center gap-2 rounded-lg bg-ink-100 px-3 py-2 text-sm text-ink-600 sm:flex">
                <Search size={16} />
                Search...
              </button>
              <button onClick={() => setActiveTab('new-order')} className="btn-primary">
                <PlusCircle size={16} />
                <span className="hidden sm:inline">New Order</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'overview' && <OverviewTab stats={stats} recentOrders={myOrders.slice(0, 5)} onTabChange={setActiveTab} />}
          {activeTab === 'new-order' && <NewOrderTab user={user} addOrder={addOrder} showToast={showToast} onTabChange={setActiveTab} />}
          {activeTab === 'my-orders' && <MyOrdersTab orders={myOrders} />}
          {activeTab === 'stationery' && <StationeryTab showToast={showToast} />}
          {activeTab === 'profile' && <ProfileTab user={user} />}
        </div>
      </main>
    </div>
  );
}

/* ---------- Overview Tab ---------- */
function OverviewTab({
  stats,
  recentOrders,
  onTabChange,
}: {
  stats: { total: number; pending: number; inProgress: number; ready: number; completed: number; totalSpent: number };
  recentOrders: Order[];
  onTabChange: (t: StudentTab) => void;
}) {
  const statCards = [
    { label: 'Total Orders', value: stats.total, icon: ClipboardList, color: 'brand' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'amber' },
    { label: 'In Progress', value: stats.inProgress, icon: TrendingUp, color: 'blue' },
    { label: 'Ready to Collect', value: stats.ready, icon: PackageCheck, color: 'teal' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="overflow-hidden rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-card-hover sm:p-8">
        <h2 className="font-display text-2xl font-bold">Welcome back!</h2>
        <p className="mt-1 text-brand-100">Here's a summary of your print orders and activity.</p>
        <button onClick={() => onTabChange('new-order')} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50">
          <PlusCircle size={16} />
          Place New Order
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink-500">{card.label}</p>
                  <p className="mt-1 font-display text-3xl font-bold text-ink-900">{card.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${card.color}-50 text-${card.color}-600`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent orders + spending */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink-900">Recent Orders</h3>
            <button onClick={() => onTabChange('my-orders')} className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all →
            </button>
          </div>
          {recentOrders.length === 0 ? (
            <div className="mt-8 text-center">
              <ClipboardList size={40} className="mx-auto text-ink-300" />
              <p className="mt-3 text-sm text-ink-500">No orders yet. Place your first order!</p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {recentOrders.map((order) => {
                const Icon = orderTypeIcons[order.items[0].type];
                return (
                  <div key={order.id} className="flex items-center gap-4 rounded-lg border border-ink-100 p-3 transition-all hover:border-ink-200 hover:bg-ink-50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-900">{order.items[0].title}</p>
                      <p className="text-xs text-ink-500">{order.orderNo} · {order.totalPages} pages · ₹{order.totalPrice}</p>
                    </div>
                    <StatusBadge status={order.status} size="sm" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink-900">Spending</h3>
          <div className="mt-4 rounded-xl bg-emerald-50 p-5 text-center ring-1 ring-inset ring-emerald-200">
            <p className="text-sm text-emerald-700">Total spent (completed)</p>
            <p className="mt-1 font-display text-3xl font-bold text-emerald-800">₹{stats.totalSpent}</p>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Completed orders</span>
              <span className="font-semibold text-ink-900">{stats.completed}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Active orders</span>
              <span className="font-semibold text-ink-900">{stats.pending + stats.inProgress}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Ready to collect</span>
              <span className="font-semibold text-teal-600">{stats.ready}</span>
            </div>
          </div>
          <button onClick={() => onTabChange('stationery')} className="mt-5 btn-secondary w-full">
            <ShoppingCart size={16} />
            Browse Stationery
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- New Order Tab ---------- */
function NewOrderTab({
  user,
  addOrder,
  showToast,
  onTabChange,
}: {
  user: { name: string; rollNo?: string; department?: string } | null;
  addOrder: (o: Order) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onTabChange: (t: StudentTab) => void;
}) {
  const [orderType, setOrderType] = useState<OrderType>('print');
  const [title, setTitle] = useState('');
  const [copies, setCopies] = useState(1);
  const [color, setColor] = useState<PrintColor>('black-white');
  const [side, setSide] = useState<PrintSide>('single');
  const [pages, setPages] = useState(1);
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');

  const pricePerUnit = useMemo(() => {
    if (orderType === 'binding') return pricingRates.binding;
    if (orderType === 'scan') return pricingRates.scan;
    const key = `${color}-${side}` as keyof typeof pricingRates;
    return pricingRates[key] ?? 1.5;
  }, [orderType, color, side]);

  const totalPages = orderType === 'stationery' ? copies : pages * copies;
  const totalPrice = useMemo(() => {
    if (orderType === 'stationery') return pricePerUnit * copies;
    if (orderType === 'binding') return pricePerUnit * copies;
    if (orderType === 'scan') return pricePerUnit * pages * copies;
    return pricePerUnit * pages * copies;
  }, [orderType, pricePerUnit, pages, copies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a title for your order', 'error');
      return;
    }
    const newItem: OrderItem = {
      id: `item-${Date.now()}`,
      type: orderType,
      title: title.trim(),
      details: fileName ? `File: ${fileName}` : `${pages} pages, ${copies} copies`,
      copies,
      color,
      side,
      price: totalPrice,
    };
    const order: Order = {
      id: `order-${Date.now()}`,
      orderNo: `CP-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      studentName: user?.name ?? 'Student',
      studentRollNo: user?.rollNo ?? 'N/A',
      department: user?.department ?? 'N/A',
      items: [newItem],
      status: 'pending',
      totalPages,
      totalPrice,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    showToast(`Order ${order.orderNo} placed successfully!`, 'success');
    onTabChange('my-orders');
  };

  const orderTypes: { type: OrderType; label: string; icon: typeof Printer }[] = [
    { type: 'print', label: 'Print', icon: Printer },
    { type: 'xerox', label: 'Xerox', icon: Copy },
    { type: 'binding', label: 'Binding', icon: BookOpen },
    { type: 'scan', label: 'Scan', icon: ScanLine },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="card p-6">
          {/* Order type */}
          <div>
            <label className="label-text">Select Service</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {orderTypes.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                    orderType === type
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-ink-200 text-ink-600 hover:border-ink-300'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="mt-5">
            <label className="label-text">Document / Order Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Data Structures Notes, Project Report..."
              className="input-field"
            />
          </div>

          {/* File upload (for print/xerox/scan) */}
          {orderType !== 'binding' && orderType !== 'stationery' && (
            <div className="mt-5">
              <label className="label-text">Upload File</label>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 px-6 py-8 transition-all hover:border-brand-400 hover:bg-brand-50/50">
                <Upload size={28} className="text-ink-400" />
                <span className="mt-2 text-sm font-medium text-ink-700">
                  {fileName || 'Click to upload or drag and drop'}
                </span>
                <span className="mt-1 text-xs text-ink-400">PDF, DOCX, JPG, PNG — max 25MB</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.jpg,.png"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                />
              </label>
            </div>
          )}

          {/* Print options */}
          {orderType !== 'binding' && orderType !== 'stationery' && (
            <>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-text">Color</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setColor('black-white')}
                      className={`flex-1 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                        color === 'black-white' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600'
                      }`}
                    >
                      B/W
                    </button>
                    <button
                      type="button"
                      onClick={() => setColor('color')}
                      className={`flex-1 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                        color === 'color' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600'
                      }`}
                    >
                      Color
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label-text">Print Side</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSide('single')}
                      className={`flex-1 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                        side === 'single' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600'
                      }`}
                    >
                      Single
                    </button>
                    <button
                      type="button"
                      onClick={() => setSide('double')}
                      className={`flex-1 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                        side === 'double' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600'
                      }`}
                    >
                      Double
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-text">Pages</label>
                  <input
                    type="number"
                    min={1}
                    value={pages}
                    onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-text">Copies</label>
                  <input
                    type="number"
                    min={1}
                    value={copies}
                    onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                    className="input-field"
                  />
                </div>
              </div>
            </>
          )}

          {/* Binding options */}
          {orderType === 'binding' && (
            <div className="mt-5">
              <label className="label-text">Copies</label>
              <input
                type="number"
                min={1}
                value={copies}
                onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                className="input-field"
              />
            </div>
          )}

          {/* Notes */}
          <div className="mt-5">
            <label className="label-text">Special Instructions (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="e.g. Staple at top-left, print on both sides, email scanned copy..."
              className="input-field resize-none"
            />
          </div>

          <button type="submit" className="btn-primary mt-6 w-full py-3 text-base">
            <PlusCircle size={18} />
            Place Order — ₹{totalPrice.toFixed(0)}
          </button>
        </form>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <div className="card sticky top-24 p-6">
          <h3 className="font-display text-lg font-semibold text-ink-900">Order Summary</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Service</span>
              <span className="font-semibold text-ink-900">{orderTypeLabels[orderType]}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Rate</span>
              <span className="font-semibold text-ink-900">₹{pricePerUnit}/{orderType === 'binding' ? 'piece' : 'page'}</span>
            </div>
            {orderType !== 'binding' && orderType !== 'stationery' && (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">Pages × Copies</span>
                  <span className="font-semibold text-ink-900">{pages} × {copies}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">Color / Side</span>
                  <span className="font-semibold text-ink-900">{color === 'black-white' ? 'B/W' : 'Color'} / {side === 'single' ? 'Single' : 'Double'}</span>
                </div>
              </>
            )}
            {orderType === 'binding' && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500">Copies</span>
                <span className="font-semibold text-ink-900">{copies}</span>
              </div>
            )}
          </div>
          <div className="mt-4 border-t border-ink-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink-600">Total Pages</span>
              <span className="text-sm font-semibold text-ink-900">{totalPages}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-display text-base font-semibold text-ink-900">Total Price</span>
              <span className="font-display text-2xl font-bold text-brand-600">₹{totalPrice.toFixed(0)}</span>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-ink-50 p-3 text-xs text-ink-500">
            <p>Payment is collected at the print center counter when you collect your order.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- My Orders Tab ---------- */
function MyOrdersTab({ orders }: { orders: Order[] }) {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchFilter = filter === 'all' || o.status === filter;
      const matchSearch = !search || o.orderNo.toLowerCase().includes(search.toLowerCase()) || o.items[0].title.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [orders, filter, search]);

  const filters = ['all', 'pending', 'in-progress', 'ready', 'completed', 'rejected'];

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
            placeholder="Search orders..."
            className="input-field w-full pl-10 sm:w-64"
          />
        </div>
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <ClipboardList size={48} className="mx-auto text-ink-300" />
          <p className="mt-4 text-sm font-medium text-ink-600">No orders found</p>
          <p className="mt-1 text-xs text-ink-400">Try changing the filter or search term.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const Icon = orderTypeIcons[order.items[0].type];
            return (
              <div key={order.id} className="card p-5 hover:shadow-card-hover">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-ink-900">{order.items[0].title}</h3>
                        <StatusBadge status={order.status} size="sm" />
                      </div>
                      <p className="mt-0.5 text-xs text-ink-500">
                        {order.orderNo} · {order.items[0].details}
                      </p>
                      {order.notes && (
                        <p className="mt-1 text-xs italic text-ink-400">"{order.notes}"</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-ink-500">{order.totalPages} pages</p>
                      <p className="font-display text-lg font-bold text-ink-900">₹{order.totalPrice}</p>
                    </div>
                    <div className="text-right text-xs text-ink-400">
                      <p>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                      <p>{new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- Stationery Tab ---------- */
function StationeryTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error' | 'info') => void }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockStationery.map((s) => s.category)))];
  const filtered = category === 'All' ? mockStationery : mockStationery.filter((s) => s.category === category);

  const addToCart = (id: string, name: string) => {
    setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
    showToast(`${name} added to cart`, 'info');
  };

  const cartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = mockStationery.find((s) => s.id === id);
    return sum + (item?.price || 0) * qty;
  }, 0);

  return (
    <div className="space-y-5">
      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter size={16} className="text-ink-400" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${
              category === cat ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 ring-1 ring-inset ring-ink-200 hover:bg-ink-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stationery grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => {
          const inCart = cart[item.id] || 0;
          return (
            <div key={item.id} className="card p-5 hover:shadow-card-hover">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink-50 text-ink-600">
                <FileText size={24} />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-ink-900">{item.name}</h3>
              <p className="mt-0.5 text-xs text-ink-500">{item.category} · {item.stock} in stock</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-lg font-bold text-ink-900">₹{item.price}</span>
                <span className="text-xs text-ink-400">/{item.unit}</span>
              </div>
              <button
                onClick={() => addToCart(item.id, item.name)}
                className={`mt-3 w-full rounded-lg py-2 text-sm font-medium transition-all ${
                  inCart > 0
                    ? 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200'
                    : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
                }`}
              >
                {inCart > 0 ? `In Cart (${inCart})` : 'Add to Cart'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-xl bg-ink-900 px-6 py-3.5 text-white shadow-xl animate-slide-up">
          <ShoppingCart size={20} />
          <span className="text-sm font-medium">{cartCount} items in cart</span>
          <span className="font-display text-lg font-bold">₹{cartTotal}</span>
          <button
            onClick={() => {
              showToast('Order placed! Collect at the counter.', 'success');
              setCart({});
            }}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold transition-all hover:bg-brand-500"
          >
            Checkout <ArrowRight size={14} className="ml-1 inline" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Profile Tab ---------- */
function ProfileTab({ user }: { user: { name: string; email: string; department?: string; rollNo?: string; year?: string } | null }) {
  const fields = [
    { icon: UserCircle, label: 'Full Name', value: user?.name },
    { icon: Mail, label: 'Email', value: user?.email },
    { icon: Hash, label: 'Roll Number', value: user?.rollNo },
    { icon: Building2, label: 'Department', value: user?.department },
    { icon: Calendar, label: 'Year', value: user?.year },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="card overflow-hidden">
        <div className="h-24 bg-gradient-to-br from-brand-500 to-brand-700" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex items-end gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-brand-100 text-2xl font-bold text-brand-700">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="pb-1">
              <h2 className="font-display text-xl font-bold text-ink-900">{user?.name}</h2>
              <p className="text-sm text-ink-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display text-lg font-semibold text-ink-900">Account Information</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((field, i) => {
            const Icon = field.icon;
            return (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-ink-50 px-4 py-3">
                <Icon size={18} className="shrink-0 text-ink-400" />
                <div className="min-w-0">
                  <p className="text-xs text-ink-500">{field.label}</p>
                  <p className="truncate text-sm font-semibold text-ink-900">{field.value || '—'}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="btn-secondary mt-5 w-full">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
