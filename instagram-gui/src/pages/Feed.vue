<template>
  <div class="max-w-3xl mx-auto p-4">
    <div v-if="loading" class="text-center py-10 text-gray-500">Loading feed...</div>
    <div v-else class="grid gap-6">
      <PostCard v-for="p in posts" :key="p.id" :post="p" @like="toggleLike" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useFeedStore } from '../stores/feed'
import PostCard from '../components/PostCard.vue'

const feed = useFeedStore()
const loading = computed(() => feed.loading)
const posts = computed(() => feed.posts)

onMounted(() => {
  if (!posts.value?.length) feed.loadHomeFeed()
})

const toggleLike = (postId) => feed.toggleLike(postId)
</script>
