# key-manager

A small library to handle keyboard input

## Actions
Actions are allow multiple keys to be mapped to one functionality.
If a callback function is called when registering an action,
any time one of the keys bound to the action are pressed, the callback
function will be called.

## Keys
Zero or more keys may be mapped to an action.
To check if one of the keys associated with an action are pressed,
pass the action identifier to `isDown`.

## Examples

### Check if a key is down

Create keyManager and a functionality called 'left'
```javascript
this.keyManager = new KeyManager();
this.keyManager.registerAction('left');
```

Set both `left-arrow` and `a` to map to 'left'
```javascript
// map both `a` and `left-arrow`
this.keyManager.registerKey(37, 'left');
this.keyManager.registerKey(65, 'left');
```

if one of the left buttons is down, log it
```javascript
if(this.keyManager.isDown(LEFT)) {
  console.log('Left is down!');
}
```

### Fire a missile when a button is pressed

```javascript
this.keyManager.registerAction('space', function() {
  console.log('bang!');
});

this.keyManager.registerKey(32, 'space');
```
