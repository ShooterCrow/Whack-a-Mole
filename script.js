// Selecting DOM elements
const mol = document.querySelector(".mol");
const score = document.querySelector("#score");
const time = document.querySelector("#time");
const grid = document.querySelector(".grid");
const start = document.querySelector(".start");
const lvlDisplayCount = document.getElementById("lvlDisplayCount");
const lvlDisplay = document.querySelector(".lvlDisplay");
const molePic = document.querySelector("[mole-pic]")
const stats = document.querySelector(".stat")
const container = document.querySelector(".container")
const popUp = document.querySelector(".pop-up")
const info = document.querySelector("[pop-up-txt]")
const nextBtn = document.querySelector(".next")
const countDownNext = document.querySelector(".t-left")

// Initialize variables
let startJame = false;
let current;
let scoreCount = 0;
let timer;
let lvlTime;
let moeMoveInterval;
let timerInterval;
let currentlvl = 0;
let boxes

// Event listener for starting the game

let starter = () => {
  if (!startJame) {
    selectNextLvl()
    lvlDisplay.classList.remove("no-display");
    lvlDisplayCount.textContent = currentlvl + 1;
    start.classList.add("no-click");
    molePic.classList.add("no-display")
    stats.classList.remove("no-display")
    
      startJame = true
  }

}
start.addEventListener("click", starter);

function selectNextLvl () {
  if (!startJame)
  if (currentlvl === 0) {
    lvl1()
    return
  } 
  if (currentlvl === 1) {
    lvl2()
    return
  } 
  if (currentlvl === 2) {
    lvl3()
    return
  }
  if (currentlvl === 3) {
    scoreCount = 0
    let removedStart = false
    start.removeEventListener("click", starter);
    nextBtn.addEventListener("click", () => {
      start.addEventListener("click", starter);
      popUp.classList.add("no-display")
      removedStart = true
    })
    if (!removedStart) {
      setTimeout(() => {
        start.addEventListener("click", starter);
        popUp.classList.add("no-display")
      }, 2000);
    }
    // alert("Levels Completed Restart Jame")
    currentlvl = 0
    lvl1()
    return
  }
}

// Function to move the mole to a random box
function moveMol() {
  boxes.forEach((x) => {
    x.classList.remove("mol");
  });

  current = boxes[Math.floor(Math.random() * grid.children.length)];
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
let tt
// Event listener for clicking on boxes
function checkClick() {

  boxes.forEach((x) => x.addEventListener("click", () => {
    if (!(startJame)) return;
    if (x.id === current.id) {
      scoreCount++;
      score.textContent = scoreCount;
      if (scoreCount >= 10) {
        popUp.classList.remove("no-display")
        info.textContent = `You Win, You Whacked The Mole ${scoreCount} times, in ${lvlTime - +timer} Seconds`
        countDownNext.textContent = 5
        nextBtn.addEventListener("click", () => {
          popUp.classList.add("no-display")
          start.addEventListener("click", starter);
        })
        tt = setInterval(() => {
          countDownNext.textContent--
        }, 1000);
        setTimeout(() => {
          popUp.classList.add("no-display")
        }, 5000);
        clear();
        start.classList.remove("no-click");
        if (currentlvl < 4) currentlvl = currentlvl + 1
        startJame = false
        start.addEventListener("click", starter);
        start.textContent = "Begin"
        }
    }
  }));
  clearInterval(tt)

}

// Game over condition
function checkJameOver () {
  if (timer < 1 && scoreCount < 60) {
    popUp.classList.remove("no-display")
    info.textContent = "Game Over, Your Score is " + scoreCount
    setTimeout(() => {
      popUp.classList.add("no-display")
    }, 5000);
    clear();
    startJame = false;
    start.classList.remove("no-click");
    start.textContent = "Restart"
    
    countDownNext.textContent = 5
    tt = setInterval(() => {
      countDownNext.textContent = countDownNext.textContent - 1
    }, 1000);
    setTimeout(() => {
      clearInterval(tt)
    }, 5000);
  }
}

//Create Blocs Function
function createBlocs (no) {
  //Clear grid before creatin new blocs
  grid.innerHTML = ""
  //Create new blocs
  for (let i = 0; i < no; i++) {
    let addBloc = document.createElement("div")
    addBloc.classList.add("boxes")
    addBloc.id = i
    grid.appendChild(addBloc)
  }
}

//Timer Fuction
function moveTimer (sec) {
  // Set intervals for moving mole and updating timer
  moeMoveInterval = setInterval(() => {
    timer--;
    time.textContent = timer;
    moveMol()
    checkJameOver()
    container.style.background = `linear-gradient(${Math.floor(Math.random() * 360)}deg, blue, purple)`
  }, sec);
}

// Initialize Level Function
function initializeLvl (lvlT, scr, gridW, gridh) {
  lvlTime = lvlT
  timer = lvlTime;
  scoreCount = scr;
  score.textContent = scoreCount;
  grid.style.width = gridW
  grid.style.height = gridh
}

// Functions to initiate the game Level
function lvl1() {
  grid.classList.remove("no-display")
  initializeLvl(60, 0, "201px", "200px")
  createBlocs(4)
  boxes = document.querySelectorAll(".boxes");
  checkClick()
  moveTimer (1000)
}

function lvl2 () {
  initializeLvl(30, 0, "301px", "300px")
  createBlocs(9)
  moveTimer (1000)
  boxes = document.querySelectorAll(".boxes")
  checkClick()
}

function lvl3 () {
  initializeLvl(20, 0, "301px", "300px")
  createBlocs(9)
  moveTimer (700)
  boxes = document.querySelectorAll(".boxes")
  checkClick()
}
