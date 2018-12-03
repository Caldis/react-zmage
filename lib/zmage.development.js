module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/components/Background/index.less":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Background/index.less ***!
  \********************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".backgroundLayer__3NsFV {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  cursor: zoom-out;\n  background-color: #ffffff;\n  transition: opacity 0.2s 0.35s;\n  will-change: opacity;\n}\n", ""]);

// exports
exports.locals = {
	"backgroundLayer": "backgroundLayer__3NsFV"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/components/Control/index.less":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Control/index.less ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".controls__1g_fd {\n  box-sizing: border-box;\n  position: absolute;\n  top: 0.6em;\n  right: 0.6em;\n  opacity: 0;\n  display: flex;\n  z-index: 1000;\n  border-radius: 5em;\n  -webkit-transform: translateX(100%);\n          transform: translateX(100%);\n  transition: opacity 0.3s, -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s;\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s, -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd.show__21Y84 {\n  opacity: 0.8;\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n}\n.controls__1g_fd .baseButton__kkQlr {\n  box-sizing: border-box;\n  margin: 0.4em 0.1em;\n  width: 2em;\n  height: 2em;\n  cursor: pointer;\n  -webkit-transform: translateX(50%);\n          transform: translateX(50%);\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.5s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.5s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.5s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.5s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .baseButton__kkQlr:hover {\n  opacity: 0.8 !important;\n}\n.controls__1g_fd .baseButton__kkQlr:active {\n  opacity: 1 !important;\n}\n.controls__1g_fd .baseButton__kkQlr:first-of-type {\n  margin-left: 0.6em;\n}\n.controls__1g_fd .baseButton__kkQlr:last-of-type {\n  margin-right: 0.6em;\n}\n.controls__1g_fd .baseButton__kkQlr.show__21Y84 {\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n}\n.controls__1g_fd .baseButton__kkQlr > svg {\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd .rotateLeft__zTxLt {\n  box-sizing: border-box;\n  margin: 0.4em 0.1em;\n  width: 2em;\n  height: 2em;\n  cursor: pointer;\n  -webkit-transform: translateX(50%);\n          transform: translateX(50%);\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.5s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.5s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.5s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.5s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .rotateLeft__zTxLt:hover {\n  opacity: 0.8 !important;\n}\n.controls__1g_fd .rotateLeft__zTxLt:active {\n  opacity: 1 !important;\n}\n.controls__1g_fd .rotateLeft__zTxLt:first-of-type {\n  margin-left: 0.6em;\n}\n.controls__1g_fd .rotateLeft__zTxLt:last-of-type {\n  margin-right: 0.6em;\n}\n.controls__1g_fd .rotateLeft__zTxLt.show__21Y84 {\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n}\n.controls__1g_fd .rotateLeft__zTxLt > svg {\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd .rotateLeft__zTxLt > svg {\n  -webkit-transform: scaleX(-1);\n          transform: scaleX(-1);\n}\n.controls__1g_fd .rotateRight__29Er8 {\n  box-sizing: border-box;\n  margin: 0.4em 0.1em;\n  width: 2em;\n  height: 2em;\n  cursor: pointer;\n  -webkit-transform: translateX(50%);\n          transform: translateX(50%);\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.5s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.5s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.5s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.5s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .rotateRight__29Er8:hover {\n  opacity: 0.8 !important;\n}\n.controls__1g_fd .rotateRight__29Er8:active {\n  opacity: 1 !important;\n}\n.controls__1g_fd .rotateRight__29Er8:first-of-type {\n  margin-left: 0.6em;\n}\n.controls__1g_fd .rotateRight__29Er8:last-of-type {\n  margin-right: 0.6em;\n}\n.controls__1g_fd .rotateRight__29Er8.show__21Y84 {\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n}\n.controls__1g_fd .rotateRight__29Er8 > svg {\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd .rotateRight__29Er8 > svg {\n  -webkit-transform: scaleX(1);\n          transform: scaleX(1);\n}\n.controls__1g_fd .zoomButton__x8Ef7 {\n  box-sizing: border-box;\n  margin: 0.4em 0.1em;\n  width: 2em;\n  height: 2em;\n  cursor: pointer;\n  -webkit-transform: translateX(50%);\n          transform: translateX(50%);\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.5s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.5s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.5s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.5s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .zoomButton__x8Ef7:hover {\n  opacity: 0.8 !important;\n}\n.controls__1g_fd .zoomButton__x8Ef7:active {\n  opacity: 1 !important;\n}\n.controls__1g_fd .zoomButton__x8Ef7:first-of-type {\n  margin-left: 0.6em;\n}\n.controls__1g_fd .zoomButton__x8Ef7:last-of-type {\n  margin-right: 0.6em;\n}\n.controls__1g_fd .zoomButton__x8Ef7.show__21Y84 {\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n}\n.controls__1g_fd .zoomButton__x8Ef7 > svg {\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd .closeButton__awvpY {\n  box-sizing: border-box;\n  margin: 0.4em 0.1em;\n  width: 2em;\n  height: 2em;\n  cursor: pointer;\n  -webkit-transform: translateX(50%);\n          transform: translateX(50%);\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.5s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.5s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.5s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.5s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .closeButton__awvpY:hover {\n  opacity: 0.8 !important;\n}\n.controls__1g_fd .closeButton__awvpY:active {\n  opacity: 1 !important;\n}\n.controls__1g_fd .closeButton__awvpY:first-of-type {\n  margin-left: 0.6em;\n}\n.controls__1g_fd .closeButton__awvpY:last-of-type {\n  margin-right: 0.6em;\n}\n.controls__1g_fd .closeButton__awvpY.show__21Y84 {\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n}\n.controls__1g_fd .closeButton__awvpY > svg {\n  width: 2em;\n  height: 2em;\n}\n.pages__2HbvG {\n  box-sizing: border-box;\n  display: flex;\n  position: absolute;\n  left: 50%;\n  bottom: 0.4em;\n  z-index: 110;\n  opacity: 0;\n  border-radius: 2em;\n  -webkit-transform: translate(-50%, 100px);\n          transform: translate(-50%, 100px);\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.pages__2HbvG.show__21Y84 {\n  opacity: 0.8;\n  -webkit-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n}\n.pages__2HbvG .dot__UXAlC {\n  cursor: pointer;\n  margin: 0.7em 0.4em;\n  display: block;\n  width: 0.7em;\n  height: 0.7em;\n  border-radius: 0.7em;\n  background: black;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.pages__2HbvG .dot__UXAlC:first-of-type {\n  margin-left: 0.7em;\n}\n.pages__2HbvG .dot__UXAlC:last-of-type {\n  margin-right: 0.7em;\n}\n.pages__2HbvG .dot__UXAlC:hover {\n  opacity: 0.8;\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.pages__2HbvG .blackDot__RMfnt {\n  cursor: pointer;\n  margin: 0.7em 0.4em;\n  display: block;\n  width: 0.7em;\n  height: 0.7em;\n  border-radius: 0.7em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  background: black;\n}\n.pages__2HbvG .blackDot__RMfnt:first-of-type {\n  margin-left: 0.7em;\n}\n.pages__2HbvG .blackDot__RMfnt:last-of-type {\n  margin-right: 0.7em;\n}\n.pages__2HbvG .blackDot__RMfnt:hover {\n  opacity: 0.8;\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n.pages__2HbvG .whiteDot__GgDF0 {\n  cursor: pointer;\n  margin: 0.7em 0.4em;\n  display: block;\n  width: 0.7em;\n  height: 0.7em;\n  border-radius: 0.7em;\n  background: black;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  background: #999;\n}\n.pages__2HbvG .whiteDot__GgDF0:first-of-type {\n  margin-left: 0.7em;\n}\n.pages__2HbvG .whiteDot__GgDF0:last-of-type {\n  margin-right: 0.7em;\n}\n.pages__2HbvG .whiteDot__GgDF0:hover {\n  opacity: 0.8;\n  -webkit-transform: scale(1.1);\n          transform: scale(1.1);\n}\n", ""]);

// exports
exports.locals = {
	"controls": "controls__1g_fd",
	"show": "show__21Y84",
	"baseButton": "baseButton__kkQlr",
	"rotateLeft": "rotateLeft__zTxLt",
	"rotateRight": "rotateRight__29Er8",
	"zoomButton": "zoomButton__x8Ef7",
	"closeButton": "closeButton__awvpY",
	"pages": "pages__2HbvG",
	"dot": "dot__UXAlC",
	"blackDot": "blackDot__RMfnt",
	"whiteDot": "whiteDot__GgDF0"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/components/Image/index.less":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Image/index.less ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".loadingContainer__WIhD3 {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-animation: fadeIn__2QyJt 1s linear forwards;\n          animation: fadeIn__2QyJt 1s linear forwards;\n}\n.loadingContainer__WIhD3 .loading__1eBWy {\n  border: 3px solid #f3f3f3;\n  border-top: 3px solid black;\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-animation: spin__slaya 1s linear infinite;\n          animation: spin__slaya 1s linear infinite;\n}\n@-webkit-keyframes fadeIn__2QyJt {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn__2QyJt {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes spin__slaya {\n  0% {\n    -webkit-transform: translate(-50%, -50%) rotate(0deg);\n            transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    -webkit-transform: translate(-50%, -50%) rotate(360deg);\n            transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n@keyframes spin__slaya {\n  0% {\n    -webkit-transform: translate(-50%, -50%) rotate(0deg);\n            transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    -webkit-transform: translate(-50%, -50%) rotate(360deg);\n            transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n.imageLayer__fT2s0 {\n  transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 10;\n  border-radius: 5px;\n  will-change: transform, top;\n}\n.imageLayer__fT2s0.zooming__wGVSq {\n  transition-timing-function: cubic-bezier(0, 0.1, 0.1, 1);\n}\n", ""]);

// exports
exports.locals = {
	"loadingContainer": "loadingContainer__WIhD3",
	"fadeIn": "fadeIn__2QyJt",
	"loading": "loading__1eBWy",
	"spin": "spin__slaya",
	"imageLayer": "imageLayer__fT2s0",
	"zooming": "zooming__wGVSq"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/components/Wrapper/index.less":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Wrapper/index.less ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".wrapperLayer__23tVi {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 999;\n}\n", ""]);

// exports
exports.locals = {
	"wrapperLayer": "wrapperLayer__23tVi"
};

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
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
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
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

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

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
		var nextSibling = getElement(options.insertAt.before, target);
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

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
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

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

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
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
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
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
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

/***/ "./src/components/Background/index.less":
/*!**********************************************!*\
  !*** ./src/components/Background/index.less ***!
  \**********************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--8-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/components/Background/index.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Control/index.less":
/*!*******************************************!*\
  !*** ./src/components/Control/index.less ***!
  \*******************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--8-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/components/Control/index.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Image/index.less":
/*!*****************************************!*\
  !*** ./src/components/Image/index.less ***!
  \*****************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--8-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/components/Image/index.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Wrapper/index.less":
/*!*******************************************!*\
  !*** ./src/components/Wrapper/index.less ***!
  \*******************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--8-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/components/Wrapper/index.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/index.js":
/*!**********************************!*\
  !*** ./src/index.js + 9 modules ***!
  \**********************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Background/index.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Control/index.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Image/index.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Wrapper/index.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "prop-types" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react-dom" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__("react-dom");
var external_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_react_dom_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__("prop-types");
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// CONCATENATED MODULE: ./src/utils/index.js
/**
 * 工具函数
 **/
var addListenScroll = function addListenScroll(handler) {
  window.addEventListener('scroll', handler);
  window.addEventListener('touchmove', handler);
};
var removeListenScroll = function removeListenScroll(handler) {
  window.removeEventListener('scroll', handler);
  window.removeEventListener('touchmove', handler);
}; // 通过屏幕尺寸以及图片尺寸，计算出图片在屏幕中完整显示的缩放比例

var calcFitScale = function calcFitScale(naturalWidth, naturalHeight, edge) {
  var scaleX = clientWidth() / (naturalWidth + 2 * edge);
  var scaleY = clientHeight() / (naturalHeight + 2 * edge);
  return Math.min(scaleX, scaleY);
}; // 屏幕尺寸

var windowWidth = function windowWidth() {
  return window.innerWidth;
};
var scrollWidth = function scrollWidth() {
  return document.body.scrollWidth;
};
var clientWidth = function clientWidth() {
  return document.documentElement.clientWidth;
};
var windowHeight = function windowHeight() {
  return window.innerHeight;
};
var scrollHeight = function scrollHeight() {
  return document.body.scrollHeight;
};
var clientHeight = function clientHeight() {
  return document.documentElement.clientHeight;
}; // 平台判断
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

var isMobile = function isMobile() {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
};
var isDesktop = function isDesktop() {
  return !isMobile();
}; // 根据传入的属性, 返回附带对应显示状态的类名

var withShowingStatus = function withShowingStatus() {
  var defClassName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var isShow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var showName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "show";
  return isShow ? "".concat(defClassName, " ").concat(showName) : defClassName;
};
// CONCATENATED MODULE: ./src/config/default.js
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 默认类型与默认值
 **/
// Libs
 // Utils


/**
 * 全局变量缓存
 **/

var env = {
  isDesktop: null,
  isMobile: null
};

var default_updateEnv = function updateEnv(force) {
  if (window) {
    if (!window.__ZMAGE_INITIALIZED___ || force) {
      var mobile = isMobile();
      window.__ZMAGE_INITIALIZED___ = true;
      window.__ZMAGE_ENV_IS_DESKTOP___ = !mobile;
      window.__ZMAGE_ENV_IS_MOBILE___ = mobile;
    }

    env.isDesktop = window.__ZMAGE_ENV_IS_DESKTOP___;
    env.isMobile = window.__ZMAGE_ENV_IS_MOBILE___;
  } else {
    var _mobile = isMobile();

    env.isDesktop = !_mobile;
    env.isMobile = _mobile;
  }

  return env;
};

default_updateEnv();

/**
 * 默认类型
 **/

var defType = {
  /**
   * 基础数据
   **/
  // 图片地址
  src: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.func]),
  // 图片标题
  alt: external_prop_types_default.a.string,
  // 图片描述
  txt: external_prop_types_default.a.string,
  // 图片集合
  set: external_prop_types_default.a.oneOfType([external_prop_types_default.a.arrayOf(external_prop_types_default.a.shape({
    src: external_prop_types_default.a.string,
    // 图片地址
    alt: external_prop_types_default.a.string,
    // 图片标题
    text: external_prop_types_default.a.string // 图片描述

  })), external_prop_types_default.a.shape({
    src: external_prop_types_default.a.string,
    // 图片地址
    alt: external_prop_types_default.a.string,
    // 图片标题
    text: external_prop_types_default.a.string // 图片描述

  })]),

  /**
   * 功能控制
   **/
  // 控制器
  controller: external_prop_types_default.a.oneOfType([external_prop_types_default.a.bool, external_prop_types_default.a.shape({
    // 分页
    pagination: external_prop_types_default.a.bool,
    // 旋转按钮
    rotate: external_prop_types_default.a.bool,
    // 缩放按钮
    zoom: external_prop_types_default.a.bool,
    // 关闭按钮
    close: external_prop_types_default.a.bool,
    // 左右翻页
    flip: external_prop_types_default.a.bool
  })]),
  // 快捷键
  hotKey: external_prop_types_default.a.oneOfType([external_prop_types_default.a.bool, external_prop_types_default.a.shape({
    // 缩放（空格）
    zoom: external_prop_types_default.a.bool,
    // 关闭（ESC）
    close: external_prop_types_default.a.bool,
    // 翻页（左右键）
    flip: external_prop_types_default.a.bool
  })]),
  // 预设
  preset: external_prop_types_default.a.oneOf([// 自动
  "auto", // 桌面端
  "desktop", // 移动端
  "mobile"]),

  /**
   * 界面样式
   **/
  // 背景色
  backdrop: external_prop_types_default.a.string,
  // 高度
  zIndex: external_prop_types_default.a.number,
  // 圆角
  radius: external_prop_types_default.a.number,
  // 边距
  edge: external_prop_types_default.a.number,

  /**
   * 生命周期
   **/
  onBrowsing: external_prop_types_default.a.func,
  onZooming: external_prop_types_default.a.func,
  onSwitching: external_prop_types_default.a.func,
  onRotating: external_prop_types_default.a.func,

  /**
   * 内部
   **/
  // components/Wrapper
  // 封面节点
  cover: external_prop_types_default.a.object,
  // 卸载函数
  remove: external_prop_types_default.a.func
  /**
   * 默认值
   **/

};
var defPreset = {
  // 桌面
  desktop: {
    controller: {
      pagination: true,
      rotate: true,
      zoom: true,
      close: true,
      flip: true
    },
    hotKey: {
      zoom: true,
      close: true,
      flip: true
    },
    radius: 5,
    edge: 20
  },
  // 移动端
  mobile: {
    controller: {
      pagination: true,
      rotate: false,
      zoom: false,
      close: false,
      flip: false
    },
    hotKey: {
      zoom: false,
      close: false,
      flip: false
    },
    radius: 0,
    edge: 0
  }
};
var defProp = {
  /**
   * 基础数据
   **/
  // 图片地址
  src: "",
  // 图片标题
  alt: "",
  // 图片描述
  txt: "",
  // 图片集合
  set: [],

  /**
   * 预设
   **/
  preset: "auto",

  /**
   * 功能控制
   **/
  // 控制器 (受制于 preset)
  controller: {},
  // 快捷键 (受制于 preset)
  hotKey: {},

  /**
   * 界面样式
   **/
  // 背景色
  backdrop: "#FFFFFF",
  // 高度
  zIndex: 1000,
  // 圆角 (受制于 preset)
  radius: null,
  // 边距 (受制于 preset)
  edge: null,

  /**
   * 生命周期
   **/
  onBrowsing: function onBrowsing() {},
  onZooming: function onZooming() {},
  onSwitching: function onSwitching() {},
  onRotating: function onRotating() {},

  /**
   * 内部
   **/
  // components/Wrapper
  // 封面节点
  cover: {},
  // 卸载函数
  remove: function remove() {}
  /**
   * 默认值 (不同平台)
   **/

};
var defPropAuto = function defPropAuto(force) {
  return _objectSpread({}, defProp, default_updateEnv(force).isDesktop ? defPreset.desktop : defPreset.mobile);
};
var defPropDesktop = _objectSpread({}, defProp, defPreset.desktop);
var defPropMobile = _objectSpread({}, defProp, defPreset.mobile);
// CONCATENATED MODULE: ./src/components/Portals/index.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * 客制的 Portal 组件
 * 直接将子元素插入到 body 末端
 **/
// React Libs

 // Config



var Portals_Portals =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Portals, _React$Component);

  function Portals(props) {
    var _this;

    _classCallCheck(this, Portals);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Portals).call(this, props));
    _this.target = props.target || document.body;
    _this.element = document.createElement('div');
    _this.element.id = "zmage";
    _this.element.style.zIndex = props.zIndex;
    return _this;
  }

  _createClass(Portals, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.target.appendChild(this.element);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.target.removeChild(this.element);
    }
  }, {
    key: "render",
    value: function render() {
      return external_react_dom_default.a.createPortal(this.props.children, this.element);
    }
  }]);

  return Portals;
}(external_react_default.a.Component);


Portals_Portals.defaultProps = {
  zIndex: defProp.zIndex
};
Portals_Portals.propTypes = {
  zIndex: defType.zIndex
};
// CONCATENATED MODULE: ./src/components/context.js
function context_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { context_defineProperty(target, key, source[key]); }); } return target; }

function context_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Context 管理器
// React libs
 // Config


var Context = Object(external_react_["createContext"])({
  // Wrapper's Props
  // 内部
  cover: defProp.cover,
  remove: defProp.remove,
  // 基础数据
  set: defProp.set,
  // 功能控制
  controller: defProp.controller,
  preset: defProp.preset,
  // 界面样式
  backdrop: defProp.backdrop,
  mobile: defProp.mobile,
  edge: defProp.edge,
  // Wrapper's State
  show: false,
  zoom: false,
  page: 0,
  rotate: 0
});
var context_ContextConsumer = function ContextConsumer(Component) {
  return function (props) {
    return external_react_default.a.createElement(Context.Consumer, null, function (context) {
      return external_react_default.a.createElement(Component, context_objectSpread({}, context, props));
    });
  };
};
// EXTERNAL MODULE: ./src/components/Wrapper/index.less
var components_Wrapper = __webpack_require__("./src/components/Wrapper/index.less");
var Wrapper_default = /*#__PURE__*/__webpack_require__.n(components_Wrapper);

// EXTERNAL MODULE: ./src/components/Control/index.less
var components_Control = __webpack_require__("./src/components/Control/index.less");
var Control_default = /*#__PURE__*/__webpack_require__.n(components_Control);

// CONCATENATED MODULE: ./src/components/Control/icon.js
function icon_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { icon_typeof = function _typeof(obj) { return typeof obj; }; } else { icon_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return icon_typeof(obj); }

function icon_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function icon_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function icon_createClass(Constructor, protoProps, staticProps) { if (protoProps) icon_defineProperties(Constructor.prototype, protoProps); if (staticProps) icon_defineProperties(Constructor, staticProps); return Constructor; }

function icon_possibleConstructorReturn(self, call) { if (call && (icon_typeof(call) === "object" || typeof call === "function")) { return call; } return icon_assertThisInitialized(self); }

function icon_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function icon_getPrototypeOf(o) { icon_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return icon_getPrototypeOf(o); }

function icon_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) icon_setPrototypeOf(subClass, superClass); }

function icon_setPrototypeOf(o, p) { icon_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return icon_setPrototypeOf(o, p); }

// React Libs


var icon_RotateIcon =
/*#__PURE__*/
function (_React$PureComponent) {
  icon_inherits(RotateIcon, _React$PureComponent);

  function RotateIcon() {
    icon_classCallCheck(this, RotateIcon);

    return icon_possibleConstructorReturn(this, icon_getPrototypeOf(RotateIcon).apply(this, arguments));
  }

  icon_createClass(RotateIcon, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        width: "200",
        height: "200",
        viewBox: "0 0 1024 1024"
      }, external_react_default.a.createElement("path", {
        d: "M960 416V192l-73.056 73.056a447.712 447.712 0 0 0-373.6-201.088C265.92 63.968 65.312 264.544 65.312 512S265.92 960.032 513.344 960.032a448.064 448.064 0 0 0 415.232-279.488 38.368 38.368 0 1 0-71.136-28.896 371.36 371.36 0 0 1-344.096 231.584C308.32 883.232 142.112 717.024 142.112 512S308.32 140.768 513.344 140.768c132.448 0 251.936 70.08 318.016 179.84L736 416h224z"
      }));
    }
  }]);

  return RotateIcon;
}(external_react_default.a.PureComponent);

