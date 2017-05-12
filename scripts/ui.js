var screenTag = document.getElementById('screen');
var scoreTag = document.getElementById('score');


(function(){

	var goBtn = document.getElementsByClassName('gobtn')[0];

	goBtn.onclick = function() {
		game.init();
		game.go();
	};

	function processUserKeydown(e) {
		if (e.keyCode >= 37 && e.keyCode <= 40)	
			game.arrow(e.keyCode);
	}
	function processUserKeypress(e) {
		if (e.keyCode == 32) {
			game.spacebar();
		}
	}
	document.body.addEventListener('keydown', processUserKeydown);
	document.body.addEventListener('keypress', processUserKeypress);

}());


