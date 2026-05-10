import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { storage } from "@/lib/storage";
import styles from "./AppShell.module.css";

const COLLAPSED_KEY = "jq.sidebar.collapsed";

export function AppShell() {
  const isMobile = useMediaQuery("(max-width: 960px)");
  const [collapsed, setCollapsed] = useState<boolean>(
    () => storage.get<boolean>(COLLAPSED_KEY) ?? false
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    storage.set(COLLAPSED_KEY, collapsed);
  }, [collapsed]);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) setMobileOpen((v) => !v);
    else setCollapsed((v) => !v);
  };

  return (
    <div className={styles.shell}>
      <a href="#main-content" className="jq-skip-link">
        Pular para o conteúdo
      </a>

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapsed={() => setCollapsed((v) => !v)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {isMobile && mobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <div className={styles.main}>
        <Header onToggleSidebar={toggleSidebar} />
        <main id="main-content" className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
