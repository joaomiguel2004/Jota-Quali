import { Pencil, Trash2 } from "lucide-react";
import type { Equipamento } from "../../types";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import styles from "./EquipamentosTable.module.css";

interface Props {
  items: Equipamento[];
  onEdit: (eq: Equipamento) => void;
  onDelete: (eq: Equipamento) => void;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "—";
  return `${d}/${m}/${y}`;
}

export function EquipamentosTable({ items, onEdit, onDelete }: Props) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tag}>Tag</th>
            <th>Nome</th>
            <th>Última calibração</th>
            <th>Localização</th>
            <th>Status</th>
            <th className={styles.actionsHead} aria-label="Ações" />
          </tr>
        </thead>
        <tbody>
          {items.map((eq) => (
            <tr key={eq.id}>
              <td className={styles.tag}>{eq.tag}</td>
              <td className={styles.nome}>{eq.nome}</td>
              <td>{formatDate(eq.ultimaCalibracao)}</td>
              <td>{eq.localizacao || "—"}</td>
              <td>
                <StatusBadge status={eq.status} />
              </td>
              <td>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => onEdit(eq)}
                    aria-label={`Editar ${eq.tag}`}
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                    onClick={() => onDelete(eq)}
                    aria-label={`Excluir ${eq.tag}`}
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
