import { useParams } from "react-router-dom";
import { Card, Table, Typography, Spin, Button, Modal, Form, Space, Select, Input, Popconfirm, message } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useLoadDetails } from "../../hooks/useLoadDetails";
import { useMaterial } from "../../hooks/useMaterial";

const { Title, Text } = Typography;

export function LoadDetails() {
  const { loadId } = useParams<{ loadId: string }>();

  if (!loadId) {
    throw new Error("LoadId não encontrado");
  }

  const { data, loading, handleAddItem, handleRemoveItem, handleUpdateItem } = useLoadDetails(loadId);

  const { data: materials, loading: loadingMaterials } = useMaterial();

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  if (loading || !data) return <Spin />;

  // ───────────────────────── TABLE ─────────────────────────
  const columns = [
    {
      title: "Material",
      dataIndex: "name",
    },
    {
      title: "Quantidade Prevista",
      dataIndex: "expectedQuantity",
    },
    {
      title: "Quantidade Disponível",
      dataIndex: "availableQuantity",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      render: (value: string | null | undefined) => (value && value.trim() !== "" ? value : "-"),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Editar
          </Button>

          <Popconfirm
            title="Remover item"
            description="Deseja remover este item?"
            onConfirm={() => handleRemoveItem(record.materialId)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // ───────────────────────── CREATE ─────────────────────────
  const openCreateModal = () => setOpenCreate(true);

  const closeCreateModal = () => {
    createForm.resetFields();
    setOpenCreate(false);
  };

  const handleCreateSubmit = async () => {
    try {
      const values = await createForm.validateFields();

      await handleAddItem(values.materialId, {
        expectedQuantity: Number(values.expectedQuantity),
        description: values.description,
      });

      closeCreateModal();
    } catch (e) {
      console.log(e);
    }
  };

  // ───────────────────────── EDIT ─────────────────────────
  const openEditModal = (record: any) => {
    setEditingItem(record);

    editForm.setFieldsValue({
      expectedQuantity: record.expectedQuantity,
      description: record.description,
    });

    setOpenEdit(true);
  };

  const closeEditModal = () => {
    setEditingItem(null);
    editForm.resetFields();
    setOpenEdit(false);
  };

  const handleEditSubmit = async () => {
    try {
      const values = await editForm.validateFields();

      await handleUpdateItem(editingItem.materialId, {
        expectedQuantity: Number(values.expectedQuantity),
        description: values.description,
      });

      closeEditModal();
    } catch (e) {
      console.log(e);
    }
  };

  // ───────────────────────── OPTIONS ─────────────────────────
  const materialOptions =
    materials?.map((m) => ({
      value: String(m.materialId),
      label: m.name,
    })) ?? [];

  // ───────────────────────── RENDER ─────────────────────────
  return (
    <>
      {/* HEADER */}
      <Card style={{ marginBottom: 16 }}>
        <Title level={4}>Detalhes da Carga</Title>

        <p>
          <Text strong>Pelotão:</Text> {data.pelName}
        </p>

        <p>
          <Text strong>Companhia:</Text> {data.cia}
        </p>

        <p>
          <Text strong>Data:</Text> {data.createdAt}
        </p>
      </Card>

      {/* ACTIONS */}
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openCreateModal}>
          Adicionar Item
        </Button>
      </Space>

      {/* TABLE */}
      <Table
        dataSource={data.items}
        columns={columns}
        rowKey={(record) => `${record.materialId}-${record.description}-${record.expectedQuantity}`}
      />

      {/* ───────────────────────── CREATE MODAL ───────────────────────── */}
      <Modal
        title="Adicionar Item"
        open={openCreate}
        onCancel={closeCreateModal}
        onOk={handleCreateSubmit}
        destroyOnHidden
      >
        <Form form={createForm} layout="vertical">
          <Form.Item name="materialId" label="Material" rules={[{ required: true, message: "Selecione um material" }]}>
            <Select
              placeholder="Selecione um material"
              loading={loadingMaterials}
              showSearch
              optionFilterProp="label"
              options={materialOptions}
            />
          </Form.Item>

          <Form.Item name="expectedQuantity" label="Quantidade prevista" rules={[{ required: true }]}>
            <Input type="number" min={1} />
          </Form.Item>

          <Form.Item name="description" label="Descrição">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* ───────────────────────── EDIT MODAL ───────────────────────── */}
      <Modal title="Editar Item" open={openEdit} onCancel={closeEditModal} onOk={handleEditSubmit} destroyOnHidden>
        <Form form={editForm} layout="vertical">
          <Form.Item label="Material">
            <Input disabled value={editingItem?.name} />
          </Form.Item>

          <Form.Item name="expectedQuantity" label="Quantidade prevista" rules={[{ required: true }]}>
            <Input type="number" min={1} />
          </Form.Item>

          <Form.Item name="description" label="Descrição">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
