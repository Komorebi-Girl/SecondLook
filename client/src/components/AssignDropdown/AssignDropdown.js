import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Dropdown from "../../components/Form/Dropdown";

class AssignDropdown extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.returnAllUsers()
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <select>
        <option selected value="default">
          Select Reviewer:
        </option>
        {this.state.users.map(user => {
          return (
            <option
              key={user._id}
              value={user._id}
            >{`${user.userFirstName} ${user.userLastName}`}</option>
          );
        })}
      </select>
    );
  }
}

export default AssignDropdown;
