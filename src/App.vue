<template>
  <div id="app">
     <Navbar />
    <div class="page">
      <div class="home">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
export default {
  components: {
    Navbar
  }
}
</script>
