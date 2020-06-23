import React, { useState, useEffect } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const json = await res.json();

      const allCountries = json.map(({ numericCode, translations, flag, population }) => {
        const name = translations.br;
        return {
          id: numericCode,
          name: name,
          filterName: name.toLowerCase(),
          flag,
          population
        }
      });

      const filteredPopulation = getTotalPopulationFrom(allCountries);

      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
      setFilteredPopulation(filteredPopulation);
    }

    getCountries();
  }, [])

  const getTotalPopulationFrom = (countries) => {
    return countries.reduce((acc, cur) => acc + cur.population, 0);
  }

  const handleFilterChange = (newFilter) => {
    setUserFilter(newFilter);
    const filterLowerCase = newFilter.toLowerCase();

    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = getTotalPopulationFrom(filteredCountries);

    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
  }

  return (
    <div className="container">
      <h1 className="center-align">React Countries</h1>
      <Header
        filter={userFilter}
        countryCount={filteredCountries.length}
        populationCount={filteredPopulation}
        onFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries} />
    </div>
  );
}
