const gameCanvas = document.getElementById('gameBoard');
const context = gameCanvas.getContext('2d');

const canvasInfo = {
	squareSide: 20,
	numberOfSquare: 20
};
const state = {
	snake: {
		xPosition: 5,
		yPosition: 5,
		xVelocity: 0,
		yVelocity: 0,
		length: 5,
		tails: []
	},
	fruit: {
		xPosition: 15,
		yPosition: 15
	}
};

setInterval( () => {
	state.snake.xPosition = nextPosition(state.snake.xPosition, state.snake.xVelocity);
	state.snake.yPosition = nextPosition(state.snake.yPosition, state.snake.yVelocity);

	context.strokeStyle = 'GRAY';
	context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	context.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

	context.beginPath();
	context.fillStyle = 'RED';
	context.arc(state.fruit.xPosition*canvasInfo.squareSide + canvasInfo.squareSide/2,
		state.fruit.yPosition*canvasInfo.squareSide + canvasInfo.squareSide/2,
		canvasInfo.squareSide/2, 0, 2*Math.PI);
	context.fill();

	context.fillStyle = 'GREEN';
	_.each(state.snake.tails, partOfTail => {
		context.fillRect(partOfTail.xPosition*canvasInfo.squareSide,
			partOfTail.yPosition*canvasInfo.squareSide,
			canvasInfo.squareSide, canvasInfo.squareSide);

		if (areInTheSamePosition(partOfTail, state.snake)) {
			state.snake.xVelocity = 0;
			state.snake.yVelocity = 0;
			state.snake.length = 5;
			state.snake.tails = [];
			updateRecordScore();
		}
	});

	state.snake.tails.push({
		xPosition: state.snake.xPosition,
		yPosition: state.snake.yPosition
	});

	var difference = state.snake.tails.length - state.snake.length;
	if (difference > 0) {
		state.snake.tails = _.slice(state.snake.tails, difference);
	}

	if (areInTheSamePosition(state.snake, state.fruit)) {
		state.snake.length++;
		state.fruit.xPosition = _.random(canvasInfo.numberOfSquare - 1);
		state.fruit.yPosition = _.random(canvasInfo.numberOfSquare - 1);
		increaseCurrentScore();
	}
}, 100);

function nextPosition(position, velocity) {
	var position = _.add(position, velocity) % canvasInfo.numberOfSquare;
	return position < 0 ? canvasInfo.numberOfSquare - 1 : position;
}

function areInTheSamePosition(firstObject, secondObject) {
	var positionParameters = ['xPosition', 'yPosition'];
	return _.isEqual(_.pick(firstObject, positionParameters), _.pick(secondObject, positionParameters)); 
}