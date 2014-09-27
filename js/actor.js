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

        // Iterate through cards
        for (var i = 0; i < that.cards.length; i++) {
            var card = that.cards[i];
            count += card.value;
        };

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