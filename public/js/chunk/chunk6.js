webpackJsonp([6],{

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(490)
}
var normalizeComponent = __webpack_require__(231)
/* script */
var __vue_script__ = __webpack_require__(492)
/* template */
var __vue_template__ = __webpack_require__(503)
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
Component.options.__file = "resources/js/view/webSite/seo/seo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f1c8342a", Component.options)
  } else {
    hotAPI.reload("data-v-f1c8342a", Component.options)
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

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(247)
}
var normalizeComponent = __webpack_require__(231)
/* script */
var __vue_script__ = __webpack_require__(249)
/* template */
var __vue_template__ = __webpack_require__(260)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d8ddc71a"
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
Component.options.__file = "resources/js/components/public/table.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d8ddc71a", Component.options)
  } else {
    hotAPI.reload("data-v-d8ddc71a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(248);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(233)("1abf5e0a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d8ddc71a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d8ddc71a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.el-pagination[data-v-d8ddc71a]{\n    float: right;\n    margin-top: 8px;\n}\n", ""]);

// exports


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tools__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fold__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fold___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fold__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_axios__ = __webpack_require__(26);
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

// 引入tools



/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        url: String,
        columns: Array,
        page: {
            type: Boolean,
            default: true
        },
        checkbox: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            loading: false,
            data: null,
            selection: null,
            filterValue: {
                where: {},
                page: 1,
                limit: 10,
                search: '',
                orderBy: 'id,asc'
            },
            deleteFilter: [],
            total: 0
        };
    },

    components: { Tools: __WEBPACK_IMPORTED_MODULE_0__tools___default.a, Fold: __WEBPACK_IMPORTED_MODULE_1__fold___default.a },
    created: function created() {
        // 生成动态自定义列
        for (var x in this.columns) {
            if ('render' in this.columns[x]) {
                Vue.component('my-column-' + this.columns[x].prop, this.columns[x].render);
            }
        }
        // 展开列根据层级加上空格
        Vue.component('fold-prefix', {
            render: function render(createElement) {
                return createElement('span', { style: { paddingLeft: this.level * 2 + 'em' } });
            },
            props: { level: { type: Number, required: true } }
        });
        this.renderTable();
    },

    methods: {
        // 展开
        expanding: function expanding(row) {
            row.tree_fold = 'loading';
            this.$emit('children', row);
        },
        // 收起
        collapsing: function collapsing(row) {
            row.tree_fold = 'close';
            this.SetChildren(row, null);
        },
        // 监听Tool事件，抛出到上层处理
        Listeners: function Listeners(type, index, row) {
            this.$emit('tools', type, index, row);
        },
        // 表头筛选项
        filterHandler: function filterHandler(_filters) {
            for (var key in _filters) {
                if (_filters[key] == null || _filters[key].length == 0) {
                    delete this.filterValue.where[key];
                } else {
                    if (_filters[key].length == 1) {
                        this.filterValue.where[key] = _filters[key][0];
                    } else {
                        this.filterValue.where[key] = _filters[key];
                    }
                }
            }
            this.handelDeleteFilter();
            this.renderTable();
        },

        // 排序
        sortHandler: function sortHandler(obj) {
            if (obj.order == null) {
                this.filterValue.orderBy = null;
            } else {
                this.filterValue.orderBy = obj.prop + ',' + obj.order.slice(0, -6);
            }
            this.renderTable();
        },

        // 页数大小改变
        handleSizeChange: function handleSizeChange(pageSize) {
            this.filterValue.limit = pageSize;
            this.renderTable();
        },

        // 跳页
        handleCurrentChange: function handleCurrentChange(page) {
            this.filterValue.page = page;
            this.renderTable();
        },

        // 复选框操作
        handleSelectionChange: function handleSelectionChange(selection) {
            this.selection = selection;
            this.$emit('SelectionChange', selection);
        },

        // 重载表格数据
        renderTable: function renderTable() {
            var _this = this;

            this.loading = true;
            if (!this.page) {
                delete this.filterValue.page;
                delete this.filterValue.limit;
            }
            __WEBPACK_IMPORTED_MODULE_2__libs_axios__["a" /* default */].get(this.url, {
                params: this.filterValue
            }).then(function (res) {
                _this.total = res.data.count;
                _this.data = res.data.data;
                _this.loading = false;
            }).catch(function (error) {
                _this.loading = false;
                console.log(error);
            });
        },

        // 删除行
        deleteRow: function deleteRow(index) {
            this.data.splice(index, 1);
        },

        // 设置列表树子数据
        SetChildren: function SetChildren(row, children) {
            //this.handleSetTree(this.data,row.id,children);
            var path = row.tree_path;
            var data = this.data;
            for (var i = 0; i < path.length; i++) {
                if (i == 0) {
                    data = data[path[i]];
                } else {
                    data = data['tree_children'][path[i]];
                }
            }
            if (row.tree_fold == 'loading') {
                row.tree_fold = 'open';
            }
            this.$set(data, 'tree_fold', row.tree_fold);
            this.$set(data, 'tree_children', children);
        },


        /**
         * 欲删除的字段值
         */
        handelDeleteFilter: function handelDeleteFilter() {
            var _this2 = this;

            this.deleteFilter.forEach(function (item) {
                delete _this2.filterValue['where'][item];
            });
        }
    },
    computed: {
        // 根据树形结构渲染为list结构
        reversedData: function reversedData() {
            var data = this.data;
            data = getChildren(data, [], 0);
            return data;
        }
    }

    // 递归计算list结构
});function getChildren(data, path, level) {
    var field = 'tree_children';
    var return_data = [];
    for (var x in data) {
        data[x]['tree_level'] = level;
        path[level] = x;
        path.length = level + 1;
        data[x]['tree_path'] = path;
        var item = JSON.parse(JSON.stringify(data[x]));
        delete item[field];
        return_data.push(item);
        if (field in data[x]) {
            var children = getChildren(data[x][field], path, level + 1);
            return_data = return_data.concat(children);
        }
    }
    return return_data;
}

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(251)
}
var normalizeComponent = __webpack_require__(231)
/* script */
var __vue_script__ = __webpack_require__(253)
/* template */
var __vue_template__ = __webpack_require__(254)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1b504800"
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
Component.options.__file = "resources/js/components/public/tools.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b504800", Component.options)
  } else {
    hotAPI.reload("data-v-1b504800", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(252);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(233)("8e5acedc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1b504800\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tools.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1b504800\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tools.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 253:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "tools",
    props: ['row', 'index', 'buttons'],
    data: function data() {
        return {
            tooltip: { // tooltip默认显示字段
                add: '添加',
                show: '查看详情',
                edit: '编辑',
                delete: '删除'
            }
        };
    },

    methods: {
        handleTools: function handleTools(type) {
            this.$emit('listen-tools', type, this.index, this.row);
        }
    }
});

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-button-group",
    [
      _vm._l(_vm.buttons, function(val, key) {
        return [
          (val.text
          ? val.text
          : _vm.tooltip[key]
          ? _vm.tooltip[key]
          : false)
            ? [
                _c(
                  "el-tooltip",
                  {
                    staticClass: "item",
                    attrs: {
                      effect: "dark",
                      content: val.text ? val.text : _vm.tooltip[key],
                      placement: "bottom"
                    }
                  },
                  [
                    _c("el-button", {
                      attrs: { type: val.type, size: "mini", icon: val.icon },
                      on: {
                        click: function($event) {
                          return _vm.handleTools(key)
                        }
                      }
                    })
                  ],
                  1
                )
              ]
            : [
                _c("el-button", {
                  attrs: { type: val.type, size: "mini", icon: val.icon },
                  on: {
                    click: function($event) {
                      return _vm.handleTools(key)
                    }
                  }
                })
              ]
        ]
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1b504800", module.exports)
  }
}

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(256)
}
var normalizeComponent = __webpack_require__(231)
/* script */
var __vue_script__ = __webpack_require__(258)
/* template */
var __vue_template__ = __webpack_require__(259)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-11c2bb6c"
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
Component.options.__file = "resources/js/components/public/fold.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11c2bb6c", Component.options)
  } else {
    hotAPI.reload("data-v-11c2bb6c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(257);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(233)("592c1774", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-11c2bb6c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fold.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-11c2bb6c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fold.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "fold",
    props: {
        row: {
            type: Object
        },
        status: {
            default: 'close'
        }
    },
    data: function data() {
        return {
            state: this.status,
            className: {
                open: 'el-icon-caret-bottom',
                close: 'el-icon-caret-right',
                loading: 'el-icon-loading'
            }
        };
    },

    methods: {
        handleFold: function handleFold() {
            if (this.status == 'open') {
                this.$emit('collapsing', this.row); // 收起
            } else {
                this.state = 'loading';
                this.$emit('expanding', this.row); // 展开
            }
        }
    },
    watch: {
        status: function status(val) {
            this.state = val;
        }
    }
});

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("i", {
    class: _vm.className[this.state],
    staticStyle: { cursor: "pointer" },
    on: { click: _vm.handleFold }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-11c2bb6c", module.exports)
  }
}

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-table",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.loading,
              expression: "loading"
            }
          ],
          attrs: { border: "", data: _vm.reversedData, size: "mini" },
          on: {
            "filter-change": _vm.filterHandler,
            "sort-change": _vm.sortHandler,
            "selection-change": _vm.handleSelectionChange
          }
        },
        [
          _vm.checkbox
            ? _c("el-table-column", {
                attrs: { type: "selection", width: "55" }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.columns, function(item) {
            return [
              _c("el-table-column", {
                ref: "col-" + item.prop,
                refInFor: true,
                attrs: {
                  width: item.width ? item.width : null,
                  prop: item.prop,
                  "column-key": item.prop,
                  label: item.label,
                  sortable: item.sort ? "custom" : false,
                  filters: item.filter ? item.filter.data : null,
                  "filter-multiple": item.filter
                    ? item.filter.multiple === false
                      ? item.filter.multiple
                      : true
                    : true
                },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "default",
                      fn: function(scope) {
                        return [
                          "tools" in item
                            ? [
                                _c("Tools", {
                                  attrs: {
                                    buttons: item.tools,
                                    row: scope.row,
                                    index: scope.$index
                                  },
                                  on: { "listen-tools": _vm.Listeners }
                                })
                              ]
                            : "render" in item
                            ? [
                                _c("my-column-" + item.prop, {
                                  tag: "component",
                                  attrs: { row: scope.row }
                                })
                              ]
                            : [
                                "lazy" in item
                                  ? _c("fold-prefix", {
                                      attrs: {
                                        level: scope.row.tree_level
                                          ? scope.row.tree_level
                                          : 0
                                      }
                                    })
                                  : _vm._e(),
                                _vm._v(" "),
                                "lazy" in item && scope.row.children_count > 0
                                  ? _c("Fold", {
                                      attrs: {
                                        status: scope.row.tree_fold,
                                        row: scope.row
                                      },
                                      on: {
                                        expanding: _vm.expanding,
                                        collapsing: _vm.collapsing
                                      }
                                    })
                                  : _vm._e(),
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      item.convert
                                        ? scope.row[item.prop + "_name"]
                                        : scope.row[item.prop]
                                    ) +
                                    "\n                        "
                                )
                              ]
                        ]
                      }
                    }
                  ],
                  null,
                  true
                )
              })
            ]
          })
        ],
        2
      ),
      _vm._v(" "),
      _vm.page
        ? _c("el-pagination", {
            attrs: {
              "page-sizes": [10, 20, 30, 50],
              "page-size": _vm.filterValue.limit,
              "current-page": _vm.filterValue.page,
              layout: "total, sizes, prev, pager, next, jumper",
              total: _vm.total
            },
            on: {
              "size-change": _vm.handleSizeChange,
              "current-change": _vm.handleCurrentChange
            }
          })
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-d8ddc71a", module.exports)
  }
}

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 列表页公共属性及方法
 */

