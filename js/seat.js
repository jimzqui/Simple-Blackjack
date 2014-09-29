/**
 * JQBlackjack - Seat Class
 * seat.js
 * (c) 2010, Jimbo Quijano
 */

var Seat = Class.extend({

    // Initialize
    init: function(name) {
        var that = this;
        
        // Seat name
        that.name = name;

        // Seat objects
        that.main = $(name.toLowerCase());
        that.hands: that.main.find('.hands');
        that.cards: that.main.find('.cards');
        that.score: that.main.find('.score');
        that.count: that.main.find('.count');
    }
});