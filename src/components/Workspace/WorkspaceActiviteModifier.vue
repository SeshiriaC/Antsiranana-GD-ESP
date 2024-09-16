<script setup>
// Props
import { ref, watch, onMounted, computed } from "vue";
import { useOverlayStore } from "@/pinia/overlay";
import { useAlertStore } from "@/pinia/alert";
import { useActiviteStore } from "@/pinia/activite";
import { RestApi } from "@/plugins/restApi";
import { useTypeActiviteStore } from "@/pinia/typeActivite";
import { useClasseStore } from "@/pinia/classe";

// Props passed from parent
const props = defineProps({
    activite: Object,
});


// Pinia stores
const overlayStore = useOverlayStore();
const alertStore = useAlertStore();
const activiteStore = useActiviteStore();
const typeActiviteStore = useTypeActiviteStore();
const classeStore = useClasseStore();


// API
const restApi = new RestApi();

// Editing state
const isEditing = ref(true);
const passedActivite = ref({});
//const editedActivite = ref({ ...props.activite });

const editedActivite = ref({});


const id = ref()

//Definir les emissions
const emit = defineEmits(['close']);

//Closing action
const closeDialog = () => {
    emit('close', false)
}

/*
const initializeData = () => {
    //local copy of the activite
    editedActivite.value = props.activite;

}*/


const typeActiviteList = computed(() => typeActiviteStore.list);

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

// Function to save changes
function saveChanges() {


    // Assigner valeur type activite
    const editedActiviteType = typeActiviteStore.list.find((element) => element.id === editedActivite.value.idTypeActivite);
    editedActivite.value.typeActivite = editedActiviteType.typeActivite;

    // Assigner valeur ec
    const editedActiviteEc = ecList.find((ec) => ec.id === editedActivite.value.idEc);
    editedActivite.value.ec = editedActiviteEc.nomEc;

    //Assigner la valeur de la classe
    editedActivite.value.idClasse = props.activite.idClasse;

    const editedActiviteClasse = classeStore.list.find((classe) => classe.id === editedActivite.value.idClasse);
    console.log(editedActiviteClasse);
    editedActivite.value.classe = editedActiviteClasse.designationClasse;

    editedActivite.value.id = props.activite.id;
    editedActivite.value.idEnseignantResponsable = props.activite.idEnseignantResponsable;

    console.log("Modifier: ", props.activite);
    console.log("Activité changé: ", editedActivite.value);

    sendData(editedActivite.value.id, editedActivite.value);
}


function sendData(id, data) {
    overlayStore.show();
    restApi
        .put(`/api/activite/modifier-activite/${id}`, data)
        .then((response) => {
            if (response.status === 200) {
                alertStore.add("success", "Activité mise à jour avec succès!");
                activiteStore.fetchActivite(); // Refresh activities list
                isEditing.value = false; // Close dialog
                editedActivite.value = {};
                emit('close');
            }
        })
        .catch((error) => {
            alertStore.add("error", "Erreur lors de la mise à jour de l'activité!");
            console.error(error);
        })
        .finally(() => {
            overlayStore.hide();
        });
}
// Récupère typeActivites on mount
onMounted(() => {
    typeActiviteStore.fetchTypeActivites();

});

watch(props.activite, (newActivite) => {
    console.log("Props: ", props.activite);
    passedActivite.value = { ...newActivite };
}, { deep: true })
</script>

<template>
    <v-dialog v-model="isEditing" max-width="600px">
        <v-card>
            <v-card-title>Modifier l'activité</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="saveChanges">
                    <v-text-field label="Nom de l'activité" v-model="editedActivite.nomActivite"></v-text-field>
                    <v-select label="Type d'activité" :items="typeActiviteList" item-title="typeActivite"
                        item-value="id" v-model="editedActivite.idTypeActivite" />
                    <v-select label="EC concerné" :items="ecList" item-title="nomEc" item-value="id"
                        v-model="editedActivite.idEc" />
                    <v-date-picker v-model="editedActivite.date" label="Date de l'activité"
                        class="mt-3"></v-date-picker>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="saveChanges">Sauvegarder</v-btn>
                <v-btn color="secondary" @click="closeDialog">Annuler</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>