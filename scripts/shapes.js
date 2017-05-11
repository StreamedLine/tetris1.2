
function initShapes() {

	function Shape(name) {
		this.color = shapeColors[name];
		this.sx = 10;
		this.sy = 0;
		this.updateSx = function updateSx(sx) {this.sx += sx};
		this.updateSy = function updateSy(sy) {this.sy += sy};
		this.shapeMap = shapeMap[name];
		this.orientation = 0;
		this.reorient = function reorient() {this.orientation = this.orientation >= this.shapeMap.length-1 ? 0 : this.orientation + 1};
		this.getLocations = function(){
			var sx = this.sx, sy = this.sy;
			return this.shapeMap[this.orientation].map(function(loc){
				return {x: sy + loc.y, y: sx + loc.x}
			});
		}
		this.showSxSy = function(){console.log(this.sx, this.sy)}
	}


	var shapeNames = ['line', 'cube', 'plus', 'hook'],
		shapeColors = {
			line: 'red',
			plus: 'blue',
			cube: 'green',
			hook: 'magenta'
		};

	var shapeMap = {
		// 21012
		//0  #
		//1  #
		//2  #
		// 21012
		//0
		//1 ###
		line: [
			[{x: 0,  y: 0, down: false, left: true, right: true},  {x: 0, y: 1, down: false, left: true,  right: true},  {x: 0, y: 2, down: true, left: true,  right: true}],
			[{x: -1, y: 1, down: true,  left: true, right: false}, {x: 0, y: 1, down: true,  left: false, right: false}, {x: 1, y: 1, down: true, left: false, right: true}]
		],
		// 21012
		//0 ##
		//1 ##
		cube: [
			    [{x: -1, y: 0, down: false, left: true,  right: false }, 
   			    {x: 0,  y: 0, down: false, left: false, right: true  }, 
   			    {x: -1, y: 1, down: true,  left: true,  right: false }, 
   			    {x: 0,  y: 1, down: true,  left: false, right: true  }]
		],
		// 21012
		//0  #
		//1 ##
		//2  #
		// 21012
		//0  #
		//1 ###
		//2
		plus: [
			[{x: -1, y: 1, down: true,  left: true, right: false}, {x: 0, y: 1, down: false,  left: false, right: false}, {x: 1, y: 1, down: true, left: false, right: true}, {x: 0, y: 2, down: true, left: true, right: true}],
			[{x: 0,  y: 0, down: false, left: true, right: true},  {x: 0, y: 1, down: false, left: false,  right: true},  {x: 0, y: 2, down: true, left: true,  right: true}, {x: -1, y: 1, down: true, left: true,  right: false}],
			[{x: -1, y: 1, down: true,  left: true, right: false}, {x: 0, y: 1, down: true,  left: false, right: false}, {x: 1, y: 1, down: true, left: false, right: true}, {x: 0, y: 0, down: false,  left: true, right: true}],
			[{x: 0,  y: 0, down: false, left: true, right: true},  {x: 0, y: 1, down: false, left: true,  right: false},  {x: 0, y: 2, down: true, left: true,  right: true},  {x: 1, y: 1, down: true, left: false,  right: true}]
		],
		// 21012
		//0  ##
		//1  #
		//2  #
		// 21012
		//0  
		//1 ###
		//2   #
		hook: [
			[{x: 0,  y: 0, down: false, left: true, right: false},  {x: 0, y: 1, down: false, left: true,  right: true},  {x: 0, y: 2, down: true, left: true,  right: true}, {x: 1,  y: 0, down: true, left: false, right: true},],
			[{x: -1, y: 1, down: true,  left: true, right: false}, {x: 0, y: 1, down: true,  left: false, right: false}, {x: 1, y: 1, down: false, left: false, right: true}, {x: 1, y: 2, down: true, left: true, right: true}],
			[{x: 0,  y: 0, down: false, left: true, right: true},  {x: 0, y: 1, down: false, left: true,  right: true},  {x: 0, y: 2, down: true, left: false,  right: true}, {x: -1, y: 2, down: true, left: true, right: false}],
			[{x: -1, y: 1, down: true,  left: true, right: false}, {x: 0, y: 1, down: true,  left: false, right: false}, {x: 1, y: 1, down: true, left: false, right: true}, {x: -1, y: 0, down: false,  left: true, right: false}]
		],
	};

	return function create() {
		var shapeName = shapeNames.randFromArr();
		return new Shape(shapeName);
	}

}