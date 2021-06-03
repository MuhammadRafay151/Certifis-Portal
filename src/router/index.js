import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Contact from "../views/contact/Contact.vue";
import ContactDetails from "../views/contact/ContactDetails.vue";
import organization from "../views/organization/Organizations.vue";
import OrgContact from "../views/contact/OrgContact.vue";
import login from "../views/login.vue";
import NProgress from 'nprogress'
import store from "../store"
import 'nprogress/nprogress.css';




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
    meta: { requiresAuth: true }
  },
  {
    path: "/organization",
    name: "organization",
    component: organization,
    meta: { requiresAuth: true }
  },
  {
    path: "/OrgContact",
    name: "OrgContact",
    component: OrgContact,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters["UserState/IsLoggedIn"]) {
      return next({ path: '/login' })
    }
  }

  next() // make sure to always call next()!
})
router.afterEach(() => {
  NProgress.done()
});
export default router;
