<template>
  <div class="card">
    <img :src="recipe.image" :alt="recipe.name" class="recipe-image" />
    <div class="card-content">
      <h3>{{ recipe.name }}</h3>
      <p><strong>Difficulty:</strong> {{ recipe.difficulty }}</p>
      <p><strong>Prep Time:</strong> {{ recipe.prepTimeMinutes }} min</p>
      <p><strong>Cook Time:</strong> {{ recipe.cookTimeMinutes }} min</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipe: Object,
});
</script>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px) scale(1.02);
  background-color: #f9f9f9;
}

.recipe-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-content h3 {
  margin: 0 0 10px;
  font-size: 1.2em;
  color: #333;
}

.card-content p {
  margin: 6px 0;
  color: #666;
  font-size: 0.95em;
}
</style>
