import { GitBranch } from "lucide-react";
import { ModulePlaceholder } from "../_shared/ModulePlaceholder";

export default function RastreabilidadePage() {
  return (
    <ModulePlaceholder
      documentTitle="Rastreabilidade"
      eyebrow="Qualidade"
      title="Rastreabilidade"
      subtitle="Histórico completo da cadeia de custódia e eventos relacionados a cada item."
      icon={GitBranch}
      emptyDescription="Em breve você poderá visualizar a linha do tempo de cada equipamento, amostra ou laudo, com auditoria completa de quem fez o quê e quando."
    />
  );
}
