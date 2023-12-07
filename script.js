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
    }
  }
}));

// Function to initiate the game
function move() {
  timer = 60;
  scoreCount = 0;
  score.textContent = scoreCount;

  // Set intervals for moving mole and updating timer
  moeMoveInterval = setInterval(moveMol, 2000);
  timerInterval = setInterval(() => {
    timer--;
    time.textContent = timer;

    // Game over condition
    if (timer < 1 && scoreCount < 60) {
      alert("Game Over, Your Score is " + scoreCount);
      clear();
      start.classList.remove("no-click");
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
  move();
  lvlDisplay.classList.remove("no-display");
  currentlvl = 1;
  lvlDisplayCount.textContent = currentlvl;
});





























// let started
// let currentPosition
// let timerId = null
// let currentTime = 10
// let userScore = 0

// function randomBoxSelector () {
//     boxes.forEach((x) => {
//         x.classList.remove("mol")
//     })


//     let randomBox = boxes[Math.floor(Math.random() * 9)]
//     randomBox.classList.add("mol")
//     currentPosition = randomBox.id
    

//     started = true
// }

// boxes.forEach((x) => x.addEventListener("mousedown", () => {
//     let yy = 0
//     console.log(currentPosition)
//     userScore++
//     if (x.id == currentPosition)
//     yy++
//     score.textContent = userScore
//     console.log(x.id, currentPosition)
//     currentPosition = null
//     console.log(yy)
// }))

// function moveMol () {
    
//     if (!(started)) {
//         timerId = setInterval(randomBoxSelector, 1000)
//     }

//     // start.removeEventListener("click", moveMol)
// }

// start.addEventListener("click", () => {
//     moveMol()
//     currentTimeId = setInterval(countDown, 1000)
// })
// let currentTimeId
// function countDown () {
//     currentTime--
//     time.textContent = currentTime
//     if (currentTime === 0) {
//         alert("Jame Over your score is " + userScore)
//         clearInterval(currentTimeId)
//         clearInterval(timerId)
//         return
//     }
// }
