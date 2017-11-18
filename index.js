'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./lib/zmage.production.min.js');
} else {
    module.exports = require('./lib/zmage.development.js');
}