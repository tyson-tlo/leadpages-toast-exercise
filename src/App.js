import React, { useEffect } from "react";
import Container from "@mui/material/Container";

import Header from "./Header";
import Content from "./Content";
import LikedFormSubmissionProvider from "./providers/LikedFormSubmissionProvider";
import { onMessage } from "./service/mockServer";
import { SnackbarProvider } from "./providers/SnackbarProvider";

function App() {
  return (
    <SnackbarProvider>
      <LikedFormSubmissionProvider>
        <Header />
        <Container>
          <Content />
        </Container>
      </LikedFormSubmissionProvider>
    </SnackbarProvider>
  );
}

export default App;
