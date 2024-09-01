<script setup>
// import my pinia plugins
import { useAppchoiceStore } from '@/pinia/appchoice';

// instance my pinia plugins
const appchoice = useAppchoiceStore();
</script>

<template>
  <v-btn variant="tonal" @click="appchoice.toggle()" title="Changer d'app?" rounded="pill" class="text-transform-class text-none">
    FollowUp
  </v-btn>
</template>