import { RestApi } from "@/plugins/restApi";
import { Service } from "@/plugins/service";
import { defineStore } from "pinia";
import { useAlertStore } from "./alert";
import { ref } from "vue";

export const useActiviteStore = defineStore("activite", () => {
  //instance des plugin
  const service = new Service();
  const restApi = new RestApi();

  //instance des plugins pinia
  const alert = useAlertStore;
  const overlay = useOverlayStore();
  const pe = usePEStore();
  const parcours = useParcoursStore();
  const niveau = useNiveauStore();
  const au = useAnneeUniversitaireStore();

  //creation des variables
  const id = ref(null);
  const list = ref([]);
  const designation = ref(null);
  const date = ref(null);
  const type = ref(null);
  const classe = ref(null);
  const ec = ref(null);
  const enseignant = ref(null);

  //créer une activite
  function create(data) {
    overlay.show();
    restApi.post(`api/activite`, data).then((response) => {
      if (response.status == 200) {
        overlay.hide();
        alert.successSave();
        restApi
          .get(`api/activite`)
          .then((response) => {
            list.value = response.data;
          })
          .catch((error) => {
            alert.error("Test");
            console.error(error);
          });
        designation.value = null;
        date.value = null;
        type.value = null;
        classe.value = null;
        ec.value = null;
        enseignant.value = null;
      }
    })
    .catch((error) => {
      alert.error();
      overlay.hide();
    });
  }
});
