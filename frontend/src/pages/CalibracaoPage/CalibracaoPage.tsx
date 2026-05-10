import { Gauge } from "lucide-react";
import { ModulePlaceholder } from "../_shared/ModulePlaceholder";

export default function CalibracaoPage() {
  return (
    <ModulePlaceholder
      documentTitle="Calibração"
      eyebrow="Operação"
      title="Calibração"
      subtitle="Planejamento, execução e registro de calibrações com alertas de vencimento."
      icon={Gauge}
      emptyDescription="Em breve você poderá criar planos de calibração, registrar resultados, anexar certificados e receber notificações automáticas de prazos."
    />
  );
}
