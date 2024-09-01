import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";
import { Cookies } from "@/plugins/cookies";

export const useAppchoiceStore = defineStore("appchoice", () => {
  const cookies = new Cookies();

  const selected = ref("Gdesp");

  function set(Appchoice) {
    selected.value = Appchoice;
    cookies.set("appchoice", `${Appchoice}`);
  }

  function isGdesp() {
    return cookies.get("appchoice") == "Gdesp" ? true : false;
  }

  function toggle() {
    if (isGdesp() == true) set("FollowUP");
    else if (isGdesp() == false) set("Gdesp");
  }

  onBeforeMount(() => {
    if (isGdesp() == true) set("Gdesp");
    else if (isGdesp() == false) set("FollowUp");
  });

  return {
    selected,
    set,
    isGdesp,
    toggle,
  };
});
