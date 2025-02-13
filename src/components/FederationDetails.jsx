import React, { useState } from 'react';
import FederationLeaders from './FederationLeaders';
import FederationTechnicians from './FederationTechnicians';
import FederationReferees from './FederationReferees';
import FederationGeography from './FederationGeography';

const FederationDetails = () => {
  const [activeTab, setActiveTab] = useState('details');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <div>Details content here</div>;
      case 'leaders':
        return <FederationLeaders />;
      case 'technicians':
        return <FederationTechnicians />;
      case 'referees':
        return <FederationReferees />;
      case 'geography':
        return <FederationGeography />;
      default:
        return <div>Details content here</div>;
    }
  };

  return (
    <div className="federation-details">
      <div className="tab-bar">
        <button
          className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button
          className={`tab-button ${activeTab === 'leaders' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaders')}
        >
          Dirigeants
        </button>
        <button
          className={`tab-button ${activeTab === 'technicians' ? 'active' : ''}`}
          onClick={() => setActiveTab('technicians')}
        >
          Techniciens
        </button>
        <button
          className={`tab-button ${activeTab === 'referees' ? 'active' : ''}`}
          onClick={() => setActiveTab('referees')}
        >
          Arbitres
        </button>
        <button
          className={`tab-button ${activeTab === 'geography' ? 'active' : ''}`}
          onClick={() => setActiveTab('geography')}
        >
          Géographie
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default FederationDetails;
