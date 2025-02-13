import React, { useState } from 'react';
import './Licensed.css';

function Licensed() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clubFilter, setClubFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Dummy data for licensed members
  const initialLicensed = [
    { id: 1, name: 'John Doe', licenseNumber: 'L12345', club: 'Club A', category: 'Joueur', status: 'actif', leagueVisa: true, districtVisa: false, committeeVisa: true },
    { id: 2, name: 'Jane Smith', licenseNumber: 'L67890', club: 'Club B', category: 'Entraîneur', status: 'suspendu', leagueVisa: true, districtVisa: true, committeeVisa: false },
    { id: 3, name: 'Peter Jones', licenseNumber: 'L24680', club: 'Club C', category: 'Arbitre', status: 'en attente de validation', leagueVisa: false, districtVisa: false, committeeVisa: false },
    { id: 4, name: 'Alice Brown', licenseNumber: 'L13579', club: 'Club A', category: 'Joueur', status: 'inactif', leagueVisa: true, districtVisa: true, committeeVisa: true },
  ];

  const [licensedMembers, setLicensedMembers] = useState(initialLicensed);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleClubFilterChange = (event) => {
    setClubFilter(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedLicensed = [...licensedMembers].sort((a, b) => {
    if (sortColumn === null) return 0;

    let comparison = 0;
    if (sortColumn === 'club') {
      comparison = a.club.localeCompare(b.club);
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const filteredLicensed = sortedLicensed.filter(member => {
    const searchMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.club.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || member.status === statusFilter;
    const clubMatch = clubFilter === 'all' || member.club === clubFilter;
    return searchMatch && statusMatch && clubMatch;
  });

  // Get unique club names for filter options
  const clubOptions = ['all', ...new Set(licensedMembers.map(member => member.club))];

  const getRowClassName = (status) => {
    switch (status) {
      case 'actif': return 'active-row';
      case 'suspendu': return 'suspended-row';
      case 'inactif': return 'inactive-row';
      case 'en attente de validation': return 'pending-row';
      default: return '';
    }
  };

  const handleVisaChange = (id, visaType, value) => {
    // This function would ideally send the change to a backend
    // For this example, we'll just simulate the change locally
    setLicensedMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === id ? { ...member, [visaType]: value } : member
      )
    );
  };

  return (
    <div className="licensed-page">
      <h2>Licenciés</h2>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher un licencié..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">Tous les états</option>
          <option value="actif">Actif</option>
          <option value="suspendu">Suspendu</option>
          <option value="inactif">Inactif</option>
          <option value="en attente de validation">En attente de validation</option>
        </select>
        <select value={clubFilter} onChange={handleClubFilterChange}>
          <option value="all">Tous les clubs</option>
          {clubOptions.map(club => (
            <option key={club} value={club}>{club}</option>
          ))}
        </select>
      </div>

      <section className="licensed-table">
        <h3>Liste des Licenciés</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Numéro de Licence</th>
              <th onClick={() => handleSort('club')} style={{ cursor: 'pointer' }}>
                Club {sortColumn === 'club' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th>Catégorie</th>
              <th>État</th>
              <th>Visa Ligue</th>
              <th>Visa District</th>
              <th>Visa Comité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLicensed.map(member => (
              <tr key={member.id} className={getRowClassName(member.status)}>
                <td>{member.name}</td>
                <td>{member.licenseNumber}</td>
                <td>{member.club}</td>
                <td>{member.category}</td>
                <td>{member.status}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={member.leagueVisa}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={member.districtVisa}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={member.committeeVisa}
                    readOnly
                  />
                </td>
                <td>
                  <a href={`/licensed/${member.id}/view`}>Voir</a>
                  <a href={`/licensed/${member.id}/edit`}>Modifier</a>
                  <a href={`/licensed/${member.id}/suspend`}>Suspendre</a>
                  <a href={`/licensed/${member.id}/activate`}>Activer</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Licensed;
