var fs = require('fs');
var esRegexp = require('escape-string-regexp');

var file = process.argv[2];
var destination = process.argv[3];

var str = fs.readFileSync(file, 'utf-8');
str = str.replace(/(\r\n|\n|\r)/gm,"");
str = str.replace(/(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/, '');
str = esRegexp(str);
str = 'module.exports=\'' + str + '\'';

fs.writeFileSync(destination, str, 'utf-8');
