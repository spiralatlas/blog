'use strict';

var Canvas = require("canvas-prebuilt");
var cloud = require("d3-cloud");
var d3 = require("d3");

var layout = cloud()
  .size([600, 400])
  .canvas(function() { return new Canvas(1, 1); })
  .rotate(function() { return (~~(Math.random() * 5) - 2) * 30 })
  .font("Impact")
  .fontSize(function(d) { return d.size; });

var fill = d3.schemeCategory10;

hexo.extend.helper.register("d3cloudtag", function(tags) {
  if (!tags || !tags.length) return '';

  var result = [];

  var words = tags.map(function(tag) {
    return {
      'name': tag.name,
      'num': tag.length,
      'size': 0,
      'color': ~~(Math.random() * fill.length)
    };
  });

  var maxsize = 1;
  words.forEach(function(tag) {
    var length = tag.num;
    if(length > maxsize)
      maxsize = length;
  });

  words.forEach(function(tag) {
    tag.size = Math.log(tag.num)/(Math.log(maxsize)-Math.log(1)) * 40 + 20;
  });

  layout.words(words);
  layout.start();

  result.push('<svg width="600" height="400"><g transform="translate(300,200)">');
  words.forEach(function(word,i) {
    var color = 0;
    result.push(
      '<a href="' + word.name + '">' +
      '<text text-anchor="middle" fill="'+fill[word.color]+'" transform="translate('+word.x+','+word.y+')rotate('+
        word.rotate+')" style="font-size:'+word.size+'px;font-family:Impact">'+
        word.name+
      '</text>' +
      '</a>'
    );
  });
  result.push('</g></svg>');

  return result.join('');
});
