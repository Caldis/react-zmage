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

/***/ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Background/Background.less":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** D:/DropboxMapping/Dev/react-zmage/node_modules/css-loader??ref--8-1!D:/DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src??postcss!D:/DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Background/Background.less ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js */ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* 与 anim.js 同步 */\n.backgroundLayer__3kiCJ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  cursor: -webkit-zoom-out;\n  cursor: zoom-out;\n  background-color: #ffffff;\n  -webkit-transition: opacity 0.2s;\n  transition: opacity 0.2s;\n  will-change: opacity;\n  -webkit-tap-highlight-color: transparent;\n}\n", ""]);

// exports
exports.locals = {
	"backgroundLayer": "backgroundLayer__3kiCJ"
};

/***/ }),

/***/ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Browser/Browser.less":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** D:/DropboxMapping/Dev/react-zmage/node_modules/css-loader??ref--8-1!D:/DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src??postcss!D:/DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Browser/Browser.less ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js */ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".wrapperLayer__3hggD {\n  position: fixed;\n  margin: 0;\n  padding: 0;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 999;\n}\n", ""]);

// exports
exports.locals = {
	"wrapperLayer": "wrapperLayer__3hggD"
};

/***/ }),

/***/ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Control/Control.less":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** D:/DropboxMapping/Dev/react-zmage/node_modules/css-loader??ref--8-1!D:/DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src??postcss!D:/DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Control/Control.less ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js */ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* 与 anim.js 同步 */\n.baseButton__1l-8C {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.baseButton__1l-8C > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.controls__3sQmL {\n  box-sizing: border-box;\n  position: absolute;\n  top: 0.6rem;\n  right: 0.6rem;\n  opacity: 0;\n  display: -webkit-box;\n  display: flex;\n  z-index: 1000;\n  border-radius: 5rem;\n  -webkit-transform: translateX(100%);\n          transform: translateX(100%);\n  -webkit-transition: opacity 350ms, -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms, -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms;\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms, -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL.show__3wuNU {\n  opacity: 0.8;\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n}\n.controls__3sQmL .pinButton__3L7CE {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2rem;\n  height: 2rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL .pinButton__3L7CE > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.controls__3sQmL .pinButton__3L7CE:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__3sQmL .pinButton__3L7CE:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__3sQmL .pinButton__3L7CE:first-of-type {\n  margin-left: 0.4rem;\n}\n.controls__3sQmL .pinButton__3L7CE:last-of-type {\n  margin-right: 0.4rem;\n}\n.controls__3sQmL .rotate__3dU4j {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2rem;\n  height: 2rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL .rotate__3dU4j > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.controls__3sQmL .rotate__3dU4j:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__3sQmL .rotate__3dU4j:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__3sQmL .rotate__3dU4j:first-of-type {\n  margin-left: 0.4rem;\n}\n.controls__3sQmL .rotate__3dU4j:last-of-type {\n  margin-right: 0.4rem;\n}\n.controls__3sQmL .rotate__3dU4j svg {\n  width: 1.75rem;\n  -webkit-transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL .rotateLeft__jf-FB {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2rem;\n  height: 2rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL .rotateLeft__jf-FB > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.controls__3sQmL .rotateLeft__jf-FB:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__3sQmL .rotateLeft__jf-FB:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__3sQmL .rotateLeft__jf-FB:first-of-type {\n  margin-left: 0.4rem;\n}\n.controls__3sQmL .rotateLeft__jf-FB:last-of-type {\n  margin-right: 0.4rem;\n}\n.controls__3sQmL .rotateLeft__jf-FB svg {\n  width: 1.75rem;\n  -webkit-transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL .rotateLeft__jf-FB:hover svg {\n  -webkit-transform: rotate(-30deg);\n          transform: rotate(-30deg);\n}\n.controls__3sQmL .rotateRight__2DM1Q {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2rem;\n  height: 2rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL .rotateRight__2DM1Q > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.controls__3sQmL .rotateRight__2DM1Q:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__3sQmL .rotateRight__2DM1Q:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__3sQmL .rotateRight__2DM1Q:first-of-type {\n  margin-left: 0.4rem;\n}\n.controls__3sQmL .rotateRight__2DM1Q:last-of-type {\n  margin-right: 0.4rem;\n}\n.controls__3sQmL .rotateRight__2DM1Q svg {\n  width: 1.75rem;\n  -webkit-transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL .rotateRight__2DM1Q:hover svg {\n  -webkit-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.controls__3sQmL .download__JLwN1 {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2rem;\n  height: 2rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL .download__JLwN1 > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.controls__3sQmL .download__JLwN1:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__3sQmL .download__JLwN1:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__3sQmL .download__JLwN1:first-of-type {\n  margin-left: 0.4rem;\n}\n.controls__3sQmL .download__JLwN1:last-of-type {\n  margin-right: 0.4rem;\n}\n.controls__3sQmL .download__JLwN1 svg {\n  margin-top: -0.06rem;\n  width: 1.75rem;\n}\n.controls__3sQmL .zoom__HH1gO {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2rem;\n  height: 2rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL .zoom__HH1gO > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.controls__3sQmL .zoom__HH1gO:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__3sQmL .zoom__HH1gO:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__3sQmL .zoom__HH1gO:first-of-type {\n  margin-left: 0.4rem;\n}\n.controls__3sQmL .zoom__HH1gO:last-of-type {\n  margin-right: 0.4rem;\n}\n.controls__3sQmL .close__1Yy0b {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  margin: 0.4em 0;\n  width: 2rem;\n  height: 2rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.controls__3sQmL .close__1Yy0b > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.controls__3sQmL .close__1Yy0b:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.controls__3sQmL .close__1Yy0b:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n.controls__3sQmL .close__1Yy0b:first-of-type {\n  margin-left: 0.4rem;\n}\n.controls__3sQmL .close__1Yy0b:last-of-type {\n  margin-right: 0.4rem;\n}\n.sideButton__3kbDa {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  opacity: 0;\n  position: absolute;\n  top: 50%;\n  padding: 0.4rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.sideButton__3kbDa > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.sideButton__3kbDa:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: translateX(0) translateY(-50%) !important;\n          transform: translateX(0) translateY(-50%) !important;\n}\n.sideButton__3kbDa:active {\n  opacity: 1 !important;\n}\n.sideButton__3kbDa.show__3wuNU {\n  opacity: 0.8;\n}\n.flipLeft__2HlVL {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  opacity: 0;\n  position: absolute;\n  top: 50%;\n  padding: 0.4rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  left: 0;\n  padding-left: 0.6rem;\n  border-radius: 0 0.5em 0.5em 0;\n  -webkit-transform: translateX(-100%) translateY(-50%);\n          transform: translateX(-100%) translateY(-50%);\n}\n.flipLeft__2HlVL > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.flipLeft__2HlVL:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: translateX(0) translateY(-50%) !important;\n          transform: translateX(0) translateY(-50%) !important;\n}\n.flipLeft__2HlVL:active {\n  opacity: 1 !important;\n}\n.flipLeft__2HlVL.show__3wuNU {\n  opacity: 0.8;\n}\n.flipLeft__2HlVL:active {\n  -webkit-transform: translate(-0.2em) translateY(-50%) !important;\n          transform: translate(-0.2em) translateY(-50%) !important;\n}\n.flipLeft__2HlVL.show__3wuNU {\n  opacity: 0.8;\n  -webkit-transform: translate(-0.2em) translateY(-50%);\n          transform: translate(-0.2em) translateY(-50%);\n}\n.flipRight__3GreD {\n  z-index: 1000;\n  box-sizing: border-box;\n  cursor: pointer;\n  opacity: 0;\n  position: absolute;\n  top: 50%;\n  padding: 0.4rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 175ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 175ms cubic-bezier(0.6, 0, 0.1, 1);\n  right: 0;\n  padding-right: 0.6rem;\n  border-radius: 0.5rem 0 0 0.5rem;\n  -webkit-transform: translateX(100%) translateY(-50%);\n          transform: translateX(100%) translateY(-50%);\n}\n.flipRight__3GreD > svg {\n  display: block;\n  width: 2rem;\n  height: 2rem;\n}\n.flipRight__3GreD:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: translateX(0) translateY(-50%) !important;\n          transform: translateX(0) translateY(-50%) !important;\n}\n.flipRight__3GreD:active {\n  opacity: 1 !important;\n}\n.flipRight__3GreD.show__3wuNU {\n  opacity: 0.8;\n}\n.flipRight__3GreD:active {\n  -webkit-transform: translate(0.2em) translateY(-50%) !important;\n          transform: translate(0.2em) translateY(-50%) !important;\n}\n.flipRight__3GreD.show__3wuNU {\n  opacity: 0.8;\n  -webkit-transform: translate(0.2em) translateY(-50%);\n          transform: translate(0.2em) translateY(-50%);\n}\n.pages__3_44_ {\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: flex;\n  position: absolute;\n  left: 50%;\n  bottom: 0.6rem;\n  z-index: 110;\n  opacity: 0;\n  border-radius: 2rem;\n  -webkit-transform: translate(-50%, 100px);\n          transform: translate(-50%, 100px);\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.pages__3_44_.show__3wuNU {\n  opacity: 0.8;\n  -webkit-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n}\n.pages__3_44_.mobile__3kn09 {\n  bottom: 2rem;\n}\n.pages__3_44_ .dot__gnENp {\n  cursor: pointer;\n  margin: 0.45rem 0.25rem;\n  display: block;\n  width: 0.6rem;\n  height: 0.6rem;\n  border-radius: 1.2rem;\n  background: black;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.pages__3_44_ .dot__gnENp:first-of-type {\n  margin-left: 0.6rem;\n}\n.pages__3_44_ .dot__gnENp:last-of-type {\n  margin-right: 0.6rem;\n}\n.pages__3_44_ .blackDot__1Nm3_ {\n  cursor: pointer;\n  margin: 0.45rem 0.25rem;\n  display: block;\n  width: 0.6rem;\n  height: 0.6rem;\n  border-radius: 1.2rem;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  cursor: initial;\n  width: 1rem;\n  background: black;\n}\n.pages__3_44_ .blackDot__1Nm3_:first-of-type {\n  margin-left: 0.6rem;\n}\n.pages__3_44_ .blackDot__1Nm3_:last-of-type {\n  margin-right: 0.6rem;\n}\n.pages__3_44_ .whiteDot__3MHk8 {\n  cursor: pointer;\n  margin: 0.45rem 0.25rem;\n  display: block;\n  width: 0.6rem;\n  height: 0.6rem;\n  border-radius: 1.2rem;\n  background: black;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), width 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  background: #999;\n}\n.pages__3_44_ .whiteDot__3MHk8:first-of-type {\n  margin-left: 0.6rem;\n}\n.pages__3_44_ .whiteDot__3MHk8:last-of-type {\n  margin-right: 0.6rem;\n}\n.pages__3_44_ .whiteDot__3MHk8:hover {\n  opacity: 0.8 !important;\n  -webkit-transform: scale(1.1) !important;\n          transform: scale(1.1) !important;\n}\n.pages__3_44_ .whiteDot__3MHk8:active {\n  opacity: 1 !important;\n  -webkit-transform: scale(1) !important;\n          transform: scale(1) !important;\n}\n", ""]);

// exports
exports.locals = {
	"baseButton": "baseButton__1l-8C",
	"controls": "controls__3sQmL",
	"show": "show__3wuNU",
	"pinButton": "pinButton__3L7CE",
	"rotate": "rotate__3dU4j",
	"rotateLeft": "rotateLeft__jf-FB",
	"rotateRight": "rotateRight__2DM1Q",
	"download": "download__JLwN1",
	"zoom": "zoom__HH1gO",
	"close": "close__1Yy0b",
	"sideButton": "sideButton__3kbDa",
	"flipLeft": "flipLeft__2HlVL",
	"flipRight": "flipRight__3GreD",
	"pages": "pages__3_44_",
	"mobile": "mobile__3kn09",
	"dot": "dot__gnENp",
	"blackDot": "blackDot__1Nm3_",
	"whiteDot": "whiteDot__3MHk8"
};

/***/ }),

/***/ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Image/Image.less":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** D:/DropboxMapping/Dev/react-zmage/node_modules/css-loader??ref--8-1!D:/DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src??postcss!D:/DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Image/Image.less ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js */ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* 与 anim.js 同步 */\n.imageLayer__33OvN {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-clip-path 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-clip-path 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), clip-path 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), opacity 350ms cubic-bezier(0.6, 0, 0.1, 1), clip-path 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-clip-path 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  will-change: transform, top, opacity, clip-path;\n}\n.imageLayer__33OvN.zooming__8A3Sl {\n  -webkit-transition-timing-function: cubic-bezier(0, 0.1, 0.1, 1);\n          transition-timing-function: cubic-bezier(0, 0.1, 0.1, 1);\n  -ms-transition-duration: 0ms;\n}\n.imageLayer__33OvN.invalidate__GRvMe {\n  opacity: 0 !important;\n  pointer-events: none;\n}\n", ""]);

// exports
exports.locals = {
	"imageLayer": "imageLayer__33OvN",
	"zooming": "zooming__8A3Sl",
	"invalidate": "invalidate__GRvMe"
};

/***/ }),

/***/ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Image/Loading.less":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** D:/DropboxMapping/Dev/react-zmage/node_modules/css-loader??ref--8-1!D:/DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src??postcss!D:/DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Image/Loading.less ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js */ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* 与 anim.js 同步 */\n.loadingContainer__nzXM4 {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  opacity: 0;\n  -webkit-transition: opacity cubic-bezier(0.6, 0, 0.1, 1) 175ms;\n  transition: opacity cubic-bezier(0.6, 0, 0.1, 1) 175ms;\n}\n.loadingContainer__nzXM4.show__1BtTD {\n  opacity: 1;\n}\n.loadingContainer__nzXM4 .reload__2nJBf {\n  border: 2px solid;\n  border-radius: 5px;\n  font-size: 1rem;\n  padding: 0.5rem;\n  cursor: pointer;\n  outline: none;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n.loadingContainer__nzXM4 .reload__2nJBf:hover {\n  opacity: 0.8;\n}\n.loadingContainer__nzXM4 .reload__2nJBf:hover svg {\n  -webkit-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.loadingContainer__nzXM4 .reload__2nJBf:active {\n  opacity: 1;\n}\n.loadingContainer__nzXM4 .reload__2nJBf svg {\n  display: block;\n  -webkit-transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n  transition: transform 350ms cubic-bezier(0.6, 0, 0.1, 1), -webkit-transform 350ms cubic-bezier(0.6, 0, 0.1, 1);\n}\n.loadingContainer__nzXM4 .loading__2iAZJ {\n  width: 24px;\n  height: 24px;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-animation: spin__1tumn 1s linear infinite;\n          animation: spin__1tumn 1s linear infinite;\n}\n@-webkit-keyframes fadeIn__1iF9b {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn__1iF9b {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes fadeOut__11bTR {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fadeOut__11bTR {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@-webkit-keyframes spin__1tumn {\n  0% {\n    -webkit-transform: translate(-50%, -50%) rotate(0deg);\n            transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    -webkit-transform: translate(-50%, -50%) rotate(360deg);\n            transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n@keyframes spin__1tumn {\n  0% {\n    -webkit-transform: translate(-50%, -50%) rotate(0deg);\n            transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    -webkit-transform: translate(-50%, -50%) rotate(360deg);\n            transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n", ""]);

