import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Truck,
  Route,
  Map as MapIcon,
  CalendarCheck,
  Wallet,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Bell,
  Search,
  Plus,
  X,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { logoutUser } from '@/src/auth/AuthService';

const NavigationDrawerContent = ({ onNavItemClick }: { onNavItemClick?: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    if (onNavItemClick) onNavItemClick();
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Drivers', path: '/drivers' },
    { icon: Truck, label: 'Vehicles', path: '/vehicles' },
    { icon: Route, label: 'Trips', path: '/trips' },
    { icon: MapIcon, label: 'Live Tracking', path: '/live' },
    { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
    { icon: Wallet, label: 'Salary', path: '/salary' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
  ];

  return (
    <>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavItemClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-surface-container-lowest text-primary shadow-sm font-bold translate-x-1"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
              )}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="py-4 border-t border-outline/10 space-y-1 mt-4">
        <Link to="/trips/new" onClick={onNavItemClick} className="w-full btn-primary py-3 mb-4">
          <Plus size={18} />
          <span>Dispatch Vehicle</span>
        </Link>
        <Link to="/support" onClick={onNavItemClick} className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
          <HelpCircle size={20} />
          <span>Support</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export const NavigationDrawer = () => {
  return (
    <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 bg-surface-container-low border-r border-outline/10 z-50">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Fleet Ops Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-black text-primary tracking-tight leading-none uppercase">Fleet Ops</h1>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Precision Concierge</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 overflow-y-auto no-scrollbar">
        <NavigationDrawerContent />
      </div>
    </aside>
  );
};

export const TopAppBar = ({ title, theme, onThemeToggle, onMenuClick }: { title: string; theme: 'light' | 'dark'; onThemeToggle: () => void; onMenuClick: () => void }) => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-surface/80 backdrop-blur-md z-40 border-b border-outline/5 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-primary hover:bg-surface-container rounded-lg transition-colors md:hidden"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-bold text-primary tracking-tight uppercase hidden sm:block">King Kong GoDrive </h2>
        <h2 className="text-lg font-bold text-on-surface sm:hidden">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-surface-container-high rounded-full px-4 py-1.5 gap-2 group focus-within:ring-2 ring-primary/20">
          <Search size={16} className="text-on-surface-variant/40" />
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-48 lg:w-64 placeholder:text-on-surface-variant/40"
            placeholder="Search fleet, drivers..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onThemeToggle}
            className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-outline/10 mx-1"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-primary uppercase tracking-tight leading-none">Fleet Admin</p>
            <p className="text-[10px] text-on-surface-variant/60 font-bold uppercase mt-1">Premium Tier</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10 shadow-sm">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt6HCAvAaRhTvTA3ScN42iAlQMynNqMUnreeKZxaqaYe412-pT9lOQ_YLITur20eIvUgc0V7KtUwo9sfeXHm2pp-M9TLj3aOamnlYSP-cLHEIbK4PA-HPKzhmOU9hhZ_-fBPSTJiXudGvccN3yZHN58WEzf7HbfHsEdEOb29vhhNznzfkYBj1IfgnvajBZLZoaZ8vcc62Skyv0bE3V_8TaeHywY5TXZtYVDapPJOPJPGkFovRjhWZ26I0-grAbyPnUOC4N8y1Vu2U"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export const BottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setIsMoreOpen(false);
    navigate('/login');
  };

  const mainNavItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: Users, label: 'Drivers', path: '/drivers' },
    { icon: Truck, label: 'Vehicles', path: '/vehicles' },
    { icon: Route, label: 'Trips', path: '/trips' },
  ];

  const moreNavItems = [
    { icon: MapIcon, label: 'Live Map', path: '/live' },
    { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
    { icon: Wallet, label: 'Salary', path: '/salary' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: HelpCircle, label: 'Support', path: '/support' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-outline/10 px-4 flex justify-around items-center z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        {mainNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200",
                isActive ? "text-primary bg-primary/5" : "text-on-surface-variant/60"
              )}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setIsMoreOpen(true)}
          className={cn(
            "flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200",
            isMoreOpen ? "text-primary bg-primary/5" : "text-on-surface-variant/60"
          )}
        >
          <Menu size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">More</span>
        </button>
      </nav>

      <AnimatePresence>
        {isMoreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-[2.5rem] z-[70] md:hidden p-8 pb-12 shadow-2xl border-t border-outline/5"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-primary uppercase tracking-tight">Fleet Menu</h3>
                <button
                  onClick={() => setIsMoreOpen(false)}
                  className="p-2 bg-surface-container rounded-full text-on-surface-variant"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {moreNavItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMoreOpen(false)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200",
                        isActive
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                          : "bg-surface-container-low text-on-surface-variant border-outline/5 hover:bg-surface-container"
                      )}
                    >
                      <item.icon size={20} />
                      <span className="text-sm font-bold">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-outline/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 bg-error/5 text-error rounded-2xl font-bold"
                >
                  <div className="flex items-center gap-3">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </div>
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const Layout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface font-sans no-scrollbar overflow-x-hidden">
      <NavigationDrawer />

      {/* Navigation Drawer (Mobile Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-surface-container-low z-[70] shadow-2xl"
            >
              <div className="h-full flex flex-col">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                      <img src="/logo.png" alt="Fleet Ops Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-base font-black text-primary tracking-tight uppercase">Fleet Ops</h1>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 bg-surface-container rounded-full text-on-surface-variant"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 no-scrollbar">
                  <NavigationDrawerContent onNavItemClick={() => setIsMobileMenuOpen(false)} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <TopAppBar
        title={title}
        theme={theme}
        onThemeToggle={toggleTheme}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      <main className="pt-16 pb-20 md:pb-8 md:pl-64 min-h-screen no-scrollbar overflow-x-hidden">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};
