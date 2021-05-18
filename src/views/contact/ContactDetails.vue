<template>
   <v-container class="mt-16">
    <v-row justify="center">
      <v-col cols="12" lg="9">
         <v-card>
           <v-card-title>
      Contact Details
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
       <v-data-table
    :headers="headers"
    :items="Contacts"
    :items-per-page="5"
    :loading="IsLoading"
    class="elevation-1"
       :expanded.sync="singleExpand"
       :single-expand="singleExpand"
        item-key="email"
        show-expand
        :search="search"
        
    
  >
  
  <!-- <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Contact Details</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field  class="px-15" 
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        </v-toolbar>
      </template> -->

      <template v-slot:expanded-item="{ headers, item }">
      <td class="flex" :colspan="headers.length">
        <b>Description:</b> {{ item.description }}
      </td>
    </template>

      <template v-slot:[`item.request_date`]="{ item }">
    <span>{{ new Date(item.request_date).toLocaleString() }}</span>
  </template>
<!-- 
  <template v-slot:[`item.actions`]="{ item }">
        <v-row>
          <v-col>
            <v-icon small v-on:click="ConfirmDelete(item)"> mdi-format-list-bulleted-type </v-icon>
          </v-col>
        </v-row>
      </template> -->
  </v-data-table>
         </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import Loader from "../../Mixins/Loader";
import { mapState } from "vuex";

export default {
    name: "Contact",
    mixins: [Loader],
     computed: {
    ...mapState("ContactState", ["Contacts"]),
    },
    data () {
      return {
         search: '',
         expanded: [],
        singleExpand: false,
        headers: [
          {
            text: 'Date',
            align: 'start',
            value: 'request_date',
          },
          { text: 'Name', value: 'name' },
          { text: 'Orgnization', value: 'orgname' },
          { text: 'Subject', value: 'subject' },
          { text: 'Email', value: 'email' },
          // { text: 'Description', value: 'description' },
          // { text: 'Actions', value: 'actions', sortable: false },
           { text: '', value: 'data-table-expand' },
        ],
      }
    },
    methods: {
     Load() {
      this.ShowLoader();
      this.$store
        .dispatch("ContactState/LoadContacts")
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
  }
</script>

<style>

</style>