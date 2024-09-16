<script setup>
// some pinia plugins
import { useDialogStore } from '@/pinia/dialog';

// some Components
import DialogDeconnexion from './Dialog/DialogDeconnexion.vue';
import DialogModifierInformationsPersonnelles from './Dialog/DialogModifierInformationsPersonnelles.vue';
import DialogCreerAnneeUniversitaire from './Dialog/DialogCreerAnneeUniversitaire.vue';
import DialogSupprimerAnneeUniversitaire from './Dialog/DialogSupprimerAnneeUniversitaire.vue';
import DialogModifierAnneeUniversitaire from './Dialog/DialogModifierAnneeUniversitaire.vue';
import DialogEnregistrerMention from './Dialog/DialogEnregistrerMention.vue';
import DialogSupprimerMention from './Dialog/DialogSupprimerMention.vue';
import DialogEnregistrerParcours from './Dialog/DialogEnregistrerParcours.vue';
import DialogSupprimerParcours from './Dialog/DialogSupprimerParcours.vue';
import DialogCreerDirection from './Dialog/DialogCreerDirection.vue';
import DialogSupprimerDirection from './Dialog/DialogSupprimerDirection.vue';
import DialogModifierDirection from './Dialog/DialogModifierDirection.vue';
import DialogCreerScolarite from './Dialog/DialogCreerScolarite.vue';
import DialogSupprimerScolarite from './Dialog/DialogSupprimerScolarite.vue';
import DialogCreerEnseignant from './Dialog/DialogCreerEnseignant.vue';
import DialogModifierEnseignant from './Dialog/DialogModifierEnseignant.vue';
import DialogCreerResponsableMention from './Dialog/DialogCreerResponsableMention.vue';
import DialogSupprimerResponsableMention from './Dialog/DialogSupprimerResponsableMention.vue';
import DialogCreerResponsableParcours from './Dialog/DialogCreerResponsableParcours.vue';
import DialogSupprimerResponsableParcours from './Dialog/DialogSupprimerResponsableParcours.vue';
import DialogSupprimerCentreConcours from './Dialog/DialogSupprimerCentreConcours.vue';
import DialogSupprimerMatiereConcours from './Dialog/DialogSupprimerMatiereConcours.vue';
import DialogEnregistrerConcours from './Dialog/DialogEnregistrerConcours.vue';
import DialogSupprimerCandidatConcours from './Dialog/DialogSupprimerCandidatConcours.vue';
import DialogEnregistrerCandidatConcours from './Dialog/DialogEnregistrerCandidatConcours.vue';
import DialogEnregistrerNoteCandidatConcours from './Dialog/DialogEnregistrerNoteCandidatConcours.vue';
import DialogEnregistrerDeliberationConcours from './Dialog/DialogEnregistrerDeliberationConcours.vue';
import DialogAutoriserInscription from './Dialog/DialogAutoriserInscription.vue';
import DialogAutoriserInscriptionAttente from './Dialog/DialogAutoriserInscriptionAttente.vue';
import DialogEnregistrerNumeroRecu from './Dialog/DialogEnregistrerNumeroRecu.vue';
import DialogCreerAuthentificationEtudiant from './Dialog/DialogCreerAuthentificationEtudiant.vue';
import DialogValiderInscriptionAdministrative from './Dialog/DialogValiderInscriptionAdministrative.vue';
import DialogEnregistrerInscriptionAdministrative from './Dialog/DialogEnregistrerInscriptionAdministrative.vue';
import DialogEnregistrerInscriptionPedagogique from './Dialog/DialogEnregistrerInscriptionPedagogique.vue';
import DialogValiderInscriptionPedagogique from './Dialog/DialogValiderInscriptionPedagogique.vue';
import DialogEnregistrerGestionAccesTacheScolarite from './Dialog/DialogEnregistrerGestionAccesTacheScolarite.vue';
import DialogCreerProgrammeEnseignement from './Dialog/DialogCreerProgrammeEnseignement.vue';
import DialogSupprimerProgrammeEnseignement from './Dialog/DialogSupprimerProgrammeEnseignement.vue';
import DialogEnregistrerHeureEnseignement from './Dialog/DialogEnregistrerHeureEnseignement.vue';
import DialogEnregistrerEtudiantNotes from './Dialog/DialogEnregistrerEtudiantNotes.vue';
import DialogModifierProgrammeEnseignement from './Dialog/DialogModifierProgrammeEnseignement.vue';
import DialogEnregistrerEtudiantDeliberation from './Dialog/DialogEnregistrerEtudiantDeliberation.vue';
import DialogEnregistrerAutorisationInscription from './Dialog/DialogEnregistrerAutorisationInscription.vue';
import DialogVisualiserReleveNote from './Dialog/DialogVisualiserReleveNote.vue';
import DialogVisualiserUE from './Dialog/DialogVisualiserUE.vue';
import DialogSupprimerActivite from './Dialog/DialogSupprimerActivite.vue';



// object of components's Dialog
const components = {
  DialogDeconnexion,
  DialogModifierInformationsPersonnelles,
  DialogCreerAnneeUniversitaire,
  DialogSupprimerAnneeUniversitaire,
  DialogModifierAnneeUniversitaire,
  DialogEnregistrerMention,
  DialogSupprimerMention,
  DialogEnregistrerParcours,
  DialogSupprimerParcours,
  DialogCreerDirection,
  DialogSupprimerDirection,
  DialogModifierDirection,
  DialogAutoriserInscriptionAttente,
  DialogCreerScolarite,
  DialogSupprimerScolarite,
  DialogCreerEnseignant,
  DialogModifierEnseignant,
  DialogCreerResponsableMention,
  DialogSupprimerResponsableMention,
  DialogCreerResponsableParcours,
  DialogSupprimerResponsableParcours,
  DialogSupprimerCentreConcours,
  DialogSupprimerMatiereConcours,
  DialogEnregistrerConcours,
  DialogSupprimerCandidatConcours,
  DialogEnregistrerCandidatConcours,
  DialogEnregistrerNoteCandidatConcours,
  DialogEnregistrerDeliberationConcours,
  DialogAutoriserInscription,
  DialogEnregistrerNumeroRecu,
  DialogCreerAuthentificationEtudiant,
  DialogValiderInscriptionAdministrative,
  DialogEnregistrerInscriptionAdministrative,
  DialogEnregistrerInscriptionPedagogique,
  DialogValiderInscriptionPedagogique,
  DialogEnregistrerGestionAccesTacheScolarite,
  DialogCreerProgrammeEnseignement,
  DialogSupprimerProgrammeEnseignement,
  DialogEnregistrerHeureEnseignement,
  DialogEnregistrerEtudiantNotes,
  DialogModifierProgrammeEnseignement,
  DialogEnregistrerEtudiantDeliberation,
  DialogEnregistrerAutorisationInscription,
  DialogVisualiserReleveNote,
  DialogVisualiserUE,
  DialogSupprimerActivite
};

// instance of some pinia plugins
const dialog = useDialogStore();
</script>

<template>
  <!-- The principale Dialog component -->
  <v-dialog v-model="dialog.isShow" class="text-center mx-16" :width="dialog.width"
    transition="dialog-bottom-transition" :fullscreen="dialog.fullscreen">
    <v-card class="pa-16 rounded-xl">
      <v-card-text>
        <h3>{{ dialog.title }}</h3>
      </v-card-text>

      <!-- auto-select the component -->
      <component :is="components[dialog.component]"></component>

    </v-card>
  </v-dialog>
</template>