(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["react-zmage"] = factory(require("react"), require("prop-types"), require("react-dom"));
	else
		root["react-zmage"] = factory(root["react"], root["prop-types"], root["react-dom"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react_dom__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Background/index.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".backgroundLayer__2zBDq {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  cursor: -webkit-zoom-out;\n  cursor: zoom-out;\n  background-color: white;\n}\n", ""]);

// exports
exports.locals = {
	"backgroundLayer": "backgroundLayer__2zBDq"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Control/index.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".controls__2sOYg {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: absolute;\n  padding: 20px;\n  top: 0;\n  right: 0;\n  z-index: 90;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.zoomButton__3EA_v {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 7px;\n  width: 26px;\n  height: 26px;\n  cursor: pointer;\n  border: 1px solid black;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n}\n.zoomButton__3EA_v:hover {\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.zoomButton__3EA_v:active {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.closeButton__1hkr- {\n  width: 40px;\n  height: 40px;\n  cursor: pointer;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n}\n.closeButton__1hkr- .crossLine__3lngH {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 35px;\n  height: 1px;\n  background-color: black;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n}\n.closeButton__1hkr-:hover {\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.closeButton__1hkr-:active {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.switchButton__11WN0 {\n  position: absolute;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  z-index: 110;\n  cursor: pointer;\n  background-color: black;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  -webkit-transform-origin: 50% 0;\n          transform-origin: 50% 0;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n.switchButton__11WN0 svg {\n  fill: white;\n}\n.switchButton__11WN0:hover {\n  -webkit-transform: scale(1.1) translateY(-50%);\n          transform: scale(1.1) translateY(-50%);\n}\n.switchButton__11WN0:active {\n  -webkit-transform: scale(1) translateY(-50%);\n          transform: scale(1) translateY(-50%);\n}\n.pages__1SqZ9 {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 6px 14px;\n  position: absolute;\n  left: 50%;\n  color: white;\n  font-size: 14px;\n  font-weight: bold;\n  z-index: 110;\n  background-color: black;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n.imgAlt__1RLsW {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 20px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  color: black;\n  font-size: 18px;\n  z-index: 90;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n}\n.imgText__2quxO {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 12px 20px;\n  position: absolute;\n  left: 0;\n  top: 230%;\n  color: white;\n  font-size: 16px;\n  z-index: 90;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: black;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n", ""]);

// exports
exports.locals = {
	"controls": "controls__2sOYg",
	"zoomButton": "zoomButton__3EA_v",
	"closeButton": "closeButton__1hkr-",
	"crossLine": "crossLine__3lngH",
	"switchButton": "switchButton__11WN0",
	"pages": "pages__1SqZ9",
	"imgAlt": "imgAlt__1RLsW",
	"imgText": "imgText__2quxO"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Image/index.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".imageLayer__1CUlw {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transition: -webkit-box-shadow 0.3s;\n  transition: -webkit-box-shadow 0.3s;\n  transition: box-shadow 0.3s;\n  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;\n}\n.loading__2ybtF {\n  display: inline-block;\n  z-index: 80;\n  width: 20px;\n  height: 20px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  -webkit-animation: rotate__DHJPZ 1.2s infinite linear;\n          animation: rotate__DHJPZ 1.2s infinite linear;\n}\n.loading__2ybtF i {\n  width: 9px;\n  height: 9px;\n  border-radius: 100%;\n  background-color: #108ee9;\n  -webkit-transform: scale(0.75);\n          transform: scale(0.75);\n  display: block;\n  position: absolute;\n  opacity: .3;\n  -webkit-animation: spinMove__2iL7L 1s infinite linear alternate;\n          animation: spinMove__2iL7L 1s infinite linear alternate;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n}\n.loading__2ybtF :first-child {\n  left: 0;\n  top: 0;\n}\n.loading__2ybtF :nth-child(2) {\n  right: 0;\n  top: 0;\n  -webkit-animation-delay: 0.4s;\n          animation-delay: 0.4s;\n}\n.loading__2ybtF :nth-child(3) {\n  right: 0;\n  bottom: 0;\n  -webkit-animation-delay: 0.8s;\n          animation-delay: 0.8s;\n}\n.loading__2ybtF :nth-child(4) {\n  left: 0;\n  bottom: 0;\n  -webkit-animation-delay: 1.2s;\n          animation-delay: 1.2s;\n}\n@-webkit-keyframes rotate__DHJPZ {\n  to {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg);\n  }\n}\n@keyframes rotate__DHJPZ {\n  to {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg);\n  }\n}\n@-webkit-keyframes spinMove__2iL7L {\n  to {\n    opacity: 1;\n  }\n}\n@keyframes spinMove__2iL7L {\n  to {\n    opacity: 1;\n  }\n}\n", ""]);

// exports
exports.locals = {
	"imageLayer": "imageLayer__1CUlw",
	"loading": "loading__2ybtF",
	"rotate": "rotate__DHJPZ",
	"spinMove": "spinMove__2iL7L"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Position/index.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".positionLayer__18_Gk {\n  width: 100%;\n  height: 100vh;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.positionLayer__18_Gk > div {\n  position: absolute;\n  left: 50%;\n  width: 0;\n  height: 0;\n  z-index: 100;\n}\n", ""]);

// exports
exports.locals = {
	"positionLayer": "positionLayer__18_Gk"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Wrapper/index.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".wrapperLayer__12HA6 {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n", ""]);

// exports
exports.locals = {
	"wrapperLayer": "wrapperLayer__12HA6"
};

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/performance-now/lib/performance-now.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/node-libs-browser/node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/raf/index.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__("./node_modules/raf/node_modules/performance-now/lib/performance-now.js")
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/raf/node_modules/performance-now/lib/performance-now.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/node-libs-browser/node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/react-motion/lib/Motion.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mapToZero = __webpack_require__("./node_modules/react-motion/lib/mapToZero.js");

var _mapToZero2 = _interopRequireDefault(_mapToZero);

var _stripStyle = __webpack_require__("./node_modules/react-motion/lib/stripStyle.js");

var _stripStyle2 = _interopRequireDefault(_stripStyle);

var _stepper3 = __webpack_require__("./node_modules/react-motion/lib/stepper.js");

var _stepper4 = _interopRequireDefault(_stepper3);

var _performanceNow = __webpack_require__("./node_modules/performance-now/lib/performance-now.js");

var _performanceNow2 = _interopRequireDefault(_performanceNow);

var _raf = __webpack_require__("./node_modules/raf/index.js");

var _raf2 = _interopRequireDefault(_raf);

var _shouldStopAnimation = __webpack_require__("./node_modules/react-motion/lib/shouldStopAnimation.js");

var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var msPerFrame = 1000 / 60;

var Motion = (function (_React$Component) {
  _inherits(Motion, _React$Component);

  _createClass(Motion, null, [{
    key: 'propTypes',
    value: {
      // TOOD: warn against putting a config in here
      defaultStyle: _propTypes2['default'].objectOf(_propTypes2['default'].number),
      style: _propTypes2['default'].objectOf(_propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].object])).isRequired,
      children: _propTypes2['default'].func.isRequired,
      onRest: _propTypes2['default'].func
    },
    enumerable: true
  }]);

  function Motion(props) {
    var _this = this;

    _classCallCheck(this, Motion);

    _React$Component.call(this, props);
    this.wasAnimating = false;
    this.animationID = null;
    this.prevTime = 0;
    this.accumulatedTime = 0;
    this.unreadPropStyle = null;

    this.clearUnreadPropStyle = function (destStyle) {
      var dirty = false;
      var _state = _this.state;
      var currentStyle = _state.currentStyle;
      var currentVelocity = _state.currentVelocity;
      var lastIdealStyle = _state.lastIdealStyle;
      var lastIdealVelocity = _state.lastIdealVelocity;

      for (var key in destStyle) {
        if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
          continue;
        }

        var styleValue = destStyle[key];
        if (typeof styleValue === 'number') {
          if (!dirty) {
            dirty = true;
            currentStyle = _extends({}, currentStyle);
            currentVelocity = _extends({}, currentVelocity);
            lastIdealStyle = _extends({}, lastIdealStyle);
            lastIdealVelocity = _extends({}, lastIdealVelocity);
          }

          currentStyle[key] = styleValue;
          currentVelocity[key] = 0;
          lastIdealStyle[key] = styleValue;
          lastIdealVelocity[key] = 0;
        }
      }

      if (dirty) {
        _this.setState({ currentStyle: currentStyle, currentVelocity: currentVelocity, lastIdealStyle: lastIdealStyle, lastIdealVelocity: lastIdealVelocity });
      }
    };

    this.startAnimationIfNecessary = function () {
      // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
      // call cb? No, otherwise accidental parent rerender causes cb trigger
      _this.animationID = _raf2['default'](function (timestamp) {
        // check if we need to animate in the first place
        var propsStyle = _this.props.style;
        if (_shouldStopAnimation2['default'](_this.state.currentStyle, propsStyle, _this.state.currentVelocity)) {
          if (_this.wasAnimating && _this.props.onRest) {
            _this.props.onRest();
          }

          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.wasAnimating = false;
          _this.accumulatedTime = 0;
          return;
        }

        _this.wasAnimating = true;

        var currentTime = timestamp || _performanceNow2['default']();
        var timeDelta = currentTime - _this.prevTime;
        _this.prevTime = currentTime;
        _this.accumulatedTime = _this.accumulatedTime + timeDelta;
        // more than 10 frames? prolly switched browser tab. Restart
        if (_this.accumulatedTime > msPerFrame * 10) {
          _this.accumulatedTime = 0;
        }

        if (_this.accumulatedTime === 0) {
          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.startAnimationIfNecessary();
          return;
        }

        var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
        var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);

        var newLastIdealStyle = {};
        var newLastIdealVelocity = {};
        var newCurrentStyle = {};
        var newCurrentVelocity = {};

        for (var key in propsStyle) {
          if (!Object.prototype.hasOwnProperty.call(propsStyle, key)) {
            continue;
          }

          var styleValue = propsStyle[key];
          if (typeof styleValue === 'number') {
            newCurrentStyle[key] = styleValue;
            newCurrentVelocity[key] = 0;
            newLastIdealStyle[key] = styleValue;
            newLastIdealVelocity[key] = 0;
          } else {
            var newLastIdealStyleValue = _this.state.lastIdealStyle[key];
            var newLastIdealVelocityValue = _this.state.lastIdealVelocity[key];
            for (var i = 0; i < framesToCatchUp; i++) {
              var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

              newLastIdealStyleValue = _stepper[0];
              newLastIdealVelocityValue = _stepper[1];
            }

            var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

            var nextIdealX = _stepper2[0];
            var nextIdealV = _stepper2[1];

            newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
            newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
            newLastIdealStyle[key] = newLastIdealStyleValue;
            newLastIdealVelocity[key] = newLastIdealVelocityValue;
          }
        }

        _this.animationID = null;
        // the amount we're looped over above
        _this.accumulatedTime -= framesToCatchUp * msPerFrame;

        _this.setState({
          currentStyle: newCurrentStyle,
          currentVelocity: newCurrentVelocity,
          lastIdealStyle: newLastIdealStyle,
          lastIdealVelocity: newLastIdealVelocity
        });

        _this.unreadPropStyle = null;

        _this.startAnimationIfNecessary();
      });
    };

    this.state = this.defaultState();
  }

  Motion.prototype.defaultState = function defaultState() {
    var _props = this.props;
    var defaultStyle = _props.defaultStyle;
    var style = _props.style;

    var currentStyle = defaultStyle || _stripStyle2['default'](style);
    var currentVelocity = _mapToZero2['default'](currentStyle);
    return {
      currentStyle: currentStyle,
      currentVelocity: currentVelocity,
      lastIdealStyle: currentStyle,
      lastIdealVelocity: currentVelocity
    };
  };

  // it's possible that currentStyle's value is stale: if props is immediately
  // changed from 0 to 400 to spring(0) again, the async currentStyle is still
  // at 0 (didn't have time to tick and interpolate even once). If we naively
  // compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
  // In reality currentStyle should be 400

  Motion.prototype.componentDidMount = function componentDidMount() {
    this.prevTime = _performanceNow2['default']();
    this.startAnimationIfNecessary();
  };

  Motion.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (this.unreadPropStyle != null) {
      // previous props haven't had the chance to be set yet; set them here
      this.clearUnreadPropStyle(this.unreadPropStyle);
    }

    this.unreadPropStyle = props.style;
    if (this.animationID == null) {
      this.prevTime = _performanceNow2['default']();
      this.startAnimationIfNecessary();
    }
  };

  Motion.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.animationID != null) {
      _raf2['default'].cancel(this.animationID);
      this.animationID = null;
    }
  };

  Motion.prototype.render = function render() {
    var renderedChildren = this.props.children(this.state.currentStyle);
    return renderedChildren && _react2['default'].Children.only(renderedChildren);
  };

  return Motion;
})(_react2['default'].Component);

