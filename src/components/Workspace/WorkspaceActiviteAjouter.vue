<script setup>
//importation stores
import { useTypeActiviteStore } from "@/pinia/typeActivite";
import { useEnseignantStore } from "@/pinia/enseignant";
import { ref, onMounted, computed } from "vue";
import { useActiviteStore } from "@/pinia/activite";
import { useClasseStore } from "@/pinia/classe";
import { useAlertStore } from "@/pinia/alert";

//importation plugins
import { Cookies } from "@/plugins/cookies";
import { useOverlayStore } from "@/pinia/overlay";
import { RestApi } from "@/plugins/restApi";


// Initialiser plugin
const restApi = new RestApi();

// Initialiser les stores
const enseignantStore = useEnseignantStore();
const typeActiviteStore = useTypeActiviteStore();
const classeStore = useClasseStore();
const activiteStore = useActiviteStore();
const overlay = useOverlayStore();
const alert = useAlertStore();

//computed properties to access state from store
const enseignantResponsable = computed(() => enseignantStore.fetchedEnseignant);
const selectedClasseInStore = computed(() => classeStore.selectedClasseInStore);
const typeActiviteList = computed(() =>
    typeActiviteStore.list)


const cookies = new Cookies();

// Récupérer idEnseignant en utilisant idPersonne dans cookies
const idPersonne = cookies.get("idPersonne");
console.log("Personne à ajouter:", idPersonne);
enseignantStore.fetchIdEnseignant(idPersonne);

//Liste EC
const ecList = [
    { id: 97, nomEc: 'Systèmes_Info&Algo' },
    { id: 98, nomEc: 'Mécaniques_des_fluides' },
    { id: 99, nomEc: 'Thermodynamiques' },
    { id: 100, nomEc: 'Mécaniques_génarales1' },
    { id: 101, nomEc: 'Magnétostatiques' },
    { id: 102, nomEc: 'Analyses' },
    { id: 77, nomEc: 'Chimie' },
    { id: 78, nomEc: 'Resistances_des_Materiau' },
    { id: 79, nomEc: 'Dessin_techniques' },
    { id: 80, nomEc: 'Mathématiques' },
    { id: 81, nomEc: 'Français' },
    { id: 82, nomEc: 'Anglais' }]

// Etat local pour les nouvelles activités
const newActivite = ref({
    date: null,
    designationActivite: "",
    idTypeActivite: null,
    idClasse: null,
    idEc: null,
    idEnseignantResponsable: null,
});


// Récupère typeActivites on mount
onMounted(() => {
    typeActiviteStore.fetchTypeActivites();
    // Fetch typeActivites

    // Fetch enseignant ID and set it in the newActivite object

});

// Function to handle form submission
function validerActivite() {
    // idEnseignantResponsable = fetched enseignant ID
    newActivite.value.idEnseignantResponsable = enseignantResponsable.value.id;
    console.log("Selected enseignant: ", enseignantResponsable);

    // idClasse = selected class from the store
    newActivite.value.idClasse = selectedClasseInStore.value;
    console.log("Store classe: ", selectedClasseInStore.value);

    // Log the form data
    console.log("Submitting form with data:", newActivite.value);

    // Créer une activité
    restApi
        .post(`/api/activite/${newActivite.value.idTypeActivite}`, newActivite.value)
        .then((response) => {
            if (response.status == 200) alert.successSave();
            overlay.hide();
            console.log("Activité créée avec succès !");
            fetchActivite();
        })
        .catch((error) => {
            console.error("Erreur lors de la création de l'activité :", error);
            console.error(error);
            overlay.hide();
        });
}
</script>

<template>
    <v-container>
        <v-row no-gutters class="mt-8">
            <v-col cols="12">
                <h5 class="text-h5">Ajouter une activité</h5>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="8">
                <v-col cols="8">
                    <v-text-field clearable label="Nom de l'activité"
                        v-model="newActivite.designationActivite"></v-text-field>
                </v-col>
                <v-col cols="8">
                    <v-select label="Type de l'activité" :items="typeActiviteList" item-title="typeActivite"
                        item-value="id" v-model="newActivite.idTypeActivite"></v-select>
                </v-col>
                <v-col cols="8">
                    <v-select label="EC concerné" :items="ecList" item-title="nomEc" item-value="id"
                        v-model="newActivite.idEc"></v-select>
                </v-col>
                <v-col>
                    <v-btn text="Valider" @click="validerActivite"></v-btn>
                </v-col>

            </v-col>


            <v-row align="start">
                <v-date-picker elevation="24" v-model="newActivite.date"></v-date-picker>
            </v-row>


        </v-row>

    </v-container>

</template>