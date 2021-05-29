<template>
  <div class="d-container">
    <div class="d-container__header">
      <h1>Visit Web</h1>
      <b-button @click="$router.push('/terminal')" class="button-right"
        >GO BACK</b-button
      >
    </div>
    <div class="d-container__body">
      <div class="d-card">
        <div class="d-card__body" style="padding-top: 0 !important">
          <b-field label="Url:">
            <b-select v-model="url" required>
              <option v-for="web in webs" :key="web" :value="web">
                {{ web }}
              </option>
            </b-select>
          </b-field>
          <div class="button-container">
            <b-button @click="visitUrl()">VISIT</b-button>
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
                <td>
                  {{
                    hop.public_ips
                      ? hop.public_ips
                      : hop.terminal_ip_address
                      ? hop.terminal_ip_address
                      : hop.server_ip_address
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios'
export default {
  data() {
    return {
      url: "",
      tracert: false,
      hops: [],
      webs: []
    };
  },
  methods: {
    async visitUrl() {
        const {data} = await axios.post(`http://localhost:3000/terminal/web`, {
            url: this.url,
            origin: this.currentTerminalIp
        });
        this.tracert = true;
        this.hops = data.filter(el => el.nodeType !== "Network").map(el => ({...el.properties, nodeType: el.nodeType}));
    },
  },
  async beforeMount() {
     const {data} = await axios.get(`http://localhost:3000/server/webs`);
     this.webs = data.map(el => el.url);  
  },
  computed: {
      ...mapState(["currentTerminalIp"])
  }
};
</script>