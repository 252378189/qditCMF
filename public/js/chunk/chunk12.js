webpackJsonp([12],{

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(354)
}
var normalizeComponent = __webpack_require__(231)
/* script */
var __vue_script__ = __webpack_require__(356)
/* template */
var __vue_template__ = __webpack_require__(357)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
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
Component.options.__file = "resources/js/view/article/publish.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7fe1c90a", Component.options)
  } else {
    hotAPI.reload("data-v-7fe1c90a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 231:
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

/***/ 233:
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

var listToStyles = __webpack_require__(237)

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

/***/ 237:
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

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 列表页公共属性及方法
 *
 * @function handleSearch()                 // 点击搜索按钮
 * @function handleDel(url)                 // 删除数据
 * @function handleGetSelection()           // 返回复选框选中数据
 * @function handleDel(url)                 // 删除数据
 * @function handleDelMultiple(url,data)    // 删除多条数据
 */

var form_page = {
    data: function data() {
        return {
            loading: false,
            loading_msg: '数据获取中...'
        };
    },
    created: function created() {
        console.log('mixin-form_page');
    },

    methods: {
        /**
         * 返回所选数据，通常用于编辑页
         * @param callback
         * @returns {Promise<any>}
         */
        handleGetData: function handleGetData(callback) {
            var _this = this;

            this.loading = true;
            return new Promise(function (resolve, reject) {
                callback.then(function (res) {
                    _this.loading = false;
                    resolve(res.data);
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                    _this.loading = false;
                });
            });
        },


        /**
         * 验证表单数据
         * @param formName  表单名
         * @returns {*}
         */
        handleValid: function handleValid() {
            var formName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'form';

            var res = null;
            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    res = true;
                } else {
                    console.log('error submit!!');
                    res = false;
                }
            });
            return res;
        },


        /**
         * 提交表单数据
         * @param callback 回调函数
         */
        handleSubmit: function handleSubmit(callback) {
            var _this2 = this;

            this.loading = true;
            callback.then(function (res) {
                _this2.loading = false;
                _this2.$message.success(res.data.msg);
                _this2.$emit('render');
                _this2.close();
            }).catch(function (error) {
                console.log(error);
                _this2.loading = false;
                _this2.$message.error('操作失败');
                _this2.close();
            });
        },


        /**
         * 向父组件提交关闭事件
         */
        close: function close() {
            this.$emit('close');
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (form_page);

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return article_add; });
/* unused harmony export siteMap */
/* unused harmony export clean */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return article_get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return article_edit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return article_del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return template_del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return template_add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return template_get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return template_edit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return template_getList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return category_List; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return category_del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return category_add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return category_edit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return recovery_article; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return recovery_del; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


/**
 * 添加文章
 *
 * @param data
 * @returns {*}
 */
var article_add = function article_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article',
        data: data,
        method: 'post'
    });
};

/**
 * 网站地图
 *
 * @returns {*}
 */
var siteMap = function siteMap() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/siteMap',
        method: 'get'
    });
};

/**
 * 清除文章缓存
 *
 * @returns {*}
 */
var clean = function clean() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/clean',
        method: 'get'
    });
};

/**
 * 获取文章数据
 *
 * @param id
 * @returns {*}
 */
var article_get = function article_get(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/' + id,
        method: 'get'
    });
};

/**
 * 修改文章数据
 *
 * @param id
 * @param data
 * @returns {*}
 */
var article_edit = function article_edit(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/' + id,
        data: data,
        method: 'put'
    });
};

/**
 * 删除文章
 *
 * @param id
 * @returns {*}
 */
var article_del = function article_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/' + id,
        method: 'delete'
    });
};

/**
 * 模板删除
 *
 * @param id
 * @returns {*}
 */
var template_del = function template_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/' + id,
        method: 'delete'
    });
};

/**
 *
 * 模板添加
 *
 * @param data
 * @returns {*}
 */
var template_add = function template_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template',
        data: data,
        method: 'post'
    });
};

/**
 * 获得模板数据
 *
 * @param id
 * @returns {*}
 */
var template_get = function template_get(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/' + id,
        method: 'get'
    });
};

/**
 * 修改模板数据
 * @param id
 * @param data
 * @returns {*}
 */
