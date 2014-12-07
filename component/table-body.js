"use strict";

var _ = require('lodash');
var Component = require('./');
var TableRow = require('./table-row');

var TableBody = Component.extend('TableBody', function() {
  this.defaults = {
    alignment: 'left'
  };

  Object.defineProperty(this, 'rows', {
    get: function() {
      if(!this._rows) this._rows = [];
      return this._rows;
    }
  });

  this.addRow = function(options, fn) {
    var row = TableRow.create(this, options, fn);
    this.rows.push(row);
    return row;
  };

  this.render = function(block) {
    this.rows.forEach(function(row) {
      block.addRow(undefined, function(block) {
        row.render(block);
      }.bind(this));
    }.bind(this));
  };
});

module.exports = TableBody;
