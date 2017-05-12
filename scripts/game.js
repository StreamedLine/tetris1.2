
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
		this.domReset();
		this.gameOver = false;
		this.data = initData()
		this.engine = initEngine(this);
		this.data.shapes.addShape();
	},
	refreshRate: 400,
	go: function go() {
		this.init();
		var theGame = this;
		function gameLoop() {
			theGame.engine();
			if (!theGame.gameOver) {
				theGame.timeoutLoop = setTimeout(gameLoop, theGame.refreshRate);
			}
		}
		gameLoop();
	},
	gameOver: false,
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
		//ideally add and remove classes
		screenTag.style.borderColor = '#555';
		scoreTag.style.fontSize = '1.25em';
	}
};

