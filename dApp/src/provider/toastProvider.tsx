import React, { createContext, useContext, useState } from "react";
import Toast, { AlertType } from "../components/toast";

interface ToastContextProps {
  showToast: (message: string, variant?: AlertType) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});

export const useToastContext = (): ToastContextProps => {
  const toastContext = useContext<ToastContextProps>(ToastContext);
  if (!toastContext) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return toastContext;
};

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toastProps, setToastProps] = useState<{
    message: string;
    variant: AlertType;
  }>({
    message: "",
    variant: "warning",
  });
  const showToast = (message: string, variant?: AlertType) => {
    setToastProps({ message, variant: variant || "warning" });
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={toastProps.message} variant={toastProps.variant} />
    </ToastContext.Provider>
  );
}
