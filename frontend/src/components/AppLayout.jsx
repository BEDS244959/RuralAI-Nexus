import { NavLink } from "react-router-dom";
import {
  BarChart3,
  CircleUserRound,
  Factory,
  IndianRupee,
  LayoutDashboard,
  Leaf,
  PackageCheck,
  Sprout,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Before I Grow",
    path: "/before-i-grow",
    icon: Sprout,
  },
  {
    name: "During Growth",
    path: "/during-growth",
    icon: Leaf,
  },
  {
    name: "Post-Harvest",
    path: "/post-harvest",
    icon: PackageCheck,
  },
  {
    name: "FoodTech",
    path: "/foodtech",
    icon: Factory,
  },
  {
    name: "Rural Enterprise",
    path: "/rural-enterprise",
    icon: BarChart3,
  },
  {
    name: "Financial Intelligence",
    path: "/financial-intelligence",
    icon: IndianRupee,
  },
  {
    name: "Farm Profile",
    path: "/profile",
    icon: CircleUserRound,
  },
];

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">

        <div className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
              <Sprout
                size={24}
                className="text-emerald-700"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                RuralAI Nexus
              </h1>

              <p className="text-xs text-gray-500">
                Rural Decision Support
              </p>
            </div>

          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  ].join(" ")
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </nav>

        <div className="border-t border-gray-200 p-4">

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-gray-700">
              Decision Support
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              AI-assisted insights using farm inputs,
              weather context and scenario analysis.
            </p>
          </div>

        </div>

      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white lg:hidden">

        <div className="flex items-center gap-3 px-4 py-4">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <Sprout
              size={21}
              className="text-emerald-700"
            />
          </div>

          <div>
            <h1 className="font-bold text-gray-900">
              RuralAI Nexus
            </h1>

            <p className="text-xs text-gray-500">
              Rural Decision Support
            </p>
          </div>

        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 pb-3">

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  [
                    "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium",
                    isActive
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-600",
                  ].join(" ")
                }
              >
                <Icon size={15} />
                {item.name}
              </NavLink>
            );
          })}

        </nav>

      </header>

      {/* Main Content */}
      <main className="min-h-screen lg:pl-64">
        {children}
      </main>

    </div>
  );
}