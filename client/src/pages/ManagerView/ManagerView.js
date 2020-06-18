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
  top: "24px",
  right: "10px",
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
    userID: this.props.match.params.userID,
  };

  componentDidMount() {
    this.loadTeachbackInfo();
  }

  loadTeachbackInfo = () => {
    API.getTeachbacks()
      .then((res) => {
        this.setState({ teachbacks: res.data });
      })
      .catch((err) => console.log(err));
  };

  deleteTeachback = (id) => {
    API.deleteTeachback(id);
    window.location.reload();
  };

  viewTeachback = (userID, tbID) => {
    window.location.replace(
      `//secondlook-2u.herokuapp.com/view/${userID}/${tbID}`
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
                                this.viewTeachback(
                                  this.state.userID,
                                  teachback._id
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
                                this.deleteTeachback(teachback._id)
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
      </Container>
    );
  }
}

export default ManagerView;
