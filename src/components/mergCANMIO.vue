<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title>CANMIO Module : {{ nodeId }}</v-toolbar-title>
        </v-toolbar>
        <v-tabs>
            <v-tab :key="1">
                Parameters
            </v-tab>
            <v-tab :key="2">
                Variables
            </v-tab>
            <v-tab :key="5">
                IO Channels
            </v-tab>
            <v-tab :key="3" @click="getAllEventVariables" v-if="node.EvCount > 0">
                Events
            </v-tab>
            <v-tab :key="4">
                Debug
            </v-tab>
            <v-tab-item :key="1">
                <NodeParameters v-bind:node="node"></NodeParameters>
            </v-tab-item>
            <v-tab-item :key="2">
                <v-container>
                    <v-row>
                        <NodeVariable v-bind:node="node.node" variable="1" name="Produced Startup Delay"></NodeVariable>
                        <NodeVariable v-bind:node="node.node" variable="2" name="HB Delay"></NodeVariable>
                        <NodeVariable v-bind:node="node.node" variable="3" name="Servo Speed"></NodeVariable>
                        <NodeVariable v-bind:node="node.node" variable="4" name="PORTB Pull-ups Enable"></NodeVariable>
                    </v-row>
                    <v-row v-if="debug">
                        Node Variables {{ node.variables }}
                    </v-row>
                </v-container>
            </v-tab-item>
            <v-tab-item :key="5">
                <v-container>
                    <v-row>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-select
                                    label="Select IO Channel"
                                    v-model="SelectedChannel"
                                    :items="IO_channels"
                                    outlined
                                    @change="updateBaseNV()"
                            ></v-select>
                        </v-card>
                        <!--                        <h3>{{ node.variables[SelectedChannelBaseNV] }}</h3>-->
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-select
                                    v-model="node.variables[SelectedChannelBaseNV]"
                                    label="Channel Type"
                                    :items="nvTypes"
                                    item-text="name"
                                    item-value="id"
                                    outlined
                                    @change="updateNV(node.node,SelectedChannelBaseNV,node.variables[SelectedChannelBaseNV]);updateBaseNV();">
                            </v-select>
                        </v-card>
                    </v-row>
                    <v-container v-show="node.variables[SelectedChannelBaseNV]===0">
                        <v-row>

                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="0"
                                             name="Trigger Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="3"
                                             name="Disable OFF"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="4"
                                             name="Toggle"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="6"
                                             name="Event Inverted"></NodeBitVariable>
                        </v-row>
                        <v-row>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+2"
                                          name="On Delay"></NodeVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+3"
                                          name="Off Delay"></NodeVariable>
                        </v-row>
                    </v-container>
                    <v-container v-show="node.variables[SelectedChannelBaseNV]===1">
                        <v-row>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="0"
                                             name="Trigger Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="2"
                                             name="Startup"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="3"
                                             name="Disable Off"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="5"
                                             name="Action Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="6"
                                             name="Event Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="7"
                                             name="Action Expedited"></NodeBitVariable>
                        </v-row>
                        <v-row>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+2"
                                          name="Pulse Duration"></NodeVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+3"
                                          name="Flash Period"></NodeVariable>
                        </v-row>
                    </v-container>
                    <v-container v-show="node.variables[SelectedChannelBaseNV]===2">
                        <v-row>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="0"
                                             name="Trigger Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="1"
                                             name="Cutoff"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="2"
                                             name="Startup"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="5"
                                             name="Action Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="6"
                                             name="Event Inverted"></NodeBitVariable>
                        </v-row>
                        <v-row>
                            <NodeSliderVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+2"
                                                name="Off Position"></NodeSliderVariable>
                            <NodeSliderVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+3"
                                                name="On Position"></NodeSliderVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+4"
                                          name="OFF to ON Speed"></NodeVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+5"
                                          name="ON to OFF Speed"></NodeVariable>
                        </v-row>
                    </v-container>
                    <v-container v-show="node.variables[SelectedChannelBaseNV]===3">
                        <v-row>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="0"
                                             name="Trigger Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="1"
                                             name="Cutoff"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="2"
                                             name="Startup"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="5"
                                             name="Action Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="6"
                                             name="Event Inverted"></NodeBitVariable>
                        </v-row>
                        <v-row>
                            <NodeSliderVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+2"
                                                name="Upper Position"></NodeSliderVariable>
                            <NodeSliderVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+3"
                                                name="Lower Position"></NodeSliderVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+4"
                                          name="Bounce Coefficient"></NodeVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+5"
                                          name="Pull Speed"></NodeVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+6"
                                          name="Pull pause"></NodeVariable>
                        </v-row>
                    </v-container>
                    <v-container v-show="node.variables[SelectedChannelBaseNV]===4">
                        <v-row>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="0"
                                             name="Trigger Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="1"
                                             name="Cutoff"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="2"
                                             name="Startup"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="5"
                                             name="Action Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="6"
                                             name="Event Inverted"></NodeBitVariable>
                        </v-row>
                        <v-row>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+2"
                                                name="Num Pos"></NodeVariable>
                            <NodeSliderVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+3"
                                                name="Position 1"></NodeSliderVariable>
                            <NodeSliderVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+4"
                                          name="Position 2" v-if="node.variables[SelectedChannelBaseNV+2] > 1"></NodeSliderVariable>
                            <NodeSliderVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+5"
                                          name="Position 3" v-if="node.variables[SelectedChannelBaseNV+2] > 2"></NodeSliderVariable>
                            <NodeSliderVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+6"
                                          name="Position 4" v-if="node.variables[SelectedChannelBaseNV+2] > 3"></NodeSliderVariable>
                        </v-row>
                    </v-container>
                    <v-container v-show="node.variables[SelectedChannelBaseNV]===5">
                        <v-row>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="0"
                                             name="Trigger Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="5"
                                             name="Action Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="6"
                                             name="Event Inverted"></NodeBitVariable>
                        </v-row>
                        <v-row>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+3"
                                                name="Threshold"></NodeVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+4"
                                                name="Hysteresis"></NodeVariable>
                        </v-row>
                    </v-container>
                    <v-container v-show="node.variables[SelectedChannelBaseNV]===6">
                        <v-row>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="0"
                                             name="Trigger Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="5"
                                             name="Action Inverted"></NodeBitVariable>
                            <NodeBitVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+1" bit="6"
                                             name="Event Inverted"></NodeBitVariable>
                        </v-row>
                        <v-row>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+2"
                                          name="Do Setup"></NodeVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+3"
                                                name="Threshold"></NodeVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+3"
                                          name="Hysteresis"></NodeVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+3"
                                          name="Offset H"></NodeVariable>
                            <NodeVariable v-bind:node="node.node" :variable="SelectedChannelBaseNV+3"
                                          name="Offset L"></NodeVariable>
                        </v-row>
                    </v-container>
                    <v-row v-if="debug">
                        Node Variables {{ node.variables }}
                        Base NV {{ SelectedChannelBaseNV }}
                    </v-row>
                </v-container>
            </v-tab-item>
            <v-tab-item :key="3" v-if="node.EvCount > 0">
                <v-data-table
                        :headers="eventHeaders"
                        :items="Object.values(node.actions)"
                        item-key="actionId"
                >
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Events for {{ node.node }}</v-toolbar-title>
                            <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="eventDialog" max-width="500px">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Edit Event </span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container fluid>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="node.parameters[5]"
                                                                  label="Number of Event Variables" readonly>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedEvent.event"
                                                                  label="Event Name" readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="editedEvent.actionId"
                                                                  label="actionId" readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                            v-model="node.actions[editedEvent.actionId].variables[0]"
                                                            label="No of Event Variables" readonly></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row v-for="n in numberEventVariables" :key="n" dense>
                                                <v-col cols="12" sm="6" md="4" v-if="n==1">
                                                    <v-text-field
                                                            label="Value"
                                                            v-model="node.actions[editedEvent.actionId].variables[n]"
                                                            @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      n, parseInt(node.actions[editedEvent.actionId].variables[n]))"
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col v-if="n>1">
                                                    <v-select
                                                            :label="`Action ${n-1}`"
                                                            v-model="node.actions[editedEvent.actionId].variables[n]"
                                                            :items="event_actions"
                                                            item-text="name"
                                                            item-value="id"
                                                            outlined
                                                            @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      n, parseInt(node.actions[editedEvent.actionId].variables[n]))"
                                                    ></v-select>
                                                </v-col>

                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editEvent(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteEvent(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>


            </v-tab-item>
            <v-tab-item :key="4">
                <v-layout row wrap>
                    <h2>mergDefault</h2>

                    <p>Node ID :: {{ nodeId }}</p>
                    <p>Node {{ node }}</p>
                </v-layout>
            </v-tab-item>
        </v-tabs>
    </v-container>

</template>

<script>
    import NodeParameters from './NodeParameters'
    import {nodeMixin} from '../mixins/nodeMixin.js'
    import NodeVariable from './NodeVariable'
    import NodeBitVariable from './NodeBitVariable'
    import NodeSliderVariable from './NodeSliderVariable'

    export default {
        name: "mergDefault",
        mixins: [nodeMixin],
        components: {
            // eslint-disable-next-line
            NodeParameters, NodeVariable, NodeBitVariable, NodeSliderVariable
        },
        data: function () {
            return {
                SelectedChannel: 1,
                SelectedChannelBaseNV: 16,
                flags_array: [],
                event_actions: [],
                NV_types1: [
                    {"id": 0, "name": "Input"},
                    {"id": 1, "name": "Output"},
                    {"id": 2, "name": "Servo"},
                    {"id": 3, "name": "Bounce"},
                    {"id": 4, "name": "Multi"},
                ],
                NV_types2: [
                    {"id": 0, "name": "Input"},
                    {"id": 1, "name": "Output"},
                    {"id": 2, "name": "Servo"},
                    {"id": 3, "name": "Bounce"},
                    {"id": 4, "name": "Multi"},
                    {"id": 5, "name": "Analogue"},
                    {"id": 6, "name": "Magnet"}
                ],
                // IO_channels :{1:16,2:23,3:30,4:37,5:44,6:51,7:58,8:65,9:72,10:79,11:86,12:93,13:100,14:107,15:115,16:121}
                IO_channels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            }
        },
        mounted() {
            this.flags_array = this.getArray(this.node.variables[this.SelectedChannelBaseNV + 1])

            // eslint-disable-next-line no-console
            console.log(`Local Mounted Completed: ${this.nodeId} :: ${this.node.node} :: ${this.node.EvCount}`)
            /*if (this.node.EvCount > 0) {
                this.$socket.emit('NERD', {"nodeId": this.nodeId})
            }*/

        },
        computed: {
            numberEventVariables: function () {
                if (this.node.actions[this.editedEvent.actionId].variables[0] < 19) {
                    return this.node.actions[this.editedEvent.actionId].variables[0] + 2
                } else {
                    return 20
                }
            },
            nvTypes: function() {
                console.log(`Selected Channel ${this.SelectedChannel}`)
                if (this.SelectedChannel < 9) {
                    return this.NV_types1
                } else {
                    return this.NV_types2
                }
            }
        },
        methods: {
            getEventVariables: function (actionId) {
                // eslint-disable-next-line no-console
                console.log(`getEventVariables(${actionId})`)
                //console.log(`getEventVariables() ${this.node.actions[actionId].variables[0]}`)
                //this.EventIndex = [...Array(this.node.actions[actionId].variables[0]).keys()]
                this.EventIndex = this.createSelectIndex(1, this.node.parameters[5])
                //this.EventIndex = [1,2,3]
                //this.SelectedEventVariable = actionId

                /*for (let i = 1; i <= this.node.parameters[5]; i++) {
                    this.$socket.emit('REVAL', {"nodeId": this.node.node, "actionId": actionId, "valueId": i})
                }*/

                this.update_event_actions()

            },
            updateBaseNV: function () {
                this.SelectedChannelBaseNV = 9 + (this.SelectedChannel * 7)
                for (let i = this.SelectedChannelBaseNV; i <= this.SelectedChannelBaseNV + 6; i++) {
                    this.getVariable(i)
                }
                this.flags_array = this.getArray(this.node.variables[this.SelectedChannelBaseNV + 1])
            },
            updateChannelType: function () {
                for (let i = this.SelectedChannelBaseNV; i <= this.SelectedChannelBaseNV + 6; i++) {
                    this.getVariable(i)
                }
                this.flags_array = this.getArray(this.node.variables[this.SelectedChannelBaseNV + 1])
            },
            update_event_actions: function () {
                // eslint-disable-next-line no-console
                console.log(`Update_event_actions`)
                this.event_actions = []
                let x = 1
                let y = 8
                this.event_actions.push({"id": 0, "name": "Do Nothing"})
                for (let i = 16; i <= 121; i = i + 7) { //Get Channel Types

                    if (this.node.variables[i] == 1) {
                        //output = {"id":y, "name":"Ch-" + x +" Changed"}
                        this.event_actions.push({"id": y, "name": `Ch-${x} Changed`})
                        this.event_actions.push({"id": y + 1, "name": `Ch-${x} ON`})
                        this.event_actions.push({"id": y + 2, "name": `Ch-${x} OFF`})
                        this.event_actions.push({"id": y + 3, "name": `Ch-${x} Flash`})
                        this.event_actions.push({"id": y + 4, "name": `Ch-${x} !Changed`})
                    } else if (this.node.variables[i] == 2) {
                        this.event_actions.push({"id": y, "name": `Ch-${x} Changed`})
                        this.event_actions.push({"id": y + 1, "name": `Ch-${x} ON`})
                        this.event_actions.push({"id": y + 2, "name": `Ch-${x} OFF`})
                    } else if (this.node.variables[i] == 3) {
                        this.event_actions.push({"id": y, "name": `Ch-${x} Changed`})
                        this.event_actions.push({"id": y + 1, "name": `Ch-${x} ON`})
                        this.event_actions.push({"id": y + 2, "name": `Ch-${x} OFF`})
                    } else if (this.node.variables[i] == 4) {
                        this.event_actions.push({"id": y, "name": `Ch-${x} AT1`})
                        if (this.node.variables[i+2] > 1) {
                            this.event_actions.push({"id": y + 1, "name": `Ch-${x} AT2`})
                        }
                        if (this.node.variables[i+2] > 2) {
                            this.event_actions.push({"id": y + 2, "name": `Ch-${x} AT3`})
                        }
                        if (this.node.variables[i+2] > 3) {
                            this.event_actions.push({"id": y + 3, "name": `Ch-${x} AT4`})
                        }
                    }
                    x = x + 1
                    y = y + 5
                }
            }
        },
    }
</script>

<style scoped>

</style>