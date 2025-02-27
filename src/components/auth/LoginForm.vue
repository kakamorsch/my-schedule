<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Entre na sua conta
        </h2>
      </div>
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div v-if="error" class="rounded-md bg-red-50 p-4 mb-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
            </div>
          </div>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              v-model="credentials.username"
              id="username"
              name="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              @keydown.tab="validateUsername"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="credentials.password"
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              @keydown.tab="validatePassword"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              v-model="rememberMe"
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Lembre de mim </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const credentials = ref({
  username: '',
  password: '',
})
const rememberMe = ref(false)
const error = ref('')
const isLoading = ref(false)

// Check for remembered credentials on component mount
onMounted(() => {
  const rememberedCredentials = localStorage.getItem('rememberedCredentials')
  if (rememberedCredentials) {
    const { username, password } = JSON.parse(rememberedCredentials)
    credentials.value = { username, password }
    rememberMe.value = true
  }
})

const validateUsername = () => {
  if (!credentials.value.username) {
    error.value = 'Username is required'
    return false
  }
  error.value = ''
  return true
}

const validatePassword = () => {
  if (!credentials.value.password) {
    error.value = 'Password is required'
    return false
  }
  if (credentials.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters'
    return false
  }
  // // Check if password contains both letters and numbers
  // const hasLetters = /[a-zA-Z]/.test(credentials.value.password)
  // const hasNumbers = /\d/.test(credentials.value.password)
  // if (!hasLetters || !hasNumbers) {
  //   error.value = 'Password must contain both letters and numbers'
  //   return false
  // }
  error.value = ''
  return true
}

const handleLogin = async () => {
  try {
    // Validate inputs
    if (!validateUsername() || !validatePassword()) {
      return
    }

    isLoading.value = true
    error.value = ''

    // Handle remember me functionality
    if (rememberMe.value) {
      localStorage.setItem('rememberedCredentials', JSON.stringify(credentials.value))
    } else {
      localStorage.removeItem('rememberedCredentials')
    }

    // Perform login
    await authStore.login(credentials.value)

    // Show success message and redirect
    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Invalid username or password'
  } finally {
    isLoading.value = false
  }
}
</script>
