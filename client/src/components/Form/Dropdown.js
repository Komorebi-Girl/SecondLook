import React, { Component } from "react";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.category };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.updateScores(
      event.target.value,
      this.props.reviewedBy,
      this.props.index
    );
  }

  render() {
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value={this.props.category}>
          {`Select ${this.props.category} Score`}:
        </option>
        <option value="Weak">Weak</option>
        <option value="Average">Average</option>
        <option value="Strong">Strong</option>
        <option value="Exemplary">Exemplary</option>
      </select>
    );
  }
}

export default Dropdown;
