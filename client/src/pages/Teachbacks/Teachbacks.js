import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Dropdown from "../../components/Form/Dropdown";

class Teachbacks extends Component {
  // Setting our component's initial state
  state = {
    teachbacks: [],
    value: "finalResult",
    candidateName: "",
    role: "",
    university: "",
    programType: "",
    submittedBy: this.props.match.params.userID,
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
          value: "finalResult",
          candidateName: "",
          role: "",
          university: "",
          programType: "",
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

  /* This function will take the scores selected via the category dropdowns & populate them
   to the correct array based on who's doing the selecting: the submitter or reviewer */
  updateScores = (value, reviewedBy, index) => {
    // If no one's been assigned to review the TB, save the scores to the submitter array
    if (reviewedBy === "Nobody") {
      var savedScores = [...this.state.submitterScores];
      savedScores[index] = value;
      this.setState({ submitterScores: savedScores });
    } else {
      // If someone has been assigned, save the scores to the reviewer array
      savedScores = [...this.state.reviewerScores];
      savedScores[index] = value;
      this.setState({ reviewerScores: savedScores });
    }
  };

  updateFinalResult = event => {
    // If no one's been assigned to review the TB, save the final result to submitterResult
    if (this.state.reviewedBy === "Nobody") {
      this.setState({
        value: event.target.value,
        submitterResult: event.target.value
      });
    } else {
      // If someone has been assigned, save the final result to reviewerResult
      this.setState({ reviewerResult: event.target.value });
    }
  };

  /* When the form is submitted, use the API.saveTeachback method to save the teachback data
 Then reload teachbacks from the database */
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.validateAllValues(this.state)) {
      API.saveTeachback({
        candidateName: this.state.candidateName,
        role: this.state.role,
        university: this.state.university,
        programType: this.state.programType,
        reviewedBy: this.state.reviewedBy,
        submittedBy: this.state.submittedBy,
        zoomLink: this.state.zoomLink,
        cohortStartDate: this.state.cohortStartDate,
        submitterScores: this.state.submitterScores,
        reviewerScores: this.state.reviewerScores,
        submitterResult: this.state.submitterResult,
        reviewerResult: this.state.reviewerResult
      })
        .then(res => this.loadTeachbacks())
        .catch(err => console.log(err));
    }
  };

  validateAllValues = obj => {
    // Grab all of the values saved to this.state in the form of an array
    const valuesArray = Object.values(obj);
    // Loop through the above array create a new array based on whether each value is true (truthy) or false (falsey)
    const booleanArray = valuesArray.map(val => Boolean(val));
    // Use "every" method to test if every property in this.state indeed has a value
    return booleanArray.every(bool => bool === true);
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
              {/* Input boxes for the data that must be filled-in*/}
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
              {/* Dropboxes for the data that must be selected */}
              <Dropdown
                category="Positivity"
                index={0}
                updateScores={this.updateScores}
                reviewedBy={this.state.reviewedBy}
                isSubmitted={this.state.submittedBy}
              />
              <Dropdown
                category="Investment"
                index={1}
                updateScores={this.updateScores}
                reviewedBy={this.state.reviewedBy}
                isSubmitted={this.state.submittedBy}
              />
              <Dropdown
                category="Pace"
                index={2}
                updateScores={this.updateScores}
                reviewedBy={this.state.reviewedBy}
                isSubmitted={this.state.submittedBy}
              />
              <Dropdown
                category="Clarity"
                index={3}
                updateScores={this.updateScores}
                reviewedBy={this.state.reviewedBy}
                isSubmitted={this.state.submittedBy}
              />
              <Dropdown
                category="Knowledge"
                index={4}
                updateScores={this.updateScores}
                reviewedBy={this.state.reviewedBy}
                isSubmitted={this.state.submittedBy}
              />
              <Dropdown
                category="Responses"
                index={5}
                updateScores={this.updateScores}
                reviewedBy={this.state.reviewedBy}
                isSubmitted={this.state.submittedBy}
              />
              <Dropdown
                category="Industry Knowledge"
                index={6}
                updateScores={this.updateScores}
                reviewedBy={this.state.reviewedBy}
                isSubmitted={this.state.submittedBy}
              />
              <Dropdown
                category="Coachability"
                index={7}
                updateScores={this.updateScores}
                reviewedBy={this.state.reviewedBy}
                isSubmitted={this.state.submittedBy}
              />
              {/* Stand-alone dropbox to select final result*/}
              <select
                name={"finalResult"}
                value={this.state.value}
                onChange={this.updateFinalResult}
              >
                <option value="finalResult">Select Final Result:</option>
                <option value="Weak">Weak</option>
                <option value="Average">Average</option>
                <option value="Strong">Strong</option>
                <option value="Exemplary">Exemplary</option>
              </select>
              {/* Submit button */}
              <FormBtn
                disabled={!this.validateAllValues(this.state)}
                onClick={this.handleFormSubmit}
              >
                Submit Teachback
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Teachbacks;
