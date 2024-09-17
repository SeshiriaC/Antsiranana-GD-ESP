// VueRouter's plugins
import { createRouter, createWebHistory } from "vue-router";

// some Workspace's component
import WorkspaceAcceuil from "@/components/Workspace/WorkspaceAcceuil.vue";
import WorkspaceInformationsPersonnelles from "@/components/Workspace/WorkspaceInformationsPersonnelles.vue";
import WorkspaceAUCreer from "@/components/Workspace/WorkspaceAUCreer.vue";
import WorkspaceAUListes from "@/components/Workspace/WorkspaceAUListes.vue";
import WorkspaceAUMention from "@/components/Workspace/WorkspaceAUMention.vue";
import WorkspaceAUParcours from "@/components/Workspace/WorkspaceAUParcours.vue";
import WorkspaceDirection from "@/components/Workspace/WorkspaceDirection.vue";
import WorkspaceScolarite from "@/components/Workspace/WorkspaceScolarite.vue";
import WorkspaceEnseignant from "@/components/Workspace/WorkspaceEnseignant.vue";
import WorkspaceJury from "@/components/Workspace/WorkspaceJury.vue";
import WorkspaceAUResponsableMention from "@/components/Workspace/WorkspaceAUResponsableMention.vue";
import WorkspaceAUResponsableParcours from "@/components/Workspace/WorkspaceAUResponsableParcours.vue";
import WorkspaceConcoursCreer from "@/components/Workspace/WorkspaceConcoursCreer.vue";
import WorkspaceConcoursListes from "@/components/Workspace/WorkspaceConcoursListes.vue";
import WorkspaceConcoursDetails from "@/components/Workspace/WorkspaceConcoursDetails.vue";
import WorkspaceConcoursModifier from "@/components/Workspace/WorkspaceConcoursModifier.vue";
import WorkspaceConcoursCandidatAjouter from "@/components/Workspace/WorkspaceConcoursCandidatAjouter.vue";
import WorkspaceConcoursCandidatListes from "@/components/Workspace/WorkspaceConcoursCandidatListes.vue";
import WorkspaceConcoursNotes from "@/components/Workspace/WorkspaceConcoursNotes.vue";
import WorkspaceConcoursDeliberation from "@/components/Workspace/WorkspaceConcoursDeliberation.vue";
import WorkspaceConcoursResultat from "@/components/Workspace/WorkspaceConcoursResultat.vue";
import WorkspaceConcoursStatistiques from "@/components/Workspace/WorkspaceConcoursStatistiques.vue";
import WorkspaceConcoursAutorisationInscriptionESPA from "@/components/Workspace/WorkspaceConcoursAutorisationInscriptionESPA.vue";
import WorkspaceEtudiantAuthentification from "@/components/Workspace/WorkspaceEtudiantAuthentification.vue";
import WorkspaceInscriptionAdministrative from "@/components/Workspace/WorkspaceInscriptionAdministrative.vue";
import WorkspaceEtudiantValidationInscriptionAdministrative from "@/components/Workspace/WorkspaceEtudiantValidationInscriptionAdministrative.vue";
import WorkspaceInscriptionPedagogique from "@/components/Workspace/WorkspaceInscriptionPedagogique.vue";
import WorkspaceValidationInscriptionPedagogique from "@/components/Workspace/WorkspaceEtudiantValidationInscriptionPedagogique.vue";
import WorkspaceGestionAccesTacheScolarite from "@/components/Workspace/WorkspaceGestionAccesTacheScolarite.vue";
import WorkspaceHeureEnseignement from "@/components/Workspace/WorkspaceHeureEnseignement.vue";
import WorkspaceEtudiant from "@/components/Workspace/WorkspaceEtudiant.vue";
import WorkspaceEtudiantListes from "@/components/Workspace/WorkspaceEtudiantListes.vue";
import WorkspaceEtudiantNotes from "@/components/Workspace/WorkspaceEtudiantNotes.vue";
import WorkspaceEtudiantDeliberation from "@/components/Workspace/WorkspaceEtudiantDeliberation.vue";
import WorkspaceProgrammeEnseignement from "@/components/Workspace/WorkspaceProgrammeEnseignement.vue";
import WorkspaceProgrammeEnseignementCreer from "@/components/Workspace/WorkspaceProgrammeEnseignementCreer.vue";
import WorkspaceProgrammeEnseignementListes from "@/components/Workspace/WorkspaceProgrammeEnseignementListes.vue";
import WorkspaceSelectionDossier from "@/components/Workspace/WorkspaceSelectionDossier.vue";
import WorkspaceEtudiantResultat from "@/components/Workspace/WorkspaceEtudiantResultat.vue";
import WorkspaceEtudiantReleveNote from "@/components/Workspace/WorkspaceEtudiantReleveNote.vue";
import WorkspaceActivite from "@/components/Workspace/WorkspaceActivite.vue";
import WorkspaceActiviteListes from "@/components/Workspace/WorkspaceActiviteListes.vue";
import WorkspaceEtudiantProfil from "@/components/Workspace/WorkspaceEtudiantProfil.vue";
import WorkspaceActiviteAjouter from "@/components/Workspace/WorkspaceActiviteAjouter.vue";
import WorkspaceEvaluations from "@/components/Workspace/WorkspaceEvaluations.vue";
import WorkspaceEvaluationPresence from "@/components/Workspace/WorkspaceEvaluationPresence.vue";
import WorkspaceEvaluationCompetence from "@/components/Workspace/WorkspaceEvaluationCompetence.vue";

