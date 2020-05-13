<template>
    <v-container>
        <h1>Node {{ node }} Variable {{ variable }} Component {{ name }}</h1>
        <v-card class="pa-2" flat min-width="200">
            <v-text-field
                    :label="label"
                    v-model="this.$root.$data.nodes[node].variables[variable]"
            >
            </v-text-field>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "NodeVariable",
        data: () => ({}),
        props: ['node', 'variable', 'name'],
        computed : {
            label : function () {
                if (this.name) {
                    return this.name
                } else {
                    return `Variable ${this.variable}`
                }
            }
        }
    }
</script>

<style scoped>

</style>