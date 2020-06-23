import React from 'react'
import Position from './Position';
import Picture from './Picture';
import Info from './Info';
import Name from './Name';
import Votes from './Votes';
import Percentage from './Percentage';
import Popularity from './Popularity';

export default function Candidate({ candidate, position, previousVote, previousPercentage }) {
  const { id, name, votes, percentage, popularity } = candidate;

  const imgSrc = `${id}.jpg`;
  return (
    <div className="card-content">
      <div className="row valign-wrapper">
        <Position>{position}</Position>
        <Picture imgSrc={imgSrc} imgAlt={name} />
        <div className="col l12">
          <Name>{name}</Name>
          <Info>
            <Votes value={votes} previous={previousVote} />
            <Percentage value={percentage} previous={previousPercentage} />
            <Popularity value={popularity} />
          </Info>
        </div>
      </div>
    </div>
  )
}
