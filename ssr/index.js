'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./zmage.ssr.production.min.js');
} else {
    module.exports = require('./zmage.ssr.development.js');
}
