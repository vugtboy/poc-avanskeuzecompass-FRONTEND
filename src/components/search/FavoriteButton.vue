<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{id: string, initialFavorite: boolean}>()

const success = ref(false)
const error = ref(false)
const isFavorite = ref(props.initialFavorite)
const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function toggleFavorite() {
  const token = localStorage.getItem('token')

  if (!token) {
    return
  }

  try {
    const url = isFavorite.value
      ? URL + '/user/favorite/remove'
      : URL + '/user/favorite/add'

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
  <button
    @click="toggleFavorite"
    class="btn p-0 ms-2"
    :title="isFavorite ? 'Verwijderd uit favorieten' : 'Voeg toe aan favorieten'"
    style="font-size: 1.5rem; border: none; background: transparent; color: inherit;"
  >
    <i :class="isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'"></i>
  </button>
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