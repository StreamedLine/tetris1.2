//returns random element from array
Array.prototype.randFromArr = function() {
  var a = this[Math.floor(Math.random() * this.length)]
  return a
};

