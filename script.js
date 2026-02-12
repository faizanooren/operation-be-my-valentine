const introRoom = document.getElementById("introRoom");
const quizRoom = document.getElementById("quizRoom");

function startGame() {
  shuffleLetters();
  introRoom.style.display = "none";
  quizRoom.style.display = "block";
}



const allLetters = ["V","A","L","E","N","T","I","N","E"];
let shuffledLetters = [];
let collectedLetters = [];
let currentLevel = 0;

function shuffleLetters() {
  shuffledLetters = [...allLetters].sort(() => Math.random() - 0.5);
}



function showDoor() {
  document.querySelectorAll(".room").forEach(r => r.style.display = "none");

  const doorRoom = document.getElementById("doorRoom");
  const letterReveal = document.getElementById("letterReveal");
  const btn = document.getElementById("doorContinueBtn");

  letterReveal.textContent = shuffledLetters[currentLevel];


  btn.style.display = "inline-block";

  doorRoom.style.display = "block";
}




function collectLetterAndContinue() {
  const letter = shuffledLetters[currentLevel];
  collectedLetters.push(letter);

  updateBasketUI();
  currentLevel++;

  document.getElementById("letterBasket").style.display = "block";

  // hide button again
  document.getElementById("doorContinueBtn").style.display = "none";
  document.getElementById("doorRoom").style.display = "none";

  goToNextRoom();
}




function updateBasketUI() {
  const basket = document.getElementById("basketLetters");
  basket.innerHTML = "";

  collectedLetters.forEach(letter => {
    const span = document.createElement("span");
    span.className = "basketLetter";
    span.textContent = letter;
    basket.appendChild(span);
  });
}

function goToNextRoom() {
  document.getElementById("doorRoom").style.display = "none";

  if (currentLevel === 1) {
    mazeRoom.style.display = "block";
    drawMaze();
    document.addEventListener("keydown", movePlayer);
  } 
  else if (currentLevel === 2) {
    heartRoom.style.display = "block";
    startHeartGame();
  } 
  else if (currentLevel === 3) {
  startPhotoPuzzle();
}

  else if (currentLevel === 4) {
    startCupGame();
  }

  else if (currentLevel === 5) {
  startCrosswordGame();
}

  else if (currentLevel === 6) {
  startKissGame();
}

else if (currentLevel === 7) {
  startWhackGame();
}

else if (currentLevel === 8) {
  startMemoryGame();
}

  else {
  startFinalDoor();
}

  
}

