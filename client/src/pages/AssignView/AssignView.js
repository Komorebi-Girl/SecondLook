import React, { Component } from "react";
import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Dropdown from "../../components/Form/Dropdown";
import AssignDropdown from "../../components/AssignDropdown/AssignDropdown";

class AssignView extends Component {
  state = {
    teachbacks: [],
    userID: this.props.match.params.userID
  };

  componentDidMount() {
    this.loadTeachbacks();
  }

  loadTeachbacks = () => {
    API.getTeachbacks()
      .then(res => this.setState({ teachbacks: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 style={{ textAlign: "center" }}>Unassigned Teachbacks</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10">
            {this.state.teachbacks.length ? (
              <List>
                {this.state.teachbacks.map(teachback => {
                  return (
                    <Row>
                      <Col size="md-10">
                        <ListItem key={teachback._id}>
                          <a
                            href={`/view/${this.state.userID}/${teachback._id}`}
                          >
                            <strong>
                              {teachback.candidateName} ~ {teachback.role} role
                              for {teachback.programType} program at{" "}
                              {teachback.university}
                            </strong>
                          </a>
                        </ListItem>
                      </Col>
                      <Col size="md-2">
                        <AssignDropdown tbID={teachback._id} />
                      </Col>
                    </Row>
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

export default AssignView;
