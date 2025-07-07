<template>
  <div class="login-maincontainer">
    <div class="login-container">
      <h2 class="title">Login</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          autocomplete="username"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error-message-text">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../api/ApiClient";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const authStore = useAuthStore();
const router = useRouter();
async function handleLogin() {
  debugger;
  errorMessage.value = "";
  try {
    const response = await login({
      username: username.value,
      password: password.value,
      expiresInMins: 30,
    });
    authStore.setLoginData(response.data);
    router.push("/dashBoard");
  } catch (e) {
    errorMessage.value = "Login failed due to server error";
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  border-radius: 10px;
  background-color: #4b3b5a;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #f9f0f0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.2s;
}

.login-form input:focus {
  outline: none;
  border-color: #42b983; /* Vue green */
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
}

.login-form button {
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-form button:hover {
  background-color: #369f6e;
}
.error-message-text {
  color: red;
  text-align: center;
  margin-top: 0.5rem;
  font-weight: bold;
}
.login-maincontainer {
  background-color: #574e80;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
