import React from 'react';
import { players } from '../data/players';

const PositionTiers = () => {
  const getPlayersByPosition = (position) => {
    return players.filter(player => player.position === position);
  };

  const getPlayersByTier = (position, tier) => {
    return getPlayersByPosition(position).filter(player => player.tier === tier);
  };

  const positions = ['QB', 'RB', 'WR', 'TE', 'K', 'DST'];

  return (
    <div className="tiers-container">
      <h3>Position Tiers</h3>
      
      {positions.map(position => {
        const positionPlayers = getPlayersByPosition(position);
        const tiers = [...new Set(positionPlayers.map(p => p.tier))].sort((a, b) => a - b);
        
        return (
          <div key={position} className="position-section">
            <h4 className="position-title">{position} ({positionPlayers.length} players)</h4>
            
            {tiers.map(tier => {
              const tierPlayers = getPlayersByTier(position, tier);
              
              return (
                <div key={tier} className="tier-group">
                  <div className="tier-header">
                    Tier {tier} ({tierPlayers.length} players)
                  </div>
                  <div className="tier-players">
                    {tierPlayers.map(player => (
                      <div key={player.id} className="tier-player">
                        <div className="player-name">{player.name} ({player.team})</div>
                        <div className="player-stats">
                          <span className="rank">#{player.rank}</span>
                          <span className="avg-points">{player.avgPoints} 2024 avg</span>
                          <span className="total-points">{player.totalPoints} 2024 total</span>
                          <span className="adp">{player.adp} ADP</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PositionTiers;
