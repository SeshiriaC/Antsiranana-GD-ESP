<script setup>
// import my plugins
import { RestApi } from "@/plugins/restApi";
import { Service } from "@/plugins/service";
import { Scroll } from "@/plugins/scroll";

// import Vue's plugins
import { onBeforeMount, watch, ref } from "vue";

// import my Pinia plugins
import { useAlertStore } from "@/pinia/alert";
import { useOverlayStore } from "@/pinia/overlay";
import { useNiveauStore } from "@/pinia/niveau";
import { useAnneeUniversitaireStore } from "@/pinia/anneeUniversitaire";
import { useClasseStore } from "@/pinia/classe";
import { useActiviteStore } from "@/pinia/activite";

// instance my plugins
const restApi = new RestApi();
const service = new Service();
const scroll = new Scroll();

// instance my Pinia plugins
const alertStore = useAlertStore();
const overlayStore = useOverlayStore();
const niveauStore = useNiveauStore();
const anneeUniversitaireStore = useAnneeUniversitaireStore();
const classeStore = useClasseStore();
const activiteStore = useActiviteStore();

// Local state for selected class
const selectedClasse = ref(null); // Ensure this is initialized to a valid state

// Fetch activities when the component is mounted
onBeforeMount(() => {
  scroll.toTop();
  if (selectedClasse.value) {
    fetchActivitesByClasse(selectedClasse.value); // Corrected: Use `selectedClasse.value`
  }
});

// Watch for changes in the selected class and fetch activities accordingly
watch(selectedClasse, (newIdClasse) => {
  if (newIdClasse) {
    fetchActivitesByClasse(newIdClasse); // Fetch activities for the selected class
  } else {
    activiteStore.list = []; // Clear the list if no class is selected
  }
});

// Function to fetch activities by class ID
function fetchActivitesByClasse(idClasse) {
  if (!idClasse) return; // Ensure a class ID is provided

  // Ensure this function returns a Promise if using .then()
  return activiteStore.fetchActiviteByClasse(idClasse)
    .then(() => {
      console.log("Activités fetched successfully for class:", idClasse);
    })
    .catch((error) => {
      console.log("Erreur de récupération des activités par classe:");
      console.error(error);
    });
}
</script>

<template>
  <v-row no-gutters class="mt-4">
    <v-col cols="12">
      <h5 class="text-h5">Liste des activités</h5>
    </v-col>
  </v-row>
  <v-row no-gutters class="mt-2" v-if="service.verifyIfNotEmpty(activiteStore.list)">
    <v-col cols="12">
      <v-table class="elevation-1" density="compact">
        <thead>
          <tr>
            <th>Type Activité</th>
            <th>Désignation Activité</th>
            <th>Nom EC</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in activiteStore.list" :key="index">
            <td class="text-truncate">{{ value.idTypeActivite }}</td>
            <td class="text-truncate">{{ value.designationActivite }}</td>
            <td class="text-truncate">{{ value.idEc.nomEc }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
