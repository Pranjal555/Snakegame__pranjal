var startdir = { x: 0, y: 0 };
let foodsound = new Audio("food.wav");
let gameover = new Audio("gameover.wav");
var movesound = new Audio("movesound.wav");
var music = new Audio("music.wav");
var score = 0;
var level = 1;

var snake = [
  {
    x: 9,
    y: 9,
  },
];
var food = {
  x: 13,
  y: 15,
};
var speed = 2;
var last_time = 0;
/////////////////////////
//////////////////////
/////////////////////////////
////////////////////////

function main(ctime) {
  window.requestAnimationFrame(main);
  if (((ctime - last_time) / 1000) * speed >= 1) {
    // console.log(ctime);
    last_time = ctime;
    game_engine();
  }
}

function isCollide(snake) {
  for (var i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameover.play();
      return true;
    }
  }
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
    gameover.play();
    return true;
  }
}

function game_engine() {
  music.play();
  //update snake and food items
  if (isCollide(snake)) {
    gameover.play();
    music.pause();
    startdir = { x: 0, y: 0 };
    alert("Game Over, Press any key to play again.");
    snake = [{ x: 9, y: 9 }];
    music.play();
    score = 0;
  }

  //If food eaten, increase the length of snake,increase the score and regnerate the food
  if (snake[0].y == food.y && snake[0].x == food.x) {
    foodsound.play();
    score += 1;
    document.getElementById("score").innerHTML = "Score: " + score;
    snake.unshift({ x: snake[0].x + startdir.x, y: snake[0].y + startdir.y });
    var a = 2;
    var b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    //Increasing Level
    if (snake.length % 10 == 0) { speed += 1; level += 1; document.getElementById("level").innerHTML = "level: " + level; }
  }

  /////Moving the snake
  for (var i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }
  snake[0].x += startdir.x;
  snake[0].y += startdir.y;

  //Display snake
  board.innerHTML = "";
  snake.forEach((e, index) => {
    var belly = document.createElement("div");
    belly.style.gridRowStart = e.y;
    belly.style.gridColumnStart = e.x;
    if (index == 0) {
      belly.classList.add("head");
    } else belly.classList.add("snake");
    board.appendChild(belly);
  });

  //Display food
  var foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  startdir = { x: 0, y: 1 };
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      startdir.x = 0;
      startdir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      startdir.x = 0;
      startdir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      startdir.x = -1;
      startdir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      startdir.x = 1;
      startdir.y = 0;
      break;
  }
});
