// Selecting DOM elements
const boxes = document.querySelectorAll(".boxes");
const mol = document.querySelector(".mol");
const score = document.querySelector("#score");
const time = document.querySelector("#time");
const grid = document.querySelector(".grid");
const start = document.querySelector(".start");
const lvlDisplayCount = document.getElementById("lvlDisplayCount");
const lvlDisplay = document.querySelector(".lvlDisplay");

// Initialize variables
let startJame = false;
let current;
let scoreCount = 0;
let timer;
let moeMoveInterval;
let timerInterval;
let currentlvl;

// Function to move the mole to a random box
function moveMol() {
  boxes.forEach((x) => {
    x.classList.remove("mol");
  });

  current = boxes[Math.floor(Math.random() * 9)];
  current.classList.add("mol");
  startJame = true;
}

// Function to clear intervals and remove mole from all boxes
function clear() {
  clearInterval(moeMoveInterval);
  clearInterval(timerInterval);
  boxes.forEach((x) => {
    x.classList.remove("mol");
  });
}

// Event listener for clicking on boxes
boxes.forEach((x) => x.addEventListener("click", () => {
  if (!(startJame)) return;
  if (x.id === current.id) {
    scoreCount++;
    score.textContent = scoreCount;
    if (scoreCount >= 60) {
      alert(`You Win, You Whacked The Mole ${scoreCount} times, in ${60 - +timer} Seconds`);
      clear();
      start.classList.remove("no-click");
      start.addEventListener("click", move);
      startJame = false
    }
  }
}));

// Function to initiate the game
function move() {
  timer = 60;
  scoreCount = 0;
  score.textContent = scoreCount;

  // Set intervals for moving mole and updating timer
  moeMoveInterval = setInterval(moveMol, 1000);
  timerInterval = setInterval(() => {
    timer--;
    time.textContent = timer;

    // Game over condition
    if (timer < 1 && scoreCount < 60) {
      alert("Game Over, Your Score is " + scoreCount);
      clear();
      start.classList.remove("no-click");
      startJame = false
    }
  }, 1000);

  // Disable start button during the game
  start.removeEventListener("click", move);
  start.classList.add("no-click");

  // Enable start button after 1 minute (60 seconds)
  setTimeout(() => {
    start.addEventListener("click", move);
  }, 60000);
}

// Event listener for starting the game
start.addEventListener("click", () => {

  if (!startJame) {
    move();
    lvlDisplay.classList.remove("no-display");
    currentlvl = 1;
    lvlDisplayCount.textContent = currentlvl;
  }

  startJame = true
});








