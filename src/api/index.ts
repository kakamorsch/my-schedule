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
  // Helper function to handle API requests
  async request<T>(method: string, url: string, token?: string, data?: unknown): Promise<T> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Request failed')
    }

    return await response.json()
  },

  // Helper function to handle API requests with blob response
  async requestBlob(url: string, token?: string): Promise<Blob> {
    const headers = new Headers()
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers,
    })

    if (!response.ok) {
      throw new Error('Request failed')
    }

    return await response.blob()
  },

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return await this.request('POST', '/auth/login', undefined, credentials)
  },

  // Usuario endpoints
  async alterarSenha(token: string, comando: ComandoAlterarSenha): Promise<ApiResponse<boolean>> {
    return await this.request('POST', '/usuario/alterarSenha', token, comando)
  },

  async atualizarUsuario(token: string, usuario: Partial<Usuario>): Promise<ApiResponse<Usuario>> {
    return await this.request('PUT', '/usuario/atualizar', token, usuario)
  },

  async buscarUsuario(token: string, id: number): Promise<ApiResponse<Usuario>> {
    return await this.request('GET', `/usuario/buscar/${id}`, token)
  },

  async pesquisarUsuarios(token: string, termo: string): Promise<ApiResponse<Usuario[]>> {
    return await this.request('POST', '/usuario/pesquisar', token, { termo })
  },

  async salvarUsuario(token: string, usuario: Usuario): Promise<ApiResponse<Usuario>> {
    return await this.request('POST', '/usuario/salvar', token, usuario)
  },

  // Contato endpoints
  async listContactsByPerson(token: string, pessoaId: number): Promise<ApiResponse<Contato[]>> {
    return await this.request('GET', `/contato/listar/${pessoaId}`, token)
  },

  async searchContacts(token: string, termo: string): Promise<ApiResponse<Contato[]>> {
    return await this.request('POST', '/contato/pesquisar', token, { termo })
  },

  async deleteContact(token: string, id: number): Promise<ApiResponse<boolean>> {
    return await this.request('DELETE', `/contato/remover/${id}`, token)
  },

  async saveContact(token: string, contactData: ContatoFormData): Promise<ApiResponse<Contato>> {
    return await this.request('POST', '/contato/salvar', token, contactData)
  },

  // Favoritos endpoints
  async searchFavorites(token: string): Promise<ApiResponse<Contato[]>> {
    return await this.request('GET', '/favorito/pesquisar', token)
  },

  async removeFavorite(token: string, contatoId: number): Promise<ApiResponse<boolean>> {
    return await this.request('DELETE', `/favorito/remover/${contatoId}`, token)
  },

  async saveFavorite(token: string, contatoId: number): Promise<ApiResponse<boolean>> {
    return await this.request('POST', '/favorito/salvar', token, { contatoId })
  },

  // Pessoa endpoints
  async buscarPessoa(token: string, id: number): Promise<ApiResponse<Pessoa>> {
    return await this.request('GET', `/pessoa/buscar/${id}`, token)
  },

  async searchPeople(token: string, nome: string): Promise<ApiResponse<Pessoa[]>> {
    return await this.request('POST', '/pessoa/pesquisar', token, { nome })
  },

  async deletePerson(token: string, id: number): Promise<ApiResponse<boolean>> {
    return await this.request('DELETE', `/pessoa/remover/${id}`, token)
  },

  async savePerson(token: string, personData: PessoaFormData): Promise<ApiResponse<Pessoa>> {
    return await this.request('POST', '/pessoa/salvar', token, personData)
  },

  // Foto endpoints
  async downloadPhoto(token: string, id: string): Promise<Blob> {
    return await this.requestBlob(`/foto/download/${id}`, token)
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
