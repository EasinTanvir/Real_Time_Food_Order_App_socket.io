import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <header style={{ marginBottom: "7rem" }}>
        <Navbar />
      </header>
      <main>
        <Container>{children}</Container>
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
