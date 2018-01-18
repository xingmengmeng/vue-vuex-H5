import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
import store from './store/index'
import axios from 'axios';

import { mapMutations } from 'vuex'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.prototype.$http=axios;
import App from './views/app.vue'

/*import Index from './views/indexMain.vue'*/
const Index =  resolve => require(['./views/indexMain.vue'], resolve);
const Main =  resolve => require(['./views/main.vue'], resolve);
const List =  resolve => require(['./views/list.vue'], resolve);



const router = new VueRouter({
    mode:'history',
    linkActiveClass:'active',//当前页的选中状态
    routes: [
        { path: '/', component: Index},
        { path: '/index', component: Index},
        { path: '/main', component: Main},
        { path: '/list', component: List},
    ]
})


new Vue({
    el: '#app',
    router:router,
    store: store,
    components: { App }
})