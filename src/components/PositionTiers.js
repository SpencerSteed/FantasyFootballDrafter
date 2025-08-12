import React, { useState } from 'react';
import { players } from '../data/players';
import { ChevronDown, ChevronRight } from 'lucide-react';

const PositionTiers = () => {
  const [expandedPositions, setExpandedPositions] = useState(['RB', 'WR']);

  const togglePosition = (position) => {
    setExpandedPositions(prev => 
      prev.includes(position) 
        ? prev.filter(p => p !== position)
        : [...prev, position]
    );
  };

  const getPlayersByPositionAndTier = () => {
    const positions = ['QB', 'RB', 'WR', 'TE'];
    const result = {};
    
    positions.forEach(pos => {
      result[pos] = {};
      const posPlayers = players.filter(p => p.position === pos);
      
      posPlayers.forEach(player => {
        if (!result[pos][player.tier]) {
          result[pos][player.tier] = [];
        }
        result[pos][player.tier].push(player);
      });
      
      // Sort tiers and players within tiers
      Object.keys(result[pos]).forEach(tier => {
        result[pos][tier].sort((a, b) => a.rank - b.rank);
      });
    });
    
    return result;
  };

  const getTierColor = (tier) => {
    const colors = {
      1: '#10B981', // Green
      2: '#3B82F6', // Blue
      3: '#8B5CF6', // Purple
      4: '#F59E0B', // Yellow
      5: '#EF4444', // Red
      6: '#6B7280', // Gray
      7: '#8B5CF6', // Purple
      8: '#F59E0B', // Yellow
      9: '#EF4444', // Red
      10: '#6B7280' // Gray
    };
    return colors[tier] || '#6B7280';
  };

  const getTierDescription = (tier) => {
    const descriptions = {
      1: 'Elite - Must draft early',
      2: 'High-end - Great value',
      3: 'Solid - Reliable starters',
      4: 'Good - Upside potential',
      5: 'Average - Depth players',
      6: 'Bench - Limited upside',
      7: 'Deep - Emergency options',
      8: 'Very Deep - Avoid unless necessary',
      9: 'Extremely Deep - Last resort',
      10: 'Avoid - Better options available'
    };
    return descriptions[tier] || 'Unknown tier';
  };

  const positionData = getPlayersByPositionAndTier();

  return (
    <div className="position-tiers">
      <div className="tiers-header">
        <h2>Position Tiers</h2>
        <p>Organize players by position and tier for better draft strategy</p>
      </div>

      <div className="tiers-container">
        {Object.keys(positionData).map(position => {
          const isExpanded = expandedPositions.includes(position);
          const positionPlayers = positionData[position];
          const totalPlayers = Object.values(positionPlayers).flat().length;
          
          return (
            <div key={position} className="position-section">
              <div 
                className="position-header"
                onClick={() => togglePosition(position)}
              >
                <div className="position-title">
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  <h3>{position}</h3>
                  <span className="player-count">({totalPlayers} players)</span>
                </div>
              </div>
              
              {isExpanded && (
                <div className="tiers-content">
                  {Object.keys(positionPlayers)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map(tier => (
                      <div key={tier} className="tier-group">
                        <div className="tier-header">
                          <span 
                            className="tier-badge"
                            style={{ backgroundColor: getTierColor(tier) }}
                          >
                            Tier {tier}
                          </span>
                          <span className="tier-description">
                            {getTierDescription(tier)}
                          </span>
                          <span className="tier-count">
                            ({positionPlayers[tier].length} players)
                          </span>
                        </div>
                        
                        <div className="tier-players">
                          {positionPlayers[tier].map(player => (
                            <div key={player.id} className="tier-player">
                              <div className="player-info">
                                <span className="player-name">{player.name}</span>
                                <span className="player-team">{player.team}</span>
                              </div>
                                                                                             <div className="player-stats">
                                  <span className="rank">#{player.rank}</span>
                                  <span className="avg-points">{player.avgPoints} 2024 avg</span>
                                  <span className="total-points">{player.totalPoints} 2024 total</span>
                                  <span className="adp">{player.adp} ADP</span>
                                </div>
                              <div className="player-notes">
                                {player.notes}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="tiers-strategy">
        <h3>Draft Strategy Tips</h3>
        <div className="strategy-grid">
          <div className="strategy-card">
            <h4>Early Rounds (1-3)</h4>
            <p>Focus on Tier 1-2 players. Don't reach for QBs unless they're elite. RB and WR depth is crucial.</p>
          </div>
          <div className="strategy-card">
            <h4>Middle Rounds (4-8)</h4>
            <p>Target Tier 3-4 players. Look for value and upside. Consider positional scarcity.</p>
          </div>
          <div className="strategy-card">
            <h4>Late Rounds (9+)</h4>
            <p>Take fliers on Tier 5+ players. Focus on handcuffs and high-upside backups.</p>
          </div>
          <div className="strategy-card">
            <h4>Position Strategy</h4>
            <p>RB early, WR depth, QB when value presents, TE after the elite options are gone.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionTiers;
