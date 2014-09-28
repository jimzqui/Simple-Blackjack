/**
 * Simple Blackjack - Anim Class
 * anim.js
 * (c) 2010, Jimbo Quijano
 */

var Anim = Class.extend({

    // Initialize
    init: function(parts) {
        var that = this;
        that.parts = parts;
    },

    // Animate eyes
    eyes: function(file) {
        var that = this;
        that.stop();
        $(that.img(file + '.png')).appendTo(that.parts.el.eyes);
    },

    // Animate eyebrows
    eyebrows: function(file) {
        var that = this;
        that.stop();
        return $(that.img(file + '.gif')).appendTo(that.parts.el.eyebrows);
    },

    // Animate hands
    hands: function(file) {
        var that = this;
        that.stop();
        return $(that.img(file + '.gif')).appendTo(that.parts.el.hands);
    },

    // Animate img
    img: function(file, timestamp) {
        var timestamp = new Date().getTime();
        return '<img src="images/' + file + '?lastmod=' + timestamp + '" alt=""/>';
    },

    // Stop animation
    stop: function() {
        var that = this;
        that.parts.el.eyes.empty();
        that.parts.el.eyebrows.empty();
        that.parts.el.hands.empty();
    }
});