document.addEventListener("DOMContentLoaded", () => {
  const userGrid = document.querySelector(".grid-user");
  const computerGrid = document.querySelector(".grid-computer");
  const displayGrid = document.querySelector(".grid-display");
  const ship = document.querySelectorAll(".ship");
  const destroyer = document.querySelector(".destroyer-container");
  const submarine = document.querySelector(".submarine-container");
  const cruiser = document.querySelector(".cruiser-container");
  const battleship = document.querySelector(".battleship-container");
  const carrier = document.querySelector(".carrier-container");
  const StartButton = document.querySelector("#start");
  const rotateButton = document.querySelector("#rotate");
  const turnDisplay = document.querySelector("#whose-go");
  const infoDisplay = document.querySelector("#info");
  const userSquares = [];
  const computerSquares = [];
  let isHorizontal = true;
  let isGameOver = false;
  let currentPlayer = 'user';

  const width = 10;

  // Create boards
  function creatBoard(grid, squares) {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
  }

  creatBoard(userGrid, userSquares);
  creatBoard(computerGrid, computerSquares);

  // Ships
  const shipArray = [
    {
      name: "destroyer",
      directions: [
        [0, 1],
        [0, width],
      ],
    },
    {
      name: "submarine",
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: "cruiser",
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: "battleship",
      directions: [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3],
      ],
    },
    {
      name: "carrier",
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width * 2, width * 3, width * 4],
      ],
    },
  ];

  // Draw the computers ships in random locations
  function generate(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    let randomStart = Math.abs(
      Math.floor(
        Math.random() * computerSquares.length -
          ship.directions[0].length * direction
      )
    );

    const isTaken = current.some((index) =>
      computerSquares[randomStart + index].classList.contains("taken")
    );
    const isAtRightEdge = current.some(
      (index) => (randomStart + index) % width === width - 1
    );
    const isAtLeftEdge = current.some(
      (index) => (randomStart + index) % width === 0
    );

    if (!isTaken && !isAtRightEdge & !isAtLeftEdge)
      current.forEach((index) =>
        computerSquares[randomStart + index].classList.add("taken", ship.name)
      );
    else generate(ship);
  }

  generate(shipArray[0]);
  generate(shipArray[1]);
  generate(shipArray[2]);
  generate(shipArray[3]);
  generate(shipArray[4]);

  // Rotate the ships
  function rotate() {
    if (isHorizontal) {
      destroyer.classList.toggle("destroyer-container-vertical");
      submarine.classList.toggle("submarine-container-vertical");
      cruiser.classList.toggle("cruiser-container-vertical");
      battleship.classList.toggle("battleship-container-vertical");
      carrier.classList.toggle("carrier-container-vertical");
      isHorizontal = false;
      console.log(isHorizontal);
      return;
    }
    if (!isHorizontal) {
      destroyer.classList.toggle("destroyer-containe");
      submarine.classList.toggle("submarine-containerl");
      cruiser.classList.toggle("cruiser-container");
      battleship.classList.toggle("battleship-container");
      carrier.classList.toggle("carrier-container");
      isHorizontal = true;
      console.log(isHorizontal);
      return;
    }
  }
  rotateButton.addEventListener("click", rotate);

  // move around user ship
  ship.forEach((ship) => ship.addEventListener("dragstart", dragStart));
  userSquares.forEach((square) =>
    square.addEventListener("dragstart", dragStart)
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragover", dragOver)
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragenter", dragEnter)
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragleave", dragLeave)
  );
  userSquares.forEach((square) => square.addEventListener("drop", dragDrop));
  userSquares.forEach((square) => square.addEventListener("dragend", dragEnd));

  let selectedShipNameWithIndex;
  let draggedShip;
  let draggedShipLength;

  ship.forEach((ship) =>
    ship.addEventListener("mousedown", (e) => {
      selectedShipNameWithIndex = e.target.id;
    })
  );

  function dragStart() {
    draggedShip = this;
    draggedShipLength = this.childNodes.length;
  }
  function dragOver(e) {
    e.preventDefault();
  }
  function dragEnter(e) {
    e.preventDefault();
  }
  function dragLeave() {
    console.log("drag leave");
  }
  function dragDrop() {
    let shipNameWithLastid = draggedShip.lastChild.id;
    let shipClass = shipNameWithLastid.slice(0, -2);
    console.log(shipClass);
    let lastShipIndex = parseInt(shipNameWithLastid.substr(-1));
    let shipLastId = lastShipIndex + parseInt(this.dataset.id);
    console.log(shipLastId)
    const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1,11, 21, 31,41,51, 61, 71, 81, 91, 2,12, 22, 32, 42,52,62,72, 82, 92, 3,13, 23, 33, 43,53,63,73, 73, 83, 93]
    const notAllowedVertical = [99, 98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80, 79,78,76,75,74,73,72,71,70,69,68,67,66,65,64, 63,62,61,60]

    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex);
    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex);
    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));

    shipLastId = shipLastId - selectedShipIndex
    console.log(shipLastId)

    if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      for (let i = 0; i < draggedShipLength; i++) {
        userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', shipClass);
      }
    } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
      for (let i = 0; i < draggedShipLength; i++) {
        userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', shipClass);
      }
    } else return

    displayGrid.removeChild(draggedShip);
    
  }
  function dragEnd() {
    console.log('dragend')
  }

  // Game Logic

  function playGame() {
    if(isGameOver) return;
    if (currentPlayer === 'user') {
      turnDisplay.innerHTML = 'Your Go';
      computerSquares.forEach(square => square.addEventListener('click', function(e) {
        revealSquare(square);
      }))
    }
    if (currentPlayer === 'computer') {
      turnDisplay.innerHTML = 'Computers Go';
      // function computerGo
      setTimeout(computerGo, 1000);
    }
  }
  StartButton.addEventListener('click', playGame)

  let destroyerCount = 0;
  let submarineCount = 0;
  let cruiserCount = 0;
  let battleshipCount = 0;
  let carrierCount = 0;


  function revealSquare(square) {
    if (!square.classList.contains('boom')) {
      if(square.classList.contains('destoyer')) destroyerCount++;
      if(square.classList.contains('submarine')) submarineCount++;
      if(square.classList.contains('cruiser')) cruiserCount++;
      if(square.classList.contains('battleship')) battleshipCount++;
      if(square.classList.contains('carrier')) carrierCount++;
    }
    if(square.classList.contains('taken')) {
      square.classList.add('boom');
    } else {
      square.classList.add('miss');
    }
    currentPlayer = 'computer';
    playGame();
  }

  let cpuDestroyerCount = 0;
  let cpuSubmarineCount = 0;
  let cpuCruiserCount = 0;
  let cpuBattleshipCount = 0;
  let cpuCarrierCount = 0;

  function computerGo() {
    let random = Math.floor(Math.random() * userSquares.length);
    if (!userSquares[random].classList.contains('boom')){
      userSquares[random].classList.add('boom');
      if(userSquares[random].classList.contains('destoyer')) cpuDestroyerCount++;
      if(userSquares[random].classList.contains('submarine')) cpuSubmarineCount++;
      if(userSquares[random].classList.contains('cruiser')) cpuCruiserCount++;
      if(userSquares[random].classList.contains('battleship')) cpuBattleshipCount++;
      if(userSquares[random].classList.contains('carrier')) cpuCarrierCount++;
    } else computerGo()
    currentPlayer = 'user';
    turnDisplay.innerHTML = 'Your Go';
    
  }

  function checkForWins() {
    if(destroyerCount === 2) {
      infoDisplay.innerHTML = 'You sun the computers destroyer';
      destroyerCount = 10;
    }
    if(submarineCount === 3) {
      infoDisplay.innerHTML = 'You sun the computers submarine';
      submarineCount = 10;
    }
    if(cruiserCount === 3) {
      infoDisplay.innerHTML = 'You sun the computers cruiser';
      cruiserCount = 10;
    }
    if(battleshipCount === 4) {
      infoDisplay.innerHTML = 'You sun the computers battleship';
      battleshipCount = 10;
    }
    if(carrierCount === 5) {
      infoDisplay.innerHTML = 'You sun the computers carrier';
      carrierCount = 10;
    }
    if(cpuDestroyerCount === 2) {
      infoDisplay.innerHTML = 'You sun the computers cpuDestroyer';
      cpuDestroyerCount = 10;
    }
    if(cpuSubmarineCount === 3) {
      infoDisplay.innerHTML = 'You sun the computers cpuSubmarine';
      cpuSubmarineCount = 10;
    }
    if(cpuCruiserCount === 3) {
      infoDisplay.innerHTML = 'You sun the computers cpuCruiser';
      cpuCruiserCount = 10;
    }
    if(cpuBattleshipCount === 4) {
      infoDisplay.innerHTML = 'You sun the computers cpuBattleship';
      cpuBattleshipCount = 10;
    }
    if(cpuCarrierCount === 5) {
      infoDisplay.innerHTML = 'You sun the computers cpuCarrier';
      cpuCarrierCount = 10;
    }
    if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50) {
      infoDisplay.innerHTML = "YOU WIN!";
      gameOver();
    }
    if ((cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount) === 50) {
      infoDisplay.innerHTML = "Computer WINs!";
      gameOver();
    }
  }

  function gameOver() {
    isGameOver = true;
    StartButton.removeEventListener('click', playGame)
  }

});
