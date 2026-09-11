import { useState } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  PencilRuler,
  UserCircle,
  LogOut,
  Menu,
  X,
  Printer,
  PackageSearch,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import Logo from './Logo';
import { useApp } from '@/context/AppContext';
import type { StudentTab, StaffTab } from '@/types';

type Tab = StudentTab | StaffTab;

interface NavItem {
  id: Tab;
  label: string;
  icon: LucideIcon;
}

const studentNav: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'new-order', label: 'New Order', icon: PlusCircle },
  { id: 'my-orders', label: 'My Orders', icon: ClipboardList },
  { id: 'stationery', label: 'Stationery', icon: PencilRuler },
  { id: 'profile', label: 'Profile', icon: UserCircle },
];

const staffNav: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'all-orders', label: 'All Orders', icon: PackageSearch },
  { id: 'stationery', label: 'Stationery', icon: PencilRuler },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

interface SidebarProps {
  role: 'student' | 'staff';
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ role, activeTab, onTabChange }: SidebarProps) {
  const { user, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = role === 'staff' ? staffNav : studentNav;

  const handleTab = (tab: Tab) => {
    onTabChange(tab);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-ink-200 px-5">
        <Logo size="sm" />
      </div>

      <div className="border-b border-ink-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase() ?? 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink-900">{user?.name}</p>
            <p className="truncate text-xs text-ink-500">{user?.email}</p>
          </div>
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-600">
          {role === 'staff' ? <Printer size={11} /> : <UserCircle size={11} />}
          {role === 'staff' ? 'Staff Member' : user?.department || 'Student'}
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">Menu</p>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-brand-600' : 'text-ink-400'} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-ink-200 p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 transition-all hover:bg-rose-50"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-3 z-40 rounded-lg bg-white p-2 shadow-card ring-1 ring-ink-200 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={20} className="text-ink-700" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 animate-slide-up bg-white shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-ink-500 hover:bg-ink-100"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-ink-200 bg-white lg:block">
        {sidebarContent}
      </aside>
    </>
  );
}
