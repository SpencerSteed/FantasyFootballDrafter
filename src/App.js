import React, { useState } from 'react';
import './App.css';
import PlayerRankings from './components/PlayerRankings';
import DraftBoard from './components/DraftBoard';
import PositionTiers from './components/PositionTiers';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('rankings');
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDraftPlayer = (player) => {
    if (!draftedPlayers.find(p => p.id === player.id)) {
      setDraftedPlayers([...draftedPlayers, player]);
    }
  };

  const handleUndraftPlayer = (playerId) => {
    setDraftedPlayers(draftedPlayers.filter(p => p.id !== playerId));
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <div className="header-content">
          <h1>Spencer Steed's Fantasy Football Drafting Tool</h1>
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <nav className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'rankings' ? 'active' : ''}`}
          onClick={() => setActiveTab('rankings')}
        >
          Player Rankings
        </button>
        <button 
          className={`tab-button ${activeTab === 'draftboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('draftboard')}
        >
          Draft Board
        </button>
        <button 
          className={`tab-button ${activeTab === 'tiers' ? 'active' : ''}`}
          onClick={() => setActiveTab('tiers')}
        >
          Position Tiers
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'rankings' && (
          <PlayerRankings 
            onDraftPlayer={handleDraftPlayer}
            draftedPlayers={draftedPlayers}
          />
        )}
        
        {activeTab === 'draftboard' && (
          <DraftBoard 
            draftedPlayers={draftedPlayers}
            onUndraftPlayer={handleUndraftPlayer}
          />
        )}
        
        {activeTab === 'tiers' && (
          <PositionTiers />
        )}
      </main>
    </div>
  );
}

export default App;
