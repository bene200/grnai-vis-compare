/*
 * grnai-vis-compare
 * https://github.com/bene200/grnai-vis-compare
 *
 * Copyright (c) 2015 Benedikt Rauscher
 * Licensed under the MIT license.
 */

var Backbone = require("backbone");
var exe = require("exelixis");
var _ = require("underscore");

module.exports = Backbone.View.extend({
  initialize: function(obj){
    this.data = obj.obj;
    this.el = obj.el;
  },
  render: function(){
    var createTree = exe.createTree,
        updateTree = exe.updateTree,
        self = this;

    var opts = {
		  el : self.el,
  		tree : {
  			data : self.data.tree,
  			width : 2000,
  			height : 12,
  			scale : false,
  			layoutInput : "radial",
		  },
  		label : {
  			fontsize : 12
  		},
		  nodes : {
  			toggle : true, //allows onClickEvent
  			select: true, //allows selections
  			size : 5,
  			fill : "grey",
  			stroke : "black",
  			selectedFill : "steelblue",
  			selectedSize : 4,
  		},
    };

    tree = this.treeVis = createTree(opts);
    document.getElementsByClassName("tnt_groupDiv")[0].childNodes[0].id = "chart";

    //make a partitioned circle around tree
    var width = 960,
        height = 700,
        radius = Math.min(width, height) / 2,
        color = d3.scale.category20c();

    var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");

    var partition = d3.layout.partition()
      .sort(null)
      .size([2 * Math.PI, radius * radius])
      .value(function(d) { return 0.5; });

    var arc = d3.svg.arc()
      .startAngle(function(d) { return d.x; })
      .endAngle(function(d) { return d.x + d.dx; })
      .innerRadius(function(d) { return Math.sqrt(d.y); })
      .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

    var root = {
      "name": "root",
      "children": _.map(this.data.screens, function(el){
        return {
          "name": el.name,
          "children": _.map(el.genes, function(gene){
            return {
              "name": gene.name,
              "size": 1
            };
          })
        };
      })
    };

    var path = svg.datum(root).selectAll("path")
      .data(partition.nodes)
    .enter().append("path")
      .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
      .style("fill-rule", "evenodd")
  }
});
