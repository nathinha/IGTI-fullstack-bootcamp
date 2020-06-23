import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Candidates from './components/Candidates';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [previousVotes, setPreviousVotes] = useState([]);
  const [previousPercentages, setPreviousPercentages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8080/votes')
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const localPreviousVotes = candidates.map(({ id, votes }) => {
            return { id, votes };
          });

          const localPreviousPercentages = candidates.map(({ id, percentage }) => {
            return { id, percentage };
          });

          setCandidates(json.candidates);
          setPreviousVotes(localPreviousVotes);
          setPreviousPercentages(localPreviousPercentages);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [candidates]);

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
