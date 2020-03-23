import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input } from "../../components/Form";

class TBprofile extends Component {
  // Setting our component's initial state
  state = {
    candidateName: "",
    role: "",
    university: "",
    programType: "",
    submittedBy: "",
    reviewedBy: "",
    zoomLink: "",
    cohortStartDate: "",
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
          submittedBy: res.data.submittedBy,
          zoomLink: res.data.zoomLink,
          cohortStartDate: res.data.cohortStartDate,
          submitterScores: res.data.submitterScores,
          reviewerScores: res.data.reviewerScores,
          submitterResult: res.data.submitterResult,
          reviewerResult: res.data.reviewerResult
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Basic Info</h1>
            </Jumbotron>
            <form>
              {/* Input boxes for the data that must be filled-in*/}
              <Input
                value={this.state.candidateName}
                name="candidateName"
                placeholder="No Candidate Name Found "
              />
              <Input
                value={this.state.role}
                name="role"
                placeholder="No Role Found"
              />
              <Input
                value={this.state.university}
                name="university"
                placeholder="No University Found)"
              />
              <Input
                value={this.state.programType}
                name="programType"
                placeholder="No Program Type Found"
              />
              <Input
                value={this.state.submittedBy}
                name="submittedBy"
                placeholder="No Submitter Found"
              />
              <Input
                value={this.state.zoomLink}
                name="zoomLink"
                placeholder="No Zoom Link Found"
              />
              <Input
                value={this.state.cohortStartDate}
                name="cohortStartDate"
                placeholder="No Cohort Start Date Found"
              />
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1> Candidate Scores</h1>
            </Jumbotron>
            <form>
              {/* Dropboxes for the data that must be selected */}
              <Row>
                <Col size="md-4">
                  <Input
                    value={`Positivity Score: ${this.state.reviewerScores[0]}`}
                    name="Positivity"
                    placeholder="No Positivity Score Found"
                  />
                </Col>
                <Col size="md-4">
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
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TBprofile;
