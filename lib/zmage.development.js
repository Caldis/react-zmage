(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["react-zmage"] = factory();
	else
		root["react-zmage"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
exports.push([module.i, ".backgroundLayer__2zBDq {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  cursor: -webkit-zoom-out;\n  cursor: zoom-out;\n  background-color: #ffffff;\n  -webkit-transition: opacity .2s .33s;\n  transition: opacity .2s .33s;\n  will-change: opacity;\n}\n", ""]);

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
exports.push([module.i, ".controls__2sOYg {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: absolute;\n  padding: 20px;\n  top: 0;\n  right: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.zoomButton__3EA_v {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 7px;\n  width: 26px;\n  height: 26px;\n  cursor: pointer;\n  border: 1px solid black;\n}\n.zoomButton__3EA_v:hover {\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.zoomButton__3EA_v:active {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.closeButton__1hkr- {\n  width: 40px;\n  height: 40px;\n  cursor: pointer;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.closeButton__1hkr- .crossLine__3lngH {\n  position: absolute;\n  top: 50%;\n  left: 3px;\n  width: 35px;\n  height: 1px;\n  background-color: black;\n  -webkit-transform-origin: 50%;\n          transform-origin: 50%;\n}\n.closeButton__1hkr-:hover {\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.closeButton__1hkr-:active {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.pages__1SqZ9 {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  left: 50%;\n  bottom: 0;\n  z-index: 110;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n.pages__1SqZ9 .blackDot__1c8XI {\n  cursor: pointer;\n  margin: 10px 4px;\n  display: block;\n  width: 8px;\n  height: 8px;\n  border-radius: 4px;\n  background: black;\n}\n.pages__1SqZ9 .whiteDot__WV_HE {\n  cursor: pointer;\n  margin: 10px 4px;\n  display: block;\n  width: 8px;\n  height: 8px;\n  border-radius: 4px;\n  background: #999;\n}\n", ""]);

// exports
exports.locals = {
	"controls": "controls__2sOYg",
	"zoomButton": "zoomButton__3EA_v",
	"closeButton": "closeButton__1hkr-",
	"crossLine": "crossLine__3lngH",
	"pages": "pages__1SqZ9",
	"blackDot": "blackDot__1c8XI",
	"whiteDot": "whiteDot__WV_HE"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Image/index.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".loadingContainer__1uRry {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-animation: fadeIn__3hud5 1s linear forwards;\n          animation: fadeIn__3hud5 1s linear forwards;\n}\n.loadingContainer__1uRry .loading__2ybtF {\n  border: 3px solid #f3f3f3;\n  border-top: 3px solid black;\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-animation: spin__34aiz 1s linear infinite;\n          animation: spin__34aiz 1s linear infinite;\n}\n@-webkit-keyframes fadeIn__3hud5 {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn__3hud5 {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes spin__34aiz {\n  0% {\n    -webkit-transform: translate(-50%, -50%) rotate(0deg);\n            transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    -webkit-transform: translate(-50%, -50%) rotate(360deg);\n            transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n@keyframes spin__34aiz {\n  0% {\n    -webkit-transform: translate(-50%, -50%) rotate(0deg);\n            transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    -webkit-transform: translate(-50%, -50%) rotate(360deg);\n            transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n.imageLayer__1CUlw {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 10;\n  border-radius: 5px;\n  will-change: transform;\n}\n", ""]);

// exports
exports.locals = {
	"loadingContainer": "loadingContainer__1uRry",
	"fadeIn": "fadeIn__3hud5",
	"loading": "loading__2ybtF",
	"spin": "spin__34aiz",
	"imageLayer": "imageLayer__1CUlw"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js??ref--4-1!./node_modules/postcss-loader/lib/index.js??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Wrapper/index.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".wrapperLayer__12HA6 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 999;\n}\n", ""]);

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

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__("./src/components/Background/index.less");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 背景层
 * 叠加半透明背景
 **/

// React Libs
exports.default = function (_ref) {
	var show = _ref.show,
	    zoom = _ref.zoom,
	    unmountSelf = _ref.unmountSelf,
	    toggleZoom = _ref.toggleZoom;

	return _react2.default.createElement('div', {
		className: _index2.default.backgroundLayer,
		onClick: zoom ? toggleZoom : unmountSelf,
		style: { opacity: show ? 1 : 0 }
	});
};
// Style

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

var _reactMotion = __webpack_require__("react-motion");

