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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/public/scripts/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(21),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/ralphy/public_html/vdisc-library/public/scripts/src/Components/icon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] icon.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-308538be", Component.options)
  } else {
    hotAPI.reload("data-v-308538be", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(29)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(26)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(19),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-180a01d9",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/ralphy/public_html/vdisc-library/public/scripts/src/Components/thumbnail-item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] thumbnail-item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-180a01d9", Component.options)
  } else {
    hotAPI.reload("data-v-180a01d9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  null,
  /* template */
  __webpack_require__(23),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/ralphy/public_html/vdisc-library/public/scripts/src/Components/card.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] card.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c0353d5", Component.options)
  } else {
    hotAPI.reload("data-v-5c0353d5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(25),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/ralphy/public_html/vdisc-library/public/scripts/src/Components/form-search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] form-search.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a1a113c8", Component.options)
  } else {
    hotAPI.reload("data-v-a1a113c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(22),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/ralphy/public_html/vdisc-library/public/scripts/src/Components/links.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] links.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5445d578", Component.options)
  } else {
    hotAPI.reload("data-v-5445d578", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(20),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-220f79e4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/ralphy/public_html/vdisc-library/public/scripts/src/Components/thumbnail-list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] thumbnail-list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-220f79e4", Component.options)
  } else {
    hotAPI.reload("data-v-220f79e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(28)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(24),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9354ff3a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/ralphy/public_html/vdisc-library/public/scripts/src/Components/title.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] title.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9354ff3a", Component.options)
  } else {
    hotAPI.reload("data-v-9354ff3a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\nfigure.thumbnail img[data-v-180a01d9] {\n    width: 10em;\n}\nfigure.thumbnail figcaption[data-v-180a01d9] {\n    font-size: 0.75em;\n}\nfigure.thumbnail[data-v-180a01d9] {\n    margin: 0.15em 0.15em;\n    text-align: center;\n    width: 12em;\n    border: solid thin rgba(0, 0, 0, 0.4);\n    box-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.25);\n    background-color: #c0c0c0;\n}\nfigure[data-v-180a01d9]:hover {\n    transition: filter 0.5s;\n    filter: brightness(115%);\n}\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\np.no-item[data-v-220f79e4] {\n    color: rgb(128, 128, 128);\n    font-style: italic;\n}\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.title.blue[data-v-9354ff3a] {\n    background-color: rgba(0, 0, 128, 0.75);\n    border: solid thin rgb(0, 0, 96);\n    color: #DDDDFF;\n    text-shadow: 0 0 0.2em rgba(128, 128, 255, 1), 0.15em 0.15em 0.25em rgba(0, 0, 255, 1);\n}\n.title.purple[data-v-9354ff3a] {\n    background-color: rgba(128, 0, 128, 0.75);\n    border: solid thin rgb(96, 0, 96);\n    color: #FFDDFF;\n    text-shadow: 0 0 0.2em rgba(255, 128, 255, 1), 0.15em 0.15em 0.25em rgba(255, 0, 255, 1);\n}\n.title.red[data-v-9354ff3a] {\n    background-color: rgba(128, 0, 0, 0.75);\n    border: solid thin rgb(96, 0, 0);\n    color: #FFDDDD;\n    text-shadow: 0 0 0.2em rgba(255, 128, 128, 1), 0.15em 0.15em 0.25em rgba(255, 0, 0, 1);\n}\n.title.green[data-v-9354ff3a] {\n    background-color: rgba(0, 128, 0, 0.75);\n    border: solid thin rgb(0, 96, 0);\n    color: #DDFFDD;\n    text-shadow: 0 0 0.2em rgba(128, 255, 128, 1), 0.15em 0.15em 0.25em rgba(0, 255, 0, 1);\n}\n\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

	/* harmony default export */ __webpack_exports__["default"] = ({
		props: [
			'defSearch',
            'defDelay',
            'defMinChars'
        ],
        mounted: function() {
			this.id = 'uid-' + this._uid;
        },
		data: function() {
			return {
				list: [],
				search: this.defSearch || '',
                delay: this.defDelay || 500,
                minChars: this.defMinChars || 3,
                _hTimeOut: 0,
                id: -1,

                onSuggest: null,
                onSearch: null,
			};
		},
        methods: {
			inputHandler: function(oEvent) {
				if (this._hTimeOut) {
					clearTimeout(this._hTimeOut);
                }
				this._hTimeOut = setTimeout(this.goSuggest.bind(this), this.delay);
            },

			/**
             * Lancer la recherche immédiatement
			 * @param oEvent
			 */
			submitHandler: function(oEvent) {
				oEvent.preventDefault();
				this.goSearch();
            },

			goSuggest: function() {
			    console.log('suggest', this.search);
				if (this.search.length >= this.minChars) {
					if (this.onSuggest) {
						this.onSuggest(this.search);
                    }
				}
			},

            goSearch: function() {
                if (this.onSearch) {
                    this.onSearch(this.search);
                }
            }
        }
	});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

	/* harmony default export */ __webpack_exports__["default"] = ({
		props: ['defIcon'],
		data: function() {
			return {
                icon: this.defIcon
			};
		}
	});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__icon_vue__);
//
//
//
//
//
//
//
//
//

	
    /* harmony default export */ __webpack_exports__["default"] = ({
		props: {
			'defItems': {
				type: Array
			}
		},
        data: function() {
			return {
				items: this.defItems.map(function(i, id) {
					let oOutput = {
						caption: '',
                        icon: '',
                        id: ''
                    };
					if (typeof i === 'object') {
						oOutput.caption = i.caption || '';
						oOutput.icon = i.icon || '';
						oOutput.id = i.id || ('id-' + id);
                    } else {
						oOutput.caption = i;
						oOutput.icon = '';
						oOutput.id = 'id-' + id;
                    }
					return oOutput;
                }),

                onClick: null
			};
		},
        methods: {
			clickHandler: function(item) {
                if (this.onClick) {
					this.onClick(item);
                }
            }
        },
        components: {
			'vue-icon': __WEBPACK_IMPORTED_MODULE_0__icon_vue___default.a
        }
	});


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

    /* harmony default export */ __webpack_exports__["default"] = ({
    	props: ['defCaption', 'defSource', 'defId'],
        data: function() {
    		return {
    			id: this.defId,
    			source: this.defSource,
                caption: this.defCaption
            };
        },
        methods: {
    		clickHandler: function() {
				this.$emit('item-select', {id: this.id});
            }
        }
    });


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thumbnail_item_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thumbnail_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__thumbnail_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//

	
	
	/* harmony default export */ __webpack_exports__["default"] = ({
		props: ['defTitle'],
        components: {
			'vue-thumbnail-item': __WEBPACK_IMPORTED_MODULE_0__thumbnail_item_vue___default.a,
			'vue-icon': __WEBPACK_IMPORTED_MODULE_1__icon_vue___default.a
		},
		data: function() {
			return {
				title: this.defTitle,
				items: [],
                onSelect: null,
			};
		},
        methods: {
			selectHandler: function(item) {
                if (this.onSelect) {
                	this.onSelect(item.id);
                }
            }
        }
	});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['defColor', 'defCaption'],
	data: function() {
		return {
			color: this.defColor,
			caption: this.defCaption
		};
	}
});



