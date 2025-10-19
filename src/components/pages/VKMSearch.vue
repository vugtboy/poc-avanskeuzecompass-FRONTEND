<script setup lang="ts">
import VKMComponent from '../search/VKMComponent.vue'
import { ref, onMounted } from 'vue'
import { PaginatedVKM } from '../../domain/models/paginatedvkm.model'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const modules = ref<PaginatedVKM | null>(null)
const message = ref<string>('Laden...')
const hasError = ref<boolean>(false)
const page = ref<number>(1)
const limit = ref<number>(10)
const totalPages = ref<number>(1)
const search = ref<string>("")
const favoriteIds = ref<string[]>([])
const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/banaan'

async function fetchFavorites() {
  const token : string | null = localStorage.getItem('token')
  if (!token) {
    return
  }
  try {
    const res = await fetch(URL + '/user/favorite/get', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (res.status === 403) {
      localStorage.removeItem('token')
      router.push('/login')
      return
    }

    if (!res.ok) throw new Error('Favorieten ophalen mislukt')
    
    const data = await res.json()
    favoriteIds.value = data
    console.log(favoriteIds.value)
  } catch (err) {
    console.error('Fout bij ophalen van favorieten:', err)
  }
}


async function fetchModules(p: number = 1) {
  page.value = p
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(URL + `/vkm?search=${encodeURIComponent(search.value)}&page=${p}&limit=${limit.value}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (res.status === 403) {
      localStorage.removeItem('token') 
      router.push('/login')              
      return
    }
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`)

    const data: PaginatedVKM = await res.json()
    modules.value = data

    totalPages.value = Math.ceil(data.total / limit.value)

    if (!data.vkms || data.vkms.length === 0) {
      message.value = 'Geen modules gevonden'
      hasError.value = true
    } else {
      hasError.value = false
    }
  } catch (err: any) {
    console.error(err)
    message.value = 'Er is een fout bij het ophalen van de keuzemodules, probeer het later nog eens.'
    hasError.value = true
  }
}
onMounted( async () => {
  await fetchFavorites()
  fetchModules(page.value)
})

async function goToPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  await fetchFavorites()
  fetchModules(p)
}

async function searchModules() {
  await fetchFavorites()
  fetchModules(1)
}

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = page.value
  const windowSize = 5
  const start = Math.max(1, current - 2)
  const end = Math.min(total, start + windowSize - 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

</script>

<template>
  <div class="p-4">
    <!-- zoekbalk met knop -->
    <div class="row mb-4">
      <div class="col-md-6 mx-auto">
        <form @submit.prevent="searchModules" class="d-flex">
          <input
            v-model="search"
            type="text"
            class="form-control me-2"
            placeholder="Zoek naar keuzemodules..."
          />
          <button class="btn btn-primary" type="submit">Zoek</button>
        </form>
      </div>
    </div>
    <div v-if="hasError" class="text-red-600 font-semibold">{{ message }}</div>

    <div v-else-if="!modules" class="text-gray-500">{{ message }}</div>

    <div v-else>
      <div class="space-y-4">
        <VKMComponent
          v-for="m in modules.vkms"
          :key="m.id"
          :id="m.id"
          :name="m.name"
          :description="m.description"
          :level="m.level"
          :studycredit="m.studycredit"
          :initialFavorite="favoriteIds.includes(m.id)"
        />
      </div>

      <!-- paginatie -->
      <nav aria-label="Paginatie" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: page === 1 }">
            <button class="page-link" @click="goToPage(page - 1)" :disabled="page === 1">
              ‹
            </button>
          </li>

          <li
            v-for="p in visiblePages"
            :key="p"
            class="page-item"
            :class="{ active: p === page }"
          >
            <button class="page-link" @click="goToPage(p)">
              {{ p }}
            </button>
          </li>

          <li class="page-item" :class="{ disabled: page === totalPages }">
            <button class="page-link" @click="goToPage(page + 1)" :disabled="page === totalPages">
              ›
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>