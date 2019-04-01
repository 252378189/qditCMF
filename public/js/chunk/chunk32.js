webpackJsonp([32],{

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(536)
}
var normalizeComponent = __webpack_require__(235)
/* script */
var __vue_script__ = __webpack_require__(538)
/* template */
var __vue_template__ = __webpack_require__(547)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-16b6fae2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/view/webSite/sitebase/siteBase.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16b6fae2", Component.options)
  } else {
    hotAPI.reload("data-v-16b6fae2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 235:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
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
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
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
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
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

/***/ 236:
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

var listToStyles = __webpack_require__(240)

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
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

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
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

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
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
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

/***/ 240:
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

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return menu_add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return menu_edit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return menu_detail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return config_get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return configUpdateOrCreate; });
/* unused harmony export config_add */
/* unused harmony export config_update */
/* unused harmony export patentDelete */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CopyRightDelete; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


var menu_add = function menu_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/menu/add',
        data: data,
        method: 'post'
    });
};
var menu_edit = function menu_edit(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/menu/edit',
        data: data,
        method: 'post'
    });
};
var menu_detail = function menu_detail(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/menu/' + id,
        method: 'get'
    });
};
var config_get = function config_get(keyword) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/config?keyword=' + keyword,
        method: 'get'
    });
};
var configUpdateOrCreate = function configUpdateOrCreate(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/config/updateOrCreate',
        data: data,
        method: 'post'
    });
};
var config_add = function config_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/config',
        data: data,
        method: 'post'
    });
};
var config_update = function config_update(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/config/' + id,
        data: data,
        method: 'put'
    });
};

/**
 * 专利查询记录删除
 *
 * @param id
 * @returns {*}
 */
var patentDelete = function patentDelete(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/patent/' + id,
        method: 'delete'
    });
};

/**
 * 专利查询记录删除
 * @param id
 * @returns {*}
 * @constructor
 */
var CopyRightDelete = function CopyRightDelete(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/CopyRight/' + id,
        method: 'delete'
    });
};

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

module.exports=__webpack_require__(295)

