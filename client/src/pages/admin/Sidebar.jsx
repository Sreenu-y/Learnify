import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import DarkMode from "@/DarkMode";

const Sidebar = () => {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar panel */}
      <aside className="hidden lg:flex flex-col w-[250px] sm:w-[280px] border-r border-black/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0e0e0e] sticky top-0 h-screen pt-20 pb-6 px-5 gap-1">
        <nav className="flex flex-col gap-1 mt-4">
          <SideLink
            to="dashboard"
            icon={<ChartNoAxesColumn size={18} />}
            label="Dashboard"
          />
          <SideLink
            to="course"
            icon={<SquareLibrary size={18} />}
            label="Courses"
          />
        </nav>
        <div className="mt-auto flex items-center gap-2">
          <DarkMode />
          <span className="text-xs text-black/30 dark:text-white/25">
            Theme
          </span>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 px-6 md:px-10 pt-24 pb-10 bg-[var(--background)] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

const SideLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
  >
    <span className="text-black/40 dark:text-white/35">{icon}</span>
    {label}
  </Link>
);

export default Sidebar;
