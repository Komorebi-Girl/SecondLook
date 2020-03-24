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
              <h1>Teachback Profile</h1>
            </Jumbotron>
            <form>
              {/* Input boxes for the data that must be filled-in*/}
              <label>
                Candidate Name
                <Input
                  value={this.state.candidateName}
                  name="candidateName"
                  placeholder="No Candidate Name Found "
                />
              </label>
              <label>
                Role
                <Input
                  value={this.state.role}
                  name="role"
                  placeholder="No Role Found"
                />
              </label>

              <label>
                University
                <Input
                  value={this.state.university}
                  name="university"
                  placeholder="No University Found)"
                />
              </label>

              <label>
                Program Type
                <Input
                  value={this.state.programType}
                  name="programType"
                  placeholder="No Program Type Found"
                />
              </label>

              <label>
                Zoom Link
                <Input
                  value={this.state.zoomLink}
                  name="zoomLink"
                  placeholder="No Zoom Link Found"
                />
              </label>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Reviewer Scores</h1>
            </Jumbotron>
            <form>
              {/* Dropboxes for the data that must be selected */}
              <Row>
                <Col size="md-3">
                  <label>
                    Positivity
                    <Input
                      value={this.state.reviewerScores[0]}
                      name="Positivity"
                      placeholder="No Positivity Score Found"
                    />
                  </label>
                </Col>
                <Col size="md-3">
                  <label>
                    Investment
                    <Input
                      value={this.state.reviewerScores[1]}
                      name="Investment"
                      placeholder="No Investment Score Found"
                    />
                  </label>
                </Col>
                <Col size="md-3">
                  <label>
                    Pace
                    <Input
                      value={this.state.reviewerScores[2]}
                      name="Pace"
                      placeholder="No Pace Score Found"
                    />
                  </label>
                </Col>
                <Col size="md-3">
                  <label>
                    Clarity
                    <Input
                      value={this.state.reviewerScores[3]}
                      name="Clarity"
                      placeholder="No Clarity Score Found"
                    />
                  </label>
                </Col>
              </Row>
              <Row>
                <Col size="md-3">
                  <label>
                    Knowledge
                    <Input
                      value={this.state.reviewerScores[4]}
                      name="Knowledge"
                      placeholder="No Knowledge Score Found"
                    />
                  </label>
                </Col>
                <Col size="md-3">
                  <label>
                    Responses
                    <Input
                      value={this.state.reviewerScores[5]}
                      name="Responses"
                      placeholder="No Responses Score Found"
                    />
                  </label>
                </Col>
                <Col size="md-3">
                  <label>
                    Industry Knowledge
                    <Input
                      value={this.state.reviewerScores[6]}
                      name="Industry Knowledge"
                      placeholder="No Industry Knowledge Score Found"
                    />
                  </label>
                </Col>
                <Col size="md-3">
                  <label>
                    Coachability
                    <Input
                      value={this.state.reviewerScores[7]}
                      name="Coachability "
                      placeholder="No Coachability Score Found"
                    />
                  </label>
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
