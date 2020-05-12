import React, { Component } from "react";
import { render } from "react-dom";
import { Modal } from "react-responsive-modal";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Dropdown from "../../components/Form/Dropdown";
import "react-responsive-modal/styles.css";

const jumbotronText = {
  fontFamily: "Montserrat",
  color: "rgb(50, 198, 230)",
  fontSize: "4rem",
  textAlign: "center",
  textDecoration: "underline",
};

class Teachbacks extends Component {
  // Setting our component's initial state
  state = {
    candidateName: "",
    role: "",
    university: "",
    programType: "",
    submittedBy: this.props.match.params.userID,
    reviewedBy: "N/A",
    zoomLink: "",
    cohortStartDate: "",
    submitterScores: [],
    submitterResult: "",
    reviewerScores: ["N/A"],
    reviewerResult: "N/A",
    isVisible: "True",
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  /* This function will take the scores selected via the category dropdowns & populate them
   to the correct array based on who's doing the selecting: the submitter or reviewer */
  updateScores = (value, index) => {
    // If no one's been assigned to review the TB, save the scores to the submitter array
    var savedScores = [...this.state.submitterScores];
    savedScores[index] = value;
    this.setState({ submitterScores: savedScores });
  };

  updateFinalResult = (event) => {
    // Save the final result to submitterResult
    this.setState({
      value: event.target.value,
      submitterResult: event.target.value,
    });
  };

  /* When the form is submitted, use the API.saveTeachback method to save the teachback data
 Then reload teachbacks from the database */
  handleFormSubmit = (event) => {
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
        reviewerResult: this.state.reviewerResult,
        isVisible: this.state.isVisible,
      })
        .then((res) => res.status(200).send("Teachback Saved"))
        .catch((err) => console.log(err));
      this.onOpenModal();
    }
  };

  validateAllValues = (obj) => {
    // Grab all of the values saved to this.state in the form of an array
    const valuesArray = Object.values(obj);
    // Loop through the above array create a new array based on whether each value is true (truthy) or false (falsey)
    const booleanArray = valuesArray.map((val) =>
      val.length > 0 || val === false ? true : false
    );
    // Use "every" method to test if every property in this.state indeed has a value
    return booleanArray.every((bool) => bool === true);
  };

  render() {
    const { open } = this.state;
    return (
      <Container fluid>
        <Modal open={open} onClose={this.onCloseModal}>
          <h2>Simple centered modal</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
        </Modal>
        <Row>
          <Col size="md-6" customStyles="col-md-offset-3">
            <Jumbotron>
              <h1 style={jumbotronText}>Submit a Teachback!</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-6" customStyles="col-md-offset-3">
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
              <Row>
                <Col size="md-4">
                  <Dropdown
                    category="Positivity"
                    index={0}
                    updateScores={this.updateScores}
                  />
                </Col>
                <Col size="md-4">
                  <Dropdown
                    category="Investment"
                    index={1}
                    updateScores={this.updateScores}
                  />
                </Col>
                <Col size="md-4">
                  <Dropdown
                    category="Pace"
                    index={2}
                    updateScores={this.updateScores}
                  />
                </Col>
              </Row>
              <Row>
                <Col size="md-4">
                  <Dropdown
                    category="Clarity"
                    index={3}
                    updateScores={this.updateScores}
                  />
                </Col>
                <Col size="md-4">
                  <Dropdown
                    category="Knowledge"
                    index={4}
                    updateScores={this.updateScores}
                  />
                </Col>
                <Col size="md-4">
                  <Dropdown
                    category="Industry Knowledge"
                    index={6}
                    updateScores={this.updateScores}
                  />
                </Col>
              </Row>
              <Row>
                <Col size="md-4">
                  <Dropdown
                    category="Responses"
                    index={5}
                    updateScores={this.updateScores}
                  />
                </Col>
                <Col size="md-4">
                  <Dropdown
                    category="Coachability"
                    index={7}
                    updateScores={this.updateScores}
                  />
                </Col>
                <Col size="md-4">
                  <select onChange={this.updateFinalResult}>
                    <option selected value="default">
                      Select Final Result:
                    </option>
                    <option value="Weak">Weak</option>
                    <option value="Average">Average</option>
                    <option value="Strong">Strong</option>
                    <option value="Exemplary">Exemplary</option>
                  </select>
                </Col>
              </Row>
              <Row>
                <Col size="md-3" customStyles="col-md-offset-8">
                  <FormBtn
                    disabled={!this.validateAllValues(this.state)}
                    onClick={this.handleFormSubmit}
                  >
                    Submit Teachback
                  </FormBtn>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Teachbacks;
