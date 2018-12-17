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
exports.push([module.i, ".backgroundLayer__3NsFV {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  cursor: zoom-out;\n  background-color: #ffffff;\n  transition: opacity 0.2s;\n  will-change: opacity;\n}\n", ""]);

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
exports.push([module.i, ".baseButton__kkQlr {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.baseButton__kkQlr > svg {\n  display: block;\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd {\n  box-sizing: border-box;\n  position: absolute;\n  top: 0.6em;\n  right: 0.6em;\n  opacity: 0;\n  display: flex;\n  z-index: 1000;\n  border-radius: 5em;\n  -webkit-transform: translateX(100%);\n          transform: translateX(100%);\n  transition: opacity 0.3s, -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s;\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s, -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd.show__21Y84 {\n  opacity: 0.8;\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n}\n.controls__1g_fd .pinButton__2Hb4o {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2em;\n  height: 2em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .pinButton__2Hb4o > svg {\n  display: block;\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd .pinButton__2Hb4o:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__1g_fd .pinButton__2Hb4o:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__1g_fd .pinButton__2Hb4o:first-of-type {\n  margin-left: 0.4em;\n}\n.controls__1g_fd .pinButton__2Hb4o:last-of-type {\n  margin-right: 0.4em;\n}\n.controls__1g_fd .rotate__L_2Uf {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2em;\n  height: 2em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .rotate__L_2Uf > svg {\n  display: block;\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd .rotate__L_2Uf:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__1g_fd .rotate__L_2Uf:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__1g_fd .rotate__L_2Uf:first-of-type {\n  margin-left: 0.4em;\n}\n.controls__1g_fd .rotate__L_2Uf:last-of-type {\n  margin-right: 0.4em;\n}\n.controls__1g_fd .rotate__L_2Uf svg {\n  width: 1.75em;\n  transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .rotateLeft__zTxLt {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2em;\n  height: 2em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .rotateLeft__zTxLt > svg {\n  display: block;\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd .rotateLeft__zTxLt:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__1g_fd .rotateLeft__zTxLt:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__1g_fd .rotateLeft__zTxLt:first-of-type {\n  margin-left: 0.4em;\n}\n.controls__1g_fd .rotateLeft__zTxLt:last-of-type {\n  margin-right: 0.4em;\n}\n.controls__1g_fd .rotateLeft__zTxLt svg {\n  width: 1.75em;\n  transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .rotateLeft__zTxLt:hover svg {\n  -webkit-transform: rotate(-30deg);\n          transform: rotate(-30deg);\n}\n.controls__1g_fd .rotateRight__29Er8 {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2em;\n  height: 2em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .rotateRight__29Er8 > svg {\n  display: block;\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd .rotateRight__29Er8:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__1g_fd .rotateRight__29Er8:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__1g_fd .rotateRight__29Er8:first-of-type {\n  margin-left: 0.4em;\n}\n.controls__1g_fd .rotateRight__29Er8:last-of-type {\n  margin-right: 0.4em;\n}\n.controls__1g_fd .rotateRight__29Er8 svg {\n  width: 1.75em;\n  transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .rotateRight__29Er8:hover svg {\n  -webkit-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.controls__1g_fd .zoomButton__x8Ef7 {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2em;\n  height: 2em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .zoomButton__x8Ef7 > svg {\n  display: block;\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd .zoomButton__x8Ef7:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__1g_fd .zoomButton__x8Ef7:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__1g_fd .zoomButton__x8Ef7:first-of-type {\n  margin-left: 0.4em;\n}\n.controls__1g_fd .zoomButton__x8Ef7:last-of-type {\n  margin-right: 0.4em;\n}\n.controls__1g_fd .closeButton__awvpY {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2em;\n  height: 2em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__1g_fd .closeButton__awvpY > svg {\n  display: block;\n  width: 2em;\n  height: 2em;\n}\n.controls__1g_fd .closeButton__awvpY:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__1g_fd .closeButton__awvpY:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__1g_fd .closeButton__awvpY:first-of-type {\n  margin-left: 0.4em;\n}\n.controls__1g_fd .closeButton__awvpY:last-of-type {\n  margin-right: 0.4em;\n}\n.sideButton__FTTh6 {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  opacity: 0;\n  position: absolute;\n  top: 50%;\n  padding: 0.4em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.sideButton__FTTh6 > svg {\n  display: block;\n  width: 2em;\n  height: 2em;\n}\n.sideButton__FTTh6:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: translateX(0) translateY(-50%) !important;\n          transform: translateX(0) translateY(-50%) !important;\n}\n.sideButton__FTTh6:active {\n  opacity: 1 !important;\n}\n.sideButton__FTTh6.show__21Y84 {\n  opacity: 0.8;\n}\n.flipLeft__2Qw56 {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  opacity: 0;\n  position: absolute;\n  top: 50%;\n  padding: 0.4em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  left: 0;\n  padding-left: 0.6em;\n  border-radius: 0 0.5em 0.5em 0;\n  -webkit-transform: translateX(-100%) translateY(-50%);\n          transform: translateX(-100%) translateY(-50%);\n}\n.flipLeft__2Qw56 > svg {\n  display: block;\n  width: 2em;\n  height: 2em;\n}\n.flipLeft__2Qw56:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: translateX(0) translateY(-50%) !important;\n          transform: translateX(0) translateY(-50%) !important;\n}\n.flipLeft__2Qw56:active {\n  opacity: 1 !important;\n}\n.flipLeft__2Qw56.show__21Y84 {\n  opacity: 0.8;\n}\n.flipLeft__2Qw56:active {\n  -webkit-transform: translate(-0.2em) translateY(-50%) !important;\n          transform: translate(-0.2em) translateY(-50%) !important;\n}\n.flipLeft__2Qw56.show__21Y84 {\n  opacity: 0.8;\n  -webkit-transform: translate(-0.2em) translateY(-50%);\n          transform: translate(-0.2em) translateY(-50%);\n}\n.flipRight__WFDfz {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  opacity: 0;\n  position: absolute;\n  top: 50%;\n  padding: 0.4em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.15s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.15s cubic-bezier(0.6, 0, 0.1, 1);\n  right: 0;\n  padding-right: 0.6em;\n  border-radius: 0.5em 0 0 0.5em;\n  -webkit-transform: translateX(100%) translateY(-50%);\n          transform: translateX(100%) translateY(-50%);\n}\n.flipRight__WFDfz > svg {\n  display: block;\n  width: 2em;\n  height: 2em;\n}\n.flipRight__WFDfz:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: translateX(0) translateY(-50%) !important;\n          transform: translateX(0) translateY(-50%) !important;\n}\n.flipRight__WFDfz:active {\n  opacity: 1 !important;\n}\n.flipRight__WFDfz.show__21Y84 {\n  opacity: 0.8;\n}\n.flipRight__WFDfz:active {\n  -webkit-transform: translate(0.2em) translateY(-50%) !important;\n          transform: translate(0.2em) translateY(-50%) !important;\n}\n.flipRight__WFDfz.show__21Y84 {\n  opacity: 0.8;\n  -webkit-transform: translate(0.2em) translateY(-50%);\n          transform: translate(0.2em) translateY(-50%);\n}\n.pages__2HbvG {\n  box-sizing: border-box;\n  display: flex;\n  position: absolute;\n  left: 50%;\n  bottom: 0.6em;\n  z-index: 110;\n  opacity: 0;\n  border-radius: 2em;\n  -webkit-transform: translate(-50%, 100px);\n          transform: translate(-50%, 100px);\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.3s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.pages__2HbvG.show__21Y84 {\n  opacity: 0.8;\n  -webkit-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n}\n.pages__2HbvG .dot__UXAlC {\n  cursor: pointer;\n  margin: 0.7em 0.4em;\n  display: block;\n  width: 0.7em;\n  height: 0.7em;\n  border-radius: 0.7em;\n  background: black;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.2s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.2s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.2s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.2s cubic-bezier(0.6, 0, 0.1, 1);\n}\n.pages__2HbvG .dot__UXAlC:first-of-type {\n  margin-left: 0.7em;\n}\n.pages__2HbvG .dot__UXAlC:last-of-type {\n  margin-right: 0.7em;\n}\n.pages__2HbvG .dot__UXAlC:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.pages__2HbvG .dot__UXAlC:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.pages__2HbvG .blackDot__RMfnt {\n  cursor: pointer;\n  margin: 0.7em 0.4em;\n  display: block;\n  width: 0.7em;\n  height: 0.7em;\n  border-radius: 0.7em;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.2s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.2s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.2s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.2s cubic-bezier(0.6, 0, 0.1, 1);\n  background: black;\n}\n.pages__2HbvG .blackDot__RMfnt:first-of-type {\n  margin-left: 0.7em;\n}\n.pages__2HbvG .blackDot__RMfnt:last-of-type {\n  margin-right: 0.7em;\n}\n.pages__2HbvG .blackDot__RMfnt:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.pages__2HbvG .blackDot__RMfnt:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.pages__2HbvG .whiteDot__GgDF0 {\n  cursor: pointer;\n  margin: 0.7em 0.4em;\n  display: block;\n  width: 0.7em;\n  height: 0.7em;\n  border-radius: 0.7em;\n  background: black;\n  transition: opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.2s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.2s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 0.2s cubic-bezier(0.6, 0, 0.1, 1), opacity 0.3s cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 0.2s cubic-bezier(0.6, 0, 0.1, 1);\n  background: #999;\n}\n.pages__2HbvG .whiteDot__GgDF0:first-of-type {\n  margin-left: 0.7em;\n}\n.pages__2HbvG .whiteDot__GgDF0:last-of-type {\n  margin-right: 0.7em;\n}\n.pages__2HbvG .whiteDot__GgDF0:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.pages__2HbvG .whiteDot__GgDF0:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n", ""]);

