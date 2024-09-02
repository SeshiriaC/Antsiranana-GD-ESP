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
  const idEc = ref(null);
  const idEnseignant = ref(null);
  const idClasse = ref(null);

  //Récupération activité 
  function fetchActivite(){
    restApi
    .get(`api/activite`)
    .then((response) =>{
      console.log("Fetch activite sent, expected list")
    })
  }


});