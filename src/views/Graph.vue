<template>
  <div class="d-container d-container--xl">
    <div class="d-container__header">
      <b-button @click="$router.push('/')" class="button-right"
        >GO BACK</b-button
      >
    </div>
    <d3-network :net-nodes="nodes" :net-links="links" :options="options"></d3-network>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import axios from 'axios';

export default {
  data() {
    return {
      nodes: [],
      links: [],
      options:
      {
        force: 1000,
        nodeSize: 12,
        nodeLabels: true,
        linkWidth: 2
      },
    };
  },
  beforeMount() {
     this.getData();
  },
  components: {
    D3Network
  },
  methods: {
    async getData() {
      const nodes = await axios.get('http://localhost:3000/network/nodes');
      this.nodes = nodes.data.records.map(el => {
        const nodeType = el._fields[0].labels[0];
        return {
        _color: nodeType === "Router" ? "blue" : nodeType === "Server" ? "orange" : nodeType === "Web" ? "yellow" : nodeType === "Network" ? "red" : "Message" ? "gray" : "green",
        name: `${nodeType} - ${nodeType === "Router" || nodeType === "Server" || nodeType === "Terminal" ? el._fields[0].properties.mac : nodeType === "Web" ? el._fields[0].properties.url : nodeType === "Message" ? el._fields[0].properties.header : el._fields[0].properties.network_ip_address}`,
        id: el._fields[0].identity.high !== 0 ? el._fields[0].identity.high : el._fields[0].identity.low !== 0 ? el._fields[0].identity.low : 0,
      }
      });
      const edges = await axios.get('http://localhost:3000/network/edges');
      this.links = edges.data.records.map(el => ({
        sid: el._fields[0].end.high !== 0 ? el._fields[0].end.high : el._fields[0].end.low !== 0 ? el._fields[0].end.low : 0,
        tid: el._fields[0].start.high !== 0 ? el._fields[0].start.high : el._fields[0].start.low !== 0 ? el._fields[0].start.low : 0,
        _color:'pink'
      }));
    }
  }
};
</script>