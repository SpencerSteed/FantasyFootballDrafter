import React, { useState, useMemo } from 'react';
import { players } from '../data/players';
import { Search, Filter, ArrowUpDown, CheckCircle } from 'lucide-react';

const PlayerRankings = ({ onDraftPlayer, draftedPlayers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = players.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.team.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = positionFilter === 'ALL' || player.position === positionFilter;
      return matchesSearch && matchesPosition;
    });

         filtered.sort((a, b) => {
       let aValue = a[sortBy];
       let bValue = b[sortBy];
       
       if (sortOrder === 'asc') {
         return aValue > bValue ? 1 : -1;
       } else {
         return aValue < bValue ? 1 : -1;
       }
     });

    return filtered;
  }, [searchTerm, positionFilter, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
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

  const isDrafted = (playerId) => {
    return draftedPlayers.find(p => p.id === playerId);
  };

  return (
    <div className="player-rankings">
             <div className="rankings-header">
         <h2>Player Rankings</h2>
         <p>ESPN 2025 Top 50 Rankings with Fantasy Points</p>
       </div>

      <div className="rankings-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search players or teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="position-filter"
          >
            <option value="ALL">All Positions</option>
            <option value="QB">QB</option>
            <option value="RB">RB</option>
            <option value="WR">WR</option>
            <option value="TE">TE</option>
          </select>
        </div>
      </div>

      <div className="rankings-table-container">
        <table className="rankings-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('rank')} className="sortable">
                Rank
                <ArrowUpDown size={16} />
              </th>
              <th onClick={() => handleSort('tier')} className="sortable">
                Tier
                <ArrowUpDown size={16} />
              </th>
              <th>Player</th>
              <th>Pos</th>
              <th>Team</th>
                                    <th onClick={() => handleSort('adp')} className="sortable">
                        ADP
                        <ArrowUpDown size={16} />
                      </th>
                      <th onClick={() => handleSort('avgPoints')} className="sortable">
                        2024 Avg
                        <ArrowUpDown size={16} />
                      </th>
                      <th onClick={() => handleSort('totalPoints')} className="sortable">
                        2024 Total
                        <ArrowUpDown size={16} />
                      </th>
                      <th>Notes</th>
                      <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedPlayers.map((player) => (
              <tr 
                key={player.id} 
                className={`player-row ${isDrafted(player.id) ? 'drafted' : ''}`}
              >
                <td className="rank-cell">{player.rank}</td>
                <td className="tier-cell">
                  <span 
                    className="tier-badge"
                    style={{ backgroundColor: getTierColor(player.tier) }}
                  >
                    {player.tier}
                  </span>
                </td>
                <td className="player-name">
                  {player.name}
                  {isDrafted(player.id) && <CheckCircle size={16} className="drafted-icon" />}
                </td>
                <td className="position-cell">{player.position}</td>
                                        <td className="team-cell">{player.team}</td>
                        <td className="adp-cell">{player.adp}</td>
                        <td className="avg-points-cell">{player.avgPoints}</td>
                        <td className="total-points-cell">{player.totalPoints}</td>
                        <td className="notes-cell">{player.notes}</td>
                <td className="action-cell">
                  {!isDrafted(player.id) ? (
                    <button
                      className="draft-btn"
                      onClick={() => onDraftPlayer(player)}
                    >
                      Draft
                    </button>
                  ) : (
                    <span className="drafted-text">Drafted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rankings-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Total Players:</span>
            <span className="stat-value">{filteredAndSortedPlayers.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Drafted:</span>
            <span className="stat-value">{draftedPlayers.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Available:</span>
            <span className="stat-value">{filteredAndSortedPlayers.length - draftedPlayers.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRankings;
