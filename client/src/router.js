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
    path: "/adminpanelusers",
    component: adminpanelusers,
  },
  {
    path: "/useroffer",
    component: useroffer,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
