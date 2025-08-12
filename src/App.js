import React, { useState } from 'react';
import './App.css';
import PlayerRankings from './components/PlayerRankings';
import DraftBoard from './components/DraftBoard';
import PositionTiers from './components/PositionTiers';
import { Filter, Users, Trophy, BarChart3 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('rankings');
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [draftPosition, setDraftPosition] = useState(1);
  const [leagueSize, setLeagueSize] = useState(12);

  const handleDraftPlayer = (player) => {
    if (!draftedPlayers.find(p => p.id === player.id)) {
      setDraftedPlayers([...draftedPlayers, { ...player, draftRound: Math.ceil(draftedPlayers.length / leagueSize) + 1, draftPick: draftedPlayers.length + 1 }]);
    }
  };

  const handleUndraftPlayer = (playerId) => {
    setDraftedPlayers(draftedPlayers.filter(p => p.id !== playerId));
  };

  const tabs = [
    { id: 'rankings', label: 'Player Rankings', icon: <Trophy size={20} /> },
    { id: 'draftboard', label: 'Draft Board', icon: <Users size={20} /> },
    { id: 'tiers', label: 'Position Tiers', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Filter size={20} /> }
  ];

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🏈 Fantasy Football Drafter</h1>
          <p>ESPN Rankings + 2024 PPR Points</p>
        </div>
      </header>

      <nav className="app-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="app-main">
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
            draftPosition={draftPosition}
            leagueSize={leagueSize}
          />
        )}
        
        {activeTab === 'tiers' && (
          <PositionTiers />
        )}
        
        {activeTab === 'settings' && (
          <div className="settings-panel">
            <h2>Draft Settings</h2>
            <div className="setting-group">
              <label htmlFor="draftPosition">Your Draft Position:</label>
              <select 
                id="draftPosition" 
                value={draftPosition} 
                onChange={(e) => setDraftPosition(parseInt(e.target.value))}
              >
                {Array.from({ length: leagueSize }, (_, i) => i + 1).map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
            <div className="setting-group">
              <label htmlFor="leagueSize">League Size:</label>
              <select 
                id="leagueSize" 
                value={leagueSize} 
                onChange={(e) => setLeagueSize(parseInt(e.target.value))}
              >
                {[8, 10, 12, 14, 16].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <div className="setting-group">
              <button 
                className="clear-draft-btn"
                onClick={() => setDraftedPlayers([])}
              >
                Clear Draft Board
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Data based on ESPN Fantasy Football 2025 Draft Kit & 2024 PPR Points</p>
      </footer>
    </div>
  );
}

export default App;
