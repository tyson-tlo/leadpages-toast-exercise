import { Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState(null);

  const handleOpen = (message, action = null) => {
    setMessage(message);
    setAction(action);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (action) {
      action();
    }
  };

  return (
    <SnackbarContext.Provider value={{ handleOpen }}>
      {children}
      <Snackbar
        open={isOpen}
        onClose={handleClose}
        message={message}
        action={action ? "OK" : null}
      />
    </SnackbarContext.Provider>
  );
};

export function useSnackbarContext() {
  return useContext(SnackbarContext);
}
