<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-xl font-bold">Minha agenda</span>
            </div>
          </div>
          <div class="flex items-center">
            <!-- Menu Hamburguer -->
            <button
              class="lg:hidden"
              @click="toggleMenu"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <!-- Menu Desktop -->
            <div
              class="hidden lg:flex lg:items-center"
              :class="{ 'hidden': !menuOpen }"
            >
              <div v-if="!authStore.state.isAuthenticated">
                <router-link
                  to="/login"
                  class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </router-link>
              </div>
              <div v-else>
                <router-link
                  to="/"
                  class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </router-link>
                <router-link
                  to="/meu-cadastro"
                  class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Meu Cadastro
                </router-link>
                <router-link
                  to="/usuarios"
                  class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Usuários
                </router-link>
                <router-link
                  to="/pessoas"
                  class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Pessoas
                </router-link>
                <router-link
                  to="/contatos"
                  class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contatos
                </router-link>
                <router-link
                  to="/login"
                  @click="logout()"
                  class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Deslogar
                </router-link>
              </div>
            </div>
            <!-- Menu Mobile -->
            <div
              class="lg:hidden"
              :class="{ 'hidden': !menuOpen }"
            >
              <div class="absolute top-16 right-4 w-48 bg-white shadow-md rounded-md">
                <div v-if="!authStore.state.isAuthenticated">
                  <router-link
                    to="/login"
                    class="block text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </router-link>
                </div>
                <div v-else>
                  <router-link
                    to="/"
                    class="block text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </router-link>
                  <router-link
                    to="/meu-cadastro"
                    class="block text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Meu Cadastro
                  </router-link>
                  <router-link
                    to="/usuarios"
                    class="block text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Usuários
                  </router-link>
                  <router-link
                    to="/pessoas"
                    class="block text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Pessoas
                  </router-link>
                  <router-link
                    to="/contatos"
                    class="block text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Contatos
                  </router-link>
                  <router-link
                    to="/login"
                    @click="logout()"
                    class="block text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Deslogar
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const menuOpen = ref(false)

// Função para alternar o menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// Logout
const logout = () => {
  authStore.logout()
}
</script>
<style scoped>
/* Add any custom styles here */
</style>
