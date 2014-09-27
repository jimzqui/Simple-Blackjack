var anim_eyes;
var anim_eyebrows;
var anim_hands;

$(document).ready(function() {

  jqblackjack.game.init();

  anim_eyes = $('#anim-eyes');
  anim_eyebrows = $('#anim-eyebrows');
  anim_hands = $('#anim-hands');
  
  $('#button-lookleft').click(function() {
    var eyes_right = animateEyes('eyes-left');
  });
  
  $('#button-lookright').click(function() {
    var eyes_left = animateEyes('eyes-right');
  });
  
  $('#button-eyebrows').click(function() {
    var eyebrows_raise = animateEyebrows('eyebrows-raise');
  });
  
  $('#button-hit').click(function() {
    var action = animateHands('hit');
  });
  
  $('#button-stand').click(function() {
    var action = animateHands('stand');
  });
  
});

function animateEyes(direction) {
  clearAnimations();
  return $('<img src="images/' + direction + '.png" alt=""/>').appendTo(anim_eyes);
}

function animateEyebrows(direction) {
  var timestamp = new Date().getTime();

  clearAnimations();
  return $('<img src="images/' + direction + '.gif?lastmod=' + timestamp + '" alt=""/>').appendTo(anim_eyebrows);
}

function animateHands(action) {
  var timestamp = new Date().getTime();

  clearAnimations();
  return $('<img src="images/' + action + '.gif?lastmod=' + timestamp + '" alt=""/>').appendTo(anim_hands);
}

function clearAnimations() {
  anim_eyes.empty();
  anim_eyebrows.empty();
  anim_hands.empty();
}