var list_page = {
    data: function data() {
        return {
            search: {},
            edit_id: null,
            tools_id: null,
            select_ids: null
        };
    },
    created: function created() {
        //console.log('mixin-list_page')
    },

    methods: {
        /**
         * 点击搜索按钮
         */
        handleSearch: function handleSearch() {
            this.handleSetFilter('search', this.search);
            this.handleRenderTable();
        },


        /**
         * 返回所选数据
         * @param field 要返回的字段名，为null则全部返回
         * @returns {*}
         */
        handleGetSelection: function handleGetSelection() {
            var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var data = this.$refs.table.selection;
            if (data === null) {
                data = [];
            }
            if (field == null) {
                return data;
            } else if (typeof field == 'string') {
                var value = [];
                data.forEach(function (item) {
                    if (field in item) {
                        value.push(item[field]);
                    }
                });
                return value;
            } else {
                console.error('handleGetSelection 参数错误');
            }
            return this.$refs.table.selection;
        },


        /**
         * 设置表格筛选参数
         * @param key   键
         * @param value 值
         */
        handleSetFilter: function handleSetFilter(key, value) {
            this.$refs.table.filterValue[key] = value;
        },


        /**
         * 获取表格筛选参数
         * @param key   键
         * @returns {*}
         */
        handleGetFilter: function handleGetFilter(key) {
            return this.$refs.table.filterValue[key];
        },


        /**
         * 要移除的条件
         *
         * @param value
         */
        handelDeleteFilter: function handelDeleteFilter(value) {
            var keyword = [];
            for (var item in value) {
                this.$refs.table.deleteFilter.push(item);
            }
        },


        /**
         * 重新渲染表格
         */
        handleRenderTable: function handleRenderTable() {
            this.$refs.table.renderTable();
        },


        /**
         * 移除表格中某行数据
         * @param index 下标
         */
        handleDeleteRow: function handleDeleteRow(index) {
            this.$refs.table.deleteRow(index);
        },


        /**
         * 删除数据
         * @param callback  删除操作
         * @param index     下标
         */
        handleDel: function handleDel(callback, index) {
            var _this = this;

            var loading = this.$loading({
                lock: true,
                text: '删除数据中...',
                spinner: 'el-icon-loading'
            });
            callback.then(function (res) {
                _this.loading = false;
                if (res['msg'] == 0) {
                    _this.$message.success('删除成功');
                    _this.handleDeleteRow(index);
                } else {
                    _this.$message.success('删除成功');
                }
                loading.close();
            }).catch(function (error) {
                _this.loading = false;
                _this.$message.error('删除失败');
                loading.close();
                console.log(error);
            });
        },


        /**
         * 设置子集数据，treeTable
         * @param row
         * @param children
         */
        handleSetChild: function handleSetChild(row, children) {
            this.$refs.table.SetChildren(row, children);
        },


        /**
         * 开启表格loading
         */
        handleOpenTableLoding: function handleOpenTableLoding() {
            this.$refs.table.loading = true;
        },


        /**
         * 关闭表格loading
         */
        handleCloseTableLoding: function handleCloseTableLoding() {
            this.$refs.table.loading = false;
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (list_page);

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return friend_add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return friend_edit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return friend_get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return friend_del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SeoAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SeoList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SeoGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SeoEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SeoDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NavGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NavEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NavDelete; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


/**
 * 添加友情链接
 *
 * @param data
 * @returns {*}
 */
var friend_add = function friend_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/friend_link',
        data: data,
        method: 'post'
    });
};

