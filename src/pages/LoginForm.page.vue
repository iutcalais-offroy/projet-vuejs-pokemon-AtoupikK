<template>
  <n-config-provider :theme-overrides="themeOverrides" >
    <n-card>
      <n-tabs
        class="card-tabs"
        v-model:value="activeTab"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="inscription" tab="Inscription">
          <n-form>
            <n-form-item-row label="Email">
              <n-input v-model:value="newEmail" placeholder="test@email.com"/>
            </n-form-item-row>

            <n-form-item-row label="Mot de passe">
              <n-input v-model:value="newPassword" placeholder="motdepasse123" type="password"/>
            </n-form-item-row>

            <n-form-item-row label="Entrez votre mot de passe à nouveau">
              <n-input v-model:value="verifPassword" placeholder="motdepasse123" type="password"/>
            </n-form-item-row>

          </n-form>
          <n-button type="primary" block @click="signIn">
            Inscription
          </n-button>
        </n-tab-pane>

        <n-tab-pane name="connexion" tab="Connexion">
          <n-form>
            <n-form-item-row label="Nom d'utilisateur">
              <n-input v-model:value="loginEmail" placeholder="test@email.com"/>
            </n-form-item-row>

            <n-form-item-row label="Mot de passe">
              <n-input v-model:value="loginPassword" placeholder="motdepasse123"/>
            </n-form-item-row>

          </n-form>
          <n-button type="primary" block @click="logIn">
            Connexion
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const activeTab= ref("inscription");
const newEmail = ref("");
const newPassword = ref("");
const verifPassword = ref("");
const loginEmail = ref("");
const loginPassword = ref("");


const signIn = async () =>  {
  if (newPassword.value !== verifPassword.value)  {
    console.error("Les mots de passe ne correspondent pas.");
    return;
  }

  try  {
    const response = await axios.post("https://pokemon-api-seyrinian-production.up.railway.app/users",  {
      email: newEmail.value,
      password: newPassword.value,
    });
    alert("Inscrit avec succès !")
    console.log("Inscription réussie", response.data);
    activeTab.value="connexion"
    } 
  catch (error)  {
    console.error("Erreur lors de l'inscription:", error);
  }
};

const logIn = async () =>  {
  try  {
    const response = await axios.post("https://pokemon-api-seyrinian-production.up.railway.app/users/login",  {
      email: loginEmail.value,
      password: loginPassword.value,
    });

    console.log("Connexion réussie", response.data);
    localStorage.userid = response.data.user.id;
    localStorage.token = response.data.token;
    window.location.href='/deck-builder';
  } 
  catch (error)  {
    console.error("Erreur lors de la connexion:", error);
  }
};

const themeOverrides = ref({
  common: {
    borderRadius: "12px",
    primaryColor: "#ef2e2e",
    primaryColorHover: "#b32222",
    primaryColorPressed: "#a21616",
  },
  tabs: {
    tabTextColorActive: "#ef2e2e",
    barColor: "#ef2e2e",
  }
});
</script>

<style scoped>
.n-card {
  background-color: #efe7e7 !important;
}

.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>