// exports
exports.locals = {
	"loadingContainer": "loadingContainer__nzXM4",
	"show": "show__1BtTD",
	"reload": "reload__2nJBf",
	"loading": "loading__2iAZJ",
	"spin": "spin__1tumn",
	"fadeIn": "fadeIn__1iF9b",
	"fadeOut": "fadeOut__11bTR"
};

/***/ }),

/***/ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js":
/*!*********************************************************************************!*\
  !*** D:/DropboxMapping/Dev/react-zmage/node_modules/css-loader/lib/css-base.js ***!
  \*********************************************************************************/
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

/***/ "../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js":
/*!************************************************************************************!*\
  !*** D:/DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js ***!
  \************************************************************************************/
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

var	fixUrls = __webpack_require__(/*! ./urls */ "../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/urls.js");

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

/***/ "../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/urls.js":
/*!*******************************************************************************!*\
  !*** D:/DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/urls.js ***!
  \*******************************************************************************/
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

/***/ "./src/components/Background/Background.less":
/*!***************************************************!*\
  !*** ./src/components/Background/Background.less ***!
  \***************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader??ref--8-1!../../../../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src??postcss!../../../../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./Background.less */ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Background/Background.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js */ "../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Browser/Browser.less":
/*!*********************************************!*\
  !*** ./src/components/Browser/Browser.less ***!
  \*********************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader??ref--8-1!../../../../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src??postcss!../../../../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./Browser.less */ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Browser/Browser.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js */ "../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Control/Control.less":
/*!*********************************************!*\
  !*** ./src/components/Control/Control.less ***!
  \*********************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader??ref--8-1!../../../../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src??postcss!../../../../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./Control.less */ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Control/Control.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js */ "../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Image/Image.less":
/*!*****************************************!*\
  !*** ./src/components/Image/Image.less ***!
  \*****************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader??ref--8-1!../../../../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src??postcss!../../../../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./Image.less */ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Image/Image.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js */ "../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/Image/Loading.less":
/*!*******************************************!*\
  !*** ./src/components/Image/Loading.less ***!
  \*******************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader??ref--8-1!../../../../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src??postcss!../../../../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./Loading.less */ "../../../DropboxMapping/Dev/react-zmage/node_modules/css-loader/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/postcss-loader/src/index.js?!../../../DropboxMapping/Dev/react-zmage/node_modules/less-loader/dist/cjs.js!./src/components/Image/Loading.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js */ "../../../DropboxMapping/Dev/react-zmage/node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/index.js":
/*!***********************************!*\
  !*** ./src/index.js + 31 modules ***!
  \***********************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Background/Background.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Browser/Browser.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Control/Control.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Image/Image.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/Image/Loading.less (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "classnames" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "lodash.memoize" (<- Module is not an ECMAScript module) */
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

// EXTERNAL MODULE: ./src/components/Browser/Browser.less
var Browser_Browser = __webpack_require__("./src/components/Browser/Browser.less");
var Browser_default = /*#__PURE__*/__webpack_require__.n(Browser_Browser);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__("prop-types");
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// CONCATENATED MODULE: ./src/Zmage.utils.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* 转换 set 参数 */
var normalizationSet = function normalizationSet() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      set = _ref.set,
      src = _ref.src,
      alt = _ref.alt,
      txt = _ref.txt,
      restProps = _ref.restProps;

  return Array.isArray(set) && set.length > 0 ? set : [_objectSpread({
    src: src,
    alt: alt,
    txt: txt
  }, restProps)];
};
// CONCATENATED MODULE: ./src/config/default.js
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function default_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function default_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { default_ownKeys(Object(source), true).forEach(function (key) { default_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { default_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function default_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 默认类型与默认值
 **/
// Libs
 // Utils


/**
 * 默认类型
 **/

var defType = {
  /**
   * 基础
   **/
  // 图片地址
  src: external_prop_types_default.a.string,
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
   * 預設
   **/
  preset: external_prop_types_default.a.oneOf([// 桌面
  "", "desktop", // 移动
  "mobile"]),

  /**
   * 功能
   **/
  // 控制器
  controller: external_prop_types_default.a.oneOfType([external_prop_types_default.a.bool, external_prop_types_default.a.shape({
    // 分页
    pagination: external_prop_types_default.a.bool,
    // 旋转
    rotate: external_prop_types_default.a.bool,
    // 缩放
    zoom: external_prop_types_default.a.bool,
    // 下载
    download: external_prop_types_default.a.bool,
    // 关闭
    close: external_prop_types_default.a.bool,
    // 左右
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
  // 动画
  animate: external_prop_types_default.a.shape({
    // 缩放动画 (未实现)
    browsing: external_prop_types_default.a.bool,
    // 翻页动画
    flip: external_prop_types_default.a.oneOf([// 渐变 (set小於3時强制使用)
    "fade", // 交叉渐变
    "crossFade", // 翻页
    "swipe", // 缩放
    "zoom"])
  }),

  /**
   * 界面与交互
   **/
  // 滚动时隐藏
  hideOnScroll: external_prop_types_default.a.bool,
  // 封面可见性
  coverVisible: external_prop_types_default.a.bool,
  // 背景色
  backdrop: external_prop_types_default.a.string,
  // 高度
  zIndex: external_prop_types_default.a.number,
  // 圆角
  radius: external_prop_types_default.a.number,
  // 边距
  edge: external_prop_types_default.a.number,
  // 循环
  loop: external_prop_types_default.a.bool,

  /**
   * 生命周期
   **/
  onBrowsing: external_prop_types_default.a.func,
  onZooming: external_prop_types_default.a.func,
  onSwitching: external_prop_types_default.a.func,
  onRotating: external_prop_types_default.a.func,

  /**
   * 受控屬性
   **/
  browsing: external_prop_types_default.a.bool
};
/**
 * 默认值
 **/

var default_defProp = {
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
  preset: "",

  /**
   * 功能控制
   **/
  // 控制器 (从 preset 初始化)
  controller: {},
  // 快捷键 (从 preset 初始化)
  hotKey: {},
  // 动画  (从 preset 初始化)
  animate: {},

  /**
   * 界面与交互
   **/
  // 滚动时隐藏 (仅桌面端可用)
  hideOnScroll: true,
  // 封面可见性 (仅桌面端可用)
  coverVisible: false,
  // 背景色
  backdrop: "#FFFFFF",
  // 高度
  zIndex: 1000,
  // 圆角
  radius: 0,
  // 边距
  edge: 0,
  // 是否循环查看
  loop: true,

  /**
   * 生命周期
   **/
  onBrowsing: function onBrowsing() {},
  onZooming: function onZooming() {},
  onSwitching: function onSwitching() {},
  onRotating: function onRotating() {}
};
/**
 * 默认预设
 **/

var defPreset = {
  // 桌面
  desktop: {
    controller: {
      pagination: true,
      rotate: true,
      zoom: true,
      download: false,
      close: true,
      flip: true
    },
    hotKey: {
      close: true,
      zoom: true,
      flip: true
    },
    animate: {
      browsing: true,
      flip: 'fade'
    }
  },
  // 移动端
  mobile: {
    controller: {
      pagination: true,
      rotate: false,
      zoom: false,
      download: false,
      close: true,
      flip: false
    },
    hotKey: {
      close: false,
      zoom: false,
      flip: false
    },
    animate: {
      browsing: true,
      flip: 'swipe'
    }
  }
};
/**
 * 默认值 (不同平台)
 **/

var IS_PROP_PRESET_AUTO_DEPRECATED_WARNED = false;

var DEF_PROP_DESKTOP = default_objectSpread({}, default_defProp, {}, defPreset.desktop);

var DEF_PROP_MOBILE = default_objectSpread({}, default_defProp, {}, defPreset.mobile);

var defPropsWithEnv = function defPropsWithEnv(preset) {
  switch (preset) {
    case 'desktop':
      return DEF_PROP_DESKTOP;

    case 'mobile':
      return DEF_PROP_MOBILE;

    case 'auto':
      // Deprecated
      if (!IS_PROP_PRESET_AUTO_DEPRECATED_WARNED) {
        console.warn("Zmage: The value 'auto' for the props 'preset' has been deprecated, replace with one of 'Desktop' or 'Mobile', the value 'auto' will be fallback to 'desktop'");
        IS_PROP_PRESET_AUTO_DEPRECATED_WARNED = true;
      }

      return DEF_PROP_DESKTOP;

    default:
      return DEF_PROP_DESKTOP;
  }
};
/**
 * 获取配置属性
 **/

var default_getConfigFromProps = function getConfigFromProps(props) {
  var className = props.className,
      style = props.style,
      onClick = props.onClick,
      forwardedRef = props.forwardedRef,
      coverRef = props.coverRef,
      destroyer = props.destroyer,
      src = props.src,
      alt = props.alt,
      txt = props.txt,
      set = props.set,
      defaultPage = props.defaultPage,
      preset = props.preset,
      controller = props.controller,
      hotKey = props.hotKey,
      animate = props.animate,
      hideOnScroll = props.hideOnScroll,
      coverVisible = props.coverVisible,
      backdrop = props.backdrop,
      zIndex = props.zIndex,
      radius = props.radius,
      edge = props.edge,
      loop = props.loop,
      onBrowsing = props.onBrowsing,
      onZooming = props.onZooming,
      onSwitching = props.onSwitching,
      onRotating = props.onRotating,
      controlledBrowsing = props.browsing,
      restProps = _objectWithoutProperties(props, ["className", "style", "onClick", "forwardedRef", "coverRef", "destroyer", "src", "alt", "txt", "set", "defaultPage", "preset", "controller", "hotKey", "animate", "hideOnScroll", "coverVisible", "backdrop", "zIndex", "radius", "edge", "loop", "onBrowsing", "onZooming", "onSwitching", "onRotating", "browsing"]);

  return {
    coverProps: {
      // Internal
      className: className,
      style: style,
      onClick: onClick,
      forwardedRef: forwardedRef,
      // Data
      src: src,
      alt: alt,
      txt: txt
    },
    calleeProps: {
      // Callee
      coverRef: coverRef,
      destroyer: destroyer
    },
    stateProps: {
      // Controlled props
      controlledBrowsing: controlledBrowsing
    },
    configProps: {
      // Data
      defaultPage: defaultPage,
      set: normalizationSet({
        set: set,
        src: src,
        alt: alt,
        txt: txt
      }),
      // Presets
      preset: preset,
      // Control
      controller: controller,
      hotKey: hotKey,
      animate: animate,
      // Styles & interactive
      hideOnScroll: hideOnScroll,
      coverVisible: coverVisible,
      backdrop: backdrop,
      zIndex: zIndex,
      radius: radius,
      edge: edge,
      loop: loop,
      // Life cycle functions
      onBrowsing: onBrowsing,
      onZooming: onZooming,
      onSwitching: onSwitching,
      onRotating: onRotating
    },
    restProps: restProps
  };
};
// CONCATENATED MODULE: ./src/components/Portal/Portal.js
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
 * 直接将子元素插入到 DOM 對象
 **/
// Libs


 // Utils



var Portal_Portals =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Portals, _React$PureComponent);

  function Portals(props) {
    var _this;

    _classCallCheck(this, Portals);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Portals).call(this, props)); // Init Env

    _this.target = props.target || document.body;
    _this.container = document.createElement('figure');
    _this.container.id = props.id;
    _this.container.className = props.className;
    _this.container.style.zIndex = props.zIndex;

    _this.target.appendChild(_this.container);

    return _this;
  }

  _createClass(Portals, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.target.removeChild(this.container);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return external_react_dom_default.a.createPortal(children, this.container);
    }
  }]);

  return Portals;
}(external_react_default.a.PureComponent);


Portal_Portals.defaultProps = {
  zIndex: default_defProp.zIndex
};
Portal_Portals.propTypes = {
  id: external_prop_types_default.a.string,
  className: external_prop_types_default.a.string,
  zIndex: defType.zIndex
};
// CONCATENATED MODULE: ./src/components/Portal/index.js

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__("classnames");
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// EXTERNAL MODULE: ./src/components/Control/Control.less
var Control_Control = __webpack_require__("./src/components/Control/Control.less");
var Control_default = /*#__PURE__*/__webpack_require__.n(Control_Control);

// CONCATENATED MODULE: ./src/asserts/icons/IconArrowLeft.js
function IconArrowLeft_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { IconArrowLeft_typeof = function _typeof(obj) { return typeof obj; }; } else { IconArrowLeft_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return IconArrowLeft_typeof(obj); }

function IconArrowLeft_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function IconArrowLeft_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function IconArrowLeft_createClass(Constructor, protoProps, staticProps) { if (protoProps) IconArrowLeft_defineProperties(Constructor.prototype, protoProps); if (staticProps) IconArrowLeft_defineProperties(Constructor, staticProps); return Constructor; }

function IconArrowLeft_possibleConstructorReturn(self, call) { if (call && (IconArrowLeft_typeof(call) === "object" || typeof call === "function")) { return call; } return IconArrowLeft_assertThisInitialized(self); }

function IconArrowLeft_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function IconArrowLeft_getPrototypeOf(o) { IconArrowLeft_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return IconArrowLeft_getPrototypeOf(o); }

function IconArrowLeft_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) IconArrowLeft_setPrototypeOf(subClass, superClass); }

function IconArrowLeft_setPrototypeOf(o, p) { IconArrowLeft_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return IconArrowLeft_setPrototypeOf(o, p); }


