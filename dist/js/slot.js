function Slot(t,i,e,s){this.speed=300,this.si=null,this.el=t,this.finalSpeed=i,this.step=e,this.limit=s,this.finalPosition=null}function getSpeed(t){return t.speed}function startMotion(){var t=this,i=Math.floor(10*Math.random());this.speed>this.finalSpeed&&(this.speed-=this.step),$(this.el).text(i),this.si=window.setTimeout(startMotion.bind(t),getSpeed(t))}function stopMotion(){var t=new CustomEvent("isFinal"),i=this,e=Math.floor(10*Math.random());this.speed<this.limit?(this.speed+=this.step,$(this.el).text(e),this.si=window.setTimeout(stopMotion.bind(i),getSpeed(i))):(document.getElementById(this.el.split("#")[1]).dispatchEvent(t),this.speed=300,clearInterval(this.si),$(this.el).text(this.finalPosition))}Slot.prototype.start=function(){this.si=window.setTimeout(startMotion.bind(this),getSpeed(this))},Slot.prototype.stop=function(t){var i=this;i.finalPosition=t,clearInterval(i.si),i.si=window.setTimeout(stopMotion.bind(i),getSpeed(i))},Slot.prototype.reset=function(){this.speed=300,clearInterval(this.si)};