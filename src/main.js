import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'


Vue.use(new VueSocketIO({
  debug: true,
  connection: 'localhost:3000' // future hostname too  stock-market-js.com
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
