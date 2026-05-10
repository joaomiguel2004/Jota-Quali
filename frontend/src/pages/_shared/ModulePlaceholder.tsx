import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
import { EmptyState } from "@/components/feedback/EmptyState/EmptyState";
import { Button } from "@/components/ui/Button/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export interface ModulePlaceholderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  emptyTitle?: string;
  emptyDescription: string;
  documentTitle: string;
}

export function ModulePlaceholder({
  eyebrow,
  title,
  subtitle,
  icon,
  emptyTitle = "Módulo em desenvolvimento",
  emptyDescription,
  documentTitle,
}: ModulePlaceholderProps) {
  useDocumentTitle(documentTitle);
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        actions={<Button variant="secondary">Solicitar acesso antecipado</Button>}
      />
      <EmptyState
        icon={icon}
        title={emptyTitle}
        description={emptyDescription}
        actions={<Button variant="ghost">Ver roadmap</Button>}
      />
    </>
  );
}
