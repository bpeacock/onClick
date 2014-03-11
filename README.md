onClick.js [![Build Status](https://travis-ci.org/bpeacock/onClick.png?branch=master)](https://travis-ci.org/bpeacock/onClick)
===============

A click controller for mouse & touch.

Installation
------------

```bash
npm install onclick
```

A jQuery-like selector library is required:
- jQuery 1.4.3+
- Zepto

Usage
-----

```javascript
onClick({
    '#element': function(e) {
        alert("I was clicked!");
    }
});

onClick('.myclass', function() {

});
```

[example](http://htmlpreview.github.io/?https://github.com/bpeacock/onClick/blob/master/examples/index.html)

Development
-----------

To Build:

```bash
grunt build
```

To Develop:

```bash
grunt watch
```

To Test:
 
```bash
npm test
```
 
