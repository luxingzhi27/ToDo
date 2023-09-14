import { createApp } from 'vue'
import './assets/base.css'
import App from './App.vue'
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import User from "./models/User"
declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
        clear: () => void;
      };
    };
  }
}

if(window.electron.store.get('user')===undefined){
  window.electron.store.set('user',new User({
    name:"anonymous",
    sex:'male',
    description:null,
    // avatar:'/default_user_avatar.png',
    avatar:'https://tse2-mm.cn.bing.net/th/id/OIP-C.c8zRDGu25L7gTEa9DG2nPQAAAA?pid=ImgDet&rs=1',
    schedules:[],
    email:'example@example.com',
    phoneNumber:'12345678910',
    location:'上海市杨浦区四平路1239号'
  }))
  window.electron.store.set('type',"anonymous")
}

  
const app=createApp(App).use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

router.push('/')

app.mount('#app').$nextTick(() => {
  // Remove Preload scripts loading
  postMessage({ payload: 'removeLoading' }, '*')

  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
