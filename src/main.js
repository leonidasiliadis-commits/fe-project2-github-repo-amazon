import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify.js'
import { createPinia } from 'pinia'
import router from './router'

const initializeTheme = () => {
  const html = document.documentElement
  const savedTheme = localStorage.getItem('themeMode')
  const savedFont = localStorage.getItem('fontFamily')
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const themeMode = savedTheme || (prefersDark ? 'dark' : 'light')

  html.classList.toggle('theme-dark', themeMode === 'dark')
  html.classList.toggle('theme-light', themeMode === 'light')
  html.style.setProperty('--font-family', savedFont || 'Inter, system-ui, sans-serif')
}

initializeTheme()

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