const quizData = [
  {
    question: "Where did we first meet?",
    options: ["UB2", "Iced-tea stall", "UB6"],
    correct: 0
  },
  {
    question: "What was the first text we ever exchanged?",
    options: ["Story mention", "Birthday wish", "Story reply"],
    correct: 1
  },
  {
    question: "Who fell first?",
    options: ["Inconclusive", "Zayeed", "Faiza"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".options button");
const feedbackEl = document.getElementById("feedback");


loadQuestion();

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  optionButtons.forEach((btn, index) => {
    btn.textContent = q.options[index];
  });

  feedbackEl.textContent = "";
}

function checkAnswer(selected) {
  if (selected === quizData[currentQuestion].correct) {
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    feedbackEl.textContent = "Nope. Try again!";
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    setTimeout(loadQuestion, 1000);
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  questionEl.textContent = `You scored ${score}/3 `;
  document.querySelector(".options").style.display = "none";

  if (score == 3) {


    questionEl.textContent = `We're off to a great start! `;
    setTimeout(() => {
      showDoor();
    }, 1200);

  } else {
    feedbackEl.textContent =
      "How did you not get all of them right? Refresh and try again!";
  }
}




// ---- MAZE ROOM ----

const mazeRoom = document.getElementById("mazeRoom");
const mazeMessage = document.getElementById("mazeMessage");

function showMaze() {
  quizRoom.style.display = "none";
  mazeRoom.style.display = "block";
  drawMaze();
  document.addEventListener("keydown", movePlayer);
}
  const heartMask = [
    "000011100000011100000",
    "000111110000111110000",
    "011111111101111111110",
    "111111111111111111111",
    "111111111111111111111",
    "111111111111111111111",
    "011111111111111111110",
    "001111111111111111100",
    "000111111111111111000",
    "000011111111111110000",
    "000001111111111100000",
    "000000111111111000000",
    "000000011111110000000",
    "000000001111100000000",
    "000000000111000000000",
    "000000000010000000000"
  ];


  const mazePaths = [
    "XXXXXXXXXXXXXXXXXXXXX",
    "XXXXOXOXXXXXXXOXXXXXX",
    "XOXOOOOXOXOOXOOOOOXXX",  
    "XOXXXOXXXOXOXOXXXOXOX",  
    "XOOOXOXOOOXOOOXOXOOOX",  
    "XOXOOOOOXOOXXOXOXOXOX",  
    "XXXOXXXOXXXOXXXOOOXXX",  
    "XXOOOOXOXOOOOOOOOXXXX", 
    "XOOOXOXXXXXXXOXXXXOOX",  
    "XOXOXOOOXOOOXOOOOOXOX",  
    "XOXOXXXOXOXOXXOXXXXOX",  
    "XOXOOOOOOOXOOOOXOOOXO",  
    "XOXXXOXXXOXOXXXXXOXOX",  
    "XOOOXOXOXOXXXOXOXOXOX",  
    "XOXXXOXOXOOOXXXOXOXOX",  
    "XOOOOOOOOOOOXOOOOOOOX"   
  ];

function getCellType(x, y) {
  if (heartMask[y][x] === "0") return "outside";
  if (mazePaths[y][x] === "X") return "wall";
  return "path";
}


let playerPos = { x: 10, y: 14 }; // bottom entrance
const goalPos  = { x: 11, y: 2 };  // top exit




function drawMaze() {
  const maze = document.getElementById("maze");
  maze.innerHTML = "";

  for (let y = 0; y < heartMask.length; y++) {
    for (let x = 0; x < heartMask[0].length; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const type = getCellType(x, y);
      cell.classList.add(type);

      if (x === playerPos.x && y === playerPos.y) {
        cell.textContent = "🤍";
        cell.classList.add("player");
      }

      if (x === goalPos.x && y === goalPos.y) {
        cell.textContent = "🖤";
        cell.classList.add("goal");
      }

      maze.appendChild(cell);
    }
  }
}




function movePlayer(e) {
  let dx = 0, dy = 0;

  if (e.key === "ArrowUp") dy = -1;
  else if (e.key === "ArrowDown") dy = 1;
  else if (e.key === "ArrowLeft") dx = -1;
  else if (e.key === "ArrowRight") dx = 1;
  else return;

  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;


  if (
    newY < 0 ||
    newY >= heartMask.length ||
    newX < 0 ||
    newX >= heartMask[0].length
  ) return;

  // TILE TYPE CHECK
  const nextType = getCellType(newX, newY);
  if (nextType !== "path") {

    return;
  }

  // MOVE
  playerPos = { x: newX, y: newY };
  drawMaze();

  // WIN CHECK
  if (newX === goalPos.x && newY === goalPos.y) {


    document.removeEventListener("keydown", movePlayer);
    questionEl.textContent = `You made it through to me!`;
    setTimeout(() => {
      showDoor();
    }, 1500);
  }
}

function goToHeartCatcher() {
  mazeRoom.style.display = "none";
  document.getElementById("heartRoom").style.display = "block";
  startHeartGame();
}


// HEART CATCHER GAME 

let gameActive = false;

let basketX = 50;
let heartScore = 0;
let missCount = 0;
let heartInterval = null;

const basket = document.getElementById("basket");
const gameArea = document.getElementById("gameArea");
const retryBtn = document.getElementById("retryBtn");

// Meter elements
const heartFill = document.getElementById("heartFill");
const heartText = document.getElementById("heartText");

// Lives
const heartLife1 = document.getElementById("heartLife1");
const heartLife2 = document.getElementById("heartLife2");
const heartLife3 = document.getElementById("heartLife3");

function startHeartGame() {

  gameActive = true;

  heartScore = 0;
  missCount = 0;
  basketX = 50;

  updateHeartMeter();
  resetHeartLives();

  retryBtn.style.display = "none";

  basket.style.left = basketX + "%";

  document.querySelectorAll(".heart").forEach(h => h.remove());
  clearInterval(heartInterval);

  heartInterval = setInterval(createHeart, 1300);
  document.addEventListener("keydown", moveBasket);
}

function moveBasket(e) {
  if (!gameActive) return;

  if (e.key === "ArrowLeft") basketX -= 4;
  if (e.key === "ArrowRight") basketX += 4;

  basketX = Math.max(2, Math.min(92, basketX));
  basket.style.left = basketX + "%";
}

function createHeart() {

  if (!gameActive) return;
  if (heartScore >= 10 || missCount >= 3) return;

  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 90 + "%";
  heart.style.top = "-40px";

  gameArea.appendChild(heart);

  const fallSpeed = 4 + Math.random() * 1;

  const fall = setInterval(() => {

    heart.style.top = (heart.offsetTop + fallSpeed) + "px";

    const heartRect = heart.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    // CATCH
    if (
      heartRect.bottom >= basketRect.top &&
      heartRect.bottom <= basketRect.bottom &&
      heartRect.left + 8 < basketRect.right &&
      heartRect.right - 8 > basketRect.left
    ) {
      clearInterval(fall);
      heart.remove();

      heartScore++;
      updateHeartMeter();

      if (heartScore >= 10) {
        winHeartGame();
      }
    }

    //  MISS
    if (heart.offsetTop > gameArea.offsetHeight) {
      clearInterval(fall);
      heart.remove();

      missCount++;
      updateHeartLives();

      if (missCount >= 3) {
        loseHeartGame();
      }
    }

  }, 20);
}

//  UPDATE PROGRESS BAR
function updateHeartMeter() {
  const percent = (heartScore / 10) * 100;
  heartFill.style.width = percent + "%";
  heartText.textContent = `${heartScore} / 10 ❤️`;
}

// UPDATE LIVES
function updateHeartLives() {
  const lives = [heartLife1, heartLife2, heartLife3];

  if (lives[missCount - 1]) {
    lives[missCount - 1].classList.add("lost");
  }
}

//  RESET LIVES
function resetHeartLives() {
  [heartLife1, heartLife2, heartLife3]
    .forEach(l => l.classList.remove("lost"));
}

function winHeartGame() {
  endHeartGame();
  heartText.textContent = "It seems that you have caught feelings...";

  setTimeout(showDoor, 1500);
}

function loseHeartGame() {
  endHeartGame();
  heartText.textContent = "Oh no.. you missed too many!";
  retryBtn.style.display = "inline-block";
}

function endHeartGame() {
  gameActive = false;

  clearInterval(heartInterval);
  heartInterval = null;

  document.removeEventListener("keydown", moveBasket);

  document.querySelectorAll(".heart").forEach(h => h.remove());
}

// PHOTO PUZZLE ROOM

const puzzleRoom = document.getElementById("photoPuzzleRoom");
const puzzleGrid = document.getElementById("puzzleGrid");
const puzzleMessage = document.getElementById("puzzleMessage");

let puzzleOrder = [];
let selectedTile = null;

function startPhotoPuzzle() {
  document.querySelectorAll(".room").forEach(r => r.style.display = "none");
  puzzleRoom.style.display = "block";

  puzzleMessage.textContent = "";
  puzzleGrid.innerHTML = "";

  puzzleOrder = [...Array(9).keys()];
  shuffleArray(puzzleOrder);

  puzzleOrder.forEach((pos, index) => {
    const tile = document.createElement("div");
    tile.classList.add("puzzlePiece");
    tile.dataset.correct = pos;
    tile.dataset.index = index;

    const x = (pos % 3) * -180;
    const y = Math.floor(pos / 3) * -180;


    tile.style.backgroundPosition = `${x}px ${y}px`;

    tile.addEventListener("click", () => selectTile(tile));
    puzzleGrid.appendChild(tile);
  });
}

function selectTile(tile) {
  if (!selectedTile) {
    selectedTile = tile;
    tile.classList.add("selected");
    return;
  }

  if (selectedTile === tile) {
    tile.classList.remove("selected");
    selectedTile = null;
    return;
  }

  swapTiles(selectedTile, tile);
  selectedTile.classList.remove("selected");
  selectedTile = null;

  checkPuzzleSolved();
}

function swapTiles(tileA, tileB) {
  const tempPos = tileA.style.backgroundPosition;
  tileA.style.backgroundPosition = tileB.style.backgroundPosition;
  tileB.style.backgroundPosition = tempPos;

  const tempCorrect = tileA.dataset.correct;
  tileA.dataset.correct = tileB.dataset.correct;
  tileB.dataset.correct = tempCorrect;
}

function checkPuzzleSolved() {
  const tiles = document.querySelectorAll(".puzzlePiece");

  const solved = [...tiles].every((tile, index) => {
    return parseInt(tile.dataset.correct) === index;
  });

  if (solved) {
    puzzleMessage.textContent = "Great! You pieced us back together!";
    setTimeout(() => {
      showDoor();
    }, 1500);
  }
}

// Utility
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// CUP SHUFFLE GAME (CORRECT LOGIC)

const cupRoom = document.getElementById("cupRoom");
const cups = document.querySelectorAll(".cup");
const cupMessage = document.getElementById("cupMessage");

let heartCupIndex = 0;
let round = 0;
let wins = 0;
let canChoose = false;
let positions = [0, 160, 320];
let heartIcon = null;

function startCupGame() {
  document.querySelectorAll(".room").forEach(r => r.style.display = "none");
  cupRoom.style.display = "block";

  round = 0;
  wins = 0;
  cupMessage.textContent = "Can you find the heart 3 times in a row?";

  resetCups();
  startRound();
}

function resetCups() {
  cups.forEach((cup, i) => {
    cup.style.transform = `translateX(${positions[i]}px)`;
  });

  if (heartIcon) heartIcon.remove();
}

function startRound() {
  canChoose = false;

  // pick cup
  heartCupIndex = Math.floor(Math.random() * 3);

  // show heart first
  showHeartUnderCup(heartCupIndex);

  cupMessage.textContent = "Watch closely!";

  setTimeout(() => {
    hideHeart();
    shuffleAnimation(5);
  }, 1200);
}

function showHeartUnderCup(index) {
  hideHeart();

  const cup = cups[index];
  heartIcon = document.createElement("div");
  heartIcon.textContent = "❤️";
  heartIcon.className = "heartIcon";

  cup.appendChild(heartIcon);
}

function hideHeart() {
  if (heartIcon) {
    heartIcon.remove();
    heartIcon = null;
  }
}

function shuffleAnimation(times) {
  cupMessage.textContent = "Shuffling…";

  if (times === 0) {
    canChoose = true;
    cupMessage.textContent = "Where is it?";
    return;
  }

  const newPositions = [...positions].sort(() => Math.random() - 0.5);

  cups.forEach((cup, i) => {
    cup.style.transform = `translateX(${newPositions[i]}px)`;
  });

  positions = newPositions;

  setTimeout(() => shuffleAnimation(times - 1), 700);
}

cups.forEach((cup, i) => {
  cup.addEventListener("click", () => {
    if (!canChoose) return;

    canChoose = false;

    // reveal correct cup
    showHeartUnderCup(heartCupIndex);

    if (i === heartCupIndex) {
      wins++;
      cupMessage.textContent = "You found it!";
      round++;
      
      setTimeout(() => {
        if (wins >= 3) {
          endCupGame();
        } else {
          cupMessage.textContent = `Round ${round + 1} - ${wins} in a row!`;
          startRound();
        }
      }, 1500);
    } else {
      cupMessage.textContent = "Wrong cup! Starting over...";
      
      setTimeout(() => {
        // Reset everything on wrong guess
        wins = 0;
        round = 0;
        cupMessage.textContent = "Round 1";
        startRound();
      }, 1500);
    }
  });
});

function endCupGame() {
  hideHeart();

  if (wins == 3) {
    cupMessage.textContent = "You found all of them!";
    setTimeout(showDoor, 1500);
  } else {
    cupMessage.textContent = "Try again";
    setTimeout(startCupGame, 2000);
  }
}
// CROSSWORD GAME

const crosswordRoom = document.getElementById("crosswordRoom");
const crosswordGrid = document.getElementById("crosswordGrid");
const crosswordMessage = document.getElementById("crosswordMessage");

let currentDirection = "across";

const crosswordLayout = [
  [null,null,null,null,"B","O","O","T","Y",null,null,null,null,null],
  [null,null,null,null,"I",null,null,null,null,null,null,null,null,null],
  [null,null,null,null,"G",null,"W",null,null,null,null,null,null,null],
  [null,null,"A",null,"F",null,"I",null,null,null,null,null,null,null],
  [null,null,"M",null,"A",null,"F",null,null,null,null,null,null,null],
  ["P","R","E","T","T","I","E","S","T",null,null,null,null,null],
  [null,null,"R",null,"N",null,"Y",null,null,null,null,null,null,null],
  [null,null,"I",null,"O",null,null,null,null,null,null,null,null,null],
  [null,null,"C",null,"S",null,null,null,null,null,null,null,null,null],
  [null,"H","A","Z","E","L","N","U","T",null,null,null,null,null],
  [null,null,"N",null,null,null,"O",null,null,null,null,null,null,null],
  [null,null,"O",null,null,null,"R",null,null,null,null,null,null,null],
  [null,null,null,null,null,null,"T",null,null,null,null,null,null,null],
  [null,null,null,"Z","U","S","H","I",null,null,null,null,null,null],
  [null,null,null,null,null,null,"E",null,null,null,null,null,null,null],
  [null,null,null,null,null,null,"N","O","V","E","M","B","E","R"],
  [null,null,null,null,null,null,"D",null,"L",null,null,null,null,null],
  [null,null,null,null,null,null,null,null,"O",null,null,null,null,null],
  [null,null,null,null,null,null,null,null,"G",null,null,null,null,null]
];

const crosswordNumbers = {
  "0,4": 1,
  "5,0": 2,
  "9,1": 3,
  "13,3": 4,
  "15,6": 5,
  "2,6": 6,
  "3,2": 7,
  "9,6": 8,
  "15,8": 9
};

function getCellNumber(row, col) {
  return crosswordNumbers[`${row},${col}`] || null;
}

function startCrosswordGame() {
  document.querySelectorAll(".room").forEach(r => r.style.display = "none");
  crosswordRoom.style.display = "block";

  crosswordGrid.innerHTML = "";
  crosswordMessage.textContent = "";

  document.addEventListener("keydown", handleArrows);

  crosswordLayout.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === null) {
        const block = document.createElement("div");
        block.className = "crossCell block";
        crosswordGrid.appendChild(block);
        return;
      }

      const wrapper = document.createElement("div");
      wrapper.className = "cellWrapper";

      const number = getCellNumber(y, x);
      if (number) {
        const num = document.createElement("span");
        num.className = "cellNumber";
        num.textContent = number;
        wrapper.appendChild(num);
      }

      const input = document.createElement("input");
      input.className = "crossCell";
      input.maxLength = 1;
      input.dataset.answer = cell;
      input.dataset.row = y;
      input.dataset.col = x;

      input.addEventListener("input", (e) => {
        const oldValue = input.value;
        input.value = input.value.toUpperCase();
        
        // Don't move on backspace
        if (e.inputType === "deleteContentBackward") {
          return;
        }
        
        // Move forward after typing a letter
        if (input.value) {
          moveForward(y, x);
        }
        
        checkCrossword();
      });

      input.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    e.preventDefault();
    
    // If current cell is empty, move back and clear that cell
    if (input.value === "") {
      const prev = getPreviousCell(y, x);
      if (prev) {
        prev.value = "";
        prev.focus();
      }
    } else {
      // If current cell has a letter, just clear it
      input.value = "";
    }
    
    checkCrossword();
  }
});

      // Click to toggle direction
      input.addEventListener("click", () => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        
        const canGoAcross = cellExists(row, col + 1) || cellExists(row, col - 1);
        const canGoDown = cellExists(row + 1, col) || cellExists(row - 1, col);
        
        // Toggle direction if both are possible
        if (canGoAcross && canGoDown) {
          currentDirection = currentDirection === "across" ? "down" : "across";
        } else if (canGoAcross) {
          currentDirection = "across";
        } else if (canGoDown) {
          currentDirection = "down";
        }
      });

      wrapper.appendChild(input);
      crosswordGrid.appendChild(wrapper);
    });
  });
}
function getPreviousCell(row, col) {
  let prev;
  
  if (currentDirection === "across") {
    prev = cellExists(row, col - 1);
    // If can't go back across, try up
    if (!prev) {
      prev = cellExists(row - 1, col);
    }
  } else {
    prev = cellExists(row - 1, col);
    // If can't go up, try back across
    if (!prev) {
      prev = cellExists(row, col - 1);
    }
  }
  
  return prev;
}
function cellExists(row, col) {
  return document.querySelector(
    `.crossCell[data-row="${row}"][data-col="${col}"]`
  );
}