/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('figure', {
    staticClass: "thumbnail",
    on: {
      "click": _vm.clickHandler
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.source
    }
  }), _vm._v(" "), _c('figcaption', [_vm._v(_vm._s(_vm.caption))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-180a01d9", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('h4', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('nav', [_c('ul', [_vm._l((_vm.items), function(item) {
    return _c('li', [_c('vue-thumbnail-item', {
      key: item.id,
      attrs: {
        "def-caption": item.caption,
        "def-source": item.source,
        "def-id": item.id
      },
      on: {
        "item-select": function($event) {
          _vm.selectHandler(item)
        }
      }
    })], 1)
  }), _vm._v(" "), (_vm.items.length == 0) ? _c('p', {
    staticClass: "no-item"
  }, [_c('vue-icon', {
    attrs: {
      "def-icon": "magnify"
    }
  }), _vm._v(" Pas d'élément.")], 1) : _vm._e()], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-220f79e4", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    class: 'mdi mdi-' + _vm.defIcon
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-308538be", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', [_c('ul', _vm._l((_vm.items), function(item) {
    return _c('li', [_c('button', {
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.clickHandler(item)
        }
      }
    }, [(item.icon) ? _c('vue-icon', {
      attrs: {
        "def-icon": item.icon
      }
    }) : _vm._e(), _vm._v(" " + _vm._s(item.caption))], 1)])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5445d578", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col lg-12"
  }, [_c('section', {
    staticClass: "card"
  }, [_vm._t("default")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5c0353d5", module.exports)
  }
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h3', {
    class: ['title', _vm.color]
  }, [_vm._v(_vm._s(_vm.caption))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9354ff3a", module.exports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    on: {
      "submit": _vm.submitHandler
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.search),
      expression: "search"
    }],
    attrs: {
      "list": _vm.id + '-list',
      "name": "search",
      "type": "text",
      "placeholder": "Rechercher..."
    },
    domProps: {
      "value": 'search',
      "value": (_vm.search)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.search = $event.target.value
      }, _vm.inputHandler]
    }
  }), _vm._v(" "), _c('datalist', {
    attrs: {
      "id": _vm.id + '-list'
    }
  }, _vm._l((_vm.list), function(item) {
    return _c('option', {
      domProps: {
        "value": item
      }
    })
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a1a113c8", module.exports)
  }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("d797a40c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-180a01d9\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./thumbnail-item.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-180a01d9\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./thumbnail-item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("8c889bd4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-220f79e4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./thumbnail-list.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-220f79e4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./thumbnail-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("0547b8f2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9354ff3a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./title.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9354ff3a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./title.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Components_title_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Components_title_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Components_title_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_icon_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_icon_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Components_icon_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_links_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_links_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Components_links_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Components_thumbnail_item_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Components_thumbnail_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Components_thumbnail_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Components_thumbnail_list_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Components_thumbnail_list_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Components_thumbnail_list_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Components_card_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Components_card_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Components_card_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Components_form_search_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Components_form_search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Components_form_search_vue__);
/**
 * Created by ralphy on 20/05/17.
 */

//import Vue from './externals/Vue/vue.js';









function main () {

    const app = new Vue({
        el: '#application',
        components: {
			'vue-title': __WEBPACK_IMPORTED_MODULE_0__Components_title_vue___default.a,
			'vue-icon': __WEBPACK_IMPORTED_MODULE_1__Components_icon_vue___default.a,
			'vue-links': __WEBPACK_IMPORTED_MODULE_2__Components_links_vue___default.a,
			'vue-thumbnail-item': __WEBPACK_IMPORTED_MODULE_3__Components_thumbnail_item_vue___default.a,
			'vue-thumbnail-list': __WEBPACK_IMPORTED_MODULE_4__Components_thumbnail_list_vue___default.a,
			'vue-card': __WEBPACK_IMPORTED_MODULE_5__Components_card_vue___default.a,
			'vue-form-search': __WEBPACK_IMPORTED_MODULE_6__Components_form_search_vue___default.a
		},
		methods: {

			////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS //////
			////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS //////
			////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS //////

			/**
			 * When one clicks on a main menu option
			 * @param item
			 */
			mainMenuClick: function(item) {
				console.log('clicked on xxx', item.id);
			},

			/**
			 * When a suggestion is made from the search form
			 * @param req
			 */
			searchFormSuggest: function(req) {
				axios
					.get('/search/p/' + req.replace(/[^a-z0-9]+/gi, '-'))
					.then(res => {
						this.assignArray(this.$refs.searchForm.list, res.data);
					});
			},

			searchFormSearch: function(req) {
				axios.get('/search/s/' + req.replace(/[^a-z0-9]+/gi, '-')).then(res => {
					let $vb = this.$refs.videoBrowser;
					$vb.title = 'Résultats pour : ' + req;
					this.assignArray($vb.items, res.data.map(v => {
						return {
							id: v.id,
							caption: v.file.split('.').slice(0, 3).join(' '),
							source: '/thumbnails/default.jpg'
						};
					}));
				});
			},








			/**
			 * Assigns an array to a Component array, according to Vue array manipulation restrictions
			 * @param aArray {Array} component array
			 * @param aData {Array} array
			 */
			assignArray: function(aArray, aData) {
				aArray.splice(0, aArray.length);
				aData.forEach(x => aArray.push(x));
			},

        	init: function() {
				let self = this;
        		let $refs = this.$refs;

        		$refs.mainMenu.onClick = this.mainMenuClick.bind(this);
				$refs.searchForm.onSuggest = this.searchFormSuggest.bind(this);
				$refs.searchForm.onSearch = this.searchFormSearch.bind(this);

				$refs.videoBrowser.onSelect = function(item) {
					console.log('MAIN click on', item);
				};
			}
		}
    });

    window.Application = app;
    app.init();

}

window.addEventListener('load', main);

/***/ })
/******/ ]);