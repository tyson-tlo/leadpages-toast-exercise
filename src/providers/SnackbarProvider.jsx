import React, { createContext, useContext, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { onMessage } from "../service/mockServer";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    onMessage((message) => {
      console.log(message);
      return handleOpen(message.data.email);
    });
  }, []);

  const handleOpen = (message) => {
    setMessage(message);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ handleOpen }}>
      {children}
      <Snackbar open={isOpen} onClose={handleClose} message={message} />
    </SnackbarContext.Provider>
  );
};

export function useSnackbarContext() {
  return useContext(SnackbarContext);
}
