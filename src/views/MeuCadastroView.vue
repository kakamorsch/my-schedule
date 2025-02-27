<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Meu Cadastro</h1>
    <form @submit.prevent="updateProfile" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input
          v-model="user.username"
          id="username"
          type="text"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="user.email"
          id="email"
          type="email"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
        <input
          v-model="user.cpf"
          id="cpf"
          type="text"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label for="dataNascimento" class="block text-sm font-medium text-gray-700"
          >Data de Nascimento</label
        >
        <input
          v-model="user.dataNascimento"
          id="dataNascimento"
          type="date"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <label for="telefone" class="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          v-model="user.telefone"
          id="telefone"
          type="text"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Atualizar Perfil
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = ref({
  username: '',
  email: '',
  cpf: '',
  dataNascimento: '',
  telefone: '',
})

onMounted(() => {
  if (authStore.user) {
    user.value = {
      username: authStore.user.username,
      email: authStore.user.email,
      cpf: authStore.user.cpf,
      dataNascimento: authStore.user.dataNascimento,
      telefone: authStore.user.telefone,
    }
  }
})

const updateProfile = async () => {
  try {
    // Update the user state directly through the store
    await authStore.login({
      username: user.value.username,
      password: '', // Handle this appropriately
    })
    alert('Profile updated successfully!')
  } catch (error) {
    console.error('Failed to update profile:', error)
  }
}
</script>
