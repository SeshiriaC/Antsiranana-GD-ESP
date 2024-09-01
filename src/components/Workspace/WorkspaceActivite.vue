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

// Bind selected values to v-model in your template
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

//Watcher for selectedAnneeUniversitaire changes
watch(selectedAnneeUniversitaire, (newIdAU) => {
  if (newIdAU) {
    selectedMention.value = null;
    selectedClasse.value = null;
  } else {
    mentionList.value = [];
    classeList.value = [];
    console.log("Nope")
  }
});


// Watcher for selectedMention changes
watch(selectedMention, (newIdMention) => {
  if (newIdMention) {
    // Find the mention object by ID from the mentionList
    const selectedMentionObject = mentionList.value.find((mention) => mention.id === newIdMention);

    if (selectedMentionObject) {
      // Access the acronyme property from the found mention object
      const acronyme = selectedMentionObject.acronymeMention;
      console.log(acronyme, ":", typeof (acronyme));

      // Fetch classes based on the mention acronyme 
      classeStore.fetchClassesByMention(acronyme);
        
    }

    // Reset class selection when mention changes
    selectedClasse.value = null;
  } else {
    // Clear classes if no mention is selected
    classeStore.list.value = [];
  }
});


// Fetch a specific class by ID (example function)
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
          Sélectionnez l'année universitaire, la mention, et la classe des étudiants
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
        <v-select density="comfortable" label="Classe" :items="classeList" item-title="designation" item-value="id"
          v-model="selectedClasse" :disabled="!selectedNiveau" />
      </v-col>
    </v-row>

    <router-view></router-view>
  </v-container>
</template>
