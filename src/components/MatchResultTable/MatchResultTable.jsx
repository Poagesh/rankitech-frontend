import React from 'react';

const MatchResultTable = ({ matches }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match, index) => (
          <tr key={index}>
            <td>{match.id}</td>
            <td>{match.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchResultTable;
