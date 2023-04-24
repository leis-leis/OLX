import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/Home.vue";
import About from "./pages/About.vue";
import Register from "./pages/register.vue";
import Login from "./pages/login.vue";
import UserPanel from "./pages/userpanel.vue";
import UserModify from "./pages/usermodify.vue";
import AdminPanel from "./pages/adminpanel.vue";
import adminpanelusers from "./pages/adminpanelusers.vue";
import useroffer from "./pages/useroffer.vue";
import useraddoffer from "./pages/useraddoffer.vue";
import usereditoffer from "./pages/usereditoffer.vue";
import offer from "./pages/offer.vue";
import offers from "./pages/alloffers.vue";
import foundoffers from "./pages/foundoffers.vue";
import reportoffer from "./pages/reportoffer.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/userpanel",
    component: UserPanel,
  },
  {
    path: "/usermodify",
    component: UserModify,
  },
  {
    path: "/adminpanel",
    component: AdminPanel,
  },
  {
    name: "adminpanelusers",
    path: "/adminpanelusers/:searchParam?/:sortBy?/:order?", //tu moze jakos inaczej
    component: adminpanelusers,
  },
  {
    path: "/useroffer",
    component: useroffer,
  },
  {
    path: "/useraddoffer",
    component: useraddoffer,
  },
  {
    name: "editoffer",
    path: "/editoffer/:id",
    component: usereditoffer,
  },
  {
    name: "offer",
    path: "/offer/:id",
    component: offer,
  },
  {
    name: "offers",
    path: "/offers",
    component: offers,
  },
  {
    name: "foundoffers",
    path: "/foundoffers/:searchParam?/:sortBy?/:order?", //tu moze jakos inaczej
    component: foundoffers,
  },
  {
    name: "reportOffer",
    path: "/reportOffer/:id", //tu moze jakos inaczej
    component: reportoffer,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
