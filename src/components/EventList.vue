<template>
    <v-container>
        <v-card>
            <v-data-table :headers="headers"
                          :items="events"
                          :items-per-page="5"
                          class="elevation-1"
                          :single-expand="singleExpand"
                          :expanded.sync="expanded"
                          item-key="id"
                          :search="search"
                          show-expand>

                <template v-slot:item.status="{ item }">
                    <v-chip color="green" dark v-if="item.status=='on'">On</v-chip>
                    <v-chip color="red" dark v-else>Off</v-chip>
                </template>
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Events Table</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Teach Event</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                    Teach Event Dialog Box
                                    </v-container>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn color="blue darken-1" text @click="teachEvent(item)">Teach</v-btn>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">More info about event {{ item.id }}</td>
                    <v-btn color="blue darken-1" text @click="sendEvent(item.nodeId, item.eventId, item.type, 'On')">On</v-btn>
                    <v-btn color="blue darken-1" text @click="sendEvent(item.nodeId, item.eventId, item.type, 'Off')">Off</v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>

    export default {
        name: 'event_list',
        data: function () {
            return {
                search: '',
                expanded: [],
                singleExpand: false,
                headers: [
                    {text: 'id', value: 'id'},
                    {text: 'nodeId', value: 'nodeId'},
                    {text: 'eventId', value: 'eventId'},
                    {text: 'type', value: 'type'},
                    {text: 'status', value: 'status'},
                    {text: 'count', value: 'count'},
                    {text: 'Actions', value: 'actions', sortable: false },
                    {text: '', value: 'data-table-expand'}
                ],
                dialog: false,
                nodeComponent: 'noModule'
            }
        },
        computed: {
            events() {
                return Object.values(this.$root.$data.events)
                //return this.$store.state.nodes.data
            },
            debug() {
                return this.$root.$data.debug
            }
        },
        methods: {
            teachEvent(event){
                console.log(`Event ${event}`)
                this.dialog = true
            },
            sendEvent(nodeId,eventId,type, action){
                console.log(`sendEvent ${type} : ${nodeId} : ${eventId} : ${action}`)
            }
        }
    }

</script>
