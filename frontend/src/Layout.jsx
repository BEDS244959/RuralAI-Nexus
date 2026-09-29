import React, { useState } from "react";
import {
  LayoutDashboard,
  Sprout,
  Wheat,
  Utensils,
  Store,
  FolderOpen,
  UserRound,
  Menu,
  X,
  Leaf,
  MapPin,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "dashboard",
  },
  {
    label: "Before I Grow",
    icon: Sprout,
    path: "before-grow",
  },
  {
    label: "After I Grow",
    icon: Wheat,
    path: "after-grow",
  },
  {
    label: "FoodTech",
    icon: Utensils,
    path: "foodtech",
  },
  {
    label: "Rural Enterprise",
    icon: Store,
    path: "enterprise",
  },
  {
    label: "Saved Plans",
    icon: FolderOpen,
    path: "plans",
  },
];

export default function Layout({ children, activePage, setActivePage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (page) => {
    setActivePage(page);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f3] text-[#21372d]">

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          w-64 bg-[#163a2c] text-white
          flex flex-col
          transform transition-transform duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <button
            onClick={() => navigate("dashboard")}
            className="flex items-center gap-3 text-left"
          >
            <span className="w-10 h-10 rounded-xl bg-[#d7e5b2] text-[#173b2d] grid place-items-center">
              <Leaf size={22} />
            </span>

            <span>
              <strong className="block text-lg leading-tight">
                RuralAI Nexus
              </strong>

              <small className="text-[10px] tracking-[.16em] text-[#b7cbb9] uppercase">
                Decision Intelligence
              </small>
            </span>
          </button>
        </div>

        {/* Navigation */}
        <div className="px-6 pt-7 pb-3 text-[10px] tracking-[.18em] text-[#92ad9e] font-bold">
          WORKSPACE
        </div>

        <nav className="px-3 space-y-1">

          {navigation.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center gap-3
                  px-4 py-3 rounded-xl
                  text-sm text-left
                  transition-colors
                  ${
                    active
                      ? "bg-[#e9efdc] text-[#173b2d] font-semibold"
                      : "text-[#d7e4d8] hover:bg-white/10"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}

          {/* Profile */}
          <button
            onClick={() => navigate("profile")}
            className={`
              w-full flex items-center gap-3
              px-4 py-3 rounded-xl
              text-sm text-left
              ${
                activePage === "profile"
                  ? "bg-[#e9efdc] text-[#173b2d] font-semibold"
                  : "text-[#d7e4d8] hover:bg-white/10"
              }
            `}
          >
            <UserRound size={18} />
            My Profile
          </button>

        </nav>

        {/* Bottom information */}
        <div className="mt-auto m-4 rounded-xl bg-white/10 p-4 text-xs leading-relaxed text-[#cfdfd1]">
          <span className="block font-semibold text-white mb-1">
            Built for informed decisions
          </span>

          AI-assisted insights depend on the information available.
          Always verify important agricultural and financial decisions locally.
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="lg:pl-64">

        {/* Header */}
        <header className="h-16 sm:h-20 border-b border-stone-200 bg-white/90 flex items-center justify-between px-5 sm:px-9">

          <div className="flex items-center gap-3">

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-stone-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="hidden sm:block text-sm font-medium text-stone-600">
              Agriculture
              <span className="mx-2 text-stone-300">/</span>
              FoodTech
              <span className="mx-2 text-stone-300">/</span>
              Rural Development
            </div>

            <span className="sm:hidden text-sm font-semibold">
              RuralAI Nexus
            </span>

          </div>

          <div className="flex items-center gap-2 text-sm text-[#315943]">
            <MapPin size={15} />
            <span className="hidden sm:inline">
              Location not detected
            </span>
          </div>

        </header>

        {/* Page content */}
        <main className="max-w-[1320px] mx-auto px-5 sm:px-9 py-8 sm:py-10">
          {children}
        </main>

      </div>

    </div>
  );
}