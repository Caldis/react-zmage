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
exports.push([module.i, ".backgroundLayer__2zBDq {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  cursor: -webkit-zoom-out;\n  cursor: zoom-out;\n  -webkit-transition: all 400ms;\n  transition: all 400ms;\n  background-color: rgba(255, 255, 255, 0);\n}\n", ""]);

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
exports.push([module.i, ".controls__2sOYg {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: absolute;\n  padding: 20px;\n  top: 0;\n  right: 0;\n  z-index: 90;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.zoomButton__3EA_v {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 7px;\n  width: 26px;\n  height: 26px;\n  cursor: pointer;\n  border: 1px solid black;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  will-change: clip-path;\n}\n.zoomButton__3EA_v:hover {\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.zoomButton__3EA_v:active {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.closeButton__1hkr- {\n  width: 40px;\n  height: 40px;\n  cursor: pointer;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  will-change: transform;\n}\n.closeButton__1hkr- .crossLine__3lngH {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 35px;\n  height: 1px;\n  background-color: black;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  will-change: transform;\n}\n.closeButton__1hkr-:hover {\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.closeButton__1hkr-:active {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.switchButton__11WN0 {\n  position: absolute;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  z-index: 110;\n  cursor: pointer;\n  background-color: black;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  -webkit-transform-origin: 50% 0;\n          transform-origin: 50% 0;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  will-change: transform, left, right, opacity;\n}\n.switchButton__11WN0 svg {\n  fill: white;\n}\n.switchButton__11WN0:hover {\n  -webkit-transform: scale(1.1) translateY(-50%);\n          transform: scale(1.1) translateY(-50%);\n}\n.switchButton__11WN0:active {\n  -webkit-transform: scale(1) translateY(-50%);\n          transform: scale(1) translateY(-50%);\n}\n.pages__1SqZ9 {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 6px 14px;\n  position: absolute;\n  left: 50%;\n  color: white;\n  font-size: 14px;\n  font-weight: bold;\n  z-index: 110;\n  background-color: black;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  will-change: bottom, opacity;\n}\n.imgAlt__1RLsW {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 20px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  color: black;\n  font-size: 18px;\n  z-index: 90;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  will-change: clip-path, opacity;\n}\n.imgText__2quxO {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 12px 20px;\n  position: absolute;\n  left: 0;\n  top: 230%;\n  color: white;\n  font-size: 16px;\n  z-index: 90;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: black;\n  -webkit-transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 400ms cubic-bezier(0.15, 1, 0.3, 1);\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  will-change: left, opacity;\n}\n", ""]);

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
exports.push([module.i, ".imageLayer__1CUlw {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transition: -webkit-box-shadow 0.3s;\n  transition: -webkit-box-shadow 0.3s;\n  transition: box-shadow 0.3s;\n  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;\n  will-change: transform, border-radius, border-width, box-shadow;\n}\n.loading__2ybtF {\n  display: inline-block;\n  z-index: 80;\n  width: 20px;\n  height: 20px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  -webkit-animation: rotate__DHJPZ 1.2s infinite linear;\n          animation: rotate__DHJPZ 1.2s infinite linear;\n}\n.loading__2ybtF i {\n  width: 9px;\n  height: 9px;\n  border-radius: 100%;\n  background-color: #108ee9;\n  -webkit-transform: scale(0.75);\n          transform: scale(0.75);\n  display: block;\n  position: absolute;\n  opacity: .3;\n  -webkit-animation: spinMove__2iL7L 1s infinite linear alternate;\n          animation: spinMove__2iL7L 1s infinite linear alternate;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n}\n.loading__2ybtF :first-child {\n  left: 0;\n  top: 0;\n}\n.loading__2ybtF :nth-child(2) {\n  right: 0;\n  top: 0;\n  -webkit-animation-delay: 0.4s;\n          animation-delay: 0.4s;\n}\n.loading__2ybtF :nth-child(3) {\n  right: 0;\n  bottom: 0;\n  -webkit-animation-delay: 0.8s;\n          animation-delay: 0.8s;\n}\n.loading__2ybtF :nth-child(4) {\n  left: 0;\n  bottom: 0;\n  -webkit-animation-delay: 1.2s;\n          animation-delay: 1.2s;\n}\n@-webkit-keyframes rotate__DHJPZ {\n  to {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg);\n  }\n}\n@keyframes rotate__DHJPZ {\n  to {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg);\n  }\n}\n@-webkit-keyframes spinMove__2iL7L {\n  to {\n    opacity: 1;\n  }\n}\n@keyframes spinMove__2iL7L {\n  to {\n    opacity: 1;\n  }\n}\n", ""]);

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
exports.push([module.i, ".positionLayer__18_Gk {\n  width: 100%;\n  height: 100vh;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.positionLayer__18_Gk > div {\n  position: absolute;\n  left: 50%;\n  width: 0;\n  height: 0;\n  z-index: 100;\n  visibility: hidden;\n  will-change: transform, top;\n}\n", ""]);

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

