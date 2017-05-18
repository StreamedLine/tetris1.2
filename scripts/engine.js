
function initEngine(game) {

	function gravity() {
		if (game.data.shapes.gravity() == false) { //implicit gravity
			checkForFullLines();
			if (game.data.shapes.addAndValidateShape() == false) { //implicit creation and validation of new shape
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
			game.score += fullCount ** fullCount;
		}
	}

	function gameOver() {
		game.ui();
		game.gameOver();
	}

	function advanceFrame() {
		if (gravity() == false) { //implicit function call
			gameOver();
			return false;
		} else {
			game.ui();
			return true;
		}
	}

	return advanceFrame

}