// exports
exports.locals = {
	"baseButton": "baseButton__kkQlr",
	"controls": "controls__1g_fd",
	"show": "show__21Y84",
	"pinButton": "pinButton__2Hb4o",
	"rotate": "rotate__L_2Uf",
	"rotateLeft": "rotateLeft__zTxLt",
	"rotateRight": "rotateRight__29Er8",
	"zoomButton": "zoomButton__x8Ef7",
	"closeButton": "closeButton__awvpY",
	"sideButton": "sideButton__FTTh6",
	"flipLeft": "flipLeft__2Qw56",
	"flipRight": "flipRight__WFDfz",
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
exports.push([module.i, ".imageLayer__fT2s0 {\n  transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 10;\n  border-radius: 5px;\n  will-change: transform, top;\n}\n.imageLayer__fT2s0.zooming__wGVSq {\n  transition-timing-function: cubic-bezier(0, 0.1, 0.1, 1);\n}\n", ""]);

// exports
exports.locals = {
	"imageLayer": "imageLayer__fT2s0",
	"zooming": "zooming__wGVSq"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/components/Image/loading.less":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js!./src/components/Image/loading.less ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".loadingContainer__24XfE {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-animation: fadeIn__1qCY7 1s linear forwards;\n          animation: fadeIn__1qCY7 1s linear forwards;\n}\n.loadingContainer__24XfE .reload__1yQYi {\n  border: 2px solid;\n  border-radius: 5px;\n  font-size: 1em;\n  padding: 0.5em;\n  cursor: pointer;\n  outline: none;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.loadingContainer__24XfE .reload__1yQYi:hover {\n  opacity: 0.8;\n}\n.loadingContainer__24XfE .reload__1yQYi:hover svg {\n  -webkit-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.loadingContainer__24XfE .reload__1yQYi:active {\n  opacity: 1;\n}\n.loadingContainer__24XfE .reload__1yQYi svg {\n  display: block;\n  transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.loadingContainer__24XfE .loading__22qoY {\n  border: 3px solid #f3f3f3;\n  border-top: 3px solid black;\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-animation: spin__3w_gj 1s linear infinite;\n          animation: spin__3w_gj 1s linear infinite;\n}\n@-webkit-keyframes fadeIn__1qCY7 {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn__1qCY7 {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes spin__3w_gj {\n  0% {\n    -webkit-transform: translate(-50%, -50%) rotate(0deg);\n            transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    -webkit-transform: translate(-50%, -50%) rotate(360deg);\n            transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n@keyframes spin__3w_gj {\n  0% {\n    -webkit-transform: translate(-50%, -50%) rotate(0deg);\n            transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    -webkit-transform: translate(-50%, -50%) rotate(360deg);\n            transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n", ""]);

// exports
exports.locals = {
	"loadingContainer": "loadingContainer__24XfE",
	"fadeIn": "fadeIn__1qCY7",
	"reload": "reload__1yQYi",
	"loading": "loading__22qoY",
	"spin": "spin__3w_gj"
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

/***/ "./src/components/Image/loading.less":
/*!*******************************************!*\
  !*** ./src/components/Image/loading.less ***!
  \*******************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--8-1!../../../node_modules/postcss-loader/src??postcss!../../../node_modules/less-loader/dist/cjs.js!./loading.less */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js!./src/components/Image/loading.less");

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
/*!***********************************!*\
  !*** ./src/index.js + 10 modules ***!
  \***********************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Background/index.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Control/index.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Image/index.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Image/loading.less (<- Module is not an ECMAScript module) */
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
// 通过屏幕尺寸以及图片尺寸，计算出图片在屏幕中完整显示的缩放比例
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
  // 图片默认页
  defaultPage: external_prop_types_default.a.number,

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
    // 关闭（ESC）
    close: external_prop_types_default.a.bool,
    // 缩放（空格）
    zoom: external_prop_types_default.a.bool,
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
      close: true,
      zoom: true,
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
      close: true,
      flip: false
    },
    hotKey: {
      close: false,
      zoom: false,
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
  // 图片默认页
  defaultPage: 0,

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

// CONCATENATED MODULE: ./src/asserts/icons/index.js
function icons_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { icons_typeof = function _typeof(obj) { return typeof obj; }; } else { icons_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return icons_typeof(obj); }

function icons_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function icons_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function icons_createClass(Constructor, protoProps, staticProps) { if (protoProps) icons_defineProperties(Constructor.prototype, protoProps); if (staticProps) icons_defineProperties(Constructor, staticProps); return Constructor; }

function icons_possibleConstructorReturn(self, call) { if (call && (icons_typeof(call) === "object" || typeof call === "function")) { return call; } return icons_assertThisInitialized(self); }

function icons_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function icons_getPrototypeOf(o) { icons_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return icons_getPrototypeOf(o); }

function icons_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) icons_setPrototypeOf(subClass, superClass); }

function icons_setPrototypeOf(o, p) { icons_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return icons_setPrototypeOf(o, p); }

// React Libs

var icons_RotateLeftIcon =
/*#__PURE__*/
function (_React$PureComponent) {
  icons_inherits(RotateLeftIcon, _React$PureComponent);

  function RotateLeftIcon() {
    icons_classCallCheck(this, RotateLeftIcon);

    return icons_possibleConstructorReturn(this, icons_getPrototypeOf(RotateLeftIcon).apply(this, arguments));
  }

  icons_createClass(RotateLeftIcon, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, external_react_default.a.createElement("path", {
        fill: "none",
        d: "M0 0h24v24H0V0z"
      }), external_react_default.a.createElement("path", {
        d: "M6.56 7.98C6.1 7.52 5.31 7.6 5 8.17c-.28.51-.5 1.03-.67 1.58-.19.63.31 1.25.96 1.25h.01c.43 0 .82-.28.94-.7.12-.4.28-.79.48-1.17.22-.37.15-.84-.16-1.15zM5.31 13h-.02c-.65 0-1.15.62-.96 1.25.16.54.38 1.07.66 1.58.31.57 1.11.66 1.57.2.3-.31.38-.77.17-1.15-.2-.37-.36-.76-.48-1.16-.12-.44-.51-.72-.94-.72zm2.85 6.02c.51.28 1.04.5 1.59.66.62.18 1.24-.32 1.24-.96v-.03c0-.43-.28-.82-.7-.94-.4-.12-.78-.28-1.15-.48-.38-.21-.86-.14-1.16.17l-.03.03c-.45.45-.36 1.24.21 1.55zM13 4.07v-.66c0-.89-1.08-1.34-1.71-.71L9.17 4.83c-.4.4-.4 1.04 0 1.43l2.13 2.08c.63.62 1.7.17 1.7-.72V6.09c2.84.48 5 2.94 5 5.91 0 2.73-1.82 5.02-4.32 5.75-.41.12-.68.51-.68.94v.02c0 .65.61 1.14 1.23.96C17.57 18.71 20 15.64 20 12c0-4.08-3.05-7.44-7-7.93z"
      }));
    }
  }]);

  return RotateLeftIcon;
}(external_react_default.a.PureComponent);
var icons_RotateRightIcon =
/*#__PURE__*/
function (_React$PureComponent2) {
  icons_inherits(RotateRightIcon, _React$PureComponent2);

  function RotateRightIcon() {
    icons_classCallCheck(this, RotateRightIcon);

    return icons_possibleConstructorReturn(this, icons_getPrototypeOf(RotateRightIcon).apply(this, arguments));
  }

  icons_createClass(RotateRightIcon, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, external_react_default.a.createElement("path", {
        fill: "none",
        d: "M0 0h24v24H0V0z"
      }), external_react_default.a.createElement("path", {
        d: "M14.83 4.83L12.7 2.7c-.62-.62-1.7-.18-1.7.71v.66C7.06 4.56 4 7.92 4 12c0 3.64 2.43 6.71 5.77 7.68.62.18 1.23-.32 1.23-.96v-.03c0-.43-.27-.82-.68-.94C7.82 17.03 6 14.73 6 12c0-2.97 2.16-5.43 5-5.91v1.53c0 .89 1.07 1.33 1.7.71l2.13-2.08c.4-.38.4-1.02 0-1.42zm4.84 4.93c-.16-.55-.38-1.08-.66-1.59-.31-.57-1.1-.66-1.56-.2l-.01.01c-.31.31-.38.78-.17 1.16.2.37.36.76.48 1.16.12.42.51.7.94.7h.02c.65 0 1.15-.62.96-1.24zM13 18.68v.02c0 .65.62 1.14 1.24.96.55-.16 1.08-.38 1.59-.66.57-.31.66-1.1.2-1.56l-.02-.02c-.31-.31-.78-.38-1.16-.17-.37.21-.76.37-1.16.49-.41.12-.69.51-.69.94zm4.44-2.65c.46.46 1.25.37 1.56-.2.28-.51.5-1.04.67-1.59.18-.62-.31-1.24-.96-1.24h-.02c-.44 0-.82.28-.94.7-.12.4-.28.79-.48 1.17-.21.38-.13.86.17 1.16z"
      }));
    }
  }]);

  return RotateRightIcon;
}(external_react_default.a.PureComponent);
var icons_ZoomIcon =
/*#__PURE__*/
function (_React$PureComponent3) {
  icons_inherits(ZoomIcon, _React$PureComponent3);

  function ZoomIcon() {
    icons_classCallCheck(this, ZoomIcon);

    return icons_possibleConstructorReturn(this, icons_getPrototypeOf(ZoomIcon).apply(this, arguments));
  }

  icons_createClass(ZoomIcon, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, external_react_default.a.createElement("path", {
        fill: "none",
        d: "M0 0h24v24H0V0z"
      }), external_react_default.a.createElement("path", {
        d: "M6 14c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1H7v-2c0-.55-.45-1-1-1zm0-4c.55 0 1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm11 7h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v2zM14 6c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z"
      }));
    }
  }]);

  return ZoomIcon;
}(external_react_default.a.PureComponent);
var icons_ArrowLeftIcon =
/*#__PURE__*/
function (_React$PureComponent4) {
  icons_inherits(ArrowLeftIcon, _React$PureComponent4);

  function ArrowLeftIcon() {
    icons_classCallCheck(this, ArrowLeftIcon);

    return icons_possibleConstructorReturn(this, icons_getPrototypeOf(ArrowLeftIcon).apply(this, arguments));
  }

  icons_createClass(ArrowLeftIcon, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, external_react_default.a.createElement("path", {
        d: "M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"
      }));
    }
  }]);

  return ArrowLeftIcon;
}(external_react_default.a.PureComponent);
var icons_ArrowRightIcon =
/*#__PURE__*/
function (_React$PureComponent5) {
  icons_inherits(ArrowRightIcon, _React$PureComponent5);

  function ArrowRightIcon() {
    icons_classCallCheck(this, ArrowRightIcon);

    return icons_possibleConstructorReturn(this, icons_getPrototypeOf(ArrowRightIcon).apply(this, arguments));
  }

  icons_createClass(ArrowRightIcon, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, external_react_default.a.createElement("path", {
        d: "M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
      }));
    }
  }]);

  return ArrowRightIcon;
}(external_react_default.a.PureComponent);
var icons_CloseIcon =
/*#__PURE__*/
function (_React$PureComponent6) {
  icons_inherits(CloseIcon, _React$PureComponent6);

  function CloseIcon() {
    icons_classCallCheck(this, CloseIcon);

    return icons_possibleConstructorReturn(this, icons_getPrototypeOf(CloseIcon).apply(this, arguments));
  }

  icons_createClass(CloseIcon, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, external_react_default.a.createElement("path", {
        fill: "none",
        d: "M0 0h24v24H0V0z"
      }), external_react_default.a.createElement("path", {
        d: "M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
      }));
    }
  }]);

  return CloseIcon;
}(external_react_default.a.PureComponent);
var icons_Refresh =
/*#__PURE__*/
function (_React$PureComponent7) {
  icons_inherits(Refresh, _React$PureComponent7);

  function Refresh() {
    icons_classCallCheck(this, Refresh);

    return icons_possibleConstructorReturn(this, icons_getPrototypeOf(Refresh).apply(this, arguments));
  }

  icons_createClass(Refresh, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24"
      }, external_react_default.a.createElement("path", {
        fill: "none",
        d: "M0 0h24v24H0V0z"
      }), external_react_default.a.createElement("path", {
        d: "M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71l-.64.65z"
      }));
    }
  }]);

  return Refresh;
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
          toPages = _this$props2.toPages,
          toPrevPage = _this$props2.toPrevPage,
          toNextPage = _this$props2.toNextPage;
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.controls),
        style: {
          backgroundColor: backdrop
        }
      }, controller.rotate && external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.rotateLeft),
        onClick: toggleRotate("left")
      }, external_react_default.a.createElement(icons_RotateLeftIcon, null)), controller.rotate && external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.rotateRight),
        onClick: toggleRotate("right")
      }, external_react_default.a.createElement(icons_RotateRightIcon, null)), controller.zoom && external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.zoomButton),
        onClick: mobile ? function () {
          return window.open(set[page].src);
        } : toggleZoom
      }, external_react_default.a.createElement(icons_ZoomIcon, null)), controller.close && external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.closeButton),
        onClick: zoom ? toggleZoom : unmountSelf
      }, external_react_default.a.createElement(icons_CloseIcon, null))), Array.isArray(set) && set.length > 1 && controller.flip && external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.flipLeft),
        style: {
          backgroundColor: backdrop
        },
        onClick: toPrevPage
      }, external_react_default.a.createElement(icons_ArrowLeftIcon, null)), external_react_default.a.createElement("div", {
        className: this.withShow(Control_default.a.flipRight),
        style: {
          backgroundColor: backdrop
        },
        onClick: toNextPage
      }, external_react_default.a.createElement(icons_ArrowRightIcon, null))), Array.isArray(set) && set.length > 1 && controller.pagination && external_react_default.a.createElement("div", {
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

// EXTERNAL MODULE: ./src/components/Image/loading.less
var loading = __webpack_require__("./src/components/Image/loading.less");
var loading_default = /*#__PURE__*/__webpack_require__.n(loading);

// CONCATENATED MODULE: ./src/components/Image/loading.js
function loading_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { loading_typeof = function _typeof(obj) { return typeof obj; }; } else { loading_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return loading_typeof(obj); }

function loading_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function loading_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function loading_createClass(Constructor, protoProps, staticProps) { if (protoProps) loading_defineProperties(Constructor.prototype, protoProps); if (staticProps) loading_defineProperties(Constructor, staticProps); return Constructor; }

function loading_possibleConstructorReturn(self, call) { if (call && (loading_typeof(call) === "object" || typeof call === "function")) { return call; } return loading_assertThisInitialized(self); }

function loading_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function loading_getPrototypeOf(o) { loading_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return loading_getPrototypeOf(o); }

function loading_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) loading_setPrototypeOf(subClass, superClass); }