/**
 * 修改友情链接
 *
 * @param id
 * @param data
 * @returns {*}
 */
var friend_edit = function friend_edit(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/friend_link/' + id,
        data: data,
        method: 'put'
    });
};

/**
 * 获得友情链接详情
 *
 * @param id
 * @returns {*}
 */
var friend_get = function friend_get(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/friend_link/' + id,
        method: 'get'
    });
};

/**
 * 删除友情链接
 * @param id
 * @returns {*}
 */
var friend_del = function friend_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/friend_link/' + id,
        method: 'delete'
    });
};

/**
 * 添加seo信息
 *
 * @param data
 * @returns {*}
 * @constructor
 */
var SeoAdd = function SeoAdd(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/seo',
        data: data,
        method: 'post'
    });
};

/**
 * seo信息列表
 *
 * @returns {*}
 * @constructor
 */
var SeoList = function SeoList() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/seo',
        method: 'get'
    });
};

/**
 * 获得seo信息
 *
 * @param id
 * @returns {*}
 * @constructor
 */
var SeoGet = function SeoGet(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/seo/' + id,
        method: 'get'
    });
};

/**
 * 修改seo信息
 * @param id
 * @param data
 * @returns {*}
 * @constructor
 */
var SeoEdit = function SeoEdit(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/seo/' + id,
        data: data,
        method: 'put'
    });
};

