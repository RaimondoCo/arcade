// // SNAKE
// As a user playing the game I want to:

// start the game by pressing a Start button
// use my arrow keys to change the direction of the snake
// have the snake grow correctly when it eats the apple
// have the game end if the snake tries to eat itself
// have the game end if the snake runs into a wall
// see how long my snake was when the game ended
// start the game over without having to reset the browser
// As a user playing the game I would be delighted if I:

// can set the difficulty (speed of snake)
// can keep track of my stats (maximum points, average points, etc.) between games



// THE STATE
// The snake has two important features: a body, and a intended direction

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [1, 0]
 }
// Every time the game tick() happens, you need to remove the "tail of the snake" (the sub-array at position 0) and tack on a new "head" (you can use the last sub-array and the nextDirection to generate the new final sub-array).

// However, if it is eating an apple, you won't remove the tail when the snake grows, you'll simply add the new head without doing that.

// Overall your state can look like this:

let gameState = {
  apple: [11, 8],
 snake: snake // from above
}
// SOME HARD PARTS
// Here we have a game that is updating with or without user input... once the game starts the snake will start moving right away, prompting the user to start making decisions for the sake of their snake.

// You'll have to listen for keydown events. These come with data on which key has been pressed, so you can set things like the nextDirection property whenever the event fires. You should make a decision if it's possible for the snake to set a nextDirection that would put its head in its own throat (the second-to-last position) or not... this will effect how the gameplay feels.

// You'll have to determine if the snake is self-intersecting (if the "head" is the same value as any of its parts) after each tick()... if so, the game is over. The same goes for walls, which are simply any index outside the bounds of the grid.



//Starting point:

//onclick

//mathrandom pick the first position
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//change max depending on the game size 
//--> to make into a variable later, 
//but keep it at least 5/10 positions from the wall
//let's start with a 30*30 grid

let firstXPosition = getRandomInt(0, 20);
let firstYPosition = getRandomInt(0, 20);

// store in the snake body array

let snakeBody = [[firstXPosition, firstYPosition]];
// snakeBody = snakeBody.concat(firstPosition[0]);

console.log(snakeBody);

//set a directions array

let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

//next direction: 
    //-start with a random direction (randomly pick an item of the array)
    // with math random

let nextDirectionIndex = getRandomInt(0, 3)

nextDirection = directions[nextDirectionIndex]

    // following direction is the same as before, change nothing until
    //there is someone else's input

    // change of direction following someone's input

    window.addEventListener("keydown", function(event) {
      
        switch(event.code) {
          case "KeyS":
          case "ArrowDown":
            nextDirection = directions[1];
            break;
          case "KeyW":
          case "ArrowUp":
            nextDirection = directions[0];
            break;
          case "KeyA":
          case "ArrowLeft":
            nextDirection = directions[3];
            break;
          case "KeyD":
          case "ArrowRight":
            nextDirection = directions[2];
            break;
        }
      });


    // move: add the following item as a coordinate array to the array 
    //at the beginning and remove the last

    function sumArr(a, b) {
        let c = a[0]
        let d = a[1]
        let e = b[0]
        let f = b[1]
          x = c + e;
          y = d + f;
          return [x, y];
         }

function moveSnake(){
    let newItem = sumArr(snakeBody[0], nextDirection);
    snakeBody = snakeBody.concat(newItem);


    let snakeLastPosition = snakeBody[snakeBody.length-1]
    snakeBody.pop(snakeLastPosition);
}


    // end if hitting wall
    
    

    //end if hitting himself


    // meet apple
        // add cell to the object

        //remove nothing
