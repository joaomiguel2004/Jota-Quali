import { FileText } from "lucide-react";
import { ModulePlaceholder } from "../_shared/ModulePlaceholder";

export default function LaudosPage() {
  return (
    <ModulePlaceholder
      documentTitle="Laudos"
      eyebrow="Qualidade"
      title="Laudos laboratoriais"
      subtitle="Emissão, revisão e consulta de laudos técnicos do laboratório."
      icon={FileText}
      emptyDescription="Em breve você poderá emitir laudos a partir de modelos padronizados, anexar resultados de ensaios e enviá-los para assinatura digital."
    />
  );
}
