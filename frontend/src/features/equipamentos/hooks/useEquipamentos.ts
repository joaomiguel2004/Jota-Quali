import { useCallback, useEffect, useMemo, useState } from "react";
import { equipamentosService } from "../services/equipamentosService";
import type {
  Equipamento,
  EquipamentoInput,
  StatusEquipamento,
} from "../types";

export type StatusFilter = "todos" | StatusEquipamento;

const PAGE_SIZE = 10;

export function useEquipamentos() {
  const [items, setItems] = useState<Equipamento[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setItems(equipamentosService.list());
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const sorted = useMemo(
    () =>
      [...items].sort((a, b) =>
        a.tag.localeCompare(b.tag, undefined, { numeric: true, sensitivity: "base" })
      ),
    [items]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return sorted.filter((eq) => {
      if (statusFilter !== "todos" && eq.status !== statusFilter) return false;
      if (!term) return true;
      return (
        eq.tag.toLowerCase().includes(term) ||
        eq.nome.toLowerCase().includes(term) ||
        eq.localizacao.toLowerCase().includes(term)
      );
    });
  }, [items, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const create = useCallback((input: EquipamentoInput) => {
    const novo = equipamentosService.create(input);
    setItems((prev) => [novo, ...prev]);
    return novo;
  }, []);

  const update = useCallback((id: string, input: EquipamentoInput) => {
    const atualizado = equipamentosService.update(id, input);
    setItems((prev) => prev.map((e) => (e.id === id ? atualizado : e)));
    return atualizado;
  }, []);

  const remove = useCallback((id: string) => {
    equipamentosService.remove(id);
    setItems((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return {
    items,
    filtered,
    paginated,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page: currentPage,
    setPage,
    totalPages,
    pageSize: PAGE_SIZE,
    total: filtered.length,
    create,
    update,
    remove,
  };
}