/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(235)
/* script */
var __vue_script__ = __webpack_require__(296)
/* template */
var __vue_template__ = __webpack_require__(297)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules/vue-ueditor-wrap/lib/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a64a0188", Component.options)
  } else {
    hotAPI.reload("data-v-a64a0188", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
//
//
//

// 一个简单的事件订阅发布的实现,取代原始Event对象,提升IE下的兼容性
var LoadEvent = function () {
  function LoadEvent() {
    _classCallCheck(this, LoadEvent);

    this.listeners = {};
  }

  _createClass(LoadEvent, [{
    key: 'on',
    value: function on(eventName, callback) {
      this.listeners[eventName] === undefined ? this.listeners[eventName] = [] : '';
      this.listeners[eventName].push(callback);
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      this.listeners[eventName] && this.listeners[eventName].forEach(function (callback) {
        return callback();
      });
    }
  }]);

  return LoadEvent;
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'VueUeditorWrap',
  data: function data() {
    return {
      id: 'editor' + Math.random().toString().slice(-10),
      editor: null,
      status: 0,
      initValue: '',
      defaultConfig: {
        UEDITOR_HOME_URL: './static/UEditor/',
        enableAutoSave: false
      }
    };
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    init: {
      type: Function,
      default: function _default() {
        return function () {};
      }
    },
    destroy: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    mixedConfig: function mixedConfig() {
      return Object.assign({}, this.defaultConfig, this.config);
    }
  },
  methods: {
    // 添加自定义按钮
    registerButton: function registerButton(_ref) {
      var name = _ref.name,
          icon = _ref.icon,
          tip = _ref.tip,
          handler = _ref.handler,
          _ref$UE = _ref.UE,
          UE = _ref$UE === undefined ? window.UE : _ref$UE;

      UE.registerUI(name, function (editor, name) {
        editor.registerCommand(name, {
          execCommand: function execCommand() {
            handler(editor, name);
          }
        });
        var btn = new UE.ui.Button({
          name: name,
          title: tip,
          cssRules: 'background-image: url(' + icon + ') !important;background-size: cover;',
          onclick: function onclick() {
            editor.execCommand(name);
          }
        });
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(name);
          if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
          } else {
            btn.setDisabled(false);
            btn.setChecked(state);
          }
        });
        return btn;
      });
    },
    // 实例化编辑器
    _initEditor: function _initEditor() {
      var _this = this;

      this.$nextTick(function () {
        _this.init();
        _this.editor = window.UE.getEditor(_this.id, _this.mixedConfig);
        _this.editor.addListener('ready', function () {
          _this.status = 2;
          _this.editor.setContent(_this.initValue);
          _this.$emit('ready', _this.editor);
          _this.editor.addListener('contentChange', function () {
            _this.$emit('input', _this.editor.getContent());
          });
        });
      });
    },

    // 检测依赖,确保 UEditor 资源文件已加载完毕
    _checkDependencies: function _checkDependencies() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        // 判断ueditor.config.js和ueditor.all.js是否均已加载(仅加载完ueditor.config.js时UE对象和UEDITOR_CONFIG对象存在,仅加载完ueditor.all.js时UEDITOR_CONFIG对象存在,但为空对象)
        var scriptsLoaded = !!window.UE && !!window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0 && !!window.UE.getEditor;
        if (scriptsLoaded) {
          resolve();
        } else if (window.loadEnv) {
          // 利用订阅发布，确保同时渲染多个组件时，不会重复创建script标签
          window.loadEnv.on('scriptsLoaded', function () {
            resolve();
          });
        } else {
          window.loadEnv = new LoadEvent();
          // 如果在其他地方只引用ueditor.all.min.js，在加载ueditor.config.js之后仍需要重新加载ueditor.all.min.js，所以必须确保ueditor.config.js已加载
          _this2._loadConfig().then(function () {
            return _this2._loadCore();
          }).then(function () {
            resolve();
            window.loadEnv.emit('scriptsLoaded');
          });
        }
      });
    },
    _loadConfig: function _loadConfig() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (window.UE && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0) {
          resolve();
          return;
        }
        var configScript = document.createElement('script');
        configScript.type = 'text/javascript';
        configScript.src = _this3.mixedConfig.UEDITOR_HOME_URL + 'ueditor.config.js';
        document.getElementsByTagName('head')[0].appendChild(configScript);
        configScript.onload = function () {
          if (window.UE && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0) {
            resolve();
          } else {
            console.error('加载ueditor.config.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!\n', configScript.src);
          }
        };
      });
    },
    _loadCore: function _loadCore() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (window.UE && window.UE.getEditor) {
          resolve();
          return;
        }
        var coreScript = document.createElement('script');
        coreScript.type = 'text/javascript';
        coreScript.src = _this4.mixedConfig.UEDITOR_HOME_URL + 'ueditor.all.min.js';
        document.getElementsByTagName('head')[0].appendChild(coreScript);
        coreScript.onload = function () {
          if (window.UE && window.UE.getEditor) {
            resolve();
          } else {
            console.error('加载ueditor.all.min.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!\n', coreScript.src);
          }
        };
      });
    },

    // 设置内容
    _setContent: function _setContent(value) {
      value === this.editor.getContent() || this.editor.setContent(value);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.destroy && this.editor && this.editor.destroy) this.editor.destroy();
  },

  // v-model语法糖实现
  watch: {
    value: {
      handler: function handler(value) {
        var _this5 = this;

        // 0: 尚未初始化 1: 开始初始化但尚未ready 2 初始化完成并已ready
        switch (this.status) {
          case 0:
            this.status = 1;
            this.initValue = value;
            this._checkDependencies().then(function () {
              return _this5._initEditor();
            });
            break;
          case 1:
            this.initValue = value;
            break;
          case 2:
            this._setContent(value);
            break;
          default:
            break;
        }
      },

      immediate: true
    }
  }
});

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("script", {
    attrs: { id: _vm.id, name: _vm.name, type: "text/plain" }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a64a0188", module.exports)
  }
}

