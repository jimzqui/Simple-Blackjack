/**
 * Simple Blackjack - Anim Class
 * anim.js
 * (c) 2010, Jimbo Quijano
 */

var Anim = Class.extend({

    // Init
    init: function(parts) {
        var that = this;
        that.parts = parts;
    },

    eyes: function(file) {
        var that = this;
        that.clear();
        $(that.img(file + '.png')).appendTo(that.parts.el.eyes);
    },

    eyebrows: function(file) {
        var that = this;
        that.clear();
        return $(that.img(file + '.gif')).appendTo(that.parts.el.eyebrows);
    },

    hands: function(file) {
        var that = this;
        that.clear();
        return $(that.img(file + '.gif')).appendTo(that.parts.el.hands);
    },

    img: function(file, timestamp) {
        var timestamp = new Date().getTime();
        return '<img src="images/' + file + '?lastmod=' + timestamp + '" alt=""/>';
    },

    clear: function() {
        var that = this;
        that.parts.el.eyes.empty();
        that.parts.el.eyebrows.empty();
        that.parts.el.hands.empty();
    }
});