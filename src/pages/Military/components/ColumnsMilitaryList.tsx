import { Button, Tag, Space, Typography, Tooltip, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type {
  MilitaryResponse,
  Situation,
} from "../../../services/MilitaryService/types";

const { Text } = Typography;

// ─── Types ────────────────────────────────────────────────────────────────────

interface ColumnFactoryOptions {
  loadingDelete: string | null;
  onEditar?: (m: MilitaryResponse) => void;
  onExcluir: (m: MilitaryResponse) => void;
}

/**
 * buildMilitaryColumns
 *
 * Factory function — column definitions are plain config objects that cannot
 * close over React hooks, so action handlers must be injected here.
 * Call this inside a `useMemo` in the parent component.
 */
export function buildMilitaryColumns({
  loadingDelete,
  onEditar,
  onExcluir,
}: ColumnFactoryOptions): ColumnsType<MilitaryResponse> {
  return [
    {
      title: "IDENTIFICAÇÃO",
      dataIndex: "cia",
      key: "cia",
      width: 160,
      render: (val: string) => (
        <Text type="secondary" style={{ fontSize: 13 }}>
          {val}
        </Text>
      ),
    },
    {
      title: "GRADUAÇÃO",
      dataIndex: "grad",
      key: "grad",
      width: 160,
      sorter: (a, b) => a.grad.localeCompare(b.grad),
    },
    {
      title: "NOME DE GUERRA",
      dataIndex: "warName",
      key: "warName",
      sorter: (a, b) => a.warName.localeCompare(b.warName),
      render: (val: string) => <Text strong>{val}</Text>,
    },
    {
      title: "TELEFONE",
      dataIndex: "phone",
      key: "phone",
      width: 180,
      render: (val: string) => (
        <Text type="secondary" style={{ fontSize: 13 }}>
          {val}
        </Text>
      ),
    },
    {
      title: "SITUAÇÃO",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (val: Situation) => (
        <Tag
          color={val === "ACTIVE" ? "success" : "default"}
          style={{ borderRadius: 20, fontWeight: 500 }}
        >
          • {val === "ACTIVE" ? "Ativo" : "Inativo"}
        </Tag>
      ),
      filters: [
        { text: "Ativo", value: "ACTIVE" },
        { text: "Inativo", value: "INACTIVE" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "AÇÕES",
      key: "acoes",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Editar">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEditar?.(record)}
              aria-label={`Editar ${record.warName}`}
            />
          </Tooltip>
          <Popconfirm
            title="Excluir militar"
            description={`Deseja realmente excluir ${record.warName}?`}
            onConfirm={() => onExcluir(record)}
            okText="Sim"
            cancelText="Não"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Excluir">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                loading={loadingDelete === record.id}
                aria-label={`Excluir ${record.warName}`}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];
}
