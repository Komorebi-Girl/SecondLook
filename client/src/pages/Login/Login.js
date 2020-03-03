import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";

class Login extends Component {
  // Setting our component's initial state
  state = {
    teachbacks: [],
    userId: ""
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Sign In</h1>
            </Jumbotron>
          </Col>

          <Col size="md-6 sm-12">
            <a href="/auth/google">Login with Google</a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
