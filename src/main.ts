import { createApp } from 'vue'
import './assets/base.css'
import App from './App.vue'
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

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
