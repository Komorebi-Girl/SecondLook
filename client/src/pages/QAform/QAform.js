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
  textDecoration: "underline"
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
    reviewerResult: ""
  };

  // When the component mounts, load all teachbacks and save them to this.state.teachbacks
  componentDidMount() {
    this.loadSingleTeachback();
  }

  // Loads all teachbacks and sets them to this.state.teachbacks
  loadSingleTeachback = () => {
    API.getTeachback(this.props.match.params.tbID)
      .then(res =>
        this.setState({
          teachbacks: res.data,
          candidateName: res.data.candidateName,
          role: res.data.role,
          university: res.data.university,
          programType: res.data.programType,
          zoomLink: res.data.zoomLink,
          submitterScores: res.data.submitterScores,
          submitterResult: res.data.submitterResult
        })
      )
      .catch(err => console.log(err));
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
  updateFinalResult = event => {
    this.setState({
      value: event.target.value,
      reviewerResult: event.target.value
    });
  };

  /* When the form is submitted, use the API.updateTeachback method to update the teachback data
   with reviewer's score Then reload teachbacks from the database */
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.validateAllValues(this.state)) {
      API.updateTeachback(this.props.match.params.tbID, {
        reviewerScores: this.state.reviewerScores,
        reviewerResult: this.state.reviewerResult
      })
        .then(res => res.send("Review Submitted"))
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
                    reviewedBy={this.state.reviewedBy}
                    isSubmitted={this.state.submittedBy}
                  />
                </Col>
                <Col size="md-4">
                  <Dropdown
                    category="Investment"
                    index={1}
                    updateScores={this.updateScores}
                    reviewedBy={this.state.reviewedBy}
                    isSubmitted={this.state.submittedBy}
                  />
                </Col>
                <Col size="md-4">
                  <Dropdown
                    category="Pace"
                    index={2}
                    updateScores={this.updateScores}
                    reviewedBy={this.state.reviewedBy}
                    isSubmitted={this.state.submittedBy}
                  />
                </Col>
              </Row>
              <Row>
                <Col size="md-4">
                  <Dropdown
                    category="Clarity"
                    index={3}
                    updateScores={this.updateScores}
                    reviewedBy={this.state.reviewedBy}
                    isSubmitted={this.state.submittedBy}
                  />
                </Col>
                <Col size="md-4">
                  <Dropdown
                    category="Knowledge"
                    index={4}
                    updateScores={this.updateScores}
                    reviewedBy={this.state.reviewedBy}
                    isSubmitted={this.state.submittedBy}
                  />
                </Col>
                <Col size="md-4">
                  <Dropdown
                    category="Industry Knowledge"
                    index={6}
                    updateScores={this.updateScores}
                    reviewedBy={this.state.reviewedBy}
                    isSubmitted={this.state.submittedBy}
                  />
                </Col>
              </Row>
              <Row>
                <Col size="md-4">
                  <Dropdown
                    category="Responses"
                    index={5}
                    updateScores={this.updateScores}
                    reviewedBy={this.state.reviewedBy}
                    isSubmitted={this.state.submittedBy}
                  />
                </Col>
                <Col size="md-4">
                  <Dropdown
                    category="Coachability"
                    index={7}
                    updateScores={this.updateScores}
                    reviewedBy={this.state.reviewedBy}
                    isSubmitted={this.state.submittedBy}
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
                <Col size="md-4" customStyles="col-md-offset-8">
                  {/* Submit button */}
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

export default QAform;
