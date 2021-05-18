import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Contact from "../views/contact/Contact.vue";
import ContactDetails from "../views/contact/ContactDetails.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/Contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/ContactDetails",
    name: "ContactDetails",
    component: ContactDetails,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;