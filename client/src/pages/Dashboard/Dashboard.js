import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

const jumbotronText = {
  fontFamily: "Montserrat",
  color: "rgb(50, 198, 230)",
  fontSize: "4rem",
  textAlign: "center",
  textDecoration: "underline",
};

const completedBtn = {
  backgroundColor: "rgb(50, 198, 230)",
  color: "rgb(255,255,255)",
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "1.75rem",
  height: "50%",
  marginTop: "25%",
  marginBottom: "25%",
};

const pendingBtn = {
  backgroundColor: "rgb(255,255,255)",
  color: "rgb(0,0,0)",
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "1.75rem",
  height: "50%",
  marginTop: "25%",
  marginBottom: "25%",
};

const tbHeader = {
  fontFamily: "Montserrat",
  color: "rgb(0,0,0)",
  fontSize: "2rem",
  textAlign: "center",
  fontWeight: 700,
};

const tbText = {
  fontFamily: "Montserrat",
  color: "rgb(0,0,0)",
  fontSize: "2rem",
  textAlign: "center",
};

class Dashboard extends Component {
  // Setting our component's initial state
  state = {
    assignedTeachbacks: [],
    submittedTeachbacks: [],
    userID: this.props.match.params.userID,
  };

  // When the component mounts, load all teachbacks and save them to this.state.teachbacks
  componentDidMount() {
    this.loadTeachbacks();
  }

  // Loads all teachbacks and sets them to this.state.teachbacks
  loadTeachbacks = () => {
    API.getUserTeachbacks(this.state.userID)
      .then((res) => {
        this.sortTeachbacks(res.data);
      })
      .catch((err) => console.log(err));
  };

  sortTeachbacks = (teachbackArr) => {
    let assignedTBs = [];
    let submittedTBs = [];
    for (let i = 0; i < teachbackArr.length; i++) {
      if (
        teachbackArr[i].reviewedBy === this.state.userID &&
        teachbackArr[i].reviewerResult === "N/A"
      ) {
        assignedTBs.push(teachbackArr[i]);
      } else if (
        teachbackArr[i].submittedBy === this.state.userID &&
        teachbackArr[i].isVisible === "True"
      ) {
        submittedTBs.push(teachbackArr[i]);
      }
    }

    // reverse the array to ensure that more recently submitted TBs are listed first
    submittedTBs = submittedTBs.reverse();

    this.setState({
      assignedTeachbacks: assignedTBs,
      submittedTeachbacks: submittedTBs,
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
            {this.state.assignedTeachbacks.length ? (
              <List>
                {this.state.assignedTeachbacks.map((teachback) => {
                  return (
                    <Row>
                      <Col size="md-12">
                        <ListItem key={teachback._id}>
                          <a
                            href={`/review/${this.state.userID}/${teachback._id}`}
                          >
                            <div style={tbHeader}>
                              {teachback.candidateName}
                            </div>
                            <div style={tbText}>
                              {teachback.role} role for {teachback.programType}{" "}
                              program at {teachback.university}
                            </div>
                          </a>
                        </ListItem>
                      </Col>
                    </Row>
                  );
                })}
              </List>
            ) : (
              <div>
                <h3 style={tbText}>No Teachbacks to Display</h3>
              </div>
            )}
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1 style={jumbotronText}>My Teachbacks</h1>
            </Jumbotron>
            {this.state.submittedTeachbacks.length ? (
              <List>
                {this.state.submittedTeachbacks.map((teachback) => {
                  return (
                    <Row>
                      <Col size="md-9">
                        <ListItem key={teachback._id}>
                          <a
                            href={`/view/${this.state.userID}/${teachback._id}`}
                          >
                            <div style={tbHeader}>
                              {teachback.candidateName}
                            </div>
                            <div style={tbText}>
                              {teachback.role} role for {teachback.programType}{" "}
                              program at {teachback.university}
                            </div>
                          </a>
                        </ListItem>
                      </Col>
                      <Col size="md-3">
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

{
  /* <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1 style={jumbotronText}>Teachbacks To Review</h1>
            </Jumbotron>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1 style={jumbotronText}>My Teachbacks</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            {this.state.assignedTeachbacks.length ? (
              <List>
                {this.state.assignedTeachbacks.map((teachback) => {
                  return (
                    <Row>
                      <Col size="md-12">
                        <ListItem key={teachback._id}>
                          <a
                            href={`/review/${this.state.userID}/${teachback._id}`}
                          >
                            <div style={tbHeader}>
                              {teachback.candidateName}
                            </div>
                            <div style={tbText}>
                              {teachback.role} role for {teachback.programType}{" "}
                              program at {teachback.university}
                            </div>
                          </a>
                        </ListItem>
                      </Col>
                    </Row>
                  );
                })}
              </List>
            ) : (
              <div>
                <h3 style={tbText}>No Teachbacks to Display</h3>
              </div>
            )}
          </Col>
          <Col size="md-6">
            {this.state.submittedTeachbacks.length ? (
              <List>
                {this.state.submittedTeachbacks.map((teachback) => {
                  return (
                    <Row>
                      <Col size="md-9">
                        <ListItem key={teachback._id}>
                          <a
                            href={`/view/${this.state.userID}/${teachback._id}`}
                          >
                            <div style={tbHeader}>
                              {teachback.candidateName}
                            </div>
                            <div style={tbText}>
                              {teachback.role} role for {teachback.programType}{" "}
                              program at {teachback.university}
                            </div>
                          </a>
                        </ListItem>
                      </Col>
                      <Col size="md-3">
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
      </Container> */
}
