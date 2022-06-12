if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(shared, vue) {
  "use strict";
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (shared.toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = shared.toTypeString(v).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = shared.toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  var self$1;
  const _sfc_main$2 = {
    data() {
      return {
        dataList: []
      };
    },
    onLoad() {
      self$1 = this;
      this.request();
    },
    methods: {
      request() {
        uni.request({
          url: "http://172.30.145.177:8080/api/drive/list",
          success: function(res) {
            self$1.dataList = res.data.data.driveList;
            formatAppLog("log", "at pages/index/index.vue:27", self$1.dataList);
          }
        });
      },
      onClick(item) {
        uni.navigateTo({
          url: "/pages/dir/index?id=" + item.id + "&name=" + item.name
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = vue.resolveComponent("uni-list-item");
    const _component_uni_list = vue.resolveComponent("uni-list");
    return vue.openBlock(), vue.createBlock(_component_uni_list, null, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.dataList, (item) => {
          return vue.openBlock(), vue.createBlock(_component_uni_list_item, {
            key: item.id,
            title: item.name,
            note: item.type.description,
            showArrow: "",
            thumb: "../../static/img/drive.png",
            "thumb-size": "base",
            data: item,
            clickable: "",
            onClick: ($event) => $options.onClick(item)
          }, null, 8, ["title", "note", "data", "onClick"]);
        }), 128))
      ]),
      _: 1
    });
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "/Users/whde/Documents/HBuilderProjects/zfile-uniapp/pages/index/index.vue"]]);
  var self;
  const _sfc_main$1 = {
    data() {
      return {
        driveId: "",
        name: "",
        dataList: []
      };
    },
    onLoad: function(option) {
      self = this;
      formatAppLog("log", "at pages/dir/index.vue:22", option.name);
      this.name = option.name;
      var path = option.path;
      if (path == void 0) {
        path = "";
      }
      this.driveId = option.id;
      this.request(this.driveId, path);
    },
    methods: {
      request(id, path) {
        formatAppLog("log", "at pages/dir/index.vue:34", "http://172.30.145.177:8080/api/list/" + self.driveId + "?path=" + path);
        uni.request({
          url: "http://172.30.145.177:8080/api/list/" + self.driveId + "?path=" + path,
          success: function(res) {
            self.dataList = res.data.data.files.filter(function(item) {
              return item.name != "whde_tmp";
            }).map(function(item) {
              return item;
            });
            formatAppLog("log", "at pages/dir/index.vue:45", res.data.data.files);
          }
        });
      },
      onClick(item) {
        if (item.type == "FOLDER") {
          uni.navigateTo({
            url: "/pages/dir/index?id=" + self.driveId + "&name=" + item.name + "&path=" + encodeURI(item.path + item.name)
          });
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = vue.resolveComponent("uni-list-item");
    const _component_uni_list = vue.resolveComponent("uni-list");
    return vue.openBlock(), vue.createBlock(_component_uni_list, null, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.dataList, (item) => {
          return vue.openBlock(), vue.createBlock(_component_uni_list_item, {
            key: item.id,
            title: item.name,
            note: item.size,
            rightText: item.time,
            showArrow: "",
            thumb: "../../static/img/drive.png",
            "thumb-size": "base",
            data: item,
            clickable: "",
            onClick: ($event) => $options.onClick(item)
          }, null, 8, ["title", "note", "rightText", "data", "onClick"]);
        }), 128))
      ]),
      _: 1
    });
  }
  var PagesDirIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/whde/Documents/HBuilderProjects/zfile-uniapp/pages/dir/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/dir/index", PagesDirIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/whde/Documents/HBuilderProjects/zfile-uniapp/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(uni.VueShared, Vue);
