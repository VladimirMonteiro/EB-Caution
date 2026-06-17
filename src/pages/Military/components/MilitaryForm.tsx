import React, { useEffect } from "react";
import { Form, Input, Select, Button, Row, Col, Divider } from "antd";
import type {
  MilitaryFormProps,
  CreateMilitaryRequest,
} from "../../../services/MilitaryService/types";

const { Option } = Select;

// ─── Graduation options — adjust to your domain ──────────────────────────────

const GRAD_OPTIONS = [
  "Soldado",
  "Cabo",
  "3º Sargento",
  "2º Sargento",
  "1º Sargento",
  "Subtenente",
  "Aspirante",
  "2º Tenente",
  "1º Tenente",
  "Capitão",
  "Major",
  "Tenente-Coronel",
  "Coronel",
];

// ─── CPF mask helper ──────────────────────────────────────────────────────────

function maskCpf(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

function maskPhone(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
    .slice(0, 15);
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * MilitaryForm
 *
 * Purely presentational — receives handlers from the parent (Military page).
 * No service calls here; create/update go through useMilitary.
 */
export const MilitaryForm: React.FC<MilitaryFormProps> = ({
  military,
  onSuccess,
  onCancel,
  loadingSubmit,
}) => {
  const [form] = Form.useForm<CreateMilitaryRequest>();
  const isEdit = !!military;

  // Pre-fill form when editing
  useEffect(() => {
    if (military) {
      form.setFieldsValue(military);
    } else {
      form.resetFields();
    }
  }, [military, form]);

  const handleFinish = async (values: CreateMilitaryRequest) => {
    // Strip masks before sending
    const payload: CreateMilitaryRequest = {
      ...values,
      cpf: values.cpf.replace(/\D/g, ""),
      phone: values.phone.replace(/\D/g, ""),
    };
    await onSuccess(payload);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      requiredMark={false}
      initialValues={{ status: "ACTIVE" }}
    >
      {/* ── Identificação ── */}
      <Divider
        titlePlacement="left"
        style={{ fontSize: 13, color: "#888" }}
        styles={{ content: { marginInlineStart: 0 } }}
      >
        Identificação
      </Divider>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="warName"
            label="Nome de Guerra"
            rules={[
              { required: true, message: "O nome de guerra é obrigatório." },
            ]}
          >
            <Input placeholder="Ex: Silva" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="grad"
            label="Graduação"
            rules={[{ required: true, message: "A graduação é obrigatória." }]}
          >
            <Select placeholder="Selecione a graduação" showSearch>
              {GRAD_OPTIONS.map((g) => (
                <Option key={g} value={g}>
                  {g}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="cia"
            label="Companhia (CIA)"
            rules={[{ required: true, message: "A companhia é obrigatória." }]}
          >
            <Input placeholder="Ex: 1ª CIA" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="pel"
            label="Pelotão / Seção"
            rules={[
              { required: true, message: "O pelotão/seção é obrigatório." },
            ]}
          >
            <Input placeholder="Ex: 1º Pel" />
          </Form.Item>
        </Col>
      </Row>

      {/* ── Contato ── */}
      <Divider
        titlePlacement="left"
        style={{ fontSize: 13, color: "#888" }}
        styles={{ content: { marginInlineStart: 0 } }}
      >
        Contato
      </Divider>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="cpf"
            label="CPF"
            rules={[
              { required: true, message: "O CPF é obrigatório." },
              {
                validator: (_, value) => {
                  const digits = (value ?? "").replace(/\D/g, "");
                  return digits.length === 11
                    ? Promise.resolve()
                    : Promise.reject(new Error("CPF inválido."));
                },
              },
            ]}
            normalize={(v) => maskCpf(v ?? "")}
          >
            <Input placeholder="000.000.000-00" maxLength={14} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="phone"
            label="Telefone"
            rules={[
              { required: true, message: "O telefone é obrigatório." },
              {
                validator: (_, value) => {
                  const digits = (value ?? "").replace(/\D/g, "");
                  return digits.length >= 10
                    ? Promise.resolve()
                    : Promise.reject(new Error("Telefone inválido."));
                },
              },
            ]}
            normalize={(v) => maskPhone(v ?? "")}
          >
            <Input placeholder="(00) 00000-0000" maxLength={15} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={16}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[{ type: "email", message: "E-mail inválido." }]}
          >
            <Input placeholder="exemplo@exercito.mil.br" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            name="status"
            label="Situação"
            rules={[{ required: true, message: "A situação é obrigatória." }]}
          >
            <Select>
              <Option value="ACTIVE">Ativo</Option>
              <Option value="INACTIVE">Inativo</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* ── Actions ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 8,
        }}
      >
        <Button onClick={onCancel}>Cancelar</Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loadingSubmit}
          style={{ background: "#1a5c2e", borderColor: "#1a5c2e" }}
        >
          {isEdit ? "Salvar alterações" : "Cadastrar"}
        </Button>
      </div>
    </Form>
  );
};
