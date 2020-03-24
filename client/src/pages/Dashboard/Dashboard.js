import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Dashboard extends Component {
  // Setting our component's initial state
  state = {
    assignedTeachbacks: [],
    submittedTeachbacks: [],
    userID: this.props.match.params.userID
  };

  // When the component mounts, load all teachbacks and save them to this.state.teachbacks
  componentDidMount() {
    this.loadTeachbacks();
  }

  // Loads all teachbacks and sets them to this.state.teachbacks
  loadTeachbacks = () => {
    API.getUserTeachbacks(this.state.userID)
      .then(res => {
        this.sortTeachbacks(res.data);
      })
      .catch(err => console.log(err));
  };

  sortTeachbacks = teachbackArr => {
    const assignedTBs = [];
    const submittedTBs = [];
    for (let i = 0; i < teachbackArr.length; i++) {
      if (teachbackArr[i].reviewedBy === this.state.userID) {
        assignedTBs.push(teachbackArr[i]);
        // submittedTBs.push(teachbackArr[i]);
      } else if (teachbackArr[i].submittedBy === this.state.userID) {
        submittedTBs.push(teachbackArr[i]);
      }
    }
    this.setState({
      assignedTeachbacks: assignedTBs,
      submittedTeachbacks: submittedTBs
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Teachback To Review</h1>
            </Jumbotron>
            {this.state.assignedTeachbacks.length ? (
              <List>
                {this.state.assignedTeachbacks.map(teachback => {
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

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>My Teachbacks</h1>
            </Jumbotron>
            {this.state.submittedTeachbacks.length ? (
              <List>
                {this.state.submittedTeachbacks.map(teachback => {
                  return (
                    <ListItem key={teachback._id}>
                      <a href={`/view/${this.state.userID}/${teachback._id}`}>
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
