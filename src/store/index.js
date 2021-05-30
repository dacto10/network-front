import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    terminals: {},
    servers: {},
    networks: {},
    routers: {},
    webs: {},
    currentTerminalIp: '',
    currentCreation: ''
  },
  mutations: {
    async getData(state) {
      this.state.terminals = await axios.get('http://localhost:3000/terminal/');
      this.state.servers = await axios.get('http://localhost:3000/server/');
      this.state.networks = await axios.get('http://localhost:3000/network/');
      this.state.routers = await axios.get('http://localhost:3000/router/');
      this.state.webs = await axios.get('http://localhost:3000/server/webs');
    },
    setCurrentTerminal(state, ip) {
      this.state.currentTerminalIp = ip;
    },
    setCurrentCreation(state, creation) {
      this.state.currentCreation = creation;
    }
  },
  getters: {
    getTerminals: ({ terminals }) => terminals.data,
    getTerminalIps: ({ terminals }) => terminals.data.map(el => el.terminal_ip_address),
    getServers: ({ servers }) => servers.data,
    getServersIps: ({ servers }) => servers.data.map(el => el.server_ip_address),
    getNetworks: ({ networks }) => networks.data,
    getNetworkIps: ({ networks }) => networks.data.filter(el => el.type === "private").map(el => el.network_ip_address),
    getRouters: ({ routers }) => routers.data,
    getWebs: ({ webs }) => webs.data
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
