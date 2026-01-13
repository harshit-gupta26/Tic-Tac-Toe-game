const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("filled");

  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw! 😮";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      pattern.forEach(i => cells[i].classList.add("winner"));
      return true;
    }
  }
  return false;
}


function resetGame() {
board = ["", "", "", "", "", "", "", "", ""];
cells.forEach(cell => {
cell.style.transition = "opacity 0.3s ease, transform 0.3s ease";
cell.style.opacity = 0;
cell.style.transform = "scale(0.8)";
setTimeout(() => {
  cell.textContent = "";
  cell.classList.remove("filled", "winner");
  cell.style.opacity = 1;
  cell.style.transform = "scale(1)";
}, 300);
});
currentPlayer = "X";
gameActive = true;
statusText.textContent = "Player X's turn";
}


cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);


function celebrate() {
const confettiContainer = document.getElementById("confetti");
for (let i = 0; i < 100; i++) {
const confetti = document.createElement("div");
confetti.classList.add("confetti-piece");
confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
confetti.style.left = Math.random() * 100 + "vw";
confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
confetti.style.width = 5 + Math.random() * 10 + "px";
confetti.style.height = 5 + Math.random() * 10 + "px";
confettiContainer.appendChild(confetti);

// Remove confetti after animation
setTimeout(() => confetti.remove(), 5000);
}
}

// Trigger confetti on win
function checkWinner() {
for (let pattern of winPatterns) {
const [a, b, c] = pattern;
if (board[a] && board[a] === board[b] && board[a] === board[c]) {
  pattern.forEach(i => cells[i].classList.add("winner"));
  celebrate(); // <-- add this line
  return true;
}
}
return false;
}

confetti.style.transform = `translateX(${Math.random()*100 - 50}px)`;
