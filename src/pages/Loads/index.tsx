import { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Typography, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, EyeFilled, PlusOutlined } from "@ant-design/icons";
import { useLoad } from "../../hooks/useLoad";

import { useAuth } from "../../hooks/useAuth";

const { Title } = Typography;

export function Loads() {
  const { data, loading, handleCreate, handleViewLoadDetails} = useLoad();

  const { user } = useAuth();

  if (!user) {
    throw new Error("Usuario não autenticado.");
  }

  const userId = user.id;

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // 🔹 placeholders (por enquanto não fazem nada)
  const handleEdit = (record: any) => {
    console.log("Editar carga:", record);
  };

  const columns = [
    {
      title: "Pelotão",
      dataIndex: "pelName",
      key: "pelName",
    },
    {
      title: "Companhia",
      dataIndex: "cia",
      key: "cia",
    },
    {
      title: "Data de criação",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "AÇÕES",
      key: "acoes",
      width: 120,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Ver detalhes">
            <Button
              type="text"
              icon={<EyeFilled />}
              onClick={() => handleViewLoadDetails(record.loadId)}
              aria-label={`Editar carga ${record.pelName}`}
            />
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              aria-label={`Editar carga ${record.pelName}`}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      await handleCreate(values);

      form.resetFields();
      setOpen(false);
    } catch {}
  };

  return (
    <>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Title level={3}>Cargas</Title>

        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          Nova Carga
        </Button>
      </Space>

      <Table dataSource={data} columns={columns} rowKey="loadId" loading={loading} />

      <Modal
        title="Criar Carga"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="pelName" label="Pelotão" rules={[{ required: true, message: "Informe o pelotão" }]}>
            <Input placeholder="Ex: 1º Pelotão" />
          </Form.Item>

          <Form.Item name="cia" label="Companhia" rules={[{ required: true, message: "Informe a companhia" }]}>
            <Input placeholder="Ex: Alfa" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
