<template>
    <v-container>
        <v-card>
            <v-data-table :headers="headers"
                          :items="Object.values(this.$root.$data.events)"
                          :items-per-page="5"
                          class="elevation-1"
                          item-key="id"
                          :search="search">

                <template v-slot:item.status="{ item }">
                    <v-chip color="green" dark v-if="item.status=='on'">On</v-chip>
                    <v-chip color="red" dark v-else>Off</v-chip>
                </template>
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Events Table</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                        ></v-text-field>
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
                headers: [
                    {text: 'id', value: 'id'},
                    {text: 'nodeId', value: 'nodeId'},
                    {text: 'eventId', value: 'eventId'},
                    {text: 'type', value: 'type'},
                    {text: 'status', value: 'status'},
                    {text: 'count', value: 'count'},
                    {text: 'Actions', value: 'actions', sortable: false }
                ],
                dialog: false,
                nodeComponent: 'noModule'
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
