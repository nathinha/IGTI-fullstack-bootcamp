import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';



export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: ''
    }
  }

  getTotalPopulationFrom = (countries) => {
    return countries.reduce((acc, cur) => acc + cur.population, 0);
  }

  async componentDidMount() {
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

    const filteredPopulation = this.getTotalPopulationFrom(allCountries);

    this.setState({
      allCountries,
      filteredCountries: allCountries,
      filteredPopulation
    });
  }

  handleFilterChange = (newFilter) => {
    this.setState({
      filter: newFilter
    });

    const filterLowerCase = newFilter.toLowerCase();

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = this.getTotalPopulationFrom(filteredCountries);

    this.setState({
      filteredCountries,
      filteredPopulation
    });
  }

  render() {
    const { filter, filteredCountries, filteredPopulation } = this.state;

    return (
      <div className="container">
        <h1 className="center-align">React Countries</h1>
        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          populationCount={filteredPopulation}
          onFilterChange={this.handleFilterChange} />
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}
