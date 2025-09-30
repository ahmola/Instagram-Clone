<template>
  <div class="max-w-3xl mx-auto p-4">
    <div v-if="loading" class="text-center py-10 text-gray-500">Loading profile...</div>

    <div v-else>
      <div class="flex items-center gap-8 mb-8">
        <img :src="profile.user.avatar" class="w-24 h-24 rounded-full" alt="" />
        <div>
          <div class="flex items-center gap-4">
            <h2 class="text-2xl font-semibold">@{{ profile.user.username }}</h2>
            <span class="text-gray-600">{{ profile.user.name }}</span>
          </div>
          <p class="text-gray-700 mt-2">{{ profile.user.bio }}</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-1">
        <img v-for="p in profile.posts" :key="p.id" :src="p.imageUrl" class="w-full aspect-square object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const username = ref(route.params.username)
const loading = ref(false)
const profile = ref({ user: {}, posts: [] })

const load = async () => {
  loading.value = true
  try {
    const { data } = await api.get(`/api/users/${username.value}`)
    profile.value = data
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => route.params.username, (v) => { username.value = v; load() })
</script>
