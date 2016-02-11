// if you don't specify a html file, the sniper will generate a div with id "rootDiv"
var Compare = require('grnai-vis-compare');

var instance = new Compare({
  el: rootDiv,
  data: null
});

instance.loadDependencies(function(){
  instance.render();
});
// instance.render();