var _index = __webpack_require__("./src/components/Control/index.less");

var _index2 = _interopRequireDefault(_index);

var _utils = __webpack_require__("./src/utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 控制层
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 控制图片切换等
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs

// React Motion

// Style

// Utils


// Controller transform Styles
var defaultMotionStyle = {
    over: 20,
    rotate: 45,
    opacity: 0
};
var showingMotionStyle = {
    over: 0,
    rotate: 0,
    opacity: 1
};

var Control = function (_React$PureComponent) {
    _inherits(Control, _React$PureComponent);

    function Control(props) {
        _classCallCheck(this, Control);

        var _this = _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).call(this, props));

        _this.state = {
            motionStyle: defaultMotionStyle
        };
        return _this;
    }

    _createClass(Control, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var show = nextProps.show;
            // 随状态切换改变样式

            show ? this.setState({ motionStyle: showingMotionStyle }) : this.setState({ motionStyle: defaultMotionStyle });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                zoom = _props.zoom,
                page = _props.page,
                set = _props.set,
                mobile = _props.mobile,
                controller = _props.controller,
                unmountSelf = _props.unmountSelf,
                toggleZoom = _props.toggleZoom,
                jumpPages = _props.jumpPages;
            var ms = this.state.motionStyle;

            return _react2.default.createElement(
                _reactMotion.Motion,
                { style: (0, _utils.springlization)({ over: ms.over, rotate: ms.rotate, opacity: ms.opacity }) },
                function (_ref) {
                    var over = _ref.over,
                        rotate = _ref.rotate,
                        opacity = _ref.opacity;
                    return _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: _index2.default.controls },
                            !zoom && controller.zoom && _react2.default.createElement('div', {
                                className: _index2.default.zoomButton,
                                onClick: mobile ? function () {
                                    return window.open(set[page].src);
                                } : toggleZoom,
                                style: {
                                    opacity: opacity,
                                    transform: 'rotate(' + rotate + 'deg)'
                                }
                            }),
                            !zoom && controller.close && _react2.default.createElement(
                                'div',
                                { className: _index2.default.closeButton, onClick: zoom ? toggleZoom : unmountSelf },
                                _react2.default.createElement('div', {
                                    className: _index2.default.crossLine,
                                    style: {
                                        opacity: opacity,
                                        transform: 'rotate(' + (45 - rotate) + 'deg)'
                                    }
                                }),
                                _react2.default.createElement('div', {
                                    className: _index2.default.crossLine,
                                    style: {
                                        opacity: opacity,
                                        transform: 'rotate(' + -(45 - rotate) + 'deg)'
                                    }
                                })
                            )
                        ),
                        set.length > 1 && !zoom && controller.pagination && _react2.default.createElement(
                            'div',
                            { className: _index2.default.pages, style: {
                                    opacity: opacity,
                                    transform: 'translate3d(-50%, ' + over + 'px, 0)'
                                } },
                            set.map(function (_, i) {
                                return i === page ? _react2.default.createElement('span', { key: i, className: _index2.default.blackDot }) : _react2.default.createElement('span', { key: i, className: _index2.default.whiteDot, onClick: function onClick() {
                                        return jumpPages(i);
                                    } });
                            })
                        )
                    );
                }
            );
        }
    }]);

    return Control;
}(_react2.default.PureComponent);

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

var _reactMotion = __webpack_require__("react-motion");

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


