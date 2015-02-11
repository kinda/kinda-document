"use strict";

var _ = require('lodash');
var Box = require('./box');

var Title = Box.extend('Title', function() {
  this.defaults = {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    fontStyle: ['bold']
  };

  var superRender = this.render;
  this.render = function(block) {
    if (block.y !== block.document.top) {
      // marginTop should be ignored when y is at the top of the page
      block.y += this.margins.top;
    }
    block.addRow({}, function(block) {
      superRender.call(this, block);
    }.bind(this));
    block.y += this.margins.bottom;
  };
});

module.exports = Title;
