import { Button, Card, Form, Input, Modal, Select, Space, Table, Typography, message, DatePicker, Spin } from "antd";
import { useState, useMemo, useEffect } from "react";
import { useCaution } from "../../hooks/useCaution";
import { useMilitary } from "../../hooks/useMilitary";
import { useLoad } from "../../hooks/useLoad";
import dayjs from "dayjs";

const { Title } = Typography;

export function Cautions() {
  const { data, loading, handleCreate } = useCaution();
  const { filteredData: militaryData, setSearch } = useMilitary();
  const { data: loads, getLoadDetails } = useLoad();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const [selectedLoad, setSelectedLoad] = useState<any>(null);
  const [loadingLoad, setLoadingLoad] = useState(false);

  const selectedLoadId = Form.useWatch("loadId", form);

  // ─── LOAD OPTIONS ─────────────────────────────
  const loadOptions = useMemo(() => {
    return (loads ?? []).map((l: any) => ({
      value: String(l.loadId),
      label: `${l.pelName} - ${l.cia}`,
    }));
  }, [loads]);

  // ─── MILITARY OPTIONS ─────────────────────────────
  const militaryOptions = useMemo(() => {
    return (militaryData ?? []).map((m: any) => ({
      value: String(m.id),
      label: `${m.grad} - ${m.warName} (${m.cia}/${m.pel})`,
    }));
  }, [militaryData]);

  // ─── MATERIALS ─────────────────────────────
  const materialOptions = useMemo(() => {
    if (!selectedLoad?.items) return [];

    return selectedLoad.items.map((i: any) => ({
      value: String(i.materialId),
      label: `${i.name} (Disponível: ${i.availableQuantity})`,
    }));
  }, [selectedLoad]);

  // ─── OPEN / CLOSE ─────────────────────────────
  const handleOpen = () => {
    form.resetFields();
    form.setFieldsValue({ items: [] });
    setSelectedLoad(null);
    setOpen(true);
  };

  const handleClose = () => {
    form.resetFields();
    setSelectedLoad(null);
    setOpen(false);
  };

  // ─── AUTO LOAD DETAILS (mais robusto que onChange)
  useEffect(() => {
    const fetch = async () => {
      if (!selectedLoadId) {
        setSelectedLoad(null);
        return;
      }

      try {
        setLoadingLoad(true);

        const data = await getLoadDetails(selectedLoadId);

        setSelectedLoad(data);
      } catch {
        message.error("Erro ao carregar itens da carga");
      } finally {
        setLoadingLoad(false);
      }
    };

    fetch();
  }, [selectedLoadId, getLoadDetails]);

  // ─── SUBMIT ─────────────────────────────
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const items = (values.items ?? [])
        .filter((i: any) => i.materialId && i.quantity > 0)
        .map((i: any) => ({
          materialId: String(i.materialId),
          quantity: Number(i.quantity),
          deliveryDate: i.deliveryDate ? dayjs(i.deliveryDate).toISOString() : null,
        }));

      if (!values.loadId || !values.militaryId) {
        message.error("Selecione carga e militar");
        return;
      }

      if (items.length === 0) {
        message.error("Adicione ao menos um item válido");
        return;
      }

      const payload = {
        loadId: String(values.loadId),
        militaryId: String(values.militaryId),
        observations: values.observations ?? "",
        items,
      };

      await handleCreate(payload);

      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  // ─── TABLE ─────────────────────────────
  const columns = [
    { title: "Militar", dataIndex: "militaryWarName" },
    { title: "Carga", dataIndex: "loadName" },
    { title: "Status", dataIndex: "status" },
    { title: "Data", dataIndex: "cautionDate" },
  ];

  return (
    <div>
      <Card>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Title level={4}>Cautelas</Title>

          <Button type="primary" onClick={handleOpen}>
            Nova Cautela
          </Button>
        </Space>

        <Table loading={loading} dataSource={data} rowKey="id" columns={columns} />
      </Card>

      <Modal title="Criar Cautela" open={open} onCancel={handleClose} onOk={handleSubmit} width={900} destroyOnClose>
        <Form form={form} layout="vertical">
          {/* LOAD */}
          <Form.Item name="loadId" label="Carga" rules={[{ required: true }]}>
            <Select showSearch options={loadOptions} placeholder="Selecione carga" allowClear />
          </Form.Item>

          {/* LOADING */}
          {loadingLoad && <Spin style={{ marginBottom: 10 }} />}

          {/* MILITAR */}
          <Form.Item name="militaryId" label="Militar" rules={[{ required: true }]}>
            <Select
              showSearch
              options={militaryOptions}
              placeholder="Selecione militar"
              allowClear
              onSearch={(v) => setSearch(v)}
            />
          </Form.Item>

          {/* ITEMS */}
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                <Button type="dashed" onClick={() => add({})} style={{ marginBottom: 10 }} disabled={!selectedLoad}>
                  Adicionar Item
                </Button>

                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item name={[field.name, "materialId"]} rules={[{ required: true }]}>
                      <Select
                        style={{ width: 260 }}
                        options={materialOptions}
                        placeholder="Material"
                        allowClear
                        disabled={!selectedLoad}
                      />
                    </Form.Item>

                    <Form.Item name={[field.name, "quantity"]} rules={[{ required: true }]}>
                      <Input type="number" min={1} placeholder="Qtd" />
                    </Form.Item>
                    <Button danger onClick={() => remove(field.name)}>
                      X
                    </Button>
                  </Space>
                ))}
              </>
            )}
          </Form.List>

          <Form.Item name="observations">
            <Input.TextArea placeholder="Observações" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