var Images = function (_React$PureComponent) {
    _inherits(Images, _React$PureComponent);

    function Images(props) {
        _classCallCheck(this, Images);

        // 当前图像对象
        var _this = _possibleConstructorReturn(this, (Images.__proto__ || Object.getPrototypeOf(Images)).call(this, props));

        _initialiseProps.call(_this);

        _this.image = null;
        // 初始页面高度
        _this.initialPageOffset = window.pageYOffset;
        // 初始封面样式

        var _this$coverStyle = _this.coverStyle(),
            x = _this$coverStyle.x,
            y = _this$coverStyle.y,
            opacity = _this$coverStyle.opacity,
            scale = _this$coverStyle.scale;

        _this.state = {
            // 样式
            defaultStyle: { x: x, y: y, opacity: opacity, scale: scale },
            currentStyle: { x: x, y: y, opacity: opacity, scale: scale }
        };
        return _this;
    }

    _createClass(Images, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _utils.addListenEventOf)('resize', this.handleResize);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var set = nextProps.set,
                show = nextProps.show,
                zoom = nextProps.zoom,
                page = nextProps.page;

            this.updateImageInfo(set[page].src, show, zoom);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _utils.removeListenEventOf)('resize', this.handleResize);
        }

        /**
         * 信息获取
         **/


        /**
         * 样式控制
         **/


        /**
         * 事件响应
         **/


        /**
         * 样式应用
         **/

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                show = _props.show,
                zoom = _props.zoom,
                page = _props.page,
                set = _props.set,
                toggleZoom = _props.toggleZoom;
            var _state = this.state,
                ds = _state.defaultStyle,
                cs = _state.currentStyle;

            return _react2.default.createElement(
                _react.Fragment,
                null,
                show && _react2.default.createElement(
                    'div',
                    { className: _index2.default.loadingContainer },
                    _react2.default.createElement('div', { className: _index2.default.loading })
                ),
                _react2.default.createElement(
                    _reactMotion.Motion,
                    {
                        defaultStyle: ds,
                        style: (0, _utils.springlization)({ x: cs.x, y: cs.y, opacity: cs.opacity, scale: cs.scale }),
                        onRest: this.handleMotionRest
                    },
                    function (_ref) {
                        var x = _ref.x,
                            y = _ref.y,
                            scale = _ref.scale;

                        var scrollYOffset = show ? 0 : _this2.initialPageOffset - window.pageYOffset;
                        return _react2.default.createElement('img', {
                            key: page,
                            className: _index2.default.imageLayer,
                            style: {
                                transform: 'translate3d(-50%, -50%, 0) translate3d(' + x + 'px, ' + y + 'px, 0px) translate3d(0px, ' + scrollYOffset + 'px, 0px) scale3d(' + scale + ', ' + scale + ', 1)',
                                cursor: zoom ? 'zoom-out' : 'initial'
                            },
                            src: set[page].src, alt: set[page].alt,
                            onClick: zoom ? toggleZoom : function () {}
                        });
                    }
                )
            );
        }
    }]);

    return Images;
}(_react2.default.PureComponent);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.updateImageInfo = function (src, show, zoom) {
        if (!_this3.image || src !== _this3.image.src) {
            _this3.image = new Image();
            _this3.image.onload = function () {
                _this3.updateImageStyle(show, zoom);
            };
            _this3.image.src = src;
        } else {
            _this3.updateImageStyle(show, zoom);
        }
    };

    this.updateImageStyle = function (show, zoom) {
        // 此处需要从外部获取最新的 show 与 zoom
        // 在 componentWillReceiveProps 中调用时, 有可能先于render执行
        // 则有可能获取到的是旧的 props, 导致异常
        if (show) {
            if (zoom) {
                _this3.setStyle(_this3.zoomingStyle());
                (0, _utils.addListenEventOf)('mousemove', _this3.handleMouseMove);
            } else {
                _this3.setStyle(_this3.browsingStyle());
                (0, _utils.removeListenEventOf)('mousemove', _this3.handleMouseMove);
            }
        } else {
            _this3.setStyle(_this3.coverStyle());
            (0, _utils.removeListenEventOf)('mousemove', _this3.handleMouseMove);
        }
    };

    this.coverStyle = function () {
        var _props2 = _this3.props,
            page = _props2.page,
            cover = _props2.cover;
        var width = cover.width,
            height = cover.height,
            naturalWidth = cover.naturalWidth;

        var _cover$getBoundingCli = cover.getBoundingClientRect(),
            top = _cover$getBoundingCli.top,
            left = _cover$getBoundingCli.left;

        return page === 0 ? {
            x: -(0, _utils.scrollWidth)() / 2 + left + width / 2,
            y: -(0, _utils.windowHeight)() / 2 + top + height / 2,
            opacity: 1,
            scale: width / naturalWidth
        } : {
            x: 0,
            y: -(0, _utils.windowHeight)(),
            opacity: 0,
            scale: width / naturalWidth
        };
    };

    this.browsingStyle = function () {
        var margin = _this3.props.margin;

        return {
            x: 0,
            y: 0,
            opacity: 1,
            scale: (0, _utils.calcFitScale)(_this3.image, margin)
        };
    };

    this.zoomingStyle = function () {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$clientX = _ref2.clientX,
            mouseX = _ref2$clientX === undefined ? (0, _utils.scrollWidth)() / 2 : _ref2$clientX,
            _ref2$clientY = _ref2.clientY,
            mouseY = _ref2$clientY === undefined ? (0, _utils.windowHeight)() / 2 : _ref2$clientY;

        var margin = _this3.props.margin;
        var _image = _this3.image,
            naturalWidth = _image.naturalWidth,
            naturalHeight = _image.naturalHeight;

        var cw = (0, _utils.scrollWidth)();
        var ch = (0, _utils.windowHeight)();
        var rangeX = naturalWidth - (0, _utils.scrollWidth)() + 2 * margin;
        var rangeY = naturalHeight - (0, _utils.windowHeight)() + 2 * margin;
        // 计算偏移量
        var imgPosX = naturalWidth > cw ? (naturalWidth - cw) / 2 + margin - rangeX * (mouseX / cw) : 0;
        var imgPosY = naturalHeight > ch ? (naturalHeight - ch) / 2 + margin - rangeY * (mouseY / ch) : 0;
        // 返回位置
        return {
            x: imgPosX,
            y: imgPosY,
            opacity: 1,
            scale: 1
        };
    };

    this.handleMouseMove = function (e) {
        _this3.setStyle(_this3.zoomingStyle(e));
    };

    this.handleResize = function (e) {
        var _props3 = _this3.props,
            show = _props3.show,
            zoom = _props3.zoom;

        _this3.updateImageStyle(show, zoom);
    };

    this.handleMotionRest = function () {
        var _props4 = _this3.props,
            cover = _props4.cover,
            remove = _props4.remove;
        var show = _this3.props.show;

        if (!show) {
            // 显示封面原图
            cover.style.visibility = 'visible';
            // 移除节点
            remove();
        }
    };

    this.setStyle = function (style) {
        var cs = _this3.state.currentStyle;
        var _style$x = style.x,
            x = _style$x === undefined ? cs.x : _style$x,
            _style$y = style.y,
            y = _style$y === undefined ? cs.y : _style$y,
            _style$opacity = style.opacity,
            opacity = _style$opacity === undefined ? cs.opacity : _style$opacity,
            _style$scale = style.scale,
            scale = _style$scale === undefined ? cs.opacity : _style$scale;

        _this3.setState({
            currentStyle: { x: x, y: y, opacity: opacity, scale: scale }
        });
    };
};

