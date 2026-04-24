import { useState, useCallback } from "react";
import { Modal } from "antd";
import { MilitaryForm } from "../../pages/Military/components/MilitaryForm";
import { useMilitary } from "../../hooks/useMilitary";
import type {
  MilitaryResponse,
  CreateMilitaryRequest,
} from "../../services/MilitaryService/types";
import { MilitaryList } from "./components/MilitaryList";

/**
 * Military (page)
 *
 * Single orchestrator: owns modal open/close state and bridges the
 * useMilitary hook with the form component.
 *
 * Data flow:
 *   useMilitary ──► MilitaresList  (list + delete)
 *   useMilitary ──► MilitaryForm   (create / update)
 */
export function Military() {
  const {
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
  } = useMilitary();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilitary, setEditingMilitary] =
    useState<MilitaryResponse | null>(null);

  // ── Modal handlers ─────────────────────────────────────────────────────────
  const handleNovo = useCallback(() => {
    setEditingMilitary(null);
    setIsModalOpen(true);
  }, []);

  const handleEditar = useCallback((militar: MilitaryResponse) => {
    setEditingMilitary(militar);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingMilitary(null);
  }, []);

  // ── Form submit: routes to create or update ────────────────────────────────
  const handleFormSuccess = useCallback(
    async (payload: CreateMilitaryRequest) => {
      if (editingMilitary) {
        await handleUpdate(editingMilitary.id, payload);
      } else {
        await handleCreate(payload);
      }
      handleCloseModal();
    },
    [editingMilitary, handleCreate, handleUpdate, handleCloseModal],
  );

  return (
    <>
      <MilitaryList
        data={data}
        filteredData={filteredData}
        loading={loading}
        loadingDelete={loadingDelete}
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        onNovo={handleNovo}
        onEditar={handleEditar}
        onExcluir={handleDelete}
      />

      <Modal
        title={editingMilitary ? "Editar Militar" : "Novo Militar"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnHidden
        width={640}
      >
        <MilitaryForm
          military={editingMilitary}
          onSuccess={handleFormSuccess}
          onCancel={handleCloseModal}
          loadingSubmit={loadingSubmit}
        />
      </Modal>
    </>
  );
}
