
const { uuid } = require('uuid');
const { v1 } = require('bucket-sort-kilaofsouls');
const { v2 } = require('even-numbers-kilaofsouls');

// snakeGame.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const width = 10;
const height = 10;
let snake = [{ x: 5, y: 5 }];
let direction = 'right';
let food = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };

function printBoard() {
    let board = '';
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (x === food.x && y === food.y) {
                board += '@';
            } else if (snake.some(segment => segment.x === x && segment.y === y)) {
                board += '#';
            } else {
                board += '.';
            }
        }
        board += '\n';
    }
    console.log(board);
}

function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
    } else {
        snake.pop();
    }
}

rl.on('line', input => {
    switch (input) {
        case 'w':
            if (direction !== 'down') direction = 'up';
            break;
        case 's':
            if (direction !== 'up') direction = 'down';
            break;
        case 'a':
            if (direction !== 'right') direction = 'left';
            break;
        case 'd':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

setInterval(() => {
    moveSnake();
    printBoard();
}, 500);

console.log('Welcome to Snake Game! Use WASD keys to control the snake.');
printBoard();


module.exports = { printBoard };
