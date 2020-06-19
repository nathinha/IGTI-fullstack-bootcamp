import React from 'react';

export default function IncrementButton({ onIncrement }) {
  const handleClick = () => {
    onIncrement('+');
  };
  return (
    <button
      onClick={handleClick}
      className="waves-effect waves-light btn green darken-3"
    >
      +
    </button>
  );
}
