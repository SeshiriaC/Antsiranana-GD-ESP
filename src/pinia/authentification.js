import { Cookies } from "@/plugins/cookies";
import { RestApi } from "@/plugins/restApi";
import { defineStore } from "pinia";
import { useViewStore } from "./view";
import { useAlertStore } from "./alert";
import { useOverlayStore } from "./overlay";

export const useAuthentificationStore = defineStore("authentification", () => {
  const cookies = new Cookies();
  const restApi = new RestApi();
  const view = useViewStore();
  const alert = useAlertStore();
  const overlay = useOverlayStore();

  function check(pseudo, motDePasse) {
    overlay.show();
    setTimeout(() => {
      restApi
        .post("/api/auth/signin", {
          username: `${pseudo}`,
          password: `${motDePasse}`,
        })
        .then((response) => {
          if (response.status === 200) {
            cookies.set("accessToken", response.data.accessToken);
            cookies.set("idPersonne", response.data.id);
            cookies.set("status", response.data.roles);
            
            alert.add("success", "Bienvenue");
            view.set("Workspace");
            overlay.hide();
          }
        })
        .catch((error) => {
          overlay.hide();
          console.error(error);
          if (error.response.status === 401)
            alert.add("warning", "Votre authentification est invalide !");
          else alert.error();
        });
    }, 500);
  }

  return {
    check,
  };
});
