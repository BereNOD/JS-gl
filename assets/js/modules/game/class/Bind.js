var Bind = function(key) {
  var self = this;

  this.state = false;
  this.key = key;
  this.binds = {};

  this.set = function (event, callback) {
    this.binds[event] = callback;

    $('body').on(event, function ( e ){
      if ( Number(this.key) === Number(e.originalEvent.keyCode) ) {
        callback();
        DEBUG && console.log('[Bind] press on key:', this.key);
      }
    }.bind(self));
    DEBUG && console.log('[Bind] method set used.');
  };
  DEBUG && console.log('[Bind] object has been created.');
}

var key_w = new Bind('87');
var key_s = new Bind('83');
var key_a = new Bind('65');
var key_d = new Bind('68');
var key_q = new Bind('81');
var key_e = new Bind('69');

// W
key_w.set('keydown',  function() { this.state = true; }.bind(key_w));
key_w.set('keyup',    function() { this.state = false; }.bind(key_w));

// S
key_s.set('keydown',  function() { this.state = true; }.bind(key_s));
key_s.set('keyup',    function() { this.state = false; }.bind(key_s));

// A
key_a.set('keydown',  function() { this.state = true; }.bind(key_a));
key_a.set('keyup',    function() { this.state = false; }.bind(key_a));

// D
key_d.set('keydown',  function() { this.state = true; }.bind(key_d));
key_d.set('keyup',    function() { this.state = false; }.bind(key_d));

// Q
key_q.set('keydown',  function() { this.state = true; }.bind(key_q));
key_q.set('keyup',    function() { this.state = false; }.bind(key_q));

// E
key_e.set('keydown',  function() { this.state = true; }.bind(key_e));
key_e.set('keyup',    function() { this.state = false; }.bind(key_e));
