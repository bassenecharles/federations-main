import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Tableau de bord</h2>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card blue">
          <h3>Total Licenciés</h3>
          <p>24,521</p>
          <p className="percentage">+12% ce mois</p>
        </div>

        <div className="dashboard-card purple">
          <h3>Clubs Actifs</h3>
          <p>1,284</p>
          <p className="percentage">+3 cette semaine</p>
        </div>

        <div className="dashboard-card green">
          <h3>Compétitions</h3>
          <p>47</p>
          <p className="percentage">Ce mois-ci</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Évolution des licenciés</h3>
          {/* Placeholder for chart */}
        </div>

        <div className="chart-container">
          <h3>Évolution des clubs</h3>
          {/* Placeholder for chart */}
        </div>

        <div className="chart-container">
          <h3>Statistiques Régionales</h3>
          {/* Placeholder for chart */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
