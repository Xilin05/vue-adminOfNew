// 插件模块

import axios from "axios";
import QS from 'qs'
// axios.defaults.headers.post['Content']

const MyHttpServer = {};

MyHttpServer.install = Vue => {
    /* // 1. 添加全局方法或 property
      Vue.myGlobalMethod = function () {
          // 逻辑...
      }
      // 2. 添加全局资源
      Vue.directive('my-directive', {
          bind(el, binding, vnode, oldVnode) {
              // 逻辑...
          }
      ...
    })
      // 3. 注入组件选项
      Vue.mixin({
          created: function () {
              // 逻辑...
          }
      ...
    }) */
    // axios.request({
    //         url: "getUserData",
    //         method: "POST",
    //         data: QS.stringify(),
    //     })
    (axios.defaults.baseURL = "http://127.0.0.1:8890/api/private/v1/"),
    // (axios.defaults.baseURL = "http://172.16.161.21:8080/user/"),
    // 4. 添加实例方法
    (Vue.prototype.$http = axios);
};

export default MyHttpServer;