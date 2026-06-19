<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()

const themeMode = ref('dark')
const fontFamily = ref('Inter, system-ui, sans-serif')
const isOpen = ref(false)
const isPinned = ref(false)

const fontOptions = [
  { label: 'Inter', value: 'Inter, system-ui, sans-serif' },
  { label: 'Segoe UI', value: 'Segoe UI, system-ui, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier New', value: 'Courier New, monospace' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' }
]

const themeOptions = [
  { label: '🌙', value: 'dark' },
  { label: '☀️', value: 'light' }
]

const applyTheme = (value) => {
  themeMode.value = value
  const html = document.documentElement
  html.classList.toggle('theme-dark', value === 'dark')
  html.classList.toggle('theme-light', value === 'light')
  localStorage.setItem('themeMode', value)
}

const applyFont = (value) => {
  fontFamily.value = value
  document.documentElement.style.setProperty('--font-family', value)
  localStorage.setItem('fontFamily', value)
}

const logout = async () => {
  await authStore.signOut()
}

const openSidebar = () => {
  isOpen.value = true
}

const closeSidebar = () => {
  if (!isPinned.value) {
    isOpen.value = false
  }
}

const toggleSidebar = () => {
  isPinned.value = !isPinned.value
  isOpen.value = !isOpen.value
}

onMounted(() => {
  const savedTheme = localStorage.getItem('themeMode')
  const savedFont = localStorage.getItem('fontFamily')
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches

  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'))
  applyFont(savedFont || fontFamily.value)
})
</script>

<template>
  <aside
    class="sidebar"
    :class="{ open: isOpen }"
    @mouseenter="openSidebar"
    @mouseleave="closeSidebar"
  >
    <button class="sidebar-toggle" @click="toggleSidebar" aria-label="Toggle settings">
      ⚙️
    </button>

    <div class="sidebar-body" :class="{ visible: isOpen }">
      <div class="sidebar-title">
        <span>ToDo Settings</span>
      </div>

      <div class="sidebar-controls">
        <div class="sidebar-item">
          <label>Theme</label>
          <select v-model="themeMode" @change="applyTheme(themeMode)">
            <option v-for="option in themeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="sidebar-item">
          <label>Font</label>
          <select v-model="fontFamily" @change="applyFont(fontFamily)">
            <option v-for="option in fontOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <button class="logout-btn" @click="logout">
          Logout
        </button>
      </div>
    </div>
  </aside>
</template>
