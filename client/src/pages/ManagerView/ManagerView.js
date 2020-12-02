import React, { Component } from "react";
import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

const jumbotronText = {
  fontFamily: "Montserrat",
  color: "rgb(50, 198, 230)",
  fontSize: "4rem",
  textAlign: "center",
  textDecoration: "underline",
};

const tbText = {
  fontFamily: "Montserrat",
  color: "rgb(0,0,0)",
  fontSize: "2rem",
};

const viewBtn = {
  backgroundColor: "rgb(50, 198, 230)",
  color: "rgb(255,255,255)",
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "1.75rem",
  position: "relative",
  top: "14px",
  right: "10px",
  height: "57px",
};

const flagBtn = {
  backgroundColor: "rgb(252, 130, 4)",
  color: "rgb(255,255,255)",
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "1.75rem",
  position: "relative",
  top: "14px",
  right: "10px",
  height: "57px",
};

const deleteBtn = {
  backgroundColor: "rgb(255,0,0)",
  color: "rgb(255,255,255)",
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "1.75rem",
  position: "relative",
  top: "14px",
  right: "10px",
  height: "57px",
};

class ManagerView extends Component {
  state = {
    teachbacks: [],
    finalOneonOnes: [],
    userID: this.props.match.params.userID,
  };

  componentDidMount() {
    this.loadAllFinalsInfo();
  }

  loadAllFinalsInfo = () => {
    // Make two calls to database to get all of teachback and Final One-on-One data for all users
    Promise.all([API.getTeachbacks(), API.getOneonOnes()])
      .then((res) => {
        this.setState({ teachbacks: res[0].data, finalOneonOnes: res[1].data });
      })
      .catch((err) => console.log(err));
  };

  deleteItem = (itemID, role) => {
    // If the item's role is listed as instructor run the deleteTeachback function or if it's any other role run the deleteOneonOne function 
    switch (role) {
      case "Instructor":
        API.deleteTeachback(itemID);
        break;
      case "TA":
      case "Tutor":
      case "LA":
      case "Grader":    
        API.deleteOneonOne(itemID);
        break;
      default:
        return;
    }
    window.location.reload();
  };

  viewItem = (userID, itemID, role) => {
    window.location.replace(
      `//secondlook-2u.herokuapp.com/view/${userID}/${itemID}/${role}`
    );
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 style={jumbotronText}>View All Teachbacks</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {this.state.teachbacks.length ? (
              <List>
                {this.state.teachbacks.map((teachback) => {
                  return (
                    <Row>
                      <Col size="xs-6" customStyles="">
                        <ListItem key={teachback._id}>
                          <strong style={tbText}>
                            {teachback.candidateName}
                          </strong>
                          <div style={tbText}>
                            {teachback.role} role for {teachback.programType}{" "}
                            program at {teachback.university} {teachback.reviewerResult === "N/A" ? "- REVIEW PENDING" : null}
                          </div>
                        </ListItem>
                      </Col>
                      <Col size="xs-6">
                        <Row>
                          <Col
                            size="xs-12"
                            customStyles="col-sm-6 col-md-4 col-md-push-3 col-lg-4 col-lg-push-5"
                          >
                            <button
                              style={
                                teachback.reviewerResult !== "N/A" &&
                                teachback.reviewerResult !==
                                  teachback.submitterResult
                                  ? flagBtn
                                  : viewBtn
                              }
                              type="button"
                              onClick={() =>
                                this.viewItem(
                                  this.state.userID,
                                  teachback._id,
                                  teachback.role
                                )
                              }
                            >
                              View Teachback
                            </button>
                          </Col>
                          <Col
                            size="xs-12"
                            customStyles="col-sm-6 col-md-4 col-md-push-3 col-lg-4 col-lg-push-4"
                          >
                            <button
                              style={deleteBtn}
                              type="button"
                              onClick={() =>
                                this.deleteItem(teachback._id, teachback.role)
                              }
                            >
                              Delete Teachback
                            </button>
                          </Col>
                        </Row>
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
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 style={jumbotronText}>View All Final One-on-Ones</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {this.state.finalOneonOnes.length ? (
              <List>
                {this.state.finalOneonOnes.map((OneonOne) => {
                  return (
                    <Row>
                      <Col size="xs-6" customStyles="">
                        <ListItem key={OneonOne._id}>
                          <strong style={tbText}>
                            {OneonOne.candidateName}
                          </strong>
                          <div style={tbText}>
                            {OneonOne.role} role for {OneonOne.programType}{" "}
                            program at {OneonOne.university} {OneonOne.reviewerResult === "N/A" ? "- REVIEW PENDING" : null}
                          </div>
                        </ListItem>
                      </Col>
                      <Col size="xs-6">
                        <Row>
                          <Col
                            size="xs-12"
                            customStyles="col-sm-6 col-md-4 col-md-push-3 col-lg-4 col-lg-push-5"
                          >
                            <button
                              style={
                                OneonOne.reviewerResult !== "N/A" &&
                                OneonOne.reviewerResult !==
                                OneonOne.submitterResult
                                  ? flagBtn
                                  : viewBtn
                              }
                              type="button"
                              onClick={() =>
                                this.viewItem(
                                  this.state.userID,
                                  OneonOne._id,
                                  OneonOne.role
                                )
                              }
                            >
                              View Final 1-on-1
                            </button>
                          </Col>
                          <Col
                            size="xs-12"
                            customStyles="col-sm-6 col-md-4 col-md-push-3 col-lg-4 col-lg-push-4"
                          >
                            <button
                              style={deleteBtn}
                              type="button"
                              onClick={() =>
                                this.deleteItem(OneonOne._id, OneonOne.role)
                              }
                            >
                              Delete Final 1-on-1
                            </button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                })}
              </List>
            ) : (
              <h3 style={tbText}>No Final One-on-Ones to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ManagerView;
