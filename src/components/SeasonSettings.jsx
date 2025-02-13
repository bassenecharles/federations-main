import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import SeasonDetails from './SeasonDetails';
import SeasonLicences from './SeasonLicences';
import SeasonTournaments from './SeasonTournaments';

function SeasonSettings() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="season-settings">
      <h2>Saison</h2>
      <div className="tab-menu">
        <Link to="/season-details" className={isActive("/season-details")}>Saison</Link>
        <Link to="/season-licences" className={isActive("/season-licences")}>Licences</Link>
        <Link to="/season-tournaments" className={isActive("/season-tournaments")}>Tournoi</Link>
      </div>

      <Routes>
        <Route path="/season-details" element={<SeasonDetails />} />
        <Route path="/season-licences" element={<SeasonLicences />} />
        <Route path="/season-tournaments" element={<SeasonTournaments />} />
      </Routes>
    </div>
  );
}

export default SeasonSettings;
