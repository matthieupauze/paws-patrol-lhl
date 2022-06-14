import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
const Header = () => {
  return (
    <header>
      <Navbar className="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Paw-Patrol</Navbar.Brand>
        </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link >Track Pet</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/device">
              <Nav.Link>Manage Devices</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/addPerimeter">
              <Nav.Link>Add Perimeter</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/account">      
              <Nav.Link>Account</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
              <Nav.Link>Logout</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;