var icon_ZoomIcon =
/*#__PURE__*/
function (_React$PureComponent2) {
  icon_inherits(ZoomIcon, _React$PureComponent2);

  function ZoomIcon() {
    icon_classCallCheck(this, ZoomIcon);

    return icon_possibleConstructorReturn(this, icon_getPrototypeOf(ZoomIcon).apply(this, arguments));
  }

  icon_createClass(ZoomIcon, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        width: "200",
        height: "200",
        viewBox: "0 0 1024 1024"
      }, external_react_default.a.createElement("path", {
        d: "M368.896 192H224a32 32 0 0 0-32 32v137.888a32 32 0 0 0 64 0V256h112.896a32 32 0 0 0 0-64zM784.864 192H640a32 32 0 1 0 0 64h112.864v105.888a32 32 0 1 0 64 0V224a32 32 0 0 0-32-32zM368.896 777.92H256V672a32 32 0 1 0-64 0v137.92a32 32 0 0 0 32 32h144.896a32 32 0 1 0 0-64zM784.864 640a32 32 0 0 0-32 32v105.92H640a32 32 0 1 0 0 64h144.864a32 32 0 0 0 32-32V672a32 32 0 0 0-32-32z"
      }), external_react_default.a.createElement("path", {
        d: "M912 48h-800c-35.296 0-64 28.704-64 64v800c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-800c0-35.296-28.704-64-64-64z m-800 864v-800h800l0.064 800H112z"
      }));
    }
  }]);

  return ZoomIcon;
}(external_react_default.a.PureComponent);

