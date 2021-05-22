<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <v-card>
      <v-card-title>
        <span v-if="!edit" class="headline">Add Organization</span>
        <span v-else class="headline">Edit Organization</span>
      </v-card-title>

      <v-card-text class="pb-0">
        <v-container class="pb-0">
          <v-row justify="center">
            <v-col cols="12" sm="12">
              <v-text-field
                label="Organization"
                v-model="Organization.name"
                :error-messages="nameErrors"
                outlined
                required
                @input="$v.Organization.name.$touch()"
                @blur="$v.Organization.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="Organization.email"
                :error-messages="emailErrors"
                label="E-mail"
                outlined
                required
                @input="$v.Organization.email.$touch()"
                @blur="$v.Organization.email.$touch()"
              ></v-text-field>
              <vue-tel-input-vuetify
                type="tel"
                v-model="Organization.phone"
                outlined
                required
                maxLen="10"
                autocomplete="off"
                clearable
                v-bind:prefix="`+${Organization.country_code}`"
                :error-messages="phoneErrors"
                v-bind:defaultCountry="Organization.iso2"
                disabledFetchingCountry
                v-on:country-changed="countryChanged"
                @input="$v.Organization.phone.$touch()"
                @blur="$v.Organization.phone.$touch()"
              ></vue-tel-input-vuetify>

              <v-text-field
                label="Address"
                v-model="Organization.address"
                :error-messages="addressErrors"
                outlined
                required
                @input="$v.Organization.address.$touch()"
                @blur="$v.Organization.address.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="Close"> Close </v-btn>
        <v-btn v-if="!edit" color="primary" :loading="IsLoading" @click="Add">
          Add Organization
        </v-btn>
        <v-btn v-else color="primary" :loading="IsLoading" @click="Update">
          Update Organization
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { required, email, maxLength, numeric } from "vuelidate/lib/validators";
import Loader from "../../Mixins/Loader";
export default {
  name: "AddOrganization",
  props: { edit: Boolean },
  mixins: [Loader],
  data: () => {
    return {
      Organization: {
        name: "",
        email: "",
        phone: 0,
        address: "",
        country_code: "92",
        iso2: "Pk",
      },
      dialog: false,
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.Organization.name.$dirty) return errors;
      !this.$v.Organization.name.required &&
        errors.push("Organization Name is required.");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.Organization.phone.$dirty) return errors;
      !this.$v.Organization.phone.numeric &&
        errors.push("Phone Number must be numeric");
      !this.$v.Organization.phone.maxLength &&
        errors.push("Phone Number must be at most 10 digits long");
      !this.$v.Organization.phone.required &&
        errors.push("Phone Number is required.");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.Organization.address.$dirty) return errors;
      !this.$v.Organization.address.required &&
        errors.push("Address is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.Organization.email.$dirty) return errors;
      !this.$v.Organization.email.email && errors.push("Must be valid e-mail");
      !this.$v.Organization.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  methods: {
    countryChanged(country) {
      this.Organization.iso2 = country.iso2;
      this.Organization.country_code = country.dialCode;
      console.log(country);
    },
    Show() {
      this.dialog = true;
    },
    Hide() {
      this.dialog = false;
    },
    Close() {
      this.dialog = false;

      this.Clear();
      this.$v.$reset();
    },
    Add() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.ShowLoader();
        this.$store
          .dispatch("OrganizationState/AddOrg", this.Organization)
          .then(() => {
            this.Clear();
            this.$v.$reset();
            this.HideLoader();
            this.Hide();
          })
          .catch((err) => {
            alert("failed", err);
          });
      }
    },
    Update() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.ShowLoader();
        this.$store
          .dispatch("OrganizationState/UpdateOrg", this.Organization)
          .then(() => {
            this.Clear();
            this.$v.$reset();
            this.HideLoader();
            this.Hide();
            this.$emit("Updated");
          })
          .catch((err) => {
            alert("failed", err);
          });
      }
    },
    Clear() {
      this.Organization = {
        name: "",
        email: "",
        phone: 0,
        address: "",
        country_code: "92",
        iso2: "Pk",
        IsRequired: false,
      };
    },
  },
  validations: {
    Organization: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        numeric,
        required,
        maxLength: maxLength(10),
      },
      address: {
        required,
      },

      IsRequired: {},
    },
  },
};
</script>