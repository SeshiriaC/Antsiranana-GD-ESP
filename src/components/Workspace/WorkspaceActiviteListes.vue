<script setup>
// import my plugins
import { RestApi } from "@/plugins/restApi";
import { Service } from "@/plugins/service";
import { Scroll } from "@/plugins/scroll";

// import Vue's plugins
import { onBeforeMount, watch, ref, computed } from "vue";

// import my Pinia plugins
import { useAlertStore } from "@/pinia/alert";
import { useOverlayStore } from "@/pinia/overlay";
import { useClasseStore } from "@/pinia/classe";
import { useActiviteStore } from "@/pinia/activite";
import { Cookies } from "@/plugins/cookies";
import { useEnseignantStore } from "@/pinia/enseignant";

// instance my plugins
const restApi = new RestApi();
const service = new Service();
const scroll = new Scroll();
const cookies = new Cookies();

// instance my Pinia plugins
const alertStore = useAlertStore();
const overlayStore = useOverlayStore();
const classeStore = useClasseStore();
const activiteStore = useActiviteStore();
const enseignantStore = useEnseignantStore();

// Local state for selected class and sorting order
const selectedClasse = computed(() => classeStore.selectedClasseInStore);
const enseignantResponsable = computed(() => enseignantStore.fetchedEnseignant);
const sortOrder = ref("asc"); // State for sorting order ('asc' or 'desc')

// Récupérer idEnseignant en utilisant idPersonne dans cookies
const idPersonne = cookies.get("idPersonne");
console.log("Personne à ajouter:", idPersonne);
enseignantStore.fetchIdEnseignant(idPersonne);

// Fetch activities when the component is mounted
onBeforeMount(() => {
  scroll.toTop();
  if (selectedClasse.value) {
    fetchActivitesByClasse(selectedClasse.value);
  }
});

// Watch for changes in the selected class and fetch activities accordingly
watch(selectedClasse, (newIdClasse) => {
  if (newIdClasse) {
    fetchActivitesByClasse(newIdClasse);
  } else {
    activiteStore.list.value = []; // Clear the list if no class is selected
  }
});

// Watch for changes in the sorting order and sort activities
watch(sortOrder, () => {
  sortActivities(); // Sort activities whenever the sort order changes
});

// Function to fetch activities by class ID
function fetchActivitesByClasse(idClasse) {
  if (service.verifyIfNotEmpty(idClasse)) {
    overlayStore.show(); // Show overlay while fetching data
    return restApi
      .get(
        `api/activite/par-classe/${idClasse}/par-enseignant/${enseignantResponsable.value.id}`
      )
      .then((response) => {
        if (response.status == 200) {
          console.log("Fetch activite par classe, expected list filtré par classe");
          activiteStore.list.value = response.data; // Use `.value` to update reactive ref
          console.log("Fetched activite:", activiteStore.list.value);
          sortActivities(); // Sort activities after fetching
        }
        overlayStore.hide(); // Hide overlay on success
        console.log("Activités récupérées avec succès");
      })
      .catch((error) => {
        overlayStore.hide(); // Hide overlay on error
        console.log("Erreur de récupération de la liste d'activité par classe dû à:");
        console.error(error);
      });
  }
}

// Function to sort activities by date
function sortActivities() {
  activiteStore.list.value.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder.value === "asc" ? dateA - dateB : dateB - dateA; // Sort based on the current order
  });
}

function sortActivitiesByName() {
  activiteStore.list.value
}
</script>

<template>
  <v-row no-gutters class="mt-4">
    <v-col cols="12">
      <h5 class="text-h5">Liste des activités</h5>
    </v-col>
  </v-row>
  <v-row no-gutters class="mt-2">
  </v-row>
  <v-row no-gutters class="mt-2" v-if="service.verifyIfNotEmpty(activiteStore.list.value)">
    <v-col cols="12">
      <v-table class="elevation-1" density="compact">
        <thead>
          <tr>
            <th>Date de l'activité
              <v-btn v-if="sortOrder === 'desc'" icon="mdi-arrow-down" @click="sortOrder = 'asc'"
                class="mx-1 elevation-0"></v-btn>
              <v-btn v-else-if="sortOrder === 'asc'" icon="mdi-arrow-up" @click="sortOrder = 'desc'"
                class="mx-1 elevation-0"></v-btn>
            </th>
            <th>Type d'activité</th>
            <th>Activité
              <v-btn v-if="sortOrder === 'desc'" icon="mdi-arrow-down" @click="sortNameOrder = 'asc'"
                class="mx-1 elevation-0"></v-btn>
              <v-btn v-else-if="sortOrder === 'asc'" icon="mdi-arrow-up" @click="sortNameOrder = 'desc'"
                class="mx-1 elevation-0"></v-btn>
            </th>
            <th>Element constitutif</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in activiteStore.list.value" :key="index">

            <td class="text-truncate">{{ value.date }}</td>
            <td class="text-truncate">{{ value.typeActivite }}</td>
            <td class="text-truncate">{{ value.nomActivite }}</td>
            <td class="text-truncate">{{ value.ec }}</td>
            <td>
              <v-row class="my-2">
                <v-btn density="compact" icon="mdi-delete-forever" class="p-3 mx-1" />
                <v-btn density="compact" icon="mdi-square-edit-outline" class="p-3 mx-1" />
              </v-row>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
