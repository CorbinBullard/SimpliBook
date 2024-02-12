import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Drawer } from "antd";
import CalendarPage from "./pages/CalendarPage";

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
  getItem("User", "1", <UserOutlined />, [getItem("My Account", "1")]),
  getItem("Calendar", "2", <CalendarOutlined />),
  getItem("Option 2", "3", <DesktopOutlined />),
  getItem("Files", "4", <FileOutlined />),
];

function App() {
  const [session, getSession] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px", minWidth: "1150px" }}>
          <Routes>
            <Route path="/" element={<CalendarPage />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
