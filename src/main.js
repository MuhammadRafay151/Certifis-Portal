import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from 'vuelidate'
import axios from "axios";

Vue.use(Vuelidate)

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:8000/api/"


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
