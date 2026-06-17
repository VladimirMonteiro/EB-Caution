import React, { useMemo } from "react";
import { Table, Button, Input, Typography, Radio, List, Spin } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import { useIsMobile } from "../../../hooks/useIsMobile";
import { MilitaryCard } from "./MilitaryCard";
import { buildMilitaryColumns } from "./ColumnsMilitaryList";
import type { MilitaryResponse } from "../../../services/MilitaryService/types";
import type { FilterSituation } from "../../../hooks/useMilitary";

const { Title, Text } = Typography;

// ─── Props ────────────────────────────────────────────────────────────────────

/**
 * All data and callbacks come from the parent (Military page) via useMilitary.
 * This component is purely presentational.
 */
interface MilitaresListProps {
  data: MilitaryResponse[];
  filteredData: MilitaryResponse[];
  loading: boolean;
  loadingDelete: string | null;
  search: string;
  setSearch: (v: string) => void;
  filter: FilterSituation;
  setFilter: (v: FilterSituation) => void;
  onNovo?: () => void;
  onEditar?: (m: MilitaryResponse) => void;
  onExcluir: (m: MilitaryResponse) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTER_OPTIONS: FilterSituation[] = ["Todos", "ACTIVE", "INACTIVE"];
const FILTER_LABELS: Record<FilterSituation, string> = {
  Todos: "Todos",
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const MilitaryList: React.FC<MilitaresListProps> = ({
  data,
  filteredData,
  loading,
  loadingDelete,
  search,
  setSearch,
  filter,
  setFilter,
  onNovo,
  onEditar,
  onExcluir,
}) => {
  const isMobile = useIsMobile();

  const columns = useMemo(
    () =>
      buildMilitaryColumns({
        loadingDelete,
        onEditar,
        onExcluir,
      }),
    [loadingDelete, onEditar, onExcluir],
  );

  return (
    <div
      style={{
        padding: isMobile ? "16px 12px" : "24px 32px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: isMobile ? 16 : 24,
          gap: 8,
        }}
      >
        <div>
          <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
            Militares
          </Title>
          <Text type="secondary" style={{ fontSize: isMobile ? 12 : 14 }}>
            {data.length} militares cadastrados
          </Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onNovo}
          style={{
            background: "#1a5c2e",
            borderColor: "#1a5c2e",
            borderRadius: 8,
            height: isMobile ? 36 : 40,
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          {!isMobile && "Novo Militar"}
        </Button>
      </div>

      {/* ── Filter panel ───────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: isMobile ? 12 : "16px 20px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "stretch" : "center",
            marginBottom: 16,
            gap: 12,
          }}
        >
          <Input
            placeholder="Buscar por nome, graduação, CIA, pelotão..."
            prefix={<SearchOutlined style={{ color: "#bbb" }} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            style={{
              borderRadius: 8,
              width: "100%",
              maxWidth: isMobile ? "100%" : 400,
            }}
          />

          <Radio.Group
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterSituation)}
            buttonStyle="outline"
            style={isMobile ? { display: "flex" } : undefined}
          >
            {FILTER_OPTIONS.map((val) => (
              <Radio.Button
                key={val}
                value={val}
                style={isMobile ? { flex: 1, textAlign: "center" } : undefined}
              >
                {FILTER_LABELS[val]}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>

        {/* ── Mobile → cards | Desktop → table ───────────────────────────── */}
        <Spin spinning={loading}>
          {isMobile ? (
            <>
              {!loading && filteredData.length === 0 ? (
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "24px 0",
                  }}
                >
                  Nenhum militar encontrado.
                </Text>
              ) : (
                <List
                  dataSource={filteredData}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      style={{ padding: 0, border: "none" }}
                    >
                      <MilitaryCard
                        military={item}
                        loadingDelete={loadingDelete}
                        onEditar={onEditar}
                        onExcluir={onExcluir}
                      />
                    </List.Item>
                  )}
                />
              )}
              <Text
                type="secondary"
                style={{
                  fontSize: 12,
                  display: "block",
                  textAlign: "right",
                  marginTop: 4,
                }}
              >
                {filteredData.length} de {data.length} militares
              </Text>
            </>
          ) : (
            <Table<MilitaryResponse>
              columns={columns}
              dataSource={filteredData}
              rowKey="id"
              loading={false}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total: ${total} militares`,
              }}
              locale={{ emptyText: "Nenhum militar encontrado." }}
              size="middle"
              scroll={{ x: 700 }}
            />
          )}
        </Spin>
      </div>
    </div>
  );
};
