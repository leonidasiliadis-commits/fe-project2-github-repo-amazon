import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const auth = useAuthStore()

  const user = computed(() => auth.user)
  const userId = computed(() => auth.user?.id || null)
  const isLoggedIn = computed(() => !!auth.user)

  return {
    user,
    userId,
    isLoggedIn
  }
})