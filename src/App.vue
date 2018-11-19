<template>
  <v-app app>
    <v-content>
      <Dashboard/>
    </v-content>
  </v-app>
</template>

<script>
import Dashboard from "./components/Dashboard";

export default {
  name: "App",
  components: {
    Dashboard
  },
  data() {
    return {
      config: {
        events: {
          "froalaEditor.initialized": function() {
            console.log("initialized");
          }
        }
      },
      model: "Edit Your Content Here!"
    };
  }
};
</script>
