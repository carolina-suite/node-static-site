
# Replacements #

If you want to alter the text of your rendered MD files (which is rendered
by `marked`), you can supply a `replacements.js` file in the root of your
particular project directory.

Example:

```js
module.exports = function(text) {
  return text.replace(/\<table\>/g, '<table class="table">');
}
```
