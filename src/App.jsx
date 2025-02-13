import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Federations from './components/Federations';
import Teams from './components/Teams';
import Events from './components/Events';
import Archives from './components/Archives';
import RegionalLeagues from './components/RegionalLeagues';
import Committees from './components/Committees';
import Districts from './components/Districts';
import Clubs from './components/Clubs';
import Championship from './components/Championship';
import Calendar from './components/Calendar';
import Registrations from './components/Registrations';
import MatchSheet from './components/MatchSheet';
import MatchReport from './components/MatchReport';
import Licensed from './components/Licensed';
import Referees from './components/Referees';
import Technicians from './components/Technicians';
import Finances from './components/Finances';
import Communications from './components/Communications';
import Settings from './components/Settings';
import SeasonSettings from './components/SeasonSettings';
import CompetitionSettings from './components/CompetitionSettings';
import PreferencesSettings from './components/PreferencesSettings';
import FederationDetails from './components/FederationDetails';
import FederationLeaders from './components/FederationLeaders';
import FederationTechnicians from './components/FederationTechnicians';
import FederationReferees from './components/FederationReferees';
import FederationGeography from './components/FederationGeography';
import SeasonDetails from './components/SeasonDetails';
import SeasonLicences from './components/SeasonLicences';
import SeasonTournaments from './components/SeasonTournaments';
import ReglesInternes from './components/ReglesInternes';
import PersonnelFederal from './components/PersonnelFederal'; // Import PersonnelFederal component
import './App.css';

