import React, { Component } from 'react';

export default class InputReadWrite extends Component {
  handleInputChange = (event) => {
    this.props.onChange(event.target.value);
  }
  render() {
    const { label, value } = this.props;
    const id = label.replace(/\s/g, "");

    return (
      <div className="input-field col s12">
        <input
          id={id}
          type="number"
          value={value}
          onChange={this.handleInputChange}
        />
        <label className="active" htmlFor={id}>{label}</label>
      </div>
    )
  }
}
