/*
 * grnai-vis-compare
 * https://github.com/bene200/grnai-vis-compare
 *
 * Copyright (c) 2015 Benedikt Rauscher
 * Licensed under the MIT license.
 */

//global jquery; not nice but required to get inchlib to work
global.$ = require('jquery');

var request = require('request');
var _ = require('underscore');
var Inchlib = require('biojs-vis-inchlib');

var Compare = module.exports = function(data){
  this.data = data.data;
  this.el = data.el;
};

Compare.prototype.loadDependencies = function(cb){
  //this is awful but also very interesting.
  //this way every single javascript library can be used within node
  //without touching the library's code
  var self = this;

  $.getScript('http://openscreen.cz/software/inchlib/static/js/kinetic-v5.1.0.min.js', function(){
    global.Kinetic = Kinetic;
    self.Inchlib = require('biojs-vis-inchlib');
    cb();
  });
};

Compare.prototype.render = function(){
  var Inchlib = this.Inchlib;

  var il = new Inchlib({
    target: this.el.id,
		width: 800,
		draw_row_ids: true,
		metadata_colors: "BuWhRd",
	  text: 'GenomeRNAi screen comparison'
  });
  il.read_data_from_file("https://cdn.rawgit.com/skutac/biojs-vis-inchlib/master/snippets/data/data.json");
  il.draw();
  this.setEvents(il);
};

Compare.prototype.test = function(){
  this.el.innerHTML = Amazing;
};

Compare.prototype.setEvents = function(inchlib){
  inchlib.onAll(function(name){
  	console.log(name + " event triggered");
  });
};
