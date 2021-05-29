<template>
  <div class="d-container">
    <div class="d-container__header">
      <h1>New {{ currentCreation }}</h1>
      <b-button @click="$router.push('/')" class="button-right"
        >GO BACK</b-button
      >
    </div>
    <div class="d-container__body">
      <div class="d-card">
        <div class="d-card__body" style="padding-top: 0 !important">
          <b-field label="Network:">
            <b-select v-model="network" @input="setIP()" required>
              <option
                v-for="network in getNetworkIps"
                :value="network"
                :key="network"
              >
                {{ network }}
              </option>
            </b-select>
          </b-field>
          <b-field label="MAC:">
            <b-input v-model="terminal.mac" required></b-input>
          </b-field>
          <b-field label="IP:">
            <b-input
              v-model="terminal.ip"
              required
            ></b-input>
          </b-field>
          <div class="button-container">
            <b-button @click="addDevice()">ADD</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { mapGetters, mapState } from "vuex";
export default {
    data() {
        return {
            terminal: {
                mac: '',
                ip: ''
            },
            network: ''
        }
    },
    computed: {
        ...mapState(["currentCreation"]),
        ...mapGetters(["getNetworkIps"]),
    },
    methods: {
        async addDevice() {
            await axios.post(`http://localhost:3000/terminal/create`, {
                terminal: this.terminal,
                network: this.network
            });

            this.terminal.mac = '';
            this.terminal.ip = '';
            this.network = '';
        },
        setIP() {
          this.terminal.ip = this.network !== '' ? this.network.slice(0, -1) : '';
        }
    }
};
</script>