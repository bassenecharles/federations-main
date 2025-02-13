import React from 'react';
import './Archives.css';

function Archives() {
  // Dummy data for previous seasons
  const previousSeasons = [
    { id: 1, year: 2023, description: 'Saison 2023' },
    { id: 2, year: 2022, description: 'Saison 2022' },
    { id: 3, year: 2021, description: 'Saison 2021' },
  ];

  return (
    <div className="archives-page">
      <h2>Archives des Saisons Précédentes</h2>

      <section className="season-list">
        <h3>Saisons</h3>
        <ul>
          {previousSeasons.map(season => (
            <li key={season.id}>
              <span>{season.year} - {season.description}</span>
              <div className="archive-actions">
                <a href={`/archive/${season.year}/statistiques`}>Statistiques</a>
                <a href={`/archive/${season.year}/licencies`}>Licenciés</a>
                <a href={`/archive/${season.year}/competitions`}>Compétitions</a>
                <a href={`/archive/${season.year}/transferts`}>Transferts</a>
                <a href={`/archive/${season.year}/calendrier`}>Calendrier</a>
                <a href={`/archive/${season.year}/resultats`}>Résultats</a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Archives;
