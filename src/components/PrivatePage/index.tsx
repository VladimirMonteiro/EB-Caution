import { Outlet } from "react-router-dom";
import { Spin, Result, Button } from "antd";
import { useAuth } from "../../hooks/useAuth";

export function PrivatePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0f0a",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #0a0f0a, #1a2b1a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d9fdd3",
          textAlign: "center",
          padding: 20,
        }}
      >
        <div>
          {/* 💀 Caveira */}
          <div style={{ fontSize: 80, marginBottom: 20 }}>☠️</div>

          <Result
            status="403"
            title={
              <span style={{ color: "#a4ff8a", letterSpacing: 2 }}>
                ACESSO NEGADO
              </span>
            }
            subTitle={
              <span style={{ color: "#c7f9cc" }}>
                Você não tem autorização para acessar esta área.
              </span>
            }
            extra={
              <Button
                type="primary"
                size="large"
                style={{
                  background: "#2e7d32",
                  borderColor: "#2e7d32",
                }}
                onClick={() => (window.location.href = "/")}
              >
                Retornar ao Login
              </Button>
            }
          />

          {/* Rodapé estilo militar */}
          <div style={{ marginTop: 20, opacity: 0.6, fontSize: 12 }}>
            Sistema de Cautelas • Acesso Restrito
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
