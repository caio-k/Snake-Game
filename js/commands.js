document.addEventListener('keydown', event => {
	const acceptedMoves = {
		ArrowLeft() {
			setDirection(-1, 0);
		},
		ArrowUp() {
			setDirection(0, -1);
		},
		ArrowRight() {
			setDirection(1, 0);
		},
		ArrowDown() {
			setDirection(0, 1);
		}
	}

	const moveFunction = acceptedMoves[event.key];

	if (moveFunction) {
		moveFunction();
	} 
});

function setDirection(x, y) {
	if ((state.snake.xVelocity !== x && state.snake.yVelocity !== y) || !(state.snake.xVelocity || state.snake.yVelocity)) {
		state.snake.xVelocity = x;
		state.snake.yVelocity = y;
	}
}