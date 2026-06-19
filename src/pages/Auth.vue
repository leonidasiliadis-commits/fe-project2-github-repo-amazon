<script setup>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { supabase } from '../supabase';
import { useAuthStore } from '../store/auth';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';


const route = useRoute()
const email = ref('')
const password = ref('')
const isLogIn = ref(true)
const tab = ref('signin')

const authStore = useAuthStore()

onMounted(async()=>{
    await authStore.getUser()

    supabase.auth.onAuthStateChange((event, session) => {
        authStore.user = session?.user || null
    })
})

const login = async() => {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })  

    if(error){
        console.log('login failed:', error.message)
        alert('User not found or wrong password!  PLEASE REGISTER!')
        return
    }

    console.log('Logged in:', data)
}

</script>

<template>
  <main class="auth-page">

    <div class="auth-card">

      <div class="auth-logo">
        <span>ToDo APP</span>
      </div>

      <h1>Welcome Back</h1>
      <p>Build better habits, one task at a time.</p>

      <v-tabs v-model="tab" grow>
        <v-tab value="signin">Login</v-tab>
        <v-tab value="signup">Register</v-tab>
      </v-tabs>

      <div class="auth-content">
        <SignIn v-if="tab === 'signin'" />
        <SignUp v-else />
      </div>

    </div>

  </main>
</template>
<style>
.auth-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top, #1e293b 0%, #0f172a 100%);
  display: flex;
  align-items: center;
}

.auth-card {
  padding: 28px;
  border-radius: 18px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
}

.auth-header {
  text-align: center;
  margin-bottom: 18px;
}

.title {
  font-size: 26px;
  font-weight: 700;
}

.subtitle {
  font-size: 13px;
  opacity: 0.7;
  margin-top: 6px;
}

.auth-tabs {
  margin-top: 10px;
}

.auth-body {
  margin-top: 10px;
}
</style>