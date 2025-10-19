<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const email = ref<string>('')
  const password = ref<string>('')
  const message = ref<string>('')
  const isLoading = ref<boolean>(false)
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

  //in proberen te loggen via de backen, met de gegevens die de gebruiker invoert
  async function login() {
    isLoading.value = true
    message.value = ''

    try {
      const res = await fetch(URL + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      })

      if (!res.ok) {
        const errorData: {message?: string} = await res.json()
        throw new Error(errorData.message || 'Fout bij inloggen')
      }

      const data: { token: string }  = await res.json()
      console.log('Inlog succesvol:', data.token)
      localStorage.setItem('token', data.token)
      console.log(localStorage.token)
      message.value = 'Inloggen gelukt!'
      router.push('/')

      
    } catch (err: any) {
      console.error(err)
      message.value = 'Inloggen mislukt: ' + err.message
    } finally {
      isLoading.value = false
    }
  }
</script>


<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
      <h1 class="h4 text-center mb-4">Inloggen</h1>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">E-mailadres</label>
          <input v-model="email" type="email" id="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Wachtwoord</label>
          <input v-model="password" type="password" id="password" class="form-control" required />
        </div>

        <div class="d-grid mb-3">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Bezig...' : 'Inloggen' }}
          </button>
        </div>
        <p>Heeft u nog geen account, <router-link to="/register">maak er dan één.</router-link></p>

        <p class="text-danger text-center mb-0">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>