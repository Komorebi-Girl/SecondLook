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
    taFinals: [],
    userID: this.props.match.params.userID,
  };

  componentDidMount() {
    this.loadAllFinalsInfo();
  }

  loadAllFinalsInfo = () => {
    // Make two calls to database to get all of teachback and TA final data for all users
    Promise.all([API.getTeachbacks(), API.getTAFinals()])
      .then((res) => {
        this.setState({ teachbacks: res[0].data, taFinals: res[1].data });
      })
      .catch((err) => console.log(err));
  };

  deleteItem = (itemID, role) => {
    if (role === "Instructor") {
      API.deleteTeachback(itemID);
    } else if (role === "TA") {
      API.deleteTAFinal(itemID);
    } else {
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
                            program at {teachback.university}
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
                              style={viewBtn}
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
              <h1 style={jumbotronText}>View All TA Finals</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {this.state.taFinals.length ? (
              <List>
                {this.state.taFinals.map((taFinal) => {
                  return (
                    <Row>
                      <Col size="xs-6" customStyles="">
                        <ListItem key={taFinal._id}>
                          <strong style={tbText}>
                            {taFinal.candidateName}
                          </strong>
                          <div style={tbText}>
                            {taFinal.role} role for {taFinal.programType}{" "}
                            program at {taFinal.university}
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
                              style={viewBtn}
                              type="button"
                              onClick={() =>
                                this.viewItem(
                                  this.state.userID,
                                  taFinal._id,
                                  taFinal.role
                                )
                              }
                            >
                              View TA Final
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
                                this.deleteItem(taFinal._id, taFinal.role)
                              }
                            >
                              Delete TA Final
                            </button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                })}
              </List>
            ) : (
              <h3 style={tbText}>No TA Finals to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ManagerView;
