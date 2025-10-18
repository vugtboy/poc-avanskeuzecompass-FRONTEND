<script setup lang="ts">
import FavoriteButton from '../search/FavoriteButton.vue'
defineProps<{ id: string, name: string, description: string, studycredit: number, level: string, initialFavorite: boolean}>()

</script>


<template>
  <div class="card text-center shadow-md rounded-lg p-3 h-100 d-flex flex-column mb-2">
    <img src="/images/plaatjevanaap.jpg" class="card-img-top rounded-md mb-3"
      style="height: 160px; object-fit: cover;"
    />
    <!-- Badges -->
    <div class="d-flex justify-content-center gap-2 mb-2">
      <span class="badge bg-primary text-white py-1 px-2 rounded-pill small">
        {{ studycredit }} EC
      </span>
      <span class="badge bg-success text-white py-1 px-2 rounded-pill small">
        {{ level }}
      </span>
    </div>

    <div class="d-flex align-items-center justify-content-between mb-2">
      <h5 class="fw-bold mb-0 text-truncate" style="flex-grow: 1;">{{ name }}</h5>
      <FavoriteButton :id="id" :initialFavorite="initialFavorite"></FavoriteButton>
    </div>
 
    <!-- Beschrijving met ellipsis -->
    <p class="text-muted mb-0 flex-grow-1 overflow-hidden" style="
      display: -webkit-box;
      -webkit-line-clamp: 3; 
      -webkit-box-orient: vertical;
      overflow: hidden;">
      {{ description }}
    </p>

    
  </div>
</template>

<style>
.favorite-button {
  color: #dc3545;
  font-size: 1.5rem;
  border: none;
  background: transparent;
  min-width: 36px;
  min-height: 36px;
  cursor: pointer;
}
</style>