var LED = {
  create: create,
  show: show,
  setLight: setLight,
  clearLights: clearLights,
  _drawMessage: drawMessage,
  _textToLED: textToLED,
  _charToLED: charToLED
};

LED
  .create('.led', 'Who  is  the  Lucky  Guy', 120, 0)
  .show();

function create(el, message, leftPointer, rightPointer, opt) {
  opt = opt || {}
  this.$ledDiv = $(el);
  this.scrollerLength = opt.scrollerLength || 120;
  this.height = opt.height || 7;
  this.fps = opt.fps || 30;
  this.leftPointer = leftPointer + 1;
  this.rightPointer = rightPointer || 0;
  this.myMessage = this._textToLED(message);
  this.furthestLeftPoint = 0 - this.myMessage.length;

  return this
}

function show() {
  var self = this;

  setTimeout(function() {
    requestAnimationFrame(function() { self.show() });
      self.clearLights();
    
       if(self.leftPointer === self.furthestLeftPoint) {
          self.leftPointer = self.scrollerLength + 1;
       }
    
       self._drawMessage();
       self.leftPointer--;

  }, 1000/self.fps);
}


function clearLights(){
  this.$ledDiv
    .children('.on')
      .addClass('off')
      .removeClass('on');
}

function setLight(row, col, state){
  var theLight = this.$ledDiv.children('.'+row+'_'+col);
  
  if(theLight.hasClass('on') && !state){
    theLight
      .removeClass('on')
      .addClass('off');
  } else if(theLight.hasClass('off') && state){
    theLight
      .removeClass('off')
      .addClass('on');
  }
}

function drawMessage(){
  var messageLength = this.myMessage.length;
  var totalScrollLength = this.scrollerLength + messageLength;

  for(var col = 0; col < messageLength; col++){
    for(var row = 0; row < this.height; row++){
      var offsetCol = this.leftPointer + col;
      
      if(offsetCol < this.scrollerLength || offsetCol >= 0){
        this.setLight(row, offsetCol, this.myMessage[col][row]);
      }
      
    }
  }
}

function textToLED(theWord){
  var theMessage = [];
  theWord = theWord.toUpperCase();
  for(var i = 0; i < theWord.length; i++){
    theMessage.push(this._charToLED(theWord.charAt(i)));
    theMessage.push(this._charToLED());
  }
  
  var flatten = [];
  flatten = flatten.concat.apply(flatten, theMessage);
  
  return flatten;
}

function charToLED(theChar){
  var theLed = [];
  switch(theChar){
    case 'A' :
      theLed = [[false, false, true, true, true, true, true], 
                [false, true, false, false, true, false, false], 
                [true, false, false, false, true, false, false],
                [false, true, false, false, true, false, false],
                [false, false, true, true, true, true, true]];
      break;
    case 'B' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [false, true, true, false, true, true, false]];
      break;
    case 'C' :
      theLed = [[false, true, true, true, true, true, false], 
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [false, true, false, false, false, true, false]]; 
      break;
     case 'D' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [false, true, true, true, true, true, false]]; 
      break;
    case 'E' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [true, false, false, false, false, false, true]];
      break;
    case 'F' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [true, false, false, false, false, false, false]];
      break;
    case 'G' :
      theLed = [[false, true, true, true, true, true, false], 
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [true, false, false, false, true, false, true],
                [true, true, false, false, true, true, true]];
      break;
    case 'H' :
      theLed = [[true, true, true, true, true, true, true], 
                [false, false, false, true, false, false, false],
                [false, false, false, true, false, false, false],
                [false, false, false, true, false, false, false],
                [true, true, true, true, true, true, true]];
      break;
    case 'I' :
      theLed = [[false, false, false, false, false, false, false], 
                [true, false, false, false, false, false, true],
                [true, true, true, true, true, true, true],
                [true, false, false, false, false, false, true],
                [false, false, false, false, false, false, false]];
      break;
    case 'J' :
      theLed = [[false, false, false, false, false, true, false], 
                [false, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [true, true, true, true, true, true, false],
                [true, false, false, false, false, false, false]];
      break;  
   case 'K' :
      theLed = [[true, true, true, true, true, true, true], 
                [false, false, false, true, false, false, false],
                [false, false, true, false, true, false, false],
                [false, true, false, false, false, true, false],
                [true, false, false, false, false, false, true]];
      break;
   case 'L' :
      theLed = [[true, true, true, true, true, true, true], 
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, false, true]];
      break;
   case 'M' :
      theLed = [[true, true, true, true, true, true, true], 
                [false, true, false, false, false, false, false],
                [false, false, true, false, false, false, false],
                [false, true, false, false, false, false, false],
                [true, true, true, true, true, true, true]];
      break;
   case 'N' :
      theLed = [[true, true, true, true, true, true, true], 
                [false, false, true, false, false, false, false],
                [false, false, false, true, false, false, false],
                [false, false, false, false, true, false, false],
                [true, true, true, true, true, true, true]];
      break;
   case 'O' :
      theLed = [[false, true, true, true, true, true, false], 
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [false, true, true, true, true, true, false]];
      break;
   case 'P' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [false, true, true, false, false, false, false]];
      break;
   case 'Q' :
      theLed = [[false, true, true, true, true, true, false], 
                [true, false, false, false, false, false, true],
                [true, false, false, false, true, false, true],
                [true, false, false, false, false, true, false],
                [false, true, true, true, true, false, true]];
      break;
   case 'R' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [false, true, true, false, true, true, true]];
      break;
   case 'S' :
      theLed = [[false, true, true, false, false, false, true], 
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [true, false, false, false, true, true, false]];
      break;
   case 'T' :
      theLed = [[true, false, false, false, false, false, false], 
                [true, false, false, false, false, false, false],
                [true, true, true, true, true, true, true],
                [true, false, false, false, false, false, false],
                [true, false, false, false, false, false, false]];
      break;
   case 'U' :
      theLed = [[true, true, true, true, true, true, false], 
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, false, true],
                [true, true, true, true, true, true, false]];
      break;
   case 'V' :
      theLed = [[true, true, true, true, true, false, false], 
                [false, false, false, false, false, true, false],
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, true, false],
                [true, true, true, true, true, false, false]];
      break;
   case 'W' :
      theLed = [[true, true, true, true, true, true, false], 
                [false, false, false, false, false, false, true],
                [false, false, false, false, true, true, false],
                [false, false, false, false, false, false, true],
                [true, true, true, true, true, true, false]];
      break;
   case 'X' :
      theLed = [[true, false, false, false, false, false, true], 
                [false, true, true, false, true, true, false],
                [false, false, false, true, false, false, false],
                [false, true, true, false, true, true, false],
                [true, false, false, false, false, false, true]];
      break;
   case 'Y' :
      theLed = [[true, false, false, false, false, false, false], 
                [false, true, false, false, false, false, false],
                [false, false, true, true, true, true, true],
                [false, true, false, false, false, false, false],
                [true, false, false, false, false, false, false]];
      break;
   case 'Z' :
      theLed = [[true, false, false, false, false, true, true], 
                [true, false, false, false, true, false, true],
                [true, false, false, true, false, false, true],
                [true, false, true, false, false, false, true],
                [true, true, false, false, false, false, true]];
      break;
    default:
      theLed = [[false, false, false, false, false, false, false]];
  }  
  return theLed;
}
