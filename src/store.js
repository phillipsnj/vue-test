import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        title: 'vue-test',
        subTitle: 'Alpha',
        nodes: [],
        events: [],
        cbusErrors:[],
        dccErrors:[],
        raw:{},
        layout: {},
        display_component: "hello_world",
        selected_node_id: 0,
        debug : false
    },
    mutations: {
        SOCKET_NODES (state, data){
            state.nodes = data
        },
        SOCKET_EVENTS(state, data){
            state.events = data
        },
        SOCKET_CBUS_ERRORS(state, data){
            state.cbusErrors = data
        },
        SOCKET_DCC_ERRORS(state, data){
            state.dccErrors = data
        },
        increment (state) {
            state.count++
        },
        selectNode (state, payload) {
            state.selected_node = payload.node
            state.display_item = payload.component
        },
        selectDisplay (state, payload){
            state.display_item = payload.component
        },
        UPDATE_NODE_VARIABLE (state, payload){
            //state.nodes[state.selected_node].variables[payload.variableId] = payload.variableValue
            Vue.set(state.nodes[payload.nodeId].variables, payload.variableId, payload.variableValue)
        },
        UPDATE_NODE_EVENT_VARIABLE (state, payload){
            //state.nodes[state.selected_node].variables[payload.variableId] = payload.variableValue
            console.log(`UPDATE_NODE_EVENT_VARIABLE ${payload.nodeId} : ${payload.actionId}`)
            Vue.set(state.nodes[payload.nodeId].actions[payload.actionId].variables, payload.variableId, payload.variableValue)
        }
    }
})
