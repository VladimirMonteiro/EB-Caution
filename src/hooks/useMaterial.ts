// hooks/useMaterial.ts
import { useEffect, useState } from "react";
import { message } from "antd";
import { useAuth } from "./useAuth";
import { findAll } from "../services/MaterialService";
import type { MaterialResponse } from "../services/MaterialService/types";

export interface Material {
  id: string;
  name: string;
}

export function useMaterial() {
  const { user } = useAuth();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const [data, setData] = useState<MaterialResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const result = await findAll();
        setData(result);
      } catch {
        message.error("Erro ao carregar materiais");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user.id]);

  return {
    data,
    loading,
  };
}