import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

const jumbotronText = {
  fontFamily: "Montserrat",
  color: "rgb(50, 198, 230)",
  fontSize: "4.5rem",
  textAlign: "center",
  textDecoration: "underline"
};

const completedBtn = {
  backgroundColor: "rgb(50, 198, 230)",
  color: "rgb(255,255,255)",
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "1.75rem"
};

const pendingBtn = {
  backgroundColor: "rgb(255,255,255)",
  color: "rgb(0,0,0)",
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "1.75rem"
};

const tbText = {
  fontFamily: "Montserrat",
  color: "rgb(0,0,0)",
  fontSize: "2.3rem",
  textAlign: "center"
};

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
      if (
        teachbackArr[i].reviewedBy === this.state.userID &&
        teachbackArr[i].reviewerResult === "N/A"
      ) {
        assignedTBs.push(teachbackArr[i]);
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
              <h1 style={jumbotronText}>Teachbacks To Review</h1>
            </Jumbotron>
            <Row>
              <Col size="md-12">
                {this.state.assignedTeachbacks.length ? (
                  <List>
                    {this.state.assignedTeachbacks.map(teachback => {
                      return (
                        <ListItem key={teachback._id}>
                          <a
                            href={`/review/${this.state.userID}/${teachback._id}`}
                          >
                            <strong style={tbText}>
                              [ {teachback.candidateName} ] {teachback.role}{" "}
                              role for {teachback.programType} program at{" "}
                              {teachback.university}
                            </strong>
                          </a>
                        </ListItem>
                      );
                    })}
                  </List>
                ) : (
                  <div>
                    <h3 style={tbText}>No Teachbacks to Display</h3>
                  </div>
                )}
              </Col>
            </Row>
          </Col>

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1 style={jumbotronText}>My Teachbacks</h1>
            </Jumbotron>
            {this.state.submittedTeachbacks.length ? (
              <List>
                {this.state.submittedTeachbacks.map(teachback => {
                  return (
                    <Row>
                      <Col size="md-9">
                        <ListItem key={teachback._id}>
                          <a
                            href={`/view/${this.state.userID}/${teachback._id}`}
                          >
                            <strong style={tbText}>
                              [ {teachback.candidateName} ] {teachback.role}{" "}
                              role for {teachback.programType} program at{" "}
                              {teachback.university}
                            </strong>
                          </a>
                        </ListItem>
                      </Col>
                      <Col size="md-2">
                        {teachback.reviewerResult === "N/A" ? (
                          <button style={pendingBtn} type="button">
                            Review Pending
                          </button>
                        ) : (
                          <button style={completedBtn} type="button">
                            Review Complete
                          </button>
                        )}
                      </Col>
                    </Row>
                  );
                })}
              </List>
            ) : (
              <h3 style={tbText}>No Teachbacks to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