/***/ "./src/components/Background/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__("./src/components/Background/index.less");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 背景层
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 叠加半透明背景
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs

// Style


var Background = function (_React$Component) {
	_inherits(Background, _React$Component);

	function Background(props) {
		_classCallCheck(this, Background);

		var _this = _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this, props));

		_this.bgOverlayStyle = function (show) {
			return show ? { backgroundColor: 'rgba(255,255,255,1)' } : { backgroundColor: 'rgba(255,255,255,0)' };
		};

		return _this;
	}

	_createClass(Background, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    show = _props.show,
			    zoom = _props.zoom,
			    unmountSelf = _props.unmountSelf,
			    toggleZoom = _props.toggleZoom;

			return _react2.default.createElement('div', {
				className: _index2.default.backgroundLayer,
				onClick: zoom ? toggleZoom : unmountSelf,
				style: this.bgOverlayStyle(show)
			});
		}
	}]);

	return Background;
}(_react2.default.Component);

exports.default = Background;

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
                    controller.close && _react2.default.createElement(
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

var _index = __webpack_require__("./src/components/Image/index.less");

var _index2 = _interopRequireDefault(_index);

var _lerp = __webpack_require__("./src/utils/lerp.js");

var _lerp2 = _interopRequireDefault(_lerp);

var _utils = __webpack_require__("./src/utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 图片层
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 展示图片
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs

// Style

// Utils


// 移动端检测
var isMobile = (0, _utils.mobilecheck)();
// 图片边距
var IMAGE_MARGIN = isMobile ? 0 : 50;

var Image = function (_React$Component) {
    _inherits(Image, _React$Component);

    function Image(props) {
        _classCallCheck(this, Image);

        // 封面样式
        var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

        _this.getCoverStyle = function () {
            var coverNodeRef = _this.props.coverNodeRef;

            var coverStyle = { scale: 0, borderWidth: 0, borderRadius: 0 };
            if (coverNodeRef) {
                var coverNodeStyle = window.getComputedStyle(coverNodeRef);
                _this.coverNodeStyle = coverNodeStyle;
                coverStyle = {
                    scale: (parseInt(coverNodeStyle['width'] || 0) - 2 * parseInt(coverNodeStyle['border-width'] || 0)) / coverNodeRef.naturalWidth,
                    borderWidth: parseInt(coverNodeStyle['border-width'] || 0),
                    borderRadius: parseInt(coverNodeStyle['border-radius'] || 0)
                };
            }
            return coverStyle;
        };

        _this.setToCoverStyle = function () {
            var _this$props = _this.props,
                coverNodeRef = _this$props.coverNodeRef,
                remove = _this$props.remove;

            _this.resize.to({
                data: _this.getCoverStyle(),
                after: function after() {
                    // 显示封面原图
                    if (coverNodeRef) coverNodeRef.style.visibility = 'visible';
                    // 移除节点
                    remove();
                }
            });
        };

        _this.getPageFitStyle = function () {
            var coverNodeRef = _this.props.coverNodeRef;

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

        _this.setToPageFitStyle = function () {
            _this.resize.to({ data: _this.getPageFitStyle() });
        };

        _this.getOriginalStyle = function () {
            return {
                scale: 1,
                borderWidth: 0,
                borderRadius: 5
            };
        };

        _this.setToOriginalStyle = function () {
            _this.resize.to({ data: _this.getOriginalStyle() });
        };

        _this.handleSetStyle = function (curr) {
            var _this$props2 = _this.props,
                show = _this$props2.show,
                zoom = _this$props2.zoom,
                coverNodeRef = _this$props2.coverNodeRef;

            _this.setState({
                transStyle: {
                    // 插值样式
                    transform: 'translate3d(-50%, -50%, 0) scale3d(' + curr.scale + ', ' + curr.scale + ', 1)',
                    borderRadius: curr.borderRadius / curr.scale + 'px',
                    borderWidth: curr.borderWidth / curr.scale + 'px',
                    // 固定样式
                    boxShadow: show ? 'none' : _this.coverNodeStyle['box-shadow'],
                    boxSizing: _this.coverNodeStyle['box-sizing'],
                    border: _this.coverNodeStyle['border'],
                    // 无封面图片处理
                    maxWidth: coverNodeRef ? '' : zoom ? 'max-content' : 'calc(100vw - ' + 2 * IMAGE_MARGIN + 'px)',
                    maxHeight: coverNodeRef ? '' : zoom ? 'max-content' : 'calc(100vh - ' + 2 * IMAGE_MARGIN + 'px)'
                }
            });
        };

        _this.coverNodeStyle = {};

        _this.state = {
            // 加载完成
            onLoad: true,
            // 加载错误
            onError: false,
            // 翻页方向
            direction: '',
            // 样式
            transStyle: {}
        };
        return _this;
    }

    _createClass(Image, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.resize = new _lerp2.default({
                data: this.getCoverStyle(),
                poster: this.handleSetStyle
            });
            (0, _utils.addListenEventOf)('resize', this.setToPageFitStyle);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var show = nextProps.show,
                zoom = nextProps.zoom,
                page = nextProps.page;

            if (show) {
                if (zoom) {
                    this.setToOriginalStyle();
                } else {
                    this.setToPageFitStyle();
                }
            } else {
                this.setToCoverStyle();
            }
            if (page) {
                this.setState({
                    onLoad: true,
                    onError: false
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _utils.removeListenEventOf)('resize', this.setToPageFitStyle);
        }

        /**
         * 状态切换设置大小
         **/


        /**
         * 尺寸控制器
         **/

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                zoom = _props.zoom,
                page = _props.page,
                imageSet = _props.imageSet,
                toggleZoom = _props.toggleZoom;
            var _state = this.state,
                onLoad = _state.onLoad,
                onError = _state.onError,
                transStyle = _state.transStyle;

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
                _react2.default.createElement('img', {
                    key: page,
                    className: _index2.default.imageLayer,
                    style: transStyle,
                    src: imageSet[page].src,
                    alt: imageSet[page].alt,
                    onLoad: function onLoad() {
                        return _this2.setState({ onLoad: false });
                    },
                    onError: function onError() {
                        return _this2.setState({ onError: true });
                    },
                    onClick: zoom ? toggleZoom : function () {}
                })
            );
        }
    }]);

    return Image;
}(_react2.default.Component);

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

