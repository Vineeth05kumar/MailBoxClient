import { Button, Row, Container, Col, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    setIsLogin(!isLogin);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // if(!isLogin && formData.password !== formData.confirmPassword){
    //     alert("Passwords do not match");
    //     return;
    // }
    let url = "";
    url = isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuD4FVkcQkWiLqbTPOrBqU6qwiF_ecFks"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuD4FVkcQkWiLqbTPOrBqU6qwiF_ecFks";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          returnSecureToken: true,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
      }
      const data = await response.json();
      dispatch(authActions.login({token:data.idToken,email:data.email}))
      console.log(data);
      setFormData({email:'',password:'',confirmPassword:''});
      navigate('/welcome');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={3}>
          <Card>
            <Card.Header>{isLogin ? "Login" : "SignUp"}</Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    onChange={inputHandler}
                    value={formData.email}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={inputHandler}
                    value={formData.password}
                  />
                </Form.Group>
                {/* <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={inputHandler}
                    value={formData.confirmPassword}
                  />
                </Form.Group> */}
                <Button type="submit">{isLogin ? "Login" : "SignUp"}</Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button onClick={handleLogin}>
                {isLogin ? "Create New Account" : "Login To Existing Account"}
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
