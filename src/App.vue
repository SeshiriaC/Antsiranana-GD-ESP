<script setup>
// importing my plugins
import { Cookies } from "./plugins/cookies";

// import VueRouter's plugins
import { useRouter } from "vue-router";

// some pinia plugins
import { useThemeStore } from "./pinia/theme";
import { useViewStore } from "./pinia/view";
import { useNavigationStore } from "./pinia/navigation";

// Import some Vuejs's component
import { onBeforeMount } from "vue";

// import some components
import Overlay from "@/components/Overlay.vue";
import Alert from "@/components/Alert.vue";
import Dialog from "@/components/Dialog.vue";
import Authentification from "@/components/Authentification.vue";
import Workspace from "@/components/Workspace.vue";
import SwitchTheme from "@/components/SwitchTheme.vue";
import Navigation from "@/components/Navigation.vue";

// import Bar from '@/components/Bar.vue';

// instancing my plugins
const cookies = new Cookies();

// instancing VueRouter's plugins
const router = useRouter();

// instancing pinia plugins
const theme = useThemeStore();
const view = useViewStore();
const navigation = useNavigationStore();

// called on before mounting of this component
onBeforeMount(() => {
  if (cookies.get("accessToken")) view.set("Workspace");
  else router.replace({ path: "" });
});
</script>

<template>
  <!-- The App component -->
  <v-app :theme="theme.selected">
    <!-- The principale Bar -->
    <!-- <Bar v-if="view.selected === 'Workspace'"></Bar> -->

    <!-- <v-card> -->
    <!-- <v-layout> -->
    <Navigation v-if="view.selected === 'Workspace'"></Navigation>

    <!-- The main component for Vuetify -->
    <v-main>
      <Teleport to="body">
        <Overlay></Overlay>
      </Teleport>

      <Teleport to="body">
        <Alert></Alert>
      </Teleport>

      <Teleport to="body">
        <Dialog></Dialog>
      </Teleport>

      <Authentification 
        v-if="view.selected === 'Authentification'"
      ></Authentification>
      <Workspace v-if="view.selected === 'Workspace'"></Workspace>

      <div id="container-switch-theme">
        <SwitchTheme v-if="view.selected === 'Authentification'"></SwitchTheme>
        <!-- <SwitchApp v-if="view.selected === 'Authentification'"></SwitchApp> -->
      </div>
    </v-main>

    <!-- </v-layout> -->
    <!-- </v-card> -->
  </v-app>
</template>

<style scoped>
/* make the SwitchTheme on its place */
#container-switch-theme {
  position: fixed;
  right: 24px;
  bottom: 24px;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  gap: 10px;
}

</style>
