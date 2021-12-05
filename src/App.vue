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
