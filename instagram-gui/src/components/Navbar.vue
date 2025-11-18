<template>
  <nav class="sticky top-0 z-10 bg-white border-b">
    <div class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
      <RouterLink to="/feed" class="text-2xl font-bold">Instagram</RouterLink>

      <div class="hidden sm:block">
        <input
          v-model="q"
          type="text"
          placeholder="Search"
          class="bg-gray-100 rounded-md px-3 py-1.5 text-sm outline-none"
        />
      </div>

      <div class="flex items-center gap-4">
        <RouterLink to="/feed" class="text-gray-700 hover:text-black">Home</RouterLink>

        <RouterLink v-if="me" :to="`/u/${me.username}`" class="flex items-center gap-2">
          <img :src="me.avatar" alt="" class="w-7 h-7 rounded-full" />
          <span class="hidden sm:inline text-sm">@{{ me.username }}</span>
        </RouterLink>
        
        <button v-if="isAuthed" @click="logout" class="text-sm text-red-500 hover:underline">Logout</button>
        <RouterLink v-else to="/login" class="text-sm text-instaBlue hover:underline">Login</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const q = ref('')

const isAuthed = computed(() => auth.isAuthenticated)
const me = computed(() => auth.me)

onMounted(() => {
  if (auth.isAuthenticated && !auth.me) auth.fetchMe()
})

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>