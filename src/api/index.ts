const API_BASE_URL = 'https://demometaway.vps-kinghost.net:8485/api'

import type {
  LoginRequest,
  AuthResponse,
  Usuario,
  Contato,
  Pessoa,
  PessoaFormData,
  ContatoFormData,
  ApiResponse,
  ComandoAlterarSenha,
} from '@/types/auth'

const api = {
  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Login failed')
    }

    return await response.json()
  },

  // Usuario endpoints
  async alterarSenha(token: string, comando: ComandoAlterarSenha): Promise<ApiResponse<boolean>> {
    const response = await fetch(`${API_BASE_URL}/usuario/alterarSenha`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comando),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to change password')
    }

    return await response.json()
  },

  async atualizarUsuario(token: string, usuario: Partial<Usuario>): Promise<ApiResponse<Usuario>> {
    const response = await fetch(`${API_BASE_URL}/usuario/atualizar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to update user')
    }

    return await response.json()
  },

  async buscarUsuario(token: string, id: number): Promise<ApiResponse<Usuario>> {
    const response = await fetch(`${API_BASE_URL}/usuario/buscar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to get user')
    }

    return await response.json()
  },

  async pesquisarUsuarios(token: string, termo: string): Promise<ApiResponse<Usuario[]>> {
    const response = await fetch(`${API_BASE_URL}/usuario/pesquisar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ termo }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to search users')
    }

    return await response.json()
  },

  async salvarUsuario(token: string, usuario: Usuario): Promise<ApiResponse<Usuario>> {
    const response = await fetch(`${API_BASE_URL}/usuario/salvar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to save user')
    }

    return await response.json()
  },

  // Contato endpoints
  async listContactsByPerson(token: string, pessoaId: number): Promise<ApiResponse<Contato[]>> {
    const response = await fetch(`${API_BASE_URL}/contato/listar/${pessoaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to list contacts')
    }

    return await response.json()
  },

  async searchContacts(token: string, termo: string): Promise<ApiResponse<Contato[]>> {
    const response = await fetch(`${API_BASE_URL}/contato/pesquisar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ termo }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to search contacts')
    }

    return await response.json()
  },

  async deleteContact(token: string, id: number): Promise<ApiResponse<boolean>> {
    const response = await fetch(`${API_BASE_URL}/contato/remover/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to delete contact')
    }

    return await response.json()
  },

  async saveContact(token: string, contactData: ContatoFormData): Promise<ApiResponse<Contato>> {
    const response = await fetch(`${API_BASE_URL}/contato/salvar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to save contact')
    }

    return await response.json()
  },

  // Favoritos endpoints
  async searchFavorites(token: string): Promise<ApiResponse<Contato[]>> {
    const response = await fetch(`${API_BASE_URL}/favorito/pesquisar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to search favorites')
    }

    return await response.json()
  },

  async removeFavorite(token: string, contatoId: number): Promise<ApiResponse<boolean>> {
    const response = await fetch(`${API_BASE_URL}/favorito/remover/${contatoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to remove favorite')
    }

    return await response.json()
  },

  async saveFavorite(token: string, contatoId: number): Promise<ApiResponse<boolean>> {
    const response = await fetch(`${API_BASE_URL}/favorito/salvar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contatoId }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to save favorite')
    }

    return await response.json()
  },

  // Pessoa endpoints
  async buscarPessoa(token: string, id: number): Promise<ApiResponse<Pessoa>> {
    const response = await fetch(`${API_BASE_URL}/pessoa/buscar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to get person')
    }

    return await response.json()
  },

  async searchPeople(token: string, nome: string): Promise<ApiResponse<Pessoa[]>> {
    const response = await fetch(`${API_BASE_URL}/pessoa/pesquisar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to search people')
    }

    return await response.json()
  },

  async deletePerson(token: string, id: number): Promise<ApiResponse<boolean>> {
    const response = await fetch(`${API_BASE_URL}/pessoa/remover/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to delete person')
    }

    return await response.json()
  },

  async savePerson(token: string, personData: PessoaFormData): Promise<ApiResponse<Pessoa>> {
    const response = await fetch(`${API_BASE_URL}/pessoa/salvar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to save person')
    }

    return await response.json()
  },

  // Foto endpoints
  async downloadPhoto(token: string, id: string): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/foto/download/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to download photo')
    }

    return await response.blob()
  },

  async uploadPhoto(
    token: string,
    id: number,
    photoData: FormData,
  ): Promise<ApiResponse<{ id: string; name: string; type: string }>> {
    const response = await fetch(`${API_BASE_URL}/foto/upload/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: photoData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to upload photo')
    }

    return await response.json()
  },
}

export default api
