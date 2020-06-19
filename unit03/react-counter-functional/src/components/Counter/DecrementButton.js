import React, { Component } from 'react';

export default class DecrementButton extends Component {
  handleClick = () => {
    this.props.onDecrement('-');
  };
  render() {
    return (
      <button
        onClick={this.handleClick}
        className="waves-effect waves-light btn red darken-3"
      >
        -
      </button>
    );
  }
}
