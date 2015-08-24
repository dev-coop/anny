var ACTIVATION = require('../lib/Activation');

describe('ACTIVATION', function() {
  it('contains only function properties', function() {
    _.each(ACTIVATION, function(fn) {
      fn.should.be.a('function');
    });
  });

  it('has no anonymous functions', function() {
    _.each(ACTIVATION, function(fn, name) {
      fn.name.should.equal(name);
    });
  });

  it('has methods that return numbers', function() {
    _.each(ACTIVATION, function(fn) {
      fn(_.random(-1, 1, true)).should.be.a('number');
    });
  });

  it('includes a derivative for every function', function() {
    _.each(ACTIVATION, function(fn, name) {
      if (!_.contains(name, 'Derivative')) {
        ACTIVATION[name + 'Derivative'].should.be.a('function');
      }
    });
  });

  it('includes a function for every derivative ', function() {
    _.each(ACTIVATION, function(fn, name) {
      if (_.contains(name, 'Derivative')) {
        ACTIVATION[name.replace('Derivative', '')].should.be.a('function');
      }
    });
  });

  describe('rectifier', function() {
    it('returns 0 if x is <= 0', function() {
      ACTIVATION.rectifier(-_.random(100, true)).should.equal(0);
      ACTIVATION.rectifier(0).should.equal(0);
    });

    it('returns x if x is > 0', function() {
      var x = _.random(100);
      ACTIVATION.rectifier(x).should.equal(x);
    });
  });

  describe('softplus', function() {
    it('returns 0 if x is very negative', function() {
      ACTIVATION.softplus(-37).should.equal(0);
    });

    it('returns approx of x if x is greater than 0', function() {
      var x = _.random(100, true);
      ACTIVATION.softplus(x).should.be.gte(x);
    });
  });

  describe('identity', function() {
    it('returns x', function() {
      var x = _.random(-1, 1, true);
      ACTIVATION.identity(x).should.equal(x);
    });
  });
});