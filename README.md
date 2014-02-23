onClick.js
==========

A click controller for mouse & touch.

Installation:
-----------

```bash
npm install
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
})
```

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
 