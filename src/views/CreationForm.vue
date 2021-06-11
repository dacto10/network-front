<template>
  <div class="d-container">
    <div class="d-container__header">
      <h1>New {{ currentCreation }}</h1>
      <b-button @click="$router.push('/')" class="button-right"
        >GO BACK</b-button
      >
    </div>
    <div class="d-container__body" v-if="currentCreation === 'Terminal'">
      <div class="d-card">
        <div class="d-card__body" style="padding-top: 0 !important">
          <b-field label="Network:">
            <b-select v-model="terminal.network" @input="setIP()" required>
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
    <div class="d-container__body" v-if="currentCreation === 'Router'">
      <div class="d-card">
        <div class="d-card__body" style="padding-top: 0 !important">
          <b-field label="Private IP:">
            <b-input v-model="router.private_ip" required></b-input>
          </b-field>
          <b-field label="MAC:">
            <b-input v-model="router.mac" required></b-input>
          </b-field>
          <b-field label="Public IP:">
            <b-input
              v-model="router.public_ips"
              required
            ></b-input>
          </b-field>
          <div class="button-container">
            <b-button @click="addRouter()">ADD</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-container__body" v-if="currentCreation === 'Network'">
      <div class="d-card">
        <div class="d-card__body" style="padding-top: 0 !important">
          <b-field label="IP:">
            <b-input v-model="network.ip" required></b-input>
          </b-field>
          <b-field label="Type:">
            <b-select
              v-model="network.type"
              required
            >
              <option  v-for="type in types" :key="type">{{ type }}</option>
            </b-select>
          </b-field>
          <div class="button-container">
            <b-button @click="addNetwork()">ADD</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-container__body" v-if="currentCreation === 'Server'">
      <div class="d-card">
        <div class="d-card__body" style="padding-top: 0 !important">
          <b-field label="Network:">
            <b-select v-model="server.network" @input="setIPServer()" required>
              <option
                v-for="network in getNetworkIps"
                :value="network"
                :key="network"
              >
                {{ network }}
              </option>
            </b-select>
          </b-field>
          <b-field label="IP:">
            <b-input v-model="server.ip" required></b-input>
          </b-field>
          <b-field label="MAC:">
            <b-input
              v-model="server.mac"
              required
            >
            </b-input>
          </b-field>
          <div class="button-container">
            <b-button @click="addServer()">ADD</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-container__body" v-if="currentCreation === 'Web'">
      <div class="d-card">
        <div class="d-card__body" style="padding-top: 0 !important">
          <b-field label="Network:">
            <b-select v-model="web.server_ip" @input="setIPServer()" required>
              <option
                v-for="ip in getServersIps"
                :value="ip"
                :key="ip"
              >
                {{ ip }}
              </option>
            </b-select>
          </b-field>
          <b-field label="URL:">
            <b-input v-model="web.url" required></b-input>
          </b-field>
          <div class="button-container">
            <b-button @click="addWeb()">ADD</b-button>
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
                ip: '',
                network: ''
            },
            router: {
              mac: '',
              private_ip: '',
              public_ips: ''
            },
            server: {
              mac: '',
              ip: ''
            },
            network: {
              ip: '',
              mask: '255.255.255.0',
              type: ''
            },
            web: {
              url: '',
              server_ip: ''
            },
            types: ["private", "public"]
        }
    },
    computed: {
        ...mapState(["currentCreation"]),
        ...mapGetters(["getNetworkIps", "getServersIps"]),
    },
    methods: {
        async addDevice() {
            await axios.post(`http://localhost:3000/terminal/create`, {
                terminal: this.terminal,
            });
            await axios.post('http://localhost:3000/network/connect');
            this.terminal.mac = '';
            this.terminal.ip = '';
            this.terminal.network = '';
        },
        async addRouter() {
          this.router.public_ips = [this.router.public_ips]
          await axios.post(`http://localhost:3000/router/create`, {
            router: this.router
          });
          await axios.post('http://localhost:3000/network/connect');
          this.router.mac = '';
          this.router.private_ip = '';
          this.router.public_ips.length = '';
        },
        async addServer() {
          await axios.post(`http://localhost:3000/server/create`, {
            server: this.server
          });
          await axios.post('http://localhost:3000/network/connect');
          this.server.mac = '';
          this.server.ip = '';
          this.server.network = '';
        },
        async addNetwork() {
          await axios.post(`http://localhost:3000/network/create`, {
            network: this.network
          });
          await axios.post('http://localhost:3000/network/connect');
          this.network.ip = '';
          this.network.type = '';
        },
        async addWeb() {
          await axios.post(`http://localhost:3000/server/webs`, {
            web: this.web
          });
          await axios.post('http://localhost:3000/network/connect');
          this.web.url = '';
          this.web.server_ip = '';
        },
        setIP() {
          this.terminal.ip = this.terminal.network !== '' ? this.terminal.network.slice(0, -1) : '';
        },
        setIPServer() {
          this.server.ip = this.server.network !== '' ? this.server.network.slice(0, -1) : '';
        },
    }
};
</script>