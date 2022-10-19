import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { removeToken } from "../reducers/authReducer";
const Header = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch()
 
  const logout = ()=>{
    dispatch(removeToken())
    console.log("sdfdsf");
  }
  const loggedIn = () => {
    return (
      <Nav className="ms-md-auto flex-md-row flex-column ">
        <Link className="nav-link" to={"/signup"}>
          SignUp
        </Link>
        <Link className="nav-link" to={"/signin"}>
          SignIn
        </Link>
      </Nav>
    );
  };
  const NotloggedIn = () => {
    return (
      <Nav className="ms-md-auto flex-md-row flex-column ">
        <span className="nav-link" onClick={logout}>
          LogOut
        </span>
      </Nav>
    );
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="flex-md-row flex-column">
        <Navbar.Brand href="#home">Employee Management System</Navbar.Brand>
        {!token ? loggedIn() : NotloggedIn()}
      </Container>
    </Navbar>
  );
};

export default Header;