function moveForward(row, col) {
  let next;
  
  if (currentDirection === "across") {
    next = cellExists(row, col + 1);
    // If can't go across, try down
    if (!next) {
      next = cellExists(row + 1, col);
    }
  } else {
    next = cellExists(row + 1, col);
    // If can't go down, try across
    if (!next) {
      next = cellExists(row, col + 1);
    }
  }
  
  if (next) next.focus();
}

function moveBackward(row, col) {
  let prev;
  
  if (currentDirection === "across") {
    prev = cellExists(row, col - 1);
    // If can't go back across, try up
    if (!prev) {
      prev = cellExists(row - 1, col);
    }
  } else {
    prev = cellExists(row - 1, col);
    // If can't go up, try back across
    if (!prev) {
      prev = cellExists(row, col - 1);
    }
  }
  
  if (prev) prev.focus();
}

function handleArrows(e) {
  const active = document.activeElement;
  if (!active.classList.contains("crossCell")) return;

  const row = parseInt(active.dataset.row);
  const col = parseInt(active.dataset.col);

  let next;

  if (e.key === "ArrowRight") {
    e.preventDefault();
    currentDirection = "across";
    next = cellExists(row, col + 1);
  }
  else if (e.key === "ArrowLeft") {
    e.preventDefault();
    currentDirection = "across";
    next = cellExists(row, col - 1);
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    currentDirection = "down";
    next = cellExists(row + 1, col);
  }
  else if (e.key === "ArrowUp") {
    e.preventDefault();
    currentDirection = "down";
    next = cellExists(row - 1, col);
  }

  if (next) next.focus();
}