/**
 * seo信息删除
 * @param id
 * @returns {*}
 * @constructor
 */
var SeoDelete = function SeoDelete(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/seo/' + id,
        method: 'delete'
    });
};

/**
 * 导航信息添加
 *
 * @param data
 * @returns {*}
 * @constructor
 */
var NavAdd = function NavAdd(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/nav',
        data: data,
        method: 'post'
    });
};

/**
 * 获得导航信息
 *
 * @param id
 * @returns {*}
 * @constructor
 */
var NavGet = function NavGet(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/nav/' + id,
        method: 'get'
    });
};

/**
 * 修改导航信息
 *
 * @param id
 * @param data
 * @returns {*}
 * @constructor
 */
var NavEdit = function NavEdit(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/nav/' + id,
        data: data,
        method: 'put'
    });
};

/**
 * 删除导航信息
 * @param id
 * @returns {*}
 * @constructor
 */
var NavDelete = function NavDelete(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/nav/' + id,
        method: 'delete'
    });
};

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(491);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(233)("84dfc6cc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f1c8342a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./seo.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f1c8342a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./seo.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.el-input__inner {\n    height: 35px;\n}\n", ""]);

// exports


/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_public_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_list_page__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_web_site__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__add__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__edit__);
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
    components: { Table: __WEBPACK_IMPORTED_MODULE_0__components_public_table___default.a, Add: __WEBPACK_IMPORTED_MODULE_3__add___default.a, Edit: __WEBPACK_IMPORTED_MODULE_4__edit___default.a },
    mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_list_page__["a" /* default */]],
    data: function data() {
        return {
            page_name: '推广设置',
            url: 'seo',
            addFormVisible: false,
            editFormVisible: false,
            columns: [{
                prop: 'id',
                label: 'ID',
                width: '80'
            }, {
                prop: 'name',
                label: '名称'
            }, {
                prop: 'desc',
                label: '网页描述'
            }, {
                prop: 'keywords',
                label: '网页关键字'
            }, {
                prop: 'title',
                label: '网页标题'
            }, {
                label: '操作',
                width: '200',
                tools: this.handleGetBtn()
            }],
            seoAuth: [{
                add: false
            }]
        };
    },
    created: function created() {
        var _this = this;

        this.$store.state.user.auth.seo.forEach(function (item) {
            if (item === 'add') {
                _this.seoAuth.add = true;
                return true;
            }
        });
    },

    methods: {
        // 工具栏事件处理 type值为columns中tools的键值
        handleTools: function handleTools(type, index, row) {
            var _this2 = this;

            if (type == 'edit') {
                //编辑数据
                this.edit_id = row.id;
                this.editFormVisible = true;
            } else if (type == 'delete') {
                //删除数据
                Object(__WEBPACK_IMPORTED_MODULE_2__api_web_site__["f" /* SeoDelete */])(row.id).then(function (response) {
                    //成功响应动态移除表格项
                    _this2.handleDeleteRow(index);
                    //提示信息
                    _this2.$message.success(response.data.msg);
                });
            } else {
                console.error('Tools Event:' + type + ' Not found');
            }
        },
        handleAdd: function handleAdd() {
            this.addFormVisible = true;
        },

        //tool栏按钮权限控制
        handleGetBtn: function handleGetBtn() {
            var conf = {
                edit: {
                    type: 'primary',
                    icon: 'el-icon-edit'
                },
                delete: {
                    type: 'danger',
                    icon: 'el-icon-delete'
                }
            };
            var result = {};
            this.$store.state.user.auth.seo.forEach(function (item) {
                if (item in conf) {
                    result[item] = conf[item];
                }
            });
            return result;
        }
    }
});

