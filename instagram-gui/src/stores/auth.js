import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    initialized: false,
    token: null,
    me: null,
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
  },
  actions: {
    hydrate() {
      if (this.initialized) return
      const token = localStorage.getItem('token')
      if (token) this.token = token
      this.initialized = true
    },
    async login({ username, password }) {
      const { data } = await api.post('/api/auth/login', { username, password })
      // BFF는 { token: '...' } 형태라고 가정
      this.token = data.token
      localStorage.setItem('token', this.token)
      await this.fetchMe()
    },
    async fetchMe() {
      if (!this.token) return
      const { data } = await api.get('/api/auth/me') // 현재 사용자 정보
      this.me = data
    },
    logout() {
      this.token = null
      this.me = null
      localStorage.removeItem('token')
    }
  }
})
