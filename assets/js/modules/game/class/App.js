var App = function (title = 'Unknown') {
  var self = this;
  this.title = title;

  window.DEBUG = false;

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



  this.run = function ( debug = false ) {
    window.DEBUG = debug;
    (new Engine()).start();
    this.DEBUG && console.log('[App] Debug mode enabled.');
    console.log('[App] Run', this.title + '.');
    return this;
  }.bind(this);

  return this;
}
