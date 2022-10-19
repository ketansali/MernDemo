import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AuthHomeSVG from "../images/undraw_working_remotely_re_6b3a.svg";
import SignUp from "../pages/SignUp";
import {useLocation,Outlet} from 'react-router-dom'
import SignIn from "../pages/SignIn";
const AuthHome = () => {
  const location = useLocation()
  return (
    <Container className="mt-5 ">
      <Row className="flex-md-row flex-column">
        <Col>
          <Outlet/>
          
        </Col>
        <Col>
          <img src={AuthHomeSVG} alt="" className="d-none d-md-block"  />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthHome;
