import { defineStore } from "pinia";
import { ref } from "vue";
import { RestApi } from "@/plugins/restApi";


export const useClasseStore = defineStore("classe", () => {
  const restApi = new RestApi();

  const list = ref([]);
  const id = ref(null);
  const designation = ref(null);
  const niveau = ref(null);
  const mention = ref(null);
  const parcours = ref(null);
  const selectedClasse = ref(null);

  // Fonction pour récupérer classe % à la mention
  function fetchClassesByMention(mentionAcronyme) {
    restApi
      .get(`/api/classe/${mentionAcronyme}`)
      .then((response) => {
        console.log("Fetch by Mention sent");
        list.value = response.data;
        console.log(list);
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
    id,
    list,
    designation,
    niveau,
    mention,
    parcours,
    selectedClasse,
    fetchClassesByMention,
    getClasse,
  };
});