var _index = __webpack_require__("./src/components/Position/index.less");

var _index2 = _interopRequireDefault(_index);

var _lerp = __webpack_require__("./src/utils/lerp.js");

var _lerp2 = _interopRequireDefault(_lerp);

var _utils = __webpack_require__("./src/utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 位移控制层
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 获取封面位置并控制图片位移
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs

// Style

// Utils


// TODO: CONFIG
var IMAGE_MARGIN = 50;

var Position = function (_React$Component) {
	_inherits(Position, _React$Component);

	function Position(props) {
		_classCallCheck(this, Position);

		var _this = _possibleConstructorReturn(this, (Position.__proto__ || Object.getPrototypeOf(Position)).call(this, props));

		_this.gerZoomMovePositionRange = function () {
			var _this$props = _this.props,
			    zoom = _this$props.zoom,
			    page = _this$props.page,
			    imageSet = _this$props.imageSet;

			var image = new Image();
			image.src = imageSet[page].src;
			var naturalWidth = image.naturalWidth;
			var naturalHeight = image.naturalHeight;
			_this.setState({
				naturalSize: !zoom ? { naturalWidth: naturalWidth, naturalHeight: naturalHeight } : null,
				moveRange: !zoom ? {
					x: naturalWidth - (0, _utils.clientWidth)() + 2 * IMAGE_MARGIN,
					y: naturalHeight - (0, _utils.clientHeight)() + 2 * IMAGE_MARGIN
				} : null
			});
		};

		_this.handleMouseMove = function (e) {
			var _this$state = _this.state,
			    naturalSize = _this$state.naturalSize,
			    mr = _this$state.moveRange;
			var nw = naturalSize.naturalWidth,
			    nh = naturalSize.naturalHeight;

			var cw = (0, _utils.clientWidth)();
			var ch = (0, _utils.clientHeight)();
			var mouseX = e.clientX;
			var mouseY = e.clientY;
			// 计算偏移量
			var imgPosX = nw > cw ? (nw - cw) / 2 + IMAGE_MARGIN - mr.x * (mouseX / cw) : 0;
			var imgPosY = nh > ch ? (nh - ch) / 2 + IMAGE_MARGIN - mr.y * (mouseY / ch) : 0;
			// 设置图片位置
			_this.move.to({
				data: {
					x: imgPosX,
					y: imgPosY
				}
			});
		};

		_this.getCoverCenterPosition = function () {
			var _this$props2 = _this.props,
			    page = _this$props2.page,
			    coverNodeRef = _this$props2.coverNodeRef;

			var coverCenterPosition = { x: 0, y: 0 };
			if (coverNodeRef) {
				var coverNodeRect = coverNodeRef.getBoundingClientRect();
				coverCenterPosition = page === 0 ? {
					x: -(0, _utils.windowWidth)() / 2 + coverNodeRect.left + coverNodeRect.width / 2,
					y: -(0, _utils.windowHeight)() / 2 + coverNodeRect.top + coverNodeRect.height / 2
				} : {
					x: 0,
					y: -(0, _utils.windowHeight)()
				};
			}
			return coverCenterPosition;
		};

		_this.moveToCoverCenterPosition = function () {
			_this.move.to({ data: _this.getCoverCenterPosition() });
		};

		_this.getPageCenterPosition = function () {
			return { x: 0, y: 0 };
		};

		_this.moveToPageCenterPosition = function () {
			_this.move.to({ data: _this.getPageCenterPosition() });
		};

		_this.handleMoveCenterPosition = function (curr) {
			var show = _this.props.show;

			_this.setState({
				transStyle: {
					visibility: 'visible',
					transform: 'translate3d(' + curr.x + 'px, ' + curr.y + 'px, 0)',
					top: show ? '' : (0, _utils.windowHeight)() / 2 - (window.pageYOffset - _this.initialPageOffset) + 'px'
				}
			});
		};

		_this.state = {
			// 原始尺寸
			naturalSize: null,
			// 移动范围
			moveRange: null,
			// 样式
			transStyle: {}
		};
		return _this;
	}

	_createClass(Position, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.move = new _lerp2.default({
				data: this.getCoverCenterPosition(),
				poster: this.handleMoveCenterPosition
			});
			// 记录初始页面高度
			this.initialPageOffset = window.pageYOffset;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var show = nextProps.show,
			    zoom = nextProps.zoom;

			if (show) {
				this.moveToPageCenterPosition();
				if (zoom) {
					this.gerZoomMovePositionRange();
					(0, _utils.addListenEventOf)('mousemove', this.handleMouseMove);
				} else {
					(0, _utils.removeListenEventOf)('mousemove', this.handleMouseMove);
				}
			} else {
				this.moveToCoverCenterPosition();
				(0, _utils.removeListenEventOf)('mousemove', this.handleMouseMove);
			}
		}

		/**
   * 放大查看
   **/


		/**
   * 状态切换
   **/


		/**
   * 位移控制
   **/

	}, {
		key: 'render',
		value: function render() {
			var transStyle = this.state.transStyle;

			return _react2.default.createElement(
				'div',
				{ className: _index2.default.positionLayer },
				_react2.default.createElement(
					'div',
					{ style: transStyle },
					this.props.children
				)
			);
		}
	}]);

	return Position;
}(_react2.default.Component);

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
                (0, _utils.addListenEventOf)('wheel', _this.handleScroll);
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
            (0, _utils.removeListenEventOf)('wheel', this.handleScroll);
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
	controller: {
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
	},

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
var mobilecheck = exports.mobilecheck = function mobilecheck() {
	var isMobile = false;
	var ua = navigator.userAgent || navigator.vendor || window.opera;
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4))) {
		isMobile = true;
	}
	return isMobile;
};

