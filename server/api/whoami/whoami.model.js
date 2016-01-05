'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var WhoamiSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Whoami', WhoamiSchema);
