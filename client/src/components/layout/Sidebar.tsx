import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  CalendarClock,
  Repeat,
  Wallet,
  Target,
  FileBarChart2,
  Settings,
  Sparkles,
  Bell,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUiStore } from '../../stores/uiStore';

const NAV = [
  { to: '/',            label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/transactions', label: 'İşlemler',  icon: ArrowLeftRight },
  { to: '/installments', label: 'Taksitler', icon: CalendarClock },
  { to: '/recurring',    label: 'Tekrarlayan', icon: Repeat },
  { to: '/budgets',      label: 'Bütçeler',  icon: Wallet },
  { to: '/goals',        label: 'Hedefler',  icon: Target },
  { to: '/reminders',    label: 'Hatırlatıcılar', icon: Bell },
  { to: '/reports',      label: 'Raporlar',  icon: FileBarChart2 },
  { to: '/settings',     label: 'Ayarlar',   icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen } = useUiStore();

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 border-r glass-divider md:block',
        sidebarOpen ? 'w-64' : 'w-20',
        'transition-[width] duration-200',
      )}
      aria-label="Ana menü"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white shadow-glow">
            <Sparkles className="h-4 w-4" />
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                Kişisel Finans
              </div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500">
                kişisel CFO
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-0.5 px-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white',
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 text-[10px] text-slate-500 dark:text-slate-500">
          {sidebarOpen && <>v0.1 · Yerel Finance</>}
        </div>
      </div>
    </aside>
  );
}