var icon_CloseIcon =
/*#__PURE__*/
function (_React$PureComponent3) {
  icon_inherits(CloseIcon, _React$PureComponent3);

  function CloseIcon() {
    icon_classCallCheck(this, CloseIcon);

    return icon_possibleConstructorReturn(this, icon_getPrototypeOf(CloseIcon).apply(this, arguments));
  }

  icon_createClass(CloseIcon, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        width: "200",
        height: "200",
        viewBox: "0 0 1024 1024"
      }, external_react_default.a.createElement("path", {
        d: "M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
      }));
    }
  }]);

  return CloseIcon;
}(external_react_default.a.PureComponent);


// CONCATENATED MODULE: ./src/components/Control/index.js
function Control_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Control_typeof = function _typeof(obj) { return typeof obj; }; } else { Control_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Control_typeof(obj); }

function Control_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Control_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Control_createClass(Constructor, protoProps, staticProps) { if (protoProps) Control_defineProperties(Constructor.prototype, protoProps); if (staticProps) Control_defineProperties(Constructor, staticProps); return Constructor; }

function Control_possibleConstructorReturn(self, call) { if (call && (Control_typeof(call) === "object" || typeof call === "function")) { return call; } return Control_assertThisInitialized(self); }

function Control_getPrototypeOf(o) { Control_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Control_getPrototypeOf(o); }

