import React, { Component } from 'react';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Candidates from './components/Candidates';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [],
      previousVotes: [],
      previousPercentages: []
    }

    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      fetch('http://localhost:8080/votes')
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const previousVotes = this.state.candidates.map(({ id, votes }) => {
            return { id, votes };
          });

          const previousPercentages = this.state.candidates.map(({ id, percentage }) => {
            return { id, percentage };
          });

          this.setState({
            candidates: json.candidates,
            previousVotes,
            previousPercentages
          });
        });
    }, 1000);
  }

  render() {
    const { candidates, previousVotes, previousPercentages } = this.state;

    if (candidates.length === 0) {
      return (
        <div className="container">
          <Spinner description="Carregando..." />
        </div>
      );
    }
    return (
      <div className="container">
        <Header title="Votação" />
        <Candidates
          candidates={candidates}
          previousVotes={previousVotes}
          previousPercentages={previousPercentages}
        />
      </div>
    );
  }
}
