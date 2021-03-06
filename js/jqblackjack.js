/**
 * JQblackjack - Main Class
 * jqblackjack.js
 * (c) 2010, Jimbo Quijano
 */

var JQblackjack = Class.extend({

    // Initialize
    init: function(options) {
        var that = this;
        if (options == undefined) options = {};

        // Default controls
        var controls = {

            // Player
            player: {
                hands: $('#player-hands'),
                cards: $('#player-cards'),
                score: $('#player-score'),
                count: $('#player-count')
            },

            // Dealer
            dealer: {
                hands: $('#dealer-hands'),
                cards: $('#dealer-cards'),
                score: $('#dealer-score'),
                count: $('#dealer-count')
            },

            // Buttons
            buttons: {
                deal: $('#button-deal'),
                newhand: $('#button-newhand'),
                stand: $('#button-stand'),
                hit: $('#button-hit')
            },

            // System
            system: {
                message: $('#message'),
                player_score: $('#player-score'),
                dealer_score: $('#dealer-score')
            },

            // Anim
            parts: {
                eyes: $('#anim-eyes'),
                eyebrows: $('#anim-eyebrows'),
                hands: $('#anim-hands')
            }
        };

        // Construct buttons
        that.buttons = {
            el: $.extend({}, controls.buttons, options.buttons)
        };

        // Construct system
        that.system = {
            el: $.extend({}, controls.system, options.system)
        };

        // Construct parts
        that.parts = {
            el: $.extend({}, controls.parts, options.parts)
        };

        // Create player
        that.player = new Actor({
            el: controls.player,
            house: false
        });

        // Create dealer
        that.dealer = new Actor({
            el: controls.dealer,
            house: true
        });

        // Reset
        that.reset();
    },

    // Reset game
    reset: function() {
        var that = this;

        // Create deck
        that.deck = new Deck();

        // Create anim
        that.anim = new Anim(that.parts);

        // Reset cards
        that.player.resetCards();
        that.dealer.resetCards();
        that.player.resetCount();
        that.dealer.resetCount();

        // Remove cards
        $('img.card').remove();
    },

    // Start game
    start: function() {
        var that = this;

        // Set deck status
        that.deck.status = 'start';
        that.checkState();

        // First message
        that.message(that.messages.hit_deal);

        // Listen for deal button
        that.buttons.el.deal.unbind('click');
        that.buttons.el.deal.click(function() {
            that.newHand();
            that.checkState();
        });

        // Listen for newhand button
        that.buttons.el.newhand.unbind('click');
        that.buttons.el.newhand.click(function() {
            that.reset();
            that.start();
        });

        // Listen for hit button
        that.buttons.el.hit.unbind('click');
        that.buttons.el.hit.click(function() {
            that.hit();
            that.checkState();
        });

        // Listen for stand button
        that.buttons.el.stand.unbind('click');
        that.buttons.el.stand.click(function() {
            that.stand();
            that.checkState();
        });
    },

    // Check state
    checkState: function() {
        var that = this;

        // If status is 'start'
        if (that.deck.status == 'start') {
            that.buttons.el.deal.show();
            that.buttons.el.newhand.hide();
            that.buttons.el.hit.addClass('disabled');
            that.buttons.el.stand.addClass('disabled');
        }

        // If status is 'in_play'
        else if (that.deck.status == 'in_play') {
            that.buttons.el.deal.hide();
            that.buttons.el.newhand.hide();
            that.buttons.el.hit.removeClass('disabled');
            that.buttons.el.stand.removeClass('disabled');
        }

        // If status is 'over'
        else if (that.deck.status == 'over') {
            that.buttons.el.deal.hide();
            that.buttons.el.newhand.show();
            that.buttons.el.hit.addClass('disabled');
            that.buttons.el.stand.addClass('disabled');
        }
    },

    // Display message
    message: function(message) {
        var that = this;
        that.system.el.message.html(message)
    },

    // Deal new hand
    newHand: function() {
        var that = this;

        // Check if currently 'in_play'
        if(that.deck.status == 'in_play') {
            return that.message(that.messages.in_play);
        }

        // Set deck status
        that.deck.status = 'in_play';

        // Add player cards
        var count1 = 0;
        do {
            that.cardsGive(that.player, 'faceup', count1 * 500);
            count1++;
        } while(that.player.cards.length < 2);

        // Add dealer cards
        var count2 = 0;
        do {
            if (count2 > 0) { var face = 'facedown'; }
            else { var face = 'faceup'; }
            that.cardsGive(that.dealer, face, count2 * 500);
            count2++;
        } while(that.dealer.cards.length < 2);

        // Check result
        setTimeout(function() {
            that.checkHit();
            that.checkState();
        }, (count1 + 1) * 500);
    },

    // Player hit
    hit: function() {
        var that = this;

        // Animate hands
        that.anim.hands('hit');

        // Check if status is 'start'
        if(that.deck.status == 'start') {
            return that.message(that.messages.hit_deal);
        }

        // Check if status is 'over'
        if(that.deck.status == 'over') {
            return that.message(that.messages.hit_newhand);
        }

        // Add another card
        that.cardsGive(that.player, 'faceup');

        // Check hit
        that.checkHit();
        that.checkState();
    },

    // Player stand
    stand: function() {
        var that = this;

        // Animate hands
        that.anim.hands('stand');

        // Check if status is 'start'
        if(that.deck.status == 'start') {
            return that.message(that.messages.hit_deal);
        }

        // Check if status is over
        if(that.deck.status == 'over') {
            return that.message(that.messages.hit_newhand);
        }

        // Check hit
        that.checkStand();
        that.checkState();
    },

    // Add cards to actors
    cardsGive: function(actor, face, timeout) {
        var that = this;
        if (timeout == undefined) { timeout = 0; }

        // Pick card from deck
        var card = that.deck.pick();
        card.insert(actor, face, timeout);

        // Display players card in message
        if (actor.house == false) {
            that.message('You get ' + card.name + ' of ' + card.suit);
        }
    },

    // Check hit
    checkHit: function() {
        var that = this;

        // Check blackjack
        if (that.player.count == 21) {
            that.cardsReveal();
            that.player.win();
            that.gameOver();
            return that.message(that.messages.you_blackjack);
        }

        // If player exceeds 21
        if (that.player.count > 21) {
            that.cardsReveal();
            that.dealer.win();
            that.gameOver();
            return that.message(that.messages.you_busted);
        }
    },

    // Check stand
    checkStand: function() {
        var that = this;

        // If player has less than 10
        if (that.player.count < 10) {
            return that.message(that.messages.take_hit);
        } 

        // Add dealer cards
        var count = 0;
        do {
            that.cardsGive(that.dealer, 'facedown', count * 500);
            count++;
        } while(that.dealer.count < 17);

        // Check result
        setTimeout(function() {
            that.checkResult();
            that.checkState();
        }, (count + 1) * 500);
    },

    // Check win result
    checkResult: function() {
        var that = this;

        // If player tied with dealer
        if (that.player.count == that.dealer.count) {
            that.cardsReveal();
            that.gameOver();
            return that.message(that.messages.game_tied);
        }

        // If player is close to dealer's blackjack
        else if (that.player.count == 20 && that.dealer.count == 21) {
            that.cardsReveal();
            that.dealer.win();
            that.gameOver();
            return that.message(that.messages.tough_luck);
        }

        // If player exceeds 21
        else if (that.player.count > 21) {
            that.cardsReveal();
            that.dealer.win();
            that.gameOver();
            return that.message(that.messages.you_busted);
        }

        // If dealer exceeds 21
        else if (that.dealer.count > 21) {
            that.cardsReveal();
            that.player.win();
            that.gameOver();
            return that.message(that.messages.house_bust);
        }

        // If player has greater than the dealer
        else if (that.player.count > that.dealer.count) {
            that.cardsReveal();
            that.player.win();
            that.gameOver();
            return that.message(that.messages.you_win);
        }

        // If dealer has greater than the player
        else if (that.player.count < that.dealer.count) {
            that.cardsReveal();
            that.dealer.win();
            that.gameOver();
            return that.message(that.messages.house_win);
        }

        // If player has 21
        else if (that.player.count == 21) {
            that.cardsReveal();
            that.player.win();
            that.gameOver();
            return that.message(that.messages.house_blackjack);
        }

        // If dealer has 21
        else if (that.dealer.count == 21) {
            that.cardsReveal();
            that.dealer.win();
            that.gameOver();
            return that.message(that.messages.house_blackjack);
        }
    },

    // Reveal dealer's card
    cardsReveal: function() {
        var that = this;

        // Iterate each dealer's card
        for (var i = 0; i < that.dealer.cards.length; i++) {
            var card = that.dealer.cards[i];
            if (card.face == 'facedown') {
                card.flip();
            }
        };

        // Dispaly dealer's count
        that.dealer.el.count.val(that.dealer.count);
    },

    // Game over
    gameOver: function() {
        var that = this;
        that.deck.status = 'over';

        // Animate hands
        that.anim.eyebrows('eyebrows-raise');
    },

    // Messages
    messages: {
        you_win: 'You Win!',
        house_win: 'House Wins!',
        in_play: 'Hand in Play!',
        deal_cards: 'Deal the Cards',
        game_tied: 'Push, Try Again!',
        you_busted: "You're Busted!",
        hit_deal: "Hit 'Deal' to Start",
        hit_newhand: "Hit 'New Hand' to Restart",
        house_bust: 'House Busts, You Win!',
        tough_luck: 'House Wins, Tough Luck!',
        you_blackjack: 'You Win, Blackjack!',
        house_blackjack: 'House Wins, Blackjack!',
        take_hit: 'Card Below Ten, Take a Hit!'
    },
});