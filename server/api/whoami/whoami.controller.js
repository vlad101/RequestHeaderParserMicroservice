/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/whoami              ->  getHeaderParser
 */

'use strict';

// Get the IP address, language and operating system for user browser.
// Request: http://localhost:9000/api/whoami
// Response: { "ipaddress": "24.103.245.182", "language": "en-US", "software": "Windows NT 6.3; WOW64" }
export function getHeaderParser(req, res) {
  var data = {};
  data.ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // on localhost > 127.0.0.1
  data.language = req.headers['accept-language'].split(',')[0];
  data.software = /\(([^)]+)\)/.exec(req.headers['user-agent'])[0].replace(/[{()}]/g, '');
  return res.json(data);
}