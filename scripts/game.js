
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
		screenTag.innerHTML = final
	},
	data: null,
	engine: null,
	init: function init() {
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
				setTimeout(gameLoop, theGame.refreshRate);
			}
		}
		gameLoop();
	},
	gameOver: false,
	spacebar: function() {
		this.data.shapes.reorient();
		this.ui();
	},
	arrow: function(k) {
		this.data.shapes.move(k);
		this.ui();
	}
};

