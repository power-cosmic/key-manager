/*jshint -W032 */
;
/*jshint +W032 */
(function(root, factory) {
  /* istanbul ignore next */
  if (typeof define === 'function') {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.KeyManager = factory();
  }
}(this, function() {
  var ActionManager = function(onPress) {
    this.keys = {};
    this.onPress = onPress;
  };

  ActionManager.prototype.isDown = function() {
    for (var key in this.keys) {
      if (this.keys[key]) {
        return true;
      }
    }
    return false;
  }

  ActionManager.prototype.addKey = function(key, isDown) {
    isDown = isDown || false;
    this.keys[key] = isDown;
  }

  ActionManager.prototype.removeKey = function(key) {
    delete this.keys[key];
  }

  ActionManager.prototype.keyDown = function(key) {
    this.keys[key] = true;
    if (this.onPress) {
      this.onPress();
    }
  };

  ActionManager.prototype.keyUp = function(key) {
    this.keys[key] = false;
  };


  var KeyManager = function() {
    this.actions = {};
    this.keymaps = {};

    var that = this;

    window.onkeydown = function(e) {
      that.keyDown(e.keyCode);
    };

    window.onkeyup = function(e) {
      that.keyUp(e.keyCode);
    }
  };

  KeyManager.prototype.registerAction = function(alias, onPress) {
    this.actions[alias] = new ActionManager(onPress)
  };

  KeyManager.prototype.unregisterAction = function(alias) {
    delete this.actions[alias];
  };

  KeyManager.prototype.registerKey = function(key, alias, isDown) {
    this.actions[alias].addKey(key, isDown);
    this.keymaps[key] = this.actions[alias];
  };


  KeyManager.prototype.unregisterKey = function(key, alias) {
    this.actions[alias].removeKey(key);
    delete this.keymaps[key];
  };

  KeyManager.prototype.keyDown = function(key) {
    if (this.keymaps[key]) {
      this.keymaps[key].keyDown(key);
    }
  };

  KeyManager.prototype.keyUp = function(key) {
    if (this.keymaps[key]) {
      this.keymaps[key].keyUp(key);
    }
  };

  KeyManager.prototype.isDown = function(alias) {
    return this.actions[alias].isDown();
  };

  return KeyManager;
}));
