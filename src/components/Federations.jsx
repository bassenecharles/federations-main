import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Federations.css';

function Federations() {
  const [selectedCompetition, setSelectedCompetition] = useState('all');

  // Dummy data for recent matches (Basketball)
  const recentMatches = [
    { id: 1, team1: 'Team A', team2: 'Team B', score: '85 - 78', date: '2024-08-05', competition: 'League A' },
    { id: 2, team1: 'Team C', team2: 'Team D', score: '92 - 88', date: '2024-08-04', competition: 'League B' },
    { id: 3, team1: 'Team E', team2: 'Team F', score: '75 - 75', date: '2024-08-03', competition: 'League A' },
  ];

  // Dummy data for upcoming matches (Basketball)
  const upcomingMatches = [
    { id: 4, team1: 'Team G', team2: 'Team H', date: '2024-08-10', time: '15:00', competition: 'League A', location: 'Stade Municipal' },
    { id: 5, team1: 'Team I', team2: 'Team J', date: '2024-08-11', time: '16:30', competition: 'League B', location: 'Gymnase des Sports' },
    { id: 6, team1: 'Team K', team2: 'Team L', date: '2024-08-12', time: '18:00', competition: 'League A', location: 'Terrain du Lycée' },
  ];

  // Dummy data for league standings (Basketball)
  const standings = [
    { id: 1, team: 'Team A', points: 25, wins: 8, losses: 2, goalDifference: 50, competition: 'League A' },
    { id: 2, team: 'Team B', points: 22, wins: 7, losses: 3, goalDifference: 35, competition: 'League A' },
    { id: 3, team: 'Team C', points: 20, wins: 6, losses: 4, goalDifference: 15, competition: 'League B' },
  ];

  // Filter matches and standings based on selected competition
  const filteredRecentMatches = selectedCompetition === 'all' ? recentMatches : recentMatches.filter(match => match.competition === selectedCompetition);
  const filteredUpcomingMatches = selectedCompetition === 'all' ? upcomingMatches : upcomingMatches.filter(match => match.competition === selectedCompetition);
  const filteredStandings = selectedCompetition === 'all' ? standings : standings.filter(team => team.competition === selectedCompetition);

  // Get unique competition names for filter options
  const competitionOptions = ['all', ...new Set([...recentMatches.map(match => match.competition), ...upcomingMatches.map(match => match.competition), ...standings.map(team => team.competition)])];

  const handleCompetitionChange = (event) => {
    setSelectedCompetition(event.target.value);
  };

  return (
    <div className="federations-page">
      <h2>Résultats de la Fédération (Basket)</h2>

      <div className="competition-filter">
        <label htmlFor="competition">Filtrer par compétition:</label>
        <select id="competition" value={selectedCompetition} onChange={handleCompetitionChange}>
          {competitionOptions.map(competition => (
            <option key={competition} value={competition}>{competition === 'all' ? 'Toutes les compétitions' : competition}</option>
          ))}
        </select>
      </div>

      <section className="recent-matches">
        <h3>Derniers Rencontres</h3>
        <ul>
          {filteredRecentMatches.map(match => (
            <li key={match.id}>
              <span>{match.team1} vs {match.team2}</span>
              <span>{match.score}</span>
              <span>{match.date}</span>
              <Link to={`/match-sheet/${match.id}`}>Voir</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="upcoming-matches">
        <h3>Rencontres à Venir</h3>
        <ul>
          {filteredUpcomingMatches.map(match => (
            <li key={match.id}>
              <span>{match.team1} vs {match.team2}</span>
              <span>{match.date}</span>
              <span>{match.time}</span>
              <span>{match.location}</span>
              <Link to={`/match/${match.id}`}>Voir</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="league-standings">
        <h3>Classement</h3>
        <table>
          <thead>
            <tr>
              <th>Équipe</th>
              <th>Points</th>
              <th>Victoires</th>
              <th>Défaites</th>
              <th>Goal Différence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStandings.map(team => (
              <tr key={team.id}>
                <td>{team.team}</td>
                <td>{team.points}</td>
                <td>{team.wins}</td>
                <td>{team.losses}</td>
                <td>{team.goalDifference}</td>
                <td><Link to={`/team/${team.id}`}>Voir</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Federations;
