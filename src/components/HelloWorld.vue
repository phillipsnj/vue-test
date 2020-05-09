<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-flex xs6 md3 pa-3>
          <v-text-field label="Title"
                        placeholder="Title"
                        v-model="title">
          </v-text-field>
        </v-flex>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>

  export default {
    name: 'hello_world',
    data: function() {
      return {
        title : this.$root.$data.layout.title
      }
    },
  }

</script>
