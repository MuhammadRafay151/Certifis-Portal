<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" lg="6">
                 <v-card elevation="5">
                    <v-card-text>
        <v-text-field
          v-model="Contact.name"
          :error-messages="nameErrors"
          label="Name"
          :counter="50"
          color="deep-purple"
          outlined
          required
          @input="$v.Contact.name.$touch()"
          @blur="$v.Contact.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="Contact.orgname"
          :error-messages="orgnameErrors"
          label="Organization Name"
          color="deep-purple"
          outlined
          required
          @input="$v.Contact.orgname.$touch()"
          @blur="$v.Contact.orgname.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="Contact.email"
          :error-messages="emailErrors"
          label="E-mail"
          color="deep-purple"
          outlined
          required
          @input="$v.Contact.email.$touch()"
          @blur="$v.Contact.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="Contact.subject"
          :error-messages="subjectErrors"
          label="Subject"
          color="deep-purple"
          outlined
          required
          @input="$v.Contact.subject.$touch()"
          @blur="$v.Contact.subject.$touch()"
        ></v-text-field>
        <v-textarea
          v-model="Contact.description"
           :error-messages="DescriptionErrors"
          auto-grow
          outlined
          color="deep-purple"
          label="Description"
          @input="$v.Contact.description.$touch()"
          @blur="$v.Contact.description.$touch()"
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
import { required, maxLength, email } from "vuelidate/lib/validators";
import Loader from "../../Mixins/Loader";


export default {
  mixins: [validationMixin,Loader],

  validations: {
    Contact:{
    
    name: { required, maxLength: maxLength(50) },
    description: { required },
    subject: { required },
    orgname: { required },
    email: { required, email },
    }
  },
data: () => {
    return {
      Contact: {
        name: "",
        email:"",
        subject:"",
        orgname:"",
        description:""
      },
     
    };
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.Contact.name.$dirty) return errors;
      !this.$v.Contact.name.maxLength &&
        errors.push("Name must be at most 50 characters long");
      !this.$v.Contact.name.required && errors.push("Name is required.");
      return errors;
    },
      DescriptionErrors() {
      const errors = [];
      if (!this.$v.Contact.description.$dirty) return errors;
      !this.$v.Contact.description.required && errors.push("Description is required.");
      return errors;
    },
     orgnameErrors() {
      const errors = [];
      if (!this.$v.Contact.orgname.$dirty) return errors;
      !this.$v.Contact.orgname.required && errors.push("Organization Name is required.");
      return errors;
    },
     subjectErrors() {
      const errors = [];
      if (!this.$v.Contact.subject.$dirty) return errors;
      !this.$v.Contact.subject.required && errors.push("Subject is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.Contact.email.$dirty) return errors;
      !this.$v.Contact.email.email && errors.push("Must be valid e-mail");
      !this.$v.Contact.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.Contact.$touch();
       if (!this.$v.Contact.$invalid) {
        this.ShowLoader();
        this.$store
          .dispatch("ContactState/AddContact", this.Contact)
          .then(() => {
            this.clear();
            //this.$v.Contact.$reset();
            //this.HideLoader();
            alert("Successfully submitted",);
            //this.Hide();
          })
          .catch((err) => {
            alert("Error", err);
          });
         

      }
    },
    clear() {
      this.$v.Contact.$reset();
       this.Contact= {
        name: "",
        email:"",
        subject:"",
        orgname:"",
        description:""
      };
    }
  },
};
</script>

<style></style>