/***/ }),

/***/ "./src/utils/lerp.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 插值函数
 * 传入一个目标值，然后会循环调用初始化中传入的 poster 函数，返回生成的中间值
 * 使用方式
 * 1. 初始化
 * const lerp = new Lerp({
 *     data: {x: 0, y: 0},
 *     poster: (curr, diff) => {}
 * })
 * 2. 启动
 * lerp.go({
 *     x: imgPosX,
 *     y: imgPosY
 * })
 * 3. 中断
 * lerp.stop()
 **/

var Lerp = function Lerp(_ref) {
	var data = _ref.data,
	    poster = _ref.poster;

	_classCallCheck(this, Lerp);

	_initialiseProps.call(this);

	// 是否正在执行插值循环
	this.looping = false;
	// 目标池
	this.pool = data || { value: 0
		// 当前值
	};this.current = data || { value: 0
		// 发送器
	};this._postValue = poster || this._postValue;
	// 插值系数
	this.attr = 0.25;
	// 定时器引用
	this._timer = null;
}

// *******
// 接口方法
// *******
// 启动循环

// 终止循环


// *******
// 内部方法
// *******
// 执行循环


// *******
// 插值函数
// *******
// 线性插值


// *******
// 重载函数
// *******
// 发送器

// 前置函数

