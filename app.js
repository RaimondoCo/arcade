

//Starting point:

let head = [];
let snakeBody = [];
let snakeBody2 = [];


function reset() {
    let head = [];
    let snakeBody = [];
};


// Set up math functions to utilize in the game

// function to evaluate if two points in the grids are the same
const pointEquals = function([x1,y1],[x2,y2]){
    return x1==x2 && y1==y2;
}

//math-random to pick the first position
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//used to compute nextPosition of snake head
//calculate the coordinates of the new head in an array of arrays
function sumArr(a, b) {
    let c = a[0];
    let d = a[1];
    let e = b[0];
    let f = b[1];
    x = c + e;
    y = d + f;
    return [x, y];
};


//set the size of the grid
let gridLength = 30;

//create the grid
function makeGrid(){
    let container = document.getElementById("grid");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    
    for (let i=0; i<gridLength; i++){
        for (let j=0; j<gridLength; j++) {
            let cell = document.createElement("div");
            cell.id = "x" + i + 'y' + j
            container.appendChild(cell); 
        }
    }
    return;
}

//set the grid in css
var r = document.querySelector(':root');
function getDiv() {
    var rs = getComputedStyle(r);
}
function setDiv() {
    r.style.setProperty(`--repeat(30, 15px)`, `repeat(${ gridLength }, 15px)` )
}


// define a function that applies a class to the cells  of the array
function applyClasstoCell (array, classID){
    for ([x,y] of array) {
        let itemID = "x" + x + "y" + y
        // console.log("this is the item to which we apply the class: " + itemID);
        let element = document.getElementById(itemID);
        // console.log("this is the element: " + element);
        element.classList = [classID];
    } return;
}

//change max depending on the game size --> to make into a variable later, 
//but keep the start at 10 positions from the wall

// create snake
let snakeStart = [];
function createSnake(){
    snakeStart = [getRandomInt(1, gridLength-10), getRandomInt(1, gridLength-10)];
    // console.log(snakeStart)
    //add the snakeStart to the grid
    let snakeId = "x" + snakeStart[0] + "y" + snakeStart[1]
    let  snake = document.getElementById(snakeId);
    snake.classList=["snakeBody"];
    return;
}



// create snake 2
let snake2Start = [];
function createSnake2(){
    snake2Start = [getRandomInt(1, gridLength-10), getRandomInt(1, gridLength-10)];
    // console.log(snakeStart)
    //add the snakeStart to the grid
    let snake2Id = "x" + snake2Start[0] + "y" + snake2Start[1]
    let  snake2 = document.getElementById(snake2Id);
    snake2.classList=["snake2Body"];
    return;
}

 //create the apple
let apple = [];
function createApple(){
    apple = [getRandomInt(1, gridLength-10), getRandomInt(1, gridLength-10)];
    console.log('app: ',apple);
    return;
}


// change of direction following someone's input
// let body = document.getElementById("body");
window.addEventListener("keydown", function(e) {
    switch(e.code) {
        case "ArrowDown":
        return nextDirection = directions[2];
        // console.log("I pressed the arrow down")
        case "ArrowUp":
        return nextDirection = directions[3];
        // console.log("I pressed the arrow up")
        case "ArrowLeft":
        return nextDirection = directions[1];
        // console.log("I pressed the arrow left")
        case "ArrowRight":
        return nextDirection = directions[0];
        // console.log("I pressed the arrow right")
    }
});


// control for snake2
window.addEventListener("keydown", function(e) {
    switch(e.code) {
        case "KeyS":
        return nextDirection2 = directions[2];
        console.log("I pressed the arrow down")
        case "KeyW":
        return nextDirection2 = directions[3];
        console.log("I pressed the arrow up")
        case "KeyA":
        return nextDirection2 = directions[1];
        console.log("I pressed the arrow left")
        case "KeyD":
        return nextDirection2 = directions[0];
        console.log("I pressed the arrow right")
    }
});


//set a directions array and pick a random direction
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

let nextDirectionIndex = getRandomInt(0, 4)
// console.log("this is the next direction index: " + nextDirectionIndex)

// console.log("this is the next direction: " + nextDirection)


// console.log(sumArr(snakeStart, nextDirection));

