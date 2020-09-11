import React, { Component } from "react";
import { Modal } from "react-responsive-modal";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import "react-responsive-modal/styles.css";

const jumbotronText = {
  fontFamily: "Montserrat",
  color: "rgb(50, 198, 230)",
  fontSize: "4rem",
  textDecoration: "underline",
  textAlign: "center",
};

const removeBtn = {
  backgroundColor: "rgb(255,0,0)",
  marginTop: "2.7rem",
  marginBottom: "2.7rem",
  marginLeft: "17rem",
  width: "100%",
};

const modalText = {
  fontFamily: "Montserrat",
  textAlign: "center",
  fontSize: "2.75rem",
  padding: "3.2rem",
};

class ResultsPage extends Component {
  // Setting our component's initial state
  state = {
    data: [],
    candidateName: "",
    role: this.props.match.params.role,
    university: "",
    programType: "",
    submittedBy: "",
    reviewedBy: "",
    zoomLink: "",
    cohortStartDate: "",
    submitterScores: [],
    submitterResult: "",
    reviewerScores: [],
    reviewerResult: "",
    reviewerRationale: "",
    reviewerRecommendations: "",
    eqDuration: "",
    notesIncluded: [],
    isVisible: "",
    open: false,
  };

  // When the component mounts, load all teachbacks and save them to this.state.teachbacks
  componentDidMount() {
    this.loadSingleItem();
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

  removeItem = (event) => {
    event.preventDefault();
    this.onOpenModal();
    if (this.state.role === "Instructor") {
      API.updateTeachback(this.props.match.params.itemID, {
        isVisible: "False",
      })
        .then((res) => res.send("Teachback Removed"))
        .catch((err) => console.log(err));
    } else if (this.state.role === "TA") {
      API.updateTAFinal(this.props.match.params.itemID, {
        isVisible: "False",
      })
        .then((res) => res.send("TA Final Removed"))
        .catch((err) => console.log(err));
    }
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
          <h2>This item has been successfully removed.</h2>
        </Modal>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1 style={jumbotronText}>
                {this.state.role === "Instructor" ? "Teachback" : "TA Final"}{" "}
                Profile
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
          <Col size="md-6">
            <Jumbotron>
              <h1 style={jumbotronText}>Reviewer's Scores</h1>
            </Jumbotron>
            <form>
              <Row>
                <Col size="md-4">
                  <label>
                    Positivity
                    <Input
                      value={this.state.reviewerScores[0]}
                      name="Positivity"
                      placeholder="N/A"
                    />
                  </label>
                </Col>
                <Col size="md-4">
                  <label>
                    Investment
                    <Input
                      value={this.state.reviewerScores[1]}
                      name="Investment"
                      placeholder="N/A"
                    />
                  </label>
                </Col>
                <Col size="md-4">
                  <label>
                    {this.state.role === "Instructor" ? "Pace" : "Guidance"}
                    <Input
                      value={this.state.reviewerScores[2]}
                      name={
                        this.state.role === "Instructor" ? "Pace" : "Guidance"
                      }
                      placeholder="N/A"
                    />
                  </label>
                </Col>
              </Row>
              <Row>
                <Col size="md-4">
                  <label>
                    Clarity
                    <Input
                      value={this.state.reviewerScores[3]}
                      name="Clarity"
                      placeholder="N/A"
                    />
                  </label>
                </Col>
                <Col size="md-4">
                  <label>
                    Knowledge
                    <Input
                      value={this.state.reviewerScores[4]}
                      name="Knowledge"
                      placeholder="N/A"
                    />
                  </label>
                </Col>
                <Col size="md-4">
                  <label>
                    Responses
                    <Input
                      value={this.state.reviewerScores[5]}
                      name="Responses"
                      placeholder="N/A"
                    />
                  </label>
                </Col>
              </Row>
              <Row>
                {this.state.role === "Instructor" ? (
                  <div>
                    <Col size="md-4">
                      <label>
                        Industry Knowledge
                        <Input
                          value={this.state.reviewerScores[6]}
                          name="Industry Knowledge"
                          placeholder="N/A"
                        />
                      </label>
                    </Col>
                    <Col size="md-4">
                      <label>
                        Coachability
                        <Input
                          value={this.state.reviewerScores[7]}
                          name="Coachability"
                          placeholder="N/A"
                        />
                      </label>
                    </Col>{" "}
                  </div>
                ) : (
                  <Col size="md-4">
                    <label>
                      Coachability
                      <Input
                        value={this.state.reviewerScores[6]}
                        name="Coachability"
                        placeholder="N/A"
                      />
                    </label>
                  </Col>
                )}
                <Col size="md-4">
                  <label>
                    Final Result
                    <Input
                      value={this.state.reviewerResult}
                      name="finalResult"
                      placeholder="N/A"
                    />
                  </label>
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
                    ></textarea>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col size="md-12">
                  <div className="form-group" style={{ margin: "2rem 0rem" }}>
                    <label>
                      How do you think the interviewers could improve?
                      (optional)
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      name="reviewerRecommendations"
                      value={this.state.reviewerRecommendations}
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
                    value={this.state.eqDuration}
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
                      style={{ marginLeft: "3rem" }}
                      checked={
                        this.state.notesIncluded.includes("hasSummary")
                          ? "checked"
                          : ""
                      }
                    ></input>
                    <label for="summary" style={{ marginLeft: "1rem" }}>
                      --> A detailed, public-facing summary, 2-3 sentences long
                    </label>
                    <br></br>
                    <input
                      type="checkbox"
                      id="bullets"
                      name="bullets"
                      value="hasBullets"
                      style={{ marginLeft: "3rem" }}
                      checked={
                        this.state.notesIncluded.includes("hasBullets")
                          ? "checked"
                          : ""
                      }
                    ></input>
                    <label for="bullets" style={{ marginLeft: "1rem" }}>
                      --> Bullet-style notes included under each heading
                    </label>
                    <br></br>
                    <input
                      type="checkbox"
                      id="notes"
                      name="notes"
                      value="hasNotes"
                      style={{ marginLeft: "3rem" }}
                      checked={
                        this.state.notesIncluded.includes("hasNotes")
                          ? "checked"
                          : ""
                      }
                    ></input>
                    <label for="notes" style={{ marginLeft: "1rem" }}>
                      --> Descriptive, well-formatted and grammatically correct
                      notes
                    </label>
                    <br></br>
                  </form>
                </Col>
              </Row>
              <Row>
                <Col size="md-6">
                  {/* Submit button */}
                  <FormBtn
                    onClick={(event) => this.removeItem(event)}
                    customStyles={removeBtn}
                  >
                    Remove This Item
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

export default ResultsPage;
