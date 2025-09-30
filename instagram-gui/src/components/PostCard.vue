<template>
  <article class="bg-white border rounded-md">
    <!-- 헤더 -->
    <div class="flex items-center gap-3 px-4 py-3">
      <img :src="post.user.avatar" class="w-8 h-8 rounded-full" alt="" />
      <RouterLink :to="`/u/${post.user.username}`" class="font-semibold">
        {{ post.user.username }}
      </RouterLink>
    </div>

    <!-- 이미지 -->
    <div class="bg-black">
      <img :src="post.imageUrl" class="w-full object-contain" alt="" />
    </div>

    <!-- 액션 -->
    <div class="px-4 py-3">
      <div class="flex items-center gap-4">
        <button @click="$emit('like', post.id)" :aria-pressed="post.liked" class="select-none">
          <span v-if="post.liked">❤️</span>
          <span v-else>🤍</span>
        </button>
        <button class="select-none">💬</button>
        <button class="ml-auto select-none">🔖</button>
      </div>

      <div class="mt-2 text-sm">
        <span class="font-semibold">{{ post.likeCount || 0 }} likes</span>
      </div>
      <div class="mt-1">
        <span class="font-semibold mr-2">{{ post.user.username }}</span>
        <span>{{ post.caption }}</span>
      </div>
      <div class="mt-1 text-sm text-gray-500">
        {{ timeAgo(post.createdAt) }} · {{ post.commentsCount || 0 }} comments
      </div>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const timeAgo = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  const diff = (Date.now() - d.getTime()) / 1000
  const units = [
    ['yr', 31536000],
    ['mo', 2592000],
    ['d', 86400],
    ['h', 3600],
    ['m', 60],
    ['s', 1]
  ]
  for (const [label, sec] of units) {
    const v = Math.floor(diff / sec)
    if (v >= 1) return `${v}${label}`
  }
  return 'now'
}
</script>
