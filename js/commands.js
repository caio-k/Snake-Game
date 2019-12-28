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