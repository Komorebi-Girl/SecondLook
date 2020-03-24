import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Dropdown from "../../components/Form/Dropdown"

class AssignDropdown extends Component {
  state = {
    users: [],
   
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.returnAllUsers()
      .then(res => this.setState({ teachbacks: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      
      {this.state.users ? (<option></option>) : (<h3>No users in DB</h3>)}
    
      )
  }
}


export default AssignDropdown;
