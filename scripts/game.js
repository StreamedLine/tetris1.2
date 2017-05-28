var game = {
	ui: null, //created in scripts/ui.js

	initData: null, //created in scripts/data.js
	data: null,
	
	initEngine: null, //created in engine.js
	engine: null,
	
	init: function init() {
		clearTimeout(this.timeoutLoop);
		this.score = 0;
		this.refreshRate = 400;
		this.domReset();
		this.data = this.initData()
		this.engine = this.initEngine(this);
		this.data.shapes.addFirstShape();
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
		this.ui.refreshScreen();
	},
	
	arrow: function(k) {
		this.data.shapes.move(k);
		this.ui.refreshScreen();
	},
	
	domReset: function() {
		document.body.appendChild(scoreTag);
		screenTag.classList.remove('redBorder');
		scoreTag.classList.remove('largerFont');
		nextShapeTag.classList.remove('displayNone');
	},

	gameOver: function() {
		screenTag.parentNode.insertBefore(scoreTag, document.getElementsByClassName('gobtn')[0]);
		screenTag.classList.add('redBorder');
		scoreTag.classList.add('largerFont');
		nextShapeTag.classList.add('displayNone');
	}
};

