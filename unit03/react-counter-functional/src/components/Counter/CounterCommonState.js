import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import NumberLabel from './NumberLabel';

export default class CounterCommonState extends Component {
  handleClick = (op) => {
    this.props.onCount(op);
  };

  render() {
    const { count, step } = this.props;
    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleClick} />
        <NumberLabel value={count} />
        <IncrementButton onIncrement={this.handleClick} />
        <NumberLabel value={step} />
      </div>
    );
  }
}
