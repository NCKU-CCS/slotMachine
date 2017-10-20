/*
  @class Slot
  @constructor

  speed: speed of the slot at any point of time
  step: speed will increase at this rate
  si: holds setInterval object for the given slot
  el: dom element of the slot
  finalSpeed: max speed this slot can have
  limit: the slowest speed
  finalPosition: final position will show
*/

function Slot(el, finalSpeed, step, limit) {
  this.speed = 300
  this.si = null
  this.el = el
  this.finalSpeed = finalSpeed
  this.step = step
  this.limit = limit
  this.finalPosition = null
}

// @method start
Slot.prototype.start = function () {
  this.si = window.setTimeout(startMotion.bind(this), getSpeed(this))
}

// @method stop
Slot.prototype.stop = function (finalPosition) {
  var _this = this
  _this.finalPosition = finalPosition
  clearInterval(_this.si)
  _this.si = window.setTimeout(stopMotion.bind(_this), getSpeed(_this))
}

// @method reset
Slot.prototype.reset = function () {
  this.speed = 300
  clearInterval(this.si)
}

function getSpeed(_this) {
  return _this.speed
}

function startMotion() {
  // _this -> bind 進來的 this
  var _this = this
  var random = Math.floor(Math.random() * 10)
  if (this.speed > this.finalSpeed) {
    this.speed -= this.step
  }
  $(this.el).text(random)
  this.si = window.setTimeout(startMotion.bind(_this), getSpeed(_this))
}

function stopMotion() {
  var isFinal = new CustomEvent('isFinal')
  var _this = this
  var random = Math.floor(Math.random() * 10)
  if (this.speed < this.limit) {
    this.speed += this.step
    $(this.el).text(random)

    this.si = window.setTimeout(stopMotion.bind(_this), getSpeed(_this))
  } else {
    // active event 'isFinal'
    document.getElementById(this.el.split('#')[1]).dispatchEvent(isFinal)
    this.speed = 300
    clearInterval(this.si)
    $(this.el).text(this.finalPosition)
  }
}
