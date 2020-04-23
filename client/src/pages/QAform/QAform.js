import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Dropdown from "../../components/Form/Dropdown";

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
  marginLeft: "17rem",
  width: "100%",
};

class QAform extends Component {
  // Setting our component's initial state
  state = {
    candidateName: "",
    role: "",
    university: "",
    programType: "",
    zoomLink: "",
    submitterScores: [],
    submitterResult: "",
    reviewerScores: [],
    reviewerResult: "",
  };

  // When the component mounts, load all teachbacks and save them to this.state.teachbacks
  componentDidMount() {
    this.loadSingleTeachback();
  }

  // Loads all teachbacks and sets them to this.state.teachbacks
  loadSingleTeachback = () => {
    API.getTeachback(this.props.match.params.tbID)
      .then((res) =>
        this.setState({
          teachbacks: res.data,
          candidateName: res.data.candidateName,
          role: res.data.role,
          university: res.data.university,
          programType: res.data.programType,
          zoomLink: res.data.zoomLink,
          submitterScores: res.data.submitterScores,
          submitterResult: res.data.submitterResult,
        })
      )
      .catch((err) => console.log(err));
  };

  /* This function will take the scores selected via the category dropdowns & populate them
     the reviewer's score array */
  updateScores = (value, index) => {
    let savedScores = [...this.state.reviewerScores];
    savedScores[index] = value;
    this.setState({ reviewerScores: savedScores });
  };

  /* This function will take the score from the final result dropdown & populate 
  the reviewer's final result field with that info*/
  updateFinalResult = (event) => {
    this.setState({
      value: event.target.value,
      reviewerResult: event.target.value,
    });
  };

  /* When the form is submitted, use the API.updateTeachback method to update the teachback data
   with reviewer's score Then reload teachbacks from the database */
  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.validateAllValues(this.state)) {
      API.updateTeachback(this.props.match.params.tbID, {
        reviewerScores: this.state.reviewerScores,
        reviewerResult: this.state.reviewerResult,
      })
        .then((res) => res.send("Review Submitted"))
        .catch((err) => console.log(err));
    }
  };

  validateAllValues = (obj) => {
    // Grab all of the values saved to this.state in the form of an array
    const valuesArray = Object.values(obj);
    // Loop through the above array create a new array based on whether each value is true (truthy) or false (falsey)
    const booleanArray = valuesArray.map((val) => Boolean(val));
    // Use "every" method to test if every property in this.state indeed has a value
    return booleanArray.every((bool) => bool === true);
  };

  render() {
    return (
      <Container fluid customStyles={{ fontFamily: "Montserrat" }}>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1 style={jumbotronText}>Teachback Profile</h1>
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
              />
            </form>
          </Col>
          <Col size="md-6">
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
                    category="Industry"
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
                  {/* Stand-alone dropbox to select final result*/}
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
                <Col size="md-12">
                  <div className="form-group" style={{ margin: "2rem 0rem" }}>
                    <label>
                      Please write 2-4 sentences that explain the reasoning
                      behind your decision.
                    </label>
                    <textarea className="form-control" rows="5"></textarea>
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
                    <textarea className="form-control" rows="5"></textarea>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col size="md-12">
                  <label for="eq">
                    When was the EQ completed? (in mins after the recording
                    began):
                  </label>
                  <select id="eq">
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
              <Row customStyles={{ marginTop: "2.5rem" }}>
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
