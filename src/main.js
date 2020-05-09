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
    display_component: "hello_world",
    selected_node_id: 0
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
