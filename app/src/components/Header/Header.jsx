import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header({ logged, setLogged }) {
  return (
    <header>
      <Navbar className="nav-color " variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Paw-Patrol</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {logged && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/">
                  <Nav.Link>Track Pet</Nav.Link>
                </LinkContainer>
                {/* <LinkContainer to="/trips">
                  <Nav.Link>History</Nav.Link>
                </LinkContainer> */}
                <LinkContainer to="/device">
                  <Nav.Link>Devices</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/perimeter">
                  <Nav.Link>Perimeters</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/account">
                  <Nav.Link>Account</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link
                    onClick={() => {
                      document.cookie = 'logged=false';
                      setLogged(!logged);
                    }}
                  >
                    Logout
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          )}
          {!logged && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
