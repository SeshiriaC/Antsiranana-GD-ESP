<script setup>
// import my plugins
import { RestApi } from "@/plugins/restApi";
import { Service } from "@/plugins/service";
import { Scroll } from "@/plugins/scroll";

// import Vuejs's plugins
import { onBeforeMount, watch, onBeforeUnmount } from "vue";

// import my Pinia plugins
import { useAlertStore } from "@/pinia/alert";
import { useOverlayStore } from "@/pinia/overlay";
import { useEtudiantStore } from "@/pinia/etudiant";
import { useNiveauStore } from "@/pinia/niveau";
import { useParcoursStore } from "@/pinia/parcours";
import { useAnneeUniversitaireStore } from "@/pinia/anneeUniversitaire";

// instance my plugins
const restApi = new RestApi();
const service = new Service();
const scroll = new Scroll();

// instance my Pinia plugins
const alert = useAlertStore();
const overlay = useOverlayStore();
const etudiant = useEtudiantStore();
const niveau = useNiveauStore();
const parcours = useParcoursStore();
const anneeUniversitaire = useAnneeUniversitaireStore();

// reload content of this table
function reloadFirstTable() {
  if (service.verifyIfNotEmpty(parcours.id)) {
    overlay.show();
    restApi
      .get(`/api/etudiant/dp/${parcours.id}`)
      .then((response) => {
        etudiant.list = response.data;
        overlay.hide();
      })
      .catch((error) => {
        alert.error();
        console.error(error);
        overlay.hide();
      });
  }
}

// watch if anneeUniversitaire.id is changing
watch(
  () => anneeUniversitaire.id,
  (newIdAU) => {
    niveau.id = null;
    parcours.id = null;
    if (service.verifyIfNotEmpty(newIdAU)) {
      restApi
        .get(`/api/definition-parcours/annee/${newIdAU}`)
        .then((response) => {
          parcours.list = response.data;
        })
        .catch((error) => {
          alert.error();
          console.error(error);
        });
    }
  }
);

// watch if niveau.id is changing
watch(
  () => niveau.id,
  (newIdNiveau) => {
    etudiant.list = [];
  }
);

// watch if parcours.id is changing
watch(
  () => parcours.id,
  (newParcoursId) => {
    if (service.verifyIfNotEmpty(newParcoursId)) {
      overlay.show();
      restApi
        .get(`/api/etudiant/dp/${newParcoursId}`)
        .then((response) => {
          etudiant.list = response.data;
          overlay.hide();
        })
        .catch((error) => {
          alert.error();
          console.error(error);
          overlay.hide();
        });
    }
  }
);

// Called before mounting
onBeforeMount(() => {
  scroll.toTop();
  etudiant.list = [];
  etudiant.listNotes = [];
  niveau.id = null;
  parcours.id = null;
});

onBeforeUnmount(() => {
  niveau.id = null;
  parcours.id = null;
});
</script>

<template>
  <v-row no-gutters class="mt-4">
    <v-col cols="12">
      <h5 class="text-h5">Listes des activités</h5>
    </v-col>
  </v-row>
  <v-row no-gutters class="mt-2" v-if="service.verifyIfNotEmpty(etudiant.list)">
    <v-col cols="12">
      <v-table class="elevation-1" density="compact">
        <thead>
          <tr>
            <th>Désignation</th>
            <th>Mention</th>
            <th>Parcours</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in etudiant.list" :key="index">
            <td class="text-truncate">{{ value.nom }}</td>
            <td class="text-truncate">{{ value.prenoms }}</td>
            <td class="text-truncate">{{ value.telephone }}</td>
            <td class="text-truncate">{{ value.email }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
