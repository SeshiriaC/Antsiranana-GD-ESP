import { RestApi } from "@/plugins/restApi";
import { Service } from "@/plugins/service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useActiviteStore = defineStore("activite", () => {
  //Initiation des plugins
  const restApi = new RestApi();
  const service = new Service();

  //création des variables
  const list = ref([]);
  const id = ref(null);
  const date = ref(null);
  const designation = ref(null);
  const idTypeActivite = ref(null);
  const idEc = ref(null);
  const idEnseignant = ref(null);
  const idClasse = ref(null);

  //Ajouter une activite
  function createActivite(){
    let requestData = {
      date: date.value,
      designation : designation.value,
      idTypeActivite : idTypeActivite.value,
      idClasse : idClasse.value,
      idEc : idEc.value,
      idEnseignant : idEnseignant.value 
    }
  }


  //Récupération activité
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

  //Récupération activité par classe
  function fetchActiviteByClasse(idClasse) {
    restApi
      .get(`api/activite/par-classe/${idClasse}`)
      .then((response) => {
        console.log("Fetch activite par classe, expected list filtré par classe");
        list.value = response.data;
        console.log("Fetched activite:", list);
      })
      .catch((error) => {
        console.log("Erreur de récupération de la liste d'activité par classe dû à:");
        console.error(error);
      })
  }

    // Method to create a new activite
    function createActivite(newActivite) {
      return restApi
        .post(`/api/activite`, newActivite)
        .then((response) => {
          fetchActivite(); // Refresh list after creating
          return response.data;
        })
        .catch((error) => {
          console.error("Erreur lors de la création de l'activité :", error);
          throw error;
        });
    }

  return {
    id,
    list,
    date,
    designation,
    idEc,
    idEnseignant,
    idClasse,
    fetchActivite,
    fetchActiviteByClasse,
    createActivite
  };
});
