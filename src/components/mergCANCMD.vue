<template>
    <v-container>
        <v-toolbar>
            <v-toolbar-title>CANCMD Module Type Page : {{ node.node }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <!--<v-btn color="success" v-on:click="QNN" pa-3>QNN()</v-btn>-->
            </v-toolbar-items>
        </v-toolbar>
        <v-tabs>
            <v-tab :key="1">
                Parameters
            </v-tab>
            <v-tab :key="2">
                Variables
            </v-tab>
            <v-tab :key="3" v-if="node.EvCount > 0">
                Debug
            </v-tab>
            <v-tab-item :key="1">
                <v-container>
                    <v-row>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Manufacturer Id" placeholder="Manufacturer Id" readonly
                                          :value=node.parameters[1]></v-text-field>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Module" placeholder="Module" readonly
                                          :value=node.module></v-text-field>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Version" placeholder="Version" readonly
                                          :value=moduleVersion></v-text-field>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Variables" placeholder="Variables" readonly
                                          :value=node.parameters[6]></v-text-field>
                        </v-flex>
                    </v-row>
                    <v-row>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Event Variables" placeholder="Event Variables" readonly
                                          :value=node.parameters[5]></v-text-field>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Supported Events" placeholder="Supported Events" readonly
                                          :value=node.parameters[4]></v-text-field>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Consumer" placeholder="Consumer" readonly
                                          :value=node.consumer></v-text-field>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Producer" placeholder="Producer" readonly
                                          :value=node.producer></v-text-field>
                        </v-flex>
                    </v-row>
                    <v-row>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Bootloader" placeholder="Bootloader" readonly
                                          :value=node.bootloader></v-text-field>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Consume own events" placeholder="Consume own events"
                                          readonly
                                          :value=node.coe></v-text-field>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Parameters" placeholder="Parameters" readonly
                                          :value=node.parameters[0]></v-text-field>
                        </v-flex>
                    </v-row>

                </v-container>
                <h3>Flags</h3>
                <v-container>
                    <v-row>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Parameter Flags" placeholder="Flags"
                                          readonly
                                          :value=node.flags></v-text-field>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-text-field label="Variables Flags" placeholder="Flags"
                                          readonly
                                          :value=node.parameters[8]></v-text-field>
                        </v-flex>
                    </v-row>
                </v-container>
            </v-tab-item>
            <v-tab-item :key="2">
                <v-container>
                    <v-row>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Command Station Number"
                                    v-model="node.variables[1]"
                                    readonly
                            ></v-text-field>
                        </v-flex>
                    </v-row>
                    <v-row>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Silent`"
                                    :value=1
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Steal`"
                                    :value=2
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Share`"
                                    :value=4
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Event Reset`"
                                    :value=8
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Map Event`"
                                    :value=16
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Stop on Timeout`"
                                    :value=32
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Start of Day`"
                                    :value=64
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="userFlags"
                                    :label="`Enable Shuttles`"
                                    :value=128
                                    @change="updateNV(node.node,2,sumArray(userFlags))"
                            ></v-checkbox>
                        </v-flex>
                    </v-row>
                    <v-row>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Jumper Control`"
                                    :value=1
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Main Output on board`"
                                    :value=2
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Analogue Detection`"
                                    :value=4
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`ZTC Mode`"
                                    :value=8
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="operationFlags"
                                    :label="`Track off with stop all`"
                                    :value=8
                                    @change="updateNV(node.node,3,sumArray(operationFlags))"
                            ></v-checkbox>
                        </v-flex>
                    </v-row>
                    <v-row>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Priority Packets`"
                                    :value=1
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Refresh Speed Packets`"
                                    :value=2
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Refresh Function Packets`"
                                    :value=4
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Service Mode Packets`"
                                    :value=4
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-flex>
                        <v-flex xs6 md3 pa-3>
                            <v-checkbox
                                    v-model="debugFlags"
                                    :label="`Accessory Packets`"
                                    :value=8
                                    @change="updateNV(node.node,4,sumArray(debugFlags))"
                            ></v-checkbox>
                        </v-flex>
                    </v-row>
                    <v-row>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Walkabout Timeout (sec)"
                                    v-model="node.variables[5]"
                                    outlined
                                    @change="updateNV(node.node,5,node.variables[5])"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Main Current Limit"
                                    v-model="node.variables[6]"
                                    outlined
                                    @change="updateNV(node.node,6,node.variables[6])"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Service Current Limit"
                                    v-model="node.variables[7]"
                                    outlined
                                    @change="updateNV(node.node,7,node.variables[7])"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Service Multiplier"
                                    v-model="node.variables[8]"
                                    outlined
                                    @change="updateNV(node.node,8,node.variables[8])"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Increase for ACK Pulses"
                                    v-model="node.variables[9]"
                                    outlined
                                    @change="updateNV(node.node,9,node.variables[9])"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Shhot through delay"
                                    v-model="node.variables[10]"
                                    outlined
                                    @change="updateNV(node.node,10,node.variables[10])"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Increase for ACK Pulses"
                                    v-model="node.variables[9]"
                                    outlined
                                    @change="updateNV(node.node,9,node.variables[9])"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Send Current Interval"
                                    v-model="node.variables[13]"
                                    outlined
                                    @change="updateNV(node.node,13,node.variables[13])"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="SOD Delay"
                                    v-model="node.variables[14]"
                                    outlined
                                    @change="updateNV(node.node,14,node.variables[14])"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Shuttle Honk Interval"
                                    v-model="node.variables[15]"
                                    outlined
                                    @change="updateNV(node.node,15,node.variables[15])"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 pa-3>
                            <v-text-field
                                    label="Maximum Speed"
                                    v-model="node.variables[16]"
                                    outlined
                                    @change="updateNV(node.node,16,node.variables[16])"
                            ></v-text-field>
                        </v-flex>
                    </v-row>
                    <v-layout v-if="debug">
                        {{ node.variables }}
                    </v-layout>
                </v-container>
            </v-tab-item>

            <v-tab-item :key="3" v-if="node.EvCount > 0">
                <v-layout row wrap>
                    <h2>mergDefault</h2>
                    <p>Node ID :: {{ this.$store.state.nodes.data[this.$store.state.selected_node.node].node }}</p>
                    <p>Selected Node ID :: {{ this.$store.state.selected_node.node }}</p>
                    <p>Selected Node {{ selected_node}} </p>
                    <p>Node {{ node }}</p>
                </v-layout>
            </v-tab-item>
        </v-tabs>
        <div v-if="debug">
            <h3>Raw Node Data</h3>
            <div>
                <p>{{ node }}</p>
            </div>
            <h3>Raw Edited Event</h3>
            <div>
                <p>{{ editedEvent }}</p>
            </div>
        </div>
    </v-container>

</template>

<script>
    export default {
        name: "mergDefault",
        //props: ['node'],
        data: function () {
            return {
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
            for (let i = 1; i <= this.$store.state.selected_node.parameters[0]; i++) {
                this.$socket.emit('RQNPN', {"nodeId": this.$store.state.selected_node.node, "parameter": i})
            }
            for (let i = 1; i <= 16; i++) { //Get initial setup NVs
                this.$socket.emit('NVRD', {"nodeId": this.$store.state.selected_node.node, "variableId": i})
            }
            //this.$socket.emit('NVRD', {"nodeId": this.$store.state.selected_node.node, "variableId": 1})
            //this.$socket.emit('NERD', {"nodeId": this.$store.state.selected_node.node})
            this.userFlags = this.getArray(this.$store.state.selected_node.variables[2])
            this.operationFlags = this.getArray(this.$store.state.selected_node.variables[3])
            this.debugFlags = this.getArray(this.$store.state.selected_node.variables[4])
        },
        watch: {
            userVariable() {
                // eslint-disable-next-line no-console
                //console.log(`Watch Flags Variables : ${this.node.node} ::  ${this.node.variables[this.SelectedChannelBaseNV+1]} :: ${this.SelectedChannelBaseNV+1}`)

                this.userFlags = this.getArray(this.$store.state.selected_node.variables[2])
            },
            operationVariable() {
                this.operationFlags = this.getArray(this.$store.state.selected_node.variables[3])
            },
            debugVariable() {
                this.debugFlags = this.getArray(this.$store.state.selected_node.variables[4])
            }
        },
        computed: {
            debug: function () {
                return this.$store.state.debug
            },
            node: function () {
                return this.$store.state.nodes.data[this.$store.state.selected_node.node]
            },
            selected_node: function () {
                return this.$store.state.selected_node
            },
            moduleVersion: function () {
                return `${this.node.parameters[7]}.${String.fromCharCode(this.node.parameters[2])}`
            },
            VariableIndexes: function () {
                return [...Array(this.$store.state.selected_node.parameters[6] + 1).keys()]
                //return [...Array(this.$store.state.selected_node.parameters[0] + 1).keys()]
            },
            userVariable: function () {
                return this.$store.state.selected_node.variables[2]
            },
            operationVariable: function () {
                return this.$store.state.selected_node.variables[3]
            },
            debugVariable: function () {
                return this.$store.state.selected_node.variables[4]
            }
        },
        methods: {
            getVariable: function (id) {
                this.$socket.emit('NVRD', {"nodeId": this.node.node, "variableId": id})
                // eslint-disable-next-line no-console
                console.log('getVariable : ' + id)
            },
            updateNV: function (node_id, variableId, variableValue) {
                // eslint-disable-next-line no-console
                console.log(`updateNV(${variableId},${variableValue})`)
                this.$socket.emit('NVSET', {
                    "nodeId": this.node.node,
                    "variableId": variableId,
                    "variableValue": variableValue
                })
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
                this.$socket.emit('EVLRN', {
                    "nodeId": this.node.node,
                    "actionId": actionId,
                    "eventName": eventName,
                    "eventId": eventId,
                    "eventVal": eventVal
                })
            },
            getEventVariables: function (actionId) {
                // eslint-disable-next-line no-console
                console.log(`getEventVariables(${actionId})`)
                //console.log(`getEventVariables() ${this.node.actions[actionId].variables[0]}`)
                //this.EventIndex = [...Array(this.node.actions[actionId].variables[0]).keys()]
                this.EventIndex = this.createSelectIndex(1, this.node.parameters[5])
                //this.EventIndex = [1,2,3]
                //this.SelectedEventVariable = actionId
                for (let i = 1; i <= this.node.parameters[5]; i++) {
                    this.$socket.emit('REVAL', {"nodeId": this.node.node, "actionId": actionId, "valueId": i})
                }

            },
            getAllEventVariables: function () {
                // eslint-disable-next-line no-console
                console.log(`getAllEventVariables() : ${Object.keys(this.node.actions).length}`)
                if (Object.keys(this.node.actions).length != 0) {
                    for (let i = 1; i <= Object.keys(this.node.actions).length; i++) {
                        this.getEventVariables(i)
                    }
                }
            },
            deleteEvent: function (event) {
                this.$socket.emit('EVULN', {"nodeId": this.node.node, "eventName": event})
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