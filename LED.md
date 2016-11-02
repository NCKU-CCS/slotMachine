## LED

This document is to show how to use only `LED` part to your project.

### Usage

- [led.hbs(html)](./layout/partial/led.hbs)
- [led.scss](./sass/_led.scss)
- [led.js](./js/led.js)

First, insert LED's html, like `led.hbs` to your html, then import `_led.scss` to your scss. Finally include `led.js` before your main js file, and call the LED function in your js:

```javascript
LED
  .create('.led', 'Who  is  the  Lucky  Guy', 120, 0)
  .show();
```
