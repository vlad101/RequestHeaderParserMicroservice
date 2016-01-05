/**
 * Whoami model events
 */

'use strict';

import {EventEmitter} from 'events';
var Whoami = require('./whoami.model');
var WhoamiEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WhoamiEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Whoami.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WhoamiEvents.emit(event + ':' + doc._id, doc);
    WhoamiEvents.emit(event, doc);
  }
}

export default WhoamiEvents;