var IconArrowLeft_IconArrowLeft =
/*#__PURE__*/
function (_React$PureComponent) {
  IconArrowLeft_inherits(IconArrowLeft, _React$PureComponent);

  function IconArrowLeft() {
    IconArrowLeft_classCallCheck(this, IconArrowLeft);

    return IconArrowLeft_possibleConstructorReturn(this, IconArrowLeft_getPrototypeOf(IconArrowLeft).apply(this, arguments));
  }

  IconArrowLeft_createClass(IconArrowLeft, [{
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

  return IconArrowLeft;
}(external_react_default.a.PureComponent);
// CONCATENATED MODULE: ./src/asserts/icons/IconArrowRight.js
function IconArrowRight_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { IconArrowRight_typeof = function _typeof(obj) { return typeof obj; }; } else { IconArrowRight_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return IconArrowRight_typeof(obj); }

function IconArrowRight_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function IconArrowRight_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function IconArrowRight_createClass(Constructor, protoProps, staticProps) { if (protoProps) IconArrowRight_defineProperties(Constructor.prototype, protoProps); if (staticProps) IconArrowRight_defineProperties(Constructor, staticProps); return Constructor; }

function IconArrowRight_possibleConstructorReturn(self, call) { if (call && (IconArrowRight_typeof(call) === "object" || typeof call === "function")) { return call; } return IconArrowRight_assertThisInitialized(self); }

function IconArrowRight_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function IconArrowRight_getPrototypeOf(o) { IconArrowRight_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return IconArrowRight_getPrototypeOf(o); }

function IconArrowRight_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) IconArrowRight_setPrototypeOf(subClass, superClass); }

function IconArrowRight_setPrototypeOf(o, p) { IconArrowRight_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return IconArrowRight_setPrototypeOf(o, p); }


var IconArrowRight_IconArrowRight =
/*#__PURE__*/
function (_React$PureComponent) {
  IconArrowRight_inherits(IconArrowRight, _React$PureComponent);

  function IconArrowRight() {
    IconArrowRight_classCallCheck(this, IconArrowRight);

    return IconArrowRight_possibleConstructorReturn(this, IconArrowRight_getPrototypeOf(IconArrowRight).apply(this, arguments));
  }

  IconArrowRight_createClass(IconArrowRight, [{
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

  return IconArrowRight;
}(external_react_default.a.PureComponent);
// CONCATENATED MODULE: ./src/asserts/icons/IconClose.js
function IconClose_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { IconClose_typeof = function _typeof(obj) { return typeof obj; }; } else { IconClose_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return IconClose_typeof(obj); }

function IconClose_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function IconClose_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function IconClose_createClass(Constructor, protoProps, staticProps) { if (protoProps) IconClose_defineProperties(Constructor.prototype, protoProps); if (staticProps) IconClose_defineProperties(Constructor, staticProps); return Constructor; }

function IconClose_possibleConstructorReturn(self, call) { if (call && (IconClose_typeof(call) === "object" || typeof call === "function")) { return call; } return IconClose_assertThisInitialized(self); }

function IconClose_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function IconClose_getPrototypeOf(o) { IconClose_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return IconClose_getPrototypeOf(o); }

function IconClose_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) IconClose_setPrototypeOf(subClass, superClass); }

function IconClose_setPrototypeOf(o, p) { IconClose_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return IconClose_setPrototypeOf(o, p); }


var IconClose_IconClose =
/*#__PURE__*/
function (_React$PureComponent) {
  IconClose_inherits(IconClose, _React$PureComponent);

  function IconClose() {
    IconClose_classCallCheck(this, IconClose);

    return IconClose_possibleConstructorReturn(this, IconClose_getPrototypeOf(IconClose).apply(this, arguments));
  }

  IconClose_createClass(IconClose, [{
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

  return IconClose;
}(external_react_default.a.PureComponent);
// CONCATENATED MODULE: ./src/asserts/icons/IconDownload.js
function IconDownload_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { IconDownload_typeof = function _typeof(obj) { return typeof obj; }; } else { IconDownload_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return IconDownload_typeof(obj); }

function IconDownload_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function IconDownload_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function IconDownload_createClass(Constructor, protoProps, staticProps) { if (protoProps) IconDownload_defineProperties(Constructor.prototype, protoProps); if (staticProps) IconDownload_defineProperties(Constructor, staticProps); return Constructor; }

function IconDownload_possibleConstructorReturn(self, call) { if (call && (IconDownload_typeof(call) === "object" || typeof call === "function")) { return call; } return IconDownload_assertThisInitialized(self); }

function IconDownload_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function IconDownload_getPrototypeOf(o) { IconDownload_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return IconDownload_getPrototypeOf(o); }

function IconDownload_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) IconDownload_setPrototypeOf(subClass, superClass); }

function IconDownload_setPrototypeOf(o, p) { IconDownload_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return IconDownload_setPrototypeOf(o, p); }


var IconDownload_IconDownload =
/*#__PURE__*/
function (_React$PureComponent) {
  IconDownload_inherits(IconDownload, _React$PureComponent);

  function IconDownload() {
    IconDownload_classCallCheck(this, IconDownload);

    return IconDownload_possibleConstructorReturn(this, IconDownload_getPrototypeOf(IconDownload).apply(this, arguments));
  }

  IconDownload_createClass(IconDownload, [{
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
        d: "M19 13v5c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-5c0-.55-.45-1-1-1s-1 .45-1 1v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1zm-6-.33l1.88-1.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-3.59 3.59c-.39.39-1.02.39-1.41 0L7.7 12.2c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L11 12.67V4c0-.55.45-1 1-1s1 .45 1 1v8.67z"
      }));
    }
  }]);

  return IconDownload;
}(external_react_default.a.PureComponent);
// CONCATENATED MODULE: ./src/asserts/icons/IconLoading.js
function IconLoading_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { IconLoading_typeof = function _typeof(obj) { return typeof obj; }; } else { IconLoading_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return IconLoading_typeof(obj); }

function IconLoading_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function IconLoading_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function IconLoading_createClass(Constructor, protoProps, staticProps) { if (protoProps) IconLoading_defineProperties(Constructor.prototype, protoProps); if (staticProps) IconLoading_defineProperties(Constructor, staticProps); return Constructor; }

function IconLoading_possibleConstructorReturn(self, call) { if (call && (IconLoading_typeof(call) === "object" || typeof call === "function")) { return call; } return IconLoading_assertThisInitialized(self); }

function IconLoading_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function IconLoading_getPrototypeOf(o) { IconLoading_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return IconLoading_getPrototypeOf(o); }

function IconLoading_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) IconLoading_setPrototypeOf(subClass, superClass); }

function IconLoading_setPrototypeOf(o, p) { IconLoading_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return IconLoading_setPrototypeOf(o, p); }


var IconLoading_IconLoading =
/*#__PURE__*/
function (_React$PureComponent) {
  IconLoading_inherits(IconLoading, _React$PureComponent);

  function IconLoading() {
    IconLoading_classCallCheck(this, IconLoading);

    return IconLoading_possibleConstructorReturn(this, IconLoading_getPrototypeOf(IconLoading).apply(this, arguments));
  }

  IconLoading_createClass(IconLoading, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement("svg", {
        xmlns: "http://www.w3.org/1999/xlink",
        width: "24",
        height: "24",
        viewBox: "0 0 200 200",
        preserveAspectRatio: "xMinYMin meet"
      }, external_react_default.a.createElement("defs", null, external_react_default.a.createElement("linearGradient", {
        id: "spinner-1552570621916",
        x1: "0%",
        y1: "0%",
        x2: "65%",
        y2: "0%"
      }, external_react_default.a.createElement("stop", {
        offset: "0%",
        className: "Spinner-blue-3_W"
      }), external_react_default.a.createElement("stop", {
        offset: "100%",
        stopOpacity: "0"
      }))), external_react_default.a.createElement("circle", {
        cx: "100",
        cy: "100",
        r: "90",
        fill: "transparent",
        stroke: "url(#spinner-1552570621916)",
        strokeWidth: "20"
      }));
    }
  }]);

  return IconLoading;
}(external_react_default.a.PureComponent);
// CONCATENATED MODULE: ./src/asserts/icons/IconRefresh.js
function IconRefresh_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { IconRefresh_typeof = function _typeof(obj) { return typeof obj; }; } else { IconRefresh_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return IconRefresh_typeof(obj); }

function IconRefresh_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function IconRefresh_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function IconRefresh_createClass(Constructor, protoProps, staticProps) { if (protoProps) IconRefresh_defineProperties(Constructor.prototype, protoProps); if (staticProps) IconRefresh_defineProperties(Constructor, staticProps); return Constructor; }

function IconRefresh_possibleConstructorReturn(self, call) { if (call && (IconRefresh_typeof(call) === "object" || typeof call === "function")) { return call; } return IconRefresh_assertThisInitialized(self); }

function IconRefresh_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function IconRefresh_getPrototypeOf(o) { IconRefresh_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return IconRefresh_getPrototypeOf(o); }

function IconRefresh_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) IconRefresh_setPrototypeOf(subClass, superClass); }

function IconRefresh_setPrototypeOf(o, p) { IconRefresh_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return IconRefresh_setPrototypeOf(o, p); }


var IconRefresh_IconRefresh =
/*#__PURE__*/
function (_React$PureComponent) {
  IconRefresh_inherits(IconRefresh, _React$PureComponent);

  function IconRefresh() {
    IconRefresh_classCallCheck(this, IconRefresh);

    return IconRefresh_possibleConstructorReturn(this, IconRefresh_getPrototypeOf(IconRefresh).apply(this, arguments));
  }

  IconRefresh_createClass(IconRefresh, [{
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
        d: "M12 6v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.2.2-.51 0-.71l-2.79-2.79c-.31-.31-.85-.09-.85.36V4c-4.42 0-8 3.58-8 8 0 1.04.2 2.04.57 2.95.27.67 1.13.85 1.64.34.27-.27.38-.68.23-1.04C6.15 13.56 6 12.79 6 12c0-3.31 2.69-6 6-6zm5.79 2.71c-.27.27-.38.69-.23 1.04.28.7.44 1.46.44 2.25 0 3.31-2.69 6-6 6v-1.79c0-.45-.54-.67-.85-.35l-2.79 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.31.31.85.09.85-.35V20c4.42 0 8-3.58 8-8 0-1.04-.2-2.04-.57-2.95-.27-.67-1.13-.85-1.64-.34z"
      }));
    }
  }]);

  return IconRefresh;
}(external_react_default.a.PureComponent);
// CONCATENATED MODULE: ./src/asserts/icons/IconRotateLeft.js
function IconRotateLeft_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { IconRotateLeft_typeof = function _typeof(obj) { return typeof obj; }; } else { IconRotateLeft_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return IconRotateLeft_typeof(obj); }

function IconRotateLeft_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function IconRotateLeft_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function IconRotateLeft_createClass(Constructor, protoProps, staticProps) { if (protoProps) IconRotateLeft_defineProperties(Constructor.prototype, protoProps); if (staticProps) IconRotateLeft_defineProperties(Constructor, staticProps); return Constructor; }

function IconRotateLeft_possibleConstructorReturn(self, call) { if (call && (IconRotateLeft_typeof(call) === "object" || typeof call === "function")) { return call; } return IconRotateLeft_assertThisInitialized(self); }

function IconRotateLeft_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function IconRotateLeft_getPrototypeOf(o) { IconRotateLeft_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return IconRotateLeft_getPrototypeOf(o); }

function IconRotateLeft_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) IconRotateLeft_setPrototypeOf(subClass, superClass); }

function IconRotateLeft_setPrototypeOf(o, p) { IconRotateLeft_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return IconRotateLeft_setPrototypeOf(o, p); }


