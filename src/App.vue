<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- Navbar (strak tegen de bovenkant) -->
    <Header v-if ="!hideLayout" class="mb-4"></Header>

    <!-- Main content -->
    <main class="flex-grow-1 " :class="{ 'mt-navbar container py-5': !hideLayout }">
      <RouterView />
    </main>

    <Footer v-if="!hideLayout"></Footer>
    <!-- Footer -->
    
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import Footer from './components/default/footer.vue'
  import Header from './components/default/header.vue'
  const route = useRoute()

  const hideLayout = computed(() => route.meta.hideLayout === true)
</script>

<style>
.mt-navbar {
  margin-top: 70px;
}
</style>