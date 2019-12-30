const gameCanvas = document.getElementById('gameBoard');
const context = gameCanvas.getContext('2d');

const canvasInfo = {
	squareSide: 20,
	numberOfSquare: 20
};
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
	}
};

setInterval( () => {
	nextPosition('xAxis');
	nextPosition('yAxis');

	context.strokeStyle = 'GRAY';
	context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	context.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

	context.beginPath();
	context.fillStyle = 'RED';
	context.arc(game.fruit.xPosition*canvasInfo.squareSide + canvasInfo.squareSide/2,
		game.fruit.yPosition*canvasInfo.squareSide + canvasInfo.squareSide/2,
		canvasInfo.squareSide/2, 0, 2*Math.PI);
	context.fill();

	context.fillStyle = 'GREEN';
	game.snake.tail.tails.forEach(partOfTail => {
		context.fillRect(partOfTail.x*canvasInfo.squareSide,
			partOfTail.y*canvasInfo.squareSide,
			canvasInfo.squareSide, canvasInfo.squareSide);

		if (partOfTail.x === game.snake.xAxis.position && partOfTail.y === game.snake.yAxis.position) {
			game.snake.xAxis.velocity = 0;
			game.snake.yAxis.velocity = 0;
			game.snake.tail.length = 5;
			game.snake.tail.tails = [];
			updateRecordScore();
		}
	});

	game.snake.tail.tails.push({
		x: game.snake.xAxis.position,
		y: game.snake.yAxis.position
	});

	while (game.snake.tail.tails.length > game.snake.tail.length) {
		game.snake.tail.tails.shift();
	}

	if (game.snake.xAxis.position === game.fruit.xPosition && game.snake.yAxis.position === game.fruit.yPosition) {
		game.snake.tail.length++;
		game.fruit.xPosition = generateRandomNumber();
		game.fruit.yPosition = generateRandomNumber();
		increaseCurrentScore();
	}
}, 100);

function nextPosition(axis) {
	var position = (game.snake[axis].position + game.snake[axis].velocity) % canvasInfo.numberOfSquare;

	game.snake[axis].position = position < 0 ? canvasInfo.numberOfSquare - 1 : position;
}

function generateRandomNumber() {
	return Math.floor(Math.random()*canvasInfo.numberOfSquare);
}