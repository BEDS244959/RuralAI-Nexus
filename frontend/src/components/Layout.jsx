import React from "react";
import {
  LayoutDashboard,
  Sprout,
  Tractor,
  Store,
  Wallet,
  Menu,
  X,
  Leaf,
} from "lucide-react";

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigation = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Before I Grow",
      icon: Sprout,
    },
    {
      label: "Farm Planning",
      icon: Tractor,
    },
    {
      label: "Food & Market",
      icon: Store,
    },
    {
      label: "Financial Planning",
      icon: Wallet,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8f3] text-[#21372d]">
      
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
        bg-[#163a2c] text-white transition-transform duration-200
        ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#d7e5b2] text-[#173b2d]">
            <Leaf size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold">RuralAI Nexus</h1>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#b7cbb9]">
              Decision Intelligence
            </p>
          </div>

          <button
            className="ml-auto lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-5 pt-7 pb-3 text-[10px] font-bold tracking-[0.2em] text-[#92ad9e]">
          WORKSPACE
        </div>

        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-[#d7e4d8] transition hover:bg-white/10"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Info */}
        <div className="mt-auto m-4 rounded-xl bg-white/10 p-4 text-xs leading-relaxed text-[#cfdfd1]">
          <p className="mb-1 font-semibold text-white">
            Built for informed decisions
          </p>

          <p>
            RuralAI Nexus combines agriculture, food technology,
            rural development and financial planning.
          </p>
        </div>
      </aside>

      {/* Main Area */}
      <div className="lg:pl-64">
        
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200 bg-white/95 px-5 backdrop-blur sm:h-20 sm:px-8">
          
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 hover:bg-stone-100 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="hidden text-sm font-medium text-stone-600 sm:block">
                Agriculture
                <span className="mx-2 text-stone-300">/</span>
                FoodTech
                <span className="mx-2 text-stone-300">/</span>
                Rural Development
              </p>

              <p className="text-sm font-semibold text-[#193b2c] sm:hidden">
                RuralAI Nexus
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="hidden items-center gap-2 text-sm text-[#315943] sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            India
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}