function loading_setPrototypeOf(o, p) { loading_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return loading_setPrototypeOf(o, p); }

/**
 * 加载动画
 **/
// Libs
 // Styles

 // Icons

 // Utils



var loading_Loading =
/*#__PURE__*/
function (_React$PureComponent) {
  loading_inherits(Loading, _React$PureComponent);

  function Loading() {
    loading_classCallCheck(this, Loading);

    return loading_possibleConstructorReturn(this, loading_getPrototypeOf(Loading).apply(this, arguments));
  }

  loading_createClass(Loading, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          didInvalidate = _this$props.didInvalidate,
          onReload = _this$props.onReload,
          backdrop = _this$props.backdrop;
      return external_react_default.a.createElement("div", {
        className: loading_default.a.loadingContainer
      }, didInvalidate ? external_react_default.a.createElement("button", {
        className: loading_default.a.reload,
        onClick: onReload,
        style: {
          background: backdrop
        }
      }, external_react_default.a.createElement(icons_Refresh, null)) : external_react_default.a.createElement("div", {
        className: loading_default.a.loading
      }));
    }
  }]);

  return Loading;
}(external_react_default.a.PureComponent);

/* harmony default export */ var Image_loading = (context_ContextConsumer(loading_Loading));
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

 // Components

 // Utils



