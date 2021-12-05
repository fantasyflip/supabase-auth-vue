<template>
  <div>
    <v-row>
      <v-col>
        <v-container>
          <v-row>
            <v-col>
              <span class="text-h4 font-weight-bold primary--text"
                >Reset Password</span
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="New Password"
                v-model="newPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Repeat New Password"
                v-model="newPassword2"
                @keyup.enter="handleNewPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                color="primary"
                :disabled="
                  newPassword === '' ||
                  newPassword2 === '' ||
                  newPassword != newPassword2
                "
                @click="handleNewPassword"
                >Set new Password</v-btn
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
  name: "ResetPassword",
  data() {
    return {
      newPassword: "",
      newPassword2: "",
    };
  },
  methods: {
    handleNewPassword: async function () {
      const { error, data } = await supabase.auth.api.updateUser(
        this.$route.query.token,
        {
          password: this.newPassword,
        }
      );
      console.log("DATA: " + JSON.stringify(data));
      console.log("ERROR: " + JSON.stringify(error));
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style scoped></style>
