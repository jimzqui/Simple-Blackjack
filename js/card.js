/**
 * Simple Blackjack - Card Class
 * card.js
 * (c) 2010, Jimbo Quijano
 */

var Card = Class.extend({

    // Initialize
    init: function(shuffle) {
        var that = this;

        // Card num
        that.num = shuffle.value;

        // Card value
        switch(shuffle.value) {
            case 11: that.value = 10; break;
            case 12: that.value = 10; break;
            case 13: that.value = 10; break;
            default: that.value = shuffle.value;
        }

        // Card value
        switch(shuffle.suit) {
            case 1: that.suit = 'Clubs'; break;
            case 2: that.suit = 'Spades'; break;
            case 3: that.suit = 'Diamonds'; break;
            case 4: that.suit = 'Hearts'; break;
            default: that.suit = 'Clubs';
        }

        // Card name
        switch(shuffle.value) {
            case 1: that.name = 'Ace'; break;
            case 11: that.name = 'Jack'; break;
            case 12: that.name = 'Queen'; break;
            case 13: that.name = 'King'; break;
            default: that.name = shuffle.value;
        }

        // Card slug
        that.slug = this.num + '-' + that.suit;

        // Card img
        that.img = '<img class="card" src="cards/' + that.slug + '.png" />';
    },

    // Insert card
    insert: function(actor, face, timeout) {
        var that = this;

        // Card face
        that.face = face;

        // Actor holding card
        that.actor = actor;

        // Anim timout of card
        that.timeout = timeout;

        // Push to array
        that.actor.cards.push(that);

        // Update actor count
        that.actor.count = actor.countHand();

        // Only display players count
        if (that.actor.house == false) {
            that.actor.el.count.val(that.actor.count);
        }

        // Display card
        that.place();
        that.animate();
    },

    // Place card in table
    place: function() {
        var that = this;

        // Display card
        var pos1 = that.actor.el.cards.offset();
        setTimeout(function() {
            that.el = $(that.img).appendTo('body');
            that.flip(that.face);
            that.el.css({
                position: 'absolute',
                left: pos1.left,
                top: pos1.top
            });
        }, that.timeout);
    },

    // Animate card to position
    animate: function() {
        var that = this;

        // Animate card
        var pos2 = that.actor.el.hands.offset();
        var adjust_left = (that.actor.cards.length - 1) * 10;
        if (that.actor.cards.length % 2 == 0) { var adjust_top = 10; } 
        else { var adjust_top = 0; }
        setTimeout(function() {
            that.el.animate({
                position: 'absolute',
                left: pos2.left + adjust_left,
                top: pos2.top + adjust_top
            }, 'fast');
        }, that.timeout + 250);
    },

    // Flip card
    flip: function(face) {
        var that = this;
        that.face = face;

        if (face == 'facedown') {
            that.el.attr('src', 'cards/facedown.png');
            that.el.removeClass('faceup');
            that.el.addClass('facedown');
        } else {
            that.el.attr('src', 'cards/' + that.slug + '.png');
            that.el.removeClass('facedown');
            that.el.addClass('faceup');
        }
    }
});