import { defineStore } from "pinia";
import { ref } from "vue";
import { RestApi } from "@/plugins/restApi";
export const useClasseStore = defineStore("classe", () => {
  const restApi = new RestApi();

  const list = ref([]);
  const selectedClasse = ref(null);

  // Fonction pour récupérer classe % à la mention
  function fetchClassesByMention(mentionAcronyme) {
    restApi
      .get(`/api/classe/${mentionAcronyme}`)
      .then((response) => {
        console.log("Fetch by Mention sent");
        list.value = response.data;
        console.log(list.value);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Fonction pour récupérer la classe % à l'id
  function getClasse(id) {
    const result = ref(null);
    list.value.map((item) => {
      if (item.id === id) result.value = item.designationClasse;
    });
    return result.value;
  }

  return {
    list,
    selectedClasse,
    fetchClassesByMention,
    getClasse,
  };
});
