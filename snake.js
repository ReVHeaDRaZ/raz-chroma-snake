//board
const blockSize = 1;
const rows = 6;
const cols = 22;
var board;
var context;
var drawData = new Array(rows); // Draw Data for Razer Chroma keyboard

//snake head
var snakeX;
var snakeY;
var velocityX;
var velocityY;
var snakeBody = [];
var snakeColor = 0x00ff00; //GREEN in BGR

//food
var foodX;
var foodY;
var foodColor = 0x0000ff; //RED in BGR

var gameTimer;
var gameOver = true;

function newGame() {
    snakeX = blockSize * 2;
    snakeY = blockSize * 2;
    velocityX = 1;
    velocityY = 0;
    snakeBody = [];
    snakeColor = 0x00ff00; //GREEN in BGR

    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    board.style = "transform: scale(20);";    
    
    //Fill dataBuffer array with 0's
    
    for (let r = 0; r < 6; r++) {
        drawData[r] = new Array(22).fill(0);
    }

    placeFood();
    gameOver = false;
    document.addEventListener("keyup", changeDirection);
    //update loop
    gameTimer = setInterval(update, 100); //100 milliseconds
}

function update() {
    if (gameOver) {
        clearInterval(gameTimer);
        return;
    }

    // Clear draw data
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
    for(let r=0; r<rows; r++){
        drawData[r] = new Array(cols).fill(0);
    }

    // Draw food
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    drawData[foodY][foodX] = foodColor;

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    //Move Snake
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize-1) {
        gameOver = true;
        keyboardEffect.createAlerts(0);
        alert("Game Over");
        return;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
            return;
        }
    }

    //Draw Snake
    context.fillStyle="lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    drawData[snakeY][snakeX] = snakeColor;
    //and body
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        drawData[snakeBody[i][1]][snakeBody[i][0]] = snakeColor;
    }

    //Send buffer to razer chroma api
    keyboardEffect.sendDataBuffer(drawData);
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}