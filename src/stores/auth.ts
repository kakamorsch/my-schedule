import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginRequest, AuthResponse, Usuario } from '@/types/auth'
import api from '@/api'

interface AuthState {
  user: Usuario | null
  accessToken: string | null
  tipos: string[]
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const state = ref<AuthState>({
    user: null,
    accessToken: localStorage.getItem('token'),
    tipos: JSON.parse(localStorage.getItem('tipos') || '[]'),
    isAuthenticated: !!localStorage.getItem('token'),
  })

  const login = async (credentials: LoginRequest) => {
    try {
      const response: AuthResponse = await api.login(credentials)
      state.value.accessToken = response.accessToken
      state.value.tipos = response.tipos
      state.value.isAuthenticated = true

      // Create user object from response
      state.value.user = {
        id: response.id,
        username: response.username,
        nome: '', // This will be populated later with user details
        email: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
      }

      // Store auth data in localStorage
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('tipos', JSON.stringify(response.tipos))

      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    state.value.user = null
    state.value.accessToken = null
    state.value.tipos = []
    state.value.isAuthenticated = false

    localStorage.removeItem('token')
    localStorage.removeItem('tipos')
    localStorage.removeItem('rememberedCredentials')
  }

  const isAdmin = (): boolean => {
    return state.value.tipos.includes('ROLE_ADMIN')
  }

  const isUser = (): boolean => {
    return state.value.tipos.includes('ROLE_USER')
  }

  // Getter for token to be used in API calls
  const getToken = (): string | null => {
    return state.value.accessToken
  }

  // Initialize auth state from localStorage
  const initializeFromStorage = () => {
    const token = localStorage.getItem('token')
    const tipos = JSON.parse(localStorage.getItem('tipos') || '[]')

    if (token) {
      state.value.accessToken = token
      state.value.tipos = tipos
      state.value.isAuthenticated = true
    } else {
      // If no token is found, clear the auth state
      logout()
    }
  }

  // Call initialization
  initializeFromStorage()

  return {
    state,
    login,
    logout,
    isAdmin,
    isUser,
    getToken,
    user: state.value.user, // Add this line to expose the user state
  }
})
