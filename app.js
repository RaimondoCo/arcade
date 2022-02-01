

//Starting point:

//onclick

//set the correct amount of div
let gridLength = 25;

//make a grid
let container = document.getElementById("grid");
for (let i=0; i<gridLength; i++){
    for (let j=0; j<gridLength; j++) {
        let cell = document.createElement("div");
        cell.id = "x" + i + 'y' + j
        container.appendChild(cell); 
    }
}

//math-random pick the first position
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//change max depending on the game size --> to make into a variable later, 
//but keep the start at 10 positions from the wall

// store in the snake body array
let snakeStart = [];
snakeStart = [getRandomInt(1, gridLength-10), getRandomInt(1, gridLength-10)];

console.log(snakeStart)

//add the snakeStart to the grid
let snakeId = "x" + snakeStart[0] + "y" + snakeStart[1]
let  snake = document.getElementById(snakeId);
snake.classList.add("snakeBody");


//create the apple
let apple = [getRandomInt(1, gridLength-10), getRandomInt(1, gridLength-10)];
console.log(apple);

// add the apple to the grid
let appleIdToFind = "x" + apple[0] + "y" + apple[1]
let  appleFound = document.getElementById(appleIdToFind);
appleFound.classList.add("apple");



//set a directions array and pick a random direction

const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

let nextDirectionIndex = getRandomInt(0, 4)
console.log("this is the next direction index: " + nextDirectionIndex)
nextDirection = directions[nextDirectionIndex]
console.log("this is the next direction: " + nextDirection)

// the following direction is the same as before, change nothing until
//there is someone else's input

// change of direction following someone's input
let body = document.getElementById("body");
body.addEventListener("keydown", function(e) {
    switch(e.code) {
        case "KeyS":
        case "ArrowDown":
            return nextDirection = directions[2];
            console.log("I pressed the arrow down")
            break;
          case "KeyW":
          case "ArrowUp":
            return nextDirection = directions[3];
            console.log("I pressed the arrow up")
            break;
          case "KeyA":
          case "ArrowLeft":
            return nextDirection = directions[1];
            console.log("I pressed the arrow left")
            break;
          case "KeyD":
          case "ArrowRight":
            return nextDirection = directions[0];
            console.log("I pressed the arrow right")
            break;
        }
      });


//calculate the coordinates of the new item in the array of arrays
function sumArr(a, b) {
    let c = a[0];
    let d = a[1];
    let e = b[0];
    let f = b[1];
        x = c + e;
        y = d + f;
    return [x, y];
    };

console.log(sumArr(snakeStart, nextDirection));

//identify the game boundaries
let wallsArr = 
[   [1, (gridLength/2)], 
    [1, -(gridLength/2)], 
    [(gridLength/2), 1], 
    [-(gridLength/2), 1]
                        ];

// move: add the following item as a coordinate array to the array 
    //at the beginning and remove the last
    let snakeBody = [sumArr(snakeStart, nextDirection), snakeStart];

    console.log(snakeBody);
    
    // console.log("this is the start of the snake: " + snakeStart)
    // console.log("this is the next direction: " + nextDirection)
    // console.log("this is the second item: " + secondItem)

    let arrayEx = [ [0,1], [3,4] ];

    function applyClasstoCell (array, classID){
        let x = -1;
        let y = -1;
        let itemID = "";
        for (i=0; i<=array.length; i++) {
            x = array[i][0];
            console.log("this is x " + x)
            y = array[i][1];
            console.log("this is y " + y)
            itemID = "x" + x + "y" + y
            console.log(itemID);
            let result = document.getElementById(itemID);
            console.log(result);
            result.classList.add(classID);
            return;
        } 
    }
// applyClasstoCell(arrayEx, "snakeBody");
applyClasstoCell(snakeBody, "snakeBody");
    



    function moveSnake(){

        let newItem = sumArr(snakeBody[0], nextDirection);
        console.log(newItem);

// //loop through the items in the array, if it matches the new item 
// // stop the game
    for (i=0; i< snakeBody.length; i++) {
        if (newItem == snakeBody[i]) {
        console.log("I'm on myself!") }
        else {
// //check new items of the array, if it matches one of the walls
// //stop the game
    for (i=0; i< 4; i++) {
        if (newItem == wallsArr[i]) {
            console.log("Ooops the wall!") } 
        else {
// //check new item in the array, if it matches the apple add item
// //don't remove any, and continue
        if (newItem == apple) {
            snakeBody = [newItem, snakeBody]; 
            console.log(snakeBody);}  
        else {
            snakeBody = [newItem, snakeBody];
// //and remove last item and add the new one
        let snakeLastPosition = snakeBody[snakeBody.length-1]
        snakeBody.pop(snakeLastPosition);

            }
            }
        }
        }
        }
        applyClasstoCell(snakeBody, "snakeBody");
        // let nthItem = "x" + newItem[0] + "y" + newItem[1]
        // let nthsnake = document.getElementById(nthItem);
        // nthsnake.classList.add("snakeBody");
    }


// moveSnake();

setInterval(moveSnake, 1000);










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



// // THE STATE
// // The snake has two important features: a body, and a intended direction

// let snake = {
//     body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
//     nextDirection: [1, 0]
//  }
// // Every time the game tick() happens, you need to remove the "tail of the snake" (the sub-array at position 0) and tack on a new "head" (you can use the last sub-array and the nextDirection to generate the new final sub-array).

// // However, if it is eating an apple, you won't remove the tail when the snake grows, you'll simply add the new head without doing that.

// // Overall your state can look like this:

// let gameState = {
//   apple: [11, 8],
//  snake: snake // from above
// }
// // SOME HARD PARTS
// // Here we have a game that is updating with or without user input... once the game starts the snake will start moving right away, prompting the user to start making decisions for the sake of their snake.

// // You'll have to listen for keydown events. These come with data on which key has been pressed, so you can set things like the nextDirection property whenever the event fires. You should make a decision if it's possible for the snake to set a nextDirection that would put its head in its own throat (the second-to-last position) or not... this will effect how the gameplay feels.

// // You'll have to determine if the snake is self-intersecting (if the "head" is the same value as any of its parts) after each tick()... if so, the game is over. The same goes for walls, which are simply any index outside the bounds of the grid.

// function findGridPosition(gridLength, item) {
//     let gridPosition = (item[1]-1)*gridLength + item[0];
//     return gridPosition;
// }

// console.log(findGridPosition(5, [3,3]));

// function addSnake(snake) {
// for (let i=0; i<625; i++){
//     let snakeGridPosition = findGridPosition(25, snake);
//     if ( i == snakeGridPosition) {
//         let div = document.getElementsByTagName("div")[i];
//         return div.classList.add("snakeBody");
//         }
//     }
// }
// addSnake(snakeStart);
// function addApple() {
//     for (let i=0; i<625; i++){
//         let appleGridPosition = findGridPosition(25, apple);
//         if ( i == appleGridPosition) {
//             let div = document.getElementsByTagName("div")[i];
//             return div.classList.add("apple");
//             }
//         }
//     }
//     addApple();
