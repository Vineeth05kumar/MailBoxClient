import { Navbar, Nav, Container,Button } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Header = () => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = ()=>{
    dispatch(authActions.logout());
  }
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">V-MAIL</Navbar.Brand>
          <Nav>
          {!loggedIn &&<Nav.Link href="/auth">Login</Nav.Link>}
          {loggedIn && <Nav.Link href="/welcome" >Welcome</Nav.Link>}
          </Nav>
        </Container>
        <Nav>{loggedIn && <Button onClick={logoutHandler}>Logout</Button>}</Nav>
      </Navbar>
    </>
  );
};

export default Header;
