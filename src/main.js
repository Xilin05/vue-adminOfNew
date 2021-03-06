import Vue from 'vue';
import App from './App';
import MyHttpServer from "./plugins/http.js";
import ElementUI from 'element-ui';
import moment from 'moment'
//引入阿里巴巴图标库
import './assets/icon/iconfont.css';
import './assets/iconfont/iconfont.css';
import './assets/iconfont/ali_iconfont.css';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import router from './router';

//引入组织结构图样式
import 'vue-orgchart/dist/style.min.css'
import "babel-polyfill";
import ZkTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });
Vue.use(ZkTable);
// Vue.prototype.$axios = axios;
Vue.use(MyHttpServer);

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     const role = localStorage.getItem('ms_username');
//     if(!role && to.path !== '/login'){
//         next('/login');
//     }else if(to.meta.permission){
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     }else{
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         }else{
//             next();
//         }
//     }
// })

// 全局过滤器 - 处理日期
Vue.filter('fmtdate', (v) => {
    return moment(v).format('YYYY - MM - DD');
})


new Vue({
    router,
    // Moment,
    render: h => h(App)
}).$mount('#app');