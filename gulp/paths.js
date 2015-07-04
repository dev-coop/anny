var path = require('path');

var ROOT = path.dirname(__dirname);

var paths = {
  root: ROOT,
  src: ROOT + '/src',
  dist: ROOT + '/dist',
  anny: ROOT + '/src/lib/anny'
};

module.exports = paths;
