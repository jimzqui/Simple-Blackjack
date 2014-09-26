var game_over,
    game_stand,
	card_count;

var message,
	player_hands,
	dealer_hands,
	player_count,
	dealer_count,
	player_countbase,
	dealer_countbase,
	player_scoreholder,
	dealer_scoreholder,
	player_score,
	dealer_score;

$(document).ready(function() {

  message = $('#message');
  player_hands = $('#player').find('.hands');
  dealer_hands = $('#dealer').find('.hands');
  player_count = $('#player').find('.count');
  dealer_count = $('#dealer').find('.count');
  player_countbase = $('#player').find('.countbase');
  dealer_countbase = $('#dealer').find('.countbase');
  player_scoreholder = $('#player-score');
  dealer_scoreholder = $('#dealer-score');
  player_score = player_scoreholder.find('.score');
  dealer_score = dealer_scoreholder.find('.score');
  animating = false;
  
  setBj();
  
  $('#button-deal').click(function() {
    newHand();
  });
  
  $('#button-stand').click(function() {
    dealer();
  });

  $('#button-hit').click(function() {
    player();
  });

});

function shuffle(max) {
  var num = Math.random() * max;
  return Math.round(num) + 1;
}

function getSuit() {
  suit = shuffle(4);
  if(suit == 1) return 'Spades';
  if(suit == 2) return 'Clubs';
  if(suit == 3) return 'Diamonds';
  else return 'Hearts';
}

function cardName(card) {
  if(card == 1) return 'Ace';
  if(card == 11) return 'Jack';
  if(card == 12) return 'Queen';
  if(card == 13) return 'King';
  return '' + card;
}

function cardValue(card, str_who) {
  if(card == 1) {
	if(str_who == 'You' && player_countbase.val() > 10)
	  return 1;
	else
	  return 11;
  }
  
  if(card > 10)
    return 10;
  
  return card;
}

function pickCard(str_who, face) {
  card = shuffle(12);
  suit = getSuit();
  card_slug = card + '-' + suit;
	
  if(str_who == 'You')
    message.html('You get ' + cardName(card) + ' of ' + suit);

  displayCard(str_who, card_slug, face);
  
  return cardValue(card, face);
}

function displayCard(str_who, card_slug, face) {
  if(str_who == 'You') {
    var hands = player_scoreholder;
    var count = player_hands.find('img.faceup').length;
  }
  else {
    var hands = dealer_scoreholder;
    var count = dealer_hands.find('img.faceup').length;
  }

  if(count % 2 == 0)
    var oddeven = ' even';
  else
    var oddeven = ' odd';

  var faceup = '<img src="cards/' + card_slug + '.png" alt="' + card_slug + '" class="faceup' + oddeven + '"/>';
  var facedown = '<img src="cards/facedown.png" alt="facedown" class="facedown' + oddeven + '"/>';
  
  if(face == 'facedown') {
    $(facedown).appendTo(hands);
	var face = $(faceup).appendTo(hands);
	face.hide();
  }
  else {
    $(faceup).appendTo(hands);
  }
  
  setTimeout(function() {
    animateCards();
  }, 1000);
}

function animateCards() {
  distributeCards();
  
  if(game_stand == true) {
    showDealersCard();
	
    while(dealer_countbase.val() < 17) {
	  dealer_countbase.val(parseInt(dealer_countbase.val()) + pickCard('Dealer'));
	  
	  if(card_count == 0)
	    dealer_count.val(dealer_countbase.val());
		
	  return;
    }
	
	lookAtHands();
  }
}

function distributeCards() {
  var player_card = player_scoreholder.find('img');
  var dealer_card = dealer_scoreholder.find('img');
  var player_clone = player_card.clone();
  var dealer_clone = dealer_card.clone();

  player_hands.append(player_clone);
  dealer_hands.append(dealer_clone);
  player_card.remove();
  dealer_card.remove();
  
  updateTotal();
}

function updateTotal() {
  player_count.val(player_countbase.val());
  if(card_count == 1)
    dealer_count.val(dealer_countbase.val());
}

