import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import type {
  CreateLoadRequest,
  LoadResponse,
} from "../services/LoadService/types";
import {
  create,
  findAll,
  findById,
} from "../services/LoadService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export function useLoad() {
  const { user } = useAuth();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const userId = user.id;

  const [data, setData] = useState<LoadResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ─────────────────────────────────────────────
  // FETCH ALL LOADS
  // ─────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await findAll(userId);
      setData(result);
    } catch (err) {
      console.error(err);
      message.error("Erro ao carregar cargas");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ─────────────────────────────────────────────
  // CREATE LOAD
  // ─────────────────────────────────────────────
  const handleCreate = useCallback(
    async (payload: CreateLoadRequest) => {
      try {
        const newLoad = await create(userId, payload);
        setData((prev) => [newLoad, ...prev]);
        message.success("Carga criada com sucesso");
      } catch (err) {
        console.error(err);
        message.error("Erro ao criar carga");
      }
    },
    [userId]
  );

  // ─────────────────────────────────────────────
  // GET LOAD DETAILS (ESSENCIAL PRO SEU MODAL)
  // ─────────────────────────────────────────────
  const getLoadDetails = useCallback(
    async (loadId: string) => {
      try {
        const response = await findById(userId, loadId);

        console.log(response)
        // 🔥 padroniza retorno
        return response;
      } catch (err) {
        console.error("Erro ao buscar detalhes da carga:", err);
        message.error("Erro ao carregar itens da carga");
        throw err;
      }
    },
    [userId]
  );

  // ─────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────
  const handleViewLoadDetails = (loadId: string) => {
    navigate(`/cargas/${userId}/${loadId}`);
  };

  return {
    data,
    loading,
    refetch: fetchData,
    handleCreate,
    handleViewLoadDetails,
    getLoadDetails, // ✅ AGORA EXISTE
  };
}