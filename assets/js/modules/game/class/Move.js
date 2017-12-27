var Move = function (props = {}) {
  var self = this;
  this.properties = {
    key: false
  }
  for (key in props) { this.properties[key] = props[key]; }

  this.update = function(callback) {
    if ( this.properties && this.properties.key ) {
      'function' === typeof callback && callback();
    }
  }.bind(this);

  this.set = function ( key, value ) {
    this.properties[key] = value;
  }.bind(this);

  this.get = function ( key ) {
    return this.properties[key];
  }.bind(this);
}

var move_w = new Move({key: key_w});
var move_a = new Move({key: key_a});
var move_s = new Move({key: key_s});
var move_d = new Move({key: key_d});
var move_q = new Move({key: key_q});
var move_e = new Move({key: key_e});