function newHand() {
  if(game_over == false) {
    message.html('Hand in Play!');
	return;
  }
  else {
	card_count = 0;
	game_over = false;
	game_stand = false;
	player_hands.empty();
    dealer_hands.empty();
	
	card_count += 1;
	player_countbase.val(pickCard('You'));
	dealer_countbase.val(pickCard('Dealer'));
	
	setTimeout(function() {
	  card_count += 1;
      player_countbase.val(parseInt(player_countbase.val()) + pickCard('You'));
	  dealer_countbase.val(parseInt(dealer_countbase.val()) + pickCard('Dealer', 'facedown'));
    }, 1000);
  }
}

function dealer() {
  if(game_over == true) {
    game_stand = false;
    message.html('Deal the Cards!');
	return;
  }
  else if(player_countbase.val() < 10) {
    game_stand = false;
    message.html('Card Below Ten, Take a Hit!');
	return;
  }
  else if(dealer_countbase.val() < 17) {
    game_stand = true;
    dealer_countbase.val(parseInt(dealer_countbase.val()) + pickCard('Dealer'));
	if(card_count == 1)
	  dealer_count.val(dealer_countbase.val());
  }
  else if(dealer_countbase.val() >= 17) {
    showDealersCard();
	lookAtHands();
  }
}

function player() {
  if(game_over == true) {
    message.html('Deal the Cards!');
	return;
  }
  else {
    card_count += 1;
    player_countbase.val(parseInt(player_countbase.val()) + pickCard('You'));
  }
  
  if(player_countbase.val() > 21) {
    message.html('You Busted!');
    game_over = true;
	dealer_score.val(parseInt(dealer_score.val()) + 1);
	showDealersCard();
  }
}

function lookAtHands() {
  if(game_over == true || player_countbase.val() < 10 || card_count < 2) {
    return;
  }
  else if(dealer_countbase.val() > 21) {
    message.html('House Busts, You Win!');
    game_over = true;
	player_score.val(parseInt(player_score.val()) + 1);
	showDealersCard();
	animateEyes('eyes-right');
  }
  else if(player_countbase.val() == dealer_countbase.val()) {
    message.html('Game Tied, Try Again!');
    game_over = true;
	showDealersCard();
	animateEyes('eyes-left');
  }
  else if(player_countbase.val() == 21) {
    message.html('You Win, Blackjack!');
    game_over = true;
	player_score.val(parseInt(player_score.val()) + 1);
	showDealersCard();
	animateEyes('eyes-left');
  }
  else if(player_countbase.val() > dealer_countbase.val()) {
    message.html('You Win!');
    game_over = true;
	player_score.val(parseInt(player_score.val()) + 1);
	showDealersCard();
	animateEyes('eyes-right');
  }
  else if(player_countbase.val() == 20 && dealer_countbase.val() == 21) {
    message.html('House Wins, Tough Luck!');
    game_over = true;
	dealer_score.val(parseInt(dealer_score.val()) + 1);
	showDealersCard();
	animateEyebrows('eyebrows-raise');
  }
  else if(dealer_countbase.val() == 21) {
    message.html('House Wins, Blackjack!');
    game_over = true;
	dealer_score.val(parseInt(dealer_score.val()) + 1);
	showDealersCard();
	animateEyebrows('eyebrows-raise');
  }
  else {
    message.html('House Wins!');
    game_over = true;
	dealer_score.val(parseInt(dealer_score.val()) + 1);
	showDealersCard();
	animateEyebrows('eyebrows-raise');
  }
}

function showDealersCard() {
  dealer_hands.find('.faceup').show();
  dealer_hands.find('.facedown').hide();
  dealer_count.val(dealer_countbase.val());
}

function setBj() {
  message.html("Hit 'Deal' to Start");
  game_over = true;
  game_stand = false;
  card_count = 0;
  player_hands.empty();
  dealer_hands.empty();
  player_countbase.val(0);
  dealer_countbase.val(0);
  player_count.val(player_countbase.val());
  dealer_count.val(dealer_countbase.val());
  player_score.val(0);
  dealer_score.val(0);
}

function displayMessage(message) {
  $('#message').html(message);
}