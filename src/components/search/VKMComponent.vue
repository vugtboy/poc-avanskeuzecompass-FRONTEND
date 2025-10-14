<script setup lang="ts">

defineProps<{ id: string, name: string, description: string, studycredit: number, level: string}>()

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

    <!-- Titel -->
    <h5 class="fw-bold mb-2 text-truncate">{{ name }}</h5>

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