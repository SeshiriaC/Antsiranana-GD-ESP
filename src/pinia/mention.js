// import my plugins
import { RestApi } from "@/plugins/restApi";
import { Service } from "@/plugins/service";

// import Vuejs's plugins
import { ref } from "vue";

// import Pinia's plugins
import { defineStore } from "pinia";

// import my pinia plugins
import { useOverlayStore } from "./overlay";
import { useAlertStore } from "./alert";
import { useParcoursStore } from "./parcours";
import { useNiveauStore } from "./niveau";
import { useAnneeUniversitaireStore } from "./anneeUniversitaire";
import { useEnseignantStore } from "./enseignant";

// export this store
export const useMentionStore = defineStore("mention", () => {
  // instance my plugins
  const restApi = new RestApi();
  const service = new Service();

  // instance my pinia plugins
  const overlay = useOverlayStore();
  const alert = useAlertStore();
  const parcours = useParcoursStore();
  const niveau = useNiveauStore();
  const anneeUniversitaire = useAnneeUniversitaireStore();
  const enseignant = useEnseignantStore();

  // create variables
  const list = ref([]);
  const designation = ref(null);
  const acronyme = ref(null);
  const id = ref(null);
  const listWithNiveau = ref([]);
  const listResponsableMention = ref([]);

  // getting all mentions
  function getMention(id) {
    const result = ref(null);
    list.value.map((item) => {
      if (item.id == id) result.value = item.acronymeMention;
    });
    return result.value;
  }

  // getting all mentions
  function getMentionFullName(id) {
    const result = ref(null);
    list.value.map((item) => {
      if (item.id == id) result.value = item.mention;
    });
    return result.value;
  }

  // format Mention depending of Niveau
  function prepareListWithNiveau() {
    listWithNiveau.value = [];
    parcours.list.map((itemParcours) => {
      if (niveau.id === itemParcours.idNiveau) {
        list.value.map((itemMention) => {
          if (itemMention.id === itemParcours.idDM) {
            listWithNiveau.value.push(itemMention);
          }
        });
      }
    });
    listWithNiveau.value = service.removeDuplicateObject(listWithNiveau.value);
  }

  // delete mention
  function deleteMention(data) {
    if (service.verifyIfNotEmpty(data)) {
      list.value.splice(data.index, 1);
      if (service.verifyIfNotEmpty(data.item.id)) {
        overlay.show();
        restApi
          .delete(`/api/definition-mention/${data.item.id}`)
          .then((response) => {
            if (response.status === 200) alert.successDelete();
            overlay.hide();
          })
          .catch((error) => {
            alert.error();
            console.error(error);
            overlay.hide();
          });
      }
    }
  }

  // save mention
  function saveMention() {
    const requestPostData = ref([]);
    const requestPutData = ref([]);
    list.value.map((item) => {
      if (service.verifyIfNotEmpty(item.id)) {
        requestPutData.value.push(item);
      } else {
        requestPostData.value.push(item);
      }
    });
    if (service.verifyIfNotEmpty(requestPostData.value)) {
      overlay.show();
      restApi
        .post(
          `/api/definition-mention/annee/${anneeUniversitaire.id}`,
          requestPostData.value
        )
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
    if (service.verifyIfNotEmpty(requestPutData.value)) {
      overlay.show();
      restApi
        .put(`/api/definition-mention`, requestPutData.value)
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

  // create a responsableMention
  function createResponsableMention(data) {
    if (service.verifyIfNotEmpty(data)) {
      overlay.show();
      restApi
        .post(`/api/responsable-mention`, data)
        .then((response) => {
          if (response.status == 200) alert.successSave();
          overlay.hide();
          id.value = null;
          enseignant.id = null;
          if (service.verifyIfNotEmpty(anneeUniversitaire.id)) {
            restApi
              .get(`/api/responsable-mention/annee/${anneeUniversitaire.id}`)
              .then((response) => {
                listResponsableMention.value = response.data;
              })
              .catch((error) => {
                alert.error();
                console.error(error);
              });
          }
        })
        .catch((error) => {
          alert.error();
          console.error(error);
          overlay.hide();
        });
    }
  }

  // delete a responsableMention
  function deleteResponsableMention(data) {
    if (service.verifyIfNotEmpty(data)) {
      listResponsableMention.value.splice(data.index, 1);
      if (service.verifyIfNotEmpty(data.value.id)) {
        overlay.show();
        restApi
          .delete(`/api/responsable-mention/${data.value.id}`)
          .then((response) => {
            if (response.status === 200) alert.successDelete();
            overlay.hide();
            if (service.verifyIfNotEmpty(anneeUniversitaire.id)) {
              restApi
                .get(`/api/responsable-mention/annee/${anneeUniversitaire.id}`)
                .then((response) => {
                  listResponsableMention.value = response.data;
                })
                .catch((error) => {
                  alert.error();
                  console.error(error);
                });
            }
          })
          .catch((error) => {
            alert.error();
            console.error(error);
            overlay.hide();
          });
      }
    }
  }


  return {
    list,
    designation,
    acronyme,
    id,
    listWithNiveau,
    listResponsableMention,
    getMention,
    prepareListWithNiveau,
    deleteMention,
    saveMention,
    createResponsableMention,
    deleteResponsableMention,
    getMentionFullName,
  };
});
