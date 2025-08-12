import React, { useMemo } from 'react';
import { X, Users, Trophy, Target } from 'lucide-react';

const DraftBoard = ({ draftedPlayers, onUndraftPlayer, draftPosition, leagueSize }) => {
  const rounds = useMemo(() => {
    const maxRounds = Math.ceil(draftedPlayers.length / leagueSize) + 1;
    return Array.from({ length: maxRounds }, (_, i) => i + 1);
  }, [draftedPlayers.length, leagueSize]);

  const getDraftPick = (round, pick) => {
    if (round % 2 === 1) {
      // Odd rounds: 1, 2, 3, 4...
      return (round - 1) * leagueSize + pick;
    } else {
      // Even rounds: 24, 23, 22, 21... (for 12-team league)
      return (round - 1) * leagueSize + (leagueSize - pick + 1);
    }
  };

  const getPlayerAtPick = (round, pick) => {
    const draftPickNumber = getDraftPick(round, pick);
    return draftedPlayers.find(p => p.draftPick === draftPickNumber);
  };

  const getPositionCounts = () => {
    return draftedPlayers.reduce((counts, player) => {
      counts[player.position] = (counts[player.position] || 0) + 1;
      return counts;
    }, {});
  };

  const positionCounts = getPositionCounts();

  return (
    <div className="draft-board">
      <div className="draft-header">
        <h2>Draft Board</h2>
        <p>Track your draft progress and team composition</p>
      </div>

      <div className="draft-overview">
        <div className="overview-cards">
          <div className="overview-card">
            <Users size={24} />
            <div>
              <h3>League Size</h3>
              <p>{leagueSize} teams</p>
            </div>
          </div>
          <div className="overview-card">
            <Target size={24} />
            <div>
              <h3>Your Position</h3>
              <p>#{draftPosition}</p>
            </div>
          </div>
          <div className="overview-card">
            <Trophy size={24} />
            <div>
              <h3>Players Drafted</h3>
              <p>{draftedPlayers.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="draft-board-container">
        <div className="draft-rounds">
          {rounds.map(round => (
            <div key={round} className="draft-round">
              <div className="round-header">
                <h3>Round {round}</h3>
              </div>
              <div className="round-picks">
                {Array.from({ length: leagueSize }, (_, i) => i + 1).map(pick => {
                  const player = getPlayerAtPick(round, pick);
                  const isYourPick = pick === draftPosition;
                  
                  return (
                    <div 
                      key={pick} 
                      className={`draft-pick ${isYourPick ? 'your-pick' : ''} ${player ? 'has-player' : ''}`}
                    >
                      <div className="pick-number">{pick}</div>
                      {player ? (
                        <div className="player-info">
                          <div className="player-name">{player.name}</div>
                          <div className="player-details">
                            <span className="position">{player.position}</span>
                            <span className="team">{player.team}</span>
                          </div>
                          <button
                            className="undraft-btn"
                            onClick={() => onUndraftPlayer(player.id)}
                            title="Remove from draft"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="empty-pick">
                          {isYourPick ? 'Your Pick' : 'Available'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="team-composition">
        <h3>Your Team Composition</h3>
        <div className="position-breakdown">
          {['QB', 'RB', 'WR', 'TE'].map(pos => (
            <div key={pos} className="position-count">
              <span className="position-label">{pos}:</span>
              <span className="position-number">{positionCounts[pos] || 0}</span>
            </div>
          ))}
        </div>
        
        {draftedPlayers.length > 0 && (
          <div className="drafted-players-list">
            <h4>Drafted Players</h4>
            <div className="players-grid">
              {draftedPlayers.map(player => (
                <div key={player.id} className="drafted-player-card">
                  <div className="player-header">
                    <span className="player-name">{player.name}</span>
                    <button
                      className="remove-btn"
                      onClick={() => onUndraftPlayer(player.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="player-details">
                    <span className="position">{player.position}</span>
                    <span className="team">{player.team}</span>
                  </div>
                  <div className="draft-info">
                    <span>Round {player.draftRound}, Pick {player.draftPick}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftBoard;
