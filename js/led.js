/* LED
 * 
 * Public Methods
 *
 * @Method: create
 * @Description: create a new LED with text
*  @params: el, message, leftPointer, rightPointer, opt { height: fps }
 *
 * @Method: show
 * @Description: display LED on screen
 * */

var LED = {
  create: create,
  show: show,
  _setLight: setLight,
  _clearLights: clearLights,
  _drawMessage: drawMessage,
  _textToLED: textToLED,
  _charToLED: charToLED,
  _getCharDicionary: getCharDicionary,
  _reachEndLoop: reachEndLoop
};

function create(el, message, leftPointer, rightPointer, opt) {
  opt = opt || {}
  this.$ledDiv = $(el);
  this._charDicionary = this._getCharDicionary();
  this._space = this._charToLED();
  
  this.fps = opt.fps || 30;
  this.height = opt.height || 7;
  this.scrollerLength = opt.scrollerLength || 120;
  
  this.deafultLeftPointer = leftPointer + 1;
  this.leftPointer = this.defaultLeftPointer;
  this.rightPointer = rightPointer || 0;

  this.myMessage = this._textToLED(message.toUpperCase());

  this._furthestLeftPoint = 0 - this.myMessage.length;
  this._speed = 1000 / this.fps;
  return this;
}

function show() {
  var self = this;
  setTimeout(function() {
    requestAnimationFrame(function() { self.show() });
      if(self._reachEndLoop()) 
        self.leftPointer = self.deafultLeftPointer;
    
      self._clearLights();
      self._drawMessage();
      --self.leftPointer;
  }, self._speed);
}

function clearLights(){
  this.$ledDiv
    .children('.on')
      .addClass('off')
      .removeClass('on');
}

function drawMessage(){
  var messageLength = this.myMessage.length;
  var totalScrollLength = this.scrollerLength + messageLength;

  for(var col = 0; col < messageLength; col++){
    for(var row = 0; row < this.height; row++){
      var offsetCol = this.leftPointer + col;
 
      if(offsetCol < this.scrollerLength || offsetCol >= 0){
        this._setLight(row, offsetCol, this.myMessage[col][row]);
      }
    }
  }
}

function setLight(row, col, nextState){
  var lights = this.$ledDiv.children('.'+row+'_'+col);
  // On --> Off
  if(lights.hasClass('on') && nextState === 0){
    lights
      .removeClass('on')
      .addClass('off');
  // Off --> On
  } else if(lights.hasClass('off') && nextState === 1){
    lights
      .removeClass('off')
      .addClass('on');
  }
}

function textToLED(text){
  var self = this;
  var ledArray = [];

  // Slice text to array to loop characters
  [].slice.call(text).forEach(function(char) {
    ledArray.push(self._charToLED(char))
    ledArray.push(self._space);
  });
  return [].concat.apply([], ledArray);
}

function charToLED(char){
  var charLED = this._charDicionary[char];
  return charLED ? charLED : [[0, 0, 0, 0, 0, 0, 0]];
}

function reachEndLoop() {
  return this.leftPointer === this.furthestLeftPoint;
}

function getCharDicionary() {
  return {
    A: [[0, 0, 1, 1, 1, 1, 1], 
        [0, 1, 0, 0, 1, 0, 0], 
        [1, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1]],

    B: [[1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [0, 1, 1, 0, 1, 1, 0]],

    C: [[0, 1, 1, 1, 1, 1, 0], 
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 1, 0]],

    D: [[1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0]],

    E: [[1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1]],

    F: [[1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0]],

    G: [[0, 1, 1, 1, 1, 1, 0], 
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 0, 1, 1, 1]],
    H:
       [[1, 1, 1, 1, 1, 1, 1], 
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1]],

    I:
       [[0, 0, 0, 0, 0, 0, 0], 
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0]],

    J: [[0, 0, 0, 0, 0, 1, 0], 
        [0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 0]],

    K: [[1, 1, 1, 1, 1, 1, 1], 
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 1]],

    L: [[1, 1, 1, 1, 1, 1, 1], 
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1]],

    M: [[1, 1, 1, 1, 1, 1, 1], 
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1]],

    N: [[1, 1, 1, 1, 1, 1, 1], 
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1]],

    O: [[0, 1, 1, 1, 1, 1, 0], 
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0]],

    P: [[1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0]],

    Q: [[0, 1, 1, 1, 1, 1, 0], 
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 0, 1]],

    R: [[1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 1]],

    S: [[0, 1, 1, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0]],

    T: [[1, 0, 0, 0, 0, 0, 0], 
        [1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0]],

    U: [[1, 1, 1, 1, 1, 1, 0], 
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0]],

    V: [[1, 1, 1, 1, 1, 0, 0], 
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 0, 0]],

    W: [[1, 1, 1, 1, 1, 1, 0], 
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0]],

    X: [[1, 0, 0, 0, 0, 0, 1], 
        [0, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1]],

    Y: [[1, 0, 0, 0, 0, 0, 0], 
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0]],

    Z: [[1, 0, 0, 0, 0, 1, 1], 
        [1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1]]
  };
}
