import { useState, useEffect, useCallback, useMemo } from "react";
import { message } from "antd";
import {
  findAllMilitary,
  createMilitary,
  updateMilitary,
  removeMilitary,
} from "../services/MilitaryService";
import type {
  MilitaryResponse,
  Situation,
  CreateMilitaryRequest,
  UpdateMilitaryRequest,
} from "../services/MilitaryService/types";
import { useAuth } from "./useAuth"; // adjust to your actual useAuth path

// ─── Filter type ──────────────────────────────────────────────────────────────

export type FilterSituation = "Todos" | Situation;

// ─── Return type ──────────────────────────────────────────────────────────────

export interface UseMilitaryReturn {
  /** Full unfiltered list */
  data: MilitaryResponse[];
  /** Filtered + searched list ready to render */
  filteredData: MilitaryResponse[];
  /** True while the initial fetch is in progress */
  loading: boolean;
  /** True while a create or update request is in flight */
  loadingSubmit: boolean;
  /** ID of the record currently being deleted */
  loadingDelete: string | null;
  /** Current search string */
  search: string;
  setSearch: (v: string) => void;
  /** Current situation filter */
  filter: FilterSituation;
  setFilter: (v: FilterSituation) => void;
  /** Creates a new record, appends to local state on success */
  handleCreate: (payload: CreateMilitaryRequest) => Promise<MilitaryResponse>;
  /** Updates an existing record, patches local state on success */
  handleUpdate: (
    id: string,
    payload: UpdateMilitaryRequest,
  ) => Promise<MilitaryResponse>;
  /** Deletes a record with optimistic update + rollback on error */
  handleDelete: (militar: MilitaryResponse) => Promise<void>;
  /** Re-fetches the full list */
  refetch: () => Promise<void>;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function normalize(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useMilitary
 *
 * Single source of truth for all military state.
 * Components that consume it are purely presentational.
 *
 * - userId comes from useAuth (components never touch auth)
 * - Create/update patch local state without a refetch
 * - Delete uses optimistic update with rollback
 */
export function useMilitary(): UseMilitaryReturn {
  const { user } = useAuth();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const userId = user.id;
  const [data, setData] = useState<MilitaryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterSituation>("Todos");

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    
    setLoading(true);
    try {
      const result = await findAllMilitary(userId);
      setData(result);
    } catch {
      message.error("Erro ao carregar militares.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Create ─────────────────────────────────────────────────────────────────
  const handleCreate = useCallback(
    async (payload: CreateMilitaryRequest): Promise<MilitaryResponse> => {
      setLoadingSubmit(true);
      try {
        const created = await createMilitary(userId, payload);
        setData((prev) => [created, ...prev]);
        message.success(`Militar ${created.warName} cadastrado com sucesso.`);
        return created;
      } catch {
        message.error("Erro ao cadastrar militar.");
        throw new Error("create_failed");
      } finally {
        setLoadingSubmit(false);
      }
    },
    [userId],
  );

  // ── Update ─────────────────────────────────────────────────────────────────
  const handleUpdate = useCallback(
    async (
      id: string,
      payload: UpdateMilitaryRequest,
    ): Promise<MilitaryResponse> => {
      setLoadingSubmit(true);
      try {
        const updated = await updateMilitary(userId, id, payload);
        setData((prev) => prev.map((m) => (m.id === id ? updated : m)));
        message.success(`Militar ${updated.warName} atualizado com sucesso.`);
        return updated;
      } catch {
        message.error("Erro ao atualizar militar.");
        throw new Error("update_failed");
      } finally {
        setLoadingSubmit(false);
      }
    },
    [userId],
  );

  // ── Delete (optimistic) ────────────────────────────────────────────────────
  const handleDelete = useCallback(
    async (militar: MilitaryResponse) => {
      setData((prev) => prev.filter((m) => m.id !== militar.id));
      setLoadingDelete(militar.id);
      try {
        await removeMilitary(userId, militar.id);
        message.success(`Militar ${militar.warName} excluído com sucesso.`);
      } catch {
        setData((prev) => [militar, ...prev]);
        message.error("Erro ao excluir militar. Tente novamente.");
      } finally {
        setLoadingDelete(null);
      }
    },
    [userId],
  );

  // ── Derived: filtered + searched ───────────────────────────────────────────
  const filteredData = useMemo(() => {
    const term = normalize(search.trim());
    return data.filter((m) => {
      const matchesFilter = filter === "Todos" || m.status === filter;
      const matchesSearch =
        !term ||
        normalize(m.warName).includes(term) ||
        normalize(m.grad).includes(term) ||
        normalize(m.cia).includes(term) ||
        normalize(m.pel).includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [data, search, filter]);

  return {
    data,
    filteredData,
    loading,
    loadingSubmit,
    loadingDelete,
    search,
    setSearch,
    filter,
    setFilter,
    handleCreate,
    handleUpdate,
    handleDelete,
    refetch: fetchData,
  };
}
