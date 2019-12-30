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
	if ((game.snake.xAxis.velocity !== x && game.snake.yAxis.velocity !== y) || !(game.snake.xAxis.velocity || game.snake.yAxis.velocity)) {

		game.snake.xAxis.velocity = x;
		game.snake.yAxis.velocity = y;
	}
}