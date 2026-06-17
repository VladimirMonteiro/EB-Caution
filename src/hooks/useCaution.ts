import { useCallback, useEffect, useState } from "react";
import { message } from "antd";

import { useAuth } from "./useAuth";
import type { CreateCautionRequest } from "../services/CautionService/types";
import { createCaution, findCautions } from "../services/CautionService";

export function useCaution() {
  const { user } = useAuth();

  if (!user) throw new Error("Usuário não autenticado");

  const userId = user.id;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await findCautions(userId);
      setData(result);
    } catch {
      message.error("Erro ao carregar cautelas");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = useCallback(
    async (payload: CreateCautionRequest) => {
      try {
        const newCaution = await createCaution(userId, payload);

        setData((prev) => [newCaution, ...prev]);
        message.success("Cautela criada com sucesso");
      } catch {
        message.error("Erro ao criar cautela");
      }
    },
    [userId],
  );

  return {
    data,
    loading,
    handleCreate,
    refetch: fetchData,
  };
}