(function(window){
  var draw_count = 0;
  var slot = [
    new Slot('#slot1', 20, 35 , 386),
    new Slot('#slot2', 45, 20 , 400),
    new Slot('#slot3', 70, 30 , 500),
    new Slot('#slot4', 35, 25 , 250),
    new Slot('#slot5', 50, 15 , 222),
    new Slot('#slot6', 15, 25 , 333),
    new Slot('#slot7', 30, 13 , 300),
    new Slot('#slot8', 40, 50 , 111)
  ];

  // current Luckyer's name , phone
  var luckyer = {
    name: '',
    phone: ''
  }

  //Listen to your custom event
  $('.btn_draw').click(function(){
    if(this.innerHTML === '開始' ||  this.innerHTML === '繼續抽'){
      start();
      this.innerHTML = '～停～';
    }else{

      var answer = draw(items);
      
      draw_count = 0;     
      this.innerHTML = '即將揭曉...';
      setAnswer(answer.name, answer.phone);

      slot.forEach(function(value,index){
        value.stop(answer.luckyArray[index]);
      })
    }
  })

  //Listen to your custom event
  $('.btn_reset').click(function(){
    reset();
  })

  $('.list').click(function(){
    $('.list').toggleClass('list_show');
  })

  function draw(array){
    var answerObj = {};
    var length = array.length ;
    var lucky = Math.floor(Math.random()*length); // 0 ~ length-1
    var dealPhone = dealHiddenPhone(array[lucky].phone);
    var dealName = dealHiddenName(array[lucky].name);

    console.log("luckyNUm: "+ lucky + "  arrayLength: "+ length);

    answerObj.luckyArray = dealPhone.array;
    answerObj.phone = dealPhone.str;
    answerObj.name = dealName;
    answerObj.trueName = array[lucky].name;
    answerObj.truePhone = array[lucky].phone;

    // remove lucky num
    array.splice(lucky,1);
    return answerObj;
  }

  // add final Listener
  (function(winodw){
    slot.forEach(function(value ,index){
      document.getElementById('slot'+(index+1)).addEventListener('isFinal',isFinal,false) ;
    })
  })(window)

  /*
    @method dealHiddenName(name)
    input: 一二三、一二三四、一二
    output: 一x三、一xx四、一x
  */
  function dealHiddenName(name){
    var answer = name.substr(0,1);
    if(name.length>=3){
      for(var i = 0 ; i < name.length-2 ; i++){
        answer+='X';
      }
      answer+=name.substr(name.length-1,1);
    }else{
      answer += 'X';
    }
    return answer;
  }

  /*
    @method dealHiddenPhone(phone)
    input: 0912345678
    output: 091xxx678
  */
  function dealHiddenPhone(phone){
    var phoneArray = phone.split("").slice(2);
    phoneArray.splice(2,3,"X","X","X");
    return {
      array:phoneArray,
      str:phone.slice(0,4)+'XXX'+phone.slice(7)
    };
  }

  function isFinal(e) {
    var jq_id = '#'+this.id;
    var id = this.id.split("slot")[1];

    draw_count++ ;    
    $(jq_id).removeClass('slot_move').addClass('slot_final');

    // play bgm_drop
    playAudio('bgm_drop'+id , 0.6);

    if(draw_count === slot.length){
      allStop();
      $('.list_box').append('<p> '+luckyer.name+' </p>')

      stopAudio('bgm_draw');
      playAudio('bgm_opening' , 0.4);
    }
  }

  function setAnswer(name , phone){
    $('#name').text(name);
    $('#phone').text(phone);

    _setLuckyer(name , phone);
  }

  function _setLuckyer(name , phone){
    luckyer.name = name ;
    luckyer.phone = phone;
  }

  function start(){
    slot.forEach(function(value){
      $(value.el).removeClass('slot_final').addClass('slot_move');
      value.start();
    })

    $('.slot_machine').removeClass('disabled');
    $('.section_led').addClass('disabled');

    $('.draw_bot').removeClass('wink');
    $('.slot_t').removeClass('draw_final_twinkle');

    // btn clicked
    $('.btn_draw').toggleClass('clicked');

    stopAudio('bgm_opening');
    playAudio('bgm_draw' , 0.3);
  }

  function allStop(){
    // background twinkle
    $('.slot_t').addClass('draw_final_twinkle');
    $('.draw_bot').addClass('wink');

    $('.btn_draw').toggleClass('clicked');
    $('.btn_draw').text('繼續抽');
  }

  function reset(){
    $('.btn_draw').text('開始');  
    $('.btn_draw').removeClass('clicked');

    $('.draw_bot').removeClass('wink');
    $('.slot_t').removeClass('draw_final_twinkle slot_move');

    $('.slot_machine').addClass('disabled');
    $('.section_led').removeClass('disabled');

    slot.forEach(function(value ,index){
      value.reset();
      $(value.el).removeClass('slot_final');
    })

    stopAudio('bgm_draw');
    playAudio('bgm_opening' , 0.4); // If opening is playing , then continue
  }

})(window)
