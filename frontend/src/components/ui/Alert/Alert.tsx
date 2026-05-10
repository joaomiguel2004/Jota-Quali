import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Alert.module.css";

export type AlertVariant = "info" | "success" | "warning" | "danger";

const ICONS: Record<AlertVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
};

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  className?: string;
}

export function Alert({ variant = "info", title, children, className }: AlertProps) {
  const Icon = ICONS[variant];
  return (
    <div className={cn(styles.alert, styles[variant], className)} role="status">
      <Icon size={18} className={styles.icon} aria-hidden />
      <div className={styles.body}>
        {title && <span className={styles.title}>{title}</span>}
        {children && <span className={styles.message}>{children}</span>}
      </div>
    </div>
  );
}