function Control_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Control_setPrototypeOf(subClass, superClass); }

function Control_setPrototypeOf(o, p) { Control_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Control_setPrototypeOf(o, p); }

function Control_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Control_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 控制层
 * 控制图片切换等
 **/
// Libs
 // Context

 // Style

 // Icons

 // Utils



var Control_Control =
/*#__PURE__*/
function (_React$PureComponent) {
  Control_inherits(Control, _React$PureComponent);

  function Control() {
    var _getPrototypeOf2;

    var _this;

    Control_classCallCheck(this, Control);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Control_possibleConstructorReturn(this, (_getPrototypeOf2 = Control_getPrototypeOf(Control)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Control_defineProperty(Control_assertThisInitialized(Control_assertThisInitialized(_this)), "withShow", function (className) {
      var _this$props = _this.props,
          show = _this$props.show,
          zoom = _this$props.zoom;
      return withShowingStatus(className, !zoom && show, Control_default.a.show);
    });

    return _this;
  }

  Control_createClass(Control, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          zoom = _this$props2.zoom,
          page = _this$props2.page,
          set = _this$props2.set,
          backdrop = _this$props2.backdrop,
          mobile = _this$props2.mobile,
          controller = _this$props2.controller,
          unmountSelf = _this$props2.unmountSelf,
          toggleRotate = _this$props2.toggleRotate,
          toggleZoom = _this$props2.toggleZoom,
          toPages = _this$props2.toPages;
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.controls),
        style: {
          backgroundColor: backdrop
        }
      }, controller.rotate && external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.rotateLeft),
        onClick: toggleRotate("left")
      }, external_react_default.a.createElement(icon_RotateIcon, null)), controller.rotate && external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.rotateRight),
        onClick: toggleRotate("right")
      }, external_react_default.a.createElement(icon_RotateIcon, null)), controller.zoom && external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.zoomButton),
        onClick: mobile ? function () {
          return window.open(set[page].src);
        } : toggleZoom
      }, external_react_default.a.createElement(icon_ZoomIcon, null)), controller.close && external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.closeButton),
        onClick: zoom ? toggleZoom : unmountSelf
      }, external_react_default.a.createElement(icon_CloseIcon, null))), Array.isArray(set) && set.length > 1 && controller.pagination && external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.pages),
        style: {
          backgroundColor: backdrop
        }
      }, set.map(function (_, i) {
        return i === page ? external_react_default.a.createElement("span", {
          key: i,
          className: Control_default.a.blackDot
        }) : external_react_default.a.createElement("span", {
          key: i,
          className: Control_default.a.whiteDot,
          onClick: function onClick() {
            return toPages(i);
          }
        });
      })));
    }
  }]);

  return Control;
}(external_react_default.a.PureComponent);

