<script setup lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{ id: string, name: string, description: string, studycredit: number, level: string, initialFavorite: boolean}>()

const success = ref(false)
const error = ref(false)
const isFavorite = ref(props.initialFavorite)


async function toggleFavorite() {
  const token = localStorage.getItem('token')

  if (!token) {
    return
  }

  try {
    const url = isFavorite.value
      ? 'http://localhost:3000/api/user/favorite/remove'
      : 'http://localhost:3000/api/user/favorite/add'

    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ VKMId: props.id }),
    })
    if (res.status === 403) {
          localStorage.removeItem('token') 
          router.push('/login')              
          return
    }
    if (!res.ok) throw new Error(`Server error: ${res.status}`)
    isFavorite.value = !isFavorite.value
    success.value = true
    error.value = false
  } catch (err) {
    console.error(err)
    success.value = false
    error.value = true
  }
}
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
      <button
        @click="toggleFavorite"
        class="btn p-0 ms-2"
        :title="isFavorite ? 'Verwijderd uit favorieten' : 'Voeg toe aan favorieten'"
        style="font-size: 1.5rem; border: none; background: transparent; color: inherit;"
      >
        <i :class="isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'"></i>
      </button>
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