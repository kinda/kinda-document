"use strict";

var _ = require('lodash');
var Component = require('../component');

var Text = Component.extend('Text', function() {
  var superCreator = this.getCreator();
  this.setCreator(function(parent, value, options, fn) {
    superCreator.call(this, parent, options, fn);
    this.value = value;
  });

  this.render = function(block) {
    var height = this.computeHeight(block);
    if (height > block.height) block.height = height;
    block.draw(function(pdf) {
      var x = block.mmToPt(block.x + block.padding);
      var y = block.mmToPt(block.y + block.padding);

      // console.log([this.value, x, y, block.width, block.height, block.padding]);

      pdf.font(this.fontTypeFace)
          .fontSize(this.fontSize)
          .fillColor(this.color)
          .text(this.value, x, y, {
            width: block.mmToPt(block.width - block.padding * 2),
            align: this.alignment
      });
    }.bind(this));
  };


  this.computeWidth = function(block) {
    var options = {
      fontTypeFace: this.fontTypeFace,
      fontSize: this.fontSize
    };
    var width = block.computeWidthOfString(this.value, options);
    width += block.padding * 2;
    
    return width;
  };

  this.computeHeight = function(block) {
    var options = {
      fontTypeFace: this.fontTypeFace,
      fontSize: this.fontSize
    };
    var height = block.computeHeightOfString(this.value, options);
    height += block.padding * 2;

    return height;
  };
});

module.exports.Text = Text;
