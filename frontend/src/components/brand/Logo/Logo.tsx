import { cn } from "@/lib/cn";
import styles from "./Logo.module.css";

export interface LogoProps {
  compact?: boolean;
  className?: string;
}

export function Logo({ compact, className }: LogoProps) {
  return (
    <span className={cn(styles.logo, compact && styles.compact, className)} aria-label="JotaQuali">
      <span className={styles.mark} aria-hidden>
        JQ
      </span>
      <span className={styles.text}>
        Jota<strong>Quali</strong>
      </span>
    </span>
  );
}
