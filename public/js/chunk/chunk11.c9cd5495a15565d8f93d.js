webpackJsonp([11],{178:function(e,t){e.exports=function(e,t,n,o,i,r){var a,s=e=e||{},c=typeof e.default;"object"!==c&&"function"!==c||(a=e,s=e.default);var l,u="function"==typeof s?s.options:s;if(t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),i&&(u._scopeId=i),r?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},u._ssrRegister=l):o&&(l=o),l){var d=u.functional,f=d?u.render:u.beforeCreate;d?(u._injectStyles=l,u.render=function(e,t){return l.call(t),f(e,t)}):u.beforeCreate=f?[].concat(f,l):[l]}return{esModule:a,exports:s,options:u}}},180:function(e,t,n){var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i=n(184),r={},a=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,c=0,l=!1,u=function(){},d=null,f="data-vue-ssr-id",m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(e){for(var t=0;t<e.length;t++){var n=e[t],o=r[n.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](n.parts[i]);for(;i<n.parts.length;i++)o.parts.push(v(n.parts[i]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{var a=[];for(i=0;i<n.parts.length;i++)a.push(v(n.parts[i]));r[n.id]={id:n.id,refs:1,parts:a}}}}function h(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function v(e){var t,n,o=document.querySelector("style["+f+'~="'+e.id+'"]');if(o){if(l)return u;o.parentNode.removeChild(o)}if(m){var i=c++;o=s||(s=h()),t=_.bind(null,o,i,!1),n=_.bind(null,o,i,!0)}else o=h(),t=function(e,t){var n=t.css,o=t.media,i=t.sourceMap;o&&e.setAttribute("media",o);d.ssrId&&e.setAttribute(f,t.id);i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,o),n=function(){o.parentNode.removeChild(o)};return t(e),function(o){if(o){if(o.css===e.css&&o.media===e.media&&o.sourceMap===e.sourceMap)return;t(e=o)}else n()}}e.exports=function(e,t,n,o){l=n,d=o||{};var a=i(e,t);return p(a),function(t){for(var n=[],o=0;o<a.length;o++){var s=a[o];(c=r[s.id]).refs--,n.push(c)}t?p(a=i(e,t)):a=[];for(o=0;o<n.length;o++){var c;if(0===(c=n[o]).refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete r[c.id]}}}};var y,g=(y=[],function(e,t){return y[e]=t,y.filter(Boolean).join("\n")});function _(e,t,n,o){var i=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=g(t,i);else{var r=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(r,a[t]):e.appendChild(r)}}},184:function(e,t){e.exports=function(e,t){for(var n=[],o={},i=0;i<t.length;i++){var r=t[i],a=r[0],s={id:e+":"+i,css:r[1],media:r[2],sourceMap:r[3]};o[a]?o[a].parts.push(s):n.push(o[a]={id:a,parts:[s]})}return n}},233:function(e,t,n){"use strict";n.d(t,"d",function(){return i}),n.d(t,"f",function(){return r}),n.d(t,"e",function(){return a}),n.d(t,"c",function(){return s}),n.d(t,"b",function(){return c}),n.d(t,"a",function(){return l}),n.d(t,"g",function(){return u});var o=n(24),i=function(e){return o.a.request({url:"/menu/add",data:e,method:"post"})},r=function(e){return o.a.request({url:"/menu/edit",data:e,method:"post"})},a=function(e){return o.a.request({url:"/menu/"+e,method:"get"})},s=function(e){return o.a.request({url:"/config?keyword="+e,method:"get"})},c=function(e){return o.a.request({url:"/config/updateOrCreate",data:e,method:"post"})},l=function(){return o.a.request({url:"/clean",method:"get"})},u=function(){return o.a.request({url:"/sitemap",method:"get"})}},234:function(e,t,n){e.exports=n(238)},238:function(e,t,n){var o=n(178)(n(239),n(240),!1,null,null,null);e.exports=o.exports},239:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.listeners={}}return o(e,[{key:"on",value:function(e,t){void 0===this.listeners[e]&&(this.listeners[e]=[]),this.listeners[e].push(t)}},{key:"emit",value:function(e){this.listeners[e]&&this.listeners[e].forEach(function(e){return e()})}}]),e}();t.default={name:"VueUeditorWrap",data:function(){return{id:"editor"+Math.random().toString().slice(-10),editor:null,status:0,initValue:"",defaultConfig:{UEDITOR_HOME_URL:"./static/UEditor/",enableAutoSave:!1}}},props:{value:{type:String,default:""},config:{type:Object,default:function(){return{}}},init:{type:Function,default:function(){return function(){}}},destroy:{type:Boolean,default:!1},name:{type:String,default:""}},computed:{mixedConfig:function(){return Object.assign({},this.defaultConfig,this.config)}},methods:{registerButton:function(e){var t=e.name,n=e.icon,o=e.tip,i=e.handler,r=e.UE,a=void 0===r?window.UE:r;a.registerUI(t,function(e,t){e.registerCommand(t,{execCommand:function(){i(e,t)}});var r=new a.ui.Button({name:t,title:o,cssRules:"background-image: url("+n+") !important;background-size: cover;",onclick:function(){e.execCommand(t)}});return e.addListener("selectionchange",function(){var n=e.queryCommandState(t);-1===n?(r.setDisabled(!0),r.setChecked(!1)):(r.setDisabled(!1),r.setChecked(n))}),r})},_initEditor:function(){var e=this;this.$nextTick(function(){e.init(),e.editor=window.UE.getEditor(e.id,e.mixedConfig),e.editor.addListener("ready",function(){e.status=2,e.editor.setContent(e.initValue),e.$emit("ready",e.editor),e.editor.addListener("contentChange",function(){e.$emit("input",e.editor.getContent())})})})},_checkDependencies:function(){var e=this;return new Promise(function(t,n){!!window.UE&&!!window.UEDITOR_CONFIG&&0!==Object.keys(window.UEDITOR_CONFIG).length&&!!window.UE.getEditor?t():window.loadEnv?window.loadEnv.on("scriptsLoaded",function(){t()}):(window.loadEnv=new i,e._loadConfig().then(function(){return e._loadCore()}).then(function(){t(),window.loadEnv.emit("scriptsLoaded")}))})},_loadConfig:function(){var e=this;return new Promise(function(t,n){if(window.UE&&window.UEDITOR_CONFIG&&0!==Object.keys(window.UEDITOR_CONFIG).length)t();else{var o=document.createElement("script");o.type="text/javascript",o.src=e.mixedConfig.UEDITOR_HOME_URL+"ueditor.config.js",document.getElementsByTagName("head")[0].appendChild(o),o.onload=function(){window.UE&&window.UEDITOR_CONFIG&&0!==Object.keys(window.UEDITOR_CONFIG).length?t():console.error("加载ueditor.config.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!\n",o.src)}}})},_loadCore:function(){var e=this;return new Promise(function(t,n){if(window.UE&&window.UE.getEditor)t();else{var o=document.createElement("script");o.type="text/javascript",o.src=e.mixedConfig.UEDITOR_HOME_URL+"ueditor.all.min.js",document.getElementsByTagName("head")[0].appendChild(o),o.onload=function(){window.UE&&window.UE.getEditor?t():console.error("加载ueditor.all.min.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!\n",o.src)}}})},_setContent:function(e){e===this.editor.getContent()||this.editor.setContent(e)}},beforeDestroy:function(){this.destroy&&this.editor&&this.editor.destroy&&this.editor.destroy()},watch:{value:{handler:function(e){var t=this;switch(this.status){case 0:this.status=1,this.initValue=e,this._checkDependencies().then(function(){return t._initEditor()});break;case 1:this.initValue=e;break;case 2:this._setContent(e)}},immediate:!0}}}},240:function(e,t){e.exports={render:function(){var e=this.$createElement;return(this._self._c||e)("script",{attrs:{id:this.id,name:this.name,type:"text/plain"}})},staticRenderFns:[]}},479:function(e,t,n){var o=n(480);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(180)("4f74e1fa",o,!0,{})},480:function(e,t,n){(e.exports=n(75)(!1)).push([e.i,"",""])},481:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(482),i=n.n(o),r=n(485),a=n.n(r);t.default={name:"siteBase",components:{siteInfo:i.a,aBout:a.a},data:function(){return{activeName:"first"}}}},482:function(e,t,n){var o=n(178)(n(483),n(484),!1,null,null,null);e.exports=o.exports},483:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(24);t.default={data:function(){return{index:1,formDynamic:{site_name:"",icp:"",qq:"",phone:"",postNum:"",tel:"",email:"",keyword:"sitebase",items:[{index:1,address:"",tel:"",status:1}],jsSlot:[{code:""}]},configID:0,operation:""}},created:function(){var e=this;o.a.get("/config",{params:{keyword:"sitebase"}}).then(function(t){t.data.status?(e.formDynamic=t.data.data,e.operation="edit"):e.operation="add"})},methods:{handleAdd:function(){this.index=this.formDynamic.items.length+1,this.formDynamic.items.push({address:"",tel:"",index:this.index,status:1})},JShandleAdd:function(){this.formDynamic.jsSlot.push({code:""}),this.$set(this.formDynamic.jsSlot,this.formDynamic.jsSlot)},handleRemove:function(e){this.formDynamic.items[e].status=0,this.formDynamic.items.splice(e,1)},JShandleRemove:function(e){var t=this.formDynamic.jsSlot.splice(e,1);this.$set(this.formDynamic.jsSlot,t),console.log(e,t)},handleSubmit:function(e){var t=this;"edit"===this.operation?o.a.put("/config",{keyword:this.formDynamic.keyword,value:this.formDynamic,type:"json"}).then(function(e){t.$message.info(e.data.message)}):o.a.post("/config",{keyword:this.formDynamic.keyword,value:this.formDynamic,type:"json"}).then(function(e){t.$message.info(e.data.message)})}}}},484:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{width:"70%"}},[n("el-form",{ref:"formDynamic",attrs:{model:e.formDynamic,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"网站名称:",prop:"title"}},[n("el-input",{attrs:{placeholder:"输入网站名称"},model:{value:e.formDynamic.site_name,callback:function(t){e.$set(e.formDynamic,"site_name",t)},expression:"formDynamic.site_name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"网站备案号:",prop:"icp"}},[n("el-input",{attrs:{placeholder:"输入网站备案号"},model:{value:e.formDynamic.icp,callback:function(t){e.$set(e.formDynamic,"icp",t)},expression:"formDynamic.icp"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"联系电话:",prop:"phone"}},[n("el-input",{attrs:{placeholder:"网站负责人联系电话"},model:{value:e.formDynamic.phone,callback:function(t){e.$set(e.formDynamic,"phone",t)},expression:"formDynamic.phone"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"服务热线:",prop:"tel"}},[n("el-input",{attrs:{placeholder:"服务热线"},model:{value:e.formDynamic.tel,callback:function(t){e.$set(e.formDynamic,"tel",t)},expression:"formDynamic.tel"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"客服QQ:",prop:"qq"}},[n("el-input",{attrs:{placeholder:"客服QQ"},model:{value:e.formDynamic.qq,callback:function(t){e.$set(e.formDynamic,"qq",t)},expression:"formDynamic.qq"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"邮编地址:",prop:"postNum"}},[n("el-input",{attrs:{placeholder:"邮编地址"},model:{value:e.formDynamic.postNum,callback:function(t){e.$set(e.formDynamic,"postNum",t)},expression:"formDynamic.postNum"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"邮箱:",prop:"email"}},[n("el-input",{attrs:{placeholder:"邮箱"},model:{value:e.formDynamic.email,callback:function(t){e.$set(e.formDynamic,"email",t)},expression:"formDynamic.email"}})],1),e._v(" "),e._l(e.formDynamic.items,function(t,o){return t.status?[n("el-form-item",{attrs:{label:"地址 "+(o+1)}},[n("el-row",[n("el-col",{attrs:{span:18}},[n("el-input",{attrs:{type:"text"},model:{value:t.address,callback:function(n){e.$set(t,"address",n)},expression:"item.address"}})],1),e._v(" "),n("el-col",{attrs:{span:4,offset:1}},[n("el-button",{on:{click:function(t){return e.handleRemove(o)}}},[e._v("移除")])],1)],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"电话 "+(o+1)}},[n("el-row",[n("el-col",{attrs:{span:18}},[n("el-input",{attrs:{type:"text"},model:{value:t.tel,callback:function(n){e.$set(t,"tel",n)},expression:"item.tel"}})],1),e._v(" "),n("el-col",{attrs:{span:4,offset:1}})],1)],1)]:e._e()}),e._v(" "),n("el-form-item",[n("el-row",[n("el-col",{attrs:{span:12}},[n("el-button",{attrs:{type:"dashed",long:"",icon:"md-add"},on:{click:e.handleAdd}},[e._v("添加子项")])],1)],1)],1),e._v(" "),e._l(e.formDynamic.jsSlot,function(t,o){return[n("el-form-item",{key:o,attrs:{label:"JS代码插槽 "+(o+1)}},[n("el-row",[n("el-col",{attrs:{span:18}},[n("el-input",{attrs:{type:"text"},model:{value:t.code,callback:function(n){e.$set(t,"code",n)},expression:"itemJS.code"}})],1),e._v(" "),n("el-col",{attrs:{span:4}},[n("el-button",{on:{click:function(t){return e.JShandleRemove(o)}}},[e._v("移除")])],1)],1)],1)]}),e._v(" "),n("el-form-item",[n("el-row",[n("el-col",{attrs:{span:12}},[n("el-button",{attrs:{type:"dashed",long:"",icon:"md-add"},on:{click:e.JShandleAdd}},[e._v("添加子项")])],1)],1)],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleSubmit("formValidate")}}},[e._v("保存")])],1)],2)],1)},staticRenderFns:[]}},485:function(e,t,n){var o=n(178)(n(488),n(489),!1,function(e){n(486)},"data-v-26824b8c",null);e.exports=o.exports},486:function(e,t,n){var o=n(487);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(180)("d5eafeb0",o,!0,{})},487:function(e,t,n){(e.exports=n(75)(!1)).push([e.i,"",""])},488:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(234),i=n.n(o),r=n(46),a=n(233);t.default={name:"aBout",components:{VueUeditorWrap:i.a},data:function(){return{Ueconfig:r.a.Ueconfig,configPost:{pid:0,type:"json",keyword:"about",desc:"关于我们",value:{content:""}}}},created:function(){var e=this;Object(a.c)("about").then(function(t){e.configPost.value.content=t.data.data.content})},methods:{submit:function(){var e=this;Object(a.b)(this.configPost).then(function(t){e.$message.success(t.data.msg)})}}}},489:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticStyle:{width:"45%"}},[n("span",[e._v("介绍内容:")]),e._v(" "),n("vue-ueditor-wrap",{attrs:{config:e.Ueconfig},model:{value:e.configPost.value.content,callback:function(t){e.$set(e.configPost.value,"content",t)},expression:"configPost.value.content"}})],1),e._v(" "),n("div",{staticStyle:{"margin-top":"45px"}},[n("el-button",{attrs:{type:"success"},on:{click:e.submit}},[e._v("保存信息")])],1)])},staticRenderFns:[]}},490:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"网站信息",name:"first",lazy:!0}},[n("siteInfo")],1),e._v(" "),n("el-tab-pane",{attrs:{label:"关于我们",name:"second",lazy:!0}},[n("aBout")],1)],1)},staticRenderFns:[]}},906:function(e,t,n){var o=n(178)(n(481),n(490),!1,function(e){n(479)},"data-v-80c054ce",null);e.exports=o.exports}});