<template>
  <div>
    <v-row>
      <v-col>
        <v-container>
          <v-row>
            <v-col>
              <span class="text-h4 font-weight-bold primary--text"
                >Sign-Up</span
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="E-Mail"
                v-model="register.email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Password"
                v-model="register.password"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Password"
                v-model="register.password2"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                color="primary"
                :disabled="
                  register.password != register.password2 ||
                  register.password2 === '' ||
                  register.password === '' ||
                  register.email === ''
                "
                @click="handleSignUp"
                >Sign-Up</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col>
        <v-container>
          <v-row>
            <v-col>
              <span class="text-h4 font-weight-bold primary--text">Login</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="E-Mail" v-model="login.email"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Password"
                v-model="login.password"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                color="primary"
                :disabled="login.email === ''"
                @click="handleResetPassword"
                >Forgot Password</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                color="primary"
                :disabled="login.password === '' || login.email === ''"
                @click="handleLogIn"
                >LogIn</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { supabase } from "@/plugins/supabase/supabase.js";
export default {
  name: "Auth",
  data() {
    return {
      register: {
        email: "",
        password: "",
        password2: "",
      },
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleSignUp: async function () {
      console.log(JSON.stringify(this.register));
      const { user, session, error } = await supabase.auth.signUp({
        email: this.register.email,
        password: this.register.password,
      });
      console.log("USER: " + JSON.stringify(user));
      console.log("SESSION: " + JSON.stringify(session));
      console.log("ERROR: " + JSON.stringify(error));
    },
    handleLogIn: async function () {
      console.log(JSON.stringify(this.login));
      const { user, session, error } = await supabase.auth.signIn({
        email: this.login.email,
        password: this.login.password,
      });
      console.log("USER: " + JSON.stringify(user));
      console.log("SESSION: " + JSON.stringify(session));
      console.log("ERROR: " + JSON.stringify(error));
      if (user) {
        this.$router.push({ path: "/" });
      }
    },
    handleResetPassword: async function () {
      const { data, error } = supabase.auth.api.resetPasswordForEmail(
        this.login.email
      );
      console.log("DATA: " + JSON.stringify(data));
      console.log("ERROR: " + JSON.stringify(error));
    },
  },
};
</script>
<style scoped></style>
