<template>
  <div class="d-container">
    <div class="d-container__header">
      <h1>New Email</h1>
      <b-button @click="$router.push('/terminal')" class="button-right"
        >GO BACK</b-button
      >
    </div>
    <div class="d-container__body">
      <div class="d-card">
        <div class="d-card__body" style="padding-top: 0 !important">
          <b-field label="To:">
            <b-select v-model="email.destination" required>
                <option v-for="terminal in getTerminalIps" :value="terminal" :key="terminal">{{terminal}}</option>
            </b-select>
          </b-field>
          <b-field label="Subject:">
            <b-input v-model="email.message.header" required></b-input>
          </b-field>
          <b-field label="Body:">
            <b-input v-model="email.message.body" type="textarea" required></b-input>
          </b-field>
          <div class="button-container">
            <b-button @click="sendEmail()">SEND</b-button>
          </div>
        </div>
      </div>
      <div class="d-card" v-if="tracert">
        <div class="d-card__header">
          <div class="d-title">Tracert:</div>
        </div>
        <div class="d-card__body">
          <table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Device</th>
                <th>MAC</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hop, index) in hops" :key="hop">
                <td>{{ index + 1 }}</td>
                <td>{{ hop.nodeType }}</td>
                <td>{{ hop.mac }}</td>
                <td>{{ hop.public_ips ? hop.public_ips : hop.terminal_ip_address ? hop.terminal_ip_address : hop.server_ip_address }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
      email: {
        origin: '',
        destination: '',
        message: {
            header: '',
            body: ''
        }
    },
      tracert: false,
      hops: []
    };
  },
  methods: {
    async sendEmail() {
        this.email.origin = this.currentTerminalIp;
        const {data} = await axios.post(`http://localhost:3000/terminal/message`, {
            ...this.email
        });
        
        this.tracert = true;
        this.hops = data.filter(el => el.nodeType !== "Network").map(el => ({...el.properties, nodeType: el.nodeType}));

        console.log(this.hops);
    },
  },
  computed: {
      ...mapState(["currentTerminalIp"]),
      ...mapGetters(["getTerminalIps"])
  }
};
</script>