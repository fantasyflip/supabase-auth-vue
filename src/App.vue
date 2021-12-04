<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  mounted() {
    let hash = this.$route.hash;
    // let hash =
    //   "#access_token=eyJ...plGG6C-w&expires_in=60&refresh_token=q0Ckiw1kU427p6cx4HV0Sg&token_type=bearer&type=recovery";
    console.log("Route");
    console.log(this.$route);
    if (hash.includes("type=recovery")) {
      let accessToken = this.parseToParam("access_token=", "&", hash);
      console.log("Access-Token for Reset: " + accessToken);
      this.$router.push({
        path: "resetPassword",
        query: { token: accessToken },
      });
    }
  },
  data() {
    return {};
  },
  methods: {
    parseToParam: function (startString, endString, stringToParse) {
      let start = {
        string: startString,
        length: startString.length,
      };
      let end = {
        string: endString,
        length: endString.length,
      };
      let parsedValue = stringToParse.substring(
        stringToParse.indexOf(start.string) + start.length,
        stringToParse.indexOf(end.string)
      );
      return parsedValue;
    },
  },
};
</script>