var IconRotateLeft_IconRotateLeft =
/*#__PURE__*/
function (_React$PureComponent) {
  IconRotateLeft_inherits(IconRotateLeft, _React$PureComponent);

  function IconRotateLeft() {
    IconRotateLeft_classCallCheck(this, IconRotateLeft);

    return IconRotateLeft_possibleConstructorReturn(this, IconRotateLeft_getPrototypeOf(IconRotateLeft).apply(this, arguments));
  }

  IconRotateLeft_createClass(IconRotateLeft, [{
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

  return IconRotateLeft;
}(external_react_default.a.PureComponent);
// CONCATENATED MODULE: ./src/asserts/icons/IconRotateRight.js
function IconRotateRight_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { IconRotateRight_typeof = function _typeof(obj) { return typeof obj; }; } else { IconRotateRight_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return IconRotateRight_typeof(obj); }

function IconRotateRight_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function IconRotateRight_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function IconRotateRight_createClass(Constructor, protoProps, staticProps) { if (protoProps) IconRotateRight_defineProperties(Constructor.prototype, protoProps); if (staticProps) IconRotateRight_defineProperties(Constructor, staticProps); return Constructor; }

function IconRotateRight_possibleConstructorReturn(self, call) { if (call && (IconRotateRight_typeof(call) === "object" || typeof call === "function")) { return call; } return IconRotateRight_assertThisInitialized(self); }

function IconRotateRight_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function IconRotateRight_getPrototypeOf(o) { IconRotateRight_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return IconRotateRight_getPrototypeOf(o); }

function IconRotateRight_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) IconRotateRight_setPrototypeOf(subClass, superClass); }

function IconRotateRight_setPrototypeOf(o, p) { IconRotateRight_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return IconRotateRight_setPrototypeOf(o, p); }


var IconRotateRight_IconRotateRight =
/*#__PURE__*/
function (_React$PureComponent) {
  IconRotateRight_inherits(IconRotateRight, _React$PureComponent);

  function IconRotateRight() {
    IconRotateRight_classCallCheck(this, IconRotateRight);

    return IconRotateRight_possibleConstructorReturn(this, IconRotateRight_getPrototypeOf(IconRotateRight).apply(this, arguments));
  }

  IconRotateRight_createClass(IconRotateRight, [{
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

  return IconRotateRight;
}(external_react_default.a.PureComponent);
// CONCATENATED MODULE: ./src/asserts/icons/IconZoom.js
function IconZoom_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { IconZoom_typeof = function _typeof(obj) { return typeof obj; }; } else { IconZoom_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return IconZoom_typeof(obj); }

function IconZoom_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function IconZoom_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function IconZoom_createClass(Constructor, protoProps, staticProps) { if (protoProps) IconZoom_defineProperties(Constructor.prototype, protoProps); if (staticProps) IconZoom_defineProperties(Constructor, staticProps); return Constructor; }

function IconZoom_possibleConstructorReturn(self, call) { if (call && (IconZoom_typeof(call) === "object" || typeof call === "function")) { return call; } return IconZoom_assertThisInitialized(self); }

function IconZoom_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function IconZoom_getPrototypeOf(o) { IconZoom_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return IconZoom_getPrototypeOf(o); }

function IconZoom_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) IconZoom_setPrototypeOf(subClass, superClass); }

function IconZoom_setPrototypeOf(o, p) { IconZoom_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return IconZoom_setPrototypeOf(o, p); }


var IconZoom_IconZoom =
/*#__PURE__*/
function (_React$PureComponent) {
  IconZoom_inherits(IconZoom, _React$PureComponent);

  function IconZoom() {
    IconZoom_classCallCheck(this, IconZoom);

    return IconZoom_possibleConstructorReturn(this, IconZoom_getPrototypeOf(IconZoom).apply(this, arguments));
  }

  IconZoom_createClass(IconZoom, [{
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

  return IconZoom;
}(external_react_default.a.PureComponent);
// CONCATENATED MODULE: ./src/asserts/icons/index.js









// CONCATENATED MODULE: ./src/components/context.js
// Context 管理器
// React libs

var Context = Object(external_react_["createContext"])();
// EXTERNAL MODULE: external "lodash.memoize"
var external_lodash_memoize_ = __webpack_require__("lodash.memoize");
var external_lodash_memoize_default = /*#__PURE__*/__webpack_require__.n(external_lodash_memoize_);

// CONCATENATED MODULE: ./src/utils/index.js
function utils_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function utils_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { utils_ownKeys(Object(source), true).forEach(function (key) { utils_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { utils_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 工具函数
 **/
// Libs

/**
 * 通过屏幕尺寸以及图片尺寸，计算出图片在屏幕中完整显示的缩放比例
 * @param {number} naturalWidth - 图片原始宽
 * @param {number} naturalHeight - 图片原始高
 * @param {number} [edge] - 需要预留的边距
 */

var calcFitScale = function calcFitScale(naturalWidth, naturalHeight) {
  var edge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var clientWidth = getClientWidth();
  var clientHeight = getClientHeight();
  var figureWidth = naturalWidth + 2 * edge;
  var figureHeight = naturalHeight + 2 * edge;
  var scaleX = figureWidth > clientWidth ? clientWidth / (naturalWidth + 2 * edge) : 1;
  var scaleY = figureHeight > clientHeight ? clientHeight / (naturalHeight + 2 * edge) : 1;
  return Math.min(scaleX, scaleY) + 0.002; // 防止在高dpi设备出现无法占满边距的问题
};
/**
 * 屏幕尺寸
 */

var getInnerWidth = function getInnerWidth() {
  return window.innerWidth;
};
var getScrollWidth = function getScrollWidth() {
  return document.body.scrollWidth;
};
var getClientWidth = function getClientWidth() {
  return document.documentElement.clientWidth;
};
var getInnerHeight = function getInnerHeight() {
  return window.innerHeight;
};
var getScrollHeight = function getScrollHeight() {
  return document.body.scrollHeight;
};
var getClientHeight = function getClientHeight() {
  return document.documentElement.clientHeight;
};
/**
 * 触摸交互锁定
 * 缩放, 滚动等
 * FIXME: iOS Safari 如果进入全屏则无效
 */

var touchStyle = {
  html: {},
  body: {}
};
var lockTouchInteraction = function lockTouchInteraction() {
  // Save
  touchStyle.html.overflow = document.documentElement.style.overflow;
  touchStyle.body.overflow = document.body.style.overflow;
  touchStyle.body.position = document.body.style.position; // Apply

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'relative';
};
var unlockTouchInteraction = function unlockTouchInteraction() {
  // Recover
  document.documentElement.style.overflow = touchStyle.html.overflow;
  document.body.style.overflow = touchStyle.body.overflow;
  document.body.style.position = touchStyle.body.position;
};
/**
 * 检查图片是否完全载入
 * @param {HTMLImageElement} targetImageElement - 目标图片元素
 * @param {function} [callback] - 回调函数
 */

var checkImageLoadedComplete = function checkImageLoadedComplete(targetImageElement, callback) {
  var timer;

  var checker = function checker() {
    if (!targetImageElement || targetImageElement.complete) {
      clearInterval(timer);
      callback && callback();
    }
  };

  timer = setInterval(checker, 500);
  return timer;
};
/**
 * 为 Url 附加参数
 * @param {string}  url - 目标地址
 * @param {object} [params] - 要附加的参数列表
 */

var appendParams = function appendParams(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var paramString = Object.keys(params).reduce(function (acc, cur) {
    return params[cur] ? acc.concat("".concat(cur, "=").concat(params[cur])) : acc;
  }, []).join("&");
  return paramString ? "".concat(url).concat(url.includes('?') ? '&' : '?').concat(paramString) : url;
};
/**
 * 提取样式对象中的数值
 * @param {string}  unit - 目标样式对象
 * @param {number} [percentRef] - 当 unit 为百分比时的基准参考数值
 */

var numberOfStyleUnits = external_lodash_memoize_default()(function (unit) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$ref = _ref.ref,
      ref = _ref$ref === void 0 ? 100 : _ref$ref;

  return unit ? unit.includes('%') ? ref * Number(unit.substring(0, unit.length - 1)) / 100 : Number(unit.substring(0, unit.length - 2)) : unit;
});
/**
 * 下载文件
 * @param {string}  href - 下载目标地址
 * @param {string} [name] - 下载文件名称
 */

var downloadFromLink = function downloadFromLink(href, name) {
  var downloadLink = document.createElement('a');
  downloadLink.href = href;
  downloadLink.download = name || href.split("/")[href.split("/").length - 1];
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
/**
 * 令首字母大写
 * @param {string} string - 目标文本
 */

var uppercaseFirstLetter = function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
/**
 * 增加浏览器前缀
 * @param {object} style - 目标样式
 */

var withVendorPrefix = external_lodash_memoize_default()(function (style) {
  var vendorPrefixList = ['Webkit', 'Moz', 'Ms', 'O'];
  return Object.keys(style).reduce(function (styleAcc, styleCur) {
    var stylesWithPrefix = vendorPrefixList.reduce(function (prefixAcc, prefixCur) {
      return utils_objectSpread({}, prefixAcc, utils_defineProperty({}, "".concat(prefixCur).concat(uppercaseFirstLetter(styleCur)), style[styleCur]));
    }, {});
    return utils_objectSpread({}, styleAcc, {}, stylesWithPrefix);
  }, style);
});
/**
 * 是否数字
 * @param {number} num - 数字
 */

var isInteger = function isInteger(num) {
  return (num ^ 0) === num;
};
/**
 * 获取目标页码
 */

/**
 * @param {number} current - 当前页码
 * @param {number} length - 集合总长度
 * @param {number} step - 目标方向
 * @param {object} options - 配置项
 * @param {boolean} options.loop - 是否循环
 */

var getTargetPage = function getTargetPage(current, length, step) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    loop: true
  };

  // Guards
  if (length === 0) {
    return 0;
  }

  if (step === 0) {
    return current;
  }

  if (current < 0 || current > length - 1) {
    return undefined;
  } // Processing


  return options.loop ? Math.abs(length + step + current) % length : current + step < 0 || current + step > length - 1 ? undefined : current + step;
};
/**
 * 生成鏡像數組
 * @param {number} distance - 距離0點的長度
 */

var RANGE = {
  0: [0],
  1: [-1, 0, 1],
  2: [-2, -1, 0, 1, 2],
  3: [-3, -2, -1, 0, 1, 2, 3]
};
var mirrorRange = function mirrorRange(edge) {
  return RANGE[edge];
};
// CONCATENATED MODULE: ./src/components/Control/Control.js
function Control_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Control_typeof = function _typeof(obj) { return typeof obj; }; } else { Control_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Control_typeof(obj); }

function Control_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Control_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Control_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Control_createClass(Constructor, protoProps, staticProps) { if (protoProps) Control_defineProperties(Constructor.prototype, protoProps); if (staticProps) Control_defineProperties(Constructor, staticProps); return Constructor; }

function Control_possibleConstructorReturn(self, call) { if (call && (Control_typeof(call) === "object" || typeof call === "function")) { return call; } return Control_assertThisInitialized(self); }

function Control_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Control_getPrototypeOf(o) { Control_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Control_getPrototypeOf(o); }

function Control_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Control_setPrototypeOf(subClass, superClass); }

function Control_setPrototypeOf(o, p) { Control_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Control_setPrototypeOf(o, p); }

/**
 * 控制层
 * 控制图片切换, 缩放
 **/
// Libs

 // Style

 // Asserts

 // Utils




var Control_Control_Control =
/*#__PURE__*/
function (_React$PureComponent) {
  Control_inherits(Control, _React$PureComponent);

  function Control() {
    Control_classCallCheck(this, Control);

    return Control_possibleConstructorReturn(this, Control_getPrototypeOf(Control).apply(this, arguments));
  }

  Control_createClass(Control, [{
    key: "render",
    value: function render() {
      var _this = this,
          _classnames9;

      var _this$context = this.context,
          set = _this$context.set,
          preset = _this$context.preset,
          presetIsMobile = _this$context.presetIsMobile,
          presetIsDesktop = _this$context.presetIsDesktop,
          controller = _this$context.controller,
          backdrop = _this$context.backdrop,
          loop = _this$context.loop,
          show = _this$context.show,
          zoom = _this$context.zoom,
          page = _this$context.page,
          outBrowsing = _this$context.outBrowsing,
          toPage = _this$context.toPage,
          toPrevPage = _this$context.toPrevPage,
          toNextPage = _this$context.toNextPage,
          toggleZoom = _this$context.toggleZoom,
          toggleRotate = _this$context.toggleRotate;
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        id: "zmageControl",
        className: external_classnames_default()(Control_default.a.controls, Control_defineProperty({}, Control_default.a.show, !zoom && show)),
        style: {
          backgroundColor: backdrop
        }
      }, controller.rotate && external_react_default.a.createElement("div", {
        id: "zmageControlRotateLeft",
        className: external_classnames_default()(Control_default.a.rotateLeft, Control_defineProperty({}, Control_default.a.show, !zoom && show)),
        onClick: toggleRotate("left")
      }, external_react_default.a.createElement(IconRotateLeft_IconRotateLeft, null)), controller.rotate && external_react_default.a.createElement("div", {
        id: "zmageControlRotateRight",
        className: external_classnames_default()(Control_default.a.rotateRight, Control_defineProperty({}, Control_default.a.show, !zoom && show)),
        onClick: toggleRotate("right")
      }, external_react_default.a.createElement(IconRotateRight_IconRotateRight, null)), controller.download && external_react_default.a.createElement("div", {
        id: "zmageControlDownload",
        className: external_classnames_default()(Control_default.a.download, Control_defineProperty({}, Control_default.a.show, !zoom && show)),
        onClick: function onClick() {
          return downloadFromLink(_this.context.set[_this.context.page].src);
        }
      }, external_react_default.a.createElement(IconDownload_IconDownload, null)), controller.zoom && external_react_default.a.createElement("div", {
        id: "zmageControlZoom",
        className: external_classnames_default()(Control_default.a.zoom, Control_defineProperty({}, Control_default.a.show, !zoom && show)),
        onClick: presetIsMobile ? function () {
          return window.open(set[page].src);
        } : toggleZoom
      }, external_react_default.a.createElement(IconZoom_IconZoom, null)), controller.close && external_react_default.a.createElement("div", {
        id: "zmageControlClose",
        className: external_classnames_default()(Control_default.a.close, Control_defineProperty({}, Control_default.a.show, !zoom && show)),
        onClick: zoom ? toggleZoom : outBrowsing
      }, external_react_default.a.createElement(IconClose_IconClose, null))), Array.isArray(set) && set.length > 1 && controller.flip && external_react_default.a.createElement(external_react_["Fragment"], null, (loop || page !== 0) && external_react_default.a.createElement("div", {
        id: "zmageControlFlipLeft",
        className: external_classnames_default()(Control_default.a.flipLeft, Control_defineProperty({}, Control_default.a.show, !zoom && show)),
        style: {
          backgroundColor: backdrop
        },
        onClick: toPrevPage
      }, external_react_default.a.createElement(IconArrowLeft_IconArrowLeft, null)), (loop || page !== set.length - 1) && external_react_default.a.createElement("div", {
        id: "zmageControlFlipRight",
        className: external_classnames_default()(Control_default.a.flipRight, Control_defineProperty({}, Control_default.a.show, !zoom && show)),
        style: {
          backgroundColor: backdrop
        },
        onClick: toNextPage
      }, external_react_default.a.createElement(IconArrowRight_IconArrowRight, null))), Array.isArray(set) && set.length > 1 && controller.pagination && external_react_default.a.createElement("div", {
        id: "zmageControlPagination",
        className: external_classnames_default()(Control_default.a.pages, (_classnames9 = {}, Control_defineProperty(_classnames9, Control_default.a.show, !zoom && show), Control_defineProperty(_classnames9, Control_default.a.mobile, presetIsMobile), _classnames9)),
        style: {
          backgroundColor: backdrop
        }
      }, set.map(function (_, i) {
        return i === page ? external_react_default.a.createElement("span", {
          key: i,
          id: "zmageControlPaginationActive",
          className: Control_default.a.blackDot
        }) : external_react_default.a.createElement("span", {
          key: i,
          className: Control_default.a.whiteDot,
          onClick: function onClick() {
            return toPage(i);
          }
        });
      })));
    }
  }]);

  return Control;
}(external_react_default.a.PureComponent);


Control_Control_Control.contextType = Context;
// CONCATENATED MODULE: ./src/components/Control/index.js

// EXTERNAL MODULE: ./src/components/Image/Image.less
var Image_Image = __webpack_require__("./src/components/Image/Image.less");
var Image_default = /*#__PURE__*/__webpack_require__.n(Image_Image);

// EXTERNAL MODULE: ./src/components/Image/Loading.less
var Image_Loading = __webpack_require__("./src/components/Image/Loading.less");
var Loading_default = /*#__PURE__*/__webpack_require__.n(Image_Loading);

// CONCATENATED MODULE: ./src/components/Image/Loading.js
function Loading_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Loading_typeof = function _typeof(obj) { return typeof obj; }; } else { Loading_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Loading_typeof(obj); }

function Loading_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Loading_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Loading_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Loading_createClass(Constructor, protoProps, staticProps) { if (protoProps) Loading_defineProperties(Constructor.prototype, protoProps); if (staticProps) Loading_defineProperties(Constructor, staticProps); return Constructor; }

function Loading_possibleConstructorReturn(self, call) { if (call && (Loading_typeof(call) === "object" || typeof call === "function")) { return call; } return Loading_assertThisInitialized(self); }

function Loading_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Loading_getPrototypeOf(o) { Loading_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Loading_getPrototypeOf(o); }

function Loading_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Loading_setPrototypeOf(subClass, superClass); }

