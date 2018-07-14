const field = document.querySelector('.field');
const sizeField = 20;
for (let r = 1; r <= sizeField; r++) {
  let row = document.createElement('div');
  row.classList.add('row');
  field.appendChild(row);
  for (let c = 1; c <= sizeField; c++) {
    let div = document.createElement('div');
    div.classList.add('cell', `row-${r}`, `col-${c}`);
    row.appendChild(div);
  }
}

const cells = document.querySelectorAll('.cell');

const currentCell = {
  col: Math.floor(sizeField / 2),
  row: Math.floor(sizeField / 2)
};

const foodCell = {};
generateFood();

let snakeLength = 2;

let direction = "down";

let snakeSpeed = 200;

const snakeMove = setInterval(function() {
  move(direction);
}, snakeSpeed);

addEventListener("keydown", function(e){
  console.log(e.keyCode);
  switch (e.keyCode) {

    case 37:
      if (direction === "right") break;
      direction = "left";
      break;

    case 38:
      if (direction === "down") break;
      direction = "top";
      break;

    case 39:
      if (direction === "left") break;
      direction = "right";
      break;

    case 40:
      if (direction === "top") break;
      direction = "down";
      break;

  }
});

function newGame() {
  snakeLength = 2;

  currentCell.col = Math.floor(sizeField / 2);
  currentCell.row = Math.floor(sizeField / 2);

  cells.forEach(el => {
    el.classList.remove('enabled');
  });
  generateFood();
}

function enableCell() {

  if (currentCell.row === sizeField + 1
    || currentCell.col === sizeField + 1
    || currentCell.row === 0
    || currentCell.col === 0
  ) {
    alert('Вы проиграли');
    newGame();
  }

  if (currentCell.row === foodCell.row && currentCell.col === foodCell.col) {
    generateFood();
    snakeLength++;
  }

  cells.forEach(el => {
    if (el.classList.contains(`row-${currentCell.row}`) && el.classList.contains(`col-${currentCell.col}`)) {
      if (el.classList.contains('enabled') && !(el.classList.contains('food-cell'))) {
        alert('Вы проиграли!');
        newGame();
      }

      el.classList.add('enabled');
      el.classList.remove('food-cell');

      let time = 0;
      console.log(this);
      let timeEnabled = setInterval(function () {
        // if (++time >= snakeLength) {
          el.classList.remove('enabled');
          clearInterval(timeEnabled);
        // }
      }, snakeSpeed * snakeLength);
    }
  });
}

function move(direction) {
  switch (direction) {

    case 'left':
      moveLeft();
      break;

    case 'top':
      moveTop();
      break;

    case 'right':
      moveRight();
      break;

    case 'down':
      moveDown();
      break;

  }
};

function moveLeft() {
  currentCell.col = currentCell.col - 1;
  enableCell();
}

function moveTop() {
  currentCell.row = currentCell.row - 1;
  enableCell();
}

function moveRight() {
  currentCell.col = currentCell.col + 1;
  enableCell();
}

function moveDown() {
  currentCell.row = currentCell.row + 1;
  enableCell();
}

function generateFood() {
  foodCell.col = Math.ceil(Math.random() * sizeField);
  foodCell.row = Math.ceil(Math.random() * sizeField);

  cells.forEach(el => {
    if (el.classList.contains(`row-${foodCell.row}`) && el.classList.contains(`col-${foodCell.col}`)) {

      if (el.classList.contains('enabled')) {
        return generateFood();
      } else {
        el.classList.add('enabled', 'food-cell');
      }
    }
  });
}