'use strict';

hexo.extend.tag.register('unsplash', function(args, content) {
  var id = args[0];
  var username = args[1];
  var width = args.length > 2 ? args[2] : '800';
  var height = args.length > 3 ? args[3] : '600';
  var size = width + 'x' + height;

  var creditLink = 'https://unsplash.com/photos/' + id;
  var imageLink = 'https://source.unsplash.com/' + id + '/' + size;
  var altText = 'Photo by ' + username;

  return (
    '<div class="unsplash"><img src="' +
    imageLink +
    '" alt="' +
    altText +
    '" width=' +
    width +
    ' height=' +
    height +
    ' /><div class="unsplash-credit"><a href="' +
    creditLink +
    '">' +
    altText +
    '</a></div></div>'
  );
});
