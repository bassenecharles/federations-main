import React, { useState } from 'react';
import './Championship.css';

function Championship() {
  const [searchTerm, setSearchTerm] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('all');

  // Dummy data for championships
  const initialChampionships = [
    { id: 1, name: 'Championnat A', competition: 'League A', status: 'en cours' },
    { id: 2, name: 'Championnat B', competition: 'League B', status: 'terminé' },
    { id: 3, name: 'Championnat C', competition: 'League A', status: 'en cours' },
  ];

  const [championships, setChampionships] = useState(initialChampionships);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCompetitionChange = (event) => {
    setCompetitionFilter(event.target.value);
  };

  const filteredChampionships = championships.filter(championship => {
    const searchMatch = championship.name.toLowerCase().includes(searchTerm.toLowerCase());
    const competitionMatch = competitionFilter === 'all' || championship.competition === competitionFilter;
    return searchMatch && competitionMatch;
  });

  // Get unique competition names for filter options
  const competitionOptions = ['all', ...new Set(championships.map(championship => championship.competition))];

  return (
    <div className="championship-page">
      <h2>Gestion du Championnat</h2>

      <section className="championship-management">
        <h3>Actions</h3>
        <div className="actions-container">
          <button>Créer un Championnat</button>
          <button>Modifier un Championnat</button>
          <button>Voir les Championnats</button>
          <button>Gérer le Calendrier</button>
          <button>Gérer les Équipes</button>
          <button>Saisir les Résultats</button>
          <button>Voir le Classement</button>
        </div>
      </section>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher un championnat..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={competitionFilter} onChange={handleCompetitionChange}>
          {competitionOptions.map(competition => (
            <option key={competition} value={competition}>{competition === 'all' ? 'Toutes les compétitions' : competition}</option>
          ))}
        </select>
      </div>

      <section className="championships-table">
        <h3>Championnats en Cours</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Compétition</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredChampionships.map(championship => (
              <tr key={championship.id}>
                <td>{championship.name}</td>
                <td>{championship.competition}</td>
                <td>{championship.status}</td>
                <td>
                  <a href={`/championship/${championship.id}/edit`}>Modifier</a>
                  <a href={`/championship/${championship.id}/schedule`}>Calendrier</a>
                  <a href={`/championship/${championship.id}/teams`}>Équipes</a>
                  <a href={`/championship/${championship.id}/results`}>Résultats</a>
                  <a href={`/championship/${championship.id}/standings`}>Classement</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Championship;
