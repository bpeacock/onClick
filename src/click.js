var $ = require('unopinionate').selector;

var $document   = $(document),
    bindings    = {};

var click = function(events) {
    click.bind(events);
};

/*** Configuration Options ***/
click.distanceLimit = 10;
click.timeLimit     = 140;

/*** Useful Properties ***/
click.isTouch = ('ontouchstart' in window) ||
                window.DocumentTouch &&
                document instanceof DocumentTouch;

/*** API ***/
click.bind = function(events) {
    $.each(events, function(selector, callback) {

        /*** Register Binding ***/
        if(typeof bindings[selector] != 'undefined') {
            click.unbind(selector); //Ensure no duplicates
        }
        
        bindings[selector] = callback;

        /*** Touch Support ***/
        if(click.isTouch) {
            $document.delegate(selector, 'touchstart', function(e) {
                var $this       = $(this),
                    startTime   = new Date().getTime(),
                    startPos    = click._getPos(e);

                $this.one('touchend', function(e) {
                    e.preventDefault(); //Prevents click event from firing
                    
                    var time        = new Date().getTime() - startTime,
                        endPos      = click._getPos(e),
                        distance    = Math.sqrt(
                            Math.pow(endPos.x - startPos.x, 2) +
                            Math.pow(endPos.y - startPos.y, 2)
                        );

                    if(time < click.timeLimit && distance < click.distanceLimit) {
                        //Find the correct callback
                        $.each(bindings, function(selector, callback) {
                            if($this.is(selector)) {
                                callback.apply(e.target, [e]);
                                return false;
                            }
                        });
                    }
                });
            });
        }

        /*** Mouse Support ***/
        $document.delegate(selector, 'click', callback);
    });
};

click.unbind = function(selector) {
    $document
        .undelegate(selector, 'touchstart')
        .undelegate(selector, 'click');

    delete bindings[selector];

    return click;
};

click.trigger = function(selector, e) {
    e = e || $.Event('click');

    if(typeof bindings[selector] != 'undefined') {
        bindings[selector](e);
    }
    else {
        console.error("No click events bound for selector '"+selector+"'.");
    }
};

/*** Internal (but useful) Methods ***/
click._getPos = function(e) {
    e = e.originalEvent;

    if (e.pageX || e.pageY) {
        return {
            x: e.pageX,
            y: e.pageY
        };
    }
    else if(e.changedTouches) {
        return {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };
    }
    else {
        return {
            x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
            y: e.clientY + document.body.scrollTop  + document.documentElement.scrollTop
        };
    }
};

module.exports = click;

