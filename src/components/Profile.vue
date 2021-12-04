<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="getSession">Get Session</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="getUser">Get User</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="handleSignOut">Sign-Out</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { supabase } from "@/plugins/supabase/supabase.js";
export default {
  name: "Profile",
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
    },
  },
};
</script>
<style scoped></style>
