import { Settings } from "lucide-react";
import { ModulePlaceholder } from "../_shared/ModulePlaceholder";

export default function ConfiguracoesPage() {
  return (
    <ModulePlaceholder
      documentTitle="Configurações"
      eyebrow="Administração"
      title="Configurações"
      subtitle="Parâmetros gerais do sistema, integrações e preferências corporativas."
      icon={Settings}
      emptyDescription="Em breve você poderá configurar dados da empresa, integrações com sistemas externos, modelos de documentos e políticas de qualidade."
    />
  );
}
