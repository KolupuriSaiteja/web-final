import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/userReducer';
import { Cart } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
// import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavbarComponent() {
  const { session, cart } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          ShoeStyle
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {session?._id ? (
              <>
                <Nav.Link to="/cart" as={Link}>
                  <Cart />
                  {cart?.length > 0 && (
                    <Button className="btn-sm">{cart?.length}</Button>
                  )}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link to="/signup" as={Link}>
                Sign Up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
