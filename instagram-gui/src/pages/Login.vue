<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="bg-white border rounded-md p-8 w-full max-w-sm">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>

      <label class="block text-sm mb-1">Username</label>
      <input v-model="username" type="text" class="w-full border rounded px-3 py-2 mb-4" />

      <label class="block text-sm mb-1">Password</label>
      <input v-model="password" type="password" class="w-full border rounded px-3 py-2 mb-6" />

      <button @click="onLogin" :disabled="loading"
              class="w-full bg-instaBlue text-white py-2 rounded font-semibold disabled:opacity-50">
        {{ loading ? 'Logging in...' : 'Log In' }}
      </button>

      <p v-if="error" class="text-red-500 text-sm mt-3">{{ error }}</p>

      <p class="text-xs text-gray-500 mt-6">
        목 모드 사용 시 임의의 아이디/비번 아무거나 입력해도 됩니다. (<code>VITE_ENABLE_MOCK=1</code>)
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRoute, useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const onLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await auth.login({ username: username.value, password: password.value })
    const to = route.query.redirect || '/feed'
    router.replace(String(to))
  } catch (e) {
    error.value = e?.response?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