function App() {
  const [theme, setTheme] = useState('light'); // Default theme is light
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSections, setOpenSections] = useState({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for profile dropdown
  const [customEffects, setCustomEffects] = useState({ // State for custom effects
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#f9f9f9',
    textColor: '#444',
  });

  useEffect(() => {
    document.body.className = theme;
    applyCustomEffects(); // Apply custom effects on theme change
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSection = (section) => {
    setOpenSections(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setOpenSections(prevState => ({
      ...prevState,
      'administration': true // Open the administration section when settings is toggled
    }));
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const renderMenuItem = (path, iconClass, text) => (
    <li>
      <Link to={path}>
        <i className={`fas ${iconClass}`}></i>
        <span className={`menu-text ${isSidebarOpen ? 'menu-text-visible' : ''}`}>{text}</span>
      </Link>
    </li>
  );

  const applyCustomEffects = () => {
    document.body.style.fontFamily = customEffects.fontFamily;
    document.body.style.backgroundColor = customEffects.backgroundColor;
    document.body.style.color = customEffects.textColor;
  };

  const handlePreferencesChange = (newPreferences) => {
    setCustomEffects(newPreferences);
    applyCustomEffects(); // Apply custom effects when preferences change
  };

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        <div className={`sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="logo">
              <span className="logo-jappale">Jappalé</span>
            </div>
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
              <i className={`fas ${isSidebarOpen ? 'fa-bars' : 'fa-bars'}`}></i>
            </button>
          </div>
          <nav>
            <ul>
              {renderMenuItem("/dashboard", "fa-home", "Accueil")}
              {renderMenuItem("/federations", "fa-flag", "Fédération")}
              {renderMenuItem("/archives", "fa-archive", "Archives")}

              <li className="menu-section" onClick={() => toggleSection('structure')}>
                <i className={`fas fa-building`}></i>
                <span className={`menu-section-title ${isSidebarOpen ? 'menu-text-visible' : ''}`}>Structures</span>
                <i className={`fas fa-chevron-down ${openSections['structure'] ? 'open' : ''}`}></i>
              </li>
              {openSections['structure'] && (
                <ul className="menu-subsection">
                  {renderMenuItem("/regional-leagues", "fa-map-marked-alt", "Ligues")}
                  {renderMenuItem("/committees", "fa-users", "Comités")}
                  {renderMenuItem("/districts", "fa-building", "Districts")}
                  {renderMenuItem("/clubs", "fa-shield-alt", "Clubs")}
                </ul>
              )}

              <li className="menu-section" onClick={() => toggleSection('competitions')}>
                <i className={`fas fa-trophy`}></i>
                <span className={`menu-section-title ${isSidebarOpen ? 'menu-text-visible' : ''}`}>Compétitions</span>
                <i className={`fas fa-chevron-down ${openSections['competitions'] ? 'open' : ''}`}></i>
              </li>
              {openSections['competitions'] && (
                <ul className="menu-subsection">
                  {renderMenuItem("/championship", "fa-trophy", "Championnat")}
                  {renderMenuItem("/calendar", "fa-calendar-alt", "Calendrier")}
                  {renderMenuItem("/registrations", "fa-user-plus", "Inscriptions")}
                  {renderMenuItem("/match-report", "fa-clipboard-list", "Rapport Match")}
                </ul>
              )}

              <li className="menu-section" onClick={() => toggleSection('members')}>
                <i className={`fas fa-users`}></i>
                <span className={`menu-section-title ${isSidebarOpen ? 'menu-text-visible' : ''}`}>Membres</span>
                <i className={`fas fa-chevron-down ${openSections['members'] ? 'open' : ''}`}></i>
              </li>
              {openSections['members'] && (
                <ul className="menu-subsection">
                  {renderMenuItem("/licensed", "fa-user-graduate", "Licenciés")}
                  {renderMenuItem("/referees", "fa-gavel", "Arbitres")}
                  {renderMenuItem("/technicians", "fa-wrench", "Techniciens")}
                  {renderMenuItem("/personnel-federal", "fa-user-tie", "Personnel Fédéral")}
                </ul>
              )}

              <li className="menu-section" onClick={() => toggleSection('administration')}>
                <i className={`fas fa-cog`}></i>
                <span className={`menu-section-title ${isSidebarOpen ? 'menu-text-visible' : ''}`}>Administration</span>
                <i className={`fas fa-chevron-down ${openSections['administration'] ? 'open' : ''}`}></i>
              </li>
              {openSections['administration'] && (
                <ul className="menu-subsection">
                  {renderMenuItem("/finances", "fa-money-bill-wave", "Finances")}
                  {renderMenuItem("/communications", "fa-envelope", "Communications")}
                  {renderMenuItem("/affiliations", "fa-link", "Affiliations/Ré-affiliations")}
                  {renderMenuItem("/license-requests", "fa-id-card", "Demande de Licence")}
                  </ul>
                   )}



              <li className="menu-section" onClick={() => toggleSection('parametres')}>
                <i className={`fas fa-cog`}></i>
                <span className={`menu-section-title ${isSidebarOpen ? 'menu-text-visible' : ''}`}>Paramètres</span>
                <i className={`fas fa-chevron-down ${openSections['parametres'] ? 'open' : ''}`}></i>
              </li>
              {openSections['parametres'] && (
                  
                  <ul className="menu-subsection">
                   {renderMenuItem("/regles-internes", "fa-book", "Règles Internes")}
                   {renderMenuItem("/utilisateurs", "fa-users", "Utilisateurs")}
                   {renderMenuItem("/season-settings", "fa-calendar-alt", "Saison")}
                   {renderMenuItem("/preferences-settings", "fa-cog", "Préférences")}
                  </ul>
                )}
             
            </ul>
          </nav>
        </div>
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? 'Plier le menu' : 'Déplier le menu'}
        >
          <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
        </button>
        <main className="content">
          <header className="header">
            <input type="text" placeholder="Rechercher..." className="search-input" />
            <div className="user-profile">
              <button className="theme-toggle-btn" onClick={toggleTheme}>
                {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
              </button>
              <div className="profile-menu">
                <div className="profile-thumbnail" onClick={toggleProfile}>
                  <img src="https://via.placeholder.com/40" alt="Profile" />
                </div>
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <ul>
                      <li><Link to="/profile">Mon Profil</Link></li>
                      <li><Link to="/Messages">Messages</Link></li>
                      <li><Link to="/settings">Paramètres</Link></li>
                      <li><Link to="/logout">Déconnexion</Link></li>
                    </ul>
                  </div>
                )}
              </div>
                <span className="federation-name">Fédération</span>
            </div>
          </header>

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/federations" element={<Federations />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/events" element={<Events />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/regional-leagues" element={<RegionalLeagues />} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/districts" element={<Districts />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/championship" element={<Championship />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/registrations" element={<Registrations />} />
            <Route path="/match-report" element={<MatchReport />} />
            <Route path="/licensed" element={<Licensed />} />
            <Route path="/referees" element={<Referees />} />
            <Route path="/technicians" element={<Technicians />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/communications" element={<Communications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/season-settings" element={<SeasonSettings />} />
            <Route path="/competition-settings" element={<CompetitionSettings />} />
            <Route path="/preferences-settings" element={<PreferencesSettings onPreferencesChange={handlePreferencesChange} />} />
            <Route path="/federation-details" element={<FederationDetails />} />
            <Route path="/federation-leaders" element={<FederationLeaders />} />
            <Route path="/federation-technicians" element={<FederationTechnicians />} />
            <Route path="/federation-referees" element={<FederationReferees />} />
            <Route path="/federation-geography" element={<FederationGeography />} />
            <Route path="/season-details" element={<SeasonDetails />} />
            <Route path="/season-licences" element={<SeasonLicences />} />
            <Route path="/season-tournaments" element={<SeasonTournaments />} />
             <Route path="/regles-internes" element={<ReglesInternes />} />
             <Route path="/personnel-federal" element={<PersonnelFederal />} /> {/* Add the route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
