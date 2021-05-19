<template>
  <v-container class="mt-16">
    <v-row justify="center">
      <v-col cols="12" lg="6">
        <v-data-table
          :loading="IsLoading"
          :headers="headers"
          :items="Organizations"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Organizations</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn color="primary" fab x-small dark v-on:click="Add">
                <v-icon>mdi-plus-box</v-icon>
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="Edit(item)"> mdi-pencil </v-icon>
            <v-icon small class="" @click="Delete(item._id)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <AddOrganization ref="act" :edit="edit" v-on:Updated="Load" />
  </v-container>
</template>
<script>
import Loader from "../../Mixins/Loader";
import AddOrganization from "../../components/Organization/AddOrganization";
import { mapState } from "vuex";

export default {
  name: "Organization",
  mixins: [Loader],
  components: {
    AddOrganization,
  },
  data: () => {
    return {
      edit: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },

        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("OrganizationState", ["Organizations"]),
  },
  methods: {
    Load() {
      this.ShowLoader();
      this.$store
        .dispatch("OrganizationState/GetOrgs")
        .then(() => {
          this.HideLoader();
        })
        .catch(() => {
          this.HideLoader();
          console.log("Loading error");
        });
    },
    Add() {
      this.edit = false;
      this.$refs.act.Show();
    },
    Edit(data) {
      this.edit = true;
      this.$refs.act.Organization = Object.assign({}, data);
      this.$refs.act.Show();
    },
    Delete(id) {
      this.ShowLoader();
      this.$store
        .dispatch("OrganizationState/DeleteOrg", id)
        .then(() => {
          this.HideLoader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.Load();
  },
};
</script>