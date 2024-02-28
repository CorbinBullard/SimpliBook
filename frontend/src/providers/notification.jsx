import React, { createContext, useContext } from "react";
import { notification } from "antd";

// Create Context
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotification = () => useContext(NotificationContext);

// Provider Component
export const NotificationProvider = ({ children }) => {
  const openNotification = ({ message, description, type, }) => {
    notification[type]({
      message,
      description,
    });
  };

  return (
    <NotificationContext.Provider value={openNotification}>
      {children}
    </NotificationContext.Provider>
  );
};
