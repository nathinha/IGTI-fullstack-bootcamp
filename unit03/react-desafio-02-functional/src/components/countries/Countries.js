import React from 'react'
import Country from './Country';
import css from './countries.module.css';

export default function Countries(props) {
  const { countries } = props;

  return (
    <div className={`${css.countriesBox} row z-depth-1`}>
      <ul>
        {
          countries.map((country) => {
            return (
              <li key={country.id}>
                <Country country={country} />
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}
