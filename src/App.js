import React from "react";
import Container from "@mui/material/Container";

import Header from "./Header";
import Content from "./Content";
import LikedFormSubmissionProvider from "./providers/LikedFormSubmissionProvider";

function App() {
  return (
    <>
      <LikedFormSubmissionProvider>
        <Header />
        <Container>
          <Content />
        </Container>
      </LikedFormSubmissionProvider>
    </>
  );
}

export default App;
