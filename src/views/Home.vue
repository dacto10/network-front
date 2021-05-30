<template>
  <div class="d-container">
    <div class="d-container__body">
      <div class="button-container">
        <b-button @click="importData()">IMPORT</b-button>
        <b-button @click="clearData()">CLEAR</b-button>
        <b-button @click="$router.push('/graph')">VISUALIZE</b-button>
      </div>
      <div class="d-card">
        <div class="d-card__header">
          <div class="d-title">Available Networks:</div>
          <div class="button-container">
            <b-button @click="() => {
              setCurrentCreation('Network')
              $router.push('/form')  
            }">ADD NETWORK</b-button>
          </div>
        </div>
        <div class="d-card__body">
          <table>
            <thead>
              <tr>
                <th>IP Address</th>
                <th>Mask</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="network in getNetworks" :key="network.network_ip_address">
                <td>{{ network.network_ip_address }}</td>
                <td>{{ network.mask }}</td>
                <td>{{ network.type }}</td>
                <td @click="deleteNetwork(network.network_ip_address)" class="right">
                  <b-icon pack="fas" icon="times" class="remove-icon"></b-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="d-card">
        <div class="d-card__header">
          <div class="d-title">Available Routers:</div>
          <div class="button-container">
            <b-button @click="() => {
              setCurrentCreation('Router')
              $router.push('/form')  
            }">ADD ROUTER</b-button>
          </div>
        </div>
        <div class="d-card__body">
          <table>
            <thead>
              <tr>
                <th>MAC</th>
                <th>Private IP</th>
                <th>Public IPs</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="router in getRouters" :key="router.mac">
                <td>{{ router.mac }}</td>
                <td>{{ router.private_ip ? router.private_ip : "-" }}</td>
                <td>
                  {{
                    router.public_ips.length !== 0
                      ? router.public_ips.reduce((el, acc) => acc + `, ${el}`)
                      : "-"
                  }}
                </td>
                <td @click="deleteRouter(router.mac)" class="right">
                  <b-icon pack="fas" icon="times" class="remove-icon"></b-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="d-card">
        <div class="d-card__header">
          <div class="d-title">Available Servers:</div>
          <div class="button-container">
            <b-button @click="() => {
              setCurrentCreation('Server')
              $router.push('/form')  
            }">ADD SERVER</b-button>
          </div>
        </div>
        <div class="d-card__body">
          <table>
            <thead>
              <tr>
                <th>MAC</th>
                <th>IP Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="server in getServers" :key="server.mac">
                <td>{{ server.mac }}</td>
                <td>{{ server.server_ip_address }}</td>
                <td @click="deleteServer(server.mac)" class="right">
                  <b-icon pack="fas" icon="times" class="remove-icon"></b-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="d-card">
        <div class="d-card__header">
          <div class="d-title">Available Terminals:</div>
          <div class="button-container">
            <b-button @click="() => {
              setCurrentCreation('Terminal')
              $router.push('/form')  
            }">ADD TERMINAL</b-button>
          </div>
        </div>
        <div class="d-card__body">
          <table>
            <thead>
              <tr>
                <th>MAC</th>
                <th>IP Address</th>
                <th>ARP CACHE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="terminal in getTerminals" :key="terminal.mac">
                <td>{{ terminal.mac }}</td>
                <td>{{ terminal.terminal_ip_address }}</td>
                <td>
                  {{
                    terminal.arp_cache.length !== 0
                      ? terminal.arp_cache.reduce((el, acc) => acc + `, ${el}`)
                      : "-"
                  }}
                </td>
                <td class="right">
                  <button @click="() => {
                    setCurrentTerminal(terminal.terminal_ip_address)
                    $router.push('/terminal');  
                  }" class="no-style"><b-icon pack="fas" icon="plus"  class="standart-icon"></b-icon></button>
                  <button @click="deleteTerminal(terminal.mac)" class="no-style"><b-icon pack="fas" icon="times" class="remove-icon"></b-icon></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="d-card">
        <div class="d-card__header">
          <div class="d-title">Available Webs:</div>
          <div class="button-container">
            <b-button @click="() => {
              setCurrentCreation('Web')
              $router.push('/form')  
            }">ADD WEB</b-button>
          </div>
        </div>
        <div class="d-card__body">
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Server IP</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="web in getWebs" :key="web.url">
                <td>{{ web.url }}</td>
                <td>{{ web.server_ip_address }}</td>
                <td @click="deleteWeb(web.url)" class="right">
                  <b-icon pack="fas" icon="times" class="remove-icon"></b-icon>
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
import { mapGetters, mapMutations } from "vuex";
import axios from 'axios';

export default {
  name: "Home",
  data() {
    return {
      isDataImported: false,
      axios
    }
  },
  components: {},
  computed: {
    ...mapGetters([
      "getTerminals",
      "getRouters",
      "getNetworks",
      "getServers",
      "getWebs",
    ]),
  },
  methods: {
    async deleteNetwork(ip) {
      await this.axios.delete(`http://localhost:3000/network/${ip}`);
      this.getData();
    },
    async deleteTerminal(mac) {
      await this.axios.delete(`http://localhost:3000/terminal/${mac}`);
      this.getData();
    },
    async deleteServer(mac) {
      await this.axios.delete(`http://localhost:3000/server/${mac}`);
      this.getData();
    },
    async deleteRouter(mac) {
      await this.axios.delete(`http://localhost:3000/router/${mac}`);
      this.getData();
    },
    async deleteWeb(url) {
      await this.axios.delete(`http://localhost:3000/server/webs/delete/${url}`);
      this.getData();
    },
    async importData() {
      await this.axios.post('http://localhost:3000/terminal/');
      await this.axios.post('http://localhost:3000/network/');
      await this.axios.post('http://localhost:3000/server/');
      await this.axios.post('http://localhost:3000/router/');
      await this.axios.post('http://localhost:3000/network/connect');
      this.getData();
    },
    async clearData() {
      await this.axios.delete('http://localhost:3000/network/clear/');
      this.getData();
    },
    ...mapMutations(["getData", "setCurrentTerminal", "setCurrentCreation"]),
  },
  beforeMount() {
    this.getData();
  },
};
</script>
