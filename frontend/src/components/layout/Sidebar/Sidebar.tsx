import { NavLink } from "react-router-dom";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { NAV_SECTIONS } from "@/config/navigation";
import { Logo } from "@/components/brand/Logo/Logo";
import { cn } from "@/lib/cn";
import styles from "./Sidebar.module.css";

export interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapsed: () => void;
  onCloseMobile: () => void;
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapsed,
  onCloseMobile,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        styles.sidebar,
        collapsed && styles.collapsed,
        mobileOpen && styles.open
      )}
      aria-label="Navegação principal"
    >
      <div className={styles.brandRow}>
        <Logo compact={collapsed} />
      </div>

      <nav className={styles.scroll}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className={styles.section}>
            <div className={styles.sectionLabel}>{section.label}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    cn(styles.item, isActive && styles.active)
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <span className={styles.itemIcon}>
                    <Icon size={18} />
                  </span>
                  <span className={styles.itemLabel}>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={styles.foot}>
        <button
          type="button"
          className={styles.collapseBtn}
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          {!collapsed && <span>Recolher</span>}
        </button>
      </div>
    </aside>
  );
}
