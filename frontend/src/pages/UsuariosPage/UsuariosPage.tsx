import { Users } from "lucide-react";
import { ModulePlaceholder } from "../_shared/ModulePlaceholder";

export default function UsuariosPage() {
  return (
    <ModulePlaceholder
      documentTitle="Usuários"
      eyebrow="Administração"
      title="Usuários e permissões"
      subtitle="Gerencie acessos, papéis e permissões da equipe."
      icon={Users}
      emptyDescription="Em breve você poderá convidar usuários, atribuir papéis (administrador, técnico, qualidade, visualizador) e definir permissões granulares por módulo."
    />
  );
}
