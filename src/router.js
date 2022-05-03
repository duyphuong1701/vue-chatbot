import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './layouts/Layout.vue'
import DataView from './views/DataView.vue'
import HomeView from "./views/HomeView.vue"
import DataPage from "./components/question_answer/DataPage.vue"
import CategoryTable from "./components/category/CategoryTable.vue"
import ModelPage from "./components/model/ModelPage.vue"
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
                name: "data-question",
                path: '/data-question',
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
                component: CategoryTable,
            },
            {
                name: "model",
                path: '/model',
                component: ModelPage,
            },
            ]
        },
    ],
})
