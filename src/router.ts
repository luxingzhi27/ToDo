import {createRouter,createWebHistory} from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import PersonPage from '@/components/PersonPage.vue'

export default createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',component:MainPage},
        {path:'/person',component:PersonPage}
    ]
})