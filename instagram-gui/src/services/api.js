import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const baseURL = import.meta.env.VITE_BFF_URL || 'http://localhost:3000'
const enableMock = String(import.meta.env.VITE_ENABLE_MOCK || '0') === '1'

// 기본 인스턴스
const api = axios.create({
  baseURL,
  withCredentials: false, // BFF가 쿠키 인증이면 true로 변경
})

// 토큰 자동 첨부
api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

// ---- 선택: 아주 간단한 목(개발 편의) ----
if (enableMock) {
  // 요청을 가로채서 가짜 응답
  api.interceptors.request.use((config) => {
    config.headers['x-mock'] = '1'
    return config
  })
  api.interceptors.response.use((res) => res, (error) => {
    // 필요한 경우 에러도 변환 가능
    return Promise.reject(error)
  })

  // 간이 구현: axios adapter를 대체 (주요 엔드포인트만)
  api.defaults.adapter = async (config) => {
    const { url, method, data } = config
    const sleep = (ms) => new Promise(r => setTimeout(r, ms))
    await sleep(300)

    const ok = (data) => ({ status: 200, statusText: 'OK', data, config, headers: {} })
    const unauth = () => ({ status: 401, statusText: 'Unauthorized', data: { message: 'unauth' }, config, headers: {} })

    // 간단한 메모리 토큰
    let token = localStorage.getItem('token')

    if (url === '/api/auth/login' && method === 'post') {
      const body = typeof data === 'string' ? JSON.parse(data) : data
      if (body.username && body.password) {
        localStorage.setItem('token', 'mock-token')
        return ok({ token: 'mock-token' })
      }
      return unauth()
    }

    if (url === '/api/auth/me' && method === 'get') {
      if (!token) return unauth()
      return ok({ id: 1, username: 'mockuser', name: 'Mock User', avatar: 'https://i.pravatar.cc/150?img=3' })
    }

    if (url === '/api/posts' && method === 'get') {
      if (!token) return unauth()
      return ok([
        {
          id: 101,
          user: { username: 'alice', avatar: 'https://i.pravatar.cc/150?img=11' },
          imageUrl: 'https://picsum.photos/seed/insta1/800/800',
          caption: 'Sunny day 🌞',
          likeCount: 3,
          liked: false,
          createdAt: '2025-09-30T07:00:00Z',
          commentsCount: 2,
        },
        {
          id: 102,
          user: { username: 'bob', avatar: 'https://i.pravatar.cc/150?img=12' },
          imageUrl: 'https://picsum.photos/seed/insta2/800/800',
          caption: 'Coffee time ☕️',
          likeCount: 10,
          liked: true,
          createdAt: '2025-09-29T15:12:00Z',
          commentsCount: 5,
        },
      ])
    }

    if (url?.match(/^\/api\/posts\/\d+\/(like|unlike)$/) && method === 'post') {
      if (!token) return unauth()
      return ok({ success: true })
    }

    if (url?.match(/^\/api\/users\/[^/]+$/) && method === 'get') {
      if (!token) return unauth()
      const username = url.split('/').pop()
      return ok({
        user: { username, name: username.toUpperCase(), bio: 'Hello from mock', avatar: 'https://i.pravatar.cc/150?img=5' },
        posts: Array.from({ length: 9 }).map((_, i) => ({
          id: 200 + i,
          imageUrl: `https://picsum.photos/seed/${username}-${i}/600/600`,
        }))
      })
    }

    return { status: 404, statusText: 'Not Found', data: { message: 'mock 404' }, config, headers: {} }
  }
}

export default api