function Loading_setPrototypeOf(o, p) { Loading_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Loading_setPrototypeOf(o, p); }

/**
 * 加载动画
 **/
// Libs

 // Styles

 // Icons

 // Utils



var Loading_Loading =
/*#__PURE__*/
function (_React$PureComponent) {
  Loading_inherits(Loading, _React$PureComponent);

  function Loading() {
    Loading_classCallCheck(this, Loading);

    return Loading_possibleConstructorReturn(this, Loading_getPrototypeOf(Loading).apply(this, arguments));
  }

  Loading_createClass(Loading, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          show = _this$props.show,
          load = _this$props.load,
          invalidate = _this$props.invalidate,
          onReload = _this$props.onReload,
          backdrop = _this$props.backdrop;
      return external_react_default.a.createElement(external_react_["Fragment"], null, (load || invalidate) && external_react_default.a.createElement("div", {
        id: "zmageLoading",
        className: external_classnames_default()(Loading_default.a.loadingContainer, Loading_defineProperty({}, Loading_default.a.show, show))
      }, load && external_react_default.a.createElement("div", {
        className: Loading_default.a.loading
      }, external_react_default.a.createElement(IconLoading_IconLoading, null)), invalidate && external_react_default.a.createElement("button", {
        className: Loading_default.a.reload,
        onClick: onReload,
        style: {
          background: backdrop
        }
      }, external_react_default.a.createElement(IconRefresh_IconRefresh, null))));
    }
  }]);

  return Loading;
}(external_react_default.a.PureComponent);


Loading_Loading.contextType = Context;
// CONCATENATED MODULE: ./src/config/anim.js
/* 与 anim.less 同步 */
// 动画参数 (正常)
var animationFunction = 'cubic-bezier(0.60, 0.0, 0.10, 1.0)';
var animationDuration = 350; // 动画参数 (放大查看时)

var animationFunctionOnZooming = 'cubic-bezier(0, 0.1, 0.1, 1)';
var animationDurationOnZooming = 0;
var animationTransition = function animationTransition() {
  var multiple = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return "transform ".concat(animationDuration * multiple, "ms ").concat(animationFunction, ", opacity ").concat(animationDuration * multiple, "ms ").concat(animationFunction, ", clip-path ").concat(animationDuration * multiple, "ms ").concat(animationFunction);
};
// CONCATENATED MODULE: ./src/components/Image/Image.utils.js
/**
 * 样式控制
 **/
// Utils


/* 获取当前图片样式 */

var getCurrentImageStyle = function getCurrentImageStyle(props, context, imageRef, touchProfile) {
  var show = props.show;
  var zoom = context.zoom;

  if (show) {
    if (zoom) {
      return Image_utils_getZoomingStyle(props, context, imageRef);
    } else {
      return Image_utils_getBrowsingStyle(props, context, imageRef);
    }
  } else {
    return Image_utils_getCoverStyle(props, context, imageRef, touchProfile);
  }
};
/* 获取封面样式 */

var Image_utils_getCoverStyle = function getCoverStyle(props, context, imageRef, touchProfile) {
  var coverRef = context.coverRef,
      coverPos = context.coverPos,
      rotate = context.rotate,
      pageIsCover = context.pageIsCover;

  if (touchProfile && touchProfile.phase === TOUCH_BEHAVIOR_PHASE.END) {
    var offset = touchProfile.getCurrentOffset();
    return {
      _type: 'cover',
      _behavior: 'merge',
      y: offset.y > 0 ? getInnerHeight() : -getInnerHeight()
    };
  }

  if (coverRef.current) {
    // 从封面唤出
    var naturalWidth = coverRef.current.naturalWidth;

    var _coverRef$current$get = coverRef.current.getBoundingClientRect(),
        top = _coverRef$current$get.top,
        left = _coverRef$current$get.left,
        width = _coverRef$current$get.width,
        height = _coverRef$current$get.height;

    var _window$getComputedSt = window.getComputedStyle(coverRef.current),
        opacity = _window$getComputedSt.opacity,
        borderRadius = _window$getComputedSt.borderRadius;

    return pageIsCover ? {
      _type: 'cover',
      x: -getScrollWidth() / 2 + left + width / 2,
      y: -getInnerHeight() / 2 + top + height / 2,
      opacity: Number(opacity) || 1,
      scale: naturalWidth ? width / naturalWidth : 1,
      rotate: rotate - rotate % 360,
      radius: numberOfStyleUnits(borderRadius, {
        ref: width
      })
    } : {
      _type: 'cover',
      x: 0,
      y: -getInnerHeight(),
      opacity: 0,
      scale: naturalWidth ? width / naturalWidth : 1,
      rotate: rotate - rotate % 360,
      radius: numberOfStyleUnits(borderRadius, {
        ref: width
      })
    };
  } else if (coverPos) {
    // 从 Callee 唤出
    // 获取以鼠标指针为起始点的封面样式
    return {
      _type: 'cover',
      x: coverPos.x ? coverPos.x - getScrollWidth() / 2 : 0,
      y: coverPos.y ? coverPos.y - getInnerHeight() / 2 : 0,
      opacity: 0,
      scale: 0,
      rotate: 0,
      radius: 0
    };
  } else {
    // Fallback
    // 获取以屏幕中心为起始点的封面样式
    return {
      _type: 'cover',
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0,
      rotate: 0,
      radius: 0
    };
  }
};
/* 获取浏览样式 */

var Image_utils_getBrowsingStyle = function getBrowsingStyle(props, context, imageRef) {
  var radius = context.radius,
      edge = context.edge,
      rotate = context.rotate;
  var _imageRef$current = imageRef.current,
      naturalWidth = _imageRef$current.naturalWidth,
      naturalHeight = _imageRef$current.naturalHeight;
  var scale = calcFitScale(naturalWidth, naturalHeight, edge);
  return {
    _type: 'browsing',
    x: 0,
    y: 0,
    opacity: 1,
    scale: scale,
    rotate: rotate,
    radius: radius
  };
};
/* 获取缩放样式 */

var Image_utils_getZoomingStyle = function getZoomingStyle(props, context, imageRef) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$clientX = _ref.clientX,
      mouseX = _ref$clientX === void 0 ? getScrollWidth() / 2 : _ref$clientX,
      _ref$clientY = _ref.clientY,
      mouseY = _ref$clientY === void 0 ? getInnerHeight() / 2 : _ref$clientY;

  var radius = context.radius,
      edge = context.edge,
      rotate = context.rotate;
  var _imageRef$current2 = imageRef.current,
      naturalWidth = _imageRef$current2.naturalWidth,
      naturalHeight = _imageRef$current2.naturalHeight; // 随鼠标位移偏移量

  var saveEdge = edge || 50;
  var viewWidth = getScrollWidth();
  var viewHeight = getInnerHeight();
  var rangeX = naturalWidth - viewWidth + 2 * saveEdge;
  var rangeY = naturalHeight - viewHeight + 2 * saveEdge;
  var imgPosX = naturalWidth > viewWidth ? (naturalWidth - viewWidth) / 2 + saveEdge - rangeX * (mouseX / viewWidth) : 0;
  var imgPosY = naturalHeight > viewHeight ? (naturalHeight - viewHeight) / 2 + saveEdge - rangeY * (mouseY / viewHeight) : 0; // 返回位置

  return {
    _type: 'zooming',
    x: imgPosX,
    y: imgPosY,
    opacity: 1,
    scale: 1,
    rotate: rotate,
    radius: radius
  };
};
/* 动画属性 */

var CROSS_FADE_OFFSET = 30;
var SWIPE_GAP = 10;
var ZOOM_OVERFLOW = 0.08;
var Image_utils_getAnimateConfig = function getAnimateConfig(type) {
  var offset = 0,
      overflow = 0,
      opacity = 1;

  switch (type) {
    case 'fade':
      opacity = 0;
      break;

    case 'crossFade':
      offset = CROSS_FADE_OFFSET;
      opacity = 0;
      break;

    case 'swipe':
      offset = getScrollWidth() + SWIPE_GAP;
      break;

    case 'zoom':
      overflow = ZOOM_OVERFLOW;
      opacity = 0;
      break;
  }

  return {
    offset: offset,
    overflow: overflow,
    opacity: opacity
  };
};
/* 触控属性 */

