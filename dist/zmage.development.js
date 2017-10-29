(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react-dom"), require("react"), require("prop-types"), require("react-transition-group"));
	else if(typeof define === 'function' && define.amd)
		define(["react-dom", "react", "prop-types", "react-transition-group"], factory);
	else if(typeof exports === 'object')
		exports["react-zmage"] = factory(require("react-dom"), require("react"), require("prop-types"), require("react-transition-group"));
	else
		root["react-zmage"] = factory(root["react-dom"], root["react"], root["prop-types"], root["react-transition-group"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_react_dom__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react_transition_group__) {
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

/***/ "./node_modules/css-loader/index.js?{\"modules\":true,\"importLoaders\":1,\"localIdentName\":\"[local]__[hash:base64:5]\"}!./node_modules/postcss-loader/lib/index.js?{\"ident\":\"postcss\"}!./node_modules/less-loader/dist/cjs.js!./src/components/Img/index.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "/**\n * 图片放大叠层组件样式\n **/\n.imageOverlayContainer__i3Lrv {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100vw;\n  height: 100vh;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.imageOverlayContainer__i3Lrv .zoomButton__3EA_v {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: absolute;\n  top: 27px;\n  right: 80px;\n  width: 26px;\n  height: 26px;\n  z-index: 110;\n  cursor: pointer;\n  border: 1px solid black;\n  -webkit-transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  will-change: clip-path;\n}\n.imageOverlayContainer__i3Lrv .zoomButton__3EA_v:hover {\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.imageOverlayContainer__i3Lrv .zoomButton__3EA_v:active {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.imageOverlayContainer__i3Lrv .closeButton__1hkr- {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  width: 40px;\n  height: 40px;\n  z-index: 110;\n  cursor: pointer;\n  -webkit-transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  will-change: transform;\n}\n.imageOverlayContainer__i3Lrv .closeButton__1hkr- .crossLine__3lngH {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 35px;\n  height: 1px;\n  background-color: black;\n  -webkit-transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  will-change: transform;\n}\n.imageOverlayContainer__i3Lrv .closeButton__1hkr-:hover {\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.imageOverlayContainer__i3Lrv .closeButton__1hkr-:active {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.imageOverlayContainer__i3Lrv .switchButton__11WN0 {\n  position: absolute;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  z-index: 110;\n  cursor: pointer;\n  background-color: black;\n  -webkit-transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  -webkit-transform-origin: 50% 0;\n          transform-origin: 50% 0;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  will-change: transform, left, right, opacity;\n}\n.imageOverlayContainer__i3Lrv .switchButton__11WN0 svg {\n  fill: white;\n}\n.imageOverlayContainer__i3Lrv .switchButton__11WN0:hover {\n  -webkit-transform: scale(1.1) translateY(-50%);\n          transform: scale(1.1) translateY(-50%);\n}\n.imageOverlayContainer__i3Lrv .switchButton__11WN0:active {\n  -webkit-transform: scale(1) translateY(-50%);\n          transform: scale(1) translateY(-50%);\n}\n.imageOverlayContainer__i3Lrv .pages__1SqZ9 {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 6px 14px;\n  position: absolute;\n  left: 50%;\n  color: white;\n  font-size: 14px;\n  font-weight: bold;\n  z-index: 110;\n  background-color: black;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  will-change: bottom, opacity;\n}\n.imageOverlayContainer__i3Lrv .imgAlt__1RLsW {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 20px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  color: black;\n  font-size: 18px;\n  z-index: 90;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  will-change: clip-path, opacity;\n}\n.imageOverlayContainer__i3Lrv .imgText__2quxO {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 12px 20px;\n  position: absolute;\n  left: 0;\n  top: 230%;\n  color: white;\n  font-size: 16px;\n  z-index: 90;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: black;\n  -webkit-transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: all 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  will-change: left, opacity;\n}\n.imageOverlayContainer__i3Lrv .loading__2ybtF {\n  position: absolute;\n  left: 50vw;\n  top: 50vh;\n  margin: -10px -10px 0 0;\n  display: inline-block;\n  z-index: 80;\n  width: 20px;\n  height: 20px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  -webkit-animation: antRotate__3Pam2 1.2s infinite linear;\n          animation: antRotate__3Pam2 1.2s infinite linear;\n}\n.imageOverlayContainer__i3Lrv .loading__2ybtF i {\n  width: 9px;\n  height: 9px;\n  border-radius: 100%;\n  background-color: #108ee9;\n  -webkit-transform: scale(0.75);\n          transform: scale(0.75);\n  display: block;\n  position: absolute;\n  opacity: .3;\n  -webkit-animation: antSpinMove__2wABL 1s infinite linear alternate;\n          animation: antSpinMove__2wABL 1s infinite linear alternate;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n}\n.imageOverlayContainer__i3Lrv .loading__2ybtF :first-child {\n  left: 0;\n  top: 0;\n}\n.imageOverlayContainer__i3Lrv .loading__2ybtF :nth-child(2) {\n  right: 0;\n  top: 0;\n  -webkit-animation-delay: 0.4s;\n          animation-delay: 0.4s;\n}\n.imageOverlayContainer__i3Lrv .loading__2ybtF :nth-child(3) {\n  right: 0;\n  bottom: 0;\n  -webkit-animation-delay: 0.8s;\n          animation-delay: 0.8s;\n}\n.imageOverlayContainer__i3Lrv .loading__2ybtF :nth-child(4) {\n  left: 0;\n  bottom: 0;\n  -webkit-animation-delay: 1.2s;\n          animation-delay: 1.2s;\n}\n.imageOverlayContainer__i3Lrv .imgWrapper__3ifcP {\n  z-index: 100;\n  width: 0;\n  height: 0;\n  -webkit-transition: -webkit-transform 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: -webkit-transform 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: transform 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  transition: transform 650ms cubic-bezier(0.15, 1, 0.3, 1), -webkit-transform 650ms cubic-bezier(0.15, 1, 0.3, 1);\n  will-change: transform;\n}\n.imageOverlayContainer__i3Lrv .imgWrapper__3ifcP img {\n  -o-object-fit: contain;\n     object-fit: contain;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transition: 0.6s 0.05s max-width, 0.6s 0.05s max-height, 325ms opacity;\n  transition: 0.6s 0.05s max-width, 0.6s 0.05s max-height, 325ms opacity;\n  will-change: max-width, max-height, width, height;\n}\n.imageOverlayContainer__i3Lrv .backgroundOverlay__3_UE9 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100vw;\n  height: 100vh;\n  cursor: -webkit-zoom-out;\n  cursor: zoom-out;\n  -webkit-transition: all 650ms;\n  transition: all 650ms;\n}\n@-webkit-keyframes antRotate__3Pam2 {\n  to {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg);\n  }\n}\n@keyframes antRotate__3Pam2 {\n  to {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg);\n  }\n}\n@-webkit-keyframes antSpinMove__2wABL {\n  to {\n    opacity: 1;\n  }\n}\n@keyframes antSpinMove__2wABL {\n  to {\n    opacity: 1;\n  }\n}\n.enter__2606y img {\n  opacity: 0;\n}\n.enterFromLeft__1IBEc {\n  -webkit-transform: translate(-40px, 0) !important;\n          transform: translate(-40px, 0) !important;\n}\n.enterFromLeft__1IBEc img {\n  opacity: 0;\n}\n.enterFromRight__1SrGD {\n  -webkit-transform: translate(40px, 0) !important;\n          transform: translate(40px, 0) !important;\n}\n.enterFromRight__1SrGD img {\n  opacity: 0;\n}\n.enter__2606y.enterActive__D5xMc {\n  -webkit-transform: translate(0, 0) !important;\n          transform: translate(0, 0) !important;\n}\n.enter__2606y.enterActive__D5xMc img {\n  opacity: 0;\n}\n.leave__1l9Wg img {\n  opacity: 1;\n}\n.leaveToLeft__GccD4 img {\n  opacity: 1;\n}\n.leaveToRight__2A5i3 img {\n  opacity: 1;\n}\n.leave__1l9Wg.leaveActive__GVp5I img {\n  opacity: 0;\n}\n.leaveToLeft__GccD4.leaveActive__GVp5I {\n  -webkit-transform: translate(-40px, 0) !important;\n          transform: translate(-40px, 0) !important;\n}\n.leaveToLeft__GccD4.leaveActive__GVp5I img {\n  opacity: 0;\n}\n.leaveToRight__2A5i3.leaveActive__GVp5I {\n  -webkit-transform: translate(40px, 0) !important;\n          transform: translate(40px, 0) !important;\n}\n.leaveToRight__2A5i3.leaveActive__GVp5I img {\n  opacity: 0;\n}\n", ""]);

// exports
exports.locals = {
	"imageOverlayContainer": "imageOverlayContainer__i3Lrv",
	"zoomButton": "zoomButton__3EA_v",
	"closeButton": "closeButton__1hkr-",
	"crossLine": "crossLine__3lngH",
	"switchButton": "switchButton__11WN0",
	"pages": "pages__1SqZ9",
	"imgAlt": "imgAlt__1RLsW",
	"imgText": "imgText__2quxO",
	"loading": "loading__2ybtF",
	"antRotate": "antRotate__3Pam2",
	"antSpinMove": "antSpinMove__2wABL",
	"imgWrapper": "imgWrapper__3ifcP",
	"backgroundOverlay": "backgroundOverlay__3_UE9",
	"enter": "enter__2606y",
	"enterFromLeft": "enterFromLeft__1IBEc",
	"enterFromRight": "enterFromRight__1SrGD",
	"enterActive": "enterActive__D5xMc",
	"leave": "leave__1l9Wg",
	"leaveToLeft": "leaveToLeft__GccD4",
	"leaveToRight": "leaveToRight__2A5i3",
	"leaveActive": "leaveActive__GVp5I"
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
	if (!options.singleton) options.singleton = isOldIE();

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

/***/ "./src/components/Img/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageOverlay = exports.showImage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = __webpack_require__("react-transition-group");

var _index = __webpack_require__("./src/components/Img/index.less");

var _index2 = _interopRequireDefault(_index);

var _stateStyle = __webpack_require__("./src/components/Img/stateStyle.js");

var _config = __webpack_require__("./src/config/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 图片放大叠层组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs

// Styles

// Config


var imageWrapperId = function imageWrapperId(current) {
  return 'zmage-' + current + '-wrapper';
};
var imageId = function imageId(current) {
  return 'zmage-' + current;
};

// 图片放大遮罩

var ImageOverlay = function (_React$Component) {
  _inherits(ImageOverlay, _React$Component);

  function ImageOverlay(props) {
    _classCallCheck(this, ImageOverlay);

    var _this = _possibleConstructorReturn(this, (ImageOverlay.__proto__ || Object.getPrototypeOf(ImageOverlay)).call(this, props));

    _this.mountSelf = function () {
      var coverNodeRef = _this.props.coverNodeRef;
      // 隐藏封面原图

      if (coverNodeRef) coverNodeRef.style.visibility = 'hidden';
      // 显示遮罩
      _this.setState({ show: true }, function () {
        // 添加键盘监听
        _this.addListenKeyDown();
      });
    };

    _this.unmountSelf = function () {
      var _this$props = _this.props,
          coverNodeRef = _this$props.coverNodeRef,
          overlayNodeRef = _this$props.overlayNodeRef;
      var current = _this.state.current;

      _this.setState({ show: false }, function () {
        // 移除键盘监听
        _this.removeListenKeyDown();
        // 显示封面原图（当前不为第一页时，直接显示, 遮罩从上方移除）
        if (coverNodeRef && current !== 0) coverNodeRef.style.visibility = 'visible';
        setTimeout(function () {
          // 显示封面原图（当前为第一页时，延迟显示）
          if (coverNodeRef && current === 0) coverNodeRef.style.visibility = 'visible';
          // 移除遮罩节点
          overlayNodeRef && overlayNodeRef.remove();
        }, _config.animateDuration);
      });
    };

    _this.handleSwitchPages = function (direction) {
      return function () {
        var imageSet = _this.props.imageSet;
        var current = _this.state.current;

        _this.setState({
          current: direction === "prev" ? Math.abs(imageSet.length + current - 1) % imageSet.length : (current + 1) % imageSet.length,
          direction: direction,
          onLoad: true,
          onError: false
        });
      };
    };

    _this.handleToggleZoom = function () {
      var _this$state = _this.state,
          zoom = _this$state.zoom,
          zoomMargin = _this$state.zoomMargin,
          current = _this$state.current;

      var zoomPosId = imageWrapperId(current);
      var zoomPos = document.getElementById(zoomPosId);
      var zoomNodeId = imageId(current);
      var zoomNode = document.getElementById(zoomNodeId);
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var naturalWidth = zoomNode.naturalWidth;
      var naturalHeight = zoomNode.naturalHeight;
      _this.setState({
        zoom: !zoom,
        zoomPos: zoomPos,
        zoomNode: zoomNode,
        zoomSize: !zoom ? { naturalWidth: naturalWidth, naturalHeight: naturalHeight } : null,
        zoomRange: !zoom ? {
          x: naturalWidth - windowWidth + 2 * zoomMargin,
          y: naturalHeight - windowHeight + 2 * zoomMargin
        } : null
      }, function () {
        var zoom = _this.state.zoom;
        // 根据缩放选择添加或移除鼠标移动

        zoom ? _this.addListenMouseMove() : _this.removeListenMouseMove();
      });
    };

    _this.addListenMouseMove = function () {
      setTimeout(function () {
        var _this$state2 = _this.state,
            zoom = _this$state2.zoom,
            zoomPos = _this$state2.zoomPos;

        if (zoom && zoomPos) {
          window.addEventListener("mousemove", _this.handleMouseMove, true);
          zoomPos.style.transition = 'none';
        }
      }, _config.animateDuration);
    };

    _this.removeListenMouseMove = function () {
      var zoomPos = _this.state.zoomPos;

      window.removeEventListener("mousemove", _this.handleMouseMove, true);
      zoomPos.style.transform = 'translate(0,0)';
      zoomPos.style.transition = 'transform ' + _config.animateDuration + 'ms ' + _config.animationFunc;
    };

    _this.handleKeyDown = function (e) {
      var zoom = _this.state.zoom;

      var toPrevPage = _this.handleSwitchPages("prev");
      var toNextPage = _this.handleSwitchPages("next");
      switch (e.key) {
        case "ArrowLeft":
          // 上一张
          !zoom && toPrevPage();
          break;
        case "ArrowRight":
          // 下一张
          !zoom && toNextPage();
          break;
        case " ":
          // 缩放
          _this.handleToggleZoom();
          break;
        case "Escape":
          // 退出
          zoom ? _this.handleToggleZoom() : _this.unmountSelf();
          break;
        default:
          return;
      }
      // 阻止默认事件
      e.preventDefault();
    };

    _this.addListenKeyDown = function () {
      window.addEventListener("keydown", _this.handleKeyDown, true);
    };

    _this.removeListenKeyDown = function () {
      window.removeEventListener("keydown", _this.handleKeyDown, true);
    };

    _this.handleMouseMove = function (e) {
      var _this$state3 = _this.state,
          zoomPos = _this$state3.zoomPos,
          zoomSize = _this$state3.zoomSize,
          zoomRange = _this$state3.zoomRange,
          zoomMargin = _this$state3.zoomMargin;
      var naturalWidth = zoomSize.naturalWidth,
          naturalHeight = zoomSize.naturalHeight;

      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var mouseX = e.clientX;
      var mouseY = e.clientY;
      // 计算偏移量
      var imgPosX = naturalWidth > windowWidth ? (naturalWidth - windowWidth) / 2 + zoomMargin - zoomRange.x * (mouseX / windowWidth) : 0;
      var imgPosY = naturalHeight > windowHeight ? (naturalHeight - windowHeight) / 2 + zoomMargin - zoomRange.y * (mouseY / windowHeight) : 0;
      // 设置图片位置
      zoomPos.style.transform = 'translate(' + imgPosX + 'px, ' + imgPosY + 'px)';
    };

    _this.state = {
      // 显示
      show: false,
      // 缩放
      zoom: false, // 是否缩放
      zoomNode: null, // 目标节点
      zoomSize: null, // 原始尺寸
      zoomRange: null, // 移动范围
      zoomMargin: 100, // 移动边距
      // 页数
      current: 0,
      // 切换方向
      direction: null,
      // 加载完成
      onLoad: false,
      // 加载错误
      onError: false
    };
    return _this;
  }

  _createClass(ImageOverlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      setTimeout(this.mountSelf, 100);
    }

    // 显示

    // 移除


    // 切换页面

    // 切换缩放

    // 开始监听鼠标移动

    // 停止监听鼠标移动


    // 关联键盘快捷键

    // 开始监听键盘快捷键

    // 停止监听键盘快捷键


    // 处理鼠标移动

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          coverNodeRef = _props.coverNodeRef,
          lazyLoad = _props.lazyLoad,
          indicator = _props.indicator,
          imageSet = _props.imageSet;
      var _state = this.state,
          show = _state.show,
          zoom = _state.zoom,
          current = _state.current,
          direction = _state.direction,
          onLoad = _state.onLoad,
          onError = _state.onError;


      var hasImageSet = imageSet && imageSet.constructor === Array;
      var zmageWrapperId = imageWrapperId(current);
      var zmageId = imageId(current);

      return _react2.default.createElement(
        'div',
        { className: _index2.default.imageOverlayContainer },
        !zoom && _react2.default.createElement('div', { className: _index2.default.zoomButton, style: (0, _stateStyle.zoomStyle)(show), onClick: this.handleToggleZoom }),
        _react2.default.createElement(
          'div',
          { className: _index2.default.closeButton, onClick: zoom ? this.handleToggleZoom : this.unmountSelf },
          _react2.default.createElement('div', { className: _index2.default.crossLine, style: (0, _stateStyle.lineL)(show) }),
          _react2.default.createElement('div', { className: _index2.default.crossLine, style: (0, _stateStyle.lineR)(show) })
        ),
        hasImageSet && !zoom && _react2.default.createElement(
          'div',
          { className: _index2.default.switchButton, style: (0, _stateStyle.prevStyle)(show), onClick: this.handleSwitchPages("prev") },
          _react2.default.createElement(
            'svg',
            { viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' }),
            _react2.default.createElement('path', { d: 'M0-.5h24v24H0z', fill: 'none' })
          )
        ),
        hasImageSet && !zoom && _react2.default.createElement(
          'div',
          { className: _index2.default.switchButton, style: (0, _stateStyle.nextStyle)(show), onClick: this.handleSwitchPages("next") },
          _react2.default.createElement(
            'svg',
            { viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' }),
            _react2.default.createElement('path', { d: 'M0-.25h24v24H0z', fill: 'none' })
          )
        ),
        hasImageSet && !zoom && _react2.default.createElement(
          'div',
          { className: _index2.default.pages, style: (0, _stateStyle.pagesStyle)(show) },
          _react2.default.createElement(
            'span',
            null,
            current + 1 + ' / ' + imageSet.length
          )
        ),
        hasImageSet && !zoom ? imageSet[current].alt && _react2.default.createElement(
          'div',
          { className: _index2.default.imgAlt, style: (0, _stateStyle.altStyle)(show) },
          imageSet[current].alt
        ) : imageSet.alt && _react2.default.createElement(
          'div',
          { className: _index2.default.imgAlt, style: (0, _stateStyle.altStyle)(show) },
          imageSet.alt
        ),
         false ? imageSet[current].text && _react2.default.createElement(
          'div',
          { className: _index2.default.imgText },
          imageSet[current].text
        ) : imageSet.text && _react2.default.createElement(
          'div',
          { className: _index2.default.imgText },
          imageSet.text
        ),
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
          _reactTransitionGroup.CSSTransitionGroup,
          {
            style: { zIndex: 100 },
            component: 'div',
            transitionEnter: true,
            transitionLeave: true,
            transitionEnterTimeout: _config.animateDuration / 2,
            transitionLeaveTimeout: _config.animateDuration / 2,
            transitionName: {
              enter: direction === "next" ? _index2.default.enterFromRight : _index2.default.enterFromLeft,
              enterActive: _index2.default.enterActive,
              leave: direction === "next" ? _index2.default.leaveToLeft : _index2.default.leaveToRight,
              leaveActive: _index2.default.leaveActive
            }
          },
          _react2.default.createElement(
            'div',
            {
              id: zmageWrapperId,
              key: zmageWrapperId,
              className: _index2.default.imgWrapper,
              style: (0, _stateStyle.imageWrapperStyle)(show, current, coverNodeRef)
            },
            _react2.default.createElement('img', {
              id: zmageId,
              key: zmageId,
              src: hasImageSet ? imageSet[current].src : imageSet.src,
              alt: hasImageSet ? imageSet[current].alt : imageSet.alt,
              onLoad: function onLoad() {
                return _this2.setState({ onLoad: false });
              },
              onError: function onError() {
                return _this2.setState({ onError: true });
              },
              onClick: zoom ? this.handleToggleZoom : function () {},
              style: (0, _stateStyle.imageStyle)(zmageId, show, zoom, coverNodeRef)
            })
          )
        ),
        _react2.default.createElement('div', {
          className: _index2.default.backgroundOverlay,
          onClick: zoom ? this.handleToggleZoom : this.unmountSelf,
          style: (0, _stateStyle.bgOverlayStyle)(show)
        })
      );
    }
  }]);

  return ImageOverlay;
}(_react2.default.Component);
// 默认参数


ImageOverlay.defaultProps = {
  // 原图封面节点引用
  coverNodeRef: null,
  // 遮罩节点引用
  overlayNodeRef: null,
  // 图片参数
  imageSet: null
  // 参数类型
};ImageOverlay.propTypes = {
  // 原图封面节点引用
  coverNodeRef: _propTypes2.default.object,
  // 遮罩节点引用
  overlayNodeRef: _propTypes2.default.object,
  // 图片参数
  imageSet: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_config.imageType), _config.imageType])

  // 调用以显示 ImageOverlay
};var showImage = function showImage(_ref) {
  var id = _ref.id,
      lazyLoad = _ref.lazyLoad,
      indicator = _ref.indicator,
      imageSet = _ref.imageSet;

  // 封面图片节点
  var coverNodeRef = document.querySelector('#' + id);

  // 容器节点ID
  var overlayId = id + '-overlay';

  // 移除先前的容器节点
  var previousOverlayNode = document.querySelector('#' + overlayId);
  previousOverlayNode && previousOverlayNode.remove();

  // 插入新的容器节点
  var overlayNode = document.createElement('div');
  overlayNode.id = overlayId;
  document.body.appendChild(overlayNode);
  var overlayNodeRef = document.querySelector('#' + overlayId);

  // 渲染组件容器节点
  overlayNodeRef && _reactDom2.default.render(_react2.default.createElement(ImageOverlay, {
    coverNodeRef: coverNodeRef,
    overlayNodeRef: overlayNodeRef,
    lazyLoad: lazyLoad,
    indicator: indicator,
    imageSet: imageSet
  }), overlayNodeRef);

  // 返回容器节点引用, 调用 remove() 即可移除
  return overlayNodeRef;
};

exports.showImage = showImage;
exports.ImageOverlay = ImageOverlay;
exports.default = ImageOverlay;

/***/ }),

/***/ "./src/components/Img/index.less":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js?{\"modules\":true,\"importLoaders\":1,\"localIdentName\":\"[local]__[hash:base64:5]\"}!./node_modules/postcss-loader/lib/index.js?{\"ident\":\"postcss\"}!./node_modules/less-loader/dist/cjs.js!./src/components/Img/index.less");
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

/***/ "./src/components/Img/stateStyle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 剥离出来的组件样式
 **/

// 放大按钮样式
var zoomStyle = exports.zoomStyle = function zoomStyle(show) {
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
};var lineL = exports.lineL = function lineL(show) {
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
var lineR = exports.lineR = function lineR(show) {
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
};var prevStyle = exports.prevStyle = function prevStyle(show) {
  return show ? {
    left: 0,
    opacity: 1
  } : {
    left: -55,
    opacity: 0
  };
};
var nextStyle = exports.nextStyle = function nextStyle(show) {
  return show ? {
    right: 0,
    opacity: 1
  } : {
    right: -55,
    opacity: 0

    // 页数指示样式
  };
};var pagesStyle = exports.pagesStyle = function pagesStyle(show) {
  return show ? {
    bottom: 0,
    opacity: 1
  } : {
    bottom: -31,
    opacity: 0

    // 图片标题样式
  };
};var altStyle = exports.altStyle = function altStyle(show) {
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

    // 图片本体样式
  };
};var imageWrapperStyle = exports.imageWrapperStyle = function imageWrapperStyle(show, current, coverNodeRef) {
  // 页面中心点位置
  var centerPosition = "translate(0, 0)";
  // 封面中心点位置 (如果当前为第一页，则返回封面位置，否则向上隐藏)
  var coverNodeRect = coverNodeRef ? coverNodeRef.getBoundingClientRect() : {
    bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0
  };
  var coverPosition = current === 0 ? "translate(calc(-50vw + " + (coverNodeRect.left + coverNodeRect.width / 2) + "px), calc(-50vh + " + (coverNodeRect.top + coverNodeRect.height / 2) + "px))" : "translate(0, -100vh)";
  return show ? {
    WebkitTransform: centerPosition,
    transform: centerPosition
  } : {
    WebkitTransform: coverPosition,
    transform: coverPosition
  };
};
var imageStyle = exports.imageStyle = function imageStyle(zmageId, show, zoom, coverNodeRef) {
  // 封面尺寸
  var coverNodeRect = coverNodeRef ? coverNodeRef.getBoundingClientRect() : {
    bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0
    // 大图原始尺寸
  };var naturalWidth = void 0,
      naturalHeight = void 0;
  if (zoom) {
    var zmageNode = document.getElementById(zmageId);
    naturalWidth = zmageNode.naturalWidth;
    naturalHeight = zmageNode.naturalHeight;
  }
  return show ? {
    width: zoom ? naturalWidth : 'initial',
    height: zoom ? naturalHeight : 'initial',
    maxWidth: zoom ? naturalWidth : '90vw',
    maxHeight: zoom ? naturalHeight : '90vh',
    border: 0,
    borderRadius: 6
  } : {
    maxWidth: coverNodeRect.width,
    maxHeight: coverNodeRect.height,
    border: coverNodeRef && coverNodeRef.style.border || 0,
    borderRadius: coverNodeRef && coverNodeRef.style.borderRadius || 0
  };
};

// 背景遮罩样式
var bgOverlayStyle = exports.bgOverlayStyle = function bgOverlayStyle(show) {
  return show ? { backgroundColor: 'white' } : { backgroundColor: 'transparent' };
};

/***/ }),

/***/ "./src/config/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.animationFunc = exports.animateDuration = exports.imageType = undefined;

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 默认的图片参数类型
var imageType = exports.imageType = _propTypes2.default.shape({
    src: _propTypes2.default.string, // 图片链接
    alt: _propTypes2.default.string, // 同 img 标签的 alt
    text: _propTypes2.default.string // 图片描述文字
});

// 动画时长 (ms) ( img/index.less )
/**
 * 定义基本的 Image 参数类型
 **/

// React Libs
var animateDuration = exports.animateDuration = 650;
// 动画曲线 ( img/index.less )
var animationFunc = exports.animationFunc = 'cubic-bezier(0.15, 1, 0.3, 1)';

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

var _Img = __webpack_require__("./src/components/Img/index.js");

var _config = __webpack_require__("./src/config/index.js");

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


exports.showImage = _Img.showImage;
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
                lazyLoad = _props.lazyLoad,
                indicator = _props.indicator,
                imageSet = _props.imageSet,
                _onClick = _props.onClick,
                style = _props.style,
                props = _objectWithoutProperties(_props, ['id', 'className', 'src', 'hiResSrc', 'alt', 'text', 'lazyLoad', 'indicator', 'imageSet', 'onClick', 'style']);

            var uuid = 'u' + uid;
            return _react2.default.createElement('img', _extends({
                id: uuid, className: className,
                src: src, alt: alt,
                onClick: function onClick() {
                    // 执行绑定的函数
                    _onClick && _onClick.constructor === Function && _onClick();
                    // 显示幻灯片叠层
                    (0, _Img.showImage)({
                        id: uuid,
                        lazyLoad: lazyLoad, indicator: indicator,
                        imageSet: imageSet || {
                            src: hiResSrc || src,
                            alt: alt, text: text
                        }
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
    // 图片列表参数
    imageSet: null,
    // 懒加载
    lazyLoad: true,
    // 指示器
    indicator: true

    // 参数类型
};ReactZmage.propTypes = {
    // 图片链接
    src: _propTypes2.default.string,
    // 高分原图链接
    hiResSrc: _propTypes2.default.string,
    // 图片标题
    alt: _propTypes2.default.string,
    // 图片描述文字==
    text: _propTypes2.default.string,
    // 图片列表参数, 可以传入单独的图片类型或数组包裹的图片类型
    imageSet: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_config.imageType), _config.imageType]),
    // 懒加载 (图片切换时)
    lazyLoad: _propTypes2.default.bool,
    // 指示器 (图片切换时)
    indicator: _propTypes2.default.bool
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

/***/ }),

/***/ "react-transition-group":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react_transition_group__;

/***/ })

/******/ });
});