var template_edit = function template_edit(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/' + id,
        data: data,
        method: 'put'
    });
};

/**
 *  模板列表
 *
 * @returns {*}
 */
var template_getList = function template_getList() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template',
        method: 'get'
    });
};

/**
 * 分类列表
 *
 * @returns {*}
 */
var category_List = function category_List() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category',
        method: 'get'
    });
};

/**
 * 删除分类
 *
 * @param id
 * @returns {*}
 */
var category_del = function category_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category/' + id,
        method: 'delete'
    });
};

/**
 * 分类添加
 *
 * @param data
 * @returns {*}
 */
var category_add = function category_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category',
        data: data,
        method: 'post'
    });
};

/**
 * 分类修改
 *
 * @param data
 * @param id
 * @returns {*}
 */
var category_edit = function category_edit(data, id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category/' + id,
        data: data,
        method: 'put'
    });
};

/**
 * 回收文章
 *
 * @param id
 * @returns {*}
 */
var recovery_article = function recovery_article(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/recovery/' + id + '/recovery',
        method: 'get'
    });
};

/**
 * 彻底删除文章
 *
 * @param id
 * @returns {*}
 */
var recovery_del = function recovery_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/recovery/' + id,
        method: 'delete'
    });
};

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(276)
}
var normalizeComponent = __webpack_require__(231)
/* script */
var __vue_script__ = __webpack_require__(278)
/* template */
var __vue_template__ = __webpack_require__(279)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
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
Component.options.__file = "resources/js/components/public/upload.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c61b4ac", Component.options)
  } else {
    hotAPI.reload("data-v-2c61b4ac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(277);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(233)("13676da3", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2c61b4ac\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./upload.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2c61b4ac\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./upload.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.avatar-uploader .el-upload {\n    border: 1px dashed #d9d9d9;\n    border-radius: 6px;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n}\n.avatar-uploader .el-upload:hover {\n    border-color: #409EFF;\n}\n.avatar-uploader-icon {\n    font-size: 28px;\n    color: #8c939d;\n    width: 100px;\n    height: 100px;\n    line-height: 100px;\n    text-align: center;\n}\n.avatar {\n    width: 100px;\n    height: 100px;\n    display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ 278:
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
            imageUrl: '',
            upload_url: "/api/upload",
            headers: {
                Authorization: 'Bearer ' + this.$store.state.user.token
            }
        };
    },

    props: ['img'],
    created: function created() {
        this.imageUrl = this.img;
    },
    watch: {
        img: function img(old) {
            this.imageUrl = old;
        }
    },
    methods: {
        handleAvatarSuccess: function handleAvatarSuccess(response, file, fileList) {
            console.log(response, file, fileList);
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$emit('img-success', response.url);
        },
        beforeAvatarUpload: function beforeAvatarUpload(file) {
            var isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        }
    }
});

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-upload",
    {
      staticClass: "avatar-uploader",
      attrs: {
        action: _vm.upload_url,
        headers: _vm.headers,
        "show-file-list": false,
        "on-success": _vm.handleAvatarSuccess,
        "before-upload": _vm.beforeAvatarUpload
      }
    },
    [
      _vm.imageUrl
        ? _c("img", { staticClass: "avatar", attrs: { src: _vm.imageUrl } })
        : _c("i", { staticClass: "el-icon-plus avatar-uploader-icon" })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2c61b4ac", module.exports)
  }
}

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 加载层
 *
 * @function openFullScreenLoading()        // 开启全屏加载层
 * @function closeFullScreenLoading()       // 关闭全屏加载层
 */

