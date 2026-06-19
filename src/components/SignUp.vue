<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const register = async () => {
  try {
    await authStore.signUp(email.value, password.value)
    alert('Registration successful. Please check your email to confirm your account.')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
  <div class="auth-form">
    <v-text-field
      v-model="email"
      label="Email"
      variant="outlined"
      density="comfortable"
      class="auth-field"
      hide-details
    />

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      variant="outlined"
      density="comfortable"
      class="auth-field"
      hide-details
    />

    <v-btn
      block
      class="auth-submit"
      @click="register"
    >
      Register
    </v-btn>
  </div>
</template>