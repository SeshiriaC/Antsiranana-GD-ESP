import { RestApi } from "@/plugins/restApi";
import { Service } from "@/plugins/service";
import { ref } from "vue";
import { defineStore } from "pinia";
import { useOverlayStore } from "./overlay";
import { useAlertStore } from "./alert";

export const useAnneeUniversitaireStore = defineStore(
  "anneeUniversitaire",
  () => {
    const restApi = new RestApi();
    const service = new Service();

    const overlay = useOverlayStore();
    const alert = useAlertStore();

    const id = ref(null);
    const designation = ref(null);
    const debut = ref(null);
    const fin = ref(null);
    const list = ref([]);
    const nomAU = ref(null);
    const debutAU = ref(null);
    const finAU = ref(null);

    function getAU(id) {
      const result = ref(null);
      list.value.map((item) => {
        if (item.id == id) result.value = item.nomAU;
      });
      return result.value;
    }
    

    function createAU() {
      let requestData = {
        nomAU: nomAU.value,
        debutAU: debutAU.value,
        finAU: finAU.value,
      };
      console.log(requestData);
      if (service.verifyIfNotEmpty(nomAU.value)) {
        overlay.show();
        restApi
          .post(`/api/annee`, requestData)
          .then((response) => {
            if (response.status === 200) {
              overlay.hide();
              alert.successSave();
              restApi
                .get(`/api/annee`)
                .then((response) => {
                  list.value = response.data;
                })
                .catch((error) => {
                  alert.error();
                  console.error(error);
                });
              nomAU.value = null;
              debutAU.value = null;
              finAU.value = null;
            }
          })
          .catch((error) => {
            alert.error();
            console.error(error);
            overlay.hide();
          });
      }
    }

    function deleteAU(id) {
      if (service.verifyIfNotEmpty(id)) {
        overlay.show();
        restApi
          .delete(`/api/annee/${id}`)
          .then((response) => {
            if (response.status === 200) {
              overlay.hide();
              alert.successDelete();
              let index = list.value.findIndex((item) => item.id == id);
              list.value.splice(index, 1);
            }
          })
          .catch((error) => {
            alert.error();
            console.error(error);
            overlay.hide();
          });
      }
    }

    function editAU(data) {
      if (service.verifyIfNotEmpty(data)) {
        let requestData = {
          nomAU: data.nomAU,
          debutAU: data.debutAU,
          finAU: data.finAU,
        };
        overlay.show();
        restApi
          .put(`/api/annee/${data.id}`, requestData)
          .then((response) => {
            if (response.status == 200) alert.successSave();
            overlay.hide();
          })
          .catch((error) => {
            alert.error();
            console.error(error);
            overlay.hide();
          });
      }
    }

    return {
      id,
      designation,
      debut,
      fin,
      list,
      nomAU,
      debutAU,
      finAU,
      getAU,
      createAU,
      deleteAU,
      editAU,
    };
  }
);