exports['default'] = Motion;
module.exports = exports['default'];

// after checking for unreadPropStyle != null, we manually go set the
// non-interpolating values (those that are a number, without a spring
// config)

/***/ }),

/***/ "./node_modules/react-motion/lib/StaggeredMotion.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mapToZero = __webpack_require__("./node_modules/react-motion/lib/mapToZero.js");

var _mapToZero2 = _interopRequireDefault(_mapToZero);

var _stripStyle = __webpack_require__("./node_modules/react-motion/lib/stripStyle.js");

var _stripStyle2 = _interopRequireDefault(_stripStyle);

var _stepper3 = __webpack_require__("./node_modules/react-motion/lib/stepper.js");

var _stepper4 = _interopRequireDefault(_stepper3);

var _performanceNow = __webpack_require__("./node_modules/performance-now/lib/performance-now.js");

var _performanceNow2 = _interopRequireDefault(_performanceNow);

var _raf = __webpack_require__("./node_modules/raf/index.js");

var _raf2 = _interopRequireDefault(_raf);

var _shouldStopAnimation = __webpack_require__("./node_modules/react-motion/lib/shouldStopAnimation.js");

var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var msPerFrame = 1000 / 60;

function shouldStopAnimationAll(currentStyles, styles, currentVelocities) {
  for (var i = 0; i < currentStyles.length; i++) {
    if (!_shouldStopAnimation2['default'](currentStyles[i], styles[i], currentVelocities[i])) {
      return false;
    }
  }
  return true;
}

var StaggeredMotion = (function (_React$Component) {
  _inherits(StaggeredMotion, _React$Component);

  _createClass(StaggeredMotion, null, [{
    key: 'propTypes',
    value: {
      // TOOD: warn against putting a config in here
      defaultStyles: _propTypes2['default'].arrayOf(_propTypes2['default'].objectOf(_propTypes2['default'].number)),
      styles: _propTypes2['default'].func.isRequired,
      children: _propTypes2['default'].func.isRequired
    },
    enumerable: true
  }]);

  function StaggeredMotion(props) {
    var _this = this;

    _classCallCheck(this, StaggeredMotion);

    _React$Component.call(this, props);
    this.animationID = null;
    this.prevTime = 0;
    this.accumulatedTime = 0;
    this.unreadPropStyles = null;

    this.clearUnreadPropStyle = function (unreadPropStyles) {
      var _state = _this.state;
      var currentStyles = _state.currentStyles;
      var currentVelocities = _state.currentVelocities;
      var lastIdealStyles = _state.lastIdealStyles;
      var lastIdealVelocities = _state.lastIdealVelocities;

      var someDirty = false;
      for (var i = 0; i < unreadPropStyles.length; i++) {
        var unreadPropStyle = unreadPropStyles[i];
        var dirty = false;

        for (var key in unreadPropStyle) {
          if (!Object.prototype.hasOwnProperty.call(unreadPropStyle, key)) {
            continue;
          }

          var styleValue = unreadPropStyle[key];
          if (typeof styleValue === 'number') {
            if (!dirty) {
              dirty = true;
              someDirty = true;
              currentStyles[i] = _extends({}, currentStyles[i]);
              currentVelocities[i] = _extends({}, currentVelocities[i]);
              lastIdealStyles[i] = _extends({}, lastIdealStyles[i]);
              lastIdealVelocities[i] = _extends({}, lastIdealVelocities[i]);
            }
            currentStyles[i][key] = styleValue;
            currentVelocities[i][key] = 0;
            lastIdealStyles[i][key] = styleValue;
            lastIdealVelocities[i][key] = 0;
          }
        }
      }

      if (someDirty) {
        _this.setState({ currentStyles: currentStyles, currentVelocities: currentVelocities, lastIdealStyles: lastIdealStyles, lastIdealVelocities: lastIdealVelocities });
      }
    };

    this.startAnimationIfNecessary = function () {
      // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
      // call cb? No, otherwise accidental parent rerender causes cb trigger
      _this.animationID = _raf2['default'](function (timestamp) {
        var destStyles = _this.props.styles(_this.state.lastIdealStyles);

        // check if we need to animate in the first place
        if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities)) {
          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.accumulatedTime = 0;
          return;
        }

        var currentTime = timestamp || _performanceNow2['default']();
        var timeDelta = currentTime - _this.prevTime;
        _this.prevTime = currentTime;
        _this.accumulatedTime = _this.accumulatedTime + timeDelta;
        // more than 10 frames? prolly switched browser tab. Restart
        if (_this.accumulatedTime > msPerFrame * 10) {
          _this.accumulatedTime = 0;
        }

        if (_this.accumulatedTime === 0) {
          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.startAnimationIfNecessary();
          return;
        }

        var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
        var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);

        var newLastIdealStyles = [];
        var newLastIdealVelocities = [];
        var newCurrentStyles = [];
        var newCurrentVelocities = [];

        for (var i = 0; i < destStyles.length; i++) {
          var destStyle = destStyles[i];
          var newCurrentStyle = {};
          var newCurrentVelocity = {};
          var newLastIdealStyle = {};
          var newLastIdealVelocity = {};

          for (var key in destStyle) {
            if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
              continue;
            }

            var styleValue = destStyle[key];
            if (typeof styleValue === 'number') {
              newCurrentStyle[key] = styleValue;
              newCurrentVelocity[key] = 0;
              newLastIdealStyle[key] = styleValue;
              newLastIdealVelocity[key] = 0;
            } else {
              var newLastIdealStyleValue = _this.state.lastIdealStyles[i][key];
              var newLastIdealVelocityValue = _this.state.lastIdealVelocities[i][key];
              for (var j = 0; j < framesToCatchUp; j++) {
                var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

                newLastIdealStyleValue = _stepper[0];
                newLastIdealVelocityValue = _stepper[1];
              }

              var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

              var nextIdealX = _stepper2[0];
              var nextIdealV = _stepper2[1];

              newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
              newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
              newLastIdealStyle[key] = newLastIdealStyleValue;
              newLastIdealVelocity[key] = newLastIdealVelocityValue;
            }
          }

          newCurrentStyles[i] = newCurrentStyle;
          newCurrentVelocities[i] = newCurrentVelocity;
          newLastIdealStyles[i] = newLastIdealStyle;
          newLastIdealVelocities[i] = newLastIdealVelocity;
        }

        _this.animationID = null;
        // the amount we're looped over above
        _this.accumulatedTime -= framesToCatchUp * msPerFrame;

        _this.setState({
          currentStyles: newCurrentStyles,
          currentVelocities: newCurrentVelocities,
          lastIdealStyles: newLastIdealStyles,
          lastIdealVelocities: newLastIdealVelocities
        });

        _this.unreadPropStyles = null;

        _this.startAnimationIfNecessary();
      });
    };

    this.state = this.defaultState();
  }

  StaggeredMotion.prototype.defaultState = function defaultState() {
    var _props = this.props;
    var defaultStyles = _props.defaultStyles;
    var styles = _props.styles;

    var currentStyles = defaultStyles || styles().map(_stripStyle2['default']);
    var currentVelocities = currentStyles.map(function (currentStyle) {
      return _mapToZero2['default'](currentStyle);
    });
    return {
      currentStyles: currentStyles,
      currentVelocities: currentVelocities,
      lastIdealStyles: currentStyles,
      lastIdealVelocities: currentVelocities
    };
  };

  StaggeredMotion.prototype.componentDidMount = function componentDidMount() {
    this.prevTime = _performanceNow2['default']();
    this.startAnimationIfNecessary();
  };

  StaggeredMotion.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (this.unreadPropStyles != null) {
      // previous props haven't had the chance to be set yet; set them here
      this.clearUnreadPropStyle(this.unreadPropStyles);
    }

    this.unreadPropStyles = props.styles(this.state.lastIdealStyles);
    if (this.animationID == null) {
      this.prevTime = _performanceNow2['default']();
      this.startAnimationIfNecessary();
    }
  };

  StaggeredMotion.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.animationID != null) {
      _raf2['default'].cancel(this.animationID);
      this.animationID = null;
    }
  };

  StaggeredMotion.prototype.render = function render() {
    var renderedChildren = this.props.children(this.state.currentStyles);
    return renderedChildren && _react2['default'].Children.only(renderedChildren);
  };

  return StaggeredMotion;
})(_react2['default'].Component);

