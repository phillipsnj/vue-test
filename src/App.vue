<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link @click="drawer=null, mainComponent=item.component" v-for="item in menuItems" :key="item.title">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ layout.title }} {{ layout.subTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <component v-bind:is="mainComponent"></component>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  import hello_world from './components/HelloWorld'
  import node_list from './components/NodeList'
  import event_list from './components/EventList'
  import raw from './components/Raw'

  export default {
    components:{
      // eslint-disable-next-line
      hello_world, node_list, event_list, raw
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      mainComponent:"hello_world",
      menuItems:[
        {title:"Home", icon:"mdi-home", component:"hello_world"},
        {title:"Nodes", icon:"mdi-home", component:"node_list"},
        {title:"Events", icon:"mdi-home", component:"event_list"},
        {title:"Raw", icon:"mdi-home", component:"raw"}
      ]
    }),
    computed: {
      layout() {
        return this.$root.$data.layout
        //return this.$store.state.nodes.data
      },
      debug() {
        return this.$root.$data.debug
      }
    }
  }
</script>