var loading = {
    data: function data() {
        return {
            FullScreenLoading: null,
            FullScreenLoadingMassage: '数据加载中...',
            FullScreenLoadingBackground: 'rgba(0, 0, 0, 0.7)'
        };
    },
    created: function created() {
        console.log('mixin-loading');
    },

    methods: {
        openFullScreenLoading: function openFullScreenLoading() {
            this.FullscreenLoading = this.$loading({
                lock: true,
                text: this.FullScreenLoadingMassage,
                spinner: 'el-icon-loading',
                background: this.FullScreenLoadingBackground
            });
        },
        closeFullScreenLoading: function closeFullScreenLoading() {
            this.FullscreenLoading.close();
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (loading);

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

module.exports=__webpack_require__(291)

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(231)
/* script */
var __vue_script__ = __webpack_require__(292)
/* template */
var __vue_template__ = __webpack_require__(293)
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

/***/ 292:
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

/***/ 293:
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

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(355);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(233)("4fc32902", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7fe1c90a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./publish.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7fe1c90a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./publish.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.left {\n    float: left;\n    width: 65%;\n}\n.right {\n    width: 30%;\n    float: right;\n}\n.edui-editor {\n    width: 100% !important;\n}\n.edui-editor-iframeholder {\n    width: 100% !important;\n}\n.text {\n    font-size: 14px;\n}\n.item {\n    margin-bottom: 18px;\n}\n.clearfix:before,\n.clearfix:after {\n    display: table;\n    content: \"\";\n}\n.clearfix:after {\n    clear: both\n}\n.box-card {\n    width: 480px;\n}\n", ""]);

// exports


/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_form_page__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_public_upload__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_public_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_public_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_article__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_loading__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_ueditor_wrap__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_ueditor_wrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_ueditor_wrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(48);
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
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_form_page__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_loading__["a" /* default */]],
    name: "publish",
    data: function data() {
        return {
            activeName: 'first',
            articleForm: {
                cover: '', //文章封面
                title: '', //文章标题
                desc: '', //文章描述
                content: '', //文章内容
                keyword: '', //文章关键字
                recommend: "0",
                top: "0",
                template_id: 1, //模板Id
                c_id: [] //文章分类
            },
            rules: {
                title: [{ required: true, message: '文章标题为必填项目', trigger: 'blur' }],
                content: [{ required: true, message: '文章内容为必填项目', trigger: 'blur' }]
            },
            options: [],
            Ueconfig: __WEBPACK_IMPORTED_MODULE_5__config__["a" /* default */].Ueconfig,
            templateOption: []
        };
    },
    created: function created() {
        var _this = this;

        //获得分类列表
        Object(__WEBPACK_IMPORTED_MODULE_2__api_article__["e" /* category_List */])().then(function (response) {
            _this.options = response.data.data;
        });
        Object(__WEBPACK_IMPORTED_MODULE_2__api_article__["o" /* template_getList */])().then(function (response) {
            _this.templateOption = response.data.data;
        });
    },

    methods: {
        onSubmit: function onSubmit(articleForm) {
            var _this2 = this;

            if (this.articleForm.c_id.length == 0) {
                this.$message.error('请选择一个文章分类');
                return false;
            }
            if (this.handleValid(articleForm)) {
                Object(__WEBPACK_IMPORTED_MODULE_2__api_article__["a" /* article_add */])(this.articleForm).then(function (response) {
                    _this2.$message.success('文章发布成功');
                    _this2.$router.push('/article_list');
                });
            }
        },
        success: function success(value) {
            this.articleForm.cover = value;
        }
    },
    components: {
        upload: __WEBPACK_IMPORTED_MODULE_1__components_public_upload___default.a, VueUeditorWrap: __WEBPACK_IMPORTED_MODULE_4_vue_ueditor_wrap___default.a
    }

});

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "left", staticStyle: { width: "65%" } },
      [
        _c(
          "el-form",
          {
            ref: "articleForm",
            staticClass: "demo-ruleForm",
            attrs: {
              model: _vm.articleForm,
              rules: _vm.rules,
              "label-width": "100px"
            }
          },
          [
            _c(
              "el-form-item",
              { attrs: { label: "文章标题", prop: "title" } },
              [
                _c("el-input", {
                  model: {
                    value: _vm.articleForm.title,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "title", $$v)
                    },
                    expression: "articleForm.title"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "文章内容", prop: "content" } },
              [
                _c("vue-ueditor-wrap", {
                  attrs: { config: _vm.Ueconfig },
                  model: {
                    value: _vm.articleForm.content,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "content", $$v)
                    },
                    expression: "articleForm.content"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "文章描述", prop: "desc" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "文章描述" },
                  model: {
                    value: _vm.articleForm.desc,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "desc", $$v)
                    },
                    expression: "articleForm.desc"
                  }
                })
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
      "div",
      { staticClass: "right" },
      [
        _c(
          "el-card",
          { staticClass: "box-card" },
          [
            _c(
              "div",
              {
                staticClass: "clearfix",
                attrs: { slot: "header" },
                slot: "header"
              },
              [_c("span", [_vm._v("其他选项")])]
            ),
            _vm._v(" "),
            _c(
              "p",
              [
                _c(
                  "span",
                  { staticStyle: { "font-size": "12px", color: "#606266" } },
                  [_vm._v("文章分类")]
                ),
                _vm._v("  \n                "),
                _c("el-cascader", {
                  attrs: {
                    size: "small",
                    "expand-trigger": "click",
                    options: _vm.options,
                    placeholder: "发表文章需要选择一个分类"
                  },
                  model: {
                    value: _vm.articleForm.c_id,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "c_id", $$v)
                    },
                    expression: "articleForm.c_id"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticStyle: {
                  "margin-top": "10px",
                  "font-size": "12px",
                  color: "#606266"
                }
              },
              [
                _c(
                  "div",
                  { staticStyle: { float: "left", "margin-right": "15px" } },
                  [_vm._v("文章封面")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticStyle: { float: "left" } },
                  [
                    _c("upload", {
                      attrs: { img: _vm.articleForm.cover },
                      on: { "img-success": _vm.success }
                    })
                  ],
                  1
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticStyle: { clear: "both" } }),
            _vm._v(" "),
            _c("div", { staticStyle: { "margin-top": "15px" } }, [
              _c(
                "div",
                {
                  staticStyle: {
                    "font-size": "12px",
                    color: "#606266",
                    float: "left",
                    "margin-right": "15px"
                  }
                },
                [_vm._v("\n                    关键字\n                ")]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticStyle: { float: "left", width: "85%" } },
                [
                  _c("el-input", {
                    attrs: { size: "small", placeholder: "关键字已逗号隔开" },
                    model: {
                      value: _vm.articleForm.keyword,
                      callback: function($$v) {
                        _vm.$set(_vm.articleForm, "keyword", $$v)
                      },
                      expression: "articleForm.keyword"
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticStyle: { clear: "both" } }),
            _vm._v(" "),
            _c(
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
                  { attrs: { label: "选项配置", name: "first" } },
                  [
                    _c(
                      "p",
                      [
                        _c(
                          "el-checkbox",
                          {
                            attrs: { "true-label": "1", "false-label": "0" },
                            model: {
                              value: _vm.articleForm.top,
                              callback: function($$v) {
                                _vm.$set(_vm.articleForm, "top", $$v)
                              },
                              expression: "articleForm.top"
                            }
                          },
                          [_vm._v("文章置顶")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-checkbox",
                          {
                            attrs: { "true-label": "1", "false-label": "0" },
                            model: {
                              value: _vm.articleForm.recommend,
                              callback: function($$v) {
                                _vm.$set(_vm.articleForm, "recommend", $$v)
                              },
                              expression: "articleForm.recommend"
                            }
                          },
                          [_vm._v(" 文章推荐\n                        ")]
                        )
                      ],
                      1
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "el-tab-pane",
                  { attrs: { label: "选择模板", name: "second" } },
                  [
                    _c(
                      "el-select",
                      {
                        attrs: { placeholder: "请选择" },
                        model: {
                          value: _vm.articleForm.template_id,
                          callback: function($$v) {
                            _vm.$set(_vm.articleForm, "template_id", $$v)
                          },
                          expression: "articleForm.template_id"
                        }
                      },
                      _vm._l(_vm.templateOption, function(item) {
                        return _c("el-option", {
                          key: item.value,
                          attrs: { label: item.label, value: item.value }
                        })
                      }),
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
              "p",
              { staticStyle: { "margin-top": "10px" } },
              [
                _c(
                  "el-button",
                  {
                    attrs: { type: "primary" },
                    on: {
                      click: function($event) {
                        return _vm.onSubmit("articleForm")
                      }
                    }
                  },
                  [_vm._v("立即发表")]
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
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7fe1c90a", module.exports)
  }
}

/***/ })

});