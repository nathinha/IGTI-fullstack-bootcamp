import React from 'react'
import { formatNumber } from '../../utils/formatters';
import css from './header.module.css';

export default function Header(props) {
  const { filter, countryCount, populationCount, onFilterChange } = props;

  const handleInputChange = (event) => {
    onFilterChange(event.target.value);
  }

  return (
    <div className={`${css.headerBox} row valign-wrapper z-depth-1`}>
      <div className="input-field col s6">
        <input
          id="search_box"
          type="text"
          value={filter}
          onChange={handleInputChange}
          placeholder="Search..."
        />
      </div>
      <div className="center-align col s2">
        <span>Countries: <strong>{countryCount}</strong></span>
      </div>
      <div className="center-align col s4">
        <span>Total Population: <strong>{formatNumber(populationCount)}</strong></span>
      </div>
    </div >
  )
}
