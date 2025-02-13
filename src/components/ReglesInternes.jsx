import React, { useState } from 'react';

function ReglesInternes() {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="regles-internes">
      <div className="tab-bar">
        <button
          className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Détails de la fédération
        </button>
        <button
          className={`tab-button ${activeTab === 'structure' ? 'active' : ''}`}
          onClick={() => setActiveTab('structure')}
        >
          Structuration
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'details' && <div>Contenu de Détails de la fédération</div>}
        {activeTab === 'structure' && <div>Contenu de Structuration</div>}
      </div>
    </div>
  );
}

export default ReglesInternes;
