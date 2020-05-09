import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

let config = require('../config/nodeConfig.json');
let layout = require('../config/layoutConfig.json')

Vue.config.productionTip = false

new Vue({
  data: {
    debug : layout.debug,
    events:config.events,
    nodes:config.nodes,
    cbusErrors:[],
    dccErrors:[],
    layout: layout,
    display_item: "HelloWorld"
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
