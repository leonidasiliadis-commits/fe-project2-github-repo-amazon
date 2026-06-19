<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from './store/auth'
import Auth from './pages/Auth.vue'
import Dashboard from './pages/Dashboard.vue'

const authStore = useAuthStore()
const loading = ref(true)

onMounted(async () => {
  await authStore.getUser()
  loading.value = false
})
</script>

<template>
  <v-app>
    <div v-if="loading" class="loading-screen">
      Loading...
    </div>

    <Auth v-else-if="!authStore.user" />

    <Dashboard v-else />
  </v-app>
</template>