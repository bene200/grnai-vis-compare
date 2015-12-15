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
  			width : 400,
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
    var chartSvg = document.getElementsByClassName("tnt_groupDiv")[0].childNodes[0];
    chartSvg.id = "chart";
    chartSvg.style.width = 1000;
    chartSvg.style.height = 1000;
    var tntSvg = chartSvg.childNodes[0];
    d3.select("#" + tntSvg.id)
      .attr("transform", "translate(500,523)");


    //make a partitioned circle around tree
    var width = 1000,
        height = 1000,
        radius = Math.min(width, height) / 2,
        color = d3.scale.category20c();

    var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");

    var myLayout = function() {
      var hierarchy = d3.layout.hierarchy(), size = [ 1, 1 ];
      function position(node, x, dx, dy) {
        var children = node.children;
        node.x = x;
        node.y = node.depth === 0 ? 0 : dy / (node.depth/1.5);
        node.dx = dx;
        node.dy = node.depth === 0 ? 0 : dy / (node.depth/1.5);
        if (children && (n = children.length)) {
          var i = -1, n, c, d;
          dx = node.value ? dx / node.value : 0;
          while (++i < n) {
            position(c = children[i], x, d = c.value * dx, dy);
            x += d;
          }
        }
      }
      function depth(node) {
        var children = node.children, d = 0;
        if (children && (n = children.length)) {
          var i = -1, n;
          while (++i < n) d = Math.max(d, depth(children[i]));
        }
        return 1 + d;
      }
      function partition(d, i) {
        var nodes = hierarchy.call(this, d, i);
        position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
        return nodes;
      }
      partition.size = function(x) {
        if (!arguments.length) return size;
        size = x;
        return partition;
      };
      function d3_layout_hierarchyRebind(object, hierarchy) {
        d3.rebind(object, hierarchy, "sort", "children", "value");
        object.nodes = object;
        object.links = d3_layout_hierarchyLinks;
        return object;
      }
      function d3_layout_hierarchyLinks(nodes) {
        return d3.merge(nodes.map(function(parent) {
          return (parent.children || []).map(function(child) {
            return {
              source: parent,
              target: child
            };
          });
        }));
      }
      return d3_layout_hierarchyRebind(partition, hierarchy);
    };

    var partition = myLayout()
      .sort(null)
      .size([2 * Math.PI, radius * radius])
      .value(function(d) { return 0.5; });

    var arc = d3.svg.arc()
      .startAngle(function(d) { return d.x; })
      .endAngle(function(d) { return d.x + d.dx; })
      .innerRadius(function(d) { return Math.sqrt(d.y) ; })
      .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

    var root = {
      "name": "root",
      "children": _.map(this.data.screens, function(el){
        return {
          "name": el.name,
          "children": _.map(el.genes, function(gene){
            return {
              "name": gene,
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
      .attr("id", function(d) { return d.name; })
      .style("stroke", "#fff")
      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
      .style("fill-rule", "evenodd");

    debugger;
  }
});
