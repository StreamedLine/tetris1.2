var screenTag     = document.getElementById('screen');
var nextShapeTag  = document.getElementsByClassName('nextShape')[0];
var scoreTag      = document.getElementById('score');

(function(){
	game.ui = {
		refreshScreen: function refreshScreen(){
			var final = '';
			game.data.screen.xLines.forEach(function(line){
				line.forEach(function(pixel){
					str = ''
					if (pixel.color != 'black') {
						str = "<span style='color:" + pixel.color + "'>" + pixel.chr + '</span>';
					} else {
						str = pixel.chr;
					}
					if (pixel.x == line.length-1) {
						str += '<br>'
					}
					final += str
				});
			});
			screenTag.innerHTML = final;
			score.innerText = game.score;
	    },
	    refreshNext: function refreshNext() {
	    	function createStr(shapeMap) {
	    		return [0,1,2,3].map(function(x){
	    			return [-3,-2,-1,0,1,2,3].map(function(y){
	    				var taken = shapeMap.some(function(xy){return xy.x == x && xy.y-7 == y})
	    				if (taken) {
	    					return '#'
	    				} else {
	    					return ' '
	    				}
	    			}).join('');
	    		}).join('\n');
	    	}
	    	nextShapeTag.innerText = createStr(game.data.shapes.nextShape.shapeOb.getLocations());
	    }
	};
}());


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
		if (e.keyCode == 32 || e.which == 32) { //.which for firefox
			game.spacebar();
		}
	}
	document.body.addEventListener('keydown', processUserKeydown);
	document.body.addEventListener('keypress', processUserKeypress);

}());


