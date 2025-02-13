import React, { useState } from 'react';
import './Clubs.css';

function Clubs() {
  // Dummy data for clubs
  const initialClubs = [
    { id: 1, name: 'Club A', district: 'District X', status: 'fonctionnel' },
    { id: 2, name: 'Club B', district: 'District Y', status: 'en attente de validation' },
    { id: 3, name: 'Club C', district: 'District Z', status: 'fonctionnel' },
  ];

  const [clubs, setClubs] = useState(initialClubs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredClubs = clubs.filter(club => {
    const searchMatch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.district.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || club.status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="clubs-page">
      <h2>Clubs</h2>

      <button className="create-club-button">Créer un Club</button>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher un club..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">Tous les états</option>
          <option value="fonctionnel">Fonctionnel</option>
          <option value="en attente de validation">En attente de validation</option>
        </select>
      </div>

      <section className="clubs-table">
        <h3>Liste des Clubs</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>District</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClubs.map(club => (
              <tr key={club.id}>
                <td>{club.name}</td>
                <td>{club.district}</td>
                <td>{club.status}</td>
                <td><a href={`/club/${club.id}`}>Voir</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Clubs;
