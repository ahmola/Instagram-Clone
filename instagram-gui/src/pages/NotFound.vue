<template>
  <div class="min-h-[60vh] grid place-items-center">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-2">404</h1>
      <p class="text-gray-600 mb-6">페이지를 찾을 수 없어요.</p>
      <RouterLink to="/feed" class="text-instaBlue underline">피드로 돌아가기</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