exports['default'] = StaggeredMotion;
module.exports = exports['default'];

// it's possible that currentStyle's value is stale: if props is immediately
// changed from 0 to 400 to spring(0) again, the async currentStyle is still
// at 0 (didn't have time to tick and interpolate even once). If we naively
// compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
// In reality currentStyle should be 400

// after checking for unreadPropStyles != null, we manually go set the
// non-interpolating values (those that are a number, without a spring
// config)

/***/ }),

/***/ "./node_modules/react-motion/lib/TransitionMotion.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mapToZero = __webpack_require__("./node_modules/react-motion/lib/mapToZero.js");

var _mapToZero2 = _interopRequireDefault(_mapToZero);

var _stripStyle = __webpack_require__("./node_modules/react-motion/lib/stripStyle.js");

var _stripStyle2 = _interopRequireDefault(_stripStyle);

var _stepper3 = __webpack_require__("./node_modules/react-motion/lib/stepper.js");

var _stepper4 = _interopRequireDefault(_stepper3);

var _mergeDiff = __webpack_require__("./node_modules/react-motion/lib/mergeDiff.js");

var _mergeDiff2 = _interopRequireDefault(_mergeDiff);

var _performanceNow = __webpack_require__("./node_modules/performance-now/lib/performance-now.js");

var _performanceNow2 = _interopRequireDefault(_performanceNow);

var _raf = __webpack_require__("./node_modules/raf/index.js");

var _raf2 = _interopRequireDefault(_raf);

var _shouldStopAnimation = __webpack_require__("./node_modules/react-motion/lib/shouldStopAnimation.js");

var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var msPerFrame = 1000 / 60;

// the children function & (potential) styles function asks as param an
// Array<TransitionPlainStyle>, where each TransitionPlainStyle is of the format
// {key: string, data?: any, style: PlainStyle}. However, the way we keep
// internal states doesn't contain such a data structure (check the state and
// TransitionMotionState). So when children function and others ask for such
// data we need to generate them on the fly by combining mergedPropsStyles and
// currentStyles/lastIdealStyles
function rehydrateStyles(mergedPropsStyles, unreadPropStyles, plainStyles) {
  // Copy the value to a `const` so that Flow understands that the const won't
  // change and will be non-nullable in the callback below.
  var cUnreadPropStyles = unreadPropStyles;
  if (cUnreadPropStyles == null) {
    return mergedPropsStyles.map(function (mergedPropsStyle, i) {
      return {
        key: mergedPropsStyle.key,
        data: mergedPropsStyle.data,
        style: plainStyles[i]
      };
    });
  }
  return mergedPropsStyles.map(function (mergedPropsStyle, i) {
    for (var j = 0; j < cUnreadPropStyles.length; j++) {
      if (cUnreadPropStyles[j].key === mergedPropsStyle.key) {
        return {
          key: cUnreadPropStyles[j].key,
          data: cUnreadPropStyles[j].data,
          style: plainStyles[i]
        };
      }
    }
    return { key: mergedPropsStyle.key, data: mergedPropsStyle.data, style: plainStyles[i] };
  });
}

function shouldStopAnimationAll(currentStyles, destStyles, currentVelocities, mergedPropsStyles) {
  if (mergedPropsStyles.length !== destStyles.length) {
    return false;
  }

  for (var i = 0; i < mergedPropsStyles.length; i++) {
    if (mergedPropsStyles[i].key !== destStyles[i].key) {
      return false;
    }
  }

  // we have the invariant that mergedPropsStyles and
  // currentStyles/currentVelocities/last* are synced in terms of cells, see
  // mergeAndSync comment for more info
  for (var i = 0; i < mergedPropsStyles.length; i++) {
    if (!_shouldStopAnimation2['default'](currentStyles[i], destStyles[i].style, currentVelocities[i])) {
      return false;
    }
  }

  return true;
}

// core key merging logic

// things to do: say previously merged style is {a, b}, dest style (prop) is {b,
// c}, previous current (interpolating) style is {a, b}
// **invariant**: current[i] corresponds to merged[i] in terms of key

// steps:
// turn merged style into {a?, b, c}
//    add c, value of c is destStyles.c
//    maybe remove a, aka call willLeave(a), then merged is either {b, c} or {a, b, c}
// turn current (interpolating) style from {a, b} into {a?, b, c}
//    maybe remove a
//    certainly add c, value of c is willEnter(c)
// loop over merged and construct new current
// dest doesn't change, that's owner's
function mergeAndSync(willEnter, willLeave, didLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldLastIdealStyles, oldLastIdealVelocities) {
  var newMergedPropsStyles = _mergeDiff2['default'](oldMergedPropsStyles, destStyles, function (oldIndex, oldMergedPropsStyle) {
    var leavingStyle = willLeave(oldMergedPropsStyle);
    if (leavingStyle == null) {
      didLeave({ key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data });
      return null;
    }
    if (_shouldStopAnimation2['default'](oldCurrentStyles[oldIndex], leavingStyle, oldCurrentVelocities[oldIndex])) {
      didLeave({ key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data });
      return null;
    }
    return { key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data, style: leavingStyle };
  });

  var newCurrentStyles = [];
  var newCurrentVelocities = [];
  var newLastIdealStyles = [];
  var newLastIdealVelocities = [];
  for (var i = 0; i < newMergedPropsStyles.length; i++) {
    var newMergedPropsStyleCell = newMergedPropsStyles[i];
    var foundOldIndex = null;
    for (var j = 0; j < oldMergedPropsStyles.length; j++) {
      if (oldMergedPropsStyles[j].key === newMergedPropsStyleCell.key) {
        foundOldIndex = j;
        break;
      }
    }
    // TODO: key search code
    if (foundOldIndex == null) {
      var plainStyle = willEnter(newMergedPropsStyleCell);
      newCurrentStyles[i] = plainStyle;
      newLastIdealStyles[i] = plainStyle;

      var velocity = _mapToZero2['default'](newMergedPropsStyleCell.style);
      newCurrentVelocities[i] = velocity;
      newLastIdealVelocities[i] = velocity;
    } else {
      newCurrentStyles[i] = oldCurrentStyles[foundOldIndex];
      newLastIdealStyles[i] = oldLastIdealStyles[foundOldIndex];
      newCurrentVelocities[i] = oldCurrentVelocities[foundOldIndex];
      newLastIdealVelocities[i] = oldLastIdealVelocities[foundOldIndex];
    }
  }

  return [newMergedPropsStyles, newCurrentStyles, newCurrentVelocities, newLastIdealStyles, newLastIdealVelocities];
}

