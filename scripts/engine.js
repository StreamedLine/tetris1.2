
function initEngine(game) {

	function gravity() {
		if (game.data.shapes.gravity() == false) {//implicit gravity
			checkForFullLines();
			if (game.data.shapes.addAndValidateShape() == false) {//implicit creation and validation of new shape
				game.gameOver = true;
				return false
			}
		}
		return true
	}
	
	function checkForFullLines() {
		var full = game.data.lines.checkForFullLines(game.data.screen.xLines);
		if (full) game.data.lines.clearFullLines(game.data.screen.xLines);
	}

	function advanceFrame() {
		gravity();
		game.ui();
	}

	return advanceFrame

}