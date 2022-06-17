import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

declare global {
  interface Window {
    __TAURI__: Record<string, unknown>;
  }
}

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

declare global {
  interface Window {
      OS: string;
      __TAURI__: Record<string, unknown>;
  }
}