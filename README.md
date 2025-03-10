# Go Game in HTML, CSS, and JavaScript

A web-based implementation of the ancient strategy game Go. This project features a 19x19 grid with a wooden board aesthetic, turn-based gameplay for two players (Black and White), stone capture mechanics, undo functionality, and score tracking—all built using modern web technologies.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Features

- **19x19 Grid**: A beautifully styled board resembling traditional wooden Go boards.
- **Two-Player Gameplay**: Alternate turns placing Black and White stones.
- **Capture Mechanics**: Automatically removes surrounded stones and updates scores.
- **Undo Move**: Revert the last move with a single click.
- **Restart Game**: Clear the board and reset scores to start fresh.
- **Score Tracking**: Displays current scores for both players.

---

## Installation

Getting started with the Go game is simple since it’s a web-based project with no server-side dependencies.

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/KennyKe0706/GO-Game/
   ```

2. **Open the Game**:
   - Navigate to the project folder: `cd go-game`
   - Open `index.html` in a modern web browser (e.g., Chrome, Firefox, or Edge).

### Requirements:
- No additional installations are needed—just a browser that supports HTML5, CSS3, and JavaScript (ES6+).

---

## Usage

Playing the game is intuitive:

- **Place Stones**: Click an empty intersection on the board to place a stone. Black plays first, followed by White.
- **Undo a Move**: Click the "Undo" button to revert the last move (useful for correcting mistakes).
- **Restart the Game**: Click the "Restart" button to clear the board and reset scores to zero.
- **Game Rules**: The game enforces standard Go rules, including:
  - Stones are captured when fully surrounded by the opponent’s stones.
  - Suicide moves (placing a stone that would immediately be captured) are prevented.

Enjoy strategic gameplay right in your browser!

---

## Screenshots
![屏幕截图 2025-03-10 153014](https://github.com/user-attachments/assets/f2fb7ae5-a416-43fc-a1e5-d5f6d39c1ee3)


**Gameplay Screenshot**  
*Caption: Black and White players take turns placing stones, with scores updating after captures.*

---

## Project Structure

Here’s an overview of the project files:

```
go-game/
├── index.html       # The main HTML file that structures the game interface.
├── styles.css       # Stylesheet for the board, stones, and UI elements.
├── script.js        # JavaScript file containing game logic, turn handling, and capture detection.
└── screenshots/
    └── gameplay.png # Example screenshot of the game
```

---

## Technologies Used

This project leverages the following technologies:

- **HTML5**: For structuring the game interface.
- **CSS3**: For styling the board and stones with a polished, responsive design.
- **JavaScript (ES6+)**: For implementing game logic and interactivity.
- **SVG**: Used to render the grid lines and stones for crisp visuals.

---

## Contributing

Contributions are welcome! To contribute:

1. **Fork the Repository**: Click the "Fork" button on GitHub.
2. **Create a Branch**: 
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Changes**: Implement your feature or fix.
4. **Commit**:
   ```bash
   git commit -m "Add your message here"
   ```
5. **Push**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Submit a Pull Request**: Open a PR on GitHub with a clear description of your changes.

Please ensure your code follows the existing style and includes comments where necessary.

---

## Contact

Have questions, suggestions, or feedback? Reach out to me:

- **Email**: kezixuan1@gmail.com
- **GitHub**: [Kenny Ke](https://github.com/KennyKe0706/)

---

Enjoy the game! 🎮
