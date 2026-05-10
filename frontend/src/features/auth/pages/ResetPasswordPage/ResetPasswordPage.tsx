import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthLayout, authLayoutStyles as s } from "../../components/AuthLayout/AuthLayout";
import { Field } from "@/components/ui/Field/Field";
import { Button } from "@/components/ui/Button/Button";
import { Alert } from "@/components/ui/Alert/Alert";
import { useAuth } from "../../hooks/useAuth";
import { checkPassword } from "@/lib/validators";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ROUTES } from "@/config/routes";

export default function ResetPasswordPage() {
  useDocumentTitle("Redefinir senha");
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = useMemo(() => params.get("token") ?? "", [params]);

  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ pwd?: string; confirm?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const next: typeof errors = {};
    const check = checkPassword(pwd);
    if (!check.valid) next.pwd = check.message;
    if (confirm !== pwd) next.confirm = "As senhas não coincidem.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      await resetPassword(token, pwd);
      setSuccess(true);
      setTimeout(() => navigate(ROUTES.login, { replace: true }), 1600);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Falha ao redefinir.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <AuthLayout title="Link inválido">
        <Alert variant="danger" title="Token não encontrado">
          O link de redefinição é inválido ou expirou.
        </Alert>
        <div className={s.row} style={{ justifyContent: "center" }}>
          <Link to={ROUTES.forgotPassword} className={s.linkBtn}>
            Solicitar novo link
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Definir nova senha"
      subtitle="Escolha uma senha forte para proteger sua conta."
    >
      {success ? (
        <Alert variant="success" title="Senha redefinida">
          Você será redirecionado para a tela de login.
        </Alert>
      ) : (
        <form className={s.form} onSubmit={onSubmit} noValidate>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Field
            label="Nova senha"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            error={errors.pwd}
            hint="Mínimo de 8 caracteres, com 1 maiúscula e 1 número."
            required
            autoFocus
          />
          <Field
            label="Confirmar nova senha"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={errors.confirm}
            required
          />
          <Button type="submit" size="lg" fullWidth loading={submitting}>
            Redefinir senha
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
