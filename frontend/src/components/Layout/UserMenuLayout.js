import {
  UserOutlined,
  CalendarOutlined,
  BarsOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";

export function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
export const getItems = (user) => {
  return [
    getItem("User", "user", <UserOutlined />, [
        getItem("My Account", "account"),
      getItem("Log Out", "logout"),
    ]),
    getItem("My Services", "services", <BarsOutlined />),
    getItem("My Availability", "schedule", <ScheduleOutlined />),
    getItem("Calendar", "", <CalendarOutlined />),
  ];
};
