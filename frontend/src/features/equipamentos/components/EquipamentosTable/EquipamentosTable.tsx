import React, { useState } from "react";
import { ChevronRight, Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react";
import type { Equipamento } from "../../types";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import styles from "./EquipamentosTable.module.css";
import { cn } from "@/lib/cn";

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
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: "40px" }} aria-label="Expandir"></th>
            <th className={styles.tag}>Tag</th>
            <th>Nome</th>
            <th>Última calibração</th>
            <th>Localização</th>
            <th>Status</th>
            <th className={styles.actionsHead} aria-label="Ações" />
          </tr>
        </thead>
        <tbody>
          {items.map((eq) => {
            const isExpanded = expandedRows.has(eq.id);
            return (
              <React.Fragment key={eq.id}>
                <tr>
                  <td>
                    <button
                      type="button"
                      className={cn(styles.expandBtn, isExpanded && styles.expanded)}
                      onClick={() => toggleRow(eq.id)}
                      aria-label={isExpanded ? "Recolher detalhes" : "Expandir detalhes"}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </td>
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
                {isExpanded && (
                  <tr className={styles.expandedRow}>
                    <td colSpan={7}>
                      <div className={styles.expandedContent}>
                        <div className={styles.expandedHeader}>
                          Detalhes do Equipamento: {eq.tag}
                        </div>
                        <div className={styles.expandedGrid}>
                          <div className={styles.expandedItem}>
                            <span className={styles.expandedLabel}>Padrão do Equipamento</span>
                            <span className={styles.expandedValue}>{eq.padrao || "Não definido"}</span>
                          </div>
                          <div className={styles.expandedItem}>
                            <span className={styles.expandedLabel}>Laudo Assinado</span>
                            <span className={styles.expandedValue} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              {eq.laudoAssinado ? (
                                <><CheckCircle2 size={16} color="var(--jq-success)" /> Sim</>
                              ) : (
                                <><XCircle size={16} color="var(--jq-danger)" /> Não</>
                              )}
                            </span>
                          </div>
                          <div className={styles.expandedItem}>
                            <span className={styles.expandedLabel}>Data de Cadastro</span>
                            <span className={styles.expandedValue}>{formatDate(eq.createdAt.split('T')[0])}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
