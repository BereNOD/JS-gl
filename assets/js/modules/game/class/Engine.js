var Engine = function() {
  var self = this;
  var properties = {
    last: performance.now(),
    fps: 60,
    slomo: 1,
    dt: 0,
    now: null
  };
  properties.step = 1 / properties.fps;
  properties.slowStep = properties.slomo * properties.step;

  function frame() {
    properties.now = performance.now();
    properties.dt = properties.dt + Math.min(1, (properties.now - properties.last) / 1000);
    while(properties.dt > properties.slowStep) {
      properties.dt = properties.dt - properties.slowStep;
      update(properties.step);
    }
    properties.last = properties.now;

    render(properties.dt / properties.slomo * properties.fps);
    requestAnimationFrame(frame);
  }

  function update(step) {
    move_w.update(function(){properties.Y -= properties.moveSpeed;});
    move_a.update(function(){properties.X -= properties.moveSpeed;});
    move_s.update(function(){properties.Y += properties.moveSpeed;});
    move_d.update(function(){properties.X += properties.moveSpeed;});
    if (key_q.state) { properties.angle -= properties.rotateSpeed; if ( 0 === properties.angle ) { properties.angle = 360; } }
    if (key_e.state) { properties.angle += properties.rotateSpeed; if ( 360 === properties.angle ) { properties.angle = 0; } }
  };


  function render(step) {
    target.style.top = properties.Y + 'px';
    target.style.left = properties.X + 'px';
    target.style.transform = 'rotate(' + properties.angle + 'deg)';
  };

  this.start = function() {
    requestAnimationFrame(frame);
    DEBUG && console.log('[Engine] Started.');
  };

  this.set = function (key, value) {
    properties[key] = value;
  };
  //
  // this.get = function (key) {
  //   return properties[key];
  // };

  return this;
}
