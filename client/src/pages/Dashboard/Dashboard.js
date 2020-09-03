import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

const jumbotronText = {
  fontFamily: "Montserrat",
  color: "rgb(50, 198, 230)",
  fontSize: "4rem",
  textAlign: "center",
  textDecoration: "underline",
};

const completedBtn = {
  backgroundColor: "rgb(50, 198, 230)",
  color: "rgb(255,255,255)",
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "1.75rem",
  position: "relative",
  top: "24px",
  right: "10px",
};

const pendingBtn = {
  backgroundColor: "rgb(255,255,255)",
  color: "rgb(0,0,0)",
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "1.75rem",
  position: "relative",
  top: "24px",
  right: "10px",
};

const tbHeader = {
  fontFamily: "Montserrat",
  color: "rgb(0,0,0)",
  fontSize: "2rem",
  textAlign: "center",
  fontWeight: 700,
};

const tbText = {
  fontFamily: "Montserrat",
  color: "rgb(0,0,0)",
  fontSize: "2rem",
  textAlign: "center",
};

class Dashboard extends Component {
  // Setting our component's initial state
  state = {
    assignedItems: [],
    submittedItems: [],
    userID: this.props.match.params.userID,
  };

  // When the component mounts, load (retrive all final interview items related to the user)
  componentDidMount() {
    this.loadItems();
  }

  loadItems = () => {
    let allFinalItems = [];
    let userTBs = [];
    let userTAFinals = [];

    Promise.all([
      API.getUserTeachbacks(this.state.userID),
      API.getUserTAFinals(this.state.userID),
    ])
      .then((res) => {
        // To make things clearer semantically, save the arrays of TB and TA Final objs into appropriately labelled variables
        userTBs = res.data[0];
        userTAFinals = res.data[1];
        console.log("here", userTAFinals);
        console.log("here too", userTBs);
        // Combine the all user's TBs and all user's TA Finals into a single array
        allFinalItems = userTBs.concat(userTAFinals);
        // Sort all these items into two groups: assigned and submitted items
        this.sortItems(allFinalItems);
      })
      .catch((err) => console.log(err));
  };

  sortItems = (allFinalItemsArr) => {
    // Use arrays as empty containers to hold TBs the user has assigned & TBs the user has submitted
    let assignedObjs = [];
    let submittedObjs = [];

    // Iterate through all of the items associated with the user
    for (let i = 0; i < allFinalItemsArr.length; i++) {
      // If the logged in user has been assigned that item to review but hasn't done it yet
      if (
        allFinalItemsArr[i].reviewedBy === this.state.userID &&
        allFinalItemsArr[i].reviewerResult === "N/A"
      ) {
        // push it into the "assigned" array
        assignedObjs.push(allFinalItemsArr[i]);
      } else if (
        // if the user hasn't removed that item from their dash and has submitted it themselves
        allFinalItemsArr[i].submittedBy === this.state.userID &&
        allFinalItemsArr[i].isVisible === "True"
      ) {
        // push it into the "submitted" array
        submittedObjs.push(allFinalItemsArr[i]);
      }
    }

    // reverse the array to ensure that more recently submitted TBs are listed first
    submittedObjs = submittedObjs.reverse();

    // save each group of teachbacks to the component's state
    this.setState({
      assignedItems: assignedObjs,
      submittedItems: submittedObjs,
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-6">
            <Jumbotron>
              <h1 style={jumbotronText}>Items To QA</h1>
            </Jumbotron>
            {this.state.assignedItems.length ? (
              <List>
                {this.state.assignedItems.map((item) => {
                  return (
                    <Row>
                      <Col size="md-12">
                        <ListItem key={item._id}>
                          <a href={`/review/${this.state.userID}/${item._id}`}>
                            <div style={tbHeader}>{item.candidateName}</div>
                            <div style={tbText}>
                              {item.role} role for {item.programType} program at{" "}
                              {item.university}
                            </div>
                          </a>
                        </ListItem>
                      </Col>
                    </Row>
                  );
                })}
              </List>
            ) : (
              <div>
                <h3 style={tbText}>No Items to Display</h3>
              </div>
            )}
          </Col>
          <Col size="sm-6">
            <Jumbotron>
              <h1 style={jumbotronText}>My Submissions</h1>
            </Jumbotron>
            {this.state.submittedItems.length ? (
              <List>
                {this.state.submittedItems.map((item) => {
                  return (
                    <Row>
                      <Col size="xs-8" customStyles="col-md-8">
                        <ListItem key={item._id}>
                          <a href={`/view/${this.state.userID}/${item._id}`}>
                            <div style={tbHeader}>{item.candidateName}</div>
                            <div style={tbText}>
                              {item.role} role for {item.programType} program at{" "}
                              {item.university}
                            </div>
                          </a>
                        </ListItem>
                      </Col>
                      <Col size="xs-4" customStyles="col-md-3 col-md-push-1">
                        {item.reviewerResult === "N/A" ? (
                          <button style={pendingBtn} type="button">
                            Review Pending
                          </button>
                        ) : (
                          <button style={completedBtn} type="button">
                            Review Complete
                          </button>
                        )}
                      </Col>
                    </Row>
                  );
                })}
              </List>
            ) : (
              <h3 style={tbText}>No Items to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
