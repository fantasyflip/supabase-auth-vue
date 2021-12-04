import Vue from "vue";
import VueRouter from "vue-router";
import Profile from "../views/Profile.vue";
import Auth from "../views/Auth.vue";
import ResetPassword from "../views/ResetPassword.vue";
import { supabase } from "@/plugins/supabase/supabase.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Profile",
    component: Profile,
    meta: { authRequired: true },
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    meta: { authRequired: false },
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: ResetPassword,
    meta: { authRequired: false },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    if (supabase.auth.session()) {
      next();
    } else {
      next({ path: "/auth" });
    }
  } else {
    if (to.path === "/auth") {
      if (supabase.auth.session()) {
        next({ path: "/" });
      } else {
        next();
      }
    } else {
      next();
    }
  }
  // if (to.path != "/auth" || to.path != "/resetPassword") {
  //   console.log("SESSION: " + JSON.stringify(supabase.auth.session()));
  //   if (!supabase.auth.session()) {
  //     console.log("auth now");
  //     next({ path: "/auth" });
  //   }
  // }
  // if (to.path === "/auth") {
  //   next();
  // }
});

export default router;
