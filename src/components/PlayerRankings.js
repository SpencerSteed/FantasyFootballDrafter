import React, { useState, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { players } from '../data/players';

const PlayerRankings = ({ onDraftPlayer, draftedPlayers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('ALL');
  const [sortField, setSortField] = useState('rank');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = players.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = positionFilter === 'ALL' || player.position === positionFilter;
      return matchesSearch && matchesPosition;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, positionFilter, sortField, sortDirection]);

  const isDrafted = (playerId) => {
    return draftedPlayers.some(drafted => drafted.id === playerId);
  };

  const handleDraftClick = (player) => {
    if (isDrafted(player.id)) {
      return;
    }
    onDraftPlayer(player);
  };

  return (
    <div className="rankings-container">
      <div className="search-filters">
        <h3>Updated with 2024 Points and 2025 ESPN ADP</h3>
        <div className="filter-controls">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
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
            <option value="K">K</option>
            <option value="DST">DST</option>
          </select>
        </div>
      </div>

      <div className="rankings-table-container">
        <table className="rankings-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('rank')} className="sortable">Rank<ArrowUpDown size={16} /></th>
              <th onClick={() => handleSort('tier')} className="sortable">Tier<ArrowUpDown size={16} /></th>
              <th>Player</th>
              <th>Pos</th>
              <th>Team</th>
              <th onClick={() => handleSort('adp')} className="sortable">ADP<ArrowUpDown size={16} /></th>
              <th onClick={() => handleSort('avgPoints')} className="sortable">2024 Avg<ArrowUpDown size={16} /></th>
              <th onClick={() => handleSort('totalPoints')} className="sortable">2024 Total<ArrowUpDown size={16} /></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedPlayers.map(player => (
              <tr key={player.id} className={isDrafted(player.id) ? 'drafted' : ''}>
                <td className="rank-cell">{player.rank}</td>
                <td className="tier-cell">
                  <span className="tier-badge">{player.tier}</span>
                </td>
                <td className="player-name">{player.name}</td>
                <td className="position-cell">
                  <span className={`position-badge ${player.position.toLowerCase()}`}>
                    {player.position}
                  </span>
                </td>
                <td className="team-cell">{player.team}</td>
                <td className="adp-cell">{player.adp}</td>
                <td className="avg-points-cell">{player.avgPoints}</td>
                <td className="total-points-cell">{player.totalPoints}</td>
                <td className="action-cell">
                  {isDrafted(player.id) ? (
                    <span className="drafted-text">Drafted</span>
                  ) : (
                    <button
                      className="draft-button"
                      onClick={() => handleDraftClick(player)}
                    >
                      Draft
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerRankings;