function checkCrossword() {
  const cells = document.querySelectorAll(".crossCell:not(.block)");
  let correct = true;

  cells.forEach(cell => {
    if (cell.value !== cell.dataset.answer) {
      correct = false;
    }
  });

  if (correct) {
    crosswordMessage.textContent = "Perfect!You know us by heart!";
    document.removeEventListener("keydown", handleArrows);
    setTimeout(showDoor, 1500);
  }
}

// KISSING GAME

let kisses = 0;
let isWatching = false;
let watcherInterval = null;
let kissGameActive = false;

const kissRoom = document.getElementById("kissRoom");
const watcher = document.getElementById("watcher");
const kissBtn = document.getElementById("kissBtn");
const kissMessage = document.getElementById("kissMessage");
const kissRetryBtn = document.getElementById("kissRetryBtn");

// METER ELEMENTS
const kissFill = document.getElementById("kissFill");
const kissText = document.getElementById("kissText");

function startKissGame() {

  document.querySelectorAll(".room").forEach(r => r.style.display = "none");
  kissRoom.style.display = "block";

  kisses = 0;
  kissGameActive = true;
  isWatching = false;

  updateKissMeter();

  kissMessage.textContent = "";
  kissRetryBtn.style.display = "none";
  watcher.textContent = "⌣";

  if (watcherInterval) clearInterval(watcherInterval);
  watcherInterval = setInterval(toggleWatcher, 750);

  kissBtn.onclick = handleKiss;
  kissRetryBtn.onclick = startKissGame;
}

