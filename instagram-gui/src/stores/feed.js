import { defineStore } from 'pinia'
import api from '../services/api'

export const useFeedStore = defineStore('feed', {
  state: () => ({
    loading: false,
    posts: [],
  }),
  actions: {
    async loadHomeFeed() {
      this.loading = true
      try {
        const { data } = await api.get('/api/posts')
        this.posts = data
      } finally {
        this.loading = false
      }
    },
    async toggleLike(postId) {
      const target = this.posts.find(p => p.id === postId)
      if (!target) return
      const originallyLiked = !!target.liked
      // 옵티미스틱 업데이트
      target.liked = !originallyLiked
      target.likeCount = (target.likeCount || 0) + (target.liked ? 1 : -1)
      try {
        await api.post(`/api/posts/${postId}/${target.liked ? 'like' : 'unlike'}`)
      } catch (e) {
        // 롤백
        target.liked = originallyLiked
        target.likeCount = (target.likeCount || 0) + (target.liked ? 1 : -1) * -1
      }
    }
  }
})
