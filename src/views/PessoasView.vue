<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Pessoas</h1>
      <button
        @click="openCreateModal"
        class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        Nova Pessoa
      </button>
    </div>

    <!-- Search Bar -->
    <div class="mb-6">
      <div class="relative">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Pesquisar pessoas..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          @input="handleSearch"
        />
      </div>
    </div>

    <!-- People List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li v-for="pessoa in pessoas" :key="pessoa.id" class="px-6 py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img
                :src="
                  pessoa.foto?.id ? `/api/foto/download/${pessoa.foto.id}` : '/default-avatar.png'
                "
                alt="Profile"
                class="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-900">{{ pessoa.nome }}</div>
              <div class="text-sm text-gray-500">
                <div>CPF: {{ formatCpf(pessoa.cpf) }}</div>
                <div>Email: {{ pessoa.email }}</div>
                <div>CEP: {{ pessoa.endereco.cep }}</div>
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="editPerson(pessoa)" class="text-primary-600 hover:text-primary-900">
                Editar
              </button>
              <button @click="deletePerson(pessoa)" class="text-red-600 hover:text-red-900">
                Excluir
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Create/Edit Person Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">
          {{ editingPerson ? 'Editar Pessoa' : 'Nova Pessoa' }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Photo Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Foto</label>
            <div class="mt-1 flex items-center">
              <img
                :src="
                  previewImage ||
                  (editingPerson?.foto?.id
                    ? `/api/foto/download/${editingPerson.foto.id}`
                    : '/default-avatar.png')
                "
                alt="Preview"
                class="h-20 w-20 rounded-full object-cover"
              />
              <input type="file" accept="image/*" @change="handleImageUpload" class="ml-4" />
            </div>
          </div>

          <!-- Name -->
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

          <!-- CPF -->
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

          <!-- Email -->
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

          <!-- Address -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Endereço</h3>

            <div>
              <label for="cep" class="block text-sm font-medium text-gray-700"> CEP </label>
              <input
                v-model="formData.endereco.cep"
                type="text"
                id="cep"
                required
                maxlength="9"
                @input="formatCepInput"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label for="logradouro" class="block text-sm font-medium text-gray-700">
                Logradouro
              </label>
              <input
                v-model="formData.endereco.logradouro"
                type="text"
                id="logradouro"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label for="numero" class="block text-sm font-medium text-gray-700"> Número </label>
              <input
                v-model.number="formData.endereco.numero"
                type="number"
                id="numero"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label for="bairro" class="block text-sm font-medium text-gray-700"> Bairro </label>
              <input
                v-model="formData.endereco.bairro"
                type="text"
                id="bairro"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label for="cidade" class="block text-sm font-medium text-gray-700"> Cidade </label>
              <input
                v-model="formData.endereco.cidade"
                type="text"
                id="cidade"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label for="estado" class="block text-sm font-medium text-gray-700"> Estado </label>
              <input
                v-model="formData.endereco.estado"
                type="text"
                id="estado"
                required
                maxlength="2"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label for="pais" class="block text-sm font-medium text-gray-700"> País </label>
              <input
                v-model="formData.endereco.pais"
                type="text"
                id="pais"
                required
                maxlength="2"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
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
              {{ editingPerson ? 'Atualizar' : 'Criar' }}
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
import type { Pessoa, PessoaFormData } from '@/types/auth'
import { formatarCEP, formatarCPF } from '@/utils/formmaters'

const authStore = useAuthStore()
const pessoas = ref<Pessoa[]>([])
const showModal = ref(false)
const editingPerson = ref<Pessoa | null>(null)
const searchTerm = ref('')
const previewImage = ref('')

const formData = ref<PessoaFormData>({
  nome: '',
  cpf: '',
  email: '',
  endereco: {
    logradouro: '',
    numero: 0,
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    pais: 'BR',
  },
})

// Formatters
const formatCpf = formatarCPF
const formatCep = formatarCEP

const formatCpfInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)
  formData.value.cpf = formatCpf(value)
}

const formatCepInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length > 8) value = value.slice(0, 8)
  formData.value.endereco.cep = formatCep(value)
}

const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
    }
    reader.readAsDataURL(input.files[0])

    if (editingPerson.value) {
      const token = authStore.getToken()
      if (!token) throw new Error('No token found')

      const formData = new FormData()
      formData.append('file', input.files[0])
      await api.uploadPhoto(token, editingPerson.value.id, formData)
    }
  }
}

const fetchPessoas = async () => {
  try {
    const token = authStore.getToken()
    if (!token) throw new Error('No token found')
    const response = await api.searchPeople(token, searchTerm.value)
    pessoas.value = response
  } catch (error) {
    console.error('Failed to fetch people:', error)
  }
}

const handleSearch = () => {
  fetchPessoas()
}

const openCreateModal = () => {
  editingPerson.value = null
  formData.value = {
    nome: '',
    cpf: '',
    email: '',
    endereco: {
      logradouro: '',
      numero: 0,
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      pais: 'BR',
    },
  }
  previewImage.value = ''
  showModal.value = true
}

const editPerson = (pessoa: Pessoa) => {
  editingPerson.value = pessoa
  formData.value = {
    nome: pessoa.nome,
    cpf: pessoa.cpf,
    email: pessoa.email,
    endereco: { ...pessoa.endereco },
  }
  previewImage.value = ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingPerson.value = null
  previewImage.value = ''
}

const deletePerson = async (pessoa: Pessoa) => {
  if (!confirm('Tem certeza que deseja excluir esta pessoa?')) return

  try {
    const token = authStore.getToken()
    if (!token) throw new Error('No token found')
    await api.deletePerson(token, pessoa.id)
    await fetchPessoas()
  } catch (error) {
    console.error('Failed to delete person:', error)
    alert('Falha ao excluir pessoa')
  }
}

const handleSubmit = async () => {
  try {
    const token = authStore.getToken()
    if (!token) throw new Error('No token found')

    await api.savePerson(token, formData.value)
    await fetchPessoas()
    closeModal()
  } catch (error: unknown) {
    console.error('Failed to save person:', error)
    if (error instanceof Error) {
      alert(error.message)
    } else {
      alert('Falha ao salvar pessoa')
    }
  }
}

onMounted(() => {
  fetchPessoas()
})
</script>