function toggleWatcher() {
  if (!kissGameActive) return;

  isWatching = Math.random() < 0.5;
  watcher.textContent = isWatching ? "👁" : "⌣";
}

function handleKiss() {
  if (!kissGameActive) return;

  if (isWatching) {
    loseKissGame();
    return;
  }

  kisses++;
  updateKissMeter();

  if (kisses >= 10) {
    winKissGame();
  }
}

function updateKissMeter() {
  const percent = (kisses / 10) * 100;
  kissFill.style.width = percent + "%";
  kissText.textContent = `${kisses} / 10 💋`;
}

function winKissGame() {
  endKissGame();
  kissMessage.textContent = "Your sneaky ass made it!";

  setTimeout(showDoor, 1500);
}

function loseKissGame() {
  endKissGame();
  kissMessage.textContent = "Oops, we got caught!";
  kissRetryBtn.style.display = "inline-block";
}

function endKissGame() {
  kissGameActive = false;

  if (watcherInterval) {
    clearInterval(watcherInterval);
    watcherInterval = null;
  }

  kissBtn.onclick = null;
}

// WHACK-A-MOLE 

const whackRoom = document.getElementById("whackRoom");
const holes = document.querySelectorAll(".hole");
const whackRetryBtn = document.getElementById("whackRetryBtn");

