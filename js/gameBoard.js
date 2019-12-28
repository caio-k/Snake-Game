const gameCanvas = document.getElementById('gameBoard');
const context = gameCanvas.getContext('2d');

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
		yPosition: 15
	},
	score: {
		actual: 0,
		record: 0
	}
}

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
			lastMovement = '';

			updateRecord(Math.max(game.score.record, game.score.actual));
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
		game.fruit.xPosition = generateRandomNumber();
		game.fruit.yPosition = generateRandomNumber();
		updateActual(game.score.actual + 1);
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

function updateRecord(value) {
	game.score.record = value;
	updateActual(0);
}

function updateActual(value) {
	game.score.actual = value;
	updateScoreboard();
}

function updateScoreboard() {
	document.getElementById('score').textContent = 'Record: ' + game.score.record + '\nScore: ' + game.score.actual;
}