var Image_Images =
/*#__PURE__*/
function (_React$PureComponent) {
  Image_inherits(Images, _React$PureComponent);

  function Images(props) {
    var _this;

    Image_classCallCheck(this, Images);

    _this = Image_possibleConstructorReturn(this, Image_getPrototypeOf(Images).call(this, props)); // Refs

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

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "updateCurrentImageStyle", function () {
      var newStyle = Images.getCurrentImageStyle(_this.props, _this.currentImageRef);

      _this.setStyle(newStyle);
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleResize", function (e) {
      _this.updateCurrentImageStyle();
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleScroll", function () {
      if (_this.currentImageRef.current) {
        var show = _this.props.show;
        _this.currentImageRef.current.style.top = "calc(50% + ".concat(show ? 0 : _this.initialPageOffset - window.pageYOffset, "px)");
      }
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleClick", function () {
      var _this$props2 = _this.props,
          zoom = _this$props2.zoom,
          toggleZoom = _this$props2.toggleZoom;
      zoom && toggleZoom();
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleMouseMove", function (e) {
      var zoomingStyle = Images.getZoomingStyle(_this.props, _this.currentImageRef, e);

      _this.setStyle(zoomingStyle);
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleImageLoadStart", function () {
      _this.setState({
        isFetching: true,
        didInvalidate: false
      });
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleImageLoaded", function (_ref) {
      var didInvalidate = _ref.didInvalidate;

      _this.setState({
        isFetching: false,
        didInvalidate: didInvalidate
      });
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleImageLoad", function () {
      var _this$props3 = _this.props,
          page = _this$props3.page,
          set = _this$props3.set,
          cover = _this$props3.cover;
      set[page].src !== cover.getAttribute("src") && _this.updateCurrentImageStyle();

      _this.handleImageLoadStart();
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleImageLoadError", function () {
      _this.handleImageLoaded({
        didInvalidate: true
      });
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleImageLoadAbort", function () {
      _this.handleImageLoaded({
        didInvalidate: true
      });
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleImageReload", function () {
      _this.setState({
        timestamp: new Date().getTime()
      });
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "handleTransitionEnded", function (e) {
      if (e.target === _this.currentImageRef.current) {
        var show = _this.props.show;
        !show && _this.removeImage();
      }
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "setStyle", function (newStyle) {
      var mergedStyle = Image_objectSpread({}, _this.state.currentStyle, newStyle);

      _this.setState({
        currentStyle: mergedStyle
      });
    });

    Image_defineProperty(Image_assertThisInitialized(Image_assertThisInitialized(_this)), "removeImage", function () {
      var _this$props4 = _this.props,
          cover = _this$props4.cover,
          remove = _this$props4.remove; // 显示封面原图

      cover.style.visibility = 'visible'; // 移除节点

      remove();
    });

    _this.currentImageRef = external_react_default.a.createRef(); // 初始页面高度

    _this.initialPageOffset = window.pageYOffset; // 监听状态

    _this.listeningMouseMove = false;
    _this.state = {
      // Loadings State
      isFetching: true,
      didInvalidate: false,
      // Style
      currentStyle: Images.getCoverStyle(props),
      // Flag
      timestamp: null
    };
    return _this;
  }

  Image_createClass(Images, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
      window.addEventListener("transitionend", this.handleTransitionEnded);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var prevShow = prevProps.show,
          prevZoom = prevProps.zoom,
          prevRotate = prevProps.rotate,
          prevPage = prevProps.page;
      var _this$props5 = this.props,
          currShow = _this$props5.show,
          currZoom = _this$props5.zoom,
          currRotate = _this$props5.rotate,
          currPage = _this$props5.page; // 状态改变时更新样式 (Page 导致的 src 变化的 update 交给图片自身的 onload 调用)

      if (prevShow !== currShow || prevZoom !== currZoom || prevRotate !== currRotate) {
        // 在初次进入时添加延迟, 避免 Safari 初次获取不到 ref 的 bug
        if (!prevShow) {
          setTimeout(this.updateCurrentImageStyle, 50);
        } else {
          this.updateCurrentImageStyle();
        } // 更新监听状态


        this.updateZoomEventListenerWithState();
      } // 切换页面时去除加载时间戳


      if (prevPage !== currPage) {
        this.setState({
          timestamp: null
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("transitionend", this.handleTransitionEnded);
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('scroll', this.handleScroll);
    }
    /**
     * 事件监听
     **/

  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          show = _this$props6.show,
          zoom = _this$props6.zoom,
          page = _this$props6.page,
          set = _this$props6.set;
      var _this$state = this.state,
          isFetching = _this$state.isFetching,
          didInvalidate = _this$state.didInvalidate,
          cs = _this$state.currentStyle,
          timestamp = _this$state.timestamp;
      return external_react_default.a.createElement(external_react_["Fragment"], null, show && isFetching && external_react_default.a.createElement(Image_loading, {
        didInvalidate: didInvalidate,
        onReload: this.handleImageReload
      }), external_react_default.a.createElement("img", {
        key: "".concat(page, "-").concat(set[page].src),
        className: "".concat(Image_default.a.imageLayer).concat(zoom ? " ".concat(Image_default.a.zooming) : ""),
        style: {
          transform: "translate3d(-50%, -50%, 0) translate3d(".concat(cs.x, "px, ").concat(cs.y, "px, 0px) scale3d(").concat(cs.scale, ", ").concat(cs.scale, ", 1) rotate3d(0, 0, 1, ").concat(cs.rotate, "deg)"),
          cursor: zoom ? 'zoom-out' : 'initial',
          borderRadius: cs.borderRadius
        },
        src: timestamp ? set[page].src.includes('?') ? "".concat(set[page].src, "&t=").concat(timestamp) : "".concat(set[page].src, "?t=").concat(timestamp) : set[page].src,
        alt: set[page].alt,
        ref: this.currentImageRef,
        onLoad: this.handleImageLoad,
        onError: this.handleImageLoadError,
        onAbort: this.handleImageLoadAbort,
        onClick: this.handleClick
      }));
    }
  }]);

  return Images;
}(external_react_default.a.PureComponent);
/**
 * 样式控制
 **/