exports.default = Images;

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

/***/ "./src/components/Portals/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 客制的 Portal 组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 直接将子元素插入到 body 末端
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs


var Portals = function (_React$Component) {
    _inherits(Portals, _React$Component);

    function Portals(props) {
        _classCallCheck(this, Portals);

        var _this = _possibleConstructorReturn(this, (Portals.__proto__ || Object.getPrototypeOf(Portals)).call(this, props));

        _this.target = props.target || document.body;
        _this.element = document.createElement('div');
        return _this;
    }

    _createClass(Portals, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.target.appendChild(this.element);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.target.removeChild(this.element);
        }
    }, {
        key: 'render',
        value: function render() {
            return _reactDom2.default.createPortal(this.props.children, this.element);
        }
    }]);

    return Portals;
}(_react2.default.Component);

exports.default = Portals;

/***/ }),

/***/ "./src/components/Wrapper/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = __webpack_require__("./src/components/Wrapper/index.less");

var _index2 = _interopRequireDefault(_index);

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


var Wrapper = function (_React$PureComponent) {
    _inherits(Wrapper, _React$PureComponent);

    function Wrapper(props) {
        _classCallCheck(this, Wrapper);

        // 移动端检测
        var _this = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

        _this.mountSelf = function () {
            var cover = _this.props.cover;

            _this.setState({ show: true }, function () {
                // 隐藏封面原图
                cover.style.visibility = 'hidden';
                // 绑定事件
                (0, _utils.addListenEventOf)('scroll', _this.handleScroll);
                (0, _utils.addListenEventOf)('keydown', _this.handleKeyDown);
                (0, _utils.addListenEventOf)('touchmove', _this.handleScroll);
            });
        };

        _this.unmountSelf = function () {
            var cover = _this.props.cover;
            var page = _this.state.page;
            // 显示封面原图（当前不为第一页时，遮罩从上方移除会迅速露出，需要立即显示，否则交由图片层处理）

            if (page !== 0) cover.style.visibility = 'visible';
            _this.setState({
                show: false
            });
        };

        _this.handleKeyDown = function (e) {
            // 阻止默认事件
            e.preventDefault();
            var _this$props = _this.props,
                set = _this$props.set,
                hotKey = _this$props.hotKey;
            var zoom = _this.state.zoom;

            var hasImageSet = set && set.constructor === Array;
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

        _this.handleScroll = function () {
            _this.state.show && _this.unmountSelf();
        };

        _this.handleJumpPages = function (page) {
            _this.setState({ page: page });
        };

        _this.handleSwitchPages = function (direction) {
            return function () {
                var set = _this.props.set;
                var page = _this.state.page;

                _this.setState({
                    page: direction === "prev" ? Math.abs(set.length + page - 1) % set.length : (page + 1) % set.length
                });
            };
        };

        _this.handleToggleZoom = function () {
            _this.setState({
                zoom: !_this.state.zoom
            });
        };

        var mobile = (0, _utils.mobileCheck)();

        _this.state = {
            // 显示
            show: false,
            // 缩放
            zoom: false,
            // 当前页数
            page: 0,
            // 是否移动端
            mobile: mobile,
            // 图片距屏幕边距 (如果有)
            margin: mobile ? 0 : props.margin
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
            (0, _utils.removeListenEventOf)('scroll', this.handleScroll);
            (0, _utils.removeListenEventOf)('keydown', this.handleKeyDown);
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
                cover = _props.cover,
                set = _props.set,
                controller = _props.controller,
                remove = _props.remove;
            var _state = this.state,
                show = _state.show,
                zoom = _state.zoom,
                page = _state.page,
                mobile = _state.mobile,
                margin = _state.margin;

            return _react2.default.createElement(
                'div',
                { className: _index2.default.wrapperLayer },
                _react2.default.createElement(_Background2.default, {
                    show: show,
                    zoom: zoom,
                    unmountSelf: this.unmountSelf,
                    toggleZoom: this.handleToggleZoom
                }),
                _react2.default.createElement(_Control2.default, {
                    set: set,
                    show: show,
                    zoom: zoom,
                    page: page,
                    mobile: mobile,
                    controller: controller,
                    unmountSelf: this.unmountSelf,
                    jumpPages: this.handleJumpPages,
                    toggleZoom: this.handleToggleZoom
                }),
                _react2.default.createElement(_Image2.default, {
                    set: set,
                    show: show,
                    zoom: zoom,
                    page: page,
                    cover: cover,
                    mobile: mobile,
                    remove: remove,
                    margin: margin,
                    toggleZoom: this.handleToggleZoom
                })
            );
        }
    }]);

    return Wrapper;
}(_react2.default.PureComponent);

