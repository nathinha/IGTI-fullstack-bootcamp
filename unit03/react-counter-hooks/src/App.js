import React, { Component, Fragment } from 'react';
import Counter from './components/Counter/Counter';
import CounterCommonState from './components/Counter/CounterCommonState';
import Band from './components/Band/Band';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 3,
      currentStep: 0
    }
  }

  handleCount = (op) => {
    const { currentCounter, currentStep } = this.state;

    this.setState({
      currentCounter: op === '+' ? currentCounter + 1 : currentCounter - 1,
      currentStep: currentStep + 1,
    });
  };

  render() {
    const { currentCounter, currentStep } = this.state;
    return (
      <Fragment>
        <h3>Band</h3>
        <Band />
        <h3>Counter</h3>
        <Counter />
        <Counter />
        <Counter />
        <h3>Counter Common State</h3>
        <CounterCommonState onCount={this.handleCount} count={currentCounter} step={currentStep} />
        <CounterCommonState onCount={this.handleCount} count={currentCounter} step={currentStep} />
        <CounterCommonState onCount={this.handleCount} count={currentCounter} step={currentStep} />
      </Fragment>
    );
  }
}
