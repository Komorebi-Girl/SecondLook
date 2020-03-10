import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Dashboard extends Component {
  // Setting our component's initial state
  state = {
    teachbacks: [],
    userID: this.props.match.params.userID
  };

  // When the component mounts, load all teachbacks and save them to this.state.teachbacks
  componentDidMount() {
    this.loadTeachbacks();
  }

  // Loads all teachbacks and sets them to this.state.teachbacks
  loadTeachbacks = () => {
    API.getTeachbacks(this.state.userID)
      .then(res =>
        this.setState({
          teachbacks: res.data,
          value: "finalResult",
          candidateName: "",
          role: "",
          university: "",
          programType: "",
          submittedBy: "",
          zoomLink: "",
          cohortStartDate: "",
          submitterScores: [],
          submitterResult: ""
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Teachback To Review</h1>
            </Jumbotron>
          </Col>

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>My Teachbacks</h1>
              <a href={`/submit/${this.state.userID}`} className="navbar-brand">
                Submit A Teachback
              </a>
            </Jumbotron>
            {this.state.teachbacks.length ? (
              <List>
                {this.state.teachbacks.map(teachback => {
                  return (
                    <ListItem key={teachback._id}>
                      <a href={`/review/${this.state.userID}/${teachback._id}`}>
                        <strong>
                          {teachback.candidateName} ~ {teachback.role} role for{" "}
                          {teachback.programType} program at{" "}
                          {teachback.university}
                        </strong>
                      </a>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Teachbacks to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
