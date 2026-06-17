import { Button, Tag, Popconfirm, Card, Divider, Typography } from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import type { MilitaryCardProps } from "../../../services/MilitaryService/types";
import React from "react";

const { Text } = Typography;

export const MilitaryCard: React.FC<MilitaryCardProps> = React.memo(
  ({ military, loadingDelete, onEditar, onExcluir }) => (
    <Card
      size="small"
      style={{
        marginBottom: 12,
        borderRadius: 12,
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        border: "1px solid #f0f0f0",
        width: "100%",
      }}
      bodyStyle={{ padding: "14px 16px" }}
    >
      {/* Name + status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <Text strong style={{ fontSize: 15, flex: 1, marginRight: 8 }}>
          {military.warName}
        </Text>
        <Tag
          color={military.status === "ACTIVE" ? "success" : "default"}
          style={{ borderRadius: 20, fontWeight: 500, flexShrink: 0 }}
        >
          • {military.status}
        </Tag>
      </div>

      {/* Meta */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <IdcardOutlined style={{ color: "#aaa", fontSize: 12 }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {military.grad}
          </Text>
          <Divider type="vertical" style={{ margin: "0 2px" }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {military.cia}
          </Text>
        </div>
        <Text type="secondary" style={{ fontSize: 12 }}>
          CPF: {military.phone}
        </Text>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          size="small"
          icon={<EditOutlined />}
          onClick={() => onEditar?.(military)}
          style={{ flex: 1, borderRadius: 6 }}
          aria-label={`Editar ${military.warName}`}
        >
          Editar
        </Button>
        <Popconfirm
          title="Excluir militar"
          description={`Deseja realmente excluir ${military.warName}?`}
          onConfirm={() => onExcluir(military)}
          okText="Sim"
          cancelText="Não"
          okButtonProps={{ danger: true }}
        >
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            loading={loadingDelete === military.id}
            style={{ flex: 1, borderRadius: 6 }}
            aria-label={`Excluir ${military.warName}`}
          >
            Excluir
          </Button>
        </Popconfirm>
      </div>
    </Card>
  ),
);
