import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './layouts/Layout.vue'
import DataView from './views/DataView.vue'
import HomeView from "./views/HomeView.vue"
import DataPage from "./components/question_answer/DataPage.vue"
import CategoryPage from "./components/category/CategoryPage.vue"
import OverviewData from "./components/data/OverviewData.vue";
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
            },
            {
                name: "data",
                path: '/data',
                component: OverviewData,
            },
            {
                name: "category",
                path: '/category',
                component: CategoryPage,
            }]
        },
    ],
})
