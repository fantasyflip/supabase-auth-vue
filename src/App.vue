<template>
  <v-app>
    <v-main>
      App
      <Auth />
      <Profile />
    </v-main>
  </v-app>
</template>

<script>
import Auth from "@/components/Auth";
import Profile from "@/components/Profile";
export default {
  name: "App",
  components: {
    Auth,
    Profile,
  },
  mounted() {
    console.log(this.$route);
  },
  data() {
    return {};
  },
};
</script>
