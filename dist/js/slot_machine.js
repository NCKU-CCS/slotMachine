!function(t){function n(t){var n={},l=t.length,s=Math.floor(Math.random()*l),a=o(t[s].phone),i=e(t[s].name);return console.log("luckyNUm: "+s+"  arrayLength: "+l),n.luckyArray=a.array,n.phone=a.str,n.name=i,n.trueName=t[s].name,n.truePhone=t[s].phone,t.splice(s,1),n}function e(t){var n=t.substr(0,1);if(t.length>=3){for(var e=0;e<t.length-2;e++)n+="X";n+=t.substr(t.length-1,1)}else n+="X";return n}function o(t){var n=t.split("").slice(2);return n.splice(2,3,"X","X","X"),{array:n,str:t.slice(0,4)+"XXX"+t.slice(7)}}function l(t){var n="#"+this.id,e=this.id.split("slot")[1];c++,$(n).removeClass("slot_move").addClass("slot_final"),playAudio("bgm_drop"+e,.6),c===_.length&&(r(),$(".list_box").append("<p> "+m.name+" </p>"),stopAudio("bgm_draw"),playAudio("bgm_opening",.4))}function s(t,n){$("#name").text(t),$("#phone").text(n),a(t,n)}function a(t,n){m.name=t,m.phone=n}function i(){_.forEach(function(t){$(t.el).removeClass("slot_final").addClass("slot_move"),t.start()}),$(".slot_machine").removeClass("disabled"),$(".section_led").addClass("disabled"),$(".draw_bot").removeClass("wink"),$(".slot_t").removeClass("draw_final_twinkle"),$(".btn_draw").toggleClass("clicked"),stopAudio("bgm_opening"),playAudio("bgm_draw",.3)}function r(){$(".slot_t").addClass("draw_final_twinkle"),$(".draw_bot").addClass("wink"),$(".btn_draw").toggleClass("clicked"),$(".btn_draw").text("繼續抽")}function d(){$(".btn_draw").text("開始"),$(".btn_draw").removeClass("clicked"),$(".draw_bot").removeClass("wink"),$(".slot_t").removeClass("draw_final_twinkle slot_move"),$(".slot_machine").addClass("disabled"),$(".section_led").removeClass("disabled"),_.forEach(function(t,n){t.reset(),$(t.el).removeClass("slot_final")}),stopAudio("bgm_draw"),playAudio("bgm_opening",.4)}var c=0,_=[new Slot("#slot1",20,35,386),new Slot("#slot2",45,20,400),new Slot("#slot3",70,30,500),new Slot("#slot4",35,25,250),new Slot("#slot5",50,15,222),new Slot("#slot6",15,25,333),new Slot("#slot7",30,13,300),new Slot("#slot8",40,50,111)],m={name:"",phone:""};$(".btn_draw").click(function(){if("開始"===this.innerHTML||"繼續抽"===this.innerHTML)i(),this.innerHTML="～停～";else{var t=n(items);c=0,this.innerHTML="即將揭曉...",s(t.name,t.phone),_.forEach(function(n,e){n.stop(t.luckyArray[e])})}}),$(".btn_reset").click(function(){d()}),$(".list").click(function(){$(".list").toggleClass("list_show")}),function(t){_.forEach(function(t,n){document.getElementById("slot"+(n+1)).addEventListener("isFinal",l,!1)})}(t)}(window);