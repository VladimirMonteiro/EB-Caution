import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { message } from "antd";
import { findById, addLoadItem, removeLoadItem, updateLoadItem } from "../services/LoadService";
import type {
  LoadDetailsResponseDTO,
  CreateLoadItemRequest,
} from "../services/LoadService/types";

export function useLoadDetails(loadId: string) {
  const { user } = useAuth();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  if (!loadId) {
    throw new Error("loadId é obrigatório");
  }

  const userId = user.id;

  const [data, setData] = useState<LoadDetailsResponseDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await findById(userId, loadId);
      setData(result);
    } catch {
      message.error("Erro ao carregar detalhes da carga");
    } finally {
      setLoading(false);
    }
  }, [userId, loadId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddItem = useCallback(
    async (materialId: string, payload: CreateLoadItemRequest) => {
      try {
        if (!materialId) {
          message.error("Material inválido");
          return;
        }

        const newItem = await addLoadItem(
          userId,
          loadId,
          materialId,
          payload,
        );

        // Atualiza lista local
        setData((prev) =>
          prev
            ? {
                ...prev,
                items: [...prev.items, newItem],
              }
            : prev,
        );

        message.success("Item adicionado com sucesso");
      } catch {
        message.error("Erro ao adicionar item");
      }
    },
    [userId, loadId],
  );

  
const handleRemoveItem = useCallback(
  async (itemId: string) => {
    try {
      await removeLoadItem(userId, loadId, itemId);

      setData((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.filter((item) => item.materialId !== itemId),
            }
          : prev,
      );

      message.success("Item removido com sucesso");
    } catch {
      message.error("Erro ao remover item");
    }
  },
  [userId, loadId],
);

const handleUpdateItem = useCallback(
  async (
    materialId: string,
    payload: CreateLoadItemRequest,
  ) => {
    try {
      const updatedItem = await updateLoadItem(
        userId,
        loadId,
        materialId,
        payload,
      );

      setData((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.map((item) =>
                item.materialId === materialId ? updatedItem : item,
              ),
            }
          : prev,
      );

      message.success("Item atualizado com sucesso");
    } catch {
      message.error("Erro ao atualizar item");
    }
  },
  [userId, loadId],
);

  return {
    data,
    loading,
    handleAddItem,
    refetch: fetchData,
    handleRemoveItem,
    handleUpdateItem
  };
}