import React, { useState } from 'react';
import './MatchSheet.css';

function MatchSheet() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dummy data for match sheets
  const initialMatchSheets = [
    { id: 1, match: 'Team A vs Team B', competition: 'League A', date: '2024-08-05', status: 'validée' },
    { id: 2, match: 'Team C vs Team D', competition: 'League B', date: '2024-08-04', status: 'en attente' },
    { id: 3, match: 'Team E vs Team F', competition: 'League A', date: '2024-08-03', status: 'validée' },
  ];

  const [matchSheets, setMatchSheets] = useState(initialMatchSheets);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredMatchSheets = matchSheets.filter(matchSheet => {
    const searchMatch = matchSheet.match.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matchSheet.competition.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || matchSheet.status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="match-sheet-page">
      <h2>Feuilles de Match</h2>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher une feuille de match..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">Tous les états</option>
          <option value="validée">Validée</option>
          <option value="en attente">En attente</option>
          <option value="refusée">Refusée</option>
        </select>
      </div>

      <section className="match-sheets-table">
        <h3>Liste des Feuilles de Match</h3>
        <table>
          <thead>
            <tr>
              <th>Match</th>
              <th>Compétition</th>
              <th>Date</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatchSheets.map(matchSheet => (
              <tr key={matchSheet.id}>
                <td>{matchSheet.match}</td>
                <td>{matchSheet.competition}</td>
                <td>{matchSheet.date}</td>
                <td>{matchSheet.status}</td>
                <td>
                  <a href={`/match-sheet/${matchSheet.id}/view`}>Voir</a>
                  <a href={`/match-sheet/${matchSheet.id}/edit`}>Modifier</a>
                  <a href={`/match-sheet/${matchSheet.id}/validate`}>Valider</a>
                  <a href={`/match-sheet/${matchSheet.id}/reject`}>Refuser</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default MatchSheet;
