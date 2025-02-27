import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/components/auth/LoginForm.vue'
import HomeView from '@/views/HomeView.vue'

// Lazy-loaded components
const MeuCadastroView = () => import('@/views/MeuCadastroView.vue')
const UsuariosView = () => import('@/views/UsuariosView.vue')
const PessoasView = () => import('@/views/PessoasView.vue')
const ContatosList = () => import('@/views/ContatosView.vue')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
    meta: { requiresGuest: true },
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/meu-cadastro',
    name: 'meu-cadastro',
    component: MeuCadastroView,
    meta: { requiresAuth: true },
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsuariosView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/pessoas',
    name: 'pessoas',
    component: PessoasView,
    meta: { requiresAuth: true },
  },
  {
    path: '/contatos',
    name: 'contatos',
    component: ContatosList,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.state.isAuthenticated
  const isAdmin = authStore.isAdmin()

  // Handle routes that require guest access (like login)
  if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'home' })
    return
  }

  // Handle routes that require authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
    return
  }

  // Handle routes that require admin role
  if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
