<template>
  <v-app>
    <navbar v-on:mini="mini" />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import Navbar from "./components/globals/Navbar.vue";
export default {
  name: "App",

  components: {
    Navbar,
  },
  methods: {
    mini() {
      this.$refs.nd.drawer = true;
    },
  },
};
</script>

