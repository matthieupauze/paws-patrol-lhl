import { Container, Navbar, Nav } from "react-bootstrap";
const Header = () => {
  return (
    <header>
<Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
  <Container>
    <Navbar.Brand href="#home">Paw-Patrol</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link href="/">Track Pet</Nav.Link>
        <Nav.Link href="/devices">Manage Devices</Nav.Link>
        <Nav.Link href="/AddPerimeter">Add Perimeter</Nav.Link>
        <Nav.Link href="/account">Account</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
        <Nav.Link href="/login">Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  );
};

export default Header;