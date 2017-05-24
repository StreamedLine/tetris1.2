
function initShapes() {

	function Shape(name) {
		this.color = shapeColors[name];
		this.sx = 7;
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
	}


	var shapeNames = ['line', 'cube', 'plus', 'right_hook', 'left_hook', 'right_zigzag', 'left_zigzag'],
		shapeColors = {
			line: 'red',
			plus: 'cyan',
			cube: 'lime',
			right_hook: 'magenta',
			left_hook: 'orange',
			right_zigzag: 'gold',
			left_zigzag: 'lightgrey'
		};

	var shapeMap = {
		// 21012
		//0  #
		//1  #
		//2  #
		//3  #
		// 21012
		//0
		//1 ####
		line: [
			[{x: 0,  y: 0, down: false, left: true, right: true},  {x: 0, y: 1, down: false, left: true,  right: true},  {x: 0, y: 2, down: false, left: true,  right: true}, {x: 0, y: 3, down: true, left: true,  right: true}],
			[{x: -1, y: 1, down: true,  left: true, right: false}, {x: 0, y: 1, down: true,  left: false, right: false}, {x: 1, y: 1, down: true, left: false, right: false}, {x: 2, y: 1, down: true, left: false, right: true}]
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
			[{x: 0,  y: 0, down: false, left: true, right: true},  {x: 0, y: 1, down: false, left: false,  right: true},  {x: 0, y: 2, down: true, left: true,  right: true}, {x: -1, y: 1, down: true, left: true,  right: false}],
			[{x: -1, y: 1, down: true,  left: true, right: false}, {x: 0, y: 1, down: true,  left: false, right: false}, {x: 1, y: 1, down: true, left: false, right: true}, {x: 0, y: 0, down: false,  left: true, right: true}],
			[{x: 0,  y: 0, down: false, left: true, right: true},  {x: 0, y: 1, down: false, left: true,  right: false},  {x: 0, y: 2, down: true, left: true,  right: true},  {x: 1, y: 1, down: true, left: false,  right: true}],
			[{x: -1, y: 1, down: true,  left: true, right: false}, {x: 0, y: 1, down: false,  left: false, right: false}, {x: 1, y: 1, down: true, left: false, right: true}, {x: 0, y: 2, down: true, left: true, right: true}],
		],
		// 21012
		//0  ##
		//1  #
		//2  #
		// 21012
		//0  
		//1 ###
		//2   #
		right_hook: [
			[{x: 0,  y: 0, down: false, left: true, right: false}, {x: 0, y: 1, down: false, left: true,  right: true},  {x: 0, y: 2, down: true, left: true,  right: true},  {x: 1,  y: 0, down: true, left: false, right: true}],
			[{x: -1, y: 1, down: true,  left: true, right: false}, {x: 0, y: 1, down: true,  left: false, right: false}, {x: 1, y: 1, down: false, left: false, right: true}, {x: 1, y: 2, down: true, left: true, right: true}],
			[{x: 0,  y: 0, down: false, left: true, right: true},  {x: 0, y: 1, down: false, left: true,  right: true},  {x: 0, y: 2, down: true, left: false,  right: true}, {x: -1, y: 2, down: true, left: true, right: false}],
			[{x: -1, y: 1, down: true,  left: true, right: false}, {x: 0, y: 1, down: true,  left: false, right: false}, {x: 1, y: 1, down: true, left: false, right: true},  {x: -1, y: 0, down: false,  left: true, right: false}]
		],
		// 21012
		//0 ##
		//1  #
		//2  #
		// 21012
		//0   #
		//1 ###
		//2   
		left_hook: [
			[{x: 0,  y: 0, down: false, left: false, right: true},  {x: 0, y: 1, down: false, left: true,  right: true},  {x: 0, y: 2, down: true, left: true,  right: true},  {x: -1,  y: 0, down: true, left: true, right: false}],
			[{x: -1, y: 1, down: true,  left: true, right: false},  {x: 0, y: 1, down: true,  left: false, right: false}, {x: 1, y: 1, down: true, left: false, right: true}, {x: 1, y: 0, down: false, left: true, right: true}],
			[{x: 0,  y: 0, down: false, left: true, right: true},   {x: 0, y: 1, down: false, left: true,  right: true},  {x: 0, y: 2, down: true, left: true,  right: false}, {x: 1, y: 2, down: true, left: false, right: true}],
			[{x: -1, y: 1, down: false,  left: true, right: false}, {x: 0, y: 1, down: true,  left: false, right: false}, {x: 1, y: 1, down: true, left: true, right: false},  {x: -1, y: 2, down: true,  left: true, right: true}]
		],
		// 21012
		//0  #
		//1 ##
		//2 #
		// 21012
		//0 ## 
		//1  ##
		//2 
		right_zigzag: [
			[{x: 1,  y: 0, down: false, left: true, right: true}, {x: 1,  y: 1, down: true, left: false, right: true}, {x: 0,  y: 1, down: false, left: true, right: false}, {x: 0,  y: 2, down: true, left: true, right: true},],
			[{x: 0,  y: 0, down: true, left: true, right: false}, {x: 1,  y: 0, down: false, left: false, right: true}, {x: 1,  y: 1, down: true, left: true, right: false}, {x: 2,  y: 1, down: true, left: false, right: true}, ]
		],
		// 21012
		//0 #
		//1 ##
		//2  #
		// 21012
		//0 ## 
		//1##
		//2 
		left_zigzag: [
			[{x: -1,  y: 0, down: false, left: true, right: true}, {x: -1,  y: 1, down: true, left: true, right: false}, {x: 0,  y: 1, down: false, left: false, right: true}, {x: 0,  y: 2, down: true, left: true, right: true},],
			[{x: -2,  y: 1, down: true, left: true, right: false}, {x: -1,  y: 1, down: true, left: false, right: true}, {x: -1,  y: 0, down: false, left: true, right: false}, {x: 0,  y: 0, down: true, left: false, right: true}, ]
		],

	};

	return function create() {
		var shapeName = shapeNames.randFromArr();
		return new Shape(shapeName);
	}

}