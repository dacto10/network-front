<template>
  <div class="d-container">
    <div class="d-container__header">
      <h2>DEVICE WITH IP {{ currentTerminalIp }}</h2>
      <b-button @click="$router.push('/')" class="button-right"
        >GO BACK</b-button
      >
    </div>
    <div class="d-container__body">
      <div class="d-card">
        <div class="d-card__header">
          <div class="d-title">Mail Inbox:</div>
          <div class="button-container">
            <b-button @click="getArp()">GET ARP CACHE</b-button>
            <b-button @click="$router.push('/email')">SEND EMAIL</b-button>
            <b-button @click="$router.push('/web')">VISIT WEBPAGE</b-button>
          </div>
        </div>
        <div class="d-card__body">
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Body</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="email in emails" :key="email.subject">
                <td>{{ email.origin }}</td>
                <td>{{ email.subject }}</td>
                <td>{{ email.body }}</td>
                <td @click="deleteEmail(email)" class="right">
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
import axios from 'axios';
import { mapState } from "vuex";
//TODO
// creation
// visualization

export default {
  data() {
    return {
      emails: []
    };
  },
  computed: {
    ...mapState(["currentTerminalIp"]),
  },
  methods: {
    async getEmails() {
      const {data} = await axios.get(`http://localhost:3000/terminal/message/${this.currentTerminalIp}`);
      this.emails = data;
    },
    async deleteEmail(email) {
      await axios.delete(`http://localhost:3000/terminal/messages/${email.origin}/${email.subject}/${email.body}`);
      this.getEmails();
    },
    async getArp() {
      await axios.put(`http://localhost:3000/terminal/arp`, {
        origin: this.currentTerminalIp
      });
    }
  },
  beforeMount() {
    this.getEmails();
  }
};
</script>