exports.default = Wrapper;


Wrapper.defaultProps = {
    // 封面节点
    cover: {},
    // 图片列表
    set: [],
    // 控制器
    controller: _default.defProp.controller,
    // 快捷键
    hotKey: _default.defProp.hotKey,
    // 图片距屏幕边距 (如果有)
    margin: _default.defProp.margin,
    // 卸载函数
    remove: function remove() {}
};

Wrapper.propTypes = {
    // 封面节点
    cover: _propTypes2.default.object,
    // 图片列表
    set: _default.defType.set,
    // 控制器
    controller: _default.defType.controller,
    // 快捷键
    hotKey: _default.defType.hotKey,
    // 图片距屏幕边距 (如果有)
    margin: _default.defType.margin,
    // 卸载函数
    remove: _propTypes2.default.func
};

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
		// 翻页（左右）
		flip: true
	},

	// 杂项
	// 图片距屏幕边距 (如果有)
	margin: 70,
	// 动画参数
	springOption: { stiffness: 200, damping: 25, precision: 0.01 }

	// 默认类型
}; /**
    * 定义默认值与类型
    **/

// React Libs
var defType = exports.defType = {

	// 图片集合
	set: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.shape({
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
	}),

	// 杂项
	// 图片距屏幕边距 (如果有)
	margin: _propTypes2.default.number,
	// 动画参数
	springOption: _propTypes2.default.shape({
		stiffness: _propTypes2.default.number, // 剛性
		damping: _propTypes2.default.number // 阻尼
	})

};

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Portals = __webpack_require__("./src/components/Portals/index.js");

var _Portals2 = _interopRequireDefault(_Portals);

var _Wrapper = __webpack_require__("./src/components/Wrapper/index.js");

var _Wrapper2 = _interopRequireDefault(_Wrapper);

var _default = __webpack_require__("./src/config/default.js");

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


