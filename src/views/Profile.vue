<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <span class="text-h4 font-weight-bold primary--text"> Profile</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" @click="getSession">Log Session</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" @click="getUser">Log User</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="!this.$globalState.session.provider_token">
        <v-col>
          <v-text-field
            label="New E-Mail"
            v-model="newEmail"
            @keyup.enter="handleEmailChange"
          ></v-text-field>
          <v-btn
            color="primary"
            :disabled="newEmail === ''"
            @click="handleEmailChange"
            >Change</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" @click="handleSignOut">Sign-Out</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <span class="font-weight-bold">Auth Provider: </span>
          {{ this.$globalState.session.user.app_metadata.provider }}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { supabase } from "@/plugins/supabase/supabase.js";
export default {
  name: "Profile",
  data() {
    return {
      newEmail: "",
    };
  },
  mounted() {
    console.log(JSON.stringify(this.$globalState.session));
    if (this.$route.query.signup === "success") {
      alert("Succesfully confirmed E-Mail!");
    }
    if (this.$route.query.emailChange === "success") {
      alert("Succesfully changed E-Mail!");
    }
  },
  methods: {
    getSession: async function () {
      const session = supabase.auth.session();
      console.log(JSON.stringify(session));
    },
    getUser: async function () {
      const user = supabase.auth.user();
      console.log(JSON.stringify(user));
    },
    handleSignOut: async function () {
      const { error } = await supabase.auth.signOut();
      console.log(JSON.stringify(error));
      this.$router.push({ path: "/auth" });
    },
    handleEmailChange: async function () {
      const { user, error } = await supabase.auth.update({
        email: this.newEmail,
      });
      console.log("USER: " + JSON.stringify(user));
      console.log("ERROR: " + JSON.stringify(error));
    },
  },
};
</script>
<style scoped></style>
