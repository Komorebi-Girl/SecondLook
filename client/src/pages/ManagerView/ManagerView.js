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
                      <Col size="md-3" customStyles="col-xs-4">
                        <button style={viewBtn} type="button">
                          <a
                            href={`/view/${this.state.userID}/${teachback._id}`}
                          >
                            View Teachback
                          </a>
                        </button>
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