const whackFill = document.getElementById("whackFill");
const whackText = document.getElementById("whackText");

let whackScore = 0;
let whackGameActive = false;
let whackTimer = null;

function startWhackGame() {
  document.querySelectorAll(".room").forEach(r => r.style.display = "none");
  whackRoom.style.display = "block";

  whackScore = 0;
  whackGameActive = true;

  updateWhackMeter();

  whackRetryBtn.style.display = "none";

  holes.forEach(h => {
    h.innerHTML = "";
    h.classList.remove("show", "active");
  });

  if (whackTimer) clearInterval(whackTimer);
  whackTimer = setInterval(showMole, 900);
}

function showMole() {
  if (!whackGameActive) return;

  // Clear all holes first
  holes.forEach(h => {
    h.classList.remove("show", "active");
    h.innerHTML = "";
  });

  const hole = holes[Math.floor(Math.random() * holes.length)];
  const mole = document.createElement("div");
  mole.className = "mole";

  const isGood = Math.random() < 0.7;
  mole.textContent = isGood ? "🖤" : "💣";
  mole.dataset.good = isGood;
  mole.dataset.clicked = "false";

  hole.appendChild(mole);
  hole.classList.add("show");

  // Click handler on the mole itself for better sensitivity
  mole.onclick = (e) => {
    e.stopPropagation();
    if (mole.dataset.clicked === "false") {
      handleWhack(hole, mole);
    }
  };

  // Also add click handler to hole as backup
  hole.onclick = (e) => {
    e.stopPropagation();
    if (mole.dataset.clicked === "false") {
      handleWhack(hole, mole);
    }
  };

  // Auto-hide after 1 second
  setTimeout(() => {
    if (mole.dataset.clicked === "false") {
      hole.classList.remove("show");
      hole.onclick = null;
      if (mole) mole.onclick = null;
    }
  }, 1000);
}

