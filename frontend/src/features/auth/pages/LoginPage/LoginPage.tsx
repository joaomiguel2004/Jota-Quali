import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthLayout, authLayoutStyles as s } from "../../components/AuthLayout/AuthLayout";
import { Field } from "@/components/ui/Field/Field";
import { Button } from "@/components/ui/Button/Button";
import { Alert } from "@/components/ui/Alert/Alert";
import { useAuth } from "../../hooks/useAuth";
import { isEmail, required } from "@/lib/validators";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ROUTES } from "@/config/routes";

export default function LoginPage() {
  useDocumentTitle("Entrar");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!required(email)) next.email = "Informe seu e-mail.";
    else if (!isEmail(email)) next.email = "E-mail inválido.";
    if (!required(password)) next.password = "Informe sua senha.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login({ email, password, remember });
      const target = location.state?.from ?? ROUTES.dashboard;
      navigate(target, { replace: true });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Falha ao entrar.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Acesse sua conta"
      subtitle="Entre com suas credenciais corporativas para continuar."
      footer={
        <>
          Problemas para acessar?{" "}
          <a href="mailto:suporte@jotaquali.com">Fale com o suporte</a>
        </>
      }
    >
      <form className={s.form} onSubmit={onSubmit} noValidate>
        {formError && <Alert variant="danger" title="Não foi possível entrar">{formError}</Alert>}

        <Field
          label="E-mail"
          type="email"
          autoComplete="email"
          placeholder="seu.nome@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
          autoFocus
        />

        <Field
          label="Senha"
          type={showPwd ? "text" : "password"}
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
          rightAdornment={
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
              style={{ all: "unset", display: "inline-flex", padding: 6, cursor: "pointer" }}
            >
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        <div className={s.row}>
          <label className={s.checkboxRow}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Lembrar deste dispositivo
          </label>
          <Link to={ROUTES.forgotPassword} className={s.linkBtn}>
            Esqueci minha senha
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" loading={submitting}>
          Entrar
        </Button>

        <p style={{ textAlign: "center", fontSize: "var(--jq-fs-sm)", color: "var(--jq-text-muted)", margin: 0 }}>
          Ainda não tem uma conta?{" "}
          <Link to={ROUTES.register} className={s.linkBtn}>
            Criar conta
          </Link>
        </p>

        <div className={s.demoBox}>
          <strong>Acesso demo:</strong> admin@jotaquali.com / admin123
          <br />
          tecnico@jotaquali.com / tecnico123
        </div>
      </form>
    </AuthLayout>
  );
}
