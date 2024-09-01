<script setup>
// import my plugins
import { Cookies } from "@/plugins/cookies";
import { RestApi } from "@/plugins/restApi";
import { Scroll } from "@/plugins/scroll";

// import Vuejs's plugins
import { onBeforeMount } from "vue";

// import my Pinia plugins
import { useAlertStore } from "@/pinia/alert";
import { usePersonneStore } from "@/pinia/personne";
import { useStatusStore } from "@/pinia/status";

// instance of my plugins
const cookies = new Cookies();
const restApi = new RestApi();
const scroll = new Scroll();

// instance of my Pinia plugins
const alert = useAlertStore();
const personne = usePersonneStore();
const status = useStatusStore();

// called begore mounting this component
onBeforeMount(() => {
  scroll.toTop();
  restApi
    .get(`/api/personne/${cookies.get("idPersonne")}`)
    .then((response) => {
      personne.set(response.data);

    })
    .catch((error) => {
      alert.error();
      console.error(error);
    });
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 class="text-center text-h5 mt-10">
          Bienvenue {{ personne.nom }} {{ personne.prenoms }} !
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <ul class="ml-16">
          <li class="my-4">
            Bienvenue sur la plateforme de gestion des données de l'ESP
            Antsiranana.
          </li>
          <li class="my-4">
            Cette plateforme a été conçue afin de faciliter vos activités
            pédagogiques.
          </li>
          <li class="my-4">
            Vos rôles sont :
            <ol class="ml-8">
              <li
                v-for="(item, index) in status.list"
                :key="index"
                class="my-2"
              >
                <strong>{{ item }}</strong>
              </li>
            </ol>
          </li>
          <li class="my-4">
            Les menus sur la barre de navigation correspondent à vos status.
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>
