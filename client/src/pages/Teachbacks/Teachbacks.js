import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Teachbacks extends Component {
  // Setting our component's initial state
  state = {
    teachbacks: [],
    value: "Select One",
    candidateName: "",
    role: "",
    university: "",
    programType: "",
    submittedBy: "",
    reviewedBy: "Nobody",
    zoomLink: "",
    cohortStartDate: "",
    submitterScores: [],
    submitterResult: "",
    reviewerScores: [],
    reviewerResult: "None"
  };

  // When the component mounts, load all teachbacks and save them to this.state.teachbacks
  componentDidMount() {
    this.loadTeachbacks();
  }

  // Loads all teachbacks and sets them to this.state.teachbacks
  loadTeachbacks = () => {
    API.getTeachbacks()
      .then(res =>
        this.setState({
          teachbacks: res.data,
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

  // Deletes a teachback from the database with a given id, then reloads teachbacks from the db
  deleteTeachback = id => {
    API.deleteTeachback(id)
      .then(res => this.loadTeachbacks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleDropdownChange = event => {
    if (
      event.target.name !== "finalResult" &&
      this.state.reviewedBy === "Nobody"
    ) {
      // Case 1: The value is selected from one of the category dropdowns and there's no reviewer
      var savedScores = [...this.state.submitterScores];
      savedScores.push(event.target.value);
      this.setState({ submitterScores: savedScores });
    } else if (
      event.target.name !== "finalResult" &&
      this.state.reviewedBy !== "Nobody"
    ) {
      // Case 2: The value is selected from one of the category dropdowns and there's a reviewer
      savedScores = [...this.state.reviewerScores];
      savedScores.push(event.target.value);
      this.setState({ reviewerScores: savedScores });
    } else if (
      event.target.name === "finalResult" &&
      this.state.reviewedBy === "Nobody"
    ) {
      // Case 3: The value is selected from the finalResult dropdown and there's no reviewer
      this.setState({ submitterResult: event.target.value });
    } else if (
      event.target.name === "finalResult" &&
      this.state.reviewedBy !== "Nobody"
    ) {
      // Case 4: The value is selected from the finalResult dropdown and there's a reviewer
      this.setState({ reviewerResult: event.target.value });
    }
  };

  // When the form is submitted, use the API.saveTeachback method to save the teachback data
  // Then reload teachbacks from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.validateAllValues(this.state)) {
      API.saveTeachback({
        candidateName: this.state.candidateName,
        role: this.state.role,
        university: this.state.university,
        programType: this.state.programType,
        submittedBy: this.state.submittedBy,
        zoomLink: this.state.zoomLink,
        cohortStartDate: this.state.cohortStartDate,
        submitterScores: this.state.submitterScores,
        submitterResult: this.state.submitterResult
      })
        .then(res => this.loadTeachbacks())
        .catch(err => console.log(err));
    }
  };

  validateAllValues = obj => {
    const valuesArray = Object.values(obj);
    const booleanArray = valuesArray.map(val => Boolean(val));
    booleanArray.every(bool => bool === true);
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Submit a Teachback!</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.candidateName}
                onChange={this.handleInputChange}
                name="candidateName"
                placeholder="Candidate Name (required)"
              />
              <Input
                value={this.state.role}
                onChange={this.handleInputChange}
                name="role"
                placeholder="Role (required)"
              />
              <Input
                value={this.state.university}
                onChange={this.handleInputChange}
                name="university"
                placeholder="University (required)"
              />
              <Input
                value={this.state.programType}
                onChange={this.handleInputChange}
                name="programType"
                placeholder="Program Type (required)"
              />
              <Input
                value={this.state.submittedBy}
                onChange={this.handleInputChange}
                name="submittedBy"
                placeholder="Submitted By (required)"
              />
              <Input
                value={this.state.zoomLink}
                onChange={this.handleInputChange}
                name="zoomLink"
                placeholder="Zoom Link (required)"
              />
              <Input
                value={this.state.cohortStartDate}
                onChange={this.handleInputChange}
                name="cohortStartDate"
                placeholder="Cohort Start Date (required)"
              />
              <select
                value={this.state.value}
                onChange={this.handleDropdownChange}
              >
                <option value="Select Positivity Score">
                  Select Positivity Score:
                </option>
                <option value={1}>Weak</option>
                <option value={2}>Average</option>
                <option value={3}>Strong</option>
                <option value={4}>Exemplary</option>
              </select>
              <select
                value={this.state.value}
                onChange={this.handleDropdownChange}
                name={"finalResult"}
              >
                <option value="Select One">Select one:</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
                <option value="Exemplary">Exemplary</option>
              </select>
              <FormBtn
                disabled={!this.validateAllValues(this.state)}
                onClick={this.handleFormSubmit}
              >
                Submit Teachback
              </FormBtn>
            </form>
          </Col>

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Teachbacks</h1>
            </Jumbotron>
            {this.state.teachbacks.length ? (
              <List>
                {this.state.teachbacks.map(teachback => {
                  return (
                    <ListItem key={teachback._id}>
                      <a href={"/teachbacks/" + teachback._id}>
                        <strong>
                          {teachback.candidateName} ~ {teachback.role} role for{" "}
                          {teachback.programType} program at{" "}
                          {teachback.university}
                        </strong>
                      </a>
                      <DeleteBtn
                        onClick={() => this.deleteTeachback(teachback._id)}
                      />
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

export default Teachbacks;