var TOUCH_UPDATE_PERIOD = 1;
var TOUCH_BEHAVIOR_THRESHOLD = 5;
var TOUCH_SPEED_THRESHOLD = 0.35;
var TOUCH_DISTANCE_THRESHOLD = {
  x: 120,
  y: 80
};
var TOUCH_BEHAVIOR_PHASE = {
  "BEGIN": "BEGIN",
  "MOVING": "MOVING",
  "END": "END"
};
var TOUCH_BEHAVIOR_TYPE = {
  "SWIPING": "SWIPING",
  "LIVING": "LIVING"
};
var Image_utils_touchProfile = function touchProfile() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      origin = _ref2.origin;

  return {
    updateCounter: 0,
    phase: TOUCH_BEHAVIOR_PHASE.BEGIN,
    behavior: undefined,
    begin: {
      time: new Date().getTime(),
      origin: origin || {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      }
    },
    current: {
      origin: origin || {
        x: 0,
        y: 0
      },
      offset: {
        x: 0,
        y: 0
      }
    },
    getCurrentOffset: function getCurrentOffset() {
      return {
        x: this.current.origin.x - this.begin.origin.x,
        y: this.current.origin.y - this.begin.origin.y
      };
    },
    getCurrentDistance: function getCurrentDistance() {
      var offset = this.getCurrentOffset();
      return {
        x: Math.abs(offset.x),
        y: Math.abs(offset.y)
      };
    },
    update: function update() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          origin = _ref3.origin;

      // 会卡帧
      // // 更新计数
      // this.updateCounter++
      // // 根据周期决定是否更新
      // if (this.updateCounter%TOUCH_UPDATE_PERIOD===0) {
      // 更新阶段属性
      this.phase = TOUCH_BEHAVIOR_PHASE.MOVING; // 更新坐标属性

      this.current.origin = origin; // 初次更新行为属性

      if (!this.behavior) {
        var distance = this.getCurrentDistance();

        if (distance.x > distance.y) {
          if (distance.x > TOUCH_BEHAVIOR_THRESHOLD) {
            this.behavior = TOUCH_BEHAVIOR_TYPE.SWIPING;
          }
        } else {
          if (distance.y > TOUCH_BEHAVIOR_THRESHOLD) {
            this.behavior = TOUCH_BEHAVIOR_TYPE.LIVING;
          }
        }
      }

      return this; // }
    },
    end: function end() {
      // 更新阶段属性
      this.phase = TOUCH_BEHAVIOR_PHASE.END; // 时间间隔

      var interval = new Date().getTime() - this.begin.time; // 更新行为属性, 如果对应速度小于阈值, 则视为无操作

      var distance = this.getCurrentDistance();

      if (this.behavior === TOUCH_BEHAVIOR_TYPE.SWIPING && distance.x / interval < TOUCH_SPEED_THRESHOLD && distance.x < TOUCH_DISTANCE_THRESHOLD.x || this.behavior === TOUCH_BEHAVIOR_TYPE.LIVING && distance.y / interval < TOUCH_SPEED_THRESHOLD && distance.y < TOUCH_DISTANCE_THRESHOLD.y) {
        this.behavior = undefined;
      }

      return this;
    }
  };
};
var Image_utils_getTouchConfig = function getTouchConfig(profile) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      enableSwiping = _ref4.enableSwiping,
      enableLiving = _ref4.enableLiving;

  var touch = {
    x: 0,
    y: 0
  },
      transition;

  if (profile && profile.phase === TOUCH_BEHAVIOR_PHASE.MOVING) {
    var offset = profile.getCurrentOffset();

    if (profile.behavior === TOUCH_BEHAVIOR_TYPE.SWIPING && enableSwiping) {
      touch.x = offset.x;
      transition = "none";
    } else if (profile.behavior === TOUCH_BEHAVIOR_TYPE.LIVING && enableLiving) {
      touch.y = offset.y;
      transition = "none";
    }
  }

  if (profile && profile.phase === TOUCH_BEHAVIOR_PHASE.END) {
    transition = animationTransition(2);
  }

  return {
    touch: touch,
    transition: transition
  };
};
// CONCATENATED MODULE: ./src/components/Image/Image.js
function Image_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Image_typeof = function _typeof(obj) { return typeof obj; }; } else { Image_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Image_typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Image_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Image_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Image_ownKeys(Object(source), true).forEach(function (key) { Image_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Image_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Image_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Image_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Image_createClass(Constructor, protoProps, staticProps) { if (protoProps) Image_defineProperties(Constructor.prototype, protoProps); if (staticProps) Image_defineProperties(Constructor, staticProps); return Constructor; }

function Image_possibleConstructorReturn(self, call) { if (call && (Image_typeof(call) === "object" || typeof call === "function")) { return call; } return Image_assertThisInitialized(self); }

function Image_getPrototypeOf(o) { Image_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Image_getPrototypeOf(o); }

function Image_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Image_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Image_setPrototypeOf(subClass, superClass); }

function Image_setPrototypeOf(o, p) { Image_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Image_setPrototypeOf(o, p); }

function Image_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 图片层
 * 控制图片尺寸
 **/
// Libs

 // Styles

 // Components

 // Utils





var Image_Image_Image =
/*#__PURE__*/
function (_React$PureComponent) {
  Image_inherits(Image, _React$PureComponent);

  function Image(props, context) {
    var _this;

    Image_classCallCheck(this, Image);

    _this = Image_possibleConstructorReturn(this, Image_getPrototypeOf(Image).call(this, props)); // Refs

    Image_defineProperty(Image_assertThisInitialized(_this), "updateZoomEventListenerWithState", function () {
      var _this$context = _this.context,
          show = _this$context.show,
          zoom = _this$context.zoom;

      if (show && zoom && !_this.listeningMouseMove) {
        window.addEventListener('mousemove', _this.handleMouseMove);
        _this.listeningMouseMove = true;
      } else {
        window.removeEventListener('mousemove', _this.handleMouseMove);
        _this.listeningMouseMove = false;
      }
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "updateCurrentImageStyle", function () {
      var touchProfile = _this.state.touchProfile;
      var nextStyle = getCurrentImageStyle(_this.props, _this.context, _this.imageRef, touchProfile);

      _this.setCurrentStyle(nextStyle);
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleResize", function () {
      _this.updateCurrentImageStyle();
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleScroll", function () {
      if (_this.imageRef.current) {
        var show = _this.context.show;
        _this.imageRef.current.style.top = "calc(50% + ".concat(show ? 0 : _this.initialPageOffset - window.pageYOffset, "px)");
      }
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleClick", function () {
      var _this$context2 = _this.context,
          zoom = _this$context2.zoom,
          toggleZoom = _this$context2.toggleZoom;
      zoom && toggleZoom();
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleTouchStart", function (e) {
      var _e$touches$ = e.touches[0],
          clientX = _e$touches$.clientX,
          clientY = _e$touches$.clientY;

      _this.setTouchProfile(new Image_utils_touchProfile({
        origin: {
          x: clientX,
          y: clientY
        }
      }));
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleTouchMove", function (e) {
      var touchProfile = _this.state.touchProfile;
      var _e$touches$2 = e.touches[0],
          clientX = _e$touches$2.clientX,
          clientY = _e$touches$2.clientY;

      _this.setTouchProfile(touchProfile.update({
        origin: {
          x: clientX,
          y: clientY
        }
      }));
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleTouchEnd", function (e) {
      var touchProfile = _this.state.touchProfile;

      _this.setTouchProfile(touchProfile.end());
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleMouseMove", function (e) {
      var zoomingStyle = Image_utils_getZoomingStyle(_this.props, _this.context, _this.imageRef, e);

      _this.setCurrentStyle(zoomingStyle);
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleImageLoadStart", function () {
      _this.setState({
        isFetching: true,
        invalidate: false
      }, _this.handleDetectImageLoadComplete);
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleDetectImageLoadComplete", function () {
      clearInterval(_this.imageLoadingTimer);
      _this.imageLoadingTimer = checkImageLoadedComplete(_this.imageRef.current, _this.handleImageLoadEnd);
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleImageLoadEnd", function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          invalidate = _ref.invalidate;

      clearInterval(_this.imageLoadingTimer);

      _this.setState({
        isFetching: false,
        invalidate: invalidate === undefined ? _this.state.invalidate : invalidate
      });
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleImageLoad", function () {
      _this.updateCurrentImageStyle();
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleImageError", function () {
      _this.handleImageLoadEnd({
        invalidate: true
      });
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleImageAbort", function () {
      _this.handleImageLoadEnd({
        invalidate: true
      });
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleImageReload", function () {
      var page = _this.context.page;

      _this.handleSetTimestamp(page);
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleSetTimestamp", function (page) {
      var set = _this.context.set;
      var timestamp = _this.state.timestamp;

      _this.setState({
        timestamp: Image_objectSpread({}, timestamp, Image_defineProperty({}, set[page].src, new Date().getTime()))
      });
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "handleGetTimestamp", function (page) {
      var set = _this.context.set;
      var timestamp = _this.state.timestamp;
      return timestamp[set[page].src];
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "setCurrentStyle", function (nextStyle) {
      var animate = _this.context.animate;
      var currentStyle = _this.state.currentStyle;

      _this.setState({
        currentStyle: nextStyle._behavior === 'merge' ? Image_objectSpread({}, currentStyle, {}, nextStyle) : nextStyle,
        animateConfig: Image_utils_getAnimateConfig(animate.flip)
      });
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "setTouchProfile", function (nextProfile) {
      if (nextProfile) {
        _this.setState({
          touchProfile: Image_objectSpread({}, nextProfile)
        }, function () {
          var _this$context3 = _this.context,
              outBrowsing = _this$context3.outBrowsing,
              toPrevPage = _this$context3.toPrevPage,
              toNextPage = _this$context3.toNextPage;
          var touchProfile = _this.state.touchProfile;

          if (touchProfile.phase === TOUCH_BEHAVIOR_PHASE.END) {
            if (touchProfile.behavior === TOUCH_BEHAVIOR_TYPE.SWIPING) {
              var offset = touchProfile.getCurrentOffset();
              offset.x < 0 ? toNextPage() : toPrevPage();
            } else if (touchProfile.behavior === TOUCH_BEHAVIOR_TYPE.LIVING) {
              outBrowsing();
            }
          }
        });
      }
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "getStyle", function (step, distance, isSideImage) {
      var _this$context4 = _this.context,
          set = _this$context4.set,
          zoom = _this$context4.zoom,
          page = _this$context4.page;
      var _this$state = _this.state,
          invalidate = _this$state.invalidate,
          currentStyle = _this$state.currentStyle,
          touchProfile = _this$state.touchProfile,
          animateConfig = _this$state.animateConfig;
      var transform, clipPath, zIndex, pointerEvents; // 获取动画配置

      var offset = animateConfig.offset,
          overflow = animateConfig.overflow,
          opacity = animateConfig.opacity; // 获取触摸配置

      var _getTouchConfig = Image_utils_getTouchConfig(touchProfile, {
        enableSwiping: set.length > 1,
        enableLiving: true
      }),
          touch = _getTouchConfig.touch,
          transition = _getTouchConfig.transition; // 计算样式


      if (isSideImage) {
        // 仅对左右两张图做滑动跟踪
        var x = distance === 1 ? currentStyle.x + touch.x + offset * step : currentStyle.x + offset * step;
        var y = currentStyle.y;
        transform = "translate3d(-50%, -50%, 0) translate3d(".concat(x, "px, ").concat(y, "px, 0px) scale3d(").concat(currentStyle.scale + overflow, ", ").concat(currentStyle.scale + overflow, ", 1) rotate3d(0, 0, 1, 0deg)");
        zIndex = 10 * distance;
        pointerEvents = 'none';
      } else {
        var _x = currentStyle.x + touch.x;

        var _y = currentStyle.y + touch.y;

        transform = "translate3d(-50%, -50%, 0) translate3d(".concat(_x, "px, ").concat(_y, "px, 0px) scale3d(").concat(currentStyle.scale, ", ").concat(currentStyle.scale, ", 1) rotate3d(0, 0, 1, ").concat(currentStyle.rotate, "deg)"); // clipPath = currentStyle.radius ? `inset(0% 0% 0% 0% round ${currentStyle.radius/currentStyle.scale}px)` : `inset(0% 0% 0% 0% round 0)`

        opacity = currentStyle.opacity;
        zIndex = 10;
      }

      return Image_objectSpread({}, withVendorPrefix({
        transform: transform
      }), {
        cursor: zoom ? 'zoom-out' : 'initial',
        zIndex: zIndex,
        opacity: invalidate ? 0 : opacity,
        pointerEvents: pointerEvents,
        transition: transition
      }, set[page].style);
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "buildImageSeries", function (edge) {
      var _this$context5 = _this.context,
          loop = _this$context5.loop,
          set = _this$context5.set,
          page = _this$context5.page;

      if (set.length > 1) {
        var rangeList = mirrorRange(edge);
        return rangeList.reduce(function (acc, step) {
          // 計算索引
          var imageIndex = getTargetPage(page, set.length, step, {
            loop: loop
          });

          if (isInteger(imageIndex)) {
            acc.push(_this.buildImage({
              step: step,
              imageIndex: imageIndex
            }));
          }

          return acc;
        }, []);
      } else {
        return _this.buildImage({
          step: 0,
          imageIndex: page
        });
      }
    });

    Image_defineProperty(Image_assertThisInitialized(_this), "buildImage", function () {
      var _classnames;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          step = _ref2.step,
          imageIndex = _ref2.imageIndex;

      var _this$context6 = _this.context,
          set = _this$context6.set,
          show = _this$context6.show,
          zoom = _this$context6.zoom,
          page = _this$context6.page,
          pageWithStep = _this$context6.pageWithStep;
      var invalidate = _this.state.invalidate; // 是否邊圖

      var distance = Math.abs(step);
      var isSideImage = distance > 0; // 计算真实索引

      var imageIndexWithStep = pageWithStep + step; // 計算樣式

      var imageStyle = _this.getStyle(step, distance, isSideImage);

      var imageClass = external_classnames_default()(Image_default.a.imageLayer, set[imageIndex].className, (_classnames = {}, Image_defineProperty(_classnames, Image_default.a.zooming, zoom), Image_defineProperty(_classnames, Image_default.a.invalidate, invalidate), _classnames)); // 組裝屬性

      var commonProps = {
        key: "".concat(imageIndexWithStep, "-").concat(set[imageIndex].src),
        style: imageStyle,
        className: imageClass,
        src: appendParams(set[imageIndex].src, {
          t: _this.handleGetTimestamp(page)
        }),
        alt: set[imageIndex].alt
      };
      var centerProps = {
        id: "zmageImage",
        ref: _this.imageRef,
        onLoad: _this.handleImageLoad,
        onError: _this.handleImageError,
        onAbort: _this.handleImageAbort,
        onClick: _this.handleClick
      }; // 構建内容

      if (isSideImage) {
        var sideImageShow = show && !zoom;
        return sideImageShow && external_react_default.a.createElement("img", commonProps);
      } else {
        return external_react_default.a.createElement("img", _extends({}, commonProps, centerProps));
      }
    });

    _this.imageRef = external_react_default.a.createRef(); // 初始页面高度

    _this.initialPageOffset = window.pageYOffset; // 监听状态

    _this.listeningMouseMove = false; // 图片加载

    _this.imageLoadingTimer = null;
    _this.state = {
      // Loadings State
      isFetching: true,
      invalidate: false,
      // Style
      currentStyle: Image_utils_getCoverStyle(props, context),
      // Animate
      animateConfig: Image_utils_getAnimateConfig(context.animate.flip),
      // Touch
      touchProfile: new Image_utils_touchProfile(),
      // Reload Flag
      timestamp: {}
    };
    return _this;
  }

  Image_createClass(Image, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$context7 = this.context,
          presetIsMobile = _this$context7.presetIsMobile,
          presetIsDesktop = _this$context7.presetIsDesktop;
      window.addEventListener('resize', this.handleResize);

      if (presetIsMobile) {
        window.requestAnimationFrame(function () {
          window.addEventListener('touchstart', _this2.handleTouchStart);
          window.addEventListener('touchmove', _this2.handleTouchMove);
          window.addEventListener('touchend', _this2.handleTouchEnd);
        });
      }

      if (presetIsDesktop) {
        window.requestAnimationFrame(function () {
          window.addEventListener('scroll', _this2.handleScroll);
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevShow = prevProps.show,
          prevZoom = prevProps.zoom,
          prevRotate = prevProps.rotate,
          prevPage = prevProps.page;
      var _this$props = this.props,
          currShow = _this$props.show,
          currZoom = _this$props.zoom,
          currRotate = _this$props.rotate,
          currPage = _this$props.page;
      var presetIsMobile = this.context.presetIsMobile; // 状态改变时更新样式 (Page 导致的 src 变化的 update 交给图片自身的 onload 调用)

      if (prevShow !== currShow || prevZoom !== currZoom || prevRotate !== currRotate) {
        // 显示状态切换
        if (!prevShow) {
          // 显示
          this.updateCurrentImageStyle();
          this.handleDetectImageLoadComplete();
          presetIsMobile && lockTouchInteraction();
        } else {
          // 隐藏
          this.updateCurrentImageStyle();
        } // 更新监听状态


        this.updateZoomEventListenerWithState();
      } // 切换页面时


      if (prevPage !== currPage) {
        // 显示加载
        this.handleImageLoadStart();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$context8 = this.context,
          presetIsMobile = _this$context8.presetIsMobile,
          presetIsDesktop = _this$context8.presetIsDesktop;

      if (presetIsMobile) {
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);
      }

      if (presetIsDesktop) {
        window.removeEventListener('scroll', this.handleScroll);
      }

      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('mousemove', this.handleMouseMove);
      clearInterval(this.imageLoadingTimer);
    }
    /**
     * 事件监听
     **/

  }, {
    key: "render",
    value: function render() {
      var _this$context9 = this.context,
          set = _this$context9.set,
          show = _this$context9.show,
          zoom = _this$context9.zoom,
          page = _this$context9.page,
          pageIsCover = _this$context9.pageIsCover,
          pageWithStep = _this$context9.pageWithStep;
      var _this$state2 = this.state,
          isFetching = _this$state2.isFetching,
          invalidate = _this$state2.invalidate;
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(Loading_Loading, {
        show: show && (!pageIsCover || invalidate),
        load: isFetching,
        invalidate: invalidate,
        onReload: this.handleImageReload
      }), this.buildImageSeries(2));
    }
  }]);

  return Image;
}(external_react_default.a.PureComponent);


Image_Image_Image.contextType = Context;
// CONCATENATED MODULE: ./src/components/Image/index.js

// EXTERNAL MODULE: ./src/components/Background/Background.less
var Background_Background = __webpack_require__("./src/components/Background/Background.less");
var Background_default = /*#__PURE__*/__webpack_require__.n(Background_Background);

// CONCATENATED MODULE: ./src/components/Background/Background.js
function Background_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Background_typeof = function _typeof(obj) { return typeof obj; }; } else { Background_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Background_typeof(obj); }

function Background_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Background_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Background_createClass(Constructor, protoProps, staticProps) { if (protoProps) Background_defineProperties(Constructor.prototype, protoProps); if (staticProps) Background_defineProperties(Constructor, staticProps); return Constructor; }

function Background_possibleConstructorReturn(self, call) { if (call && (Background_typeof(call) === "object" || typeof call === "function")) { return call; } return Background_assertThisInitialized(self); }

function Background_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Background_getPrototypeOf(o) { Background_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Background_getPrototypeOf(o); }

function Background_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Background_setPrototypeOf(subClass, superClass); }

function Background_setPrototypeOf(o, p) { Background_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Background_setPrototypeOf(o, p); }

/**
 * 背景层
 * 叠加半透明背景
 **/
// Libs
 // Style

 // Utils



var Background_Background_Background =
/*#__PURE__*/
function (_React$Component) {
  Background_inherits(Background, _React$Component);

  function Background() {
    Background_classCallCheck(this, Background);

    return Background_possibleConstructorReturn(this, Background_getPrototypeOf(Background).apply(this, arguments));
  }

  Background_createClass(Background, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          show = _this$props.show,
          zoom = _this$props.zoom;
      var _this$context = this.context,
          backdrop = _this$context.backdrop,
          outBrowsing = _this$context.outBrowsing,
          toggleZoom = _this$context.toggleZoom,
          presetIsDesktop = _this$context.presetIsDesktop;
      return external_react_default.a.createElement("div", {
        id: "zmageBackground",
        className: Background_default.a.backgroundLayer,
        onClick: zoom ? toggleZoom : outBrowsing,
        style: {
          opacity: show ? 1 : 0,
          background: backdrop || "",
          transitionDelay: presetIsDesktop ? show ? '.15s' : '0s' : show ? '0s' : '.35s'
        }
      });
    }
  }]);

  return Background;
}(external_react_default.a.Component);


Background_Background_Background.contextType = Context;
// CONCATENATED MODULE: ./src/components/Background/index.js

// CONCATENATED MODULE: ./src/components/Browser/Browser.utils.js
// Utils

/* 计算默认页面 */

var Browser_utils_pageDefault = function pageDefault(defaultPage, set) {
  return isInteger(defaultPage) && defaultPage < set.length - 1 ? defaultPage : set.length - 1;
};
/* 检测当前页面是否为封面 */

var Browser_utils_pageIsCover = function pageIsCover(coverRef, set, page) {
  return page === 0 || coverRef && coverRef.current && coverRef.current.getAttribute("src") === set[page].src;
};
/* 获取页面数据 */

var pageSet = function pageSet(coverRef, defaultPage, set) {
  var page = Browser_utils_pageDefault(defaultPage, set);
  return {
    page: page,
    pageIsCover: Browser_utils_pageIsCover(coverRef, set, page)
  };
};
/* 显示/隐藏封面 */

var showCover = function showCover(coverRef) {
  if (coverRef && coverRef.current) {
    coverRef.current.style.visibility = 'visible';
  }
};
var hideCover = function hideCover(coverRef) {
  // 隐藏太快会闪
  setTimeout(function () {
    if (coverRef && coverRef.current) {
      coverRef.current.style.visibility = 'hidden';
    }
  }, 100);
};
// CONCATENATED MODULE: ./src/components/Browser/Browser.js
function Browser_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Browser_typeof = function _typeof(obj) { return typeof obj; }; } else { Browser_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Browser_typeof(obj); }

function Browser_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Browser_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Browser_ownKeys(Object(source), true).forEach(function (key) { Browser_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Browser_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Browser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Browser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Browser_createClass(Constructor, protoProps, staticProps) { if (protoProps) Browser_defineProperties(Constructor.prototype, protoProps); if (staticProps) Browser_defineProperties(Constructor, staticProps); return Constructor; }

function Browser_possibleConstructorReturn(self, call) { if (call && (Browser_typeof(call) === "object" || typeof call === "function")) { return call; } return Browser_assertThisInitialized(self); }

function Browser_getPrototypeOf(o) { Browser_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Browser_getPrototypeOf(o); }

function Browser_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Browser_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Browser_setPrototypeOf(subClass, superClass); }

function Browser_setPrototypeOf(o, p) { Browser_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Browser_setPrototypeOf(o, p); }

function Browser_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 容器层
 * 储存主要状态
 **/
// Libs
 // Style

 // Components




 // Utils







var Browser_Browser_Browser =
/*#__PURE__*/
function (_React$PureComponent) {
  Browser_inherits(Browser, _React$PureComponent);

  function Browser(props) {
    var _this;

    Browser_classCallCheck(this, Browser);

    _this = Browser_possibleConstructorReturn(this, Browser_getPrototypeOf(Browser).call(this, props));

    Browser_defineProperty(Browser_assertThisInitialized(_this), "getPropsWithEnv", function () {
      var _this$props = _this.props,
          preset = _this$props.preset,
          controller = _this$props.controller,
          hotKey = _this$props.hotKey,
          animate = _this$props.animate;
      var defProp = defPropsWithEnv(preset);
      return Browser_objectSpread({}, _this.props, {
        // Preset flags
        presetIsMobile: preset === 'mobile',
        presetIsDesktop: preset !== 'mobile',
        // Control
        controller: Browser_objectSpread({}, defProp.controller, {}, controller),
        hotKey: Browser_objectSpread({}, defProp.hotKey, {}, hotKey),
        animate: Browser_objectSpread({}, defProp.animate, {}, animate)
      });
    });

    Browser_defineProperty(Browser_assertThisInitialized(_this), "init", function () {
      var _this$getPropsWithEnv = _this.getPropsWithEnv(),
          isBrowsingControlled = _this$getPropsWithEnv.isBrowsingControlled,
          coverRef = _this$getPropsWithEnv.coverRef,
          set = _this$getPropsWithEnv.set,
          onBrowsing = _this$getPropsWithEnv.onBrowsing,
          hideOnScroll = _this$getPropsWithEnv.hideOnScroll,
          coverVisible = _this$getPropsWithEnv.coverVisible,
          presetIsDesktop = _this$getPropsWithEnv.presetIsDesktop;

      var _this$state = _this.state,
          show = _this$state.show,
          page = _this$state.page,
          pageIsCover = _this$state.pageIsCover;

      if (!show) {
        presetIsDesktop && window.addEventListener('keydown', _this.handleKeyDown);
        hideOnScroll && window.addEventListener('scroll', _this.handleScroll);
        window.requestAnimationFrame(function () {
          _this.setState({
            show: true,
            zoom: false,
            rotate: 0
          }, function () {
            presetIsDesktop && pageIsCover && !coverVisible && hideCover(coverRef, set, page);
            !isBrowsingControlled && typeof onBrowsing === "function" && onBrowsing(true);
          });
        });
      }
    });

    Browser_defineProperty(Browser_assertThisInitialized(_this), "unInit", function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          force = _ref.force;

      var _this$getPropsWithEnv2 = _this.getPropsWithEnv(),
          isBrowsingControlled = _this$getPropsWithEnv2.isBrowsingControlled,
          coverRef = _this$getPropsWithEnv2.coverRef,
          set = _this$getPropsWithEnv2.set,
          onBrowsing = _this$getPropsWithEnv2.onBrowsing,
          hideOnScroll = _this$getPropsWithEnv2.hideOnScroll,
          coverVisible = _this$getPropsWithEnv2.coverVisible,
          presetIsMobile = _this$getPropsWithEnv2.presetIsMobile,
          presetIsDesktop = _this$getPropsWithEnv2.presetIsDesktop;

      var _this$state2 = _this.state,
          show = _this$state2.show,
          page = _this$state2.page,
          pageIsCover = _this$state2.pageIsCover;

      if (show || force) {
        presetIsDesktop && window.removeEventListener('keydown', _this.handleKeyDown);
        hideOnScroll && window.removeEventListener('scroll', _this.handleScroll);
        !pageIsCover && !coverVisible && showCover(coverRef, set, page);

        _this.setState({
          show: false,
          zoom: false,
          rotate: 0
        });

        setTimeout(function () {
          presetIsDesktop && pageIsCover && !coverVisible && showCover(coverRef, set, page);
          presetIsMobile && unlockTouchInteraction();

          _this.setState({
            mounted: false
          });

          !isBrowsingControlled && typeof onBrowsing === "function" && onBrowsing(false);
        }, presetIsDesktop ? animationDuration - 10 : animationDuration * 2 - 10);
      }
    });

    Browser_defineProperty(Browser_assertThisInitialized(_this), "handleKeyDown", function (e) {
      var _this$getPropsWithEnv3 = _this.getPropsWithEnv(),
          set = _this$getPropsWithEnv3.set,
          hotKey = _this$getPropsWithEnv3.hotKey,
          loop = _this$getPropsWithEnv3.loop,
          outBrowsing = _this$getPropsWithEnv3.outBrowsing;

      var _this$state3 = _this.state,
          zoom = _this$state3.zoom,
          page = _this$state3.page; // 判斷按鍵編碼

      switch (e.keyCode) {
        case 27:
          // Escape
          // 退出
          e.preventDefault();
          hotKey.close && (zoom ? _this.handleToggleZoom() : outBrowsing());
          break;

        case 32:
          // SpaceBar
          // 缩放
          e.preventDefault();
          hotKey.zoom && _this.handleToggleZoom();
          break;

        case 37:
          // ArrowLeft
          // 上一张
          e.preventDefault();
          !(!loop && page === 0) && !zoom && hotKey.flip && _this.handleToPrevPage();
          break;

        case 39:
          // ArrowRight
          // 下一张
          e.preventDefault();
          !(!loop && page === set.length - 1) && !zoom && hotKey.flip && _this.handleToNextPage();
          break;

        default:
          return;
      }
    });

    Browser_defineProperty(Browser_assertThisInitialized(_this), "handleScroll", function () {
      var outBrowsing = _this.props.outBrowsing;
      var show = _this.state.show;

      if (show) {
        outBrowsing();
      }
    });

    Browser_defineProperty(Browser_assertThisInitialized(_this), "handleToPage", function (targetPage) {
      var page = _this.state.page;

      _this.handleSwitchPages(targetPage - page)();
    });

    Browser_defineProperty(Browser_assertThisInitialized(_this), "handleSwitchPages", function (step) {
      var _this$props2 = _this.props,
          coverRef = _this$props2.coverRef,
          onSwitching = _this$props2.onSwitching,
          loop = _this$props2.loop;
      return function () {
        var set = _this.props.set;

        if (set.length > 1) {
          var _this$state4 = _this.state,
              page = _this$state4.page,
              pageWithStep = _this$state4.pageWithStep;
          var targetPage = getTargetPage(page, set.length, step, {
            loop: loop
          });

          if (typeof targetPage === "number") {
            _this.setState({
              page: targetPage,
              pageIsCover: Browser_utils_pageIsCover(coverRef, set, targetPage),
              pageWithStep: pageWithStep + step,
              zoom: false,
              rotate: 0
            }, function () {
              typeof onSwitching === "function" && onSwitching(targetPage);
            });
          }
        }
      };
    });

    Browser_defineProperty(Browser_assertThisInitialized(_this), "handleToPrevPage", _this.handleSwitchPages(-1));

    Browser_defineProperty(Browser_assertThisInitialized(_this), "handleToNextPage", _this.handleSwitchPages(1));

    Browser_defineProperty(Browser_assertThisInitialized(_this), "handleToggleZoom", function () {
      var onZooming = _this.props.onZooming;

      _this.setState({
        zoom: !_this.state.zoom
      }, function () {
        typeof onZooming === "function" && onZooming(_this.state.zoom);
      });
    });

    Browser_defineProperty(Browser_assertThisInitialized(_this), "handleToggleRotate", function (direction) {
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

    var _pageSet = pageSet(props.coverRef, props.defaultPage, props.set),
        _page = _pageSet.page,
        _pageIsCover = _pageSet.pageIsCover;

    _this.state = {
      // 载入
      mounted: false,
      // 显示
      show: false,
      // 缩放
      zoom: false,
      // 旋转
      rotate: 0,
      // 页数
      page: _page,
      pageIsCover: _pageIsCover,
      pageWithStep: _page
    };
    return _this;
  }

  Browser_createClass(Browser, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.browsing) {
        this.init();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.browsing !== this.props.browsing) {
        if (this.props.browsing) {
          this.init();
        } else {
          this.unInit();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unInit({
        force: true
      });
    }
    /**
     * Props Getter
     * 如果需要读取 controller / hotKey / animate 需要由此读取
     **/

  }, {
    key: "render",
    value: function render() {
      var _this$getPropsWithEnv4 = this.getPropsWithEnv(),
          coverRef = _this$getPropsWithEnv4.coverRef,
          coverPos = _this$getPropsWithEnv4.coverPos,
          outBrowsing = _this$getPropsWithEnv4.outBrowsing,
          set = _this$getPropsWithEnv4.set,
          preset = _this$getPropsWithEnv4.preset,
          presetIsMobile = _this$getPropsWithEnv4.presetIsMobile,
          presetIsDesktop = _this$getPropsWithEnv4.presetIsDesktop,
          controller = _this$getPropsWithEnv4.controller,
          hotKey = _this$getPropsWithEnv4.hotKey,
          animate = _this$getPropsWithEnv4.animate,
          hideOnScroll = _this$getPropsWithEnv4.hideOnScroll,
          coverVisible = _this$getPropsWithEnv4.coverVisible,
          backdrop = _this$getPropsWithEnv4.backdrop,
          zIndex = _this$getPropsWithEnv4.zIndex,
          radius = _this$getPropsWithEnv4.radius,
          edge = _this$getPropsWithEnv4.edge,
          loop = _this$getPropsWithEnv4.loop;

      var _this$state5 = this.state,
          mounted = _this$state5.mounted,
          show = _this$state5.show,
          zoom = _this$state5.zoom,
          rotate = _this$state5.rotate,
          page = _this$state5.page,
          pageIsCover = _this$state5.pageIsCover,
          pageWithStep = _this$state5.pageWithStep;
      var statusValue = {
        show: show,
        zoom: zoom,
        rotate: rotate,
        page: page,
        pageIsCover: pageIsCover,
        pageWithStep: pageWithStep
      };

      var contextValue = Browser_objectSpread({
        // Internal
        coverRef: coverRef,
        coverPos: coverPos,
        outBrowsing: outBrowsing,
        // Data
        set: set,
        // Preset
        preset: preset,
        presetIsMobile: presetIsMobile,
        presetIsDesktop: presetIsDesktop,
        // Control
        controller: controller,
        hotKey: hotKey,
        animate: animate,
        // Styles & interactive
        hideOnScroll: hideOnScroll,
        coverVisible: coverVisible,
        backdrop: backdrop,
        radius: radius,
        edge: edge,
        loop: loop
      }, statusValue, {
        // Action
        toPage: this.handleToPage,
        toPrevPage: this.handleToPrevPage,
        toNextPage: this.handleToNextPage,
        toggleZoom: this.handleToggleZoom,
        toggleRotate: this.handleToggleRotate
      });

      return external_react_default.a.createElement(Context.Provider, {
        value: contextValue
      }, mounted && external_react_default.a.createElement(Portal_Portals, {
        id: "zmage",
        zIndex: zIndex,
        className: Browser_default.a.wrapperLayer
      }, external_react_default.a.createElement(Background_Background_Background, statusValue), external_react_default.a.createElement(Control_Control_Control, statusValue), external_react_default.a.createElement(Image_Image_Image, statusValue)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.browsing) {
        return Browser_objectSpread({
          mounted: true
        }, !prevState.show ? pageSet(nextProps.coverRef, nextProps.defaultPage, nextProps.set) : {});
      }

      return null;
    }
  }]);

  return Browser;
}(external_react_default.a.PureComponent);


Browser_Browser_Browser.contextType = Context;
Browser_Browser_Browser.defaultProps = {
  // Controlled status
  isBrowsingControlled: false,
  browsing: false,
  // Internal
  coverRef: external_react_default.a.createRef(),
  outBrowsing: function outBrowsing() {},
  // Data
  defaultPage: 0,
  set: []
};
// CONCATENATED MODULE: ./src/components/Browser/index.js

// CONCATENATED MODULE: ./src/Zmage.callee.js
function Zmage_callee_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Zmage_callee_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Zmage_callee_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Zmage_callee_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Zmage_callee_typeof = function _typeof(obj) { return typeof obj; }; } else { Zmage_callee_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Zmage_callee_typeof(obj); }

function Zmage_callee_extends() { Zmage_callee_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Zmage_callee_extends.apply(this, arguments); }

function Zmage_callee_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Zmage_callee_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Zmage_callee_createClass(Constructor, protoProps, staticProps) { if (protoProps) Zmage_callee_defineProperties(Constructor.prototype, protoProps); if (staticProps) Zmage_callee_defineProperties(Constructor, staticProps); return Constructor; }

function Zmage_callee_possibleConstructorReturn(self, call) { if (call && (Zmage_callee_typeof(call) === "object" || typeof call === "function")) { return call; } return Zmage_callee_assertThisInitialized(self); }

function Zmage_callee_getPrototypeOf(o) { Zmage_callee_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Zmage_callee_getPrototypeOf(o); }

function Zmage_callee_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Zmage_callee_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Zmage_callee_setPrototypeOf(subClass, superClass); }

