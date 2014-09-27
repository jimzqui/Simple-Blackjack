/**
 * Simple Blackjack - Deck Class
 * deck.js
 * (c) 2010, Jimbo Quijano
 */

var Deck = Class.extend({

    // Init
    init: function() {
        var that = this;
        that.status = 'new';
    },

    // Shuffle deck
    shuffle: function() {
        var that = this;

        // Randomize
        var value = Math.floor((Math.random() * 12) + 1);
        var suit = Math.floor((Math.random() * 4) + 1);

        // Return radomized num
        return { value: value, suit: suit }
    },

    // Pick card from deck
    pick: function() {
        var that = this;

        // Shuffle deck
        var shuffle = this.shuffle();

        // Instantiate new card
        var card = new Card(shuffle);

        // Return card
        return card;
    },

    // Set status
    setStatus: function(status) {
        var that = this;
        that.status = status;
    }
});