var TransitionMotion = (function (_React$Component) {
  _inherits(TransitionMotion, _React$Component);

  _createClass(TransitionMotion, null, [{
    key: 'propTypes',
    value: {
      defaultStyles: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
        key: _propTypes2['default'].string.isRequired,
        data: _propTypes2['default'].any,
        style: _propTypes2['default'].objectOf(_propTypes2['default'].number).isRequired
      })),
      styles: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
        key: _propTypes2['default'].string.isRequired,
        data: _propTypes2['default'].any,
        style: _propTypes2['default'].objectOf(_propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].object])).isRequired
      }))]).isRequired,
      children: _propTypes2['default'].func.isRequired,
      willEnter: _propTypes2['default'].func,
      willLeave: _propTypes2['default'].func,
      didLeave: _propTypes2['default'].func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      willEnter: function willEnter(styleThatEntered) {
        return _stripStyle2['default'](styleThatEntered.style);
      },
      // recall: returning null makes the current unmounting TransitionStyle
      // disappear immediately
      willLeave: function willLeave() {
        return null;
      },
      didLeave: function didLeave() {}
    },
    enumerable: true
  }]);

  function TransitionMotion(props) {
    var _this = this;

    _classCallCheck(this, TransitionMotion);

    _React$Component.call(this, props);
    this.unmounting = false;
    this.animationID = null;
    this.prevTime = 0;
    this.accumulatedTime = 0;
    this.unreadPropStyles = null;

    this.clearUnreadPropStyle = function (unreadPropStyles) {
      var _mergeAndSync = mergeAndSync(_this.props.willEnter, _this.props.willLeave, _this.props.didLeave, _this.state.mergedPropsStyles, unreadPropStyles, _this.state.currentStyles, _this.state.currentVelocities, _this.state.lastIdealStyles, _this.state.lastIdealVelocities);

      var mergedPropsStyles = _mergeAndSync[0];
      var currentStyles = _mergeAndSync[1];
      var currentVelocities = _mergeAndSync[2];
      var lastIdealStyles = _mergeAndSync[3];
      var lastIdealVelocities = _mergeAndSync[4];

      for (var i = 0; i < unreadPropStyles.length; i++) {
        var unreadPropStyle = unreadPropStyles[i].style;
        var dirty = false;

        for (var key in unreadPropStyle) {
          if (!Object.prototype.hasOwnProperty.call(unreadPropStyle, key)) {
            continue;
          }

          var styleValue = unreadPropStyle[key];
          if (typeof styleValue === 'number') {
            if (!dirty) {
              dirty = true;
              currentStyles[i] = _extends({}, currentStyles[i]);
              currentVelocities[i] = _extends({}, currentVelocities[i]);
              lastIdealStyles[i] = _extends({}, lastIdealStyles[i]);
              lastIdealVelocities[i] = _extends({}, lastIdealVelocities[i]);
              mergedPropsStyles[i] = {
                key: mergedPropsStyles[i].key,
                data: mergedPropsStyles[i].data,
                style: _extends({}, mergedPropsStyles[i].style)
              };
            }
            currentStyles[i][key] = styleValue;
            currentVelocities[i][key] = 0;
            lastIdealStyles[i][key] = styleValue;
            lastIdealVelocities[i][key] = 0;
            mergedPropsStyles[i].style[key] = styleValue;
          }
        }
      }

      // unlike the other 2 components, we can't detect staleness and optionally
      // opt out of setState here. each style object's data might contain new
      // stuff we're not/cannot compare
      _this.setState({
        currentStyles: currentStyles,
        currentVelocities: currentVelocities,
        mergedPropsStyles: mergedPropsStyles,
        lastIdealStyles: lastIdealStyles,
        lastIdealVelocities: lastIdealVelocities
      });
    };

    this.startAnimationIfNecessary = function () {
      if (_this.unmounting) {
        return;
      }

      // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
      // call cb? No, otherwise accidental parent rerender causes cb trigger
      _this.animationID = _raf2['default'](function (timestamp) {
        // https://github.com/chenglou/react-motion/pull/420
        // > if execution passes the conditional if (this.unmounting), then
        // executes async defaultRaf and after that component unmounts and after
        // that the callback of defaultRaf is called, then setState will be called
        // on unmounted component.
        if (_this.unmounting) {
          return;
        }

        var propStyles = _this.props.styles;
        var destStyles = typeof propStyles === 'function' ? propStyles(rehydrateStyles(_this.state.mergedPropsStyles, _this.unreadPropStyles, _this.state.lastIdealStyles)) : propStyles;

        // check if we need to animate in the first place
        if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities, _this.state.mergedPropsStyles)) {
          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.accumulatedTime = 0;
          return;
        }

        var currentTime = timestamp || _performanceNow2['default']();
        var timeDelta = currentTime - _this.prevTime;
        _this.prevTime = currentTime;
        _this.accumulatedTime = _this.accumulatedTime + timeDelta;
        // more than 10 frames? prolly switched browser tab. Restart
        if (_this.accumulatedTime > msPerFrame * 10) {
          _this.accumulatedTime = 0;
        }

        if (_this.accumulatedTime === 0) {
          // no need to cancel animationID here; shouldn't have any in flight
          _this.animationID = null;
          _this.startAnimationIfNecessary();
          return;
        }

        var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
        var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);

        var _mergeAndSync2 = mergeAndSync(_this.props.willEnter, _this.props.willLeave, _this.props.didLeave, _this.state.mergedPropsStyles, destStyles, _this.state.currentStyles, _this.state.currentVelocities, _this.state.lastIdealStyles, _this.state.lastIdealVelocities);

        var newMergedPropsStyles = _mergeAndSync2[0];
        var newCurrentStyles = _mergeAndSync2[1];
        var newCurrentVelocities = _mergeAndSync2[2];
        var newLastIdealStyles = _mergeAndSync2[3];
        var newLastIdealVelocities = _mergeAndSync2[4];

        for (var i = 0; i < newMergedPropsStyles.length; i++) {
          var newMergedPropsStyle = newMergedPropsStyles[i].style;
          var newCurrentStyle = {};
          var newCurrentVelocity = {};
          var newLastIdealStyle = {};
          var newLastIdealVelocity = {};

          for (var key in newMergedPropsStyle) {
            if (!Object.prototype.hasOwnProperty.call(newMergedPropsStyle, key)) {
              continue;
            }

            var styleValue = newMergedPropsStyle[key];
            if (typeof styleValue === 'number') {
              newCurrentStyle[key] = styleValue;
              newCurrentVelocity[key] = 0;
              newLastIdealStyle[key] = styleValue;
              newLastIdealVelocity[key] = 0;
            } else {
              var newLastIdealStyleValue = newLastIdealStyles[i][key];
              var newLastIdealVelocityValue = newLastIdealVelocities[i][key];
              for (var j = 0; j < framesToCatchUp; j++) {
                var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

                newLastIdealStyleValue = _stepper[0];
                newLastIdealVelocityValue = _stepper[1];
              }

              var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

              var nextIdealX = _stepper2[0];
              var nextIdealV = _stepper2[1];

              newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
              newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
              newLastIdealStyle[key] = newLastIdealStyleValue;
              newLastIdealVelocity[key] = newLastIdealVelocityValue;
            }
          }

          newLastIdealStyles[i] = newLastIdealStyle;
          newLastIdealVelocities[i] = newLastIdealVelocity;
          newCurrentStyles[i] = newCurrentStyle;
          newCurrentVelocities[i] = newCurrentVelocity;
        }

        _this.animationID = null;
        // the amount we're looped over above
        _this.accumulatedTime -= framesToCatchUp * msPerFrame;

        _this.setState({
          currentStyles: newCurrentStyles,
          currentVelocities: newCurrentVelocities,
          lastIdealStyles: newLastIdealStyles,
          lastIdealVelocities: newLastIdealVelocities,
          mergedPropsStyles: newMergedPropsStyles
        });

        _this.unreadPropStyles = null;

        _this.startAnimationIfNecessary();
      });
    };

    this.state = this.defaultState();
  }

  TransitionMotion.prototype.defaultState = function defaultState() {
    var _props = this.props;
    var defaultStyles = _props.defaultStyles;
    var styles = _props.styles;
    var willEnter = _props.willEnter;
    var willLeave = _props.willLeave;
    var didLeave = _props.didLeave;

    var destStyles = typeof styles === 'function' ? styles(defaultStyles) : styles;

    // this is special. for the first time around, we don't have a comparison
    // between last (no last) and current merged props. we'll compute last so:
    // say default is {a, b} and styles (dest style) is {b, c}, we'll
    // fabricate last as {a, b}
    var oldMergedPropsStyles = undefined;
    if (defaultStyles == null) {
      oldMergedPropsStyles = destStyles;
    } else {
      oldMergedPropsStyles = defaultStyles.map(function (defaultStyleCell) {
        // TODO: key search code
        for (var i = 0; i < destStyles.length; i++) {
          if (destStyles[i].key === defaultStyleCell.key) {
            return destStyles[i];
          }
        }
        return defaultStyleCell;
      });
    }
    var oldCurrentStyles = defaultStyles == null ? destStyles.map(function (s) {
      return _stripStyle2['default'](s.style);
    }) : defaultStyles.map(function (s) {
      return _stripStyle2['default'](s.style);
    });
    var oldCurrentVelocities = defaultStyles == null ? destStyles.map(function (s) {
      return _mapToZero2['default'](s.style);
    }) : defaultStyles.map(function (s) {
      return _mapToZero2['default'](s.style);
    });

    var _mergeAndSync3 = mergeAndSync(
    // Because this is an old-style createReactClass component, Flow doesn't
    // understand that the willEnter and willLeave props have default values
    // and will always be present.
    willEnter, willLeave, didLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldCurrentStyles, // oldLastIdealStyles really
    oldCurrentVelocities);

    var mergedPropsStyles = _mergeAndSync3[0];
    var currentStyles = _mergeAndSync3[1];
    var currentVelocities = _mergeAndSync3[2];
    var lastIdealStyles = _mergeAndSync3[3];
    var lastIdealVelocities = _mergeAndSync3[4];
    // oldLastIdealVelocities really

    return {
      currentStyles: currentStyles,
      currentVelocities: currentVelocities,
      lastIdealStyles: lastIdealStyles,
      lastIdealVelocities: lastIdealVelocities,
      mergedPropsStyles: mergedPropsStyles
    };
  };

  // after checking for unreadPropStyles != null, we manually go set the
  // non-interpolating values (those that are a number, without a spring
  // config)

  TransitionMotion.prototype.componentDidMount = function componentDidMount() {
    this.prevTime = _performanceNow2['default']();
    this.startAnimationIfNecessary();
  };

  TransitionMotion.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (this.unreadPropStyles) {
      // previous props haven't had the chance to be set yet; set them here
      this.clearUnreadPropStyle(this.unreadPropStyles);
    }

    var styles = props.styles;
    if (typeof styles === 'function') {
      this.unreadPropStyles = styles(rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.lastIdealStyles));
    } else {
      this.unreadPropStyles = styles;
    }

    if (this.animationID == null) {
      this.prevTime = _performanceNow2['default']();
      this.startAnimationIfNecessary();
    }
  };

  TransitionMotion.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmounting = true;
    if (this.animationID != null) {
      _raf2['default'].cancel(this.animationID);
      this.animationID = null;
    }
  };

  TransitionMotion.prototype.render = function render() {
    var hydratedStyles = rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.currentStyles);
    var renderedChildren = this.props.children(hydratedStyles);
    return renderedChildren && _react2['default'].Children.only(renderedChildren);
  };

  return TransitionMotion;
})(_react2['default'].Component);

exports['default'] = TransitionMotion;
module.exports = exports['default'];

// list of styles, each containing interpolating values. Part of what's passed
// to children function. Notice that this is
// Array<ActualInterpolatingStyleObject>, without the wrapper that is {key: ...,
// data: ... style: ActualInterpolatingStyleObject}. Only mergedPropsStyles
// contains the key & data info (so that we only have a single source of truth
// for these, and to save space). Check the comment for `rehydrateStyles` to
// see how we regenerate the entirety of what's passed to children function

// the array that keeps track of currently rendered stuff! Including stuff
// that you've unmounted but that's still animating. This is where it lives

// it's possible that currentStyle's value is stale: if props is immediately
// changed from 0 to 400 to spring(0) again, the async currentStyle is still
// at 0 (didn't have time to tick and interpolate even once). If we naively
// compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
// In reality currentStyle should be 400

/***/ }),

/***/ "./node_modules/react-motion/lib/mapToZero.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// currently used to initiate the velocity style object to 0


exports.__esModule = true;
exports['default'] = mapToZero;

function mapToZero(obj) {
  var ret = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      ret[key] = 0;
    }
  }
  return ret;
}

module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-motion/lib/mergeDiff.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// core keys merging algorithm. If previous render's keys are [a, b], and the
// next render's [c, b, d], what's the final merged keys and ordering?

// - c and a must both be before b
// - b before d
// - ordering between a and c ambiguous

// this reduces to merging two partially ordered lists (e.g. lists where not
// every item has a definite ordering, like comparing a and c above). For the
// ambiguous ordering we deterministically choose to place the next render's
// item after the previous'; so c after a

