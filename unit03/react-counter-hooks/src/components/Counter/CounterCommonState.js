import React from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import NumberLabel from './NumberLabel';

export default function CounterCommonState(props) {
  const { count, step, onCount } = props;

  const handleClick = (op) => {
    onCount(op);
  };

  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleClick} />
      <NumberLabel value={count} />
      <IncrementButton onIncrement={handleClick} />
      <NumberLabel value={step} />
    </div>
  );
}
