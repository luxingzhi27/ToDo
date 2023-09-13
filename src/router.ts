import {createRouter,createWebHistory} from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import DetailPage from '@/components/DetailPage.vue'

export default createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',component:MainPage},
        {path:'/detail',component:DetailPage}
    ]
})