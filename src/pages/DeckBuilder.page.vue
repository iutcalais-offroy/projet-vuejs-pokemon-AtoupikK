<template>
  <n-space vertical>
    <n-input v-model:value="recherche" placeholder="Recherchez un Pokémon..." clearable />
    <n-grid cols="3" x-gap="250" y-gap="16">
      <n-gi v-for="pokemon in pokemonsFiltres" :key="pokemon.id">
        <n-card class="pokemon-card">
          <template #header>
            <n-text strong class="pokemon-name">{{ pokemon.name }}</n-text>
          </template>
          <template #cover>
            <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-image" />
          </template>
          <n-text strong>PokedexId : {{ pokemon.pokedexId }}</n-text>

          <n-space>
            <n-text>Type :</n-text>
            <n-tag :bordered="false" size="medium" :color="getTypeColor(pokemon.type.name)">
              {{ pokemon.type.name }}
            </n-tag>
            <n-text class="weakness">Faiblesse :</n-text>
            <n-tag :bordered="false" size="medium" :color="getTypeColor(pokemon.weakness.name)">
              {{ pokemon.weakness.name }}
            </n-tag>
          </n-space>

          <n-space>
            <n-text>HP : {{ pokemon.lifePoints }} ❤️ </n-text>
            <n-text class="weakness" strong>Attack : {{ pokemon.attack.name }} ({{ pokemon.attack.damages }} dmg)</n-text>
          </n-space>
        </n-card>
      </n-gi>
    </n-grid>
  </n-space>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const pokemonsFiltres = ref([]);
const recherche = ref("");

const fetchPokemons = async () =>  {
  try {
    const response = await axios.get("https://pokemon-api-seyrinian-production.up.railway.app/pokemon-cards");
    pokemonsFiltres.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des Pokémon :", error);
  }
};

onMounted(fetchPokemons);

const filteredPokemons = computed(() =>  {
  return pokemonsFiltres.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});


const getTypeColor = (type) =>  {
  const colors = {
    "Grass": { color: "#4CAF50", textColor: "#fff" },
    "Fire": { color: "#FF5722", textColor: "#fff" },
    "Water": { color: "#2196F3", textColor: "#fff" },
    "Electric": { color: "#FFEB3B", textColor: "#000" },
    "Normal": { color: "#A8A878", textColor: "#000" },
    "Bug": { color: "#A8B820", textColor: "#000" },
    "Poison": { color: "#A040A0", textColor: "#fff" },
    "Psychic": { color: "#F85888", textColor: "#000" },
    "Ground": { color: "#E0C068", textColor: "#000" },
    "Fighting": { color: "#C03028", textColor: "#fff" },
  };
  return colors[type] || { color: "#CCCCCC", textColor: "#000" };
};
</script>

<style scoped>
.pokemon-card  {
  max-width: 325;
  color: black;
}

.pokemon-name  {
  font-size: 1.2rem;
  text-align: center;
  display: block;
}

.pokemon-image  {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.weakness  {
  text-align: right;
}
</style>
