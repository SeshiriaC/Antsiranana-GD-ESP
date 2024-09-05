<script setup>
//importation stores
import { useTypeActiviteStore } from "@/pinia/typeActivite";
import { useEnseignantStore } from "@/pinia/enseignant";

//importation plugins
import { ref, onMounted, computed } from "vue";
import { useActiviteStore } from "@/pinia/activite";

// Initialiser les stores
const enseignantStore = useEnseignantStore();
const typeActiviteStore = useTypeActiviteStore();
const activiteStore = useActiviteStore();

//computed properties to access state from store
const typeActiviteList = typeActiviteStore.list.map((item) => item.typeActivite);
console.log("TypeActiviteList: ", typeActiviteList);

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
    typeActiviteStore.fetchTypeActivites(); // Fetch typeActivites

    // Fetch enseignant ID and set it in the newActivite object
    enseignantStore.fetchIdEnseignant().then(() => {
        newActivite.value.idEnseignantResponsable = enseignantStore.idEnseignantConnecte;
    }).catch((error) => {
        console.error("Failed to fetch enseignant ID:", error);
    });
});

// Function to handle form submission
function validerActivite() {
    console.log("Submitting form with data:", newActivite.value);
    //activiteStore.createActivite();//TO DO : Post it to the 
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
                    <v-select label="Type de l'activité"
                        :items="typeActiviteList"
                        v-model="newActivite.idTypeActivite"></v-select>
                </v-col>
                <v-col cols="8">
                    <v-select label="EC concerné" 
                    :items="[
                        'Systèmes_Info&Algo', 'Mécaniques_des_fluides',
                        'Thermodynamiques', 'Mécaniques_génarales1',
                        'Magnétostatiques', 'Analyses',
                        'Chimie', 'Resistances_des_Materiau',
                        'Dessin_techniques', 'Mathématiques',
                        'Français', 'Anglais']"
                    v-model="newActivite.idEc"></v-select>
                </v-col>
                <v-col>
                    <v-btn
                        text="Valider"
                        @click="validerActivite"
                        ></v-btn>
                </v-col>

            </v-col>


            <v-row align="start">
                <v-date-picker elevation="24" v-model="newActivite.date"></v-date-picker>
            </v-row>


        </v-row>

    </v-container>

</template>