// this is called a topological sorting. Except the existing algorithms don't
// work well with js bc of the amount of allocation, and isn't optimized for our
// current use-case bc the runtime is linear in terms of edges (see wiki for
// meaning), which is huge when two lists have many common elements


exports.__esModule = true;
exports['default'] = mergeDiff;

function mergeDiff(prev, next, onRemove) {
  // bookkeeping for easier access of a key's index below. This is 2 allocations +
  // potentially triggering chrome hash map mode for objs (so it might be faster

  var prevKeyIndex = {};
  for (var i = 0; i < prev.length; i++) {
    prevKeyIndex[prev[i].key] = i;
  }
  var nextKeyIndex = {};
  for (var i = 0; i < next.length; i++) {
    nextKeyIndex[next[i].key] = i;
  }

  // first, an overly elaborate way of merging prev and next, eliminating
  // duplicates (in terms of keys). If there's dupe, keep the item in next).
  // This way of writing it saves allocations
  var ret = [];
  for (var i = 0; i < next.length; i++) {
    ret[i] = next[i];
  }
  for (var i = 0; i < prev.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(nextKeyIndex, prev[i].key)) {
      // this is called my TM's `mergeAndSync`, which calls willLeave. We don't
      // merge in keys that the user desires to kill
      var fill = onRemove(i, prev[i]);
      if (fill != null) {
        ret.push(fill);
      }
    }
  }

  // now all the items all present. Core sorting logic to have the right order
  return ret.sort(function (a, b) {
    var nextOrderA = nextKeyIndex[a.key];
    var nextOrderB = nextKeyIndex[b.key];
    var prevOrderA = prevKeyIndex[a.key];
    var prevOrderB = prevKeyIndex[b.key];

    if (nextOrderA != null && nextOrderB != null) {
      // both keys in next
      return nextKeyIndex[a.key] - nextKeyIndex[b.key];
    } else if (prevOrderA != null && prevOrderB != null) {
      // both keys in prev
      return prevKeyIndex[a.key] - prevKeyIndex[b.key];
    } else if (nextOrderA != null) {
      // key a in next, key b in prev

      // how to determine the order between a and b? We find a "pivot" (term
      // abuse), a key present in both prev and next, that is sandwiched between
      // a and b. In the context of our above example, if we're comparing a and
      // d, b's (the only) pivot
      for (var i = 0; i < next.length; i++) {
        var pivot = next[i].key;
        if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
          continue;
        }

        if (nextOrderA < nextKeyIndex[pivot] && prevOrderB > prevKeyIndex[pivot]) {
          return -1;
        } else if (nextOrderA > nextKeyIndex[pivot] && prevOrderB < prevKeyIndex[pivot]) {
          return 1;
        }
      }
      // pluggable. default to: next bigger than prev
      return 1;
    }
    // prevOrderA, nextOrderB
    for (var i = 0; i < next.length; i++) {
      var pivot = next[i].key;
      if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
        continue;
      }
      if (nextOrderB < nextKeyIndex[pivot] && prevOrderA > prevKeyIndex[pivot]) {
        return 1;
      } else if (nextOrderB > nextKeyIndex[pivot] && prevOrderA < prevKeyIndex[pivot]) {
        return -1;
      }
    }
    // pluggable. default to: next bigger than prev
    return -1;
  });
}

module.exports = exports['default'];
// to loop through and find a key's index each time), but I no longer care

/***/ }),

/***/ "./node_modules/react-motion/lib/presets.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = {
  noWobble: { stiffness: 170, damping: 26 }, // the default, if nothing provided
  gentle: { stiffness: 120, damping: 14 },
  wobbly: { stiffness: 180, damping: 12 },
  stiff: { stiffness: 210, damping: 20 }
};
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/react-motion/lib/react-motion.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _Motion = __webpack_require__("./node_modules/react-motion/lib/Motion.js");

exports.Motion = _interopRequire(_Motion);

var _StaggeredMotion = __webpack_require__("./node_modules/react-motion/lib/StaggeredMotion.js");

exports.StaggeredMotion = _interopRequire(_StaggeredMotion);

var _TransitionMotion = __webpack_require__("./node_modules/react-motion/lib/TransitionMotion.js");

exports.TransitionMotion = _interopRequire(_TransitionMotion);

var _spring = __webpack_require__("./node_modules/react-motion/lib/spring.js");

exports.spring = _interopRequire(_spring);

var _presets = __webpack_require__("./node_modules/react-motion/lib/presets.js");

exports.presets = _interopRequire(_presets);

var _stripStyle = __webpack_require__("./node_modules/react-motion/lib/stripStyle.js");

exports.stripStyle = _interopRequire(_stripStyle);

// deprecated, dummy warning function

var _reorderKeys = __webpack_require__("./node_modules/react-motion/lib/reorderKeys.js");

exports.reorderKeys = _interopRequire(_reorderKeys);

/***/ }),

/***/ "./node_modules/react-motion/lib/reorderKeys.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = reorderKeys;

var hasWarned = false;

function reorderKeys() {
  if (false) {
    if (!hasWarned) {
      hasWarned = true;
      console.error('`reorderKeys` has been removed, since it is no longer needed for TransitionMotion\'s new styles array API.');
    }
  }
}

module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-motion/lib/shouldStopAnimation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// usage assumption: currentStyle values have already been rendered but it says
// nothing of whether currentStyle is stale (see unreadPropStyle)


exports.__esModule = true;
exports['default'] = shouldStopAnimation;

function shouldStopAnimation(currentStyle, style, currentVelocity) {
  for (var key in style) {
    if (!Object.prototype.hasOwnProperty.call(style, key)) {
      continue;
    }

    if (currentVelocity[key] !== 0) {
      return false;
    }

    var styleValue = typeof style[key] === 'number' ? style[key] : style[key].val;
    // stepper will have already taken care of rounding precision errors, so
    // won't have such thing as 0.9999 !=== 1
    if (currentStyle[key] !== styleValue) {
      return false;
    }
  }

  return true;
}

module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-motion/lib/spring.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = spring;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _presets = __webpack_require__("./node_modules/react-motion/lib/presets.js");

var _presets2 = _interopRequireDefault(_presets);

var defaultConfig = _extends({}, _presets2['default'].noWobble, {
  precision: 0.01
});

function spring(val, config) {
  return _extends({}, defaultConfig, config, { val: val });
}

module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-motion/lib/stepper.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// stepper is used a lot. Saves allocation to return the same array wrapper.
// This is fine and danger-free against mutations because the callsite
// immediately destructures it and gets the numbers inside without passing the


exports.__esModule = true;
exports["default"] = stepper;

var reusedTuple = [0, 0];

function stepper(secondPerFrame, x, v, destX, k, b, precision) {
  // Spring stiffness, in kg / s^2

  // for animations, destX is really spring length (spring at rest). initial
  // position is considered as the stretched/compressed position of a spring
  var Fspring = -k * (x - destX);

  // Damping, in kg / s
  var Fdamper = -b * v;

  // usually we put mass here, but for animation purposes, specifying mass is a
  // bit redundant. you could simply adjust k and b accordingly
  // let a = (Fspring + Fdamper) / mass;
  var a = Fspring + Fdamper;

  var newV = v + a * secondPerFrame;
  var newX = x + newV * secondPerFrame;

  if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
    reusedTuple[0] = destX;
    reusedTuple[1] = 0;
    return reusedTuple;
  }

  reusedTuple[0] = newX;
  reusedTuple[1] = newV;
  return reusedTuple;
}

module.exports = exports["default"];
// array reference around.

/***/ }),

/***/ "./node_modules/react-motion/lib/stripStyle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// turn {x: {val: 1, stiffness: 1, damping: 2}, y: 2} generated by
// `{x: spring(1, {stiffness: 1, damping: 2}), y: 2}` into {x: 1, y: 2}



exports.__esModule = true;
exports['default'] = stripStyle;

function stripStyle(style) {
  var ret = {};
  for (var key in style) {
    if (!Object.prototype.hasOwnProperty.call(style, key)) {
      continue;
    }
    ret[key] = typeof style[key] === 'number' ? style[key] : style[key].val;
  }
  return ret;
}

module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/components/Background/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = __webpack_require__("./node_modules/react-motion/lib/react-motion.js");

var _index = __webpack_require__("./src/components/Background/index.less");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React Motion
exports.default = function (_ref) {
  var show = _ref.show,
      zoom = _ref.zoom,
      unmountSelf = _ref.unmountSelf,
      toggleZoom = _ref.toggleZoom;

  return _react2.default.createElement(
    _reactMotion.Motion,
    { defaultStyle: { opacity: 0 }, style: { opacity: (0, _reactMotion.spring)(show ? 1 : 0) } },
    function (_ref2) {
      var opacity = _ref2.opacity;
      return _react2.default.createElement('div', {
        className: _index2.default.backgroundLayer,
        onClick: zoom ? toggleZoom : unmountSelf,
        style: { opacity: opacity }
      });
    }
  );
};
// Style
/**
 * 背景层
 * 叠加半透明背景
 **/

// React Libs

/***/ }),

/***/ "./src/components/Background/index.less":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Background/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/Control/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__("./src/components/Control/index.less");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 控制层
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 控制图片切换等
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs

// Style


