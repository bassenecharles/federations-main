import React, { useState } from 'react';
import './PersonnelFederal.css';

function PersonnelFederal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [leagueFilter, setLeagueFilter] = useState('all');
  const [showAddPersonnel, setShowAddPersonnel] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  // Dummy data for federal personnel
  const initialPersonnel = [
    { id: 1, name: 'Alice Dupont', role: 'Secrétaire Général', email: 'alice.dupont@example.com', phone: '0612345678', league: 'League A' },
    { id: 2, name: 'Bob Martin', role: 'Trésorier', email: 'bob.martin@example.com', phone: '0687654321', league: 'League B' },
    { id: 3, name: 'Claire Leroy', role: 'Commissaire', email: 'claire.leroy@example.com', phone: '0701234567', league: 'League A' },
    { id: 4, name: 'Jean Durand', role: 'Directeur Technique National', email: 'jean.durand@example.com', phone: '0698765432', league: 'League C' },
  ];

  const [personnel, setPersonnel] = useState(initialPersonnel);

  // Dummy data for users (to select from)
  const users = [
    { id: 'u1', name: 'Sophie Gerard', email: 'sophie.gerard@example.com' },
    { id: 'u2', name: 'Pierre Richard', email: 'pierre.richard@example.com' },
    { id: 'u3', name: 'Nathalie Petit', email: 'nathalie.petit@example.com' },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleLeagueFilterChange = (event) => {
    setLeagueFilter(event.target.value);
  };

  const filteredPersonnel = personnel.filter(person => {
    const searchMatch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = roleFilter === 'all' || person.role === roleFilter;
    const leagueMatch = leagueFilter === 'all' || person.league === leagueFilter;
    return searchMatch && roleMatch && leagueMatch;
  });

  // Get unique role and league names for filter options
  const roleOptions = ['all', ...new Set(personnel.map(person => person.role))];
  const leagueOptions = ['all', ...new Set(personnel.map(person => person.league))];

  const handleAddPersonnelClick = () => {
    setShowAddPersonnel(true);
  };

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleAddPersonnelSubmit = (event) => {
    event.preventDefault();
    // Add logic to add the selected user to the personnel list
    // (This is a simplified example, you'll need to adapt it to your needs)
    const newUser = users.find(user => user.id === selectedUser);
    if (newUser) {
      setPersonnel([...personnel, {
        id: personnel.length + 1,
        name: newUser.name,
        email: newUser.email,
        role: 'Nouveau Rôle', // You might want to add a role selection
        phone: 'À définir', // You might want to add a phone number field
        league: 'À définir', // You might want to add a league selection
      }]);
    }
    setShowAddPersonnel(false);
    setSelectedUser('');
  };

  return (
    <div className="personnel-federal-page">
      <h2>Personnel Fédéral</h2>

      <button className="add-personnel-button" onClick={handleAddPersonnelClick}>Ajouter un Membre du Personnel</button>

      {showAddPersonnel && (
        <div className="add-personnel-form">
          <h3>Ajouter un Membre du Personnel</h3>
          <form onSubmit={handleAddPersonnelSubmit}>
            <label htmlFor="userSelect">Sélectionner un Utilisateur:</label>
            <select id="userSelect" value={selectedUser} onChange={handleUserSelect}>
              <option value="">Sélectionner un utilisateur</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
              ))}
            </select>
            <button type="submit">Ajouter</button>
          </form>
        </div>
      )}

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher un membre du personnel..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={roleFilter} onChange={handleRoleFilterChange}>
          <option value="all">Tous les rôles</option>
          {roleOptions.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <select value={leagueFilter} onChange={handleLeagueFilterChange}>
          <option value="all">Toutes les ligues</option>
          {leagueOptions.map(league => (
            <option key={league} value={league}>{league}</option>
          ))}
        </select>
      </div>

      <section className="personnel-table">
        <h3>Liste du Personnel</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Rôle</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Ligue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPersonnel.map(person => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.role}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
                <td>{person.league}</td>
                <td>
                  <a href={`/personnel/${person.id}/view`}>Voir</a>
                  <a href={`/personnel/${person.id}/edit`}>Modifier</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default PersonnelFederal;
