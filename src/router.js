import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './layouts/Layout.vue'
import DataView from './views/DataView.vue'
import HomeView from "./views/HomeView.vue"
import DataPage from "./components/DataPage.vue"
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    // base: process.env.BASE_URL,
    routes: [
        {
            name: "home",
            path: '/',
            component: Layout,
            children: [{
                name: "dataQuestion",
                path: '/dataQuestion',
                component: DataView,
            },
            {
                name: "chatbot",
                path: '/chatbot',
                component: HomeView,
            },
            {
                name: "dataList",
                path: '/list',
                component: DataPage,
            }]
        },
    ],
})