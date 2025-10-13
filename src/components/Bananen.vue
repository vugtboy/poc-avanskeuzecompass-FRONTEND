<script setup lang="ts">
import VKMComponent from './search/VKMComponent.vue'
import { ref, onMounted } from 'vue'
import { VKM } from "../domain/models/vkm.model.js"
const message = ref('Laden...')
const modules = ref<VKM[]>([])
const hasError = ref(false);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/vkm?search=a&page=1&limit=10')
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`)
    const data: {vkms: VKM[], total: number} = await res.json()

    if (data.vkms && data.vkms.length > 0) {
      modules.value = data.vkms
      hasError.value = false
    } else {
      message.value = 'Geen modules gevonden'
      hasError.value = true
    }

    console.log(message.value)
  } catch (err) {
    console.error(err)
    message.value = 'Fout bij het ophalen van de keuzemodules'
    hasError.value = true
  }
})

</script>

<template>
  <div class="p-4">
    <div v-if="hasError" class="text-red-600 font-semibold">
      {{ message }}
    </div>

  
    <!-- Toon foutmelding -->
    <div v-else-if="modules.length === 0" class="text-red-600 font-semibold">
      {{ message }}
    </div>

        <!-- Toon alle modules -->
    <div v-else>
      <div class="space-y-4">
        <VKMComponent
          v-for="module in modules"
          :id="module.id"
          :name="module.name"
          :description="module.description"
          :level="module.level"
          :studycredit="module.studycredit"
        />
      </div>
    </div>
  </div>
</template>