function handleWhack(hole, mole) {
  if (!whackGameActive || mole.dataset.clicked === "true") return;

  // Mark as clicked immediately to prevent double-clicks
  mole.dataset.clicked = "true";

  hole.classList.add("active");
  setTimeout(() => hole.classList.remove("active"), 150);

  // Remove click handlers
  hole.onclick = null;
  mole.onclick = null;
  hole.classList.remove("show");

  if (mole.dataset.good === "true") {
    // Hit a heart
    whackScore++;
    updateWhackMeter();

    if (whackScore >= 10) {
      winWhackGame();
    }
  } else {
    // Hit a bomb - instant lose
    loseWhackGame();
  }
}

// Update Progress Bar
function updateWhackMeter() {
  const percent = (whackScore / 10) * 100;
  whackFill.style.width = percent + "%";
  whackText.textContent = `${whackScore} / 10 🖤`;
}

function winWhackGame() {
  endWhackGame();
  whackText.textContent = "You whacked all the love!";
  setTimeout(showDoor, 1500);
}

function loseWhackGame() {
  endWhackGame();
  whackText.textContent = "You hit a bomb! Try again!";
  whackRetryBtn.style.display = "inline-block";
}

function endWhackGame() {
  whackGameActive = false;
  clearInterval(whackTimer);
  

  holes.forEach(h => {
    h.classList.remove("show", "active");
    h.onclick = null;
    if (h.firstChild) h.firstChild.onclick = null;
  });
}

whackRetryBtn.onclick = startWhackGame;


//  MEMORY MATCH GAME (LIMITED TRIES)