function initializeGame(){
    let img = document.querySelector("img");
    img.src = '';
    makeGrid();
    createSnake();
    createApple();
    nextDirection = directions[nextDirectionIndex]
    snakeBody = [sumArr(snakeStart, nextDirection), snakeStart];
}




// move: add the following item as a coordinate array to the array 
//at the beginning and remove the last


function renderEndGame(){
    // document.getElementById("endGame").innerHTML = "Game Over! " + snakeBody.length + " chunks in your snake!";
    let img = document.querySelector("img");
     img.src = 'GameOver.png';
    return clearInterval(interval);;
}


//move Snake
function moveSnake(where) {
    head = where; 
    snakeBody = [head].concat(snakeBody);
    if (!pointEquals(head, apple)) {
        let snakeLastPosition = snakeBody.pop();
        // console.log("snakeLastPosition: " + snakeLastPosition + "snakebody: " + snakeBody);
        let sLPIdx = "x" + snakeLastPosition[0] + "y" + snakeLastPosition[1]
        // console.log("this is the last position index" + sLPIdx)
        let sLP = document.getElementById(sLPIdx);
        // console.log(sLP)
        sLP.classList=[];
    } else {
        createApple();
    }
    applyClasstoCell(snakeBody, "snakeBody");
    applyClasstoCell([apple], "apple")
    return snakeBody;
}

function snakeSize(){
    let size = snakeBody.length;
    document.getElementById("snakeSize").innerHTML = "Congratulations! Your snake is long: " + size + " chunks!";
    document.getElementById("snakeSize").style.backgroundColor = "grey";
    return;
}



function selfBite(head,snakeBody){
    for (chunk of snakeBody) {
        console.log(pointEquals(head, chunk))
        if (pointEquals(head, chunk)) {
            return true;
    } 
}return false;
}

function isWall (head,gridLength) {
    if (head[0] < 0 || head[0] > gridLength || head[1]<0 || head[1]> gridLength) {
        return true;
    } return false;
}


function stopSnake(head){
    // //loop through the items in the array, if it matches the new item 
    // // stop the game
    //tail = snakeBody - head
    if (selfBite(head, snakeBody)) {
        renderEndGame();
        clearInterval(interval);
    }

    // //check new items of the array, if it matches one of the walls
    // //stop the game
    if (isWall(head, gridLength)){
        renderEndGame();
        clearInterval(interval);
    }      
}


// // stopSnake(); 
// function stopGame(){
//     return clearInterval(runFunction);
//         }
        
//set up the difficulty
let selection = document.getElementById("selection")
let startGameButton = document.getElementById("startGame")
startGameButton.addEventListener("click", startGame)



const selectElement = document.querySelector('.selection');
let setTime = 2000;
selectElement.addEventListener('change', startGame);

let interval;
function startGame(level) {
    if (!!interval){
        clearInterval(interval);
    }
    switch(level) {
        case "easy":
            setTime = 700;
        break;
        case "normal":
            setTime = 300;
        break;
        case "hard":
            setTime = 100;
        break;
        case "veryHard":
            setTime = 50;
        break;
        default: 
            setTime = 700;
    } 
    // runFunction();
    interval=setInterval(gameLoop, setTime);
    initializeGame();
    // document.getElementById("grid").focus()
    document.activeElement.blur();
}

// function runFunction() {
//     initializeGame();
    
// startGame.addEventListener("click", runFunction())

function gameLoop(){
    let newHead = sumArr(snakeBody[0], nextDirection);
    stopSnake(newHead);
    moveSnake(newHead);
    snakeSize();
        } 
        
        

        
        
        // // // SNAKE
        // // As a user playing the game I want to:
        
        // // start the game by pressing a Start button
        // // use my arrow keys to change the direction of the snake
        // // have the snake grow correctly when it eats the apple
        // // have the game end if the snake tries to eat itself
        // // have the game end if the snake runs into a wall
        // // see how long my snake was when the game ended
        // // start the game over without having to reset the browser
        // // As a user playing the game I would be delighted if I:
        
        // // can set the difficulty (speed of snake)
        // // can keep track of my stats (maximum points, average points, etc.) between games
        
        
        // function separate(array, size) {
        //     const chunkedArr = [];
        //     let index = 0;
        //     while (index < array.length) {
        //         chunkedArr.push(array.slice(index, size + index));
        //         index += size;
        //     }
        //     return chunkedArr;
        // };