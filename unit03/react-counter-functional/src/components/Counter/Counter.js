import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import NumberLabel from './NumberLabel';

export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      currentCounter: 2,
      currentStep: 0,
    };
  }

  handleClick = (op) => {
    const { currentCounter, currentStep } = this.state;

    this.setState({
      currentCounter: op === '+' ? currentCounter + 1 : currentCounter - 1,
      currentStep: currentStep + 1,
    });
  };

  render() {
    const { currentCounter, currentStep } = this.state;
    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleClick} />
        <NumberLabel value={currentCounter} />
        <IncrementButton onIncrement={this.handleClick} />
        <NumberLabel value={currentStep} />
      </div>
    );
  }
}
