(function(){

game.initData = function initData(screenWidth, screenHeight) {

	function Pixel(x, y, chr, color) {
		this.x = x;
		this.y = y;
		this.chr = chr;
		this.color = color;
	}

	screenWidth = screenWidth || 15; 
	screenHeight = screenHeight || 20;

	var pixels = [], xLines = [];

	for (var i = 0; i < screenHeight; i++) {
		xLines.push([]);
		for (var j = 0; j < screenWidth; j++) {
			var newPixel = new Pixel(j, i, ' ', 'black');
			pixels.push(newPixel);
			xLines[i].push(newPixel);
		}
	}

	var screen = {
		createPixel: Pixel,
		pixels: pixels,
		xLines: xLines,
		w: screenWidth,
		h: screenHeight,
	};

	return {
		screen: screen,
		lines: {
			checkForFullLines: function(xLines) {
				for (var i = xLines.length-1; i >= 0; i--) {
					var full = xLines[i].every(function(pixel){return pixel.chr != ' '})
					if (full) return true;
				}
				return false;
			},
			clearFullLines: function(xLines) {
				var fullCount = 0;
				for (var i = 0; i < xLines.length; i++) {
					var full = xLines[i].every(function(pixel){return pixel.chr != ' '})
					if (full) {
						fullCount += 1;
						for (var j = i; j > 0; j--) {
							xLines[j].forEach(function(pixel, z){
								pixel.chr = xLines[j-1][z].chr;
								pixel.color = xLines[j-1][z].color;
							});
						}
					}
				}
				return fullCount;
			}
		},
		shapes: {
			screen: screen,
			currentShape: null,
			nextShape: {shapeOb: null},
			shapeScreenLocs: function shapeScreenLocs(shape) {
				var shape = shape || this.currentShape;

				var shapeLocs = shape.getLocations(),
				    screenLocs = [];
				for (var i = 0; i < shapeLocs.length; i++) {
					screenLocs.push(this.screen.xLines[shapeLocs[i].x][shapeLocs[i].y])
				}
				return screenLocs
			},
			addToData: function addToData(shape) {
				var shape = shape || this.currentShape,
					pixels = this.shapeScreenLocs(shape);

				pixels.forEach(function(pixel, i){
					pixel.chr = '#';
					pixel.color = shape.color;
				});
			},
			removeFromData: function removeFromData(shape) {
				var shape = shape || this.currentShape;
					pixels = this.shapeScreenLocs(shape);

				pixels.forEach(function(pixel){
					pixel.chr = ' ';
				});
			},
			moveLeft: function moveLeft(shape) {
				var shape = shape || this.currentShape;

				this.removeFromData(shape);
				shape.updateSx(-1);
				if (this.validateNewPos(shape.getLocations()) == false) {
					shape.updateSx(1)
					this.addToData(shape);
					return false
				} 
				this.addToData(shape);
			},
			moveRight: function moveRight(shape) {
				var shape = shape || this.currentShape;

				this.removeFromData(shape);
				shape.updateSx(1);
				if (this.validateNewPos(shape.getLocations()) == false) {
					shape.updateSx(-1)
					this.addToData(shape);
					return false
				} 
				this.addToData(shape);
			},
			moveDown: function moveDown(shape) {
				var shape = shape || this.currentShape;

				this.removeFromData(shape);
				shape.updateSy(1);
				if (this.validateNewPos(shape.getLocations()) == false) {
					shape.updateSy(-1)
					this.addToData(shape);
					return false;
				} 
				this.addToData(shape);
			},
			gravity: function gravity(shape) {
				var shape = shape || this.currentShape;

				if (this.moveDown() == false) { //NOTE: move happening implicitly
					this.addToData(shape);
					return false
				}
				this.addToData(shape);
				return true
			},
			reorient: function reorient(shape) {
				var shape = shape || this.currentShape,
					orig_orientation = shape.orientation;
				
				this.removeFromData(shape);
				shape.reorient();
				if (this.validateNewPos(shape.getLocations()) == false) {
					while (shape.orientation != orig_orientation) {shape.reorient() }
					this.addToData(shape);
					return false;
				} 
				this.addToData(shape);
			},
			move: function move(k) {
				if (k == 37) {this.moveLeft()}
				if (k == 39) {this.moveRight()}
				if (k == 40) {this.moveDown()}
			},
			validateNewPos: function validateNewPos(posArr) {
				var screen = this.screen,
					w = screen.w, 
					h = screen.h;
				return posArr.every(function(pos){
					return pos.x >= 0 && pos.y >= 0 && pos.x < h && pos.y < w && screen.xLines[pos.x][pos.y].chr == ' ';
				});
			},
			create: initShapes(),
			addFirstShape: function() {
				this.nextShape.shapeOb = this.create()
				this.addShape();
			},
			addNextShape: function(shape) {
				this.nextShape.shapeOb = shape;
			},
			addShape: function() {
				newShape = this.create();
				this.currentShape = this.nextShape.shapeOb;
				this.addNextShape(newShape);
				return this.currentShape
			},
			addAndValidateShape: function() {
				var shape = this.addShape();
				if (this.validateNewPos(shape.getLocations()) == false) {
					return false;
				} else {
					this.addToData(shape);
					return true;
				}
			}
		}
	}
}

}());