var Control = function (_React$Component) {
    _inherits(Control, _React$Component);

    function Control(props) {
        _classCallCheck(this, Control);

        var _this = _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).call(this, props));

        _this.zoomStyle = function (show) {
            return show ? {
                WebkitClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
                MozClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
                MsClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
                OClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
                clipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
                opacity: 1
            } : {
                WebkitClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
                MozClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
                MsClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
                OClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
                clipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
                opacity: 0
                // 关闭按钮样式
            };
        };

        _this.lineL = function (show) {
            return show ? {
                WebkitTransform: 'translate(-50%, -50%) rotate(45deg)',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                opacity: 1
            } : {
                WebkitTransform: 'translate(-50%, -50%) rotate(0)',
                transform: 'translate(-50%, -50%) rotate(0)',
                opacity: 0
            };
        };

        _this.lineR = function (show) {
            return show ? {
                WebkitTransform: 'translate(-50%, -50%) rotate(-45deg)',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                opacity: 1
            } : {
                WebkitTransform: 'translate(-50%, -50%) rotate(0)',
                transform: 'translate(-50%, -50%) rotate(0)',
                opacity: 0

                // 切换按钮样式
            };
        };

        _this.prevStyle = function (show) {
            return show ? {
                left: 0,
                opacity: 1
            } : {
                left: -55,
                opacity: 0
            };
        };

        _this.nextStyle = function (show) {
            return show ? {
                right: 0,
                opacity: 1
            } : {
                right: -55,
                opacity: 0

                // 页数指示样式
            };
        };

        _this.pagesStyle = function (show) {
            return show ? {
                bottom: 0,
                opacity: 1
            } : {
                bottom: -31,
                opacity: 0

                // 图片标题样式
            };
        };

        _this.altStyle = function (show) {
            return show ? {
                WebkitClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                MozClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                MsClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                OClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                opacity: 1
            } : {
                WebkitClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                MozClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                MsClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                OClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                opacity: 0
            };
        };

        return _this;
    }

    // 放大按钮样式


    _createClass(Control, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                show = _props.show,
                zoom = _props.zoom,
                page = _props.page,
                imageSet = _props.imageSet,
                controller = _props.controller,
                unmountSelf = _props.unmountSelf,
                toggleZoom = _props.toggleZoom,
                switchPages = _props.switchPages;

            var hasMultipleImage = imageSet.length > 1;
            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: _index2.default.controls },
                    !zoom && controller.zoom && _react2.default.createElement('div', { className: _index2.default.zoomButton, style: this.zoomStyle(show), onClick: toggleZoom }),
                    !zoom && controller.close && _react2.default.createElement(
                        'div',
                        { className: _index2.default.closeButton, onClick: zoom ? toggleZoom : unmountSelf },
                        _react2.default.createElement('div', { className: _index2.default.crossLine, style: this.lineL(show) }),
                        _react2.default.createElement('div', { className: _index2.default.crossLine, style: this.lineR(show) })
                    )
                ),
                hasMultipleImage && !zoom && controller.flip && _react2.default.createElement(
                    'div',
                    { className: _index2.default.switchButton, style: this.prevStyle(show), onClick: switchPages("prev") },
                    _react2.default.createElement(
                        'svg',
                        { viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
                        _react2.default.createElement('path', { d: 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' }),
                        _react2.default.createElement('path', { d: 'M0-.5h24v24H0z', fill: 'none' })
                    )
                ),
                hasMultipleImage && !zoom && controller.flip && _react2.default.createElement(
                    'div',
                    { className: _index2.default.switchButton, style: this.nextStyle(show), onClick: switchPages("next") },
                    _react2.default.createElement(
                        'svg',
                        { viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
                        _react2.default.createElement('path', { d: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' }),
                        _react2.default.createElement('path', { d: 'M0-.25h24v24H0z', fill: 'none' })
                    )
                ),
                hasMultipleImage && !zoom && controller.pagination && _react2.default.createElement(
                    'div',
                    { className: _index2.default.pages, style: this.pagesStyle(show) },
                    _react2.default.createElement(
                        'span',
                        null,
                        page + 1 + ' / ' + imageSet.length
                    )
                ),
                !zoom && controller.title && _react2.default.createElement(
                    'div',
                    { className: _index2.default.imgAlt, style: this.altStyle(show) },
                    imageSet[page].alt || imageSet.alt
                )
            );
        }
    }]);

    return Control;
}(_react2.default.Component);

exports.default = Control;

/***/ }),

/***/ "./src/components/Control/index.less":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Control/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/Image/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = __webpack_require__("./node_modules/react-motion/lib/react-motion.js");

var _index = __webpack_require__("./src/components/Image/index.less");

var _index2 = _interopRequireDefault(_index);

var _utils = __webpack_require__("./src/utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 图片层
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 展示图片, 控制图片尺寸
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs

// React Motion

// Style

// Utils


// 移动端检测
var isMobile = (0, _utils.mobileCheck)();
// 图片边距
var IMAGE_MARGIN = isMobile ? 0 : 50;

var Image = function (_React$Component) {
    _inherits(Image, _React$Component);

    function Image(props) {
        _classCallCheck(this, Image);

        // 初始封面尺寸
        var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

        _initialiseProps.call(_this);

        var _this$coverSize = _this.coverSize(),
            scale = _this$coverSize.scale,
            borderWidth = _this$coverSize.borderWidth,
            borderRadius = _this$coverSize.borderRadius;
        // 页面缩放时重设尺寸


        (0, _utils.addListenEventOf)('resize', _this.handleResize);

        _this.state = {
            // 加载完成
            onLoad: true,
            // 加载错误
            onError: false,
            // 翻页方向
            direction: '',
            // 样式
            defaultStyle: { scale: scale, borderWidth: borderWidth, borderRadius: borderRadius },
            currentStyle: { scale: scale, borderWidth: borderWidth, borderRadius: borderRadius }
        };
        return _this;
    }

    _createClass(Image, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var show = nextProps.show,
                zoom = nextProps.zoom,
                page = nextProps.page;

            if (show) {
                if (zoom) {
                    this.resizeTo(this.originalSize());
                } else {
                    this.resizeTo(this.pageFitSize());
                }
            } else {
                this.resizeTo(this.coverSize());
                (0, _utils.removeListenEventOf)('resize', this.handleResize);
            }
            if (page) {
                this.setState({
                    onLoad: true,
                    onError: false
                });
            }
        }

        /**
         * 尺寸控制
         **/


        /**
         * 事件响应
         **/

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                show = _props.show,
                zoom = _props.zoom,
                page = _props.page,
                imageSet = _props.imageSet,
                coverNodeRef = _props.coverNodeRef,
                toggleZoom = _props.toggleZoom;
            var _state = this.state,
                onLoad = _state.onLoad,
                onError = _state.onError,
                defaultStyle = _state.defaultStyle,
                currentStyle = _state.currentStyle;

            return _react2.default.createElement(
                _react.Fragment,
                null,
                onLoad && _react2.default.createElement(
                    'span',
                    { className: _index2.default.loading },
                    _react2.default.createElement('i', null),
                    _react2.default.createElement('i', null),
                    _react2.default.createElement('i', null),
                    _react2.default.createElement('i', null)
                ),
                onError && _react2.default.createElement(
                    'span',
                    null,
                    '\uD83D\uDE16'
                ),
                _react2.default.createElement(
                    _reactMotion.Motion,
                    {
                        defaultStyle: defaultStyle,
                        style: {
                            scale: (0, _reactMotion.spring)(currentStyle.scale),
                            borderWidth: (0, _reactMotion.spring)(currentStyle.borderWidth),
                            borderRadius: (0, _reactMotion.spring)(currentStyle.borderRadius)
                        },
                        onRest: this.handleMotionRest
                    },
                    function (_ref) {
                        var scale = _ref.scale,
                            borderWidth = _ref.borderWidth,
                            borderRadius = _ref.borderRadius;
                        return _react2.default.createElement('img', {
                            key: page,
                            className: _index2.default.imageLayer,
                            style: {
                                // 插值样式
                                transform: 'translate3d(-50%, -50%, 0) scale3d(' + scale + ', ' + scale + ', 1)',
                                borderRadius: borderRadius / scale + 'px',
                                borderWidth: borderWidth / scale + 'px',
                                // 固定样式
                                boxShadow: 'none',
                                // boxSizing: this.coverNodeStyle['box-sizing'],
                                border: _this2.coverNodeStyle['border'],
                                // 无封面图片处理
                                maxWidth: coverNodeRef ? '' : zoom ? 'max-content' : 'calc(100vw - ' + 2 * IMAGE_MARGIN + 'px)',
                                maxHeight: coverNodeRef ? '' : zoom ? 'max-content' : 'calc(100vh - ' + 2 * IMAGE_MARGIN + 'px)'
                            },
                            src: imageSet[page].src,
                            alt: imageSet[page].alt,
                            onLoad: function onLoad() {
                                return _this2.setState({ onLoad: false });
                            },
                            onError: function onError() {
                                return _this2.setState({ onError: true });
                            },
                            onClick: zoom ? toggleZoom : function () {}
                        });
                    }
                )
            );
        }
    }]);

    return Image;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.coverSize = function () {
        var coverNodeRef = _this3.props.coverNodeRef;

        var coverStyle = { scale: 0, borderWidth: 0, borderRadius: 0 };
        if (coverNodeRef) {
            var coverNodeStyle = window.getComputedStyle(coverNodeRef);
            _this3.coverNodeStyle = coverNodeStyle;
            coverStyle = {
                scale: (parseInt(coverNodeStyle['width'] || 0) - 2 * parseInt(coverNodeStyle['border-width'] || 0)) / coverNodeRef.naturalWidth,
                borderWidth: parseInt(coverNodeStyle['border-width'] || 0),
                borderRadius: parseInt(coverNodeStyle['border-radius'] || 0)
            };
        }
        return coverStyle;
    };

    this.pageFitSize = function () {
        var coverNodeRef = _this3.props.coverNodeRef;

        var fitScale = { scale: 1, borderWidth: 0, borderRadius: 0 };
        if (coverNodeRef) {
            fitScale = {
                scale: (0, _utils.calcFitScale)(coverNodeRef, IMAGE_MARGIN),
                borderWidth: 0,
                borderRadius: 5
            };
        }
        return fitScale;
    };

    this.originalSize = function () {
        return {
            scale: 1,
            borderWidth: 0,
            borderRadius: 5
        };
    };

    this.resizeTo = function (_ref2) {
        var scale = _ref2.scale,
            borderWidth = _ref2.borderWidth,
            borderRadius = _ref2.borderRadius;

        _this3.setState({
            currentStyle: { scale: scale, borderWidth: borderWidth, borderRadius: borderRadius }
        });
    };

    this.handleResize = function () {
        _this3.resizeTo(_this3.pageFitSize());
    };

    this.handleMotionRest = function () {
        var _props2 = _this3.props,
            coverNodeRef = _props2.coverNodeRef,
            remove = _props2.remove;
        var show = _this3.props.show;

        if (!show) {
            // 显示封面原图
            if (coverNodeRef) coverNodeRef.style.visibility = 'visible';
            // 移除节点
            remove();
        }
    };
};

exports.default = Image;

/***/ }),

/***/ "./src/components/Image/index.less":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Image/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/Position/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = __webpack_require__("./node_modules/react-motion/lib/react-motion.js");

