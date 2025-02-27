<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Usuários</h1>
      <button
        @click="openCreateModal"
        class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        Novo Usuário
      </button>
    </div>

    <!-- Users List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li v-for="user in users" :key="user.id" class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-medium text-gray-900">{{ user.nome }}</div>
              <div class="text-sm text-gray-500">
                <div>Username: {{ user.username }}</div>
                <div>Email: {{ user.email }}</div>
                <div>CPF: {{ formatCpf(user.cpf) }}</div>
                <div>Telefone: {{ formatPhone(user.telefone) }}</div>
                <!-- <div>
                  Tipo: {{ user.tipos?.includes('ROLE_ADMIN') ? 'Administrador' : 'Usuário' }}
                </div> -->
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="editUser(user)" class="text-primary-600 hover:text-primary-900">
                Editar
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Create/Edit User Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">
          {{ editingUser ? 'Editar Usuário' : 'Novo Usuário' }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700"> Username </label>
            <input
              v-model="formData.username"
              type="text"
              id="username"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label for="nome" class="block text-sm font-medium text-gray-700"> Nome </label>
            <input
              v-model="formData.nome"
              type="text"
              id="nome"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label for="cpf" class="block text-sm font-medium text-gray-700"> CPF </label>
            <input
              v-model="formData.cpf"
              type="text"
              id="cpf"
              required
              maxlength="14"
              @input="formatCpfInput"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label for="telefone" class="block text-sm font-medium text-gray-700"> Telefone </label>
            <input
              v-model="formData.telefone"
              type="text"
              id="telefone"
              required
              maxlength="15"
              @input="formatPhoneInput"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label for="dataNascimento" class="block text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <input
              v-model="formData.dataNascimento"
              type="date"
              id="dataNascimento"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div v-if="!editingUser">
            <label for="password" class="block text-sm font-medium text-gray-700"> Senha </label>
            <input
              v-model="formData.password"
              type="password"
              id="password"
              required
              minlength="8"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
            <p class="mt-1 text-xs text-gray-500">A senha deve ter pelo menos 8 caracteres</p>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {{ editingUser ? 'Atualizar' : 'Criar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api'
import type { Usuario } from '@/types/auth'
import { formatarCPF, formatarTelefone } from '@/utils/formmaters'

const authStore = useAuthStore()
const users = ref<Usuario[]>([])
const showModal = ref(false)
const editingUser = ref<Usuario | null>(null)

const formData = ref<Usuario>({
  id: 0,
  username: '',
  nome: '',
  email: '',
  cpf: '',
  dataNascimento: '',
  telefone: '',
  password: '',
})

// Formatters
const formatCpf = formatarCPF
const formatPhone = formatarTelefone

const formatCpfInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = formatarCPF(input.value)
}

const formatPhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)
  formData.value.telefone = formatPhone(value)
}

const fetchUsers = async () => {
  try {
    const token = authStore.getToken()
    if (!token) throw new Error('No token found')
    const response = await api.pesquisarUsuarios(token, '')
    users.value = response
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}

const openCreateModal = () => {
  editingUser.value = null
  formData.value = {
    id: 0,
    username: '',
    nome: '',
    email: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    password: '',
  }
  showModal.value = true
}

const editUser = (user: Usuario) => {
  editingUser.value = user
  formData.value = {
    ...user,
    password: '', // Don't include password when editing
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingUser.value = null
}

const handleSubmit = async () => {
  try {
    const token = authStore.getToken()
    if (!token) throw new Error('No token found')

    if (editingUser.value) {
      const response = await api.atualizarUsuario(token, formData.value)
      if (response) {
        const index = users.value.findIndex((u) => u.id === editingUser.value?.id)
        if (index !== -1) {
          users.value[index] = response
        }
      }
    } else {
      const response = await api.salvarUsuario(token, formData.value)
      if (response) {
        users.value.push(response)
      }
    }

    closeModal()
  } catch (error: unknown) {
    console.error('Failed to save user:', error)
    if (error instanceof Error) {
      alert(error.message)
    } else {
      alert('Falha ao salvar usuário')
    }
  }
}

onMounted(() => {
  fetchUsers()
})
</script>
