"use strict";

var _ = require('lodash');
var KindaObject = require('kinda-object');

var Block = KindaObject.extend('Block', function() {
  Object.defineProperty(this, 'x', {
    get: function() {
      return this.parentBlock.x;
    },
    set: function(x) {
      this.parentBlock.x = x;
    },
    configurable: true
  });

  Object.defineProperty(this, 'y', {
    get: function() {
      return this.parentBlock.y;
    },
    set: function(y) {
      this.parentBlock.y = y;
    },
    configurable: true
  });

  Object.defineProperty(this, 'width', {
    get: function() {
      return this.parentBlock.width;
    },
    set: function(width) {
      this.parentBlock.width = width;
    },
    configurable: true
  });

  Object.defineProperty(this, 'height', {
    get: function() {
      return this.parentBlock.height;
    },
    set: function(height) {
      this.parentBlock.height = height;
    },
    configurable: true
  });

  Object.defineProperty(this, 'paddings', {
    get: function() {
      if (!this._paddings) this._paddings = {};
      return this._paddings;
    },
    set: function(paddings) {
      if (!_.isArray(paddings)) paddings = [paddings];

      var top = paddings[0];
      var right = paddings[1];
      var bottom = paddings[2];
      var left = paddings[3];

      if (right == null) right = top;
      if (bottom == null) bottom = top;
      if (left == null) left = right;

      this.paddings.top = top;
      this.paddings.right = right;
      this.paddings.bottom = bottom;
      this.paddings.left = left;
    },
    configurable: true
  });

  Object.defineProperty(this, 'paddingLeft', {
    get: function() {
      return this.paddings.left;
    },
    set: function(paddingLeft) {
      this.paddings.left = paddingLeft;
    }
  });

  Object.defineProperty(this, 'paddingRight', {
    get: function() {
      return this.paddings.right;
    },
    set: function(paddingRight) {
      this.paddings.right = paddingRight;
    }
  });

  Object.defineProperty(this, 'paddingTop', {
    get: function() {
      return this.paddings.top;
    },
    set: function(paddingTop) {
      this.paddings.top = paddingTop;
    }
  });

  Object.defineProperty(this, 'paddingBottom', {
    get: function() {
      return this.paddings.bottom;
    },
    set: function(paddingBottom) {
      this.paddings.bottom = paddingBottom;
    }
  });

  Object.defineProperty(this, 'pdf', {
    get: function() {
      return this.parentBlock.pdf;
    },
    set: function(pdf) {
      this.parentBlock.pdf = pdf;
    },
    configurable: true
  });

  Object.defineProperty(this, 'drawBuffer', {
    get: function() {
      return this.parentBlock.drawBuffer;
    },
    set: function(drawBuffer) {
      this.parentBlock.drawBuffer = drawBuffer;
    },
    configurable: true
  });

  Object.defineProperty(this, 'document', {
    get: function() {
      return this.parentBlock.document;
    },
    set: function(document) {
      this.parentBlock.document = document;
    },
    configurable: true
  });

  this.draw = function(fn) {
    this.drawBuffer.push(fn);
  };

  this.flush = function() {
    this.drawBuffer.forEach(function(fn) {
      fn.call(undefined, this.pdf);
    }.bind(this));
    this.drawBuffer.length = 0;
  };

  this.computeWidthOfString = function(str, options) {
    this.pdf.font(options.fontTypeFace);
    this.pdf.fontSize(options.fontSize);

    var width = this.pdf.widthOfString(
      str + '', { width: this.mmToPt(this.width) }
    );

    return this.ptToMm(width);
  };

  this.computeHeightOfString = function(str, options) {
    this.pdf.font(options.fontTypeFace);
    this.pdf.fontSize(options.fontSize);

    var height = this.pdf.heightOfString(
      str + '', { width: this.mmToPt(this.width) }
    );
    return this.ptToMm(height);
  };

  this.mmToPt = function(mm) {
    var inch = mm / 25.4;
    var pt = inch * 72;
    return pt;
  };

  this.ptToMm = function(pt) {
    var inch = pt / 72;
    var mm = inch * 25.4;
    return mm;
  };
});

module.exports = Block;
