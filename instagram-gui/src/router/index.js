import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const Login = () => import('../pages/Login.vue')
const Feed = () => import('../pages/Feed.vue')
const Profile = () => import('../pages/Profile.vue')
const NotFound = () => import('../pages/NotFound.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/feed' },
    { path: '/login', component: Login, meta: { public: true } },
    { path: '/feed', component: Feed, meta: { requiresAuth: true } },
    { path: '/u/:username', component: Profile, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', component: NotFound, meta: { public: true } },
  ],
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!auth.initialized) auth.hydrate() // localStorage에서 토큰 복원

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (to.path === '/login' && auth.isAuthenticated) {
    return { path: '/feed' }
  }
})

export default router
