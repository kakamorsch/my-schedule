<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Lista de Contatos</h1>
      <button
        @click="openCreateModal"
        class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        Novo Contato
      </button>
    </div>

    <!-- Search Bar -->
    <div class="mb-6">
      <div class="relative">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Pesquisar contatos..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          @input="handleSearch"
        />
      </div>
    </div>

    <!-- Contacts List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li v-for="contato in contatos" :key="contato.id" class="px-6 py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img
                :src="
                  contato.foto?.id ? `/api/foto/download/${contato.foto.id}` : '/default-avatar.png'
                "
                alt="Profile"
                class="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div class="flex-1">
              <div class="flex items-center">
                <div class="text-sm font-medium text-gray-900">{{ contato.nome }}</div>
                <button
                  @click="toggleFavorite(contato)"
                  class="ml-2 text-yellow-500 hover:text-yellow-600"
                  :title="contato.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
                >
                  <span v-if="contato.favorite">★</span>
                  <span v-else>☆</span>
                </button>
              </div>
              <div class="text-sm text-gray-500">
                <div>Email: {{ contato.email }}</div>
                <div>Telefone: {{ formatPhone(contato.telefone) }}</div>
                <div>Tipo: {{ contato.tipoContato }}</div>
                <div>Tag: {{ contato.tag }}</div>
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="editContact(contato)" class="text-primary-600 hover:text-primary-900">
                Editar
              </button>
              <button @click="deleteContact(contato)" class="text-red-600 hover:text-red-900">
                Excluir
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Create/Edit Contact Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">
          {{ editingContact ? 'Editar Contato' : 'Novo Contato' }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Person Selection -->
          <div>
            <label for="pessoa" class="block text-sm font-medium text-gray-700"> Pessoa </label>
            <select
              v-model="formData.pessoaId"
              id="pessoa"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Selecione uma pessoa</option>
              <option v-for="pessoa in pessoas" :key="pessoa.id" :value="pessoa.id">
                {{ pessoa.nome }}
              </option>
            </select>
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

          <!-- Phone -->
          <div>
            <label for="telefone" class="block text-sm font-medium text-gray-700"> Telefone </label>
            <input
              v-model="formData.telefone"
              type="text"
              id="telefone"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              @input="formatPhoneInput"
            />
          </div>

          <!-- Type -->
          <div>
            <label for="tipoContato" class="block text-sm font-medium text-gray-700">
              Tipo de Contato
            </label>
            <select
              v-model="formData.tipoContato"
              id="tipoContato"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="RESIDENCIAL">Residencial</option>
              <option value="COMERCIAL">Comercial</option>
              <option value="CELULAR">Celular</option>
            </select>
          </div>

          <!-- Tag -->
          <div>
            <label for="tag" class="block text-sm font-medium text-gray-700"> Tag </label>
            <input
              v-model="formData.tag"
              type="text"
              id="tag"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <!-- Private -->
          <div class="flex items-center">
            <input
              v-model="formData.privado"
              type="checkbox"
              id="privado"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="privado" class="ml-2 block text-sm text-gray-900"> Privado </label>
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
              {{ editingContact ? 'Atualizar' : 'Criar' }}
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
import type { Pessoa, ContatoFormData, Contato } from '@/types/auth'
import { formatarTelefone } from '@/utils/formmaters'

const authStore = useAuthStore()
const contatos = ref<Contato[]>([])
const pessoas = ref<Pessoa[]>([])
const showModal = ref(false)
const editingContact = ref<Contato | null>(null)
const searchTerm = ref('')

const formData = ref<ContatoFormData>({
  email: '',
  telefone: '',
  tag: '',
  tipoContato: 'TELEFONE',
  privado: false,
  pessoaId: 0,
})

// Formatters
const formatPhone = formatarTelefone

const formatPhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)
  formData.value.telefone = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

const fetchContatos = async () => {
  try {
    const token = authStore.getToken()
    if (!token) throw new Error('No token found')
    const response = await api.searchContacts(token, searchTerm.value)
    contatos.value = response
    console.log(response)
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
  }
}

const fetchPessoas = async () => {
  try {
    const token = authStore.getToken()
    if (!token) throw new Error('No token found')
    const response = await api.searchPeople(token, '')
    pessoas.value = response
  } catch (error) {
    console.error('Failed to fetch people:', error)
  }
}

const handleSearch = () => {
  fetchContatos()
}

const openCreateModal = () => {
  editingContact.value = null
  formData.value = {
    email: '',
    telefone: '',
    tag: '',
    tipoContato: 'TELEFONE',
    privado: false,
    pessoaId: 0,
  }
  showModal.value = true
}

const editContact = (contato: Contato) => {
  editingContact.value = contato
  formData.value = {
    email: contato.email,
    telefone: contato.telefone,
    tag: contato.tag,
    tipoContato: contato.tipoContato,
    privado: contato.privado,
    pessoaId: contato.id,
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingContact.value = null
}

const toggleFavorite = async (contato: Contato) => {
  try {
    const token = authStore.getToken()
    if (!token) throw new Error('No token found')
    if (contato.favorite) {
      await api.removeFavorite(token, contato.id)
    } else {
      await api.saveFavorite(token, contato.id)
    }
    await fetchContatos()
  } catch (error) {
    console.error('Failed to toggle favorite:', error)
    alert('Falha ao alterar favorito')
  }
}

const deleteContact = async (contato: Contato) => {
  if (!confirm('Tem certeza que deseja excluir este contato?')) return

  try {
    const token = authStore.getToken()
    if (!token) throw new Error('No token found')
    await api.deleteContact(token, contato.id)
    await fetchContatos()
  } catch (error) {
    console.error('Failed to delete contact:', error)
    alert('Falha ao excluir contato')
  }
}

const handleSubmit = async () => {
  try {
    const token = authStore.getToken()
    if (!token) throw new Error('No token found')

    await api.saveContact(token, formData.value)
    await fetchContatos()
    closeModal()
  } catch (error: unknown) {
    console.error('Failed to save contact:', error)
    if (error instanceof Error) {
      alert(error.message)
    } else {
      alert('Falha ao salvar contato')
    }
  }
}

onMounted(() => {
  fetchContatos()
  fetchPessoas()
})
</script>
