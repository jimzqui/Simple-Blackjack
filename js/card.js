/**
 * Simple Blackjack - Card Class
 * card.js
 * (c) 2010, Jimbo Quijano
 */

var Card = Class.extend({

    // Init
    init: function(shuffle) {
        var that = this;
        that.num = shuffle.value;
        that.value = that.getValue(shuffle.value);
        that.suit = that.getSuit(shuffle.suit);
        that.name = that.getName();
        that.slug = that.getSlug();
        that.img = that.getImg();
    },

    // Get value
    getValue: function(rand) {
        var that = this;
        switch(rand) {
            case 11: return 10; break;
            case 12: return 10; break;
            case 13: return 10; break;
            default: return rand;
        }
    },

    // Get suit
    getSuit: function(rand) {
        var that = this;
        switch(rand) {
            case 1: return 'Clubs'; break;
            case 2: return 'Spades'; break;
            case 3: return 'Diamonds'; break;
            case 4: return 'Hearts'; break;
            default: return 'Clubs';
        }
    },

    // Get name
    getName: function() {
        var that = this;
        switch(that.num) {
            case 1: return 'Ace'; break;
            case 11: return 'Jack'; break;
            case 12: return 'Queen'; break;
            case 13: return 'King'; break;
            default: return that.num;
        }
    },

    // Get slug
    getSlug: function() {
        var that = this;
        return this.num + '-' + that.suit;
    },

    // Get img
    getImg: function() {
        var that = this;
        return '<img class="card" src="cards/' + that.slug + '.png" />';
    },

    // Insert card
    insert: function(actor, face, timeout) {
        var that = this;
        that.face = face;
        that.actor = actor;
        that.timeout = timeout;

        // Push to array
        that.actor.cards.push(that);

        // Update actor count
        that.actor.count = actor.getCount();

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