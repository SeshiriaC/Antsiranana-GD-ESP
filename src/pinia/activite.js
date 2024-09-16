import Overlay from "@/components/Overlay.vue";
import { RestApi } from "@/plugins/restApi";
import { Service } from "@/plugins/service";
import { useOverlayStore } from "./overlay";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAlertStore } from "./alert";

export const useActiviteStore = defineStore("activite", () => {
  // Initialize plugins
  const restApi = new RestApi();
  const service = new Service();

  const overlay = useOverlayStore();
  const alert = useAlertStore();

  // State variables
  const list = ref([]);
  const id = ref(null);
  const date = ref(null);
  const nomActivite = ref(null);
  const idTypeActivite = ref(null);
  const idEc = ref(null);
  const idEnseignant = ref(null);
  const idClasse = ref(null);
  const selectedClasseInStore = ref(null);

  //Nommenclature
  const typeActivite = ref(null);
  const classe = ref(null);
  const ec = ref(null);

  // Fetch all activities
  function fetchActivite() {
    restApi
      .get(`api/activite`)
      .then((response) => {
        console.log("Fetch activite sent, expected list");
        list.value = response.data;
        console.log("Fetched activite", list);
      })
      .catch((error) => {
        console.log("Erreur de récupération d'activité:");
        console.error(error);
      });
  }

  // Fetch activities by class
  function fetchActiviteByClasse(idClasse) {
    restApi
      .get(
        `api/activite/par-classe/${idClasse}/par-enseignant/${enseignantResponsable.value.id}`
      )
      .then((response) => {
        if (response.status == 200) {
          console.log(
            "Fetch activite par classe, expected list filtré par classe"
          );
          list.value = response.data;
          console.log("Fetched activite:", list);
        }
        overlayStore.hide();
        console.log("Activités récupérées avec succès");
      })
      .catch((error) => {
        console.log(
          "Erreur de récupération de la liste d'activité par classe dû à:"
        );
        console.error(error);
      });
  }

  // Supprimer une activité
  function deleteActivite(idValue) {
    if (service.verifyIfNotEmpty(idValue)) {
      overlay.show();
      restApi
        .delete(`api/activite/supprimer-activite/${idValue}`)
        .then((response) => {
          if (response === 200) alert.successDelete();
          overlay.hide();
        })
        .catch((error) => {
          alert.error();
          console.error(error);
          overlay.hide();
        });
    }
    return null;
  }

  return {
    id,
    list,
    date,
    nomActivite,
    idTypeActivite,
    idEc,
    idEnseignant,
    idClasse,
    selectedClasseInStore,
    typeActivite,
    classe,
    ec,
    fetchActivite,
    fetchActiviteByClasse,
    deleteActivite,
  };
});
