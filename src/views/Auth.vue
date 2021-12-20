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
                @keyup.enter="handleSignUp"
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
                @keyup.enter="handleLogIn"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-end">
              <v-btn
                color="primary"
                :disabled="login.email === ''"
                @click="handleResetPassword"
                >Forgot Password</v-btn
              >
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                :disabled="login.password === '' || login.email === ''"
                @click="handleLogIn"
                >LogIn</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex align-center">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span>Or Login via Social Providers</span>
            </v-col>
            <v-col class="d-flex align-center">
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center">
              <v-btn @click="handleProviderLogin('discord')" class="mx-2">
                Discord
                <v-icon class="pl-2">mdi-discord</v-icon>
              </v-btn>
              <v-btn @click="handleProviderLogin('twitch')" class="mx-2">
                Twitch
                <v-icon class="pl-2">mdi-twitch</v-icon>
              </v-btn>
              <v-btn @click="handleProviderLogin('google')" class="mx-2">
                Google
                <v-icon class="pl-2">mdi-google</v-icon>
              </v-btn>
              <v-btn @click="handleProviderLogin('spotify')" class="mx-2">
                Spotify
                <v-icon class="pl-2">mdi-spotify</v-icon>
              </v-btn>
              <v-btn @click="handleProviderLogin('github')" class="mx-2">
                GitHub
                <v-icon class="pl-2">mdi-github</v-icon>
              </v-btn>
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
      if (this.$dev) {
        const { user, session, error } = await supabase.auth.signUp(
          {
            email: this.register.email,
            password: this.register.password,
          },
          {
            redirectTo: "http://localhost:8080",
          }
        );
        console.log("USER: " + JSON.stringify(user));
        console.log("SESSION: " + JSON.stringify(session));
        console.log("ERROR: " + JSON.stringify(error));
      } else {
        const { user, session, error } = await supabase.auth.signUp({
          email: this.register.email,
          password: this.register.password,
        });
        console.log("USER: " + JSON.stringify(user));
        console.log("SESSION: " + JSON.stringify(session));
        console.log("ERROR: " + JSON.stringify(error));
      }
    },
    handleLogIn: async function () {
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
    handleProviderLogin: async function (provider) {
      if (this.$dev) {
        const { user, session, error } = await supabase.auth.signIn(
          {
            provider: provider,
          },
          {
            redirectTo: "http://localhost:8080",
          }
        );
        console.log("USER: " + JSON.stringify(user));
        console.log("SESSION: " + JSON.stringify(session));
        console.log("ERROR: " + JSON.stringify(error));
      } else {
        const { user, session, error } = await supabase.auth.signIn({
          provider: provider,
        });
        console.log("USER: " + JSON.stringify(user));
        console.log("SESSION: " + JSON.stringify(session));
        console.log("ERROR: " + JSON.stringify(error));
      }
    },
  },
};
</script>
<style scoped></style>
