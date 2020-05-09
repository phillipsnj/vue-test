<template>
  <v-container>
    <v-data-table :headers="headers"
                  :items="nodes"
                  :items-per-page="5"
                  class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Modules</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="checkModules">Check Modules</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.flim="{ item }">
        <v-chip color="amber" dark v-if="item.flim">Flim</v-chip>
        <v-chip color="green" dark v-else>Slim</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="blue darken-1" text @click="editNode(item)" outlined>Edit</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    name: 'node_list',
    data: function() {
      return {
        headers: [
          { text: 'node', value: 'node' },
          { text: 'module', value: 'module' },
          { text: 'flim', value: 'flim' },
          { text: 'flags', value: 'flags' },
          { text: 'component', value: 'component' },
          {text: 'Actions', value: 'actions', sortable: false }
        ],
        dialog: false,
        nodeComponent: 'noModule',
        selectedNode: {}
      }
    },
    computed: {
      nodes() {
        return Object.values(this.$root.$data.nodes)
        //return this.$store.state.nodes.data
      },
      debug() {
        return this.$root.$data.debug
      }
    },
    methods: {
      checkModules: function() {
        console.log(`checkModules`)
        //this.$socket.emit('QNN')
      },
      editNode: function(node) {
        //this.$store.state.selectedNode = node_id
        //this.$store.state.display_item = component
        /*this.$store.commit('selectNode', {
          node_id: node.node,
          component: node.component,
          node: node
        })*/
        // eslint-disable-next-line no-console
        console.log(`editNode : ${node.node} : ${node.component}`)
        this.$root.$data.selected_node_id = node.node
        this.$root.$data.display_component = node.component
      }
    }
  }

</script>
