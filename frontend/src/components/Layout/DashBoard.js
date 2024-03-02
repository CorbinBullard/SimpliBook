import React, { useEffect, useState } from "react";
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { getItem, getItems } from "./UserMenuLayout";
import CalendarPage from "../../pages/CalendarPage";
import UserServices from "../../pages/ServicePage";

import { Layout, Menu, theme, Drawer, Button } from "antd";

const { Header, Content, Footer, Sider } = Layout;

export default function DashBoard({ session }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user } = session;

  useEffect(() => {
    if (session?.user === null) {
      navigate("/");
    }
  }, [session, navigate]);

  function handleNavigation(e) {
    if (e.key === "logout") {
      fetch("/api/session", {
        method: "DELETE",
      }).then(() => {
        navigate("/");
      });
      return;
    }
    navigate(e.key);
  }

  return (
    <Layout style={{ maxHeight: "100vh", minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[`${location.pathname.split("/")[2] || ""}`]}
          mode="inline"
          items={getItems(user)}
          onClick={(e) => handleNavigation(e)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            marginBottom: "1rem",
            background: colorBgContainer,
          }}
        />
        <Content style={{ margin: "0 16px", minWidth: "1150px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          SimpliBook ©{new Date().getFullYear()} Created by Corbin Bullard
        </Footer>
      </Layout>
    </Layout>
  );
}
