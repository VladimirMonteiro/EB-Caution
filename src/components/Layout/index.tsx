import {
  Layout as AntLayout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Grid,
  Drawer,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  ToolOutlined,
  SwapOutlined,
  UserAddOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const { Header, Sider, Content } = AntLayout;
const { useBreakpoint } = Grid;

export function Layout() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [collapsed, setCollapsed] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  // MENU LATERAL
  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Inicial",
      onClick: () => {
        navigate(`/dashboard/${user?.id}`);
        setOpenDrawer(false);
      },
    },
    {
      key: "/cautelas",
      icon: <FileTextOutlined />,
      label: "Cautelas",
      onClick: () => {
        navigate(`/cautelas/${user?.id}`);
        setOpenDrawer(false);
      },
    },
    {
      key: "/militares",
      icon: <TeamOutlined />,
      label: "Militares",
      onClick: () => {
        navigate(`/militares/${user?.id}`);
        setOpenDrawer(false);
      },
    },
    {
      key: "/materiais",
      icon: <ToolOutlined />,
      label: "Materiais",
      onClick: () => {
        navigate(`/materiais/${user?.id}`);
        setOpenDrawer(false);
      },
    },
    {
      key: "/passagem-funcao",
      icon: <SwapOutlined />,
      label: "Passagem de Função",
      onClick: () => {
        navigate(`/passagem-funcao/${user?.id}`);
        setOpenDrawer(false);
      },
    },
    {
      key: "/sub-armeiro",
      icon: <UserAddOutlined />,
      label: "Sub-armeiro",
      onClick: () => {
        navigate(`/sub-armeiro/${user?.id}`);
        setOpenDrawer(false);
      },
    },
  ];

  // MENU USUÁRIO
  const userMenu = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Sair",
        onClick: handleLogout,
      },
    ],
  };

  const sidebarMenu = (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      style={{
        border: "none",
        fontSize: 14,
        color: "#374151",
      }}
    />
  );

  return (
    <AntLayout style={{ minHeight: "100vh", background: "#f5f7f5" }}>
      {/* SIDEBAR DESKTOP */}
      {!isMobile && (
        <Sider
          width={220}
          collapsed={collapsed}
          trigger={null}
          style={{
            background: "#ffffff",
            borderRight: "1px solid #e5e7eb",
          }}
        >
          {/* LOGO */}
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              paddingLeft: collapsed ? 0 : 20,
              fontWeight: 600,
              fontSize: 15,
              color: "#2e7d32",
            }}
          >
            {collapsed ? "EB" : "Sistema EB"}
          </div>

          {sidebarMenu}
        </Sider>
      )}

      {/* MOBILE DRAWER */}
      {isMobile && (
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          width={220}
          styles={{ body: { padding: 0 } }}
        >
          {sidebarMenu}
        </Drawer>
      )}

      {/* MAIN */}
      <AntLayout>
        {/* HEADER */}
        <Header
          style={{
            background: "#ffffff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {/* ESQUERDA */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button
              type="text"
              icon={
                isMobile ? (
                  <MenuUnfoldOutlined />
                ) : collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={() =>
                isMobile
                  ? setOpenDrawer(true)
                  : setCollapsed(!collapsed)
              }
            />

            {!isMobile && (
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#374151",
                }}
              >
                Dashboard
              </span>
            )}
          </div>

          {/* DIREITA */}
          <Dropdown menu={userMenu} placement="bottomRight">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: "#2e7d32" }}
              />

              {!isMobile && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: 1.2,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#111827",
                    }}
                  >
                    {user?.warName || "Usuário"}
                  </span>

                  <span
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    {user?.grad}
                  </span>
                </div>
              )}
            </div>
          </Dropdown>
        </Header>

        {/* CONTENT */}
        <Content
          style={{
            margin: 16,
            padding: isMobile ? 12 : 20,
            background: "#ffffff",
            borderRadius: 10,
            minHeight: "calc(100vh - 90px)",
          }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
}