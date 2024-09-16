<script setup>
import { useDialogStore } from '@/pinia/dialog';
import { useActiviteStore } from '@/pinia/activite';

//instance des plugins pinia
const dialogStore = useDialogStore();
const activiteStore = useActiviteStore();

//Fonction pour le choix oui de l'utilisateur
function oui() {
    console.log("Suppression de l'activité, id: ", dialogStore.data);
    activiteStore.deleteActivite(dialogStore.data);
    dialogStore.hide();
    setTimeout(refreshPage, 2000);
}

function non() {
    dialogStore.hide();
}

//Refreshhhh 
const refreshPage = () => {
    window.location.reload(); // Reloads the current page
};
</script>

<template>
    <!-- Making decision Yes or No -->
    <v-card-actions class="d-flex justify-space-around mt-16">
        <v-btn rounded="pill" class="px-6" prepend-icon="mdi-comment-check" variant="tonal" color="success"
            @click="oui">OUI</v-btn>
        <v-btn rounded="pill" class="px-6" prepend-icon="mdi-comment-remove" variant="tonal" color="red"
            @click="non">NON</v-btn>
    </v-card-actions>
</template>