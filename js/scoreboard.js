const score = {
	current: 0,
	record: 0
}

function updateRecordScore() {
	score.record = Math.max(score.current, score.record);
	resetCurrentScore();
}

function resetCurrentScore() {
	score.current = 0;
	updateScoreboardView();
}

function increaseCurrentScore() {
	score.current = score.current + 1;
	updateScoreboardView();
}

function updateScoreboardView() {
	document.getElementById('score').textContent = 'Record: ' + score.record + '\nScore: ' + score.current;
}