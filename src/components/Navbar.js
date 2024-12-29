import React from "react";
import { Navbar, Container, Form, FormControl, Button } from "react-bootstrap";

const AppNavbar = ({ search, setSearch }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Product Catalog</Navbar.Brand>
        <Form className="d-flex ms-auto">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
