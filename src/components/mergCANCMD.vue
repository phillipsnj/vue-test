<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title>CANCMD : {{ nodeId }}</v-toolbar-title>
        </v-toolbar>
        <v-tabs>
            <v-tab :key="1">
                Parameters
            </v-tab>
            <v-tab :key="2">
                Variables
            </v-tab>
            <v-tab :key="3" @click="getAllEventVariables" v-if="node.EvCount > 0">
                Events
            </v-tab>
            <v-tab :key="4">
                Debug
            </v-tab>
            <v-tab-item :key="1">
                <v-container>
                    <v-row>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Manufacturer Id" placeholder="Manufacturer Id" readonly
                                          :value=node.parameters[1]></v-text-field>
                        </v-card>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Module" placeholder="Module" readonly
                                          :value=node.module></v-text-field>
                        </v-card>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Version" placeholder="Version" readonly
                                          :value=moduleVersion></v-text-field>
                        </v-card>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Variables" placeholder="Variables" readonly
                                          :value=node.parameters[6]></v-text-field>
                        </v-card>
                    </v-row>
                    <v-row>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Event Variables" placeholder="Event Variables" readonly
                                          :value=node.parameters[5]></v-text-field>
                        </v-card>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Supported Events" placeholder="Supported Events" readonly
                                          :value=node.parameters[4]></v-text-field>
                        </v-card>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Consumer" placeholder="Consumer" readonly
                                          :value=node.consumer></v-text-field>
                        </v-card>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Producer" placeholder="Producer" readonly
                                          :value=node.producer></v-text-field>
                        </v-card>
                    </v-row>
                    <v-row>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Bootloader" placeholder="Bootloader" readonly
                                          :value=node.bootloader></v-text-field>
                        </v-card>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Consume own events" placeholder="Consume own events"
                                          readonly
                                          :value=node.coe></v-text-field>
                        </v-card>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Parameters" placeholder="Parameters" readonly
                                          :value=node.parameters[0]></v-text-field>
                        </v-card>
                    </v-row>

                </v-container>
                <h3>Flags</h3>
                <v-container>
                    <v-row>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Parameter Flags" placeholder="Flags"
                                          readonly
                                          :value=node.flags></v-text-field>
                        </v-card>
                        <v-card class="xs6 md3 pa-3" flat>
                            <v-text-field label="Variables Flags" placeholder="Flags"
                                          readonly
                                          :value=node.parameters[8]></v-text-field>
                        </v-card>
                    </v-row>
                </v-container>
                <v-layout v-if="debug">
                    Node Parameters : {{ node.parameters }}
                </v-layout>
            </v-tab-item>
            <v-tab-item :key="2">
                <v-container>
                    <v-row>
                        <v-card class="pa-2" flat min-width="100" max-width="200">
                            <v-text-field
                                    label="Command Station Number"
                                    v-model="node.variables[1]"
                                    readonly
                            ></v-text-field>
                        </v-card>
                    </v-row>
                    <v-row>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    label="Silent"
                                    :value=1
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox min-width="100"
                                        v-model="userFlags"
                                        label="Steal"
                                        :value=2
                                        @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Share`"
                                    :value=4
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Event Reset`"
                                    :value=8
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Map Event`"
                                    :value=16
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Stop on Timeout`"
                                    :value=32
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Start of Day`"
                                    :value=64
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Enable Shuttles`"
                                    :value=128
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-card>
                    </v-row>
                    <v-row>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Jumper Control`"
                                    :value=1
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Main Output on board`"
                                    :value=2
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Analogue Detection`"
                                    :value=4
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`ZTC Mode`"
                                    :value=8
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Track off with stop all`"
                                    :value=8
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-card>
                    </v-row>
                    <v-row>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Priority Packets`"
                                    :value=1
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Refresh Speed Packets`"
                                    :value=2
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Refresh Function Packets`"
                                    :value=4
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Service Mode Packets`"
                                    :value=4
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Accessory Packets`"
                                    :value=8
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-card>
                    </v-row>
                    <v-row>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Walkabout Timeout (sec)"
                                    v-model="node.variables[5]"
                                    outlined
                                    @change="updateNV(node.node,5,node.variables[5])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Main Current Limit"
                                    v-model="node.variables[6]"
                                    outlined
                                    @change="updateNV(node.node,6,node.variables[6])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Service Current Limit"
                                    v-model="node.variables[7]"
                                    outlined
                                    @change="updateNV(node.node,7,node.variables[7])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Service Multiplier"
                                    v-model="node.variables[8]"
                                    outlined
                                    @change="updateNV(node.node,8,node.variables[8])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Increase for ACK Pulses"
                                    v-model="node.variables[9]"
                                    outlined
                                    @change="updateNV(node.node,9,node.variables[9])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field readonly
                                    label="Shoot through delay"
                                    v-model="node.variables[10]"
                                    outlined
                                    @change="updateNV(node.node,10,node.variables[10])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field readonly
                                    label="Mapped Node"
                                    v-model="node.variables[11]"
                                    outlined
                                    @change="updateNV(node.node,11,node.variables[9])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Send Current Interval"
                                    v-model="node.variables[13]"
                                    outlined
                                    @change="updateNV(node.node,13,node.variables[13])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="SOD Delay"
                                    v-model="node.variables[14]"
                                    outlined
                                    @change="updateNV(node.node,14,node.variables[14])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Shuttle Honk Interval"
                                    v-model="node.variables[15]"
                                    outlined
                                    @change="updateNV(node.node,15,node.variables[15])"
                            ></v-text-field>
                        </v-card>
                        <v-card class="pa-2" flat min-width="200">
                            <v-text-field
                                    label="Maximum Speed"
                                    v-model="node.variables[16]"
                                    outlined
                                    @change="updateNV(node.node,16,node.variables[16])"
                            ></v-text-field>
                        </v-card>
                    </v-row>
                    <v-layout v-if="debug">
                        Node Variables {{ node.variables }}
                    </v-layout>
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
                                        <span class="headline">Edit Event</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
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
                                                                  label="actionId"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row v-for="n in node.parameters[5]" :key="n" dense>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                            label="Variable"
                                                            :value="n"
                                                            readonly
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                            label="Value"
                                                            v-model="node.actions[editedEvent.actionId].variables[n]"
                                                            @change="updateEV(node.node, node.actions[editedEvent.actionId].event, node.actions[editedEvent.actionId].actionId,
                                                      n, parseInt(node.actions[editedEvent.actionId].variables[n]))"
                                                    >
                                                    </v-text-field>
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
    export default {
        name: "mergDefault",
        //props: ['node'],
        data: function () {
            return {
                nodeId: 0,
                eventDialog: false,
                editedEvent: {event: "0", variables: [], actionId: 1},
                SelectedVariable: 1,
                SelectedEvent: 1,
                SelectedEventVariable: 1,
                //VariableIndexes: [...Array(node.parameters[6] + 1).keys()],
                EventIndex: [1],
                expand: false,
                eventHeaders: [
                    {
                        text: 'Event ID',
                        align: 'left',
                        value: 'event'
                    }, {
                        text: "Action ID",
                        value: 'actionId'
                    }, {text: 'Actions', value: 'actions', sortable: false}
                ],
                userFlags: [],
                operationFlags: [],
                debugFlags: []
            }
        },
        mounted() {
            // eslint-disable-next-line no-console
            //console.log(`mounted : ${this.nodeId} :: ${this.node.node} :: ${this.node.EvCount}`)
            this.nodeId = this.$root.$data.selected_node_id
            /*for (let i = 1; i <= this.node.parameters[0]; i++) {
                this.$socket.emit('RQNPN', {"nodeId": this.node.node, "parameter": i})
            }*/
            //this.$socket.emit('NVRD', {"nodeId": this.nodeId, "variableId": 1})
            this.getVariable(1)

            // eslint-disable-next-line no-console
            console.log(`Mounted Completed: ${this.nodeId} :: ${this.node.node} :: ${this.node.EvCount}`)
            /*if (this.node.EvCount > 0) {
                this.$socket.emit('NERD', {"nodeId": this.nodeId})
            }*/
            this.userFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[2])
            this.operationFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[3])
            this.debugFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[4])

        },
        watch: {
            userVariable() {
                // eslint-disable-next-line no-console
                console.log(`Watch Flags Variables : ${this.$root.$data.nodes[this.nodeId].node} ::  ${this.node.variables[this.SelectedChannelBaseNV + 1]} :: ${this.SelectedChannelBaseNV + 1}`)

                this.userFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[2])
            },
            operationVariable() {
                this.operationFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[3])
            },
            debugVariable() {
                this.debugFlags = this.getArray(this.$root.$data.nodes[this.nodeId].variables[4])
            }
        },
        computed: {
            debug: function () {
                return this.$root.$data.debug
            },
            node: function () {
                return this.$root.$data.nodes[this.$root.$data.selected_node_id]
            },
            selected_node: function () {
                return this.$root.$data.selected_node_id
            },
            moduleVersion: function () {
                return `${this.node.parameters[7]}.${String.fromCharCode(this.node.parameters[2])}`
            },
            VariableIndexes: function () {
                return [...Array(this.node.parameters[6] + 1).keys()]
                //return [...Array(this.$store.state.selected_node.parameters[0] + 1).keys()]
            }
        },
        methods: {
            getVariable: function (id) {
                //this.$socket.emit('NVRD', {"nodeId": this.node.node, "variableId": id})
                // eslint-disable-next-line no-console
                console.log('getVariable : ' + id)
            },
            updateNV: function (node_id, variableId, variableValue) {
                // eslint-disable-next-line no-console
                console.log(`updateNV(${variableId},${variableValue})`)
                /*this.$socket.emit('NVSET', {
                    "nodeId": this.node.node,
                    "variableId": variableId,
                    "variableValue": variableValue
                })*/
            },
            createSelectIndex: function (start, finish) {
                let output = []
                for (let i = start; i <= finish; i++) {
                    output.push(i)
                }
                return output
            },
            editEvent: function (item) {
                // eslint-disable-next-line no-console
                console.log(`editEvent(${item.event})`)
                this.getEventVariables(item.actionId)
                this.eventDialog = true
                this.editedEvent = item

            },
            updateEV: function (nodeId, eventName, actionId, eventId, eventVal) {
                // eslint-disable-next-line no-console
                console.log(`editEvent(${nodeId},${eventName},${actionId},${eventId},${eventVal}`)
                /*this.$socket.emit('EVLRN', {
                    "nodeId": this.node.node,
                    "actionId": actionId,
                    "eventName": eventName,
                    "eventId": eventId,
                    "eventVal": eventVal
                })*/
            },
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

            },
            getAllEventVariables: function () {
                // eslint-disable-next-line no-console
                //console.log(`getAllEventVariables() : ${Object.keys(this.node.actions).length}`)
                for (let i = 1; i <= Object.keys(this.node.actions).length; i++) {
                    this.getEventVariables(i)
                }
                // eslint-disable-next-line no-console
                console.log(`getAllEventVariables() Completed : ${Object.keys(this.node.actions).length}`)
            },
            deleteEvent: function (event) {
                // eslint-disable-next-line no-console
                console.log(`deleteEvent : ${this.node.node} : ${event}`)
                //this.$socket.emit('EVULN', {"nodeId": this.node.node, "eventName": event})
            },
            getArray: function (byteArray) {
                let output = []
                output.push(byteArray & 1 ? 1 : 0)
                output.push(byteArray & 2 ? 2 : 0)
                output.push(byteArray & 4 ? 4 : 0)
                output.push(byteArray & 8 ? 8 : 0)
                output.push(byteArray & 16 ? 16 : 0)
                output.push(byteArray & 32 ? 32 : 0)
                output.push(byteArray & 64 ? 64 : 0)
                output.push(byteArray & 128 ? 128 : 0)
                // eslint-disable-next-line no-console
                console.log(`Method Set Flags Array : ${byteArray} ::  ${output}`)
                return output
            },
            sumArray: function (arr) {
                return arr
                    .map(function (elt) { // assure the value can be converted into an integer
                        return /^\d+$/.test(elt) ? parseInt(elt) : 0;
                    })
                    .reduce(function (a, b) { // sum all resulting numbers
                        return a + b
                    })
            }
        },
    }
</script>

<style scoped>

</style>