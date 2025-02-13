import React, { useState } from 'react';
import './Affiliations.css';

function Affiliations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dummy data for affiliation requests
  const initialAffiliations = [
    { id: 1, club: 'Club A', season: '2024-2025', requestDate: '2024-08-05', status: 'acceptée' },
    { id: 2, club: 'Club B', season: '2023-2024', requestDate: '2024-08-04', status: 'en attente' },
    { id: 3, club: 'Club C', season: '2024-2025', requestDate: '2024-08-03', status: 'refusée' },
  ];

  const [affiliations, setAffiliations] = useState(initialAffiliations);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredAffiliations = affiliations.filter(affiliation => {
    const searchMatch = affiliation.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliation.season.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || affiliation.status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="affiliations-page">
      <h2>Affiliations / Ré-affiliations</h2>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher une affiliation..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">Tous les états</option>
          <option value="acceptée">Acceptée</option>
          <option value="en attente">En attente</option>
          <option value="refusée">Refusée</option>
        </select>
      </div>

      <section className="affiliations-table">
        <h3>Liste des Demandes d'Affiliation</h3>
        <table>
          <thead>
            <tr>
              <th>Club</th>
              <th>Saison</th>
              <th>Date de Demande</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAffiliations.map(affiliation => (
              <tr key={affiliation.id}>
                <td>{affiliation.club}</td>
                <td>{affiliation.season}</td>
                <td>{affiliation.requestDate}</td>
                <td>{affiliation.status}</td>
                <td>
                  <a href={`/affiliation/${affiliation.id}/view`}>Voir</a>
                  <a href={`/affiliation/${affiliation.id}/accept`}>Accepter</a>
                  <a href={`/affiliation/${affiliation.id}/reject`}>Refuser</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Affiliations;
