import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import FederationDetails from './FederationDetails';
import FederationLeaders from './FederationLeaders';
import FederationTechnicians from './FederationTechnicians';
import FederationReferees from './FederationReferees';
import FederationGeography from './FederationGeography';

function FederationSettings() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="federation-settings">
      <h2>Fédération</h2>
      <div className="tab-menu">
        <Link to="/federation-details" className={isActive("/federation-details")}>Détails de la fédération</Link>
        <Link to="/federation-leaders" className={isActive("/federation-leaders")}>Dirigeants</Link>
        <Link to="/federation-technicians" className={isActive("/federation-technicians")}>Techniciens</Link>
        <Link to="/federation-referees" className={isActive("/federation-referees")}>Arbitres</Link>
        <Link to="/federation-geography" className={isActive("/federation-geography")}>Géographie</Link>
      </div>

      <Routes>
        <Route path="/federation-details" element={<FederationDetails />} />
        <Route path="/federation-leaders" element={<FederationLeaders />} />
        <Route path="/federation-technicians" element={<FederationTechnicians />} />
        <Route path="/federation-referees" element={<FederationReferees />} />
        <Route path="/federation-geography" element={<FederationGeography />} />
      </Routes>
    </div>
  );
}

export default FederationSettings;
