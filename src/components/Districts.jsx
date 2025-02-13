import React, { useState } from 'react';
import './Districts.css';

function Districts() {
  // Dummy data for districts
  const initialDistricts = [
    { id: 1, name: 'District A', region: 'Region X', status: 'fonctionnel' },
    { id: 2, name: 'District B', region: 'Region Y', status: 'en attente de validation' },
    { id: 3, name: 'District C', region: 'Region Z', status: 'fonctionnel' },
  ];

  const [districts, setDistricts] = useState(initialDistricts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredDistricts = districts.filter(district => {
    const searchMatch = district.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      district.region.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || district.status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="districts-page">
      <h2>Districts</h2>

      <button className="create-district-button">Créer un District</button>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher un district..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">Tous les états</option>
          <option value="fonctionnel">Fonctionnel</option>
          <option value="en attente de validation">En attente de validation</option>
        </select>
      </div>

      <section className="districts-table">
        <h3>Liste des Districts</h3>
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
            {filteredDistricts.map(district => (
              <tr key={district.id}>
                <td>{district.name}</td>
                <td>{district.region}</td>
                <td>{district.status}</td>
                <td><a href={`/district/${district.id}`}>Voir</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Districts;
