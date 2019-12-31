const score = {
	current: 0,
	record: 0
}

function updateRecordScore() {
	score.record = _.max([score.current, score.record]);
	resetCurrentScore();
}

function resetCurrentScore() {
	score.current = 0;
	updateScoreboardView();
}

function increaseCurrentScore() {
	score.current = _.add(score.current, 1);
	updateScoreboardView();
}

function updateScoreboardView() {
	document.getElementById('score').textContent = 'Record: ' + score.record + '\nScore: ' + score.current;
}