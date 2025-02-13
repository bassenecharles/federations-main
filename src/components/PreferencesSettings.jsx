import React, { useState, useEffect } from 'react';
import './PreferencesSettings.css';

function PreferencesSettings({ onPreferencesChange }) {
  const [fontFamily, setFontFamily] = useState('Roboto, sans-serif');
  const [backgroundColor, setBackgroundColor] = useState('#f9f9f9');
  const [textColor, setTextColor] = useState('#444');

  useEffect(() => {
    // Apply initial preferences
    applyPreferences();
  }, []);

  const applyPreferences = () => {
    onPreferencesChange({
      fontFamily,
      backgroundColor,
      textColor,
    });
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyPreferences();
  };

  return (
    <div className="preferences-settings">
      <h2>Préférences</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fontFamily">Font Family:</label>
          <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="Times New Roman, serif">Times New Roman</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="backgroundColor">Background Color:</label>
          <input type="color" id="backgroundColor" value={backgroundColor} onChange={handleBackgroundColorChange} />
        </div>
        <div className="form-group">
          <label htmlFor="textColor">Text Color:</label>
          <input type="color" id="textColor" value={textColor} onChange={handleTextColorChange} />
        </div>
        <button type="submit">Appliquer</button>
      </form>
    </div>
  );
}

export default PreferencesSettings;
