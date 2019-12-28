const canvasInfo = {
	squareSide: 20,
	numberOfSquare: 20
}
const game = {
	snake: {
		xAxis: {
			position: 5,
			velocity: 0
		},
		yAxis: {
			position: 5,
			velocity: 0
		},
		tail: {
			length: 5,
			tails: []
		}
	},
	fruit: {
		xPosition: 15,
		yPosition: 15,
		collected: 0
	},
	score: {
		actual: 0,
		record: 0
	}
}


var gameCanvas = document.getElementById('gameBoard');
var context = gameCanvas.getContext('2d');
var lastMovement;


setInterval( () => {
	nextPosition('xAxis');
	nextPosition('yAxis');

	context.strokeStyle = 'GRAY';
	context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	context.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

	context.fillStyle = 'RED';
	context.fillRect(game.fruit.xPosition*canvasInfo.squareSide, 
									 game.fruit.yPosition*canvasInfo.squareSide, 
									 canvasInfo.squareSide, canvasInfo.squareSide);

	context.fillStyle = 'GREEN';
	for (const somePartOfTail of game.snake.tail.tails) {

		context.fillRect(somePartOfTail.x*canvasInfo.squareSide, 
										 somePartOfTail.y*canvasInfo.squareSide,
										 canvasInfo.squareSide, canvasInfo.squareSide);

		if (somePartOfTail.x === game.snake.xAxis.position && somePartOfTail.y === game.snake.yAxis.position) {
			game.snake.xAxis.velocity = 0;
			game.snake.yAxis.velocity = 0;
			game.snake.tail.length = 5;
			game.snake.tail.tails = [];
			game.fruit.collected = 0;
			lastMovement = '';

			if (game.score.actual > game.score.record) {
				game.score.record = game.score.actual;
				game.score.actual = 0;
			}

			updateScoreboard();
		}
	}

	game.snake.tail.tails.push({
		x: game.snake.xAxis.position,
		y: game.snake.yAxis.position
	})

	while (game.snake.tail.tails.length > game.snake.tail.length) {
		game.snake.tail.tails.shift();
	}

	if (game.snake.xAxis.position === game.fruit.xPosition && game.snake.yAxis.position === game.fruit.yPosition) {
		game.snake.tail.length++;
		game.fruit.collected++;
		game.fruit.xPosition = generateRandomNumber();
		game.fruit.yPosition = generateRandomNumber();
		game.score.actual++;
		updateScoreboard();
	}
}, 100);

function nextPosition(axis) {
	game.snake[axis].position = (game.snake[axis].position + game.snake[axis].velocity) % canvasInfo.numberOfSquare;

	if (game.snake[axis].position < 0) {
		game.snake[axis].position = canvasInfo.numberOfSquare - 1;
	}
}

function generateRandomNumber() {
	return Math.floor(Math.random()*canvasInfo.numberOfSquare);
}

function updateScoreboard() {
	document.getElementById('score').textContent = 'Record: ' + game.score.record + '\nScore: ' + game.score.actual;
}


document.addEventListener('keydown', (event) => {
	const acceptedMoves = {
		ArrowLeft() {
			if (lastMovement !== 'ArrowRight') {
				game.snake.xAxis.velocity = -1;
				game.snake.yAxis.velocity = 0;
				lastMovement = event.key;
			}
		},
		ArrowUp() {
			if (lastMovement !== 'ArrowDown') {
				game.snake.xAxis.velocity = 0;
				game.snake.yAxis.velocity = -1;
				lastMovement = event.key;
			}
		},
		ArrowRight() {
			if (lastMovement !== 'ArrowLeft') {
				game.snake.xAxis.velocity = 1;
				game.snake.yAxis.velocity = 0;
				lastMovement = event.key;
			}
		},
		ArrowDown() {
			if (lastMovement !== 'ArrowUp') {
				game.snake.xAxis.velocity = 0;
				game.snake.yAxis.velocity = 1;
				lastMovement = event.key;
			}
		}
	}

	const moveFunction = acceptedMoves[event.key];

	if (moveFunction) {
		moveFunction();
	} 
});
