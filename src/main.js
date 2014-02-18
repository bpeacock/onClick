var $ = require('jquery'),
    _ = require('underscore');

var $document   = $(document),
    events      = {};

var getPos = function(e) {
    if (e.pageX || e.pageY) {
        return {
            x: e.pageX,
            y: e.pageY
        };
    }
    else {
        return {
            x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
            y: e.clientY + document.body.scrollTop  + document.documentElement.scrollTop
        };
    }
};

var click = function(events) {
    var self = this;

    _.each(events, function(callback, selector) {
        if(isTouch) {
            $document.on('touchstart', selector, function(e) {
                var startTarget = e.target,
                    startTime   = new date().getTime(),
                    startPos    = getPos(e);

                $document.one('touchend', selector, function(e) {
                    e.preventDefault(); //Prevents click event from firing

                    var time        = new date().getTime() - startTime,
                        endPos      = getPos(e),
                        distance    = Math.sqrt(
                            Math.pow(endPos.x - startPos.x, 2) +
                            Math.pow(endPos.y - startPos.y, 2)
                        );

                    if(time < self.timeLimit && distance < self.distanceLimit && startTarget === e.target) {
                        callback(e);
                    }
                });
            });
        }

        $document.on('click', selector, callback);
    });
};

/*** Configuration Options ***/
click.distanceLimit = 10;
click.timeLimit     = 150;

/*** Useful Properties ***/
click.isTouch = ('ontouchstart' in window) ||
                window.DocumentTouch && document instanceof DocumentTouch;

module.exports = click;

