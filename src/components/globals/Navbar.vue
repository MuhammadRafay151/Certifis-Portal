<template>
  <!-- src="https://thumbs.dreamstime.com/z/outline-vector-illustration-mt-nanga-parbat-m-simple-black-version-vector-illustration-mt-nanga-parbat-134516754.jpg" -->

  <v-app-bar app clipped-left light color="white">
    <!-- <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        max-height="1250"
        contain
      ></v-img>
    </template> -->
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mobile"
      v-on:click="mini"
    ></v-app-bar-nav-icon>
    <v-toolbar flat>
    <v-toolbar-title >Certifis</v-toolbar-title>
    </v-toolbar>

  

    <v-tabs  centered optional>
      <v-tab link to="/Contact" exact> Contact</v-tab>
      <v-tab link to="/ContactDetails" exact>Contact Details</v-tab>
      <v-tab link to="/Organization" exact>Add Organization</v-tab>
      <v-tab link to="/OrgContact" exact>Request Services</v-tab>
    </v-tabs>
    <!-- <v-icon v-on:click="signout">mdi-location-exit</v-icon> -->
  </v-app-bar>
</template>
<script>
export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    mini() {
      this.$emit("mini");
    },
    signout() {
      this.$store.dispatch("SignOut");
      alert("logout");
    },
  },
};
</script>