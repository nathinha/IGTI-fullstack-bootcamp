import React from 'react'

export default function Country(props) {
  const { country } = props;
  const { name, flag } = country;
  return (
    <div className="center-align col s4">
      <div className="row">
        <div>
          <img src={flag} alt={name} />
        </div>
        <div>
          <span>{name}</span>
        </div>
      </div>
    </div>
  )
}
