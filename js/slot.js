/*
  @class Slot
  @constructor

	speed: speed of the slot at any point of time
	step: speed will increase at this rate
	si: holds setInterval object for the given slot
	el: dom element of the slot
	finSpeed: max speed this slot can have
	limit: the slowest speed
	finPos: final position will show
*/

function Slot(el, finSpeed , step , limit){
	this.speed = 300 ;
	this.si = null ;
	this.el = el ;
	this.finSpeed = finSpeed ;
	this.step = step  ;
	this.limit = limit ;
	this.finPos = null ;
}


// @method start
Slot.prototype.start = function() {
  var _this = this;
  _this.si = window.setTimeout(startMotion.bind(_this) , getSpeed(_this));
};

// @method stop
Slot.prototype.stop = function(finPos) {
  var _this = this ;
  _this.finPos = finPos ;
  clearInterval(_this.si);
  _this.si = window.setTimeout(stopMotion.bind(_this), getSpeed(_this));
};

// @method reset
Slot.prototype.reset = function() {
  this.speed = 300 ;
  clearInterval(this.si);
};

function getSpeed(_this){
	return _this.speed;
}

function startMotion(){
	// _this -> bind 進來的 this 
	var _this = this ;
	var random = Math.floor(Math.random()*10);
	if (this.speed > this.finSpeed) {
	  this.speed -= this.step;
	}
	$(this.el).text(random);
	this.si = window.setTimeout(startMotion.bind(_this),getSpeed(_this));
}

function stopMotion(){
	var isFinal = new CustomEvent('isFinal');

	// _this -> bind 進來的 this 
	var _this = this ;
	var random = Math.floor(Math.random()*10);
	if (this.speed < this.limit) {
    this.speed += this.step;
    $(this.el).text(random);

    this.si = window.setTimeout(stopMotion.bind(_this), getSpeed(_this));
  }
  else {
  	// triggle Event 'isFinal'
  	document.getElementById(this.el.split('#')[1]).dispatchEvent(isFinal);

  	this.speed = 300;
    clearInterval(this.si);
    $(this.el).text(_this.finPos);
  }
}