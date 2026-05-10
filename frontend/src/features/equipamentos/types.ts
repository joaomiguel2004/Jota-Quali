export type StatusEquipamento = "ativo" | "manutencao" | "inativo";

export interface Equipamento {
  id: string;
  tag: string;
  nome: string;
  ultimaCalibracao: string | null; // ISO date (YYYY-MM-DD)
  localizacao: string;
  status: StatusEquipamento;
  createdAt: string;
}

export type EquipamentoInput = Omit<Equipamento, "id" | "createdAt">;

export const STATUS_LABEL: Record<StatusEquipamento, string> = {
  ativo: "Ativo",
  manutencao: "Em manutenção",
  inativo: "Inativo",
};