/* harmony default export */ var src_components_Control = (context_ContextConsumer(Control_Control));
// EXTERNAL MODULE: ./src/components/Image/index.less
var Image = __webpack_require__("./src/components/Image/index.less");
var Image_default = /*#__PURE__*/__webpack_require__.n(Image);

// CONCATENATED MODULE: ./src/components/Image/index.js
function Image_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Image_typeof = function _typeof(obj) { return typeof obj; }; } else { Image_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Image_typeof(obj); }

function Image_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Image_defineProperty(target, key, source[key]); }); } return target; }

function Image_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Image_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Image_createClass(Constructor, protoProps, staticProps) { if (protoProps) Image_defineProperties(Constructor.prototype, protoProps); if (staticProps) Image_defineProperties(Constructor, staticProps); return Constructor; }

function Image_possibleConstructorReturn(self, call) { if (call && (Image_typeof(call) === "object" || typeof call === "function")) { return call; } return Image_assertThisInitialized(self); }

function Image_getPrototypeOf(o) { Image_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Image_getPrototypeOf(o); }

function Image_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Image_setPrototypeOf(subClass, superClass); }

function Image_setPrototypeOf(o, p) { Image_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Image_setPrototypeOf(o, p); }

function Image_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Image_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 图片层
 * 展示图片, 控制图片尺寸
 **/
// Libs
 // Context

 // Styles

 // Utils



var Image_Images =
/*#__PURE__*/
function (_React$PureComponent) {
  Image_inherits(Images, _React$PureComponent);

  function Images(props) {
    var _this;

    Image_classCallCheck(this, Images);

    _this = Image_possibleConstructorReturn(this, Image_getPrototypeOf(Images).call(this, props)); // Refs

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "updateImageStyle", function () {
      var newStyle = Images.getImageStyle(_this.props, _this.imageRef);

      _this.setStyle(newStyle);
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "updateZoomEventListenerWithState", function () {
      var _this$props = _this.props,
          show = _this$props.show,
          zoom = _this$props.zoom;

      if (show && zoom && !_this.listeningMouseMove) {
        window.addEventListener('mousemove', _this.handleMouseMove);
        _this.listeningMouseMove = true;
      } else {
        window.removeEventListener('mousemove', _this.handleMouseMove);
        _this.listeningMouseMove = false;
      }
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleMouseMove", function (e) {
      var zoomingStyle = Images.getZoomingStyle(_this.props, _this.imageRef, e);

      _this.setStyle(zoomingStyle);
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleResize", function (e) {
      _this.updateImageStyle();
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleTransitionEnded", function (e) {
      if (e.target === _this.imageRef.current) {
        var show = _this.props.show;
        !show && _this.removeImage();
      }
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleScroll", function () {
      if (_this.imageRef.current) {
        var show = _this.props.show;
        _this.imageRef.current.style.top = "calc(50% + ".concat(show ? 0 : _this.initialPageOffset - window.pageYOffset, "px)");
      }
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleImageLoad", function () {
      var _this$props2 = _this.props,
          page = _this$props2.page,
          set = _this$props2.set,
          cover = _this$props2.cover;
      set[page].src !== cover.getAttribute("src") && _this.updateImageStyle();
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleImageClick", function () {
      var _this$props3 = _this.props,
          zoom = _this$props3.zoom,
          toggleZoom = _this$props3.toggleZoom;
      zoom && toggleZoom();
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleImageError", function () {
      console.warn("Initialization error because the cover image url invalid.");

      _this.removeImage();
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "setStyle", function (newStyle) {
      var mergedStyle = Image_objectSpread({}, _this.state.currentStyle, newStyle);

      _this.setState({
        loading: false,
        currentStyle: mergedStyle
      });
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "removeImage", function () {
      var _this$props4 = _this.props,
          cover = _this$props4.cover,
          remove = _this$props4.remove; // 显示封面原图

      cover.style.visibility = 'visible'; // 移除节点

      setTimeout(remove, 200);
    });

    _this.imageRef = external_react_default.a.createRef(); // 初始页面高度

    _this.initialPageOffset = window.pageYOffset; // 监听状态

    _this.listeningMouseMove = false;
    _this.state = {
      currentStyle: Images.getCoverStyle(props)
    };
    return _this;
  }

  Image_createClass(Images, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      addListenScroll(this.handleScroll);
      window.addEventListener('resize', this.handleResize);
      window.addEventListener("transitionend", this.handleTransitionEnded);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      // 更新样式
      var prevShow = prevProps.show,
          prevZoom = prevProps.zoom,
          prevRotate = prevProps.rotate;
      var _this$props5 = this.props,
          currShow = _this$props5.show,
          currZoom = _this$props5.zoom,
          currRotate = _this$props5.rotate; // Page 导致的 src 变化的 update 交给图片自身的 onload 调用

      if (prevShow !== currShow || prevZoom !== currZoom || prevRotate !== currRotate) {
        // 更新样式 (添加延迟, 避免 Safari 初次获取不到 ref 的 bug)
        if (!prevShow) {
          setTimeout(this.updateImageStyle, 50);
        } else {
          this.updateImageStyle();
        } // 更新监听状态


        this.updateZoomEventListenerWithState();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("transitionend", this.handleTransitionEnded);
      window.removeEventListener('resize', this.handleResize);
      removeListenScroll(this.handleScroll);
    }
    /**
     * 信息更新
     **/

  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          show = _this$props6.show,
          zoom = _this$props6.zoom,
          page = _this$props6.page,
          set = _this$props6.set;
      var cs = this.state.currentStyle;
      return external_react_default.a.createElement(external_react_["Fragment"], null, show && external_react_default.a.createElement("div", {
        className: Image_default.a.loadingContainer
      }, external_react_default.a.createElement("div", {
        className: Image_default.a.loading
      })), external_react_default.a.createElement("img", {
        key: "".concat(page, "-").concat(set[page].src),
        className: "".concat(Image_default.a.imageLayer).concat(zoom ? " ".concat(Image_default.a.zooming) : ""),
        style: {
          transform: "translate3d(-50%, -50%, 0) translate3d(".concat(cs.x, "px, ").concat(cs.y, "px, 0px) scale3d(").concat(cs.scale, ", ").concat(cs.scale, ", 1) rotate3d(0, 0, 1, ").concat(cs.rotate, "deg)"),
          cursor: zoom ? 'zoom-out' : 'initial',
          borderRadius: cs.borderRadius
        },
        src: set[page].src,
        alt: set[page].alt,
        ref: this.imageRef,
        onLoad: this.handleImageLoad,
        onClick: this.handleImageClick,
        onError: this.handleImageError
      }));
    }
  }]);

  return Images;
}(external_react_default.a.PureComponent);

