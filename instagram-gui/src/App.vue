<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="py-8 text-sm text-gray-400 text-center">
      Instagram Clone by You · BFF powered
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
/* 전역 스타일은 index.css, 유틸은 Tailwind 사용 */
</style>