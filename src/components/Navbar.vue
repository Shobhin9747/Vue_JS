<!-- components/Navbar.vue -->
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
          <button
            class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <span class="material-icons text-gray-500 text-base"
              >visibility</span
            >
            View Details
          </button>
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
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();
const router = useRouter();
const showPopover = ref(false);

function togglePopover() {
  showPopover.value = !showPopover.value;
}

function handleLogout() {
  authStore.logout();
  router.push("/");
}
</script>

<style scoped>
/* Use the same nav-bar styles */
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

.logout-button {
  background-color: rgb(116, 16, 223);
  color: #f4f1f7;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.relative {
  position: relative;
  z-index: 10;
}
</style>
