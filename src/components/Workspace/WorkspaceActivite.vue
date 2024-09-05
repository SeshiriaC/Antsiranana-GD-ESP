<script setup>
import { useClasseStore } from '@/pinia/classe';
import { useMentionStore } from '@/pinia/mention';
import { useAnneeUniversitaireStore } from '@/pinia/anneeUniversitaire';
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useNiveauStore } from '@/pinia/niveau';
import { Scroll } from '@/plugins/scroll';
import { Service } from '@/plugins/service';
import { RestApi } from '@/plugins/restApi';

// instance my plugins
const restApi = new RestApi();
const service = new Service();
const scroll = new Scroll();

// Initialize the stores
const classeStore = useClasseStore();
const mentionStore = useMentionStore();
const anneeUniversitaireStore = useAnneeUniversitaireStore();
const niveauStore = useNiveauStore();

// Computed properties to access state from the stores
const anneeUniversitaireList = computed(() => anneeUniversitaireStore.list);
const mentionList = computed(() => mentionStore.list);
const classeList = computed(() => classeStore.list);
const niveauList = computed(() => niveauStore.list);

// Bind selected values to v-model in template
const selectedAnneeUniversitaire = ref(anneeUniversitaireStore.id);
const selectedNiveau = ref(null);
const selectedMention = ref(null);
const selectedClasse = ref(null);

onBeforeMount(() => {
  scroll.toTop();
  anneeUniversitaireStore.list = [];
  niveauStore.list = [];
  mentionStore.list = [];
  classeStore.list = [];
  
  Promise.all([
    restApi.get(`/api/annee`),
    restApi.get(`/api/niveau`),
    restApi.get(`/api/mention`)])
    .then((response) => {
      anneeUniversitaireStore.list = response[0].data;
      niveauStore.list = response[1].data;
      mentionStore.list = response[2].data;
    })
    .catch((error) => {
      console.error(error);
      console.log("Problem with promise")
    });
  if (service.verifyIfNotEmpty(anneeUniversitaireStore.id)) {
    restApi
      .get(`/api/classe`)
      .then((response) => {
        classeStore.list = response.data;
        console.log(classeStore.list);
      })
      .catch((error) => {
        alert.error();
        console.log("Problem with getting class from api");
        console.error(error);
      });
  }
});

// Watcher for changes in selectedAnneeUniversitaire
watch(selectedAnneeUniversitaire, (newIdAU) => {
  // Reset dependent states
  selectedMention.value = null;
  selectedClasse.value = null;
  if (service.verifyIfNotEmpty(newIdAU)) {
    restApi
      .get(`/api/definition-mention/annee/${newIdAU}`)
      .then((response) => {
        mentionStore.list = response.data;
      })
      .catch((error) => {
        alert.error();
        console.error(error);
      });
  } else {
    // Clear lists when no academic year is selected
    mentionList = [];
    classeList = [];
  }
});


// Watcher for selectedMention changes
watch(selectedMention, (newIdMention) => {
  selectedNiveau.value = null;
  selectedClasse.value = null;
  
  if (newIdMention) {
    // Find the mention object by ID from the mentionList
    const selectedMentionObject = mentionList.value.find(
      (mention) => mention.id === newIdMention
    );

    console.log("Mention sélectionnée 2", selectedMentionObject.acronymeMention);

    if (selectedMentionObject) {
      // Access the acronyme property
      const acronyme = selectedMentionObject.acronymeMention;

      // Re-fetch classes based on the new acronyme
      classeStore.fetchClassesByMention(acronyme);

    } else {
      // Handle case where mention object is not found 
      console.log("La mention n'a pas été trouvée e");
    }
  } else {
    // Clear classes if no mention is selected
    classeStore.list = [];
    console.log("Aucune mention sélectionnée");
  }

});


//watch for selectedNiveau change
watch(selectedNiveau, (newIdNiveau) => {
  selectedClasse.value = null; //initialization of classe value
  if (newIdNiveau) {
    // Find the corresponding niveau object
    const selectedNiveauObject = niveauList.value.find(
      (niveau) => niveau.id === newIdNiveau
    );

    // Find the corresponding mention object
    const selectedMentionObject = mentionList.value.find(
      (mention) => mention.id === selectedMention.value
    );

    if (selectedNiveauObject) {
      // Access the niveau value
      const niveauValue = selectedNiveauObject.niveau;

      // Filter based on both mention and niveau
      let filteredClasses = [];

      classeStore.list.forEach((classe) => {
        if (
          classe.niveau === niveauValue &&
          classe.mention === selectedMentionObject.acronymeMention) {
          console.log(classe.niveau)
          filteredClasses.push(classe);
        }
      });

      classeStore.list = filteredClasses;

    } else {
      classeStore.list = [];
      console.log("Pas de niveau séléctionné");
    }
  } else { 
    classeStore.list = [];
    console.log("Niveau est null");
  }

});



// Fetch a specific class by ID 
function fetchClasseById(id) {
  const designation = classeStore.getClasse(id);
  console.log('Fetched Classe Designation:', designation);
}
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <h4 class="text-h4">Gestion des activités pédagogiques</h4>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-8">
      <v-col cols="12">
        <p class="font-weight-black text-subtitle-1 pb-2">
          Sélectionnez l'année universitaire, la mention, et la classe des étudiants.
        </p>
      </v-col>

      <v-col class="pr-12">
        <v-select density="comfortable" label="Année universitaire" :items="anneeUniversitaireList" item-title="nomAU"
          item-value="id" v-model="selectedAnneeUniversitaire"
          @change="selectedMention = null; selectedClasse = null; selectedNiveau = null" />
      </v-col>

      <v-col class="px-2">
        <v-select density="comfortable" label="Mention" :items="mentionList" item-title="acronymeMention"
          item-value="id" v-model="selectedMention" :disabled="!selectedAnneeUniversitaire"
          @change="selectedClasse = null; selectedNiveau = null" />
      </v-col>

      <v-col class="px-2">
        <v-select density="comfortable" label="Niveau" :items="niveauList" item-title="niveau" item-value="id"
          v-model="selectedNiveau" :disabled="!selectedMention" @change="selectedClasse = null" />
      </v-col>

      <v-col class="px-2">
        <v-select density="comfortable" label="Classe" :items="classeList" item-title="designationClasse"
          item-value="id" v-model="selectedClasse" :disabled="!selectedNiveau" />
      </v-col>
    </v-row>

    <router-view></router-view>
  </v-container>
</template>
