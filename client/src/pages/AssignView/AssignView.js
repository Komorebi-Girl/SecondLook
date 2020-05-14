import React, { Component } from "react";
import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import AssignDropdown from "../../components/AssignDropdown/AssignDropdown";

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

class AssignView extends Component {
  state = {
    teachbacks: [],
    users: [],
  };

  componentDidMount() {
    this.loadAssignInfo();
  }

  loadAssignInfo = () => {
    Promise.all([API.getTeachbacks(), API.returnAllUsers()])
      .then((res) => {
        const noReviewerArr = [];
        const tbArr = res[0].data;

        for (let i = 0; i < tbArr.length; i++) {
          if (tbArr[i].reviewedBy === "N/A") {
            noReviewerArr.push(tbArr[i]);
          }
        }
        this.setState({ teachbacks: noReviewerArr, users: res[1].data });
      })
      .catch((err) => console.log(err));
  };

  assignReviewer = (event, tbID) => {
    API.updateTeachback(tbID, {
      reviewedBy: event.target.value,
    })
      .then((res) => res.status(200))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 style={jumbotronText}>Unassigned Teachbacks</h1>
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
                      <Col size="xs-5" customStyles="col-sm-8">
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
                      <Col
                        size="xs-2"
                        customStyles="col-sm-2 col-md-2 col-md-push-1 col-lg-2 col-lg-push-2"
                      >
                        <AssignDropdown
                          tbID={teachback._id}
                          users={this.state.users}
                          assignReviewer={this.assignReviewer}
                        />
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

export default AssignView;
