// if you don't specify a html file, the sniper will generate a div with id "rootDiv"
var Compare = require("grnai-vis-compare");

var exampleTree = "((((((((((((((TP53, TP53I3), TP53AIP1), TP53INP1), TP53BP1), TP53BP2), TP53I11), TP53TG3), TP53TG5), TP53TG3C), TP53TG3D), TP53I13), TP53TG1), TP53INP2), TP53RK);";

var screens = [
  {
    name: "GR00249-S",
    genes: [
      "TP53",
      "TP53I3",
      "TP53AIP1",
      "TP53INP1",
      "TP53BP1",
      "TP53BP2",
      "TP53I11",
      "TP53TG3",
      "TP53TG5",
      "TP53TG3C",
      "TP53TG3D",
      "TP53TG3B",
      "TP53I13",
      "TP53INP2",
      "TP53RK"
    ]
  },
  {
    name: "GR00250-A-1",
    genes: [
      "TP53",
      "TP53AIP1",
      "TP53INP1",
      "TP53BP1",
      "TP53BP2"
    ]
  },
  {
    name: "GR00250-A-2",
    genes: [
      "TP53",
      "TP53AIP1",
      "TP53INP1",
      "TP53BP1",
      "TP53BP2"
    ]
  },
  {
    name: "GR00250-A-3",
    genes: [
      "TP53",
      "TP53I3",
      "TP53BP1",
      "TP53BP2"
    ]
  },
  {
    name: "GR00196-A-1",
    genes: [
      "TP53",
      "TP53I3",
      "TP53AIP1",
      "TP53INP1",
      "TP53BP1",
      "TP53BP2",
      "TP53I11",
      "TP53TG5",
      "TP53RK"
    ]
  },
  {
    name: "GR00123-A-0",
    genes: [
      "TP53",
      "TP53BP1"
    ]
  },
  {
    name: "GR00103-A-0",
    genes: [
      "TP53"
    ]
  },
  {
    name: "GR00094-A-0",
    genes: [
      "TP53"
    ]
  },
  {
    name: "GR00240-S-1",
    genes: [
      "TP53",
      "TP53I3",
      "TP53AIP1",
      "TP53INP1",
      "TP53BP1",
      "TP53BP2",
      "TP53I11",
      "TP53TG3",
      "TP53TG5",
      "TP53TG3C",
      "TP53TG3D",
      "TP53TG3B",
      "TP53I13",
      "TP53TG1",
      "TP53INP2",
      "TP53RK"
    ]
  }
]

var instance = new Compare({el: rootDiv, obj: {screens: screens, tree: exampleTree}});
instance.render();
