import React, { Component } from "react";
import { Modal } from "react-responsive-modal";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Dropdown from "../../components/Form/Dropdown";
import ParticipantDrop from "../../components/Form/ParticipantDrop";
import "react-responsive-modal/styles.css";

const jumbotronText = {
  fontFamily: "Montserrat",
  color: "rgb(50, 198, 230)",
  fontSize: "4rem",
  textAlign: "center",
  textDecoration: "underline",
};

const modalText = {
  fontFamily: "Montserrat",
  textAlign: "center",
  fontSize: "2.75rem",
  padding: "3.2rem",
};

class SubmitForm extends Component {
  // Setting our component's initial state
  state = {
    users: [],
    participantID: "",
    candidateName: "",
    role: this.props.match.params.role,
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

  componentDidMount() {
    this.loadParticipants();
  }

  loadParticipants = () => {
    API.returnAllUsers()
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => console.log(err));
  };

  assignParticipant = (event) => {
    this.setState({ participantID: event.target.value }, () =>
      this.assignReviewer()
    );
  };

  assignReviewer = () => {
    let leadID = this.state.submittedBy;
    let participantID = this.state.participantID;
    let users = this.state.users;

    // Create new array of userIDs minus leadID and participantID
    let possibleReviewers = users.filter((userObj) => {
      if (userObj._id !== leadID && userObj._id !== participantID) {
        return userObj;
      }
    });

    // Randomly choose an index
    let reviewerIndex = Math.floor(Math.random() * possibleReviewers.length);

    // Set state of reviewedBy to value of that random index
    this.setState({ reviewedBy: possibleReviewers[reviewerIndex]._id }, () =>
      console.log("reviewedBy", this.state.reviewedBy)
    );
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
    window.location.reload();
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

  // When the form is submitted, use the API.saveTeachback or API.saveTAFinal method to save the data to the appropriate table
  handleFormSubmit = (event) => {
    if (this.validateAllValues(this.state)) {
      this.onOpenModal();
      if (this.state.role === "Instructor") {
        API.saveTeachback({
          candidateName: this.state.candidateName,
          role: this.state.role,
          university: this.state.university,
          programType: this.state.programType,
          reviewedBy: this.state.reviewedBy,
          submittedBy: this.state.submittedBy,
          zoomLink: this.state.zoomLink.slice(8), // need to cut off the "https://" for the link to work
          cohortStartDate: this.state.cohortStartDate,
          submitterScores: this.state.submitterScores,
          reviewerScores: this.state.reviewerScores,
          submitterResult: this.state.submitterResult,
          reviewerResult: this.state.reviewerResult,
          isVisible: this.state.isVisible,
        })
          .then((res) => {
            res.status(200).send("Teachback Saved");
          })
          .catch((err) => console.log(err));
      } else if (this.state.role === "TA") {
        API.saveTAFinal({
          candidateName: this.state.candidateName,
          role: this.state.role,
          university: this.state.university,
          programType: this.state.programType,
          reviewedBy: this.state.reviewedBy,
          submittedBy: this.state.submittedBy,
          zoomLink: this.state.zoomLink.slice(8), // need to cut off the "https://" for the link to work
          cohortStartDate: this.state.cohortStartDate,
          submitterScores: this.state.submitterScores,
          reviewerScores: this.state.reviewerScores,
          submitterResult: this.state.submitterResult,
          reviewerResult: this.state.reviewerResult,
          isVisible: this.state.isVisible,
        })
          .then((res) => {
            res.status(200).send("TA Final Saved");
          })
          .catch((err) => console.log(err));
      }
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
        <Modal
          open={open}
          onClose={this.onCloseModal}
          styles={{ modal: modalText }}
        >
          <h2>
            Your {this.state.role === "Instructor" ? "Teachback" : "TA Final"}{" "}
            has been successfully submitted!
          </h2>
        </Modal>
        <Row>
          <Col size="md-6" customStyles="col-md-offset-3">
            <Jumbotron>
              <h1 style={jumbotronText}>
                Submit a{" "}
                {this.state.role === "Instructor" ? "Teachback!" : "TA Final!"}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-6" customStyles="col-md-offset-3">
            {this.state.role === "Instructor" ? (
              <ParticipantDrop
                users={this.state.users}
                assignParticipant={this.assignParticipant}
              />
            ) : null}
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
                  {this.state.role === "Instructor" ? (
                    <Dropdown
                      category="Pace"
                      index={2}
                      updateScores={this.updateScores}
                    />
                  ) : (
                    <Dropdown
                      category="Guidance"
                      index={2}
                      updateScores={this.updateScores}
                    />
                  )}
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
                    category="Responses"
                    index={5}
                    updateScores={this.updateScores}
                  />
                </Col>
              </Row>
              <Row>
                {this.state.role === "Instructor" ? (
                  <div>
                    <Col size="md-4">
                      <Dropdown
                        category="Industry"
                        index={6}
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
                  </div>
                ) : (
                  <Col size="md-4">
                    <Dropdown
                      category="Coachability"
                      index={6}
                      updateScores={this.updateScores}
                    />
                  </Col>
                )}
                <Col size="md-4">
                  <select
                    onChange={this.updateFinalResult}
                    style={{ width: "100%" }}
                  >
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
                    customStyles={{ marginTop: "1.5rem" }}
                  >
                    Submit{" "}
                    {this.state.role === "Instructor"
                      ? "Teachback!"
                      : "TA Final"}
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

export default SubmitForm;
