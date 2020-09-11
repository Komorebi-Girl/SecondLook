import React, { Component } from "react";
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

const submitBtn = {
  marginTop: "2.7rem",
  marginBottom: "2.7rem",
  width: "100%",
};

const modalText = {
  fontFamily: "Montserrat",
  textAlign: "center",
  fontSize: "2.75rem",
  padding: "3.2rem",
};

class QAform extends Component {
  // Setting our component's initial state
  state = {
    candidateName: "",
    role: this.props.match.params.role,
    university: "",
    programType: "",
    zoomLink: "",
    submitterScores: [],
    submitterResult: "",
    reviewerScores: [],
    reviewerResult: "",
    reviewerRationale: "",
    reviewerRecommendations: "",
    eqDuration: "35",
    notesIncluded: [],
    open: false,
  };

  // When the component mounts, load all teachbacks and save them to this.state.teachbacks
  componentDidMount() {
    this.loadSingleItem();
    console.log("success mounting comp", this.state.role);
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
    window.location.replace(
      `//secondlook-2u.herokuapp.com/dashboard/${this.props.match.params.userID}`
    );
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Loads either a TA Final or Teachback profile object based on the value of role
  loadSingleItem = () => {
    if (this.state.role === "Instructor") {
      API.getTeachback(this.props.match.params.itemID)
        .then((res) =>
          this.setState({
            data: res.data,
            candidateName: res.data.candidateName,
            role: res.data.role,
            university: res.data.university,
            programType: res.data.programType,
            submittedBy: res.data.submittedBy,
            zoomLink: res.data.zoomLink,
            cohortStartDate: res.data.cohortStartDate,
            submitterScores: res.data.submitterScores,
            submitterResult: res.data.submitterResult,
            reviewerScores: res.data.reviewerScores,
            reviewerResult: res.data.reviewerResult,
            reviewerRationale: res.data.reviewerRationale,
            reviewerRecommendations: res.data.reviewerRecommendations,
            eqDuration: res.data.eqDuration,
            notesIncluded: res.data.notesIncluded,
            isVisible: res.data.isVisible,
          })
        )
        .catch((err) => console.log(err));
    } else if (this.state.role === "TA") {
      console.log("success grabbing TA Final", this.props.match.params.itemID);
      API.getTAFinal(this.props.match.params.itemID)
        .then((res) =>
          this.setState({
            data: res.data,
            candidateName: res.data.candidateName,
            role: res.data.role,
            university: res.data.university,
            programType: res.data.programType,
            submittedBy: res.data.submittedBy,
            zoomLink: res.data.zoomLink,
            cohortStartDate: res.data.cohortStartDate,
            submitterScores: res.data.submitterScores,
            submitterResult: res.data.submitterResult,
            reviewerScores: res.data.reviewerScores,
            reviewerResult: res.data.reviewerResult,
            reviewerRationale: res.data.reviewerRationale,
            reviewerRecommendations: res.data.reviewerRecommendations,
            eqDuration: res.data.eqDuration,
            notesIncluded: res.data.notesIncluded,
            isVisible: res.data.isVisible,
          })
        )
        .catch((err) => console.log(err));
    }
  };

  /* This function will take the scores selected via the category dropdowns & populate them
     the reviewer's score array */
  updateScores = (value, index) => {
    let savedScores = [...this.state.reviewerScores];
    savedScores[index] = value;
    this.setState({ reviewerScores: savedScores });
  };

  handleCheckboxInput = (value) => {
    let notesArray = [...this.state.notesIncluded];
    let valIndex = notesArray.indexOf(value);
    if (valIndex !== -1) {
      delete notesArray[valIndex];
    } else {
      notesArray.push(value);
    }
    let newNotesArray = notesArray.filter(
      (arrItem) => Boolean(arrItem) === true
    );
    this.setState({ notesIncluded: newNotesArray });
  };

  /* When the form is submitted, use the API.updateTeachback method to update the teachback data
   with reviewer's score Then reload teachbacks from the database */
  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.validateAllValues(this.state)) {
      this.onOpenModal();
      if (this.state.role === "Instructor") {
        API.updateTeachback(this.props.match.params.itemID, {
          reviewerScores: this.state.reviewerScores,
          reviewerResult: this.state.reviewerResult,
          reviewerRationale: this.state.reviewerRationale,
          reviewerRecommendations: this.state.reviewerRecommendations,
          eqDuration: this.state.eqDuration,
          notesIncluded: this.state.notesIncluded,
        })
          .then((res) => res.send("Review Submitted"))
          .catch((err) => console.log(err));
      } else if (this.state.role === "TA") {
        API.updateTAFinal(this.props.match.params.itemID, {
          reviewerScores: this.state.reviewerScores,
          reviewerResult: this.state.reviewerResult,
          reviewerRationale: this.state.reviewerRationale,
          reviewerRecommendations: this.state.reviewerRecommendations,
          eqDuration: this.state.eqDuration,
          notesIncluded: this.state.notesIncluded,
        })
          .then((res) => res.send("Review Submitted"))
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
      <Container fluid customStyles={{ fontFamily: "Montserrat" }}>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          styles={{ modal: modalText }}
        >
          <h2>Your review has been successfully submitted!</h2>
        </Modal>
        <Row>
          <Col size="md-4" customStyles="col-lg-6">
            <Jumbotron>
              <h1 style={jumbotronText}>
                {this.state.role === "Instructor" ? "Teachback" : "TA Final"}{" "}
                Info
              </h1>
            </Jumbotron>
            <form>
              {/* Input boxes for the data that must be filled-in*/}
              <Input
                value={this.state.candidateName}
                name="candidateName"
                placeholder="Candidate Name (required)"
              />
              <Input
                value={this.state.role}
                name="role"
                placeholder="Role (required)"
              />
              <Input
                value={this.state.university}
                name="university"
                placeholder="University (required)"
              />
              <Input
                value={this.state.programType}
                name="programType"
                placeholder="Program Type (required)"
              />
              <Input
                value={this.state.zoomLink}
                name="zoomLink"
                placeholder="Zoom Link (required)"
                onClick={() =>
                  window.open(`//${this.state.zoomLink}`, "_blank")
                }
              />
            </form>
          </Col>
          <Col size="md-8" customStyles="col-lg-6">
            <Jumbotron>
              <h1 style={jumbotronText}>Submit Your Scores</h1>
            </Jumbotron>
            <form>
              {/* Dropboxes for the data that must be selected */}
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
                    category={
                      this.state.role === "Instructor" ? "Pace" : "Guidance"
                    }
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
                  {/* Stand-alone dropbox to select final result*/}
                  <select
                    name="reviewerResult"
                    onChange={this.handleInputChange}
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
                <Col size="md-12">
                  <div className="form-group" style={{ margin: "2rem 0rem" }}>
                    <label>
                      Please write 2-4 sentences that explain the reasoning
                      behind your decision.
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      name="reviewerRationale"
                      value={this.state.reviewerRationale}
                      onChange={this.handleInputChange}
                    ></textarea>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col size="md-12">
                  <div className="form-group" style={{ margin: "2rem 0rem" }}>
                    <label>
                      How do you think the interviewer(s) could improve? (if
                      none, type "N/A")
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      name="reviewerRecommendations"
                      value={this.state.reviewerRecommendations}
                      onChange={this.handleInputChange}
                    ></textarea>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col size="md-12">
                  <label for="eq">
                    When was the EQ completed? (in mins after the recording
                    began):
                  </label>
                  <select
                    id="eq"
                    name="eqDuration"
                    onChange={this.handleInputChange}
                  >
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                  </select>
                </Col>
              </Row>
              <Row
                customStyles={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}
              >
                <Col size="md-12">
                  <label>
                    Did the interviewers' notes include the following?
                  </label>
                  <br></br>
                  <form>
                    <input
                      type="checkbox"
                      id="summary"
                      name="summary"
                      value="hasSummary"
                      onClick={() => this.handleCheckboxInput("hasSummary")}
                      style={{ marginLeft: "3rem" }}
                    ></input>
                    <label
                      for="summary"
                      style={{ marginLeft: "1rem", display: "inline" }}
                    >
                      --> A detailed, public-facing summary, 2-3 sentences long
                    </label>
                    <br></br>
                    <input
                      type="checkbox"
                      id="bullets"
                      name="bullets"
                      value="hasBullets"
                      onClick={() => this.handleCheckboxInput("hasBullets")}
                      style={{ marginLeft: "3rem" }}
                    ></input>
                    <label
                      for="bullets"
                      style={{ marginLeft: "1rem", display: "inline" }}
                    >
                      --> Bullet-style notes included under each heading
                    </label>
                    <br></br>
                    <input
                      type="checkbox"
                      id="notes"
                      name="notes"
                      value="hasNotes"
                      onClick={() => this.handleCheckboxInput("hasNotes")}
                      style={{ marginLeft: "3rem" }}
                    ></input>
                    <label
                      for="notes"
                      style={{ marginLeft: "1rem", display: "inline" }}
                    >
                      --> Descriptive, well-formatted and grammatically correct
                      notes
                    </label>
                    <br></br>
                  </form>
                </Col>
              </Row>
              <Row>
                <Col size="sm-10" customStyles="col-xs-12 col-sm-push-1">
                  {/* Submit button */}
                  <FormBtn
                    disabled={!this.validateAllValues(this.state)}
                    onClick={this.handleFormSubmit}
                    customStyles={submitBtn}
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

export default QAform;
