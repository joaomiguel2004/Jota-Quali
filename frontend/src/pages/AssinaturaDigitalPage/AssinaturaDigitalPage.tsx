import { PenTool } from "lucide-react";
import { ModulePlaceholder } from "../_shared/ModulePlaceholder";

export default function AssinaturaDigitalPage() {
  return (
    <ModulePlaceholder
      documentTitle="Assinatura Digital"
      eyebrow="Qualidade"
      title="Assinatura digital"
      subtitle="Assinatura eletrônica de laudos e documentos com validade jurídica."
      icon={PenTool}
      emptyDescription="Em breve você poderá assinar documentos com certificado digital, acompanhar fluxos de aprovação e auditar todas as assinaturas realizadas."
    />
  );
}
