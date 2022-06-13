(function() {
    'use strict';

    var exports = {};

    exports.url = function(url, cb) {
        fetch(url)
            .then(function(res) {
                if (res.ok) {
                    return res.blob();
                } else {
                    throw new Error("Load error");
                }
            })
            .then(function(blob) {
                var image = new Image();
                image.onload = function() {
                    return cb(null, image.src);
                }
                image.onerror = function() {
                    return cb(new Error("Load error"));
                }
                image.src = URL.createObjectURL(blob);
            })
            .catch(function(err) {
                return cb(err);
            })
    }

    exports.file = function(file, cb) {
        var image = new Image();
        image.onload = function() {
            return cb(null, image.src);
        }
        image.onerror = function() {
            return cb(new Error("Load error"));
        }
        image.src = URL.createObjectURL(file);
    }

    if (typeof(window.imagePreloader) === "undefined") {
        window.imagePreloader = exports;
    }
})();