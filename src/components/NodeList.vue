<template>

  <v-container>
    <v-data-table :headers="headers"
                  :items="nodes"
                  :items-per-page="5"
                  class="elevation-1">
      <template v-slot:item.flim="{ item }">
        <v-chip color="amber" dark v-if="item.flim">Flim</v-chip>
        <v-chip color="green" dark v-else>Slim</v-chip>
      </template>
    </v-data-table>
    <h3>Nodes: {{ nodes.length }}</h3>
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
          { text: 'component', value: 'component' }
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
      QNN: function() {
        this.$socket.emit('QNN')
      },
      editNode: function(node) {
        //this.$store.state.selectedNode = node_id
        //this.$store.state.display_item = component
        this.$store.commit('selectNode', {
          node_id: node.node,
          component: node.component,
          node: node
        })
        // eslint-disable-next-line no-console
        console.log('editNode ' + node.node + ' ' + this.$store.state.display_item)
      }
    }
  }

</script>
