import React from 'react';

export default function DecrementButton({ onDecrement }) {
  const handleClick = () => {
    onDecrement('-');
  };

  return (
    <button
      onClick={handleClick}
      className="waves-effect waves-light btn red darken-3"
    >
      -
    </button>
  );
}