const memoryRoom = document.getElementById("memoryRoom");
const memoryGrid = document.getElementById("memoryGrid");
const memoryMessage = document.getElementById("memoryMessage");
const memoryRetryBtn = document.getElementById("memoryRetryBtn");
const memoryTriesText = document.getElementById("memoryTries");

const memoryItems = [
  "PIU","PIU",
  "LOVE","LOVE",
  "CHOTU","CHOTU",
  "FAT NOSE","FAT NOSE",
  "POOPIE MONSTER","POOPIE MONSTER",
  "JAHED","JAHED",
  "CUTIE PATOOTIE","CUTIE PATOOTIE",
  "MUBUBU","MUBUBU"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let triesLeft = 15;

function startMemoryGame() {
  document.querySelectorAll(".room").forEach(r => r.style.display = "none");
  memoryRoom.style.display = "block";

  memoryGrid.innerHTML = "";
  memoryMessage.textContent = "";
  memoryRetryBtn.style.display = "none";

  matchedPairs = 0;
  triesLeft = 15;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  memoryTriesText.textContent = `Tries left: ${triesLeft}`;

  const shuffled = [...memoryItems].sort(() => Math.random() - 0.5);

  shuffled.forEach(text => {
    const card = document.createElement("div");
    card.className = "memoryCard";
    card.dataset.value = text;
    card.textContent = text;

    card.addEventListener("click", () => flipCard(card));
    memoryGrid.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;
  triesLeft--;
  memoryTriesText.textContent = `Tries left: ${triesLeft}`;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;
    resetTurn();

    if (matchedPairs === memoryItems.length / 2) {
      winMemoryGame();
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 900);
  }

  if (triesLeft <= 0 && matchedPairs < memoryItems.length / 2) {
    loseMemoryGame();
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function winMemoryGame() {
  memoryMessage.textContent = "Wow, your memory is sharp!";
          setTimeout(() => {
      showDoor();
    }, 1200);
}

function loseMemoryGame() {
  lockBoard = true;
  memoryMessage.textContent = "Try harder next time!";
  memoryRetryBtn.style.display = "inline-block";
}

memoryRetryBtn.onclick = startMemoryGame;


// FINAL DOOR LOGIC

const finalDoorRoom = document.getElementById("finalDoorRoom");
const finalBlanks = document.getElementById("finalBlanks");
const letterChoices = document.getElementById("letterChoices");
const finalSubmitBtn = document.getElementById("finalSubmitBtn");
const finalError = document.getElementById("finalError");

let finalAnswer = [];
const correctWord = "VALENTINE";

function startFinalDoor() {
  document.querySelectorAll(".room").forEach(r => r.style.display = "none");
  finalDoorRoom.style.display = "block";

  finalAnswer = [];
  finalError.textContent = "";
  finalBlanks.textContent = "_".repeat(correctWord.length);
  letterChoices.innerHTML = "";

  // Use collected letters (shuffled)
  const shuffled = [...collectedLetters].sort(() => Math.random() - 0.5);

  shuffled.forEach(letter => {
    const btn = document.createElement("div");
    btn.className = "letterChoice";
    btn.textContent = letter;

    btn.onclick = () => {
      finalAnswer.push(letter);
      btn.classList.add("used");
      updateFinalBlanks();
    };

    letterChoices.appendChild(btn);
  });
}

function updateFinalBlanks() {
  finalBlanks.textContent = finalAnswer.join("") +
    "_".repeat(correctWord.length - finalAnswer.length);
}

finalSubmitBtn.onclick = () => {
  if (finalAnswer.join("") === correctWord) {
    showFinalMessage();
  } else {
    finalError.textContent = "That’s not quite it… try again!";
    resetFinalDoor();
  }
};

function resetFinalDoor() {
  setTimeout(startFinalDoor, 800);
}

function showFinalMessage() {

  const finalRoom = document.getElementById("finalDoorRoom");

  // Hide basket
  document.getElementById("letterBasket").style.display = "none";


  finalRoom.classList.add("removeBg");

  setTimeout(() => {

    finalRoom.innerHTML = `

      <p class="finalMessage">
        and every february you’ll be my <strong>valentine</strong>.
      </p>

      <div class="finalVideoWrapper">
        <video autoplay muted controls playsinline>
          <source src="vday.mp4" type="video/mp4">
        </video>
      </div>
    `;

  }, 600);
}




