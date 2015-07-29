var INITIALIZE = require('./Initialize');
var Neuron = require('./Neuron');

/**
 * Creates a single dimension Layer of Neurons.
 * @param {string} numNeurons -
 * @constructor
 */
function Layer(numNeurons) {
  // TODO: support convolution networks which use grid layers

  var self = this;
  self.neurons = [];

  // add neurons
  _.times(numNeurons, function() {
    self.neurons.push(new Neuron());
  });
}

/**
 * Connects every Neuron in this Layer to each Neuron in the `target` Layer.
 * @param {Layer} targetLayer - The Layer to connect to.
 */
Layer.prototype.connect = function(targetLayer) {
  var self = this;

  _.each(self.neurons, function(source) {
    // every neuron in this layer is connected to each neuron in the next.
    // we can assume the numConnections to be the num of neurons in this layer.

    var numConnections = self.neurons.length;

    // connect to each neuron in this layer
    _.each(targetLayer.neurons, function(target) {
      var weight = INITIALIZE.weight(numConnections);
      source.connect(target, weight);
    });
  });
};

/**
 * Activates all the Neurons in this Layer with the given array of values.
 * @param {number[]} [values] - Map of input values for each Neuron.
 * @returns {number[]} - Array of Neuron output values.
 */
Layer.prototype.activate = function(values) {
  return _.map(this.neurons, function(neuron, i) {
    return neuron.activate(values ? values[i] : undefined);
  });
};

/**
 * Correct the `errors` the Neurons.
 * @param {number[]} [errors] - Map of errors values for each Neuron.
 */
Layer.prototype.correct = function(errors) {
  _.each(this.neurons, function(neuron, i) {
    neuron.correct(errors ? errors[i] : undefined);
  });
};

module.exports = Layer;