var DEBUG = true;
var first = true;
DEBUG && $('body').on('keyup', function ( e ){
  console.log('[key: ' + e.originalEvent.key + ']: ', e.originalEvent.keyCode);
});
var app = function () {
  // class Bind
  function Bind (key) {
    var _this = this;

    _state = false;
    _key = key;
    _binds = {};

    this.set = function (event, callback) {
      _binds[event] = callback;

      $('body').on(event, function ( e ){
        if ( Number(_key) === Number(e.originalEvent.keyCode) ) {
          callback();
        }
      }.bind(_this));
    };

    this.state = function () {
      return _state;
    };

    this.setState = function (state) {
      _state = state;
      console.log('this', this);
    };
  }
  // /Bind

  // class Move
  function Move(speed, title, key, callback, wall = false) {
    var _this = this;
    var _speed = speed || 5;
    var _title = title || 'unknown';
    var _key = key || null;
    var _moveFunction = callback || null;
    var _wall = wall || function() { return true; };

    this.go = function() {
      if ( _key.state() && _wall() ) {
        _moveFunction();
      }
    }
  }
  // function Move(props = {}) {
  //   var _this = this;
  //   var _props = {
  //     speed: 5, // movespeed
  //     title: 'unknown', // title
  //     key: null, // [Bind] object
  //     wall: function() { return true; }, // callback function for set divide
  //     moveFunction: null,
  //   };
  //
  //   for (key in _props) if ( undefined === props[key] ) { props[key] = _props[key]; }
  //
  //   this.go = function () {
  //     if ( props.key.state() && props.wall() ) {
  //       props.moveFunction();
  //     }
  //     first = false;
  //     return this;
  //   }
  //   this.toString = function () {
  //     return _props.title;
  //   }
  //   return this;
  // }
  // /Move

  var key_w = new Bind('87');
  var key_s = new Bind('83');
  var key_a = new Bind('65');
  var key_d = new Bind('68');
  var key_q = new Bind('81');
  var key_e = new Bind('69');

  key_w.set('keydown', function() { this.setState(true); }.bind(key_w));
  key_w.set('keyup', function() { this.setState(false); }.bind(key_w));

  key_s.set('keydown', function() { this.setState(true); }.bind(key_s));
  key_s.set('keyup', function() { this.setState(false); }.bind(key_s));

  key_a.set('keydown', function() { this.setState(true); }.bind(key_a));
  key_a.set('keyup', function() { this.setState(false); }.bind(key_a));

  key_d.set('keydown', function() { this.setState(true); }.bind(key_d));
  key_d.set('keyup', function() { this.setState(false); }.bind(key_d));

  key_q.set('keydown', function() { this.setState(true); }.bind(key_q));
  key_q.set('keyup', function() { this.setState(false); }.bind(key_q));

  key_e.set('keydown', function() { this.setState(true); }.bind(key_e));
  key_e.set('keyup', function() { this.setState(false); }.bind(key_e));

  var wall = {
    top: function () {
      return 0 < Number(target.style.top.slice(0, target.style.top.indexOf('px')))
    },
    bottom: function () {
      return innerHeight > (Number(target.style.top.slice(0, target.style.top.indexOf('px'))) + Number(getComputedStyle(target).height.slice(0, getComputedStyle(target).height.indexOf('px'))))
    },
    left: function () {
      return 0 < Number(target.style.left.slice(0, target.style.left.indexOf('px')))
    },
    right: function () {
      return innerWidth > (Number(target.style.left.slice(0, target.style.left.indexOf('px'))) + Number(getComputedStyle(target).height.slice(0, getComputedStyle(target).height.indexOf('px'))))
    }
  }

  var posX = 0;
  var posX = 0;
  var posY = 0;
  var posY = 0;
  var angle = 0;
  var last = performance.now();
  var fps = 60;
  var slomo = 1;
  var step = 1 / fps;
  var slowStep = slomo * step;
  var dt = 0;
  var now;
  var moveSpeed = 2.3;
  var rotateSpeed = 1.2;

  var frame = function() {
    now = performance.now();
    dt = dt + Math.min(1, (now - last) / 1000);
    while(dt > slowStep) {
      dt = dt - slowStep;
      update(step);
    }
    last = now;

    render(dt / slomo * fps);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
// function Move(speed, title, key, callback, wall = false) {
  var move_w = new Move(false, 'W', key_w, function(){posY -= moveSpeed;console.log('[KEY]','W')});
  var move_a = new Move(false, 'A', key_a, function(){posX -= moveSpeed;console.log('[KEY]','A')});
  var move_s = new Move(false, 'S', key_s, function(){posY += moveSpeed;console.log('[KEY]','S')});
  var move_d = new Move(false, 'D', key_d, function(){posX += moveSpeed;console.log('[KEY]','D')});

  var update = function (step) {
    move_w.go();
    move_a.go();
    move_s.go();
    move_d.go();
    if (key_q.state) { angle -= rotateSpeed; if ( 0 === angle ) { angle = 360; } }
    if (key_e.state) { angle += rotateSpeed; if ( 360 === angle ) { angle = 0; } }
  };


  var render = function (step) {
    target.style.top = posY + 'px';
    target.style.left = posX + 'px';
    target.style.transform = 'rotate(' + angle + 'deg)';
  };
}
app();
