<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" lg="6">
        <v-card elevation="5">
          <v-card-text>
            <v-text-field
              v-model="OrgContact.name"
              :error-messages="nameErrors"
              label="Name"
              :counter="50"
              color="deep-purple"
              outlined
              required
              @input="$v.OrgContact.name.$touch()"
              @blur="$v.OrgContact.name.$touch()"
            ></v-text-field>
            <v-autocomplete
              auto-select-first
              label="Select Organization"
              outlined
              required
              :error-messages="OrgIDErrors"
              v-model="OrgContact.OrgID"
              class="mb-0 pb-0"
              color="deep-purple"
              :loading="LoadingOrg"
              hide-no-data
              hide-selected
              :items="Organizations"
              item-text="name"
              item-value="_id"
              @input="$v.OrgContact.OrgID.$touch()"
              @blur="$v.OrgContact.OrgID.$touch()"
            ></v-autocomplete>
            <!-- <v-text-field
              v-model="OrgContact.OrgID"
              :error-messages="OrgIDErrors"
              label="Organization Name"
              color="deep-purple"
              outlined
              required
              @input="$v.OrgContact.OrgID.$touch()"
              @blur="$v.OrgContact.OrgID.$touch()"
            ></v-text-field> -->
            <!-- <v-text-field
              v-model="OrgContact.email"
              :error-messages="emailErrors"
              label="E-mail"
              color="deep-purple"
              outlined
              required
              @input="$v.OrgContact.email.$touch()"
              @blur="$v.OrgContact.email.$touch()"
            ></v-text-field> -->
            <v-text-field
              v-model="OrgContact.subject"
              :error-messages="subjectErrors"
              label="Subject"
              color="deep-purple"
              outlined
              required
              @input="$v.OrgContact.subject.$touch()"
              @blur="$v.OrgContact.subject.$touch()"
            ></v-text-field>
            <v-textarea
              v-model="OrgContact.description"
              :error-messages="DescriptionErrors"
              auto-grow
              outlined
              color="deep-purple"
              label="Description"
              @input="$v.OrgContact.description.$touch()"
              @blur="$v.OrgContact.description.$touch()"
            ></v-textarea>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions class="md-5 justify-end">
            <v-btn class="mr-4" @click="submit"> submit </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
// import { required, maxLength, email } from "vuelidate/lib/validators";
import { required, maxLength } from "vuelidate/lib/validators";
import Loader from "../../Mixins/Loader";
import { mapState } from "vuex";

export default {
  mixins: [validationMixin, Loader],

  validations: {
    OrgContact: {
      name: { required, maxLength: maxLength(50) },
      description: { required },
      subject: { required },
      OrgID: { required },
      // email: { required, email },
    },
  },
  data: () => {
    return {
      LoadingOrg: false,
      OrgContact: {
        name: "",
        // email: "",
        subject: "",
        OrgID: "",
        description: "",
      },
    };
  },

  computed: {
    ...mapState("OrganizationState", ["Organizations"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.OrgContact.name.$dirty) return errors;
      !this.$v.OrgContact.name.maxLength &&
        errors.push("Name must be at most 50 characters long");
      !this.$v.OrgContact.name.required && errors.push("Name is required.");
      return errors;
    },
    DescriptionErrors() {
      const errors = [];
      if (!this.$v.OrgContact.description.$dirty) return errors;
      !this.$v.OrgContact.description.required &&
        errors.push("Description is required.");
      return errors;
    },
    OrgIDErrors() {
      const errors = [];
      if (!this.$v.OrgContact.OrgID.$dirty) return errors;
      !this.$v.OrgContact.OrgID.required &&
        errors.push("Organization Name is required.");
      return errors;
    },
    subjectErrors() {
      const errors = [];
      if (!this.$v.OrgContact.subject.$dirty) return errors;
      !this.$v.OrgContact.subject.required &&
        errors.push("Subject is required.");
      return errors;
    },
    // emailErrors() {
    //   const errors = [];
    //   if (!this.$v.OrgContact.email.$dirty) return errors;
    //   !this.$v.OrgContact.email.email && errors.push("Must be valid e-mail");
    //   !this.$v.OrgContact.email.required && errors.push("E-mail is required");
    //   return errors;
    // },
  },

  methods: {
    submit() {
      this.$v.OrgContact.$touch();
      if (!this.$v.OrgContact.$invalid) {
        this.ShowLoader();
        this.$store
          .dispatch("ContactState/AddOrgContact", this.OrgContact)
          .then(() => {
            this.clear();
            //this.$v.OrgContact.$reset();
            //this.HideLoader();
            alert("Successfully submitted");
            //this.Hide();
          })
          .catch((err) => {
            alert("Error", err);
          });
      }
    },
    clear() {
      this.$v.OrgContact.$reset();
      this.OrgContact = {
        name: "",
        // email: "",
        subject: "",
        OrgID: "",
        description: "",
      };
    },
  },
  created() {
    this.LoadingOrg = true;
    this.$store
      .dispatch("OrganizationState/GetOrgs")
      .then(() => {
        this.LoadingOrg = false;
      })
      .catch(() => {
        this.LoadingOrg = "error";
      });
  },
};
</script>

<style></style>
