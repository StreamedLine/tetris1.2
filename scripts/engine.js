
function initEngine(game) {

	function gravity() {
		if (game.data.shapes.gravity() == false) {//implicit gravity
			checkForFullLines();
			if (game.data.shapes.addAndValidateShape() == false) {//implicit creation and validation of new shape
				gameOver();
				return false
			} else {
				game.score += 15;
			}
		}
		return true
	}

	function checkForFullLines() {
		var full = game.data.lines.checkForFullLines(game.data.screen.xLines);
		if (full) {
			var fullCount = game.data.lines.clearFullLines(game.data.screen.xLines);
			game.score += fullCount * 80;
		}
	}

	function gameOver() {
		game.gameOver = true;
		screenTag.style.borderColor = 'tomato';
		scoreTag.style.fontSize = '2em';
	}

	function advanceFrame() {
		gravity();
		game.ui();
	}

	return advanceFrame

}