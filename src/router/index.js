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
    name: "ResetPassword",
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
  Vue.prototype.$globalState.session = supabase.auth.session();
  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      next({ path: "/" });
    }
  });
  console.log(JSON.stringify(Vue.prototype.$globalState));
  const requestType = getParameterByName("type", toUrl);

  if (requestType === "email_change") {
    const accessToken = getParameterByName("access_token", toUrl);
    supabase.auth.setAuth(accessToken);
    if (supabase.auth.session()) {
      next({ path: "/", query: { emailChange: "success" } });
    } else {
      next({ path: "/" });
      alert("E-Mail-Change failed!");
    }
  } else if (requestType === "signup") {
    const accessToken = getParameterByName("access_token", toUrl);
    supabase.auth.setAuth(accessToken);
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
      if (to.name === "Auth") {
        if (supabase.auth.session()) {
          next({ path: "/" });
        } else {
          next();
        }
      } else if (to.name === "ResetPassword") {
        if (to.query && to.query.token) {
          next();
        } else {
          next({ path: "/" });
        }
      } else {
        next();
      }
    }
  }
});

export default router;
