import { Navbar, Nav, Container,Button } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = ()=>{
    dispatch(authActions.logout());
    navigate('/auth');
  }
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/inbox">V-MAIL</Navbar.Brand>
          <Nav>
          {!loggedIn &&<Nav.Link href="/auth">Login</Nav.Link>}
          </Nav>
        </Container>
        <Nav>{loggedIn && <Button onClick={logoutHandler}>Logout</Button>}</Nav>
      </Navbar>
    </>
  );
};

export default Header;
