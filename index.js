'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/zmage.production.min.js');
} else {
    module.exports = require('./dist/zmage.development.js');
}