Image_Images.getCurrentImageStyle = function (props, imageRef) {
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
};

Image_Images.getCoverStyle = function (props) {
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
};

Image_Images.getBrowsingStyle = function (props, imageRef) {
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
};

Image_Images.getZoomingStyle = function (props, imageRef) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$clientX = _ref2.clientX,
      mouseX = _ref2$clientX === void 0 ? scrollWidth() / 2 : _ref2$clientX,
      _ref2$clientY = _ref2.clientY,
      mouseY = _ref2$clientY === void 0 ? windowHeight() / 2 : _ref2$clientY;

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
};

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
      background: backdrop || "",
      transitionDelay: show ? '.3s' : '0s'
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

        window.addEventListener('scroll', _this.handleScroll);
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

      switch (e.key) {
        case "Escape":
          // 退出
          hotKey.close && (zoom ? _this.handleToggleZoom() : _this.unMountSelf());
          break;

        case " ":
          // 缩放
          hotKey.zoom && _this.handleToggleZoom();
          break;

        case "ArrowLeft":
          // 上一张
          !zoom && hotKey.flip && hasImageSet && _this.handleToPrevPage();
          break;

        case "ArrowRight":
          // 下一张
          !zoom && hotKey.flip && hasImageSet && _this.handleToNextPage();
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

    Wrapper_defineProperty(Wrapper_assertThisInitialized(Wrapper_assertThisInitialized(_this)), "handleToPrevPage", _this.handleSwitchPages("prev"));

    Wrapper_defineProperty(Wrapper_assertThisInitialized(Wrapper_assertThisInitialized(_this)), "handleToNextPage", _this.handleSwitchPages("next"));

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
      page: props.defaultPage || 0,
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
      window.addEventListener('scroll', this.handleScroll);
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
        toPrevPage: this.handleToPrevPage,
        toNextPage: this.handleToNextPage,
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
      browsing: false // TODO:FEATURE 翻页动画
      // TODO:FEATURE 懒加载
      // TODO:FEATURE 移动端的拖拽翻页

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
          defaultPage = _this$props3.defaultPage,
          preset = _this$props3.preset,
          controller = _this$props3.controller,
          hotKey = _this$props3.hotKey,
          backdrop = _this$props3.backdrop,
          zIndex = _this$props3.zIndex,
          radius = _this$props3.radius,
          edge = _this$props3.edge,
          onBrowsing = _this$props3.onBrowsing,
          onZooming = _this$props3.onZooming,
          onSwitching = _this$props3.onSwitching,
          onRotating = _this$props3.onRotating,
          props = _objectWithoutProperties(_this$props3, ["className", "style", "src", "alt", "txt", "set", "defaultPage", "preset", "controller", "hotKey", "backdrop", "zIndex", "radius", "edge", "onBrowsing", "onZooming", "onSwitching", "onRotating"]);

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
        var defPropWithEnv = preset.toString() === "desktop" ? defPropDesktop : preset.toString() === "mobile" ? defPropMobile : defPropAuto(true);
        return external_react_default.a.createElement(Portals_Portals, {
          zIndex: zIndex
        }, external_react_default.a.createElement(Wrapper_Wrapper // 内部
        , {
          cover: _this2.props.cover || _this2.cover,
          remove: _this2.unBrowsing // 基础数据
          ,
          alt: alt,
          txt: txt,
          set: _this2.buildSet(set),
          defaultPage: defaultPage // 功能控制
          ,
          controller: src_objectSpread({}, defPropWithEnv.controller, controller),
          hotKey: src_objectSpread({}, defPropWithEnv.hotKey, hotKey) // 界面样式
          ,
          backdrop: backdrop,
          radius: radius !== null ? radius : defPropWithEnv.radius,
          edge: edge !== null ? edge : defPropWithEnv.edge // 生命周期
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
  defaultPage: defProp.defaultPage,

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
  defaultPage: defType.defaultPage,

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