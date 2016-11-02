function create(t,e,s,i,h){return h=h||{},this.$ledDiv=$(t),this._charDicionary=this._getCharDicionary(),this._space=this._charToLED(),this.fps=h.fps||30,this.height=h.height||7,this.scrollerLength=h.scrollerLength||120,this.deafultLeftPointer=s+1,this.leftPointer=this.defaultLeftPointer,this.rightPointer=i||0,this.myMessage=this._textToLED(e.toUpperCase()),this._furthestLeftPoint=0-this.myMessage.length,this._speed=1e3/this.fps,this}function show(){var t=this;setTimeout(function(){requestAnimationFrame(function(){t.show()}),t._reachEndLoop()&&(t.leftPointer=t.deafultLeftPointer),t._clearLights(),t._drawMessage(),--t.leftPointer},t._speed)}function clearLights(){this.$ledDiv.children(".on").addClass("off").removeClass("on")}function drawMessage(){for(var t=this.myMessage.length,e=(this.scrollerLength+t,0);e<t;e++)for(var s=0;s<this.height;s++){var i=this.leftPointer+e;(i<this.scrollerLength||i>=0)&&this._setLight(s,i,this.myMessage[e][s])}}function setLight(t,e,s){var i=this.$ledDiv.children("."+t+"_"+e);i.hasClass("on")&&0===s?i.removeClass("on").addClass("off"):i.hasClass("off")&&1===s&&i.removeClass("off").addClass("on")}function textToLED(t){var e=this,s=[];return[].slice.call(t).forEach(function(t){s.push(e._charToLED(t)),s.push(e._space)}),[].concat.apply([],s)}function charToLED(t){var e=this._charDicionary[t];return e?e:[[0,0,0,0,0,0,0]]}function reachEndLoop(){return this.leftPointer===this.furthestLeftPoint}function getCharDicionary(){return{A:[[0,0,1,1,1,1,1],[0,1,0,0,1,0,0],[1,0,0,0,1,0,0],[0,1,0,0,1,0,0],[0,0,1,1,1,1,1]],B:[[1,1,1,1,1,1,1],[1,0,0,1,0,0,1],[1,0,0,1,0,0,1],[1,0,0,1,0,0,1],[0,1,1,0,1,1,0]],C:[[0,1,1,1,1,1,0],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[0,1,0,0,0,1,0]],D:[[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[0,1,1,1,1,1,0]],E:[[1,1,1,1,1,1,1],[1,0,0,1,0,0,1],[1,0,0,1,0,0,1],[1,0,0,1,0,0,1],[1,0,0,0,0,0,1]],F:[[1,1,1,1,1,1,1],[1,0,0,1,0,0,0],[1,0,0,1,0,0,0],[1,0,0,1,0,0,0],[1,0,0,0,0,0,0]],G:[[0,1,1,1,1,1,0],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,1,0,1],[1,1,0,0,1,1,1]],H:[[1,1,1,1,1,1,1],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[1,1,1,1,1,1,1]],I:[[0,0,0,0,0,0,0],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[0,0,0,0,0,0,0]],J:[[0,0,0,0,0,1,0],[0,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,0],[1,0,0,0,0,0,0]],K:[[1,1,1,1,1,1,1],[0,0,0,1,0,0,0],[0,0,1,0,1,0,0],[0,1,0,0,0,1,0],[1,0,0,0,0,0,1]],L:[[1,1,1,1,1,1,1],[0,0,0,0,0,0,1],[0,0,0,0,0,0,1],[0,0,0,0,0,0,1],[0,0,0,0,0,0,1]],M:[[1,1,1,1,1,1,1],[0,1,0,0,0,0,0],[0,0,1,0,0,0,0],[0,1,0,0,0,0,0],[1,1,1,1,1,1,1]],N:[[1,1,1,1,1,1,1],[0,0,1,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,1,0,0],[1,1,1,1,1,1,1]],O:[[0,1,1,1,1,1,0],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[0,1,1,1,1,1,0]],P:[[1,1,1,1,1,1,1],[1,0,0,1,0,0,0],[1,0,0,1,0,0,0],[1,0,0,1,0,0,0],[0,1,1,0,0,0,0]],Q:[[0,1,1,1,1,1,0],[1,0,0,0,0,0,1],[1,0,0,0,1,0,1],[1,0,0,0,0,1,0],[0,1,1,1,1,0,1]],R:[[1,1,1,1,1,1,1],[1,0,0,1,0,0,0],[1,0,0,1,0,0,0],[1,0,0,1,0,0,0],[0,1,1,0,1,1,1]],S:[[0,1,1,0,0,0,1],[1,0,0,1,0,0,1],[1,0,0,1,0,0,1],[1,0,0,1,0,0,1],[1,0,0,0,1,1,0]],T:[[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[1,1,1,1,1,1,1],[1,0,0,0,0,0,0],[1,0,0,0,0,0,0]],U:[[1,1,1,1,1,1,0],[0,0,0,0,0,0,1],[0,0,0,0,0,0,1],[0,0,0,0,0,0,1],[1,1,1,1,1,1,0]],V:[[1,1,1,1,1,0,0],[0,0,0,0,0,1,0],[0,0,0,0,0,0,1],[0,0,0,0,0,1,0],[1,1,1,1,1,0,0]],W:[[1,1,1,1,1,1,0],[0,0,0,0,0,0,1],[0,0,0,0,1,1,0],[0,0,0,0,0,0,1],[1,1,1,1,1,1,0]],X:[[1,0,0,0,0,0,1],[0,1,1,0,1,1,0],[0,0,0,1,0,0,0],[0,1,1,0,1,1,0],[1,0,0,0,0,0,1]],Y:[[1,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,1,1,1,1,1],[0,1,0,0,0,0,0],[1,0,0,0,0,0,0]],Z:[[1,0,0,0,0,1,1],[1,0,0,0,1,0,1],[1,0,0,1,0,0,1],[1,0,1,0,0,0,1],[1,1,0,0,0,0,1]]}}var LED={create:create,show:show,_setLight:setLight,_clearLights:clearLights,_drawMessage:drawMessage,_textToLED:textToLED,_charToLED:charToLED,_getCharDicionary:getCharDicionary,_reachEndLoop:reachEndLoop};