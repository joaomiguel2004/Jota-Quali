import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Logo } from "@/components/brand/Logo/Logo";
import { Button } from "@/components/ui/Button/Button";
import { ROUTES } from "@/config/routes";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Página não encontrada · JotaQuali";
    // eslint-disable-next-line no-console
    console.warn("404 - rota inexistente:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--jq-sp-8)",
        background: "var(--jq-surface-2)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 460,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--jq-sp-4)",
        }}
      >
        <Logo />
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: "var(--jq-primary)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: 22 }}>Página não encontrada</h1>
        <p style={{ color: "var(--jq-text-muted)" }}>
          O endereço <code>{location.pathname}</code> não existe ou foi
          movido. Verifique o link ou volte para o início.
        </p>
        <Link to={ROUTES.dashboard}>
          <Button>Voltar para o dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
