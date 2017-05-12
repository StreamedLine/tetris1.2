
var game = {
	ui: function displayScreen() {
		final = '';
		this.data.screen.xLines.forEach(function(line){
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
		score.innerText = this.score;
	},

	data: null,
	
	engine: null,
	
	init: function init() {
		clearTimeout(this.timeoutLoop);
		this.score = 0;
		this.domReset();
		this.data = initData()
		this.engine = initEngine(this);
		this.data.shapes.addShape();
	},
	
	refreshRate: 400,
	
	go: function go() {
		this.init();
		var theGame = this;
		function gameLoop() {
			if (theGame.engine() == true) { //implicit function call
				theGame.timeoutLoop = setTimeout(gameLoop, theGame.refreshRate);
			}
		}
		gameLoop();
	},
	
	score: 0,
	
	spacebar: function() {
		this.data.shapes.reorient();
		this.ui();
	},
	
	arrow: function(k) {
		this.data.shapes.move(k);
		this.ui();
	},
	
	domReset: function() {
		document.body.appendChild(scoreTag)
		screenTag.classList.remove('redBorder');
		scoreTag.classList.remove('largerFont');
	},

	gameOver: function() {
		screenTag.parentNode.insertBefore(scoreTag, document.getElementsByClassName('gobtn')[0]);
		screenTag.classList.add('redBorder');
		scoreTag.classList.add('largerFont');
	}
};

