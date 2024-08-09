document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.board');
  const message = document.querySelector('.message');
  const player1TurnIndicator = document.getElementById('player1Turn');
  const player2TurnIndicator = document.getElementById('player2Turn');
  const player1ColorPicker = document.getElementById('player1Color');
  const player2ColorPicker = document.getElementById('player2Color');
  const player1NameInput = document.getElementById('player1Name');
  const player2NameInput = document.getElementById('player2Name');

  const size = 10;
  let currentPlayer = 'player1';
  let boardState = Array(size).fill(null).map(() => Array(size).fill(null));
  let gameActive = true;

  // Create board
  for (let i = 0; i < size * size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      board.appendChild(cell);
  }

  // Colors
  let player1Color = '#FF0000'; // Red
  let player2Color = '#0000FF'; // Blue

  // Update display
  const updateDisplay = () => {
      document.querySelectorAll('.cell').forEach(cell => {
          const index = cell.dataset.index;
          const row = Math.floor(index / size);
          const col = index % size;
          const player = boardState[row][col];
          cell.style.backgroundColor = player === 'player1' ? player1Color : player === 'player2' ? player2Color : '#f0f0f0';
      });

      player1TurnIndicator.style.borderColor = currentPlayer === 'player1' ? 'yellow' : '#333';
      player2TurnIndicator.style.borderColor = currentPlayer === 'player2' ? 'yellow' : '#333';
      message.textContent = `${currentPlayer === 'player1' ? player1NameInput.value : player2NameInput.value}'s turn`;
  };

  // Check winner
  const checkWinner = (player) => {
      const win = (row, col, dr, dc) => {
          for (let i = 0; i < 5; i++) {
              if (!boardState[row] || boardState[row][col] !== player) return false;
              row += dr;
              col += dc;
          }
          return true;
      };

      for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
              if (boardState[r][c] === player) {
                  if (win(r, c, 0, 1) || win(r, c, 1, 0) || win(r, c, 1, 1) || win(r, c, 1, -1)) return true;
              }
          }
      }
      return false;
  };

  // Handle clicks
  const handleClick = (event) => {
      const cell = event.target;
      const index = cell.dataset.index;
      const row = Math.floor(index / size);
      const col = index % size;

      if (!cell.classList.contains('cell') || boardState[row][col] || !gameActive) return;

      boardState[row][col] = currentPlayer;
      updateDisplay();
      
      if (checkWinner(currentPlayer)) {
          message.textContent = `${currentPlayer === 'player1' ? player1NameInput.value : player2NameInput.value} wins!`;
          gameActive = false;
      } else {
          currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
          updateDisplay();
      }
  };

  board.addEventListener('click', handleClick);

  // Update on color change
  player1ColorPicker.addEventListener('input', (e) => {
 player1Color = e.target.value;
      updateDisplay();
  });
  player2ColorPicker.addEventListener('input', (e) => {
      player2Color = e.target.value;
      updateDisplay();
  });

  // Initialize display
  updateDisplay();
});



