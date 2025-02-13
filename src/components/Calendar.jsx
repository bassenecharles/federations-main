import React, { useState } from 'react';
import './Calendar.css';

function Calendar() {
  const [schedule, setSchedule] = useState([]);
  const [teams, setTeams] = useState([
    'Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H'
  ]); // Dummy team data
  const [showCompetitionPopup, setShowCompetitionPopup] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [numberOfPools, setNumberOfPools] = useState(2); // Default to 2 pools
  const [calendarFilter, setCalendarFilter] = useState('all'); // Filter for existing calendars
  const [showManualEntry, setShowManualEntry] = useState(false); // Show manual entry form
  const [newMatch, setNewMatch] = useState({
    team1: '',
    team2: '',
    date: '',
    location: '',
    competition: '',
    referee: '',
    commissioner: '',
  });

  // Dummy data for referees and commissioners
  const referees = ['Referee 1', 'Referee 2', 'Referee 3'];
  const commissioners = ['Commissioner A', 'Commissioner B', 'Commissioner C'];

  const generateSchedule = () => {
    setShowCompetitionPopup(true);
  };

  const handleCompetitionSelect = (competition) => {
    setSelectedCompetition(competition);
  };

  const handlePoolsChange = (event) => {
    setNumberOfPools(parseInt(event.target.value, 10));
  };

  const handleGenerateConfirm = () => {
    setShowCompetitionPopup(false);

    // Basic round-robin algorithm with pools
    if (teams.length < 2) {
      alert('Add at least two teams to generate a schedule.');
      return;
    }

    const teamsPerPool = Math.ceil(teams.length / numberOfPools);
    const pools = [];
    for (let i = 0; i < numberOfPools; i++) {
      pools.push(teams.slice(i * teamsPerPool, (i + 1) * teamsPerPool));
    }

    const newSchedule = [];
    pools.forEach(pool => {
      for (let i = 0; i < pool.length; i++) {
        for (let j = i + 1; j < pool.length; j++) {
          newSchedule.push({
            team1: pool[i],
            team2: pool[j],
            date: 'TBD', // To be determined
            location: 'TBD', // To be determined
            competition: selectedCompetition, // Assign the selected competition
            type: 'regular', // Mark as regular season game
          });
        }
      }
    });

    setSchedule(newSchedule);
    setCalendarFilter(selectedCompetition); // Set the filter to the generated competition
  };

  const handleGenerateCancel = () => {
    setShowCompetitionPopup(false);
    setSelectedCompetition('');
    setNumberOfPools(2); // Reset to default
  };

  const handleCalendarFilterChange = (event) => {
    setCalendarFilter(event.target.value);
  };

  const filteredSchedule = calendarFilter === 'all' ? schedule : schedule.filter(match => match.competition === calendarFilter);

  // Dummy data for playoffs (replace with actual logic)
  const playoffsTeams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H'];
  const playoffsRound1 = [
    { team1: playoffsTeams[0], team2: playoffsTeams[1] },
    { team1: playoffsTeams[2], team2: playoffsTeams[3] },
    { team1: playoffsTeams[4], team2: playoffsTeams[5] },
    { team1: playoffsTeams[6], team2: playoffsTeams[7] },
  ];
  const playoffsRound2 = [
    { team1: 'Winner 1', team2: 'Winner 2' },
    { team1: 'Winner 3', team2: 'Winner 4' },
  ];
  const playoffsFinals = [{ team1: 'Winner 5', team2: 'Winner 6' }];

  const allCompetitions = ['all', ...new Set(schedule.map(match => match.competition))];

  const handleManualEntryClick = () => {
    setShowManualEntry(true);
  };

  const handleManualEntryChange = (event) => {
    setNewMatch({ ...newMatch, [event.target.name]: event.target.value });
  };

  const handleManualEntrySubmit = (event) => {
    event.preventDefault();
    setSchedule([...schedule, { ...newMatch, type: 'regular' }]);
    setShowManualEntry(false);
    setNewMatch({ team1: '', team2: '', date: '', location: '', competition: '', referee: '', commissioner: '' });
  };

  return (
    <div className="calendar-page">
      <h2>Calendrier des Rencontres</h2>

      <section className="calendar-management">
        <h3>Gestion du Calendrier</h3>
        <div className="actions-container">
          <button onClick={generateSchedule}>Générer le Calendrier</button>
          <button onClick={handleManualEntryClick}>Saisie Manuelle</button>
          {/* Add more buttons for manual scheduling, importing, etc. */}
        </div>
      </section>

      {showCompetitionPopup && (
        <div className="competition-popup">
          <h3>Sélectionner une Compétition</h3>
          <div className="competition-options">
            <button
              className={selectedCompetition === 'League A' ? 'selected' : ''}
              onClick={() => handleCompetitionSelect('League A')}
            >
              League A
            </button>
            <button
              className={selectedCompetition === 'League B' ? 'selected' : ''}
              onClick={() => handleCompetitionSelect('League B')}
            >
              League B
            </button>
            {/* Add more competition options as needed */}
          </div>

          <div className="pools-input">
            <label htmlFor="pools">Nombre de Poules:</label>
            <input
              type="number"
              id="pools"
              value={numberOfPools}
              onChange={handlePoolsChange}
              min="1"
            />
          </div>

          <div className="popup-actions">
            <button onClick={handleGenerateConfirm}>Valider</button>
            <button onClick={handleGenerateCancel}>Annuler</button>
          </div>
        </div>
      )}

      {showManualEntry && (
        <div className="manual-entry-form">
          <h3>Saisie Manuelle d'une Rencontre</h3>
          <form onSubmit={handleManualEntrySubmit}>
            <input type="text" name="team1" placeholder="Équipe 1" value={newMatch.team1} onChange={handleManualEntryChange} />
            <input type="text" name="team2" placeholder="Équipe 2" value={newMatch.team2} onChange={handleManualEntryChange} />
            <input type="date" name="date" value={newMatch.date} onChange={handleManualEntryChange} />
            <input type="text" name="location" placeholder="Lieu" value={newMatch.location} onChange={handleManualEntryChange} />
            <input type="text" name="competition" placeholder="Compétition" value={newMatch.competition} onChange={handleManualEntryChange} />
            <select name="referee" value={newMatch.referee} onChange={handleManualEntryChange}>
              <option value="">Sélectionner un Arbitre</option>
              {referees.map(referee => (
                <option key={referee} value={referee}>{referee}</option>
              ))}
            </select>
            <select name="commissioner" value={newMatch.commissioner} onChange={handleManualEntryChange}>
              <option value="">Sélectionner un Commissaire</option>
              {commissioners.map(commissioner => (
                <option key={commissioner} value={commissioner}>{commissioner}</option>
              ))}
            </select>
            <button type="submit">Ajouter la Rencontre</button>
          </form>
        </div>
      )}

      <div className="filters-container">
        <label htmlFor="calendarFilter">Filtrer par Calendrier:</label>
        <select id="calendarFilter" value={calendarFilter} onChange={handleCalendarFilterChange}>
          {allCompetitions.map(competition => (
            <option key={competition} value={competition}>{competition === 'all' ? 'Tous les Calendriers' : competition}</option>
          ))}
        </select>
      </div>

      <section className="schedule-display">
        <h3>Rencontres (Saison Régulière)</h3>
        {filteredSchedule.length === 0 ? (
          <p>Aucune rencontre programmée. Générez le calendrier!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Équipe 1</th>
                <th>Équipe 2</th>
                <th>Date</th>
                <th>Lieu</th>
                <th>Compétition</th>
                <th>Arbitre</th>
                <th>Commissaire</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedule.filter(match => match.type === 'regular').map((match, index) => (
                <tr key={index}>
                  <td>{match.team1}</td>
                  <td>{match.team2}</td>
                  <td>{match.date}</td>
                  <td>{match.location}</td>
                  <td>{match.competition}</td>
                  <td>{match.referee}</td>
                  <td>{match.commissioner}</td>
                  <td>
                    <a href="/calendar/edit">Modifier</a>
                    {/* Add more actions like "Postponed", "Cancel", etc. */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="playoffs-display">
        <h3>Playoffs</h3>
        <div className="playoff-bracket">
          <div className="round">
            <h4>Round 1</h4>
            {playoffsRound1.map((match, index) => (
              <div className="match" key={index}>
                <span>{match.team1} vs {match.team2}</span>
              </div>
            ))}
          </div>
          <div className="round">
            <h4>Round 2</h4>
            {playoffsRound2.map((match, index) => (
              <div className="match" key={index}>
                <span>{match.team1} vs {match.team2}</span>
              </div>
            ))}
          </div>
          <div className="round">
            <h4>Finals</h4>
            {playoffsFinals.map((match, index) => (
              <div className="match" key={index}>
                <span>{match.team1} vs {match.team2}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Calendar;
