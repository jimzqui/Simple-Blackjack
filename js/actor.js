/**
 * Simple Blackjack - Actor Class
 * actor.js
 * (c) 2010, Jimbo Quijano
 */

var Actor = Class.extend({

    // Init
    init: function(controls) {
        var that = this;
        that.cards = [];
        that.score = 0;
        that.count = 0;
        that.el = controls.el;
        that.house = controls.house;
    },

    // Retrieve count
    getCount: function() {
        var that = this;
        var count = 0;
        var has_ace = false;

        // Iterate through cards
        for (var i = 0; i < that.cards.length; i++) {
            var card = that.cards[i];
            if (card.name == 'Ace') { 
                has_ace = true; 
                count += 1;
            } else {
                count += card.value;
            }
        };

        // If ace is present
        if (has_ace == true) {
            var count2 = 0;

            // Iterate through cards again
            for (var j = 0; j < that.cards.length; j++) {
                var card = that.cards[j];
                if (card.name == 'Ace') { 
                    count2 += 11;
                } else {
                    count2 += card.value;
                }
            };

            // Return better count
            if (count > count2 && count <= 21) {
                return count;
            } else if (count2 <= 21) {
                return count2;
            } else {
                return count;
            }
        }

        // Return count
        return count;
    },

    // Reset count
    resetCount: function() {
        var that = this;
        that.count = 0;
        that.el.count.val('');
    },

    // Reset score
    resetScore: function() {
        var that = this;
        that.score = 0;
        that.el.score.val('');
    },

    // Reset cards
    resetCards: function() {
        var that = this;
        that.cards = [];
        that.el.hands.empty();
    },

    // Increase score
    win: function() {
        var that = this;
        that.score++;
        that.el.score.val(that.score);
    }
});