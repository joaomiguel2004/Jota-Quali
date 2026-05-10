import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AuthLayout, authLayoutStyles as s } from "../../components/AuthLayout/AuthLayout";
import { Field } from "@/components/ui/Field/Field";
import { Button } from "@/components/ui/Button/Button";
import { Alert } from "@/components/ui/Alert/Alert";
import { useAuth } from "../../hooks/useAuth";
import { isEmail, required } from "@/lib/validators";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ROUTES } from "@/config/routes";

export default function ForgotPasswordPage() {
  useDocumentTitle("Recuperar senha");
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState<{ token: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(undefined);
    if (!required(email)) return setError("Informe seu e-mail.");
    if (!isEmail(email)) return setError("E-mail inválido.");
    setSubmitting(true);
    try {
      const result = await requestPasswordReset(email);
      setSent(result);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Recuperar senha"
      subtitle="Enviaremos instruções para o seu e-mail corporativo."
      footer={
        <>
          Lembrou? <Link to={ROUTES.login} className={s.linkBtn}>Voltar ao login</Link>
        </>
      }
    >
      {sent ? (
        <div className={s.form}>
          <Alert variant="success" title="Instruções enviadas">
            Se o e-mail estiver cadastrado, você receberá um link para redefinir
            a senha em instantes.
          </Alert>
          <Alert variant="info" title="Modo demo">
            Use o link a seguir para concluir a redefinição:{" "}
            <Link
              to={`${ROUTES.resetPassword}?token=${sent.token}`}
              className={s.linkBtn}
            >
              Abrir página de redefinição
            </Link>
          </Alert>
        </div>
      ) : (
        <form className={s.form} onSubmit={onSubmit} noValidate>
          <Field
            label="E-mail"
            type="email"
            placeholder="seu.nome@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            required
            autoFocus
          />
          <Button type="submit" size="lg" fullWidth loading={submitting}>
            Enviar instruções
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
