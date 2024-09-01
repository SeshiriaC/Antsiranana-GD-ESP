<script setup>
// my plugins
import { URL } from '@/plugins/url';
import { Service } from '@/plugins/service';

// vuejs's plugins
import { ref, onMounted } from 'vue';

// pinia's plugins
import { useAlertStore } from '@/pinia/alert';
import { useAuthentificationStore } from '@/pinia/authentification';

// instance my plugins
const url = new URL();
const service = new Service();

// instance pinia's plugins
const alert = useAlertStore();
const authentification = useAuthentificationStore();

// create some variable as ref
const pseudo = ref('');
const motDePasse = ref('');
const showPassword = ref(false);

// verifying the form and try to login
function verify() {

  // make form's data on an object
  let requestData = {
    pseudo: pseudo.value,
    motDePasse: motDePasse.value
  }
  
  // check if form is OK
  if (service.verifyFormIfOK(requestData)) {
    authentification.check(service.stringTrim(pseudo.value), service.stringTrim(motDePasse.value));
  } 
  else alert.warningForm();
}
</script>

<template>
  <div id="container-form-authentification" class="text-center">
    <img id="img-logo-espa" :src="`${url.images}/logo-esp-antsiranana.png`" class="mb-16"/>
    <v-card class="mx-auto elevation-24 rounded-lg" width="400">
      <v-card-text>        
        <h1 class="pb-8 pt-4">Bienvenue sur GD-ESP</h1>
        <form autocomplete="off" @submit.prevent>
          <v-text-field label="Votre Identifiant ou e-mail" hide-details="auto" class="mb-6" clearable v-model="pseudo" type="text"></v-text-field>
          <v-text-field label="Votre mot de passe" hide-details="auto" class="mb-6" clearable v-model="motDePasse" autocomplete="off" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="showPassword ? 'text' : 'password'" @click:append-inner="showPassword = !showPassword" @keypress.enter="verify"></v-text-field>
          <v-btn append-icon="mdi-login" block rounded="lg" size="x-large" color="indigo darken-4" class="text-transform-class text-none" @click="verify">Se connecter</v-btn>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
#container-form-authentification {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#img-logo-espa {
  width: 300px;
  margin-bottom: 30px;
}
</style>