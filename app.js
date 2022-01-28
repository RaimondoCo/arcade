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

