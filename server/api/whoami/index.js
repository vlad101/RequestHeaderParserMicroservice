'use strict';

var express = require('express');
var controller = require('./whoami.controller');

var router = express.Router();

router.get('/', controller.getHeaderParser);

module.exports = router;