function Zmage_callee_setPrototypeOf(o, p) { Zmage_callee_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Zmage_callee_setPrototypeOf(o, p); }

function Zmage_callee_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 命令式调用组件入口
 **/
// Libs

 // Components

 // Utils


 // 监听点击事件，函数调用模式下从鼠标位置打开图片
// https://github.com/ant-design/ant-design/blob/master/components/modal/Modal.tsx

var MOUSE_POSITION_CACHE = {
  x: 0,
  y: 0
};
var MOUSE_POSITION_CURRENT = {
  x: 0,
  y: 0
};

var getClickPosition = function getClickPosition(e) {
  MOUSE_POSITION_CURRENT = {
    x: e.clientX,
    y: e.clientY
  }; // 100ms 内发生过点击事件，则从点击位置动画展示, 否则直接 zoom 展示, 这样可以兼容非点击方式展开

  setTimeout(function () {
    return MOUSE_POSITION_CURRENT = {
      x: 0,
      y: 0
    };
  }, 100);
}; // 只有点击事件支持从鼠标位置动画展开


if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  document.documentElement.addEventListener('click', getClickPosition);
}

var Zmage_callee_ReactZmageCallee =
/*#__PURE__*/
function (_React$PureComponent) {
  Zmage_callee_inherits(ReactZmageCallee, _React$PureComponent);

  function ReactZmageCallee(props) {
    var _this;

    Zmage_callee_classCallCheck(this, ReactZmageCallee);

    _this = Zmage_callee_possibleConstructorReturn(this, Zmage_callee_getPrototypeOf(ReactZmageCallee).call(this, props));

    Zmage_callee_defineProperty(Zmage_callee_assertThisInitialized(_this), "outBrowsing", function () {
      var destroyer = _this.props.destroyer;

      _this.setState({
        browsing: false
      });

      setTimeout(destroyer, animationDuration);
    });

    _this.state = {
      browsing: true
    }; // 缓存打开位置

    MOUSE_POSITION_CACHE = MOUSE_POSITION_CURRENT;
    return _this;
  }

  Zmage_callee_createClass(ReactZmageCallee, [{
    key: "render",
    value: function render() {
      var _getConfigFromProps = default_getConfigFromProps(this.props),
          calleeProps = _getConfigFromProps.calleeProps,
          configProps = _getConfigFromProps.configProps;

      var internalBrowsing = this.state.browsing;
      var coverTarget = calleeProps.coverRef ? {
        coverRef: calleeProps.coverRef
      } : {
        coverPos: internalBrowsing ? MOUSE_POSITION_CURRENT : MOUSE_POSITION_CACHE
      };
      return external_react_default.a.createElement(Browser_Browser_Browser // Controlled status
      , Zmage_callee_extends({
        browsing: internalBrowsing // Internal

      }, coverTarget, {
        outBrowsing: this.outBrowsing // Config

      }, configProps));
    }
  }]);

  return ReactZmageCallee;
}(external_react_default.a.PureComponent); // 属性类型


