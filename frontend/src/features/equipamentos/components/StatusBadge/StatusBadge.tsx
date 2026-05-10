import { STATUS_LABEL, type StatusEquipamento } from "../../types";
import styles from "./StatusBadge.module.css";

export function StatusBadge({ status }: { status: StatusEquipamento }) {
  return <span className={`${styles.badge} ${styles[status]}`}>{STATUS_LABEL[status]}</span>;
}
