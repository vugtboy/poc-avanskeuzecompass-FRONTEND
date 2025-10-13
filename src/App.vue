<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/bananen">bananen</RouterLink>|
      <RouterLink to="/slak">slak</RouterLink> |
      <RouterLink to="/beans">beans</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
