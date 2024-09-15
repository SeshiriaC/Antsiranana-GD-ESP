// import my plugins
import { Service } from "@/plugins/service";

// import Vuejs's plugins
import { ref, reactive } from "vue";

// import Pinia plugins
import { defineStore } from "pinia";

// import my pinia plugins
import { useDirectionStore } from "./direction";
import { useScolariteStore } from "./scolarite";

// export this store
export const useNavigationStore = defineStore("navigation", () => {
  // instance my plugins
  const service = new Service();

  // create variables
  const list = ref([]);
  const showNav = ref(true);

  // saving all component available for each user
  const access = reactive({
    scolarite: [],
    direction: [],
    etudiant: [],
    enseignant: [],
    responsableMention: [],
    responsableParcours: [],
    presidentJury: [],
  });

  // instance of my Pinia plugins
  const direction = useDirectionStore();
  const scolarite = useScolariteStore();

  // getting list of all "Espace de travail" available
  function getList(status) {
    switch (status) {
      case "DIRECTION":
        access.direction = [];
        if (direction.access.gestionSeminairePedagogiques === true) {
          access.direction.push({
            name: "Année universitaire",
            path: "/annee-universitaire",
            icon: "mdi-briefcase-clock",
            children: [
              {
                name: "Liste des années universitaires",
                path: "/annee-universitaire/listes",
                icon: "mdi-file-multiple",
                innerChildren: [
                  {
                    name: "Mentions",
                    path: "/annee-universitaire/listes/mention",
                    icon: "mdi-arrow-right-bottom-bold",
                  },
                  {
                    name: "Parcours",
                    path: "/annee-universitaire/listes/parcours",
                    icon: "mdi-arrow-right-bottom-bold",
                  },
                  {
                    name: "Responsables de mentions",
                    path: "/annee-universitaire/listes/responsable-mention",
                    icon: "mdi-arrow-right-bottom-bold",
                  },
                  {
                    name: "Responsables de parcours",
                    path: "/annee-universitaire/listes/responsable-parcours",
                    icon: "mdi-arrow-right-bottom-bold",
                  },
                  {
                    name: "Président du jury",
                    path: "/annee-universitaire/listes/president-jury",
                    icon: "mdi-arrow-right-bottom-bold",
                  },
                ],
              },
              {
                name: "Création d'une année universitaire",
                path: "/annee-universitaire/creer",
                icon: "mdi-file-plus",
              },
            ],
          });
        }
        if (direction.access.gestionUtilisateur === false) {
          access.direction.push({
            name: "Gestion des personnels",
            path: "/etudiant",
            icon: "mdi-account-multiple",
            children: [
              {
                name: "Listes des étudiants",
                path: "/etudiant/listes",
                icon: "mdi-account-school",
              },
            ],
          });
        }
        if (direction.access.gestionUtilisateur === true) {
          access.direction.push({
            name: "Gestion des personnels",
            path: "/etudiant",
            icon: "mdi-account-multiple",
            children: [
              {
                name: "Etudiants",
                path: "/etudiant/listes",
                icon: "mdi-account-school",
              },
              {
                name: "Agents de la direction",
                path: "/direction",
                icon: "mdi-account-multiple-plus",
              },
              {
                name: "Agents de la Scolarité",
                path: "/scolarite",
                icon: "mdi-account-multiple-plus",
              },
              {
                name: "Enseignants",
                path: "/enseignant",
                icon: "mdi-account-multiple-plus",
              },
            ],
          });
        }
        if (service.verifyIfNotEmpty(access.direction)) return access.direction;
        else break;
      case "SCOLARITE":
        access.scolarite = [];
        if (scolarite.access.gestionConcoursTCI === true) {
          access.scolarite.push({
            name: "Concours",
            path: "/concours",
            icon: "mdi-script",
            children: [
              {
                name: "Liste des concours",
                path: "/concours/listes/details",
                icon: "mdi-file-multiple",
                innerChildren: [
                  {
                    name: "Détailler le concours",
                    path: "/concours/listes/details",
                    icon: "mdi-script-text",
                  },
                  {
                    name: "Modifier le concours",
                    path: "/concours/listes/modifier",
                    icon: "mdi-pen",
                  },
                  {
                    name: "Ajouter les candidats",
                    path: "/concours/listes/candidat/ajouter",
                    icon: "mdi-account-multiple-plus",
                  },
                  {
                    name: "Lister les candidats",
                    path: "/concours/listes/candidat/listes",
                    icon: "mdi-account-multiple",
                  },
                ],
              },
              {
                name: "Créer du concours",
                path: "/concours/creer",
                icon: "mdi-file-plus",
              },
            ],
          });
        }
        if (scolarite.access.gestionAccesTache === true) {
          access.scolarite.push({
            name: "Gestion des agents de la scolarité",
            path: "/gestion-acces-tache",
            icon: "mdi-account-cog",
          });
        }
        access.scolarite.push({
          name: "Gestion des étudiants",
          path: "/etudiant",
          icon: "mdi-account-multiple",
          children: [
            {
              name: "Lister les étudiants",
              path: "/etudiant/listes",
              icon: "mdi-account-school",
            },
            {
              name: "Autorisation à s'inscrire",
              path: "/etudiant/authentification",
              icon: "mdi-script-text-key",
            },
            {
              name: "Inscription administrative",
              path: "/etudiant/validation-inscription-administrative",
              icon: "mdi-timeline-check",
            },
            {
              name: "Visualiser un relevé de notes",
              path: "/etudiant/releve-note",
              icon: "mdi-file-star",
            },
          ],
        });
        if (service.verifyIfNotEmpty(access.scolarite)) return access.scolarite;
        else break;
      case "RESPONSABLE_MENTION":
        access.responsableMention = [];
        access.responsableMention.push({
          name: "Programme d'enseignement",
          path: "/programme-enseignement",
          icon: "mdi-book-education",
          children: [
            {
              name: "Lister les programmes d'enseignement",
              path: "/programme-enseignement/listes",
              icon: "mdi-file-multiple",
            },
            {
              name: "Créer un programme d'enseignement",
              path: "/programme-enseignement/creer",
              icon: "mdi-file-plus",
            },
          ],
        });
        if (service.verifyIfNotEmpty(access.responsableMention))
          return access.responsableMention;
        else break;
      case "RESPONSABLE_PARCOURS":
        access.responsableParcours = [];
        access.responsableParcours.push({
          name: "Gestion des étudiants",
          path: "/etudiant",
          icon: "mdi-account-multiple",
          children: [
            {
              name: "Lister les étudiants",
              path: "/etudiant/listes",
              icon: "mdi-account-school",
            },
            {
              name: "Transcrire les notes",
              path: "/etudiant/notes",
              icon: "mdi-account-edit",
            },
            {
              name: "Valider les inscriptions pédagogiques",
              path: "/etudiant/validation-inscription-pedagogique",
              icon: "mdi-timeline-check",
            },
            {
              name: "Faire la délibération",
              path: "/etudiant/deliberation",
              icon: "mdi-account-filter",
            },
            {
              name: "Résultat du fin AU",
              path: "/etudiant/resultat",
              icon: "mdi-school",
            },
            {
              name: "Visualiser un relevé de notes",
              path: "/etudiant/releve-note",
              icon: "mdi-file-star",
            },
          ],
        });
        service.removeFromArrayByIndex(
          list.value,
          list.value.findIndex((item) => item.path == "/etudiant")
        );
        if (service.verifyIfNotEmpty(access.responsableParcours))
          return access.responsableParcours;
        else break;
      case "ENSEIGNANT":
        access.enseignant = [];

        //Ajout de la navigation `/etudiant`
        if (!list.value.some((item) => item.path == "/etudiant")) {
          access.enseignant.push({
            name: "Gestion des étudiants",
            path: "/etudiant",
            icon: "mdi-account-multiple",
            children: [
              {
                name: "Lister les étudiants",
                path: "/etudiant/listes",
                icon: "mdi-account-school",
              },
              {
                name: "Transcrire les notes",
                path: "/etudiant/notes",
                icon: "mdi-account-edit",
              },
            ],
          });
        }

        console.log(list);

        //Ajout de la navigation pour `/activite`
        if (!list.value.some((item) => item.path == "/activite")) {
          access.enseignant.push({
            name: "Gestion des activités",
            path: "/activite",
            icon: "mdi-calendar-check",
            children: [
              {
                name: "Lister les activités",
                path: "/activite/listes",
                icon: "mdi-view-list",
              },
              {
                name: "Créer une activité",
                path: "/activite/ajouter-activite",
                icon: "mdi-calendar-plus",
              },
            ],
          });
        }

        //Ajout de la navigation pour `/evaluations`
        if (!list.value.some((item) => item.path == "/evaluations")) {
          access.enseignant.push({
            name: "Gestion des évaluations",
            path: "/evaluations",
            icon: "mdi-folder",
          });
        }

        if (service.verifyIfNotEmpty(access.enseignant))
          return access.enseignant;
        else break;
      case "PRESIDENT_JURY":
        access.presidentJury = [];
        if (scolarite.access.gestionConcoursTCI === true) {
          access.presidentJury.push({
            name: "Concours",
            path: "/concours",
            icon: "mdi-script",
            children: [
              {
                name: "Transcrire les notes des candidats",
                path: "/concours/listes/notes",
                icon: "mdi-account-star",
              },
              {
                name: "Faire la délibération",
                path: "/concours/listes/deliberation",
                icon: "mdi-account-filter",
              },
              {
                name: "Résultats du concours",
                path: "/concours/listes/resultat",
                icon: "mdi-account-school",
              },
              {
                name: "Statistiques du concours",
                path: "/concours/listes/statistiques",
                icon: "mdi-account-school",
              },
              {
                name: "Autoriser les admis à s'inscrire",
                path: "/concours/listes/autorisation/inscription",
                icon: "mdi-account-reactivate",
              },
            ],
          });
        }
        if (service.verifyIfNotEmpty(access.presidentJury))
          return access.presidentJury;
        else break;
      case "ETUDIANT":
        access.etudiant = [];
        access.etudiant.push({
          name: "Faire l'inscription administrative",
          path: "/inscription-administrative",
          icon: "mdi-folder-information",
        });
        access.etudiant.push({
          name: "Faire l'inscription pédagogique",
          path: "/inscription-pedagogique",
          icon: "mdi-folder-information",
        });
        if (service.verifyIfNotEmpty(access.etudiant)) return access.etudiant;
        else break;
    }
  }

  // initialise list
  function initList() {
    list.value = [];
  }

  // add item into list
  function addToList(data = []) {
    list.value = service.concatArrays(list.value, data);
  }

  return {
    showNav,
    list,
    initList,
    addToList,
    getList,
  };
});