var ReactZmage = function (_React$PureComponent) {
    _inherits(ReactZmage, _React$PureComponent);

    function ReactZmage(props) {
        _classCallCheck(this, ReactZmage);

        // Refs
        var _this = _possibleConstructorReturn(this, (ReactZmage.__proto__ || Object.getPrototypeOf(ReactZmage)).call(this, props));

        _initialiseProps.call(_this);

        _this.cover = null;

        // States
        _this.state = {
            browsing: false,
            set: _this.buildSet(props)
        };

        return _this;
    }

    // 从初始 props 中生成图片集合


    // 切换查看状态


    _createClass(ReactZmage, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                browsing = _state.browsing,
                set = _state.set;

            var _props = this.props,
                className = _props.className,
                src = _props.src,
                alt = _props.alt,
                controller = _props.controller,
                hotKey = _props.hotKey,
                style = _props.style,
                props = _objectWithoutProperties(_props, ['className', 'src', 'alt', 'controller', 'hotKey', 'style']);

            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement('img', _extends({
                    ref: function ref(_ref) {
                        return _this2.cover = _ref;
                    },
                    className: className, src: src, alt: alt, title: alt,
                    style: _extends({ cursor: 'zoom-in' }, style),
                    onClick: this.browsing
                }, props)),
                browsing && _react2.default.createElement(
                    _Portals2.default,
                    null,
                    _react2.default.createElement(_Wrapper2.default, {
                        set: set,
                        cover: this.cover,
                        controller: _extends({}, _default.defProp.controller, controller),
                        hotKey: _extends({}, _default.defProp.hotKey, hotKey),
                        remove: this.unBrowsing
                    })
                )
            );
        }
    }]);

    return ReactZmage;
}(_react2.default.PureComponent);

// 默认参数


var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.buildSet = function (props) {
        var set = props.set,
            src = props.src,
            alt = props.alt,
            txt = props.txt;

        if (set && set.constructor === Array && set.length > 1) {
            return set;
        } else {
            return [{ src: src, alt: alt, txt: txt }];
        }
    };

    this.browsing = function () {
        var onClick = _this3.props.onClick;

        onClick && onClick.constructor === Function && onClick();
        _this3.setState({ browsing: true });
    };

    this.unBrowsing = function () {
        _this3.setState({ browsing: false });
    };
};

exports.default = ReactZmage;
ReactZmage.defaultProps = {

    // 图片 Url
    src: "",
    // 图片标题
    alt: "",
    // 图片文字
    txt: "",

    // 图片列表
    set: [],

    // 控制器
    controller: _default.defProp.controller,
    // 快捷键
    hotKey: _default.defProp.hotKey

    // 参数类型
};ReactZmage.propTypes = {

    // 图片 Url
    src: _propTypes2.default.string.isRequired,
    // 图片标题
    alt: _propTypes2.default.string,
    // 图片描述
    txt: _propTypes2.default.string,

    // 图片集合, 可以传入单独的图片类型或数组包裹的图片类型
    set: _default.defType.set,

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
exports.springlization = exports.mobileCheck = exports.clientHeight = exports.scrollHeight = exports.windowHeight = exports.clientWidth = exports.scrollWidth = exports.windowWidth = exports.removeListenEventOf = exports.addListenEventOf = exports.calcFitScale = undefined;

var _default = __webpack_require__("./src/config/default.js");

var _reactMotion = __webpack_require__("react-motion");

/**
 * 工具函数
 **/

// 通过屏幕尺寸以及图片尺寸，计算出图片在屏幕中完整显示的缩放比例
// Config
var calcFitScale = exports.calcFitScale = function calcFitScale(image, margin) {
    var scaleX = clientWidth() / (image.naturalWidth + 2 * margin);
    var scaleY = clientHeight() / (image.naturalHeight + 2 * margin);
    return Math.min(scaleX, scaleY);
};

// 事件绑定

// React Motion
var addListenEventOf = exports.addListenEventOf = function addListenEventOf(event, handler) {
    return window.addEventListener(event, handler, true);
};
var removeListenEventOf = exports.removeListenEventOf = function removeListenEventOf(event, handler) {
    return window.removeEventListener(event, handler, true);
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

// 将传入对象转为 react motion 的 spring 类型
var springlization = exports.springlization = function springlization(attr) {
    var res = {};
    for (var i in attr) {
        res[i] = (0, _reactMotion.spring)(attr[i], _default.defProp.springOption);
    }return res;
};

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/index.js");


/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "react-motion":
/***/ (function(module, exports) {

module.exports = require("react-motion");

/***/ })

/******/ });
});