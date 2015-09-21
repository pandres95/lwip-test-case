/* jshint node: true, laxcomma: true, unused: true, undef: true */
'use strict';

var Q       = require('q')
,   fs      = require('fs')
,   _       = require('underscore')
,   lwip    = require('lwip');

Q.denodeify(fs.readFile)('input/task.png').then(function (buffer) {
    return Q.nbind(lwip.open, lwip)(buffer, 'png');
}).then(function (image) {
    var width  = image.getWidth()
    ,   height = image.getHeight();

    var pixelsArray = [];
    for(var x = 0; x < width; x++){
        for(var y = 0; y < height; y++){
            pixelsArray(image.getPixel(x, y));
        }
    }

    var nonTransparent = _.filter(pixelsArray, function (pixel) {
        return (
            pixel.r !== 0 && pixel.g !== 0 && pixel.b !== 0 && pixel.a !== 0
        );
    });

    console.log(nonTransparent);

}).catch(function (err) {
    console.error(err);
});