Image_defineProperty(Image_Images, "getImageStyle", function (props, imageRef) {
  var show = props.show,
      zoom = props.zoom;

  if (show) {
    if (zoom) {
      return Image_Images.getZoomingStyle(props, imageRef);
    } else {
      return Image_Images.getBrowsingStyle(props, imageRef);
    }
  } else {
    return Image_Images.getCoverStyle(props);
  }
});

Image_defineProperty(Image_Images, "getCoverStyle", function (props) {
  var cover = props.cover,
      page = props.page,
      rotate = props.rotate;
  var naturalWidth = cover.naturalWidth;

  var _cover$getBoundingCli = cover.getBoundingClientRect(),
      top = _cover$getBoundingCli.top,
      left = _cover$getBoundingCli.left,
      width = _cover$getBoundingCli.width,
      height = _cover$getBoundingCli.height;

  var _window$getComputedSt = window.getComputedStyle(cover),
      opacity = _window$getComputedSt.opacity,
      borderRadius = _window$getComputedSt.borderRadius;

  return page === 0 ? {
    x: -scrollWidth() / 2 + left + width / 2,
    y: -windowHeight() / 2 + top + height / 2,
    opacity: ~~opacity || 1,
    scale: width / naturalWidth,
    rotate: rotate - rotate % 360,
    borderRadius: borderRadius
  } : {
    x: 0,
    y: -windowHeight(),
    opacity: 0,
    scale: width / naturalWidth,
    rotate: rotate - rotate % 360,
    borderRadius: borderRadius
  };
});

Image_defineProperty(Image_Images, "getBrowsingStyle", function (props, imageRef) {
  var radius = props.radius,
      edge = props.edge,
      rotate = props.rotate;
  var _imageRef$current = imageRef.current,
      naturalWidth = _imageRef$current.naturalWidth,
      naturalHeight = _imageRef$current.naturalHeight;
  return {
    x: 0,
    y: 0,
    opacity: 1,
    scale: calcFitScale(naturalWidth, naturalHeight, edge),
    rotate: rotate,
    borderRadius: radius
  };
});

Image_defineProperty(Image_Images, "getZoomingStyle", function (props, imageRef) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$clientX = _ref.clientX,
      mouseX = _ref$clientX === void 0 ? scrollWidth() / 2 : _ref$clientX,
      _ref$clientY = _ref.clientY,
      mouseY = _ref$clientY === void 0 ? windowHeight() / 2 : _ref$clientY;

  var radius = props.radius,
      edge = props.edge,
      rotate = props.rotate;
  var _imageRef$current2 = imageRef.current,
      naturalWidth = _imageRef$current2.naturalWidth,
      naturalHeight = _imageRef$current2.naturalHeight;
  var cw = scrollWidth();
  var ch = windowHeight();
  var rangeX = naturalWidth - scrollWidth() + 2 * edge;
  var rangeY = naturalHeight - windowHeight() + 2 * edge; // 计算偏移量

  var imgPosX = naturalWidth > cw ? (naturalWidth - cw) / 2 + edge - rangeX * (mouseX / cw) : 0;
  var imgPosY = naturalHeight > ch ? (naturalHeight - ch) / 2 + edge - rangeY * (mouseY / ch) : 0; // 返回位置

  return {
    x: imgPosX,
    y: imgPosY,
    opacity: 1,
    scale: 1,
    rotate: rotate,
    borderRadius: radius
  };
});

/* harmony default export */ var components_Image = (context_ContextConsumer(Image_Images));
// EXTERNAL MODULE: ./src/components/Background/index.less
var Background = __webpack_require__("./src/components/Background/index.less");
var Background_default = /*#__PURE__*/__webpack_require__.n(Background);

// CONCATENATED MODULE: ./src/components/Background/index.js
/**
 * 背景层
 * 叠加半透明背景
 **/
// Libs
 // Context

 // Style


/* harmony default export */ var components_Background = (context_ContextConsumer(function (_ref) {
  var show = _ref.show,
      zoom = _ref.zoom,
      backdrop = _ref.backdrop,
      unmountSelf = _ref.unmountSelf,
      toggleZoom = _ref.toggleZoom;
  return external_react_default.a.createElement("div", {
    className: Background_default.a.backgroundLayer,
    onClick: zoom ? toggleZoom : unmountSelf,
    style: {
      opacity: show ? 1 : 0,
      background: backdrop || ""
    }
  });
}));
// CONCATENATED MODULE: ./src/components/Wrapper/index.js
function Wrapper_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Wrapper_typeof = function _typeof(obj) { return typeof obj; }; } else { Wrapper_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Wrapper_typeof(obj); }

function Wrapper_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Wrapper_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Wrapper_createClass(Constructor, protoProps, staticProps) { if (protoProps) Wrapper_defineProperties(Constructor.prototype, protoProps); if (staticProps) Wrapper_defineProperties(Constructor, staticProps); return Constructor; }

function Wrapper_possibleConstructorReturn(self, call) { if (call && (Wrapper_typeof(call) === "object" || typeof call === "function")) { return call; } return Wrapper_assertThisInitialized(self); }

function Wrapper_getPrototypeOf(o) { Wrapper_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Wrapper_getPrototypeOf(o); }

