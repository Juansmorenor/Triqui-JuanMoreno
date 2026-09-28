/* ============================================
   TRIQUI - Tres en Línea
   JavaScript vanilla — sin dependencias
   Modo vs computadora con 3 dificultades
   ============================================ */

(function () {
  'use strict';

  // --- Constantes ---
  const COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
    [0, 4, 8], [2, 4, 6]             // diagonales
  ];

  const HUMAN = 'X';
  const AI    = 'O';

  // --- Estado del juego ---
  let board = Array(9).fill('');
  let currentPlayer = HUMAN;
  let gameActive = true;
  let vsComputer = false;
  let difficulty = 'medium'; // 'easy' | 'medium' | 'hard'
  let score = { X: 0, O: 0, draw: 0 };

  // --- Referencias al DOM ---
  const cells = document.querySelectorAll('.cell');
  const turnSymbol = document.getElementById('turn-symbol');
  const resultMessage = document.getElementById('result-message');
  const scoreX = document.getElementById('score-x');
  const scoreO = document.getElementById('score-o');
  const scoreDraw = document.getElementById('score-draw');
  const scoreOLabel = document.getElementById('score-o-label');
  const btnNewGame = document.getElementById('btn-new-game');
  const btnResetScore = document.getElementById('btn-reset-score');
  const modePvp = document.getElementById('mode-pvp');
  const modePvc = document.getElementById('mode-pvc');
  const difficultySelector = document.getElementById('difficulty-selector');
  const diffBtns = document.querySelectorAll('.diff-btn');

  // =============================================
  //  INICIALIZACIÓN
  // =============================================

  function initializeGame() {
    cells.forEach(function (cell) {
      cell.addEventListener('click', handleCellClick);
      cell.addEventListener('keydown', handleCellKeydown);
    });

    btnNewGame.addEventListener('click', resetGame);
    btnResetScore.addEventListener('click', resetScore);

    modePvp.addEventListener('click', function () { setMode(false); });
    modePvc.addEventListener('click', function () { setMode(true); });

    diffBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setDifficulty(btn.getAttribute('data-diff'));
      });
    });

    loadScore();
    updateScoreboard();
    updateTurnIndicator();
  }

  // =============================================
  //  MODO Y DIFICULTAD
  // =============================================

  function setMode(computer) {
    if (vsComputer === computer) return;
    vsComputer = computer;

    modePvp.classList.toggle('active', !computer);
    modePvc.classList.toggle('active', computer);
    modePvp.setAttribute('aria-pressed', String(!computer));
    modePvc.setAttribute('aria-pressed', String(computer));

    // Mostrar / ocultar selector de dificultad
    difficultySelector.classList.toggle('hidden', !computer);

    scoreOLabel.textContent = computer ? '🤖' : 'O';
    resetGame();
  }

  function setDifficulty(level) {
    if (difficulty === level) return;
    difficulty = level;

    diffBtns.forEach(function (btn) {
      var isActive = btn.getAttribute('data-diff') === level;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    resetGame();
  }

  // =============================================
  //  ENTRADA DEL JUGADOR
  // =============================================

  function handleCellClick(e) {
    var index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
    attemptMove(index);
  }

  function handleCellKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      var index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      attemptMove(index);
    }
  }

  function attemptMove(index) {
    if (!gameActive || board[index] !== '') return;

    // En modo vs computador, solo permite jugadas del humano
    if (vsComputer && currentPlayer === AI) return;

    makeMove(index);

    // Si es modo computador y el juego sigue, juega la IA
    if (vsComputer && gameActive && currentPlayer === AI) {
      disableCellsBriefly();
      setTimeout(function () {
        var aiMove = getAIMove();
        makeMove(aiMove);
      }, 350);
    }
  }

  // Bloquea clics brevemente mientras la IA "piensa"
  function disableCellsBriefly() {
    cells.forEach(function (cell) {
      cell.classList.add('cell--disabled');
    });
    setTimeout(function () {
      if (gameActive) {
        cells.forEach(function (cell) {
          if (!cell.classList.contains('cell--taken')) {
            cell.classList.remove('cell--disabled');
          }
        });
      }
    }, 350);
  }

  // =============================================
  //  LÓGICA DEL JUEGO
  // =============================================

  function makeMove(index) {
    board[index] = currentPlayer;

    var cell = cells[index];
    cell.textContent = currentPlayer;
    cell.classList.add('cell--taken');
    cell.classList.add(currentPlayer === 'X' ? 'cell--x' : 'cell--o');
    cell.setAttribute(
      'aria-label',
      'Casilla ' + (index + 1) + ', ocupada por ' + currentPlayer
    );

    var winCombo = checkWinner();
    if (winCombo) {
      endGame(winCombo);
      return;
    }

    if (checkDraw()) {
      endGame(null);
      return;
    }

    currentPlayer = currentPlayer === HUMAN ? AI : HUMAN;
    updateTurnIndicator();
  }

  function checkWinner() {
    for (var i = 0; i < COMBINATIONS.length; i++) {
      var a = COMBINATIONS[i][0];
      var b = COMBINATIONS[i][1];
      var c = COMBINATIONS[i][2];

      if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
        return COMBINATIONS[i];
      }
    }
    return null;
  }

  function checkDraw() {
    return board.every(function (cell) {
      return cell !== '';
    });
  }

  function endGame(winCombo) {
    gameActive = false;

    cells.forEach(function (cell) {
      cell.classList.add('cell--disabled');
    });

    if (winCombo) {
      winCombo.forEach(function (idx) {
        cells[idx].classList.add('cell--win');
      });

      score[currentPlayer]++;

      var label = currentPlayer;
      if (vsComputer) {
        label = currentPlayer === AI ? '🤖 (Computadora)' : '👤 (Tú)';
      }
      resultMessage.textContent = '¡' + label + ' ha ganado!';
      resultMessage.className = 'result-message visible win-' + currentPlayer.toLowerCase();
    } else {
      score.draw++;
      resultMessage.textContent = '¡Empate!';
      resultMessage.className = 'result-message visible draw';
    }

    updateScoreboard();
    saveScore();
  }

  // =============================================
  //  REINICIO
  // =============================================

  function resetGame() {
    board = Array(9).fill('');
    currentPlayer = HUMAN;
    gameActive = true;

    cells.forEach(function (cell, i) {
      cell.textContent = '';
      cell.className = 'cell';
      cell.setAttribute(
        'aria-label',
        'Casilla ' + (i + 1) + ', vacía'
      );
    });

    resultMessage.textContent = '';
    resultMessage.className = 'result-message';

    updateTurnIndicator();
  }

  function resetScore() {
    var confirmed = confirm('¿Estás seguro de que deseas reiniciar el marcador?');
    if (!confirmed) return;

    score = { X: 0, O: 0, draw: 0 };
    updateScoreboard();
    saveScore();
    resetGame();
  }

  // =============================================
  //  INDICADOR Y MARCADOR
  // =============================================

  function updateTurnIndicator() {
    turnSymbol.textContent = currentPlayer;
    turnSymbol.className = 'player-symbol ' + currentPlayer.toLowerCase() + '-active';
  }

  function updateScoreboard() {
    scoreX.textContent = score.X;
    scoreO.textContent = score.O;
    scoreDraw.textContent = score.draw;
  }

  // =============================================
  //  PERSISTENCIA (localStorage)
  // =============================================

  function saveScore() {
    try {
      localStorage.setItem('triqui-score', JSON.stringify(score));
    } catch (e) { /* sin acción */ }
  }

  function loadScore() {
    try {
      var saved = localStorage.getItem('triqui-score');
      if (saved) {
        score = JSON.parse(saved);
      }
    } catch (e) {
      score = { X: 0, O: 0, draw: 0 };
    }
  }

  // =============================================
  //  IA — 3 DIFICULTADES
  // =============================================

  /**
   * FÁCIL: movimiento completamente aleatorio entre las casillas vacías.
   */
  function getEasyMove() {
    var empty = [];
    for (var i = 0; i < 9; i++) {
      if (board[i] === '') empty.push(i);
    }
    return empty[Math.floor(Math.random() * empty.length)];
  }

  /**
   * INTERMEDIO: usa minimax con probabilidad de error.
   * 40% de las veces elige un movimiento aleatorio.
   * 60% de las veces usa minimax perfecto.
   */
  function getMediumMove() {
    // Si hay una jugada ganadora inmediata, la toma siempre
    var winMove = findWinningMove(AI);
    if (winMove !== -1) return winMove;

    // Si el humano va a ganar, lo bloquea siempre
    var blockMove = findWinningMove(HUMAN);
    if (blockMove !== -1) return blockMove;

    // 60% chance de jugar perfecto, 40% aleatorio
    if (Math.random() < 0.6) {
      return getHardMove();
    }
    return getEasyMove();
  }

  /**
   * DIFÍCIL: minimax perfecto — invencible.
   */
  function getHardMove() {
    var bestScore = -Infinity;
    var bestMove = -1;

    for (var i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = AI;
        var s = minimax(board, 0, false);
        board[i] = '';
        if (s > bestScore) {
          bestScore = s;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  /**
   * Encuentra un movimiento que gana inmediatamente para el jugador dado.
   * Devuelve el índice o -1 si no existe.
   */
  function findWinningMove(player) {
    for (var i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = player;
        var combo = checkComboWin(board);
        board[i] = '';
        if (combo) return i;
      }
    }
    return -1;
  }

  /**
   * Verifica si hay un ganador en el tablero actual (sin importar quién).
   */
  function checkComboWin(b) {
    for (var i = 0; i < COMBINATIONS.length; i++) {
      var a = COMBINATIONS[i][0];
      var c = COMBINATIONS[i][1];
      var d = COMBINATIONS[i][2];
      if (b[a] !== '' && b[a] === b[c] && b[c] === b[d]) {
        return COMBINATIONS[i];
      }
    }
    return null;
  }

  /**
   * Dispatcher: elige la estrategia según la dificultad.
   */
  function getAIMove() {
    switch (difficulty) {
      case 'easy':   return getEasyMove();
      case 'medium': return getMediumMove();
      case 'hard':   return getHardMove();
      default:       return getMediumMove();
    }
  }

  // =============================================
  //  IA — MINIMAX (para dificultad difícil)
  // =============================================

  function minimax(b, depth, isMaximizing) {
    var w = evaluateBoard(b);
    if (w !== null) return w;
    if (b.every(function (c) { return c !== ''; })) return 0;

    if (isMaximizing) {
      var best = -Infinity;
      for (var i = 0; i < 9; i++) {
        if (b[i] === '') {
          b[i] = AI;
          var val = minimax(b, depth + 1, false);
          b[i] = '';
          if (val > best) best = val;
        }
      }
      return best;
    } else {
      var best2 = Infinity;
      for (var j = 0; j < 9; j++) {
        if (b[j] === '') {
          b[j] = HUMAN;
          var val2 = minimax(b, depth + 1, true);
          b[j] = '';
          if (val2 < best2) best2 = val2;
        }
      }
      return best2;
    }
  }

  function evaluateBoard(b) {
    for (var i = 0; i < COMBINATIONS.length; i++) {
      var a = COMBINATIONS[i][0];
      var c = COMBINATIONS[i][1];
      var d = COMBINATIONS[i][2];
      if (b[a] !== '' && b[a] === b[c] && b[c] === b[d]) {
        return b[a] === AI ? 10 : -10;
      }
    }
    return null;
  }

  // --- Arrancar ---
  initializeGame();
})();
