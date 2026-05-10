import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/config/routes";
import { Spinner } from "@/components/ui/Spinner/Spinner";

export function PublicOnlyRoute() {
  const { status } = useAuth();

  if (status === "loading" || status === "idle") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--jq-primary)",
        }}
      >
        <Spinner size={28} />
      </div>
    );
  }

  if (status === "authenticated") {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
}
