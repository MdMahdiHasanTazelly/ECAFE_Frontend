import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const showSuccess = (message) => {
    toast.success(message);
  };

  const showError = (message) => {
    toast.error(message);
  };

  const showInfo = (message) => {
    toast.info(message);
  };

  const showWarning = (message) => {
    toast.warn(message);
  };

  return (
    <NotificationContext.Provider
      value={{ showSuccess, showError, showInfo, showWarning }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