// instance of my router and export it
export default createRouter({
  // add history mode
  history: createWebHistory(),

  // all routes used
  routes: [
    { name: "Accueil", path: "/", component: WorkspaceAcceuil },
    {
      name: "Informations personnelles",
      path: "/informations-personnelles",
      component: WorkspaceInformationsPersonnelles,
    },
    {
      name: "Création d'une année universitaire",
      path: "/annee-universitaire/creer",
      component: WorkspaceAUCreer,
    },
    {
      name: "Liste des années universitaires",
      path: "/annee-universitaire/listes",
      component: WorkspaceAUListes,
      children: [
        { name: "Mentions", path: "mention", component: WorkspaceAUMention },
        { name: "Parcours", path: "parcours", component: WorkspaceAUParcours },
        {
          name: "Responsables de mention",
          path: "responsable-mention",
          component: WorkspaceAUResponsableMention,
        },
        {
          name: "Responsables de parcours",
          path: "responsable-parcours",
          component: WorkspaceAUResponsableParcours,
        },
        {
          name: "Président du jury",
          path: "president-jury",
          component: WorkspaceJury,
        },
      ],
    },
    {
      name: "Agents de la direction",
      path: "/direction",
      component: WorkspaceDirection,
    },
    {
      name: "Agents de la scolarité",
      path: "/scolarite",
      component: WorkspaceScolarite,
    },
    {
      name: "Enseignants",
      path: "/enseignant",
      component: WorkspaceEnseignant,
    },
    {
      name: "Créer du concours",
      path: "/concours/creer",
      component: WorkspaceConcoursCreer,
    },
    {
      name: "Liste des concours",
      path: "/concours/listes",
      component: WorkspaceConcoursListes,
      children: [
        {
          name: "Détailler le concours",
          path: "details",
          component: WorkspaceConcoursDetails,
        },
        {
          name: "Modifier le concours",
          path: "modifier",
          component: WorkspaceConcoursModifier,
        },
        {
          name: "Ajouter les candidats",
          path: "candidat/ajouter",
          component: WorkspaceConcoursCandidatAjouter,
        },
        {
          name: "Lister les candidats",
          path: "candidat/listes",
          component: WorkspaceConcoursCandidatListes,
        },
        {
          name: "Transcrire les notes des candidats",
          path: "notes",
          component: WorkspaceConcoursNotes,
        },
        {
          name: "Faire la délibération des candidats",
          path: "deliberation",
          component: WorkspaceConcoursDeliberation,
        },
        {
          name: "Résultats du concours",
          path: "resultat",
          component: WorkspaceConcoursResultat,
        },
        {
          name: "Statistiques du concours",
          path: "statistiques",
          component: WorkspaceConcoursStatistiques,
        },
        {
          name: "Autoriser les admis à s'inscrire",
          path: "autorisation/inscription",
          component: WorkspaceConcoursAutorisationInscriptionESPA,
        },
      ],
    },
    {
      name: "Faire l'inscription administrative",
      path: "/inscription-administrative",
      component: WorkspaceInscriptionAdministrative,
    },
    {
      name: "Faire l'inscription pédagogique",
      path: "/inscription-pedagogique",
      component: WorkspaceInscriptionPedagogique,
    },

    {
      name: "Gérer les agents de la scolarité",
      path: "/gestion-acces-tache",
      component: WorkspaceGestionAccesTacheScolarite,
    },
    {
      name: "Programme d'enseignement",
      path: "/programme-enseignement",
      component: WorkspaceProgrammeEnseignement,
      children: [
        {
          name: "Lister les programmes d'enseignement",
          path: "listes",
          component: WorkspaceProgrammeEnseignementListes,
        },
        {
          name: "Créer un programme d'enseignement",
          path: "creer",
          component: WorkspaceProgrammeEnseignementCreer,
        },
      ],
    },
    {
      name: "Compter les heures d'enseignement",
      path: "/heure-enseignement",
      component: WorkspaceHeureEnseignement,
    },
    {
      name: "Les étudiants",
      path: "/etudiant",
      component: WorkspaceEtudiant,
      children: [
        {
          name: "Lister les étudiants",
          path: "listes",
          component: WorkspaceEtudiantListes,
        },
        {
          name: "Transcrire les notes des étudiants",
          path: "notes",
          component: WorkspaceEtudiantNotes,
        },
        {
          name: "Valider les inscriptions pédagogique",
          path: "validation-inscription-pedagogique",
          component: WorkspaceValidationInscriptionPedagogique,
        },
        {
          name: "Faire la délibération des étudiants",
          path: "deliberation",
          component: WorkspaceEtudiantDeliberation,
        },
        {
          name: "Résultat du fin AU",
          path: "resultat",
          component: WorkspaceEtudiantResultat,
        },
        {
          name: "Créer les LOGIN des étudiants",
          path: "authentification",
          component: WorkspaceEtudiantAuthentification,
        },
        {
          name: "Valider inscription administrative",
          path: "validation-inscription-administrative",
          component: WorkspaceEtudiantValidationInscriptionAdministrative,
        },
        {
          name: "Visualiser un relevé de notes",
          path: "releve-note",
          component: WorkspaceEtudiantReleveNote,
        },
        {
          name: "Profil de l'étudiant",
          path: "profil",
          component: WorkspaceEtudiantProfil,
        },
      ],
    },
    {
      name: "Valider les séléctions de dossier",
      path: "/selection-dossier",
      component: WorkspaceSelectionDossier,
    },
    {
      name: "Les activités pédagogiques",
      path: "/activite",
      component: WorkspaceActivite,
      children: [
        {
          name: "Ajouter une activité",
          path: "ajouter-activite",
          component: WorkspaceActiviteAjouter,
        },
        {
          name: "Liste des activités",
          path: "listes",
          component: WorkspaceActiviteListes,
        },
      ],
    },
    {
      name: "Les évaluations",
      path: "/evaluations",
      component: WorkspaceEvaluations,
      children: [
        {
          name: "Evaluation de présence",
          path: "presence",
          component: WorkspaceEvaluationPresence,
        },
        {
          name: "Evaluations de compétences",
          path: "competence",
          component: WorkspaceEvaluationCompetence,
        },
      ],
    },
  ],
});
