import React, { useState } from 'react';
import './Committees.css';

function Committees() {
  // Dummy data for committees
  const initialCommittees = [
    { id: 1, name: 'Comité A', description: 'Description A', status: 'fonctionnel' },
    { id: 2, name: 'Comité B', description: 'Description B', status: 'en attente de validation' },
    { id: 3, name: 'Comité C', description: 'Description C', status: 'fonctionnel' },
  ];

  const [committees, setCommittees] = useState(initialCommittees);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredCommittees = committees.filter(committee => {
    const searchMatch = committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      committee.description.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || committee.status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="committees-page">
      <h2>Comités</h2>

      <button className="create-committee-button">Créer un Comité</button>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher un comité..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">Tous les états</option>
          <option value="fonctionnel">Fonctionnel</option>
          <option value="en attente de validation">En attente de validation</option>
        </select>
      </div>

      <section className="committees-table">
        <h3>Liste des Comités</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommittees.map(committee => (
              <tr key={committee.id}>
                <td>{committee.name}</td>
                <td>{committee.description}</td>
                <td>{committee.status}</td>
                <td><a href={`/committee/${committee.id}`}>Voir</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Committees;
