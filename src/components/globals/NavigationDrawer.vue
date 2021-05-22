<template>
  <v-navigation-drawer
    app
    clipped
    :permanent="!$vuetify.breakpoint.mobile"
    :temporary="$vuetify.breakpoint.mobile"
    v-model="drawer"
    :mini-variant.sync="mini"
    class="elevation-5"
  >
    <v-list>
      <v-list-item >
        <v-list-item-icon>
          <v-icon>mdi-menu</v-icon>
        </v-list-item-icon>
        
        <v-list-item-title>Menu Items</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>
    </v-list>

    <v-list nav dense>
      <v-list-item link to="/Contact" exact>
        <v-list-item-icon>
          <v-icon>mdi-format-list-bulleted-type</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Contact</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/ContactDetails" exact>
        <v-list-item-icon>
          <v-icon>mdi-format-list-bulleted-type</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Contact Details</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/Organization" exact>
        <v-list-item-icon>
          <v-icon>mdi-format-list-bulleted-type</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Add Organization</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/OrgContact" exact>
        <v-list-item-icon>
          <v-icon>mdi-format-list-bulleted-type</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Request Services</v-list-item-title>
      </v-list-item>
      
      
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "NavigationDrawer",
  data() {
    return {
      drawer: false,
      mini: false,
    };
  },
  watch: {
    mini(NewVal) {
      this.$store.commit("SetMiniDrawer", NewVal);
    },
  },
};
</script>