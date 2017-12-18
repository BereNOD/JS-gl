var inputState = {
  UP: false,
  DOWN: false,
  LEFT: false,
  RIGHT: false,
  reverse_ROTATE: false
};

var posX = 0;
var posX = 0;
var posY = 0;
var posY = 0;
var angle = 0;

var last = performance.now(),
    fps = 60,
    slomo = 1, // slow motion multiplier
    step = 1 / fps,
    slowStep = slomo * step,
    dt = 0,
    now;

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


var update = function (step) {
  if (inputState.LEFT) {
    if ( 0 < Number(target.style.left.slice(0, target.style.left.indexOf('px'))) ) {
      posX -= 10;;
    }
  }
  if (inputState.RIGHT) {
    if ( innerWidth > (Number(target.style.left.slice(0, target.style.left.indexOf('px'))) - target.clientWidth) ) {
      posX += 10;;
    }
  }
  if (inputState.UP) {
    if ( 0 < Number(target.style.top.slice(0, target.style.top.indexOf('px'))) ) {
      posY -= 10;;
    }
  }
  if (inputState.DOWN) {
    if ( innerHeight > (Number(target.style.top.slice(0, target.style.top.indexOf('px'))) - target.clientHeight) ) {
      posY += 10;;
    }
  }
  if (inputState.reverse_ROTATE) {
    if ( 0 === angle ) { angle = 360; }
    angle -= 2;
  }
  if (inputState.ROTATE) {
    if ( 360 === angle ) { angle = 0; }
    angle += 2;
  }
};


var render = function (step) {
  target.style.top = posY + 'px';
  target.style.left = posX + 'px';
  target.style.transform = 'rotate(' + angle + 'deg)';
};

$('body').on('keydown', function ( e ){
  if ( 87 === e.originalEvent.keyCode ) inputState.UP = true;
  if ( 83 === e.originalEvent.keyCode ) inputState.DOWN = true;
  if ( 65 === e.originalEvent.keyCode ) inputState.LEFT = true;
  if ( 68 === e.originalEvent.keyCode ) inputState.RIGHT = true;
  if ( 69 === e.originalEvent.keyCode ) inputState.ROTATE = true;
  if ( 81 === e.originalEvent.keyCode ) inputState.reverse_ROTATE = true;
});

$('body').on('keyup', function ( e ){
  if ( 87 === e.originalEvent.keyCode ) inputState.UP = false;
  if ( 83 === e.originalEvent.keyCode ) inputState.DOWN = false;
  if ( 65 === e.originalEvent.keyCode ) inputState.LEFT = false;
  if ( 68 === e.originalEvent.keyCode ) inputState.RIGHT = false;
  if ( 69 === e.originalEvent.keyCode ) inputState.ROTATE = false;
  if ( 81 === e.originalEvent.keyCode ) inputState.reverse_ROTATE = false;
});