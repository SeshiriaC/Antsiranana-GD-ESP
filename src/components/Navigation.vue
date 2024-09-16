<script setup>
// import my plugins
import { URL } from "@/plugins/url";
import { Service } from "@/plugins/service";

// import my pinia plugins
import { useNavigationStore } from "@/pinia/navigation";
import { useDialogStore } from "@/pinia/dialog";
import { useThemeStore } from "@/pinia/theme";

// import VueRouter plugins
import { useRouter } from "vue-router";


// instance my plugins
const url = new URL();
const service = new Service();

// instance Router
const router = useRouter();

// intance my pinia plugins
const navigation = useNavigationStore();
const dialog = useDialogStore();
const theme = useThemeStore();


// select workspace
function select(path) {
  router.replace({ path: path });
}

// Exiting my workspace
function logout() {
  dialog.show("Se deconnecter ?", "DialogDeconnexion");
}
</script>

<template>
  <!-- permanent -->
    <v-navigation-drawer
      v-model="navigation.showNav"
      location="left"
      style="height: 100%"
      width="350"
    >
      <div class="pa-4 px-16">
        <v-img
          id="img-logo-espa"
          :src="`${url.images}/logo-esp-antsiranana.png`"
          style="cursor: pointer"
          width="250"
          @click="select(`/`)"
        ></v-img>
      </div>

      <v-divider></v-divider>

      <v-list density="compact" nav lines="false">
        <h3 class="text-center py-3">MENU</h3>
        <template v-for="(itemNavigation, indexNavigation) in navigation.list">
          <template v-if="service.verifyIfNotEmpty(itemNavigation.children)">
            <v-list-group :value="itemNavigation.name">
              <template v-slot:activator="{ props }">
                <v-list-item
                  active-color="blue"
                  v-bind="props"
                  :key="indexNavigation"
                >
                  <h4>
                    <v-icon :icon="itemNavigation.icon" class="mr-4"></v-icon
                    >{{ itemNavigation.name }}
                  </h4>
                </v-list-item>
              </template>
              <template
                v-for="(itemChildren, indexChildren) in itemNavigation.children"
                :key="indexChildren"
              >
                <v-list-group
                  :value="itemChildren.name"
                  v-if="service.verifyIfNotEmpty(itemChildren.innerChildren)"
                >
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      v-bind="props"
                      :value="itemChildren.name"
                      @click="select(itemChildren.path)"
                    >
                      <h5>
                        <v-icon :icon="itemChildren.icon" class="mr-4"></v-icon
                        >{{ itemChildren.name }}
                      </h5>
                    </v-list-item>
                  </template>
                  <v-list-item
                    v-for="(
                      itemInnerChildren, indexInnerChildren
                    ) in itemChildren.innerChildren"
                    :key="indexInnerChildren"
                    :value="itemInnerChildren.name"
                    @click="select(itemInnerChildren.path)"
                  >
                    <h5 class="text-truncate">
                      <v-icon
                        :icon="itemInnerChildren.icon"
                        class="mr-4"
                      ></v-icon
                      >{{ itemInnerChildren.name }}
                    </h5>
                  </v-list-item>
                </v-list-group>
                <v-list-item
                  v-if="service.verifyIfEmpty(itemChildren.innerChildren)"
                  :value="itemChildren.name"
                  @click="select(itemChildren.path)"
                >
                  <h5>
                    <v-icon :icon="itemChildren.icon" class="mr-4"></v-icon
                    >{{ itemChildren.name }}
                  </h5>
                </v-list-item>
              </template>
            </v-list-group>
          </template>
          <template v-if="service.verifyIfEmpty(itemNavigation.children)">
            <v-list-item
              active-color="blue"
              :key="indexNavigation"
              :value="itemNavigation.name"
              @click="select(itemNavigation.path)"
            >
              <h4>
                <v-icon :icon="itemNavigation.icon" class="mr-4"></v-icon
                >{{ itemNavigation.name }}
              </h4>
            </v-list-item>
          </template>
        </template>
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <v-list density="compact" nav lines="false">
          <v-list-item
            active-color="blue"
            value="Thème"
            @click="theme.toggle()"
          >
            <h5>
              <v-icon icon="mdi-theme-light-dark" class="mr-4"></v-icon>Thème
            </h5>
          </v-list-item>
          <v-list-item
            active-color="blue"
            value="se deconnecter"
            @click="logout"
          >
            <h5>
              <v-icon icon="mdi-logout" class="mr-4"></v-icon>Se déconnecter
            </h5>
          </v-list-item>
          <v-list-item
            active-color="blue"
            value="Personnelles"
            @click="select('/informations-personnelles')"
          >
            <h5>
              <v-icon icon="mdi-folder-account" class="mr-4"></v-icon
              >Informations personnelles
            </h5>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
</template>
