// BasePessoa types
export interface BasePessoa {
  id: number
  nome: string
  cpf: string // Format: XXX.XXX.XXX-XX
  email: string
}

// BaseUsuario types
export interface BaseUsuario extends BasePessoa {
  username: string
  dataNascimento: string // Format: yyyy-MM-dd
  telefone: string // Format: (DD) [X]XXXX-XXXX
}

// BaseEndereco types
export interface BaseEndereco {
  id?: number
  logradouro: string
  numero: number
  bairro: string
  cidade: string
  estado: string
  cep: string // Format: XXXXX-XXX
  pais: string // Format: 2 letters
}

// Foto types
export interface Foto {
  id: string
  name: string
  type: string
}

// Pessoa types
export interface Pessoa extends BasePessoa {
  endereco: BaseEndereco
  foto?: Foto
}

// Usuario types
export interface Usuario extends BaseUsuario {
  password?: string // Min length: 8
}

// Contato types
export interface Contato extends BasePessoa {
  telefone: string // Format: (DD) [X]XXXX-XXXX
  tag: string
  tipoContato: 'CELULAR' | 'EMAIL' | 'TELEFONE'
  privado: boolean
  usuario: Usuario
  favorite?: boolean
}

// LoginRequest types
export interface LoginRequest {
  username: string
  password: string
}

// AuthResponse types
export interface AuthResponse {
  accessToken: string
  id: number
  tipos: string[]
  tokenType: string
  username: string
}

// ComandoAlterarSenha types
export interface ComandoAlterarSenha {
  username: string
  password: string
  newPassword: string
}

// TermoBusca types
export interface TermoBusca {
  termo: string
}

// TermoBuscaPessoa types
export interface TermoBuscaPessoa {
  nome: string
}

// Response types
export interface Response<T> {
  message: string
  object: T
}

// ApiResponse types
export interface ApiResponse<T> {
  message: string
  object: T
}

// ContatoFormData types
export interface ContatoFormData {
  email: string
  telefone: string
  tag: string
  tipoContato: 'CELULAR' | 'EMAIL' | 'TELEFONE'
  privado: boolean
  pessoaId: number
}

// PessoaFormData types
export interface PessoaFormData extends BasePessoa {
  endereco: BaseEndereco
}

// UsuarioFormData types
export interface UsuarioFormData extends BaseUsuario {
  password?: string
}

// CreateUsuarioFormData types
export interface CreateUsuarioFormData extends BaseUsuario {
  password: string
}

// UsuarioTiposResponse types
export interface UsuarioTiposResponse {
  tipos: string[]
  usuario: Usuario
}
