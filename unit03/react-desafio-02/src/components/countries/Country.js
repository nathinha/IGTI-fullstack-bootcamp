import React, { Component } from 'react'

export default class Country extends Component {
  render() {
    const { country } = this.props;
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
}