function Wrapper_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Wrapper_setPrototypeOf(subClass, superClass); }

function Wrapper_setPrototypeOf(o, p) { Wrapper_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Wrapper_setPrototypeOf(o, p); }

function Wrapper_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Wrapper_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 包裹层
 * 储存主要状态，组织架构
 **/
// Libs
 // Context

 // Style

 // Components



 // Config

 // Utils



var Wrapper_Wrapper =
/*#__PURE__*/
function (_React$PureComponent) {
  Wrapper_inherits(Wrapper, _React$PureComponent);

  function Wrapper(props) {
    var _this;

    Wrapper_classCallCheck(this, Wrapper);

    _this = Wrapper_possibleConstructorReturn(this, Wrapper_getPrototypeOf(Wrapper).call(this, props));

    Wrapper_defineProperty(Wrapper_assertThisInitialized(Wrapper_assertThisInitialized(_this)), "mountSelf", function () {
      var cover = _this.props.cover;

      _this.setState({
        show: true
      }, function () {
        // 隐藏封面原图
        cover.style.visibility = 'hidden'; // 绑定事件

        addListenScroll(_this.handleScroll);
        window.addEventListener('keydown', _this.handleKeyDown);
      });
    });

    Wrapper_defineProperty(Wrapper_assertThisInitialized(Wrapper_assertThisInitialized(_this)), "unMountSelf", function () {
      var cover = _this.props.cover;
      var page = _this.state.page; // 显示封面原图（当前不为第一页时，遮罩从上方移除会迅速露出，需要立即显示，否则交由图片层处理）

      if (page !== 0) cover.style.visibility = 'visible';

      _this.setState({
        show: false
      });
    });

    Wrapper_defineProperty(Wrapper_assertThisInitialized(Wrapper_assertThisInitialized(_this)), "handleKeyDown", function (e) {
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
          hotKey.close && (zoom ? _this.handleToggleZoom() : _this.unMountSelf());
          break;

        default:
          return;
      }
    });

    Wrapper_defineProperty(Wrapper_assertThisInitialized(Wrapper_assertThisInitialized(_this)), "handleScroll", function () {
      _this.state.show && _this.unMountSelf();
    });

    Wrapper_defineProperty(Wrapper_assertThisInitialized(Wrapper_assertThisInitialized(_this)), "handleToPages", function (page) {
      var onSwitching = _this.props.onSwitching;

      _this.setState({
        page: page
      }, function () {
        typeof onSwitching === "function" && onSwitching(_this.state.page);
      });
    });

    Wrapper_defineProperty(Wrapper_assertThisInitialized(Wrapper_assertThisInitialized(_this)), "handleSwitchPages", function (direction) {
      var onSwitching = _this.props.onSwitching;
      return function () {
        var set = _this.props.set;
        var page = _this.state.page;

        _this.setState({
          page: direction === "prev" ? Math.abs(set.length + page - 1) % set.length : (page + 1) % set.length
        }, function () {
          typeof onSwitching === "function" && onSwitching(_this.state.page);
        });
      };
    });

    Wrapper_defineProperty(Wrapper_assertThisInitialized(Wrapper_assertThisInitialized(_this)), "handleToggleZoom", function () {
      var onZooming = _this.props.onZooming;

      _this.setState({
        zoom: !_this.state.zoom
      }, function () {
        typeof onZooming === "function" && onZooming(_this.state.zoom);
      });
    });

    Wrapper_defineProperty(Wrapper_assertThisInitialized(Wrapper_assertThisInitialized(_this)), "handleToggleRotate", function (direction) {
      var onRotating = _this.props.onRotating;

      switch (direction) {
        case "left":
          return function () {
            return _this.setState({
              rotate: _this.state.rotate - 90
            }, function () {
              typeof onRotating === "function" && onRotating(_this.state.rotate);
            });
          };

        case "right":
          return function () {
            return _this.setState({
              rotate: _this.state.rotate + 90
            }, function () {
              typeof onRotating === "function" && onRotating(_this.state.rotate);
            });
          };

        default:
          return function () {
            return _this.setState({
              rotate: 0
            }, function () {
              typeof onRotating === "function" && onRotating(0);
            });
          };
      }
    });

    _this.state = {
      // 显示
      show: false,
      // 缩放
      zoom: false,
      // 页数
      page: 0,
      // 旋转
      rotate: 0
    };
    return _this;
  }

  Wrapper_createClass(Wrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      setTimeout(this.mountSelf, 0);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      removeListenScroll(this.handleScroll);
      window.removeEventListener('keydown', this.handleKeyDown);
    }
    /**
     * 加载器
     **/

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          cover = _this$props2.cover,
          remove = _this$props2.remove,
          set = _this$props2.set,
          controller = _this$props2.controller,
          preset = _this$props2.preset,
          backdrop = _this$props2.backdrop,
          radius = _this$props2.radius,
          edge = _this$props2.edge;
      var _this$state = this.state,
          show = _this$state.show,
          zoom = _this$state.zoom,
          page = _this$state.page,
          rotate = _this$state.rotate;
      var contextValue = {
        // Props
        // 内部
        cover: cover,
        remove: remove,
        // 基础数据
        set: set,
        // 功能控制
        controller: controller,
        preset: preset,
        // 界面样式
        backdrop: backdrop,
        radius: radius,
        edge: edge,
        // State
        show: show,
        zoom: zoom,
        page: page,
        rotate: rotate
      };
      return external_react_default.a.createElement(Context.Provider, {
        value: contextValue
      }, external_react_default.a.createElement("div", {
        className: Wrapper_default.a.wrapperLayer
      }, external_react_default.a.createElement(components_Background, {
        unmountSelf: this.unMountSelf,
        toggleZoom: this.handleToggleZoom
      }), external_react_default.a.createElement(src_components_Control, {
        unmountSelf: this.unMountSelf,
        toPages: this.handleToPages,
        toggleZoom: this.handleToggleZoom,
        toggleRotate: this.handleToggleRotate
      }), external_react_default.a.createElement(components_Image, {
        toggleZoom: this.handleToggleZoom
      })));
    }
  }]);

  return Wrapper;
}(external_react_default.a.PureComponent);


