"use strict";

var _ = require('lodash');
var Component = require('./component');
var Text = require('./text').Text;

var Box = Component.extend('Box', function() {
  Object.defineProperty(this, 'components', {
    get: function() {
      if(!this._components) this._components = [];
      return this._components;
    }
  });

  this.addText = function(value, options, fn) {
    var text = Text.create(this, value, options, fn);
    this.components.push(text);
  };

  this.render = function(block) {
    this.components.forEach(function(component) {
      component.render(block);
    }.bind(this));
  };

  this.computeWidth = function(block) {
    if (!this.maxWidth) {
      this.maxWidth = _.max(this.components.map(function(component) {
        return component.computeWidth(block);
      }));
    }

    return this.maxWidth;
  };

  this.computeHeight = function(block) {
    var maxHeight = 0;
    this.components.forEach(function(component) {
      var height = component.computeHeight(block);
      if (height > maxHeight) maxHeight = height;
    }.bind(this));

    return maxHeight;
  };
});


module.exports = Box;
