import React, { useEffect, useState } from "react";
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import CalendarPage from "../components/Calendar";
import UserServices from "../components/Services";
import {
  UserOutlined,
  CalendarOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Drawer } from "antd";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("User", "user", <UserOutlined />, []),
  getItem("My Services", "services", <BarsOutlined />),
  getItem("Calendar", "", <CalendarOutlined />),
];

export default function DashBoard({ session }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (session?.user === null) {
      console.log("NO SESSION");
      navigate("/");
    }
  }, [session, navigate]);

  function handleNavigation(e) {
    navigate(e.key);
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
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
          items={items}
          onClick={(e) => handleNavigation(e)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, marginBottom: "1rem", background: colorBgContainer }} />
        <Content style={{ margin: "0 16px", minWidth: "1150px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}