Wrapper_Wrapper.defaultProps = {
  /**
   * 内部
   **/
  cover: {},
  remove: function remove() {},

  /**
   * 基础数据
   **/
  alt: defProp.alt,
  txt: defProp.txt,
  set: defProp.set,

  /**
   * 功能控制
   **/
  controller: defProp.controller,
  hotKey: defProp.hotKey,

  /**
   * 界面样式
   **/
  backdrop: defProp.backdrop,
  radius: defProp.radius,
  edge: defProp.edge,

  /**
   * 生命周期
   **/
  onZooming: defProp.onZooming,
  onSwitching: defProp.onSwitching,
  onRotating: defProp.onRotating
};
Wrapper_Wrapper.propTypes = {
  /**
   * 内部
   **/
  cover: defType.cover,
  remove: defType.remove,

  /**
   * 基础数据
   **/
  alt: defType.alt,
  txt: defType.txt,
  set: defType.set,

  /**
   * 功能控制
   **/
  controller: defType.controller,
  hotKey: defType.hotKey,

  /**
   * 界面样式
   **/
  backdrop: defType.backdrop,
  radius: defType.radius,
  edge: defType.edge,

  /**
   * 生命周期
   **/
  onZooming: defType.onZooming,
  onSwitching: defType.onSwitching,
  onRotating: defType.onRotating
};
// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return src_ReactZmage; });
function src_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { src_typeof = function _typeof(obj) { return typeof obj; }; } else { src_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return src_typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function src_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { src_defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }

function src_possibleConstructorReturn(self, call) { if (call && (src_typeof(call) === "object" || typeof call === "function")) { return call; } return src_assertThisInitialized(self); }

function src_getPrototypeOf(o) { src_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return src_getPrototypeOf(o); }

function src_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) src_setPrototypeOf(subClass, superClass); }

function src_setPrototypeOf(o, p) { src_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return src_setPrototypeOf(o, p); }

function src_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 应用主入口
 **/
// Libs
 // Components


 // Config



var src_ReactZmage =
/*#__PURE__*/
function (_React$PureComponent) {
  src_inherits(ReactZmage, _React$PureComponent);

  function ReactZmage(props) {
    var _this;

    src_classCallCheck(this, ReactZmage);

    _this = src_possibleConstructorReturn(this, src_getPrototypeOf(ReactZmage).call(this, props));

    src_defineProperty(src_assertThisInitialized(src_assertThisInitialized(_this)), "inBrowsing", function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          onBrowsing = _this$props.onBrowsing;

      _this.setState({
        browsing: true
      }, function () {
        typeof onClick === "function" && onClick(e);
        typeof onBrowsing === "function" && onBrowsing(true);
      });
    });

    src_defineProperty(src_assertThisInitialized(src_assertThisInitialized(_this)), "unBrowsing", function () {
      var onBrowsing = _this.props.onBrowsing;

      _this.setState({
        browsing: false
      }, function () {
        typeof onBrowsing === "function" && onBrowsing(false);
      });
    });

    src_defineProperty(src_assertThisInitialized(src_assertThisInitialized(_this)), "buildSet", function (set) {
      var _this$props2 = _this.props,
          src = _this$props2.src,
          alt = _this$props2.alt,
          txt = _this$props2.txt;
      return Array.isArray(set) && set.length > 0 ? set : [{
        src: src,
        alt: alt,
        txt: txt
      }];
    });

    _this.cover = external_react_default.a.createRef();
    _this.state = {
      browsing: false
    };
    return _this;
  } // 切换查看状态


  src_createClass(ReactZmage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var browsing = this.state.browsing;

      var _this$props3 = this.props,
          className = _this$props3.className,
          style = _this$props3.style,
          src = _this$props3.src,
          alt = _this$props3.alt,
          txt = _this$props3.txt,
          set = _this$props3.set,
          controller = _this$props3.controller,
          hotKey = _this$props3.hotKey,
          preset = _this$props3.preset,
          backdrop = _this$props3.backdrop,
          zIndex = _this$props3.zIndex,
          radius = _this$props3.radius,
          edge = _this$props3.edge,
          onBrowsing = _this$props3.onBrowsing,
          onZooming = _this$props3.onZooming,
          onSwitching = _this$props3.onSwitching,
          onRotating = _this$props3.onRotating,
          props = _objectWithoutProperties(_this$props3, ["className", "style", "src", "alt", "txt", "set", "controller", "hotKey", "preset", "backdrop", "zIndex", "radius", "edge", "onBrowsing", "onZooming", "onSwitching", "onRotating"]);

      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("img", _extends({
        ref: function ref(_ref) {
          return _this2.cover = _ref;
        },
        className: className,
        style: src_objectSpread({
          cursor: 'zoom-in'
        }, style),
        src: src,
        alt: alt,
        title: alt,
        onClick: this.inBrowsing
      }, props)), browsing && function () {
        var defPropWithEnv = preset === defType.preset.desktop ? defPropDesktop : defType.preset.mobile ? defPropMobile : defPropAuto(true);
        return external_react_default.a.createElement(Portals_Portals, {
          zIndex: zIndex
        }, external_react_default.a.createElement(Wrapper_Wrapper // 内部
        , {
          cover: _this2.cover,
          remove: _this2.unBrowsing // 基础数据
          ,
          alt: alt,
          txt: txt,
          set: _this2.buildSet(set) // 功能控制
          ,
          controller: src_objectSpread({}, defPropWithEnv.controller, controller),
          hotKey: src_objectSpread({}, defPropWithEnv.hotKey, hotKey) // 界面样式
          ,
          backdrop: backdrop,
          radius: radius || defPropWithEnv.radius,
          edge: edge || defPropWithEnv.edge // 生命周期
          ,
          onZooming: onZooming,
          onSwitching: onSwitching,
          onRotating: onRotating
        }));
      }());
    }
  }]);

  return ReactZmage;
}(external_react_default.a.PureComponent);


src_ReactZmage.defaultProps = {
  /**
   * 基础数据
   **/
  src: defProp.src,
  alt: defProp.alt,
  txt: defProp.txt,
  set: defProp.set,

  /**
   * 预设
   **/
  preset: defProp.preset,

  /**
   * 功能控制
   **/
  controller: defProp.controller,
  hotKey: defProp.hotKey,

  /**
   * 界面样式
   **/
  backdrop: defProp.backdrop,
  zIndex: defProp.zIndex,
  radius: defProp.radius,
  edge: defProp.edge,

  /**
   * 生命周期
   **/
  onBrowsing: defProp.onBrowsing,
  onZooming: defProp.onZooming,
  onSwitching: defProp.onSwitching,
  onRotating: defProp.onRotating
};
src_ReactZmage.propTypes = {
  /**
   * 基础数据
   **/
  src: defType.src,
  alt: defType.alt,
  txt: defType.txt,
  set: defType.set,

  /**
   * 预设
   **/
  preset: defType.preset,

  /**
   * 功能控制
   **/
  controller: defType.controller,
  hotKey: defType.hotKey,

  /**
   * 界面样式
   **/
  backdrop: defType.backdrop,
  zIndex: defType.zIndex,
  radius: defType.radius,
  edge: defType.edge,

  /**
   * 生命周期
   **/
  onBrowsing: defType.onBrowsing,
  onZooming: defType.onZooming,
  onSwitching: defType.onSwitching,
  onRotating: defType.onRotating
};

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/*! exports used: Fragment, createContext, default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ })

/******/ });