Zmage_callee_ReactZmageCallee.propTypes = defType; // 属性默认值

Zmage_callee_ReactZmageCallee.defaultProps = default_defProp; // 弹窗对象

var RENDER = {
  REF: external_react_default.a.createRef(),
  CONTAINER: null,
  PORTAL: null
}; // 调用函数

var Zmage_callee_callee = function callee(_ref) {
  var coverRef = _ref.coverRef,
      props = Zmage_callee_objectWithoutProperties(_ref, ["coverRef"]);

  // Init env
  RENDER.PORTAL = document.createElement('div');
  RENDER.PORTAL.id = 'zmagePortal';
  RENDER.CONTAINER = document.body;
  RENDER.CONTAINER.appendChild(RENDER.PORTAL); // Mount target

  external_react_dom_default.a.render(external_react_default.a.createElement(Zmage_callee_ReactZmageCallee, Zmage_callee_extends({
    ref: RENDER.REF,
    coverRef: coverRef,
    destroyer: function destroyer() {
      return RENDER.CONTAINER.removeChild(RENDER.PORTAL);
    }
  }, props)), RENDER.PORTAL); // Return destroyer

  return RENDER.REF.current.outBrowsing;
};

/* harmony default export */ var Zmage_callee = (Zmage_callee_callee);
// CONCATENATED MODULE: ./src/Zmage.wrapper.js
function Zmage_wrapper_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Zmage_wrapper_typeof = function _typeof(obj) { return typeof obj; }; } else { Zmage_wrapper_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Zmage_wrapper_typeof(obj); }

function Zmage_wrapper_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Zmage_wrapper_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Zmage_wrapper_ownKeys(Object(source), true).forEach(function (key) { Zmage_wrapper_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Zmage_wrapper_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Zmage_wrapper_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Zmage_wrapper_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Zmage_wrapper_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Zmage_wrapper_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Zmage_wrapper_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Zmage_wrapper_createClass(Constructor, protoProps, staticProps) { if (protoProps) Zmage_wrapper_defineProperties(Constructor.prototype, protoProps); if (staticProps) Zmage_wrapper_defineProperties(Constructor, staticProps); return Constructor; }

function Zmage_wrapper_possibleConstructorReturn(self, call) { if (call && (Zmage_wrapper_typeof(call) === "object" || typeof call === "function")) { return call; } return Zmage_wrapper_assertThisInitialized(self); }

function Zmage_wrapper_getPrototypeOf(o) { Zmage_wrapper_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Zmage_wrapper_getPrototypeOf(o); }

function Zmage_wrapper_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Zmage_wrapper_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Zmage_wrapper_setPrototypeOf(subClass, superClass); }

function Zmage_wrapper_setPrototypeOf(o, p) { Zmage_wrapper_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Zmage_wrapper_setPrototypeOf(o, p); }

function Zmage_wrapper_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * HTML渲染容器组件入口
 **/
// Libs
 // Components

 // Utils



var Zmage_wrapper_ReactZmageWrapper =
/*#__PURE__*/
function (_React$PureComponent) {
  Zmage_wrapper_inherits(ReactZmageWrapper, _React$PureComponent);

  function ReactZmageWrapper(props) {
    var _this;

    Zmage_wrapper_classCallCheck(this, ReactZmageWrapper);

    _this = Zmage_wrapper_possibleConstructorReturn(this, Zmage_wrapper_getPrototypeOf(ReactZmageWrapper).call(this, props));

    Zmage_wrapper_defineProperty(Zmage_wrapper_assertThisInitialized(_this), "attachBrowserToImage", function () {
      var _this$props = _this.props,
          children = _this$props.children,
          restProps = Zmage_wrapper_objectWithoutProperties(_this$props, ["children"]);

      if (_this.contentRef.current) {
        _this.contentRef.current.querySelectorAll('img').forEach(function (item) {
          if (!item.getAttribute('zmage') && item.getAttribute('src')) {
            item.style.cursor = 'zoom-in';
            item.setAttribute('zmage', Date.now());
            item.addEventListener('click', function () {
              return Zmage_callee(Zmage_wrapper_objectSpread({}, restProps, {
                coverRef: {
                  current: item
                },
                src: item.getAttribute('src')
              }));
            });
          }
        });
      }
    });

    _this.contentRef = external_react_default.a.createRef();
    return _this;
  }

  Zmage_wrapper_createClass(ReactZmageWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window['__ZMAGE_BROWSER__'] = Zmage_callee;
      this.attachBrowserToImage();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      this.attachBrowserToImage();
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return external_react_default.a.createElement("div", {
        ref: this.contentRef
      }, children);
    }
  }]);

  return ReactZmageWrapper;
}(external_react_default.a.PureComponent); // 属性类型


Zmage_wrapper_ReactZmageWrapper.propTypes = defType; // 属性默认值

Zmage_wrapper_ReactZmageWrapper.defaultProps = default_defProp;
/* harmony default export */ var Zmage_wrapper = (Zmage_wrapper_ReactZmageWrapper);
// CONCATENATED MODULE: ./src/Zmage.js
function Zmage_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Zmage_typeof = function _typeof(obj) { return typeof obj; }; } else { Zmage_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Zmage_typeof(obj); }

function Zmage_extends() { Zmage_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Zmage_extends.apply(this, arguments); }

function Zmage_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Zmage_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Zmage_ownKeys(Object(source), true).forEach(function (key) { Zmage_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Zmage_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Zmage_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Zmage_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Zmage_createClass(Constructor, protoProps, staticProps) { if (protoProps) Zmage_defineProperties(Constructor.prototype, protoProps); if (staticProps) Zmage_defineProperties(Constructor, staticProps); return Constructor; }

function Zmage_possibleConstructorReturn(self, call) { if (call && (Zmage_typeof(call) === "object" || typeof call === "function")) { return call; } return Zmage_assertThisInitialized(self); }

function Zmage_getPrototypeOf(o) { Zmage_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Zmage_getPrototypeOf(o); }

function Zmage_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Zmage_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Zmage_setPrototypeOf(subClass, superClass); }

function Zmage_setPrototypeOf(o, p) { Zmage_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Zmage_setPrototypeOf(o, p); }

function Zmage_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 常规组件入口
 **/
// Libs
 // Components



 // Utils

 // 基础组件

var Zmage_ReactZmage =
/*#__PURE__*/
function (_React$PureComponent) {
  Zmage_inherits(ReactZmage, _React$PureComponent);

  function ReactZmage(props) {
    var _this;

    Zmage_classCallCheck(this, ReactZmage);

    _this = Zmage_possibleConstructorReturn(this, Zmage_getPrototypeOf(ReactZmage).call(this, props));

    Zmage_defineProperty(Zmage_assertThisInitialized(_this), "inBrowsing", function () {
      if (_this.isBrowsingControlled) {
        _this.props.onBrowsing(true);
      } else {
        _this.setState({
          browsing: true
        });
      }
    });

    Zmage_defineProperty(Zmage_assertThisInitialized(_this), "outBrowsing", function () {
      if (_this.isBrowsingControlled) {
        _this.props.onBrowsing(false);
      } else {
        _this.setState({
          browsing: false
        });
      }
    });

    _this.coverRef = external_react_default.a.createRef();
    _this.isBrowsingControlled = _this.props.hasOwnProperty('browsing');
    _this.state = {
      // 浏览
      browsing: false
    }; // TODO:FEATURE 按钮颜色配置
    // TODO:FEATURE 移动端的拖拽翻页
    // TODO:ENHANCE 禁用移动端的滑动退出
    // FIXME: Safari 全屏模式下无法锁定滚动

    return _this;
  }
  /* 切换查看状态 */


  Zmage_createClass(ReactZmage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _getConfigFromProps = default_getConfigFromProps(this.props),
          coverProps = _getConfigFromProps.coverProps,
          stateProps = _getConfigFromProps.stateProps,
          configProps = _getConfigFromProps.configProps,
          restProps = _getConfigFromProps.restProps;

      var internalBrowsing = this.state.browsing;
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("img", Zmage_extends({
        className: coverProps.className,
        style: Zmage_objectSpread({
          cursor: 'zoom-in'
        }, coverProps.style),
        src: coverProps.src,
        alt: coverProps.alt,
        onClick: function onClick(e) {
          _this2.inBrowsing();

          typeof coverProps.onClick === "function" && coverProps.onClick(e);
        },
        ref: function ref(_ref) {
          coverProps.forwardedRef && (coverProps.forwardedRef.current = _ref);
          _this2.coverRef && (_this2.coverRef.current = _ref);
        }
      }, restProps)), external_react_default.a.createElement(Browser_Browser_Browser // Controlled status
      , Zmage_extends({
        isBrowsingControlled: this.isBrowsingControlled,
        browsing: this.isBrowsingControlled ? stateProps.controlledBrowsing : internalBrowsing // Internal
        ,
        coverRef: this.coverRef,
        outBrowsing: this.outBrowsing // Config

      }, configProps)));
    }
  }]);

  return ReactZmage;
}(external_react_default.a.PureComponent); // 属性类型


Zmage_ReactZmage.propTypes = defType; // 属性默认值

Zmage_ReactZmage.defaultProps = default_defProp; // 常规组件

var forwardedReactZmage = external_react_default.a.forwardRef(function (props, ref) {
  return external_react_default.a.createElement(Zmage_ReactZmage, Zmage_extends({}, props, {
    forwardedRef: ref
  }));
}); // 命令式调用组件

forwardedReactZmage.browsing = Zmage_callee;
forwardedReactZmage.Browsing = Zmage_callee; // Alias browsing
// HTML转换容器

forwardedReactZmage.wrapper = Zmage_wrapper;
forwardedReactZmage.Wrapper = Zmage_wrapper; // Alias wrapper

/* harmony default export */ var Zmage = (forwardedReactZmage);
// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport default */__webpack_require__.d(__webpack_exports__, "default", function() { return Zmage; });


/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "lodash.memoize":
/*!*********************************!*\
  !*** external "lodash.memoize" ***!
  \*********************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("lodash.memoize");

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