/***/ }),

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(494)
}
var normalizeComponent = __webpack_require__(231)
/* script */
var __vue_script__ = __webpack_require__(496)
/* template */
var __vue_template__ = __webpack_require__(497)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-66c83fa2"
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
Component.options.__file = "resources/js/view/webSite/seo/add.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-66c83fa2", Component.options)
  } else {
    hotAPI.reload("data-v-66c83fa2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(495);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(233)("447ae010", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-66c83fa2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./add.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-66c83fa2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./add.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_form_page__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_web_site__ = __webpack_require__(270);
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
    name: "add",
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_form_page__["a" /* default */]],
    data: function data() {
        return {
            form: {
                name: '',
                desc: '',
                keywords: '',
                title: ''
            },
            rules: {
                name: [{ required: true, message: '名称必须填写', trigger: 'blur' }]
            }
        };
    },

    methods: {
        onSubmit: function onSubmit() {
            if (this.handleValid()) {
                this.handleSubmit(Object(__WEBPACK_IMPORTED_MODULE_1__api_web_site__["e" /* SeoAdd */])(this.form));
            }
        }
    }
});

/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-form",
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.loading,
          expression: "loading"
        }
      ],
      ref: "form",
      attrs: { rules: _vm.rules, model: _vm.form, "label-width": "80px" }
    },
    [
      _c(
        "el-form-item",
        { attrs: { label: "名称", prop: "name" } },
        [
          _c("el-input", {
            model: {
              value: _vm.form.name,
              callback: function($$v) {
                _vm.$set(_vm.form, "name", $$v)
              },
              expression: "form.name"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        { attrs: { label: "页面描述", prop: "url" } },
        [
          _c("el-input", {
            model: {
              value: _vm.form.desc,
              callback: function($$v) {
                _vm.$set(_vm.form, "desc", $$v)
              },
              expression: "form.desc"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        { attrs: { label: "页面关键字", prop: "url" } },
        [
          _c("el-input", {
            model: {
              value: _vm.form.keywords,
              callback: function($$v) {
                _vm.$set(_vm.form, "keywords", $$v)
              },
              expression: "form.keywords"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        { attrs: { label: "网页标题", prop: "title" } },
        [
          _c("el-input", {
            model: {
              value: _vm.form.title,
              callback: function($$v) {
                _vm.$set(_vm.form, "title", $$v)
              },
              expression: "form.title"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        [
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
            [_vm._v("立即创建")]
          ),
          _vm._v(" "),
          _c("el-button", { on: { click: _vm.close } }, [_vm._v("取消")])
        ],
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
    require("vue-hot-reload-api")      .rerender("data-v-66c83fa2", module.exports)
  }
}

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(499)
}
var normalizeComponent = __webpack_require__(231)
/* script */
var __vue_script__ = __webpack_require__(501)
/* template */
var __vue_template__ = __webpack_require__(502)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-72a6ccec"
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
Component.options.__file = "resources/js/view/webSite/seo/edit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72a6ccec", Component.options)
  } else {
    hotAPI.reload("data-v-72a6ccec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(500);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(233)("d281222a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72a6ccec\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72a6ccec\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_form_page__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_web_site__ = __webpack_require__(270);
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
    name: "add",
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_form_page__["a" /* default */]],
    props: ['id'],
    data: function data() {
        return {
            form: {
                name: '',
                desc: '',
                keywords: '',
                title: ''
            },
            rules: {
                name: [{ required: true, message: '名称必须填写', trigger: 'blur' }]
            }
        };
    },

    created: function created() {
        var _this = this;

        Object(__WEBPACK_IMPORTED_MODULE_1__api_web_site__["h" /* SeoGet */])(this.id).then(function (response) {
            _this.form = response.data.data;
        });
    },
    methods: {
        onSubmit: function onSubmit() {
            if (this.handleValid()) {
                this.handleSubmit(Object(__WEBPACK_IMPORTED_MODULE_1__api_web_site__["g" /* SeoEdit */])(this.id, this.form));
            }
        }
    }
});

/***/ }),

/***/ 502:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-form",
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.loading,
          expression: "loading"
        }
      ],
      ref: "form",
      attrs: { rules: _vm.rules, model: _vm.form, "label-width": "80px" }
    },
    [
      _c(
        "el-form-item",
        { attrs: { label: "名称", prop: "name" } },
        [
          _c("el-input", {
            model: {
              value: _vm.form.name,
              callback: function($$v) {
                _vm.$set(_vm.form, "name", $$v)
              },
              expression: "form.name"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        { attrs: { label: "页面描述", prop: "url" } },
        [
          _c("el-input", {
            model: {
              value: _vm.form.desc,
              callback: function($$v) {
                _vm.$set(_vm.form, "desc", $$v)
              },
              expression: "form.desc"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        { attrs: { label: "页面关键字", prop: "url" } },
        [
          _c("el-input", {
            model: {
              value: _vm.form.keywords,
              callback: function($$v) {
                _vm.$set(_vm.form, "keywords", $$v)
              },
              expression: "form.keywords"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        { attrs: { label: "网页标题", prop: "title" } },
        [
          _c("el-input", {
            model: {
              value: _vm.form.title,
              callback: function($$v) {
                _vm.$set(_vm.form, "title", $$v)
              },
              expression: "form.title"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-form-item",
        [
          _c(
            "el-button",
            { attrs: { type: "primary" }, on: { click: _vm.onSubmit } },
            [_vm._v("立即创建")]
          ),
          _vm._v(" "),
          _c("el-button", { on: { click: _vm.close } }, [_vm._v("取消")])
        ],
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
    require("vue-hot-reload-api")      .rerender("data-v-72a6ccec", module.exports)
  }
}

/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.seoAuth.add
        ? [
            _c(
              "el-button",
              {
                attrs: { type: "primary", size: "small", icon: "el-icon-plus" },
                on: { click: _vm.handleAdd }
              },
              [_vm._v("添加" + _vm._s(_vm.page_name))]
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _c("Table", {
        ref: "table",
        attrs: { url: _vm.url, columns: _vm.columns, checkbox: false },
        on: { tools: _vm.handleTools }
      }),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { title: "添加" + _vm.page_name, visible: _vm.addFormVisible },
          on: {
            "update:visible": function($event) {
              _vm.addFormVisible = $event
            }
          }
        },
        [
          _vm.addFormVisible
            ? _c("Add", {
                ref: "addForm",
                on: {
                  close: function($event) {
                    _vm.addFormVisible = false
                  },
                  render: this.handleRenderTable
                }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "编辑" + _vm.page_name,
            visible: _vm.editFormVisible
          },
          on: {
            "update:visible": function($event) {
              _vm.editFormVisible = $event
            }
          }
        },
        [
          _vm.editFormVisible
            ? _c("Edit", {
                ref: "editForm",
                attrs: { id: _vm.edit_id },
                on: {
                  render: this.handleRenderTable,
                  close: function($event) {
                    _vm.editFormVisible = false
                  }
                }
              })
            : _vm._e()
        ],
        1
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f1c8342a", module.exports)
  }
}

/***/ })

});