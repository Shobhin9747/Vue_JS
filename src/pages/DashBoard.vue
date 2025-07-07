<template>
  <div class="nav-bar">
    <div class="nav-left">
      <h2>Dashboard</h2>
    </div>
    <div class="nav-right">
      <div class="relative">
        <button
          v-if="authStore.user?.username"
          class="logout-button"
          @click="togglePopover"
        >
          {{ authStore.user.username.charAt(0).toUpperCase() }}
        </button>

        <!-- Popover -->
        <div
          v-if="showPopover"
          class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50"
        >
          <!-- View Details Button -->
          <button
            class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <span class="material-icons text-gray-500 text-base"
              >visibility</span
            >
            View Details
          </button>

          <!-- Logout Button -->
          <button
            class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            @click="handleLogout"
          >
            <span class="material-icons text-red-500 text-base">logout</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
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
        class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center"
      >
        <img
          :src="selectedRecipe?.image"
          alt="Recipe Image"
          class="w-full h-auto rounded-md mb-4"
        />
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          {{ selectedRecipe?.name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import { getReceipies } from "../api/ApiClient";
import RecipeCard from "../components/RecipeCard.vue";

const authStore = useAuthStore();
const router = useRouter();

const recipes = ref([]);
const selectedRecipe = ref(null);
const loading = ref(false);
const dialog = ref(false);
const dashboardBg = ref("#b5d3db");
const showPopover = ref(false);

function handleLogout() {
  authStore.logout();
  router.push("/");
}

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

function togglePopover() {
  showPopover.value = !showPopover.value;
}
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-left h2 {
  margin: 0;
}

.nav-right {
  display: flex;
  align-items: center;
}

.username {
  font-weight: bold;
}

button {
  padding: 6px 12px;
  cursor: pointer;
}
.logout-button {
  background-color: rgb(116, 16, 223);
  color: #f4f1f7;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
}
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
