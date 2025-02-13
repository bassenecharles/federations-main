import React, { useState } from 'react';
import './Registrations.css';

function Registrations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dummy data for club registrations
  const initialRegistrations = [
    { id: 1, club: 'Club A', competition: 'League A', date: '2024-08-01', status: 'acceptée' },
    { id: 2, club: 'Club B', competition: 'League B', date: '2024-07-28', status: 'en attente' },
    { id: 3, club: 'Club C', competition: 'League A', date: '2024-07-25', status: 'refusée' },
  ];

  const [registrations, setRegistrations] = useState(initialRegistrations);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredRegistrations = registrations.filter(registration => {
    const searchMatch = registration.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.competition.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || registration.status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="registrations-page">
      <h2>Demandes d'Inscriptions</h2>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher une inscription..."
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

      <section className="registrations-table">
        <h3>Liste des Inscriptions</h3>
        <table>
          <thead>
            <tr>
              <th>Club</th>
              <th>Compétition</th>
              <th>Date de Demande</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.club}</td>
                <td>{registration.competition}</td>
                <td>{registration.date}</td>
                <td>{registration.status}</td>
                <td>
                  <a href={`/registration/${registration.id}/accept`}>Accepter</a>
                  <a href={`/registration/${registration.id}/reject`}>Refuser</a>
                  <a href={`/registration/${registration.id}/view`}>Voir</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Registrations;
