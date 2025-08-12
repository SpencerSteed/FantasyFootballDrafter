# 🏈 Fantasy Football Draft Helper

A comprehensive React-based fantasy football draft assistant that uses **ESPN's 2025 Top 50 Rankings** with **2024 Fantasy Points Data** to help you dominate your draft.

## ✨ Features

- **Player Rankings**: View ESPN's top 50 players with current 2025 rankings and 2024 fantasy points
- **2024 Fantasy Data**: Average points per week and total season points for informed decisions
- **Position Tiers**: Organize players by position and tier for better draft strategy
- **Draft Board**: Track your draft progress with a visual draft board
- **Team Composition**: Monitor your roster balance across positions
- **Search & Filter**: Find players quickly by name, team, or position
- **Sortable Columns**: Sort by rank, tier, ADP, 2024 average points, or 2024 total points
- **Draft Settings**: Configure league size and draft position
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd FantasyFootballDrafter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Use

### Player Rankings Tab
- **Search**: Find players by name or team
- **Filter**: View players by position (QB, RB, WR, TE)
- **Sort**: Click column headers to sort by any metric
- **Draft**: Click "Draft" button to add players to your team
- **2024 Data**: View average weekly points and total season points

### Position Tiers Tab
- **Expandable Sections**: Click on position headers to view players by tier
- **Tier Strategy**: Each tier has descriptions and strategic advice
- **Player Stats**: See rank, 2024 fantasy points, ADP, and notes for each player

### Draft Board Tab
- **Visual Draft**: See your picks organized by round and pick number
- **Team Overview**: Track position distribution and total players drafted
- **Undraft**: Remove players if you change your mind

### Settings Tab
- **League Size**: Set your league size (default: 12 teams)
- **Draft Position**: Set your draft position (1-12)
- **Clear Draft**: Reset your draft board

## 📊 Data Sources

- **ESPN 2025 Rankings**: Top 50 players for the 2025 season
- **2024 Fantasy Points**: Weekly averages and season totals from actual performance
- **Player Notes**: Current analysis including team changes, coaching impacts, and situation updates

## 🏆 Top Players (ESPN 2025)

### Top 10 Overall
1. **Ja'Marr Chase (WR)** - Bengals - 23.7 avg, 403 total
2. **Bijan Robinson (RB)** - Falcons - 20.1 avg, 341.7 total
3. **Justin Jefferson (WR)** - Vikings - 18.7 avg, 317.5 total
4. **Saquon Barkley (RB)** - Eagles - 22.2 avg, 355.3 total
5. **Jahmyr Gibbs (RB)** - Lions - 21.3 avg, 362.9 total

### Position Leaders
- **QB**: Lamar Jackson (25.6 avg, 434.4 total)
- **RB**: Saquon Barkley (22.2 avg, 355.3 total)
- **WR**: Ja'Marr Chase (23.7 avg, 403 total)
- **TE**: Brock Bowers (15.5 avg, 262.7 total)

## 🎨 Features in Detail

### Sorting & Filtering
- **Rank**: ESPN's 2025 ranking order
- **Tier**: Fantasy tier classification (1-7)
- **ADP**: Average Draft Position
- **2024 Avg**: 2024 weekly fantasy point average
- **2024 Total**: 2024 season fantasy point total

### Draft Strategy
- **Early Rounds (1-3)**: Focus on Tier 1-2 players
- **Middle Rounds (4-8)**: Target Tier 3-4 players for value
- **Late Rounds (9+)**: Take fliers on Tier 5+ players

### Position Strategy
- **RB Early**: Secure running back depth in early rounds
- **WR Depth**: Build wide receiver depth throughout draft
- **QB Value**: Wait for quarterback value to present itself
- **TE Strategy**: Draft elite TEs early or wait for value

## 🛠️ Built With

- **React 18**: Modern React with hooks and functional components
- **CSS3**: Custom styling with responsive design
- **Lucide React**: Beautiful, customizable icons
- **ES6+**: Modern JavaScript features

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Available Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm run eject`: Ejects from Create React App (not recommended)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you have any questions or need help with the app, please open an issue in the repository.

---

**Happy Drafting! 🏈⚡**