// 后置函数
;

var _initialiseProps = function _initialiseProps() {
	var _this = this;

	this.to = function (_ref2) {
		var data = _ref2.data,
		    before = _ref2.before,
		    after = _ref2.after,
		    attr = _ref2.attr;

		// 更新参数
		_this.pool = data || _this.pool;
		// 前置与后置函数
		_this._before = before || _this._before;
		_this._after = after || _this._after;
		// 插值系数
		_this.attr = attr || _this.attr;
		// 启动循环
		_this._startLoop();
	};

	this.stop = this._stopLoop;

	this._startLoop = function () {
		_this._before();
		!_this.looping && _this._runLoop();
		_this.looping = true;
	};

	this._runLoop = function () {
		_this._timer = window.requestAnimationFrame(_this._loop);
	};

	this._loop = function () {
		// 插值
		var pulse = {};
		for (var key in _this.pool) {
			pulse[key] = _this._lerp(_this.current[key], _this.pool[key]);
		}
		// 更新当前值
		for (var _key in _this.current) {
			_this.current[_key] += pulse[_key];
		}
		// 发送计算结果
		_this._postValue(_this.current, pulse);

		// 根据处理结果选择是否需要继续迭代
		var needLoop = false;
		for (var _key2 in _this.current) {
			if (Math.abs(_this.pool[_key2] - _this.current[_key2]) > 0.001) {
				needLoop = true;
			}
		}
		needLoop ? _this._runLoop() : _this._stopLoop();
	};

	this._stopLoop = function () {
		_this.looping && window.cancelAnimationFrame(_this._timer);
		_this.looping = false;
		_this._after();
	};

	this._lerp = function (src, dest) {
		return (dest - src) * _this.attr;
	};

	this._postValue = function (curr, diff) {};

	this._before = function () {};

	this._after = function () {};
};

exports.default = Lerp;

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