/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(537);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(236)("753f23aa", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16b6fae2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./siteBase.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16b6fae2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./siteBase.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__siteInfo__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__siteInfo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__siteInfo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aBout__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aBout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__aBout__);
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
    name: "siteBase",
    components: { siteInfo: __WEBPACK_IMPORTED_MODULE_0__siteInfo___default.a, aBout: __WEBPACK_IMPORTED_MODULE_1__aBout___default.a },
    data: function data() {
        return {
            activeName: 'first'
        };
    }
});

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(235)
/* script */
var __vue_script__ = __webpack_require__(540)
/* template */
var __vue_template__ = __webpack_require__(541)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/view/webSite/sitebase/siteInfo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65dba9ec", Component.options)
  } else {
    hotAPI.reload("data-v-65dba9ec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);
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
    data: function data() {
        return {
            index: 1,
            formDynamic: {
                site_name: '',
                icp: '',
                qq: '',
                phone: '',
                postNum: '',
                tel: '',
                // desc:'',
                // site_keyword:'',
                keyword: 'sitebase',
                items: [{
                    index: 1,
                    address: '',
                    tel: '',
                    status: 1
                }],
                jsSlot: [{
                    code: ''
                }]
            },
            configID: 0,
            operation: ""
        };
    },

    created: function created() {
        var _this = this;

        __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].get('/config', { params: { keyword: 'sitebase' } }).then(function (response) {
            if (response.data.status) {
                _this.formDynamic = response.data.data;
                //有数据走修改逻辑
                _this.operation = 'edit';
            } else {
                //没数据走添加逻辑
                _this.operation = 'add';
            }
        });
    },
    methods: {
        handleAdd: function handleAdd() {
            this.index = this.formDynamic.items.length + 1;
            this.formDynamic.items.push({
                address: '',
                tel: '',
                index: this.index,
                status: 1
            });
        },
        JShandleAdd: function JShandleAdd() {
            this.formDynamic.jsSlot.push({
                code: ''
            });
            this.$set(this.formDynamic.jsSlot, this.formDynamic.jsSlot);
        },
        handleRemove: function handleRemove(index) {
            //   this.formDynamic.items[index].status = 0;
            this.formDynamic.items[index].status = 0;
            this.formDynamic.items.splice(index, 1);
        },
        JShandleRemove: function JShandleRemove(index) {
            var jsSlot = this.formDynamic.jsSlot.splice(index, 1);
            this.$set(this.formDynamic.jsSlot, jsSlot);
            console.log(index, jsSlot);
        },
        handleSubmit: function handleSubmit(name) {
            var _this2 = this;

            if (this.operation === 'edit') {
                __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].put('/config', {
                    keyword: this.formDynamic.keyword,
                    value: this.formDynamic,
                    type: 'json'
                }).then(function (response) {
                    _this2.$message.info(response.data.message);
                });
            } else {
                __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].post('/config', {
                    keyword: this.formDynamic.keyword,
                    value: this.formDynamic,
                    type: 'json'
                }).then(function (response) {
                    _this2.$message.info(response.data.message);
                });
            }
        }
    }
});

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticStyle: { width: "70%" } },
    [
      _c(
        "el-form",
        {
          ref: "formDynamic",
          attrs: { model: _vm.formDynamic, "label-width": "100px" }
        },
        [
          _c(
            "el-form-item",
            { attrs: { label: "网站名称:", prop: "title" } },
            [
              _c("el-input", {
                attrs: { placeholder: "输入网站名称" },
                model: {
                  value: _vm.formDynamic.site_name,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "site_name", $$v)
                  },
                  expression: "formDynamic.site_name"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "网站备案号:", prop: "icp" } },
            [
              _c("el-input", {
                attrs: { placeholder: "输入网站备案号" },
                model: {
                  value: _vm.formDynamic.icp,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "icp", $$v)
                  },
                  expression: "formDynamic.icp"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "联系电话:", prop: "phone" } },
            [
              _c("el-input", {
                attrs: { placeholder: "网站负责人联系电话" },
                model: {
                  value: _vm.formDynamic.phone,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "phone", $$v)
                  },
                  expression: "formDynamic.phone"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "服务热线:", prop: "tel" } },
            [
              _c("el-input", {
                attrs: { placeholder: "服务热线" },
                model: {
                  value: _vm.formDynamic.tel,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "tel", $$v)
                  },
                  expression: "formDynamic.tel"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "客服QQ:", prop: "qq" } },
            [
              _c("el-input", {
                attrs: { placeholder: "客服QQ" },
                model: {
                  value: _vm.formDynamic.qq,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "qq", $$v)
                  },
                  expression: "formDynamic.qq"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "邮编地址:", prop: "postNum" } },
            [
              _c("el-input", {
                attrs: { placeholder: "邮编地址" },
                model: {
                  value: _vm.formDynamic.postNum,
                  callback: function($$v) {
                    _vm.$set(_vm.formDynamic, "postNum", $$v)
                  },
                  expression: "formDynamic.postNum"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _vm._l(_vm.formDynamic.items, function(item, index) {
            return item.status
              ? [
                  _c(
                    "el-form-item",
                    { attrs: { label: "地址 " + (index + 1) } },
                    [
                      _c(
                        "el-row",
                        [
                          _c(
                            "el-col",
                            { attrs: { span: 18 } },
                            [
                              _c("el-input", {
                                attrs: { type: "text" },
                                model: {
                                  value: item.address,
                                  callback: function($$v) {
                                    _vm.$set(item, "address", $$v)
                                  },
                                  expression: "item.address"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-col",
                            { attrs: { span: 4, offset: 1 } },
                            [
                              _c(
                                "el-button",
                                {
                                  on: {
                                    click: function($event) {
                                      return _vm.handleRemove(index)
                                    }
                                  }
                                },
                                [_vm._v("移除")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "电话 " + (index + 1) } },
                    [
                      _c(
                        "el-row",
                        [
                          _c(
                            "el-col",
                            { attrs: { span: 18 } },
                            [
                              _c("el-input", {
                                attrs: { type: "text" },
                                model: {
                                  value: item.tel,
                                  callback: function($$v) {
                                    _vm.$set(item, "tel", $$v)
                                  },
                                  expression: "item.tel"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("el-col", { attrs: { span: 4, offset: 1 } })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ]
              : _vm._e()
          }),
          _vm._v(" "),
          _c(
            "el-form-item",
            [
              _c(
                "el-row",
                [
                  _c(
                    "el-col",
                    { attrs: { span: 12 } },
                    [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "dashed", long: "", icon: "md-add" },
                          on: { click: _vm.handleAdd }
                        },
                        [_vm._v("添加子项")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm._l(_vm.formDynamic.jsSlot, function(itemJS, indexJS) {
            return [
              _c(
                "el-form-item",
                {
                  key: indexJS,
                  attrs: { label: "JS代码插槽 " + (indexJS + 1) }
                },
                [
                  _c(
                    "el-row",
                    [
                      _c(
                        "el-col",
                        { attrs: { span: 18 } },
                        [
                          _c("el-input", {
                            attrs: { type: "text" },
                            model: {
                              value: itemJS.code,
                              callback: function($$v) {
                                _vm.$set(itemJS, "code", $$v)
                              },
                              expression: "itemJS.code"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { span: 4 } },
                        [
                          _c(
                            "el-button",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.JShandleRemove(indexJS)
                                }
                              }
                            },
                            [_vm._v("移除")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ]
          }),
          _vm._v(" "),
          _c(
            "el-form-item",
            [
              _c(
                "el-row",
                [
                  _c(
                    "el-col",
                    { attrs: { span: 12 } },
                    [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "dashed", long: "", icon: "md-add" },
                          on: { click: _vm.JShandleAdd }
                        },
                        [_vm._v("添加子项")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            [
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: {
                    click: function($event) {
                      return _vm.handleSubmit("formValidate")
                    }
                  }
                },
                [_vm._v("保存")]
              )
            ],
            1
          )
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-65dba9ec", module.exports)
  }
}

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(543)
}
var normalizeComponent = __webpack_require__(235)
/* script */
var __vue_script__ = __webpack_require__(545)
/* template */
var __vue_template__ = __webpack_require__(546)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-52bc3ee6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/view/webSite/sitebase/aBout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52bc3ee6", Component.options)
  } else {
    hotAPI.reload("data-v-52bc3ee6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(544);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(236)("f16f01c2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52bc3ee6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./aBout.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52bc3ee6\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./aBout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_ueditor_wrap__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_ueditor_wrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_ueditor_wrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_system__ = __webpack_require__(290);
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
    name: "aBout",
    components: {
        VueUeditorWrap: __WEBPACK_IMPORTED_MODULE_0_vue_ueditor_wrap___default.a
    },
    data: function data() {
        return {
            Ueconfig: __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].Ueconfig,
            configPost: {
                pid: 0,
                type: 'json',
                keyword: 'about',
                desc: '关于我们',
                value: {
                    content: ""
                }
            }
        };
    },
    created: function created() {
        var _this = this;

        Object(__WEBPACK_IMPORTED_MODULE_2__api_system__["c" /* config_get */])('about').then(function (response) {
            _this.configPost.value.content = response.data.data.content;
        });
    },

    methods: {
        submit: function submit() {
            var _this2 = this;

            Object(__WEBPACK_IMPORTED_MODULE_2__api_system__["b" /* configUpdateOrCreate */])(this.configPost).then(function (response) {
                _this2.$message.success(response.data.msg);
            });
        }
    }
});

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticStyle: { width: "45%" } },
      [
        _c("span", [_vm._v("介绍内容:")]),
        _vm._v(" "),
        _c("vue-ueditor-wrap", {
          attrs: { config: _vm.Ueconfig },
          model: {
            value: _vm.configPost.value.content,
            callback: function($$v) {
              _vm.$set(_vm.configPost.value, "content", $$v)
            },
            expression: "configPost.value.content"
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticStyle: { "margin-top": "45px" } },
      [
        _c(
          "el-button",
          { attrs: { type: "success" }, on: { click: _vm.submit } },
          [_vm._v("保存信息")]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-52bc3ee6", module.exports)
  }
}

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-tabs",
    {
      model: {
        value: _vm.activeName,
        callback: function($$v) {
          _vm.activeName = $$v
        },
        expression: "activeName"
      }
    },
    [
      _c(
        "el-tab-pane",
        { attrs: { label: "网站信息", name: "first", lazy: true } },
        [_c("siteInfo")],
        1
      ),
      _vm._v(" "),
      _c(
        "el-tab-pane",
        { attrs: { label: "关于我们", name: "second", lazy: true } },
        [_c("aBout")],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-16b6fae2", module.exports)
  }
}

/***/ })

});