var _index = __webpack_require__("./src/components/Position/index.less");

var _index2 = _interopRequireDefault(_index);

var _utils = __webpack_require__("./src/utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 位移层
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 控制图片位置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs

// React Motion

// Style

// Utils


// TODO: CONFIG
var IMAGE_MARGIN = 50;

var Position = function (_React$Component) {
    _inherits(Position, _React$Component);

    function Position(props) {
        _classCallCheck(this, Position);

        // 初始页面高度
        var _this = _possibleConstructorReturn(this, (Position.__proto__ || Object.getPrototypeOf(Position)).call(this, props));

        _initialiseProps.call(_this);

        _this.initialPageOffset = window.pageYOffset;
        // 初始封面位置

        var _this$coverCenterPosi = _this.coverCenterPosition(),
            x = _this$coverCenterPosi.x,
            y = _this$coverCenterPosi.y;

        _this.state = {
            // 原始尺寸
            naturalSize: null,
            // 移动范围
            moveRange: null,
            // 样式
            defaultStyle: { x: x, y: y },
            currentStyle: { x: x, y: y }
        };
        return _this;
    }

    _createClass(Position, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var show = nextProps.show,
                zoom = nextProps.zoom;

            if (show) {
                this.moveTo(this.pageCenterPosition());
                if (zoom) {
                    this.updateZoomMovePositionRange();
                    (0, _utils.addListenEventOf)('mousemove', this.handleMouseMove);
                } else {
                    (0, _utils.removeListenEventOf)('mousemove', this.handleMouseMove);
                }
            } else {
                this.moveTo(this.coverCenterPosition());
                (0, _utils.removeListenEventOf)('mousemove', this.handleMouseMove);
            }
        }

        /**
         * 移动控制
         **/


        /**
         * 放大查看控制
         **/

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var show = this.props.show;
            var _state = this.state,
                defaultStyle = _state.defaultStyle,
                currentStyle = _state.currentStyle;

            return _react2.default.createElement(
                'div',
                { className: _index2.default.positionLayer },
                _react2.default.createElement(
                    _reactMotion.Motion,
                    {
                        defaultStyle: defaultStyle,
                        style: {
                            x: (0, _reactMotion.spring)(currentStyle.x),
                            y: (0, _reactMotion.spring)(currentStyle.y)
                        }
                    },
                    function (_ref) {
                        var x = _ref.x,
                            y = _ref.y;
                        return _react2.default.createElement(
                            'div',
                            { style: {
                                    transform: 'translate3d(' + x + 'px, ' + y + 'px, 0)',
                                    top: show ? undefined : (0, _utils.windowHeight)() / 2 - (window.pageYOffset - _this2.initialPageOffset)
                                } },
                            _this2.props.children
                        );
                    }
                )
            );
        }
    }]);

    return Position;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.coverCenterPosition = function () {
        var _props = _this3.props,
            page = _props.page,
            coverNodeRef = _props.coverNodeRef;

        var coverCenterPosition = { x: 0, y: 0 };
        if (coverNodeRef) {
            var coverNodeRect = coverNodeRef.getBoundingClientRect();
            coverCenterPosition = page === 0 ? {
                x: -(0, _utils.scrollWidth)() / 2 + coverNodeRect.left + coverNodeRect.width / 2,
                y: -(0, _utils.windowHeight)() / 2 + coverNodeRect.top + coverNodeRect.height / 2
            } : {
                x: 0,
                y: -(0, _utils.windowHeight)()
            };
        }
        return coverCenterPosition;
    };

    this.pageCenterPosition = function () {
        return { x: 0, y: 0 };
    };

    this.mouseContrastPosition = function (e) {
        var _state2 = _this3.state,
            naturalSize = _state2.naturalSize,
            mr = _state2.moveRange;
        var nw = naturalSize.naturalWidth,
            nh = naturalSize.naturalHeight;

        var cw = (0, _utils.clientWidth)();
        var ch = (0, _utils.clientHeight)();
        var mouseX = e.clientX;
        var mouseY = e.clientY;
        // 计算偏移量
        var imgPosX = nw > cw ? (nw - cw) / 2 + IMAGE_MARGIN - mr.x * (mouseX / cw) : 0;
        var imgPosY = nh > ch ? (nh - ch) / 2 + IMAGE_MARGIN - mr.y * (mouseY / ch) : 0;
        // 返回位置
        return {
            x: imgPosX,
            y: imgPosY
        };
    };

    this.moveTo = function (_ref2) {
        var x = _ref2.x,
            y = _ref2.y;

        _this3.setState({
            currentStyle: { x: x, y: y }
        });
    };

    this.updateZoomMovePositionRange = function () {
        var _props2 = _this3.props,
            zoom = _props2.zoom,
            page = _props2.page,
            imageSet = _props2.imageSet;

        var image = new Image();
        image.src = imageSet[page].src;
        image.onload = function () {
            var naturalWidth = image.naturalWidth;
            var naturalHeight = image.naturalHeight;
            _this3.setState({
                naturalSize: !zoom ? { naturalWidth: naturalWidth, naturalHeight: naturalHeight } : null,
                moveRange: !zoom ? {
                    x: naturalWidth - (0, _utils.clientWidth)() + 2 * IMAGE_MARGIN,
                    y: naturalHeight - (0, _utils.clientHeight)() + 2 * IMAGE_MARGIN
                } : null
            });
        };
    };

    this.handleMouseMove = function (e) {
        _this3.moveTo(_this3.mouseContrastPosition(e));
    };
};

exports.default = Position;

/***/ }),

/***/ "./src/components/Position/index.less":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Position/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/Wrapper/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Wrapper = exports.showImage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = __webpack_require__("./src/components/Wrapper/index.less");

var _index2 = _interopRequireDefault(_index);

var _Position = __webpack_require__("./src/components/Position/index.js");

var _Position2 = _interopRequireDefault(_Position);

var _Control = __webpack_require__("./src/components/Control/index.js");

var _Control2 = _interopRequireDefault(_Control);

var _Image = __webpack_require__("./src/components/Image/index.js");

var _Image2 = _interopRequireDefault(_Image);

var _Background = __webpack_require__("./src/components/Background/index.js");

var _Background2 = _interopRequireDefault(_Background);

var _default = __webpack_require__("./src/config/default.js");

var _utils = __webpack_require__("./src/utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 包裹层
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 储存主要状态，组织架构
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs

// Style

// Components

// Config

// Utils


var Wrapper = function (_React$Component) {
    _inherits(Wrapper, _React$Component);

    function Wrapper(props) {
        _classCallCheck(this, Wrapper);

        var _this = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

        _this.mountSelf = function () {
            var coverNodeRef = _this.props.coverNodeRef;
            // 隐藏封面原图

            if (coverNodeRef) coverNodeRef.style.visibility = 'hidden';
            // 显示并绑定事件
            _this.setState({ show: true }, function () {
                (0, _utils.addListenEventOf)('keydown', _this.handleKeyDown);
                (0, _utils.addListenEventOf)('scroll', _this.handleScroll);
                (0, _utils.addListenEventOf)('touchmove', _this.handleScroll);
            });
        };

        _this.unmountSelf = function () {
            var coverNodeRef = _this.props.coverNodeRef;
            var page = _this.state.page;
            // 显示封面原图（当前不为第一页时，遮罩从上方移除会迅速露出，需要立即显示，否则交由图片层处理）

            if (coverNodeRef && page !== 0) coverNodeRef.style.visibility = 'visible';
            _this.setState({ show: false });
        };

        _this.handleKeyDown = function (e) {
            // 阻止默认事件
            e.preventDefault();
            var _this$props = _this.props,
                imageSet = _this$props.imageSet,
                hotKey = _this$props.hotKey;
            var zoom = _this.state.zoom;

            var hasImageSet = imageSet && imageSet.constructor === Array;
            var toPrevPage = _this.handleSwitchPages("prev");
            var toNextPage = _this.handleSwitchPages("next");
            switch (e.key) {
                case "ArrowLeft":
                    // 上一张
                    !zoom && hotKey.flip && hasImageSet && toPrevPage();
                    break;
                case "ArrowRight":
                    // 下一张
                    !zoom && hotKey.flip && hasImageSet && toNextPage();
                    break;
                case " ":
                    // 缩放
                    hotKey.zoom && _this.handleToggleZoom();
                    break;
                case "Escape":
                    // 退出
                    hotKey.close && (zoom ? _this.handleToggleZoom() : _this.unmountSelf());
                    break;
                default:
                    return;
            }
        };

        _this.handleScroll = function (e) {
            _this.state.show && _this.unmountSelf();
        };

        _this.handleSwitchPages = function (direction) {
            return function () {
                var imageSet = _this.props.imageSet;
                var page = _this.state.page;

                _this.setState({
                    page: direction === "prev" ? Math.abs(imageSet.length + page - 1) % imageSet.length : (page + 1) % imageSet.length
                });
            };
        };

        _this.handleToggleZoom = function () {
            _this.setState({
                zoom: !_this.state.zoom
            });
        };

        _this.state = {
            // 显示
            show: false,
            // 缩放
            zoom: false,
            // 当前页数
            page: 0
        };
        return _this;
    }

    _createClass(Wrapper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.mountSelf();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _utils.removeListenEventOf)('keydown', this.handleKeyDown);
            (0, _utils.removeListenEventOf)('scroll', this.handleScroll);
            (0, _utils.removeListenEventOf)('touchmove', this.handleScroll);
        }

        /**
         * 加载器
         **/


        /**
         * 事件处理
         **/


        /**
         * 翻页控制
         **/


        /**
         * 缩放控制
         **/

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                coverNodeRef = _props.coverNodeRef,
                imageSet = _props.imageSet,
                controller = _props.controller,
                remove = _props.remove;
            var _state = this.state,
                show = _state.show,
                zoom = _state.zoom,
                page = _state.page;

            return _react2.default.createElement(
                'div',
                { className: _index2.default.wrapperLayer },
                _react2.default.createElement(_Control2.default, {
                    show: show,
                    zoom: zoom,
                    page: page,
                    imageSet: imageSet,
                    controller: controller,
                    unmountSelf: this.unmountSelf,
                    toggleZoom: this.handleToggleZoom,
                    switchPages: this.handleSwitchPages
                }),
                _react2.default.createElement(
                    _Position2.default,
                    {
                        show: show,
                        zoom: zoom,
                        page: page,
                        imageSet: imageSet,
                        coverNodeRef: coverNodeRef
                    },
                    _react2.default.createElement(_Image2.default, {
                        show: show,
                        zoom: zoom,
                        page: page,
                        imageSet: imageSet,
                        coverNodeRef: coverNodeRef,
                        toggleZoom: this.handleToggleZoom,
                        remove: remove
                    })
                ),
                _react2.default.createElement(_Background2.default, {
                    show: show,
                    unmountSelf: this.unmountSelf,
                    toggleZoom: this.handleToggleZoom
                })
            );
        }
    }]);

    return Wrapper;
}(_react2.default.Component);

