import React, { useState, Fragment } from 'react';
import Counter from './components/Counter/Counter';
import CounterCommonState from './components/Counter/CounterCommonState';
import Band from './components/Band/Band';

export default function App() {
  const [currentCounter, setCurrentCounter] = useState(3);
  const [currentStep, setCurrentStep] = useState(0);

  const handleCount = (op) => {
    setCurrentCounter(op === '+' ? currentCounter + 1 : currentCounter - 1);
    setCurrentStep(currentStep + 1);
  };

  return (
    <Fragment>
      <h3>Band</h3>
      <Band />
      <h3>Counter</h3>
      <Counter />
      <Counter />
      <Counter />
      <h3>Counter Common State</h3>
      <CounterCommonState onCount={handleCount} count={currentCounter} step={currentStep} />
      <CounterCommonState onCount={handleCount} count={currentCounter} step={currentStep} />
      <CounterCommonState onCount={handleCount} count={currentCounter} step={currentStep} />
    </Fragment>
  );
}
