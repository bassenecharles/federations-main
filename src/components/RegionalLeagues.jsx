import React, { useState } from 'react';
import './RegionalLeagues.css';

function RegionalLeagues() {
  // Dummy data for regional leagues
  const initialLeagues = [
    { id: 1, name: 'Ligue A', region: 'Region X', status: 'fonctionnelle' },
    { id: 2, name: 'Ligue B', region: 'Region Y', status: 'en attente de validation' },
    { id: 3, name: 'Ligue C', region: 'Region Z', status: 'fonctionnelle' },
  ];

  const [leagues, setLeagues] = useState(initialLeagues);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredLeagues = leagues.filter(league => {
    const searchMatch = league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.region.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || league.status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="regional-leagues-page">
      <h2>Ligues Régionales</h2>

      <button className="create-league-button">Créer une Ligue</button>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher une ligue..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">Tous les états</option>
          <option value="fonctionnelle">Fonctionnelle</option>
          <option value="en attente de validation">En attente de validation</option>
        </select>
      </div>

      <section className="leagues-table">
        <h3>Liste des Ligues</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Région</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeagues.map(league => (
              <tr key={league.id}>
                <td>{league.name}</td>
                <td>{league.region}</td>
                <td>{league.status}</td>
                <td><a href={`/league/${league.id}`}>Voir</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default RegionalLeagues;
