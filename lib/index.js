'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./zmage.production.min.js');
} else {
    module.exports = require('./zmage.development.js');
}