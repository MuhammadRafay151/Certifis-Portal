<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 mt-10>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                name="email"
                label="Email"
                v-model="email"
                required
                outlined
                type="text"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                outlined
                label="Password"
                required
                v-model="password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="Login">
              <span v-if="show">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                Authenticating...
              </span>
              <span v-else>Login</span></v-btn
            >
            <p class="mt-1 text-danger" v-if="message">{{ message }}</p>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "login",
  data: function () {
    return {
      email: "",
      password: "",
      show: false,
      message: "",
    };
  },
  methods: {
    Login() {
      this.show = true;
      this.$store
        .dispatch("UserState/authenticate", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.show = false;
          this.$router.push("/contact");
        })
        .catch((err) => {
          this.show = false;
          if (!err.response) {
            this.message = "no network";
          } else if (
            err.response.status == 401 ||
            err.response.status == 403 ||
            err.response.status == 409
          ) {
            console.log(err.response.data);
            this.message = err.response.data.message;
          }
        });
    },
  },
  created() {
    if (this.$route.query.session_expire === "true") {
      this.message = "Session Expired";
    }
  },
};
</script>