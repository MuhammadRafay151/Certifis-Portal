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
      <v-toolbar-title>Certifis</v-toolbar-title>
    </v-toolbar>

    <v-tabs centered optional>
      <v-tab link to="/Contact" exact> Contact</v-tab>
      <v-tab v-if="IsLoggedIn" link to="/ContactDetails" exact
        >Contact Details</v-tab
      >
      <v-tab v-if="IsLoggedIn" link to="/Organization" exact
        >Add Organization</v-tab
      >
      <v-tab link to="/OrgContact" exact>Request Services</v-tab>
    </v-tabs>
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-if="!IsLoggedIn" link to="/login" exact>
          <v-list-item-title v-if="!IsLoggedIn">login</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="IsLoggedIn" v-on:click="signout">
          <v-list-item-title v-if="IsLoggedIn">logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- <v-icon v-on:click="signout">mdi-location-exit</v-icon> -->
  </v-app-bar>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    ...mapGetters("UserState", ["IsLoggedIn"]),
    ...mapState("UserState", ["user"]),
  },
  methods: {
    mini() {
      this.$emit("mini");
    },
    signout() {
      this.$store.dispatch("UserState/signout");
      alert("logout");
    },
  },
};
</script>