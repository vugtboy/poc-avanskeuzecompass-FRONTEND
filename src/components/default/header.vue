<template>
  <nav class="navbar navbar-dark bg-danger shadow-sm py-3 mb-0 fixed-top">
        <div class="container d-flex justify-content-between align-items-center">
          <RouterLink to="/" class="navbar-brand fw-bold fs-4 text-white">
            MijnApp
          </RouterLink>

          <ul class="navbar-nav flex-row gap-4 mb-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link text-white" active-class="active" exact>Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/modules" class="nav-link text-white" active-class="active">Zoeken</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/login" class="nav-link text-white" active-class="active">Inloggen</RouterLink>
            </li>
          </ul>
        </div>
  </nav>
</template>

<script lang="ts">
  import { RouterLink} from 'vue-router'
</script>

<style>
.nav-link.active {
  font-weight: 600;
  text-decoration: underline;  
}
</style>