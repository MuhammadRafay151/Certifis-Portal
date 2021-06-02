import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from 'vuelidate'
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
import axios from "axios";

Vue.use(VueTelInputVuetify, {
  vuetify,
});
Vue.use(Vuelidate)

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://certifis-portal-back-end.herokuapp.com/"


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
