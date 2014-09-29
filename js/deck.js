/**
 * JQBlackjack - Deck Class
 * deck.js
 * (c) 2010, Jimbo Quijano
 */

var Deck = Class.extend({

    // Initialize
    init: function() {
        var that = this;

        // Set init status
        that.status = 'new';

        // Contruct cards
        that.cards = [];
        for (var i = 1; i <= 13; i++) {
            for (var j = 1; j <= 4; j++) {
                that.cards.push(new Card({
                    value: i,
                    suit: j
                }));
            };
        };
    },

    // Pick card from deck
    pick: function() {
        var that = this;

        // Randomize
        var rand = Math.floor((Math.random() * that.cards.length));

        // Get card
        var card = that.cards[rand];

        // Remove card from deck
        that.cards.splice(rand, 1);

        // Return card
        return card;
    }
});