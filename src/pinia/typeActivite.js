import { defineStore } from "pinia";
import { RestApi } from "@/plugins/restApi";
import { ref } from "vue";

export const useTypeActiviteStore = defineStore("typeActivite", () => {
  // Initialize API instance
  const restApi = new RestApi();

  // Reactive state for typeActivites
  const list = ref([]);

  // Method to fetch all typeActivites
  function fetchTypeActivites() {
    return restApi
      .get(`/api/typeActivite`) 
      .then((response) => {
        list.value = response.data; // Update state with fetched data
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des types d'activités :", error);
      });
  }

  return {
    list,
    fetchTypeActivites, 
  };
});
