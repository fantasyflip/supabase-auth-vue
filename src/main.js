import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

Vue.prototype.$dev = Vue.config.devtools;

const store = Vue.observable({
  session: null,
});

Vue.prototype.$globalState = store;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
