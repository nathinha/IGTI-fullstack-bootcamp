import React, { Component } from 'react';

export default class IncrementButton extends Component {
  handleClick = () => {
    this.props.onIncrement('+');
  };
  render() {
    return (
      <button
        onClick={this.handleClick}
        className="waves-effect waves-light btn green darken-3"
      >
        +
      </button>
    );
  }
}
