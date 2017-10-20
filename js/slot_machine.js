var led = LED

Vue.component('draw-list', {
  props: ['person'],
  template:
    '<div class="drawList_person" @click="vm.deletePerson(person)" ><div class="btn_delete_person"></div><li>{{person.name}}</li></div>',
})

;(function (wnidow) {
  var vm = new Vue({
    delimiters: ['${', '}'],
    el: '#vue_app',
    data: {
      drawLists: [],
      test: 'hello',
      newPerson: {
        name: '',
        phone: '',
      },
    },
    created: function() {
      var ajaxInitialData = getInitialDrawLists()
      this.drawLists = ajaxInitialData
    },
    methods: {
      addNewPerson: function() {
        var cellPhone = /^09[0-9]{8}$/
        if (
          this.newPerson.name.trim() === '' ||
          !cellPhone.test(this.newPerson.phone)
        ) {
          alert('手機或名字填寫錯誤！')
        } else {
          this.drawLists.push({
            uid: parseInt(Math.random() * 1000000000, 10),
            name: this.newPerson.name,
            phone: this.newPerson.phone,
          })
          this.newPerson.name = ''
          $('.editDrawList_add_person').toggleClass('close')
        }
      },
      deletePerson: function(person) {
        var tmpDrawLists = this.drawLists
        tmpDrawLists.forEach(function(value, index) {
          if (person.uid === value.uid) {
            console.log(person.uid, index, value, this)
            vm.drawLists.splice(index, 1)
          }
        })
      },
    },
  })
  
  function getInitialDrawLists() {
    var _array = []
    $.getJSON('../src/drawList.json', function(data) {
      console.log(data, _array)
      $.each(data, function(key, value) {
        _array.push(value)
      })
    })
    return _array
  }
  
  $('.btn_start').click(function() {
    var drawListData = vm.drawLists
    $('.tip_background, .tip_window').removeClass('fade_open')
    playAudio('bgm_opening', 0.4)
    initialSuccessAndStart(drawListData)
  })
  
  function initialSuccessAndStart(drawListData) {
    var drawCount = 0
    var slot = [
      new Slot('#slot1', 20, 35, 386),
      new Slot('#slot2', 45, 20, 400),
      new Slot('#slot3', 70, 30, 500),
      new Slot('#slot4', 35, 25, 250),
      new Slot('#slot5', 50, 15, 222),
      new Slot('#slot6', 15, 25, 333),
      new Slot('#slot7', 30, 13, 300),
      new Slot('#slot8', 40, 50, 111),
    ]
  
    // current Luckyer's name , phone
    var luckyer = {
      name: '',
      phone: '',
    }
  
    // Call LED from led.js
    led.create('.led', 'Who  is  the  Lucky  Guy', 120, 0).show()
  
    // Listen to your custom event
    $('.btn_draw').click(function() {
      if (this.innerHTML === '開始' || this.innerHTML === '繼續抽') {
        startDraw()
        this.innerHTML = '～停～'
      } else if (this.innerHTML === '～停～') {
        var answer = {}
        this.innerHTML = '即將揭曉...'
  
        answer = drawUpLuckyPerson(drawListData)
        drawCount = 0
        setAnswer(answer.name, answer.phone)
  
        slot.forEach(function(value, index) {
          value.stop(answer.luckyArray[index])
        })
      } else {
        alert('已經抽完獎了！我們下次再見～')
      }
    })
  
    $('.btn_reset').click(function() {
      reset()
      checkIsZeroInDrawLists()
    })
  
    $('.list').click(function() {
      $('.list').toggleClass('list_show')
    })
  
    playAudio('bgm_opening', 0.4) // If opening is playing , then continue
  
    function startDraw() {
      slot.forEach(function(value) {
        $(value.el)
          .removeClass('slot_final')
          .addClass('slot_move')
        value.start()
      })
  
      $('.slot_machine').removeClass('disabled')
      $('.section_led').addClass('disabled')
  
      $('.draw_bot').removeClass('wink')
      $('.slot_t').removeClass('draw_final_twinkle')
  
      // btn clicked
      $('.btn_draw').toggleClass('clicked')
  
      stopAudio('bgm_opening')
      playAudio('bgm_draw', 0.3)
    }
  
    function drawUpLuckyPerson(drawListArray) {
      var luckyPersonObj = {}
      var length = drawListArray.length
      var lucky = Math.floor(Math.random() * length) // 0 ~ length-1
      var dealPhone = dealHiddenPhone(drawListArray[lucky].phone)
      var dealName = drawListArray[lucky].name
  
      console.log(
        'luckyNumber: ' +
          lucky +
          '  arrayLength: ' +
          length +
          '\n name: ' +
          drawListArray[lucky].name +
          '  phone: ' +
          drawListArray[lucky].phone
      )
  
      luckyPersonObj.luckyArray = dealPhone.array
      luckyPersonObj.phone = dealPhone.str
      luckyPersonObj.name = dealName
      luckyPersonObj.trueName = drawListArray[lucky].name
      luckyPersonObj.truePhone = drawListArray[lucky].phone
  
      // remove lucky num
      drawListArray.splice(lucky, 1)
    
      return luckyPersonObj
    }
  
    function setAnswer(name, phone) {
      $('#name').text(name)
      $('#phone').text(phone)
  
      _setLuckyer(name, phone)
    }
  
    function _setLuckyer(name, phone) {
      luckyer.name = name
      luckyer.phone = phone
    }
  
    function reset() {
      $('.btn_draw').text('開始')
      $('.btn_draw').removeClass('clicked')
  
      $('.draw_bot').removeClass('wink')
      $('.slot_t').removeClass('draw_final_twinkle slot_move')
  
      $('.slot_machine').addClass('disabled')
      $('.section_led').removeClass('disabled')
  
      slot.forEach(function(value, index) {
        value.reset()
        $(value.el).removeClass('slot_final')
      })
  
      stopAudio('bgm_draw')
      playAudio('bgm_opening', 0.4) // If opening is playing , then continue
    }
  
    /*
      @method dealHiddenName(name)
      input: 一二三、一二三四、一二
      output: 一x三、一xx四、一x
    */
    function dealHiddenName(name) {
      var i = 0
      var answer = name.substr(0, 1)
      if (name.length >= 3) {
        for (i = 0; i < name.length - 2; i++) {
          answer += 'X'
        }
        answer += name.substr(name.length - 1, 1)
      } else {
        answer += 'X'
      }
      return answer
    }
  
    /*
      @method dealHiddenPhone(phone)
      input: 0912345678
      output: 091xxx678
    */
    function dealHiddenPhone(phone) {
      var phoneArray = phone.split('').slice(2)
      phoneArray.splice(2, 3, 'X', 'X', 'X')
      return {
        array: phoneArray,
        str: phone.slice(0, 4) + 'XXX' + phone.slice(7),
      }
    }
  
    // add final Listener
    ;(function(winodw) {
      slot.forEach(function(value, index) {
        document
          .getElementById('slot' + (index + 1))
          .addEventListener('isFinal', isFinal, false)
      })
    })(Window)
  
    function isFinal(e) {
      var jqId = '#' + this.id
      var id = this.id.split('slot')[1]
  
      drawCount += 1
      $(jqId)
        .removeClass('slot_move')
        .addClass('slot_final')
  
      // play bgm_drop
      playAudio('bgm_drop' + id, 0.6)
  
      if (drawCount === slot.length) {
        allStop()
        $('.list_box').append('<p> ' + luckyer.name + ' </p>')
  
        stopAudio('bgm_draw')
        playAudio('bgm_opening', 0.4)
      }
    }
  
    function allStop() {
      // background twinkle
      $('.slot_t').addClass('draw_final_twinkle')
      $('.draw_bot').addClass('wink')
  
      $('.btn_draw').toggleClass('clicked')
      $('.btn_draw').text('繼續抽')
  
      checkIsZeroInDrawLists()
    }
  
    function checkIsZeroInDrawLists() {
      if (vm.drawLists.length === 0) {
        $('.btn_draw').html('沒有人抽了Ｑ')
      }
    }
  }
})(Window)
