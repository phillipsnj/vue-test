import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify';

let nodes = require('../config/mergNodes_TEST.json')
let events = require('../config/mergEvents_TEST.json')
let layout = require('../config/layoutConfig.json')

store.state.nodes = nodes
store.state.events = events.events
store.state.layout = layout

Vue.config.productionTip = false

Vue.use(Vuex)
import store from './store'

new Vue({
  data: {},
  vuetify,
  render: h => h(App),
  store
}).$mount('#app')
