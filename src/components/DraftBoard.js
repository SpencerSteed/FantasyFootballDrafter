import React, { useState } from 'react';

const DraftBoard = ({ draftedPlayers, onUndraftPlayer }) => {
  const [draftPosition, setDraftPosition] = useState(1);
  const [leagueSize, setLeagueSize] = useState(12);

  const handleUndraft = (playerId) => {
    onUndraftPlayer(playerId);
  };

  const getNextPick = () => {
    return Math.ceil((draftedPlayers.length + 1) / leagueSize);
  };

  const getPickInRound = () => {
    return ((draftedPlayers.length) % leagueSize) + 1;
  };

  return (
    <div className="draft-board">
      <h3>Draft Board</h3>
      
      <div className="draft-settings">
        <div className="setting-group">
          <label htmlFor="leagueSize">League Size:</label>
          <select
            id="leagueSize"
            value={leagueSize}
            onChange={(e) => setLeagueSize(Number(e.target.value))}
          >
            <option value={8}>8 Teams</option>
            <option value={10}>10 Teams</option>
            <option value={12}>12 Teams</option>
            <option value={14}>14 Teams</option>
            <option value={16}>16 Teams</option>
          </select>
        </div>
        
        <div className="setting-group">
          <label htmlFor="draftPosition">Your Draft Position:</label>
          <select
            id="draftPosition"
            value={draftPosition}
            onChange={(e) => setDraftPosition(Number(e.target.value))}
          >
            {Array.from({ length: leagueSize }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="draft-status">
        <p>
          <strong>Next Pick:</strong> Round {getNextPick()}, Pick {getPickInRound()}
        </p>
        <p>
          <strong>Your Next Pick:</strong> Round {Math.ceil((draftedPlayers.length + 1) / leagueSize)}, 
          Pick {draftPosition}
        </p>
      </div>

      {draftedPlayers.length === 0 ? (
        <div className="empty-state">
          <h4>No players drafted yet</h4>
          <p>Start drafting players from the Player Rankings tab!</p>
        </div>
      ) : (
        <div className="drafted-players">
          {draftedPlayers.map((player, index) => (
            <div key={player.id} className="drafted-player">
              <div className="player-info">
                <div className="player-name">{player.name}</div>
                <div className="player-details">
                  {player.position} • {player.team} • Round {Math.ceil((index + 1) / leagueSize)}, Pick {((index) % leagueSize) + 1}
                </div>
              </div>
              <div className="draft-pick">
                #{index + 1}
              </div>
              <button
                className="undraft-button"
                onClick={() => handleUndraft(player.id)}
              >
                Undraft
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DraftBoard;
