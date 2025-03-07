<template>
  <n-config-provider :theme-overrides="themeOverrides" >
    <n-card>
      <n-tabs
        class="card-tabs"
        default-value="inscription"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="inscription" tab="Inscription">
          <n-form>
            <n-form-item-row label="Nom d'utilisateur">
              <n-input/>
            </n-form-item-row>

            <n-form-item-row label="Mot de passe">
              <n-input />
            </n-form-item-row>

          </n-form>
          <n-button type="primary" block secondary strong>
            Inscription
          </n-button>
        </n-tab-pane>

        <n-tab-pane name="connexion" tab="Connexion">
          <n-form>
            <n-form-item-row label="Nom d'utilisateur">
              <n-input />
            </n-form-item-row>

            <n-form-item-row label="Mot de passe">
              <n-input />
            </n-form-item-row>

            <n-form-item-row label="Entrez le mot de passe à nouveau">
              <n-input />
            </n-form-item-row>

          </n-form>
          <n-button type="primary" block secondary strong>
            Connexion
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { ref } from "vue";

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