Wrapper.defaultProps = {
    // 封面节点
    coverNodeRef: {},
    // 图片列表
    imageSet: [],
    // 控制器
    controller: _default.defProp.controller,
    // 快捷键
    hotKey: _default.defProp.hotKey,
    // 卸载函数
    remove: function remove() {}
};

Wrapper.propTypes = {
    // 封面节点
    coverNodeRef: _propTypes2.default.object,
    // 图片列表
    imageSet: _default.defType.imageSet,
    // 控制器
    controller: _default.defType.controller,
    // 快捷键
    hotKey: _default.defType.hotKey,
    // 卸载函数
    remove: _propTypes2.default.func

    // 主动调用显示，插入控件到指定节点（Body末端）
};var showImage = function showImage(_ref) {
    var id = _ref.id,
        imageSet = _ref.imageSet,
        controller = _ref.controller,
        hotKey = _ref.hotKey;


    // 封面节点
    var coverNodeRef = document.getElementById(id);

    // 容器节点
    var wrapperNodeId = 'zmage-wrapper';
    var previousOverlayNode = document.getElementById(wrapperNodeId);
    previousOverlayNode && previousOverlayNode.remove();
    var wrapperNode = document.createElement('div');
    wrapperNode.id = wrapperNodeId;
    document.body.appendChild(wrapperNode);
    var wrapperNodeRef = document.getElementById(wrapperNodeId);

    // 卸载函数
    var remove = function remove() {
        _reactDom2.default.unmountComponentAtNode(wrapperNodeRef);
        wrapperNodeRef.remove();
    };

    // 插入容器节点
    wrapperNodeRef && _reactDom2.default.render(_react2.default.createElement(Wrapper, {
        coverNodeRef: coverNodeRef,
        imageSet: imageSet,
        controller: Object.assign({}, _default.defProp.controller, controller),
        hotKey: Object.assign({}, _default.defProp.hotKey, hotKey),
        remove: remove
    }), wrapperNodeRef);

    // 对于函数调用模式，返回容器节点引用, 调用 remove() 即可移除（无动画）
    return {
        node: wrapperNodeRef,
        remove: remove
    };
};

exports.showImage = showImage;
exports.Wrapper = Wrapper;

/***/ }),

/***/ "./src/components/Wrapper/index.less":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Wrapper/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/config/default.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defType = exports.defProp = undefined;

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 默认值
var defProp = exports.defProp = {

	// 控制器
	controller: {
		// 分页
		pagination: true,
		// 标题
		title: true,
		// 关闭按钮
		close: true,
		// 缩放按钮
		zoom: true,
		// 左右翻页
		flip: true
	},

	// 快捷键
	hotKey: {
		// 关闭（ESC）
		close: true,
		// 缩放（空格）
		zoom: true,
		// 翻页（左右键）
		flip: true
	}

	// 默认类型
}; /**
    * 定义各种默认值
    **/

// React Libs
var defType = exports.defType = {

	// 图片列表
	imageSet: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.shape({
		src: _propTypes2.default.string, // 图片链接
		alt: _propTypes2.default.string, // 同 img 标签的 alt
		text: _propTypes2.default.string // 图片描述文字
	})), _propTypes2.default.shape({
		src: _propTypes2.default.string, // 图片链接
		alt: _propTypes2.default.string, // 同 img 标签的 alt
		text: _propTypes2.default.string // 图片描述文字
	})]),

	// 控制器
	controller: _propTypes2.default.shape({
		// 分页
		pagination: _propTypes2.default.bool,
		// 标题
		title: _propTypes2.default.bool,
		// 关闭按钮
		close: _propTypes2.default.bool,
		// 缩放按钮
		zoom: _propTypes2.default.bool,
		// 左右翻页
		flip: _propTypes2.default.bool
	}),

	// 快捷键
	hotKey: _propTypes2.default.shape({
		// 关闭（ESC）
		close: _propTypes2.default.bool,
		// 缩放（空格）
		zoom: _propTypes2.default.bool,
		// 翻页（左右键）
		flip: _propTypes2.default.bool
	})

};

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReactZmage = exports.showImage = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Wrapper = __webpack_require__("./src/components/Wrapper/index.js");

var _default = __webpack_require__("./src/config/default.js");

var _utils = __webpack_require__("./src/utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 应用主入口
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               **/

// React Libs

// Components

// Config

// Utils


exports.showImage = _Wrapper.showImage;
exports.ReactZmage = ReactZmage;

var ReactZmage = function (_React$Component) {
    _inherits(ReactZmage, _React$Component);

    function ReactZmage(props) {
        _classCallCheck(this, ReactZmage);

        var _this = _possibleConstructorReturn(this, (ReactZmage.__proto__ || Object.getPrototypeOf(ReactZmage)).call(this, props));

        _this.state = {
            uid: (0, _utils.generateUUID)()
        };
        return _this;
    }

    _createClass(ReactZmage, [{
        key: 'render',
        value: function render() {
            var uid = this.state.uid;

            var _props = this.props,
                id = _props.id,
                className = _props.className,
                src = _props.src,
                hiResSrc = _props.hiResSrc,
                alt = _props.alt,
                text = _props.text,
                imageSet = _props.imageSet,
                controller = _props.controller,
                hotKey = _props.hotKey,
                _onClick = _props.onClick,
                style = _props.style,
                props = _objectWithoutProperties(_props, ['id', 'className', 'src', 'hiResSrc', 'alt', 'text', 'imageSet', 'controller', 'hotKey', 'onClick', 'style']);

            var uuid = 'u' + uid;
            return _react2.default.createElement('img', _extends({
                id: uuid, className: className,
                src: src, alt: alt,
                onClick: function onClick() {
                    // 执行绑定的函数
                    _onClick && _onClick.constructor === Function && _onClick();
                    // 显示幻灯片叠层
                    (0, _Wrapper.showImage)({
                        id: uuid,
                        imageSet: imageSet && imageSet.constructor === Array && imageSet.length > 1 ? imageSet : [{
                            src: hiResSrc || src,
                            alt: alt,
                            text: text
                        }],
                        controller: controller,
                        hotKey: hotKey
                    });
                },
                style: Object.assign({ cursor: 'zoom-in' }, style)
            }, props));
        }
    }]);

    return ReactZmage;
}(_react2.default.Component);

// 默认参数


exports.default = ReactZmage;
ReactZmage.defaultProps = {

    // 图片链接
    src: "",
    // 高分原图链接
    hiResSrc: "",
    // 图片标题
    alt: "",
    // 图片描述
    text: "",

    // 图片列表
    imageSet: [],

    // 控制器
    controller: _default.defProp.controller,
    // 快捷键
    hotKey: _default.defProp.hotKey

    // 参数类型
};ReactZmage.propTypes = {

    // 图片链接
    src: _propTypes2.default.string.isRequired,
    // 高分原图链接
    hiResSrc: _propTypes2.default.string,
    // 图片标题
    alt: _propTypes2.default.string,
    // 图片描述
    text: _propTypes2.default.string,

    // 图片列表, 可以传入单独的图片类型或数组包裹的图片类型
    imageSet: _default.defType.imageSet,

    // 控制器
    controller: _default.defType.controller,
    // 快捷键
    hotKey: _default.defType.hotKey

};

/***/ }),

/***/ "./src/utils/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * 工具函数
 **/

// 随机字符串
var generateUUID = exports.generateUUID = function generateUUID() {
	var d = new Date().getTime();
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === "x" ? r : r & 0x7 | 0x8).toString(16);
	});
};

// 通过屏幕尺寸以及图片尺寸，计算出图片能在屏幕中完整显示的缩放比例
var calcFitScale = exports.calcFitScale = function calcFitScale(nodeRef, margin) {
	var cw = clientWidth(),
	    ch = clientHeight();
	var nw = nodeRef.naturalWidth + 4 * margin,
	    nh = nodeRef.naturalHeight + 4 * margin;
	var windowRatio = cw / ch,
	    naturalRatio = nw / nh;
	if (nw >= cw && nh >= ch) {
		return windowRatio > naturalRatio ? ch / nh : cw / nw;
	} else if (nw >= cw && nh <= ch) {
		return cw / nw;
	} else if (nw <= cw && nh >= ch) {
		return ch / nh;
	} else if (nw <= cw && nh <= ch) {
		return 1;
	}
};

// 事件绑定
var addListenEventOf = exports.addListenEventOf = function addListenEventOf(event, handler) {
	window.addEventListener(event, handler, true);
};
var removeListenEventOf = exports.removeListenEventOf = function removeListenEventOf(event, handler) {
	window.removeEventListener(event, handler, true);
};

// 屏幕尺寸
var windowWidth = exports.windowWidth = function windowWidth() {
	return window.innerWidth;
};
var scrollWidth = exports.scrollWidth = function scrollWidth() {
	return document.body.scrollWidth;
};
var clientWidth = exports.clientWidth = function clientWidth() {
	return document.documentElement.clientWidth;
};
var windowHeight = exports.windowHeight = function windowHeight() {
	return window.innerHeight;
};
var scrollHeight = exports.scrollHeight = function scrollHeight() {
	return document.body.scrollHeight;
};
var clientHeight = exports.clientHeight = function clientHeight() {
	return document.documentElement.clientHeight;
};

// 移动端判断
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
var mobileCheck = exports.mobileCheck = function mobileCheck() {
	var isMobile = false;
	var ua = navigator.userAgent || navigator.vendor || window.opera;
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4))) {
		isMobile = true;
	}
	return isMobile;
};

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/index.js");


/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_prop_types__;

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "react-dom":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;

/***/ })

/******/ });
});