import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';

Vue.use(VueRouter);
Vue.prototype.$http=axios;

import App from './views/app.vue'

import Index from './views/indexMain.vue'



const router = new VueRouter({
    mode:'history',
    linkActiveClass:'active',//当前页的选中状态
    routes: [
        { path: '/', component: Index},
        { path: '/index', component: Index},
    ]
})


new Vue({
    el: '#app',
    router:router,
    components: { App }
})