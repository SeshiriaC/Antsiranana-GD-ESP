<script setup>
// Import Pinia store
import { useDialogStore } from "@/pinia/dialog";

// Use the dialog store
const dialogStore = useDialogStore();

// Map store state and methods
const { isShow, title, component, data, width, fullscreen, hide } = dialogStore;
</script>

<template>
    <v-dialog v-model="isShow" :width="width" persistent :fullscreen="fullscreen">
      <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
          <!-- Dynamic component rendering -->
          <component :is="component" :data="data" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="hide">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  