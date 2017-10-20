/*
All BGM will replay!!!
*/
var audioArray = ['bgm_opening', 'bgm_draw', 'bgm_drop']

// Control Audio
$('#sound').click(function() {
  $('#sound').toggleClass('sound_off')
  $('.bgm_select').prop('muted', !$('.bgm_select').prop('muted'))
})

function volumeDown(id) {
  var volume = $('#' + id).prop('volume') - 0.0001
  if (volume <= 0) {
    volume = 0
    return true
  }

  $('#' + id).prop('volume', volume)
  return false
}

function stopAudio(id, state) {
  state = state || 'restart'

  while (volumeDown(id) === false) {
    volumeDown(id)
  }

  $('#' + id).trigger('pause')

  if (state === 'restart') $('#' + id).prop('currentTime', 0)
  else if (state === 'continue');
}

function playAudio(id, volume) {
  // default
  volume = volume || 1

  $('#' + id).prop('volume', volume)
  $('#' + id).trigger('play')

  if ($('#sound').hasClass('sound_off')) {
    $('#' + id).prop('muted', true)
  } else {
    $('#' + id).prop('muted', false)
  }
}

function loadAllAudio(audio) {
  audio.forEach(function(value, index) {
    $('#' + value).trigger('load')
  })
}
