import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    register(username, password) {
        const userId = Math.floor(Math.random() * 1000);
      this.user = { id: userId, username, password };
      console.log("Utilisateur inscrit :", this.user);
    },
    login(username, password) {
      if (this.user && this.user.username === username && this.user.password === password) {
        console.log("Connexion réussie !");
        return true;
      } else {
        console.log("Identifiants incorrects !");
        return false;
      }
    },
    logout() {
      this.user = null;
      console.log("Déconnexion réussie !");
    },
  },
});
