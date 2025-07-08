<template>
  <MainLayout>
    <div class="main-content">
      <div class="container">
        <h1 class="text-red font-weight-bold">🍽️ Delicious Recipes</h1>

        <div v-if="loading" class="loading">Loading recipes...</div>

        <div v-else class="recipe-grid">
          <RecipeCard
            @click="confirm(recipe)"
            v-for="recipe in recipes"
            :key="recipe.id"
            :recipe="recipe"
          />
        </div>
      </div>
      <div
        v-if="dialog"
        class="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
        @click.self="dialog = false"
      >
        <div
          class="bg-white m-6 rounded-lg shadow-lg max-w-md w-full text-center justify-center align-center"
        >
          <img
            :src="selectedRecipe?.image"
            alt="Recipe Image"
            class="w-full max-h-[400px] object-cover rounded-md mb-4"
          />
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            {{ selectedRecipe?.name }}
          </h2>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import { getReceipies } from "../api/ApiClient";
import RecipeCard from "../components/RecipeCard.vue";
import MainLayout from "../layout/MainLayout.vue";

const authStore = useAuthStore();
const router = useRouter();

const recipes = ref([]);
const selectedRecipe = ref(null);
const loading = ref(false);
const dialog = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getReceipies();
    recipes.value = response.data.recipes;
  } catch (e) {
    console.error("Failed to fetch recipes:", e);
  } finally {
    loading.value = false;
  }
});

function confirm(recipe) {
  selectedRecipe.value = recipe;
  dialog.value = true;
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 8px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #871111;
}

.loading {
  text-align: center;
  font-size: 1.2em;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 2fr));
  gap: 24px;
}
.main-content {
  background-color: #0f0f13;
  min-height: 100vh;
  padding-top: 80px;
  border-radius: 8px;
  overflow-y: auto;
}
.relative {
  position: relative;
  z-index: 10;
}
</style>
