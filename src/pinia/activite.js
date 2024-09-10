import Overlay from "@/components/Overlay.vue";
import { RestApi } from "@/plugins/restApi";
import { Service } from "@/plugins/service";
import { useOverlayStore } from "./overlay";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useActiviteStore = defineStore("activite", () => {
  // Initialize plugins
  const restApi = new RestApi();
  const service = new Service();
  const overlay = useOverlayStore();

  // State variables
  const list = ref([]);
  const id = ref(null);
  const date = ref(null);
  const nomActivite = ref(null);
  const idTypeActivite = ref(null);
  const idEc = ref(null);
  const idEnseignant = ref(null);
  const idClasse = ref(null);
  const selectedClasseInStore = ref(null); // Hold the selected class

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
      .get(`api/activite/par-classe/${idClasse}`)
      .then((response) => {
        console.log(
          "Fetch activite par classe, expected list filtré par classe"
        );
        list.value = response.data;
        console.log("Fetched activite:", list);
      })
      .catch((error) => {
        console.log(
          "Erreur de récupération de la liste d'activité par classe dû à:"
        );
        console.error(error);
      });
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
    fetchActivite,
    fetchActiviteByClasse,
    
  };
});
