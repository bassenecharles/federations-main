import React, { useState } from 'react';
import './Referees.css';

function Referees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [leagueFilter, setLeagueFilter] = useState('all');

  // Dummy data for referees
  const initialReferees = [
    { id: 1, name: 'Robert Martin', licenseNumber: 'R12345', diploma: 'National', educationLevel: 'Bac +5', league: 'League A', ranking: 'A', status: 'actif' },
    { id: 2, name: 'Emily White', licenseNumber: 'R67890', diploma: 'Regional', educationLevel: 'Bac +3', league: 'League B', ranking: 'B', status: 'suspendu' },
    { id: 3, name: 'Chris Black', licenseNumber: 'R24680', diploma: 'Départemental', educationLevel: 'Bac', league: 'League A', ranking: 'C', status: 'actif' },
  ];

  const [referees, setReferees] = useState(initialReferees);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleLeagueFilterChange = (event) => {
    setLeagueFilter(event.target.value);
  };

  const filteredReferees = referees.filter(referee => {
    const searchMatch = referee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referee.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || referee.status === statusFilter;
    const leagueMatch = leagueFilter === 'all' || referee.league === leagueFilter;
    return searchMatch && statusMatch && leagueMatch;
  });

  // Get unique league names for filter options
  const leagueOptions = ['all', ...new Set(referees.map(referee => referee.league))];

  return (
    <div className="referees-page">
      <h2>Arbitres</h2>

      <button className="create-referee-button">Ajouter un Arbitre</button>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher un arbitre..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">Tous les états</option>
          <option value="actif">Actif</option>
          <option value="suspendu">Suspendu</option>
          <option value="inactif">Inactif</option>
        </select>
        <select value={leagueFilter} onChange={handleLeagueFilterChange}>
          <option value="all">Toutes les ligues</option>
          {leagueOptions.map(league => (
            <option key={league} value={league}>{league}</option>
          ))}
        </select>
      </div>

      <section className="referees-table">
        <h3>Liste des Arbitres</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Numéro de Licence</th>
              <th>Diplôme</th>
              <th>Niveau d'Études</th>
              <th>Ligue</th>
              <th>Rang</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReferees.map(referee => (
              <tr key={referee.id}>
                <td>{referee.name}</td>
                <td>{referee.licenseNumber}</td>
                <td>{referee.diploma}</td>
                <td>{referee.educationLevel}</td>
                <td>{referee.league}</td>
                <td>{referee.ranking}</td>
                <td>{referee.status}</td>
                <td>
                  <a href={`/referee/${referee.id}/view`}>Voir</a>
                  <a href={`/referee/${referee.id}/edit`}>Modifier</a>
                  <a href={`/referee/${referee.id}/suspend`}>Suspendre</a>
                  <a href={`/referee/${referee.id}/activate`}>Activer</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Referees;
