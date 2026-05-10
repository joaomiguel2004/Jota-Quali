import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

function buildPages(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "...")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("...");
  pages.push(totalPages);
  return pages;
}

export function Pagination({ page, totalPages, total, pageSize, onChange }: Props) {
  if (total === 0) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  const pages = buildPages(page, totalPages);

  return (
    <div className={styles.wrap}>
      <span className={styles.info}>
        Mostrando <strong>{from}</strong>–<strong>{to}</strong> de{" "}
        <strong>{total}</strong>
      </span>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`e${i}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={`${styles.btn} ${p === page ? styles.active : ""}`}
              onClick={() => onChange(p)}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}
        <button
          type="button"
          className={styles.btn}
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Próxima página"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
