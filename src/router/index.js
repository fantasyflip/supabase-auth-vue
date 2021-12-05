import Vue from "vue";
import VueRouter from "vue-router";

import { supabase } from "@/plugins/supabase/supabase.js";
import { getParameterByName } from "@/plugins/supabase/helpers";

import Profile from "../views/Profile.vue";
import Auth from "../views/Auth.vue";
import ResetPassword from "../views/ResetPassword.vue";

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
  let toUrl = location.origin + to.fullPath;
  const requestType = getParameterByName("type", toUrl);

  console.log(toUrl);

  if (requestType === "signup") {
    const accessToken = getParameterByName("access_token", toUrl);
    const { user, error } = supabase.auth.setAuth(accessToken);
    console.log("USER setAuth: " + JSON.stringify(user));
    console.log("ERROR setAuth: " + JSON.stringify(error));
    console.log(supabase.auth.session());
    if (supabase.auth.session()) {
      next({ path: "/", query: { signup: "success" } });
    } else {
      next({ path: "/auth" });
      alert("E-Mail-Confirmation failed!");
    }
  } else if (requestType === "recovery") {
    const accessToken = getParameterByName("access_token", toUrl);
    next({ path: "resetPassword", query: { token: accessToken } });
  } else {
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
  }
});

export default router;
