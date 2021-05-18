<template>
  <v-dialog v-if="dialog" v-model="dialog" width="500" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Confirmation</span>
      </v-card-title>

      <v-card-text class="mt-3">
        {{ msg }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="No"> Cancel </v-btn>
        <v-btn color="primary" @click="Yes"> Yes </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ConfirmBox",
  data: () => {
    return {
      obj: null,
      msg: "",
      dialog: false,
    };
  },
  methods: {
    Show(msg, object) {
      this.msg = msg;
      this.obj = object;
      this.dialog = true;
    },
    Yes() {
      this.$emit("yes", this.obj);
      this.Reset();
    },
    No() {
      this.$emit("no");
      this.Reset();
    },
    Reset() {
      this.dialog = false;
      this.msg = "";
      this.obj = null;
    },
  },
};
</script>