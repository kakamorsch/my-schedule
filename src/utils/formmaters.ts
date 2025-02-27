/**
 * Formata um CPF no formato XXX.XXX.XXX-XX
 * @param cpf - O CPF a ser formatado
 * @returns O CPF formatado ou uma mensagem de erro
 */
export function formatarCPF(cpf: string): string {
  let value = cpf.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)
  const formattedValue = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`
  return formattedValue
}

/**
 * Formata um CNPJ no formato XX.XXX.XXX/0001-XX
 * @param cnpj - O CNPJ a ser formatado
 * @returns O CNPJ formatado ou uma mensagem de erro
 */
export function formatarCNPJ(cnpj: string): string {
  // Remove caracteres não numéricos
  cnpj = cnpj?.replace(/\D/g, '')

  // Verifica se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) {
    return 'CNPJ inválido'
  }

  // Formata o CNPJ
  return cnpj
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{4})$/, '$1/$2')
    .replace(/(\d{4})(\d{2})$/, '$1-$2')
}

/**
 * Formata um CEP no formato XXXXX-XXX
 * @param cep - O CEP a ser formatado
 * @returns O CEP formatado ou uma mensagem de erro
 */
export function formatarCEP(cep: string): string {
  // Remove caracteres não numéricos
  cep = cep?.replace(/\D/g, '')

  // Verifica se o CEP tem 8 dígitos
  if (cep.length !== 8) {
    return 'CEP inválido'
  }

  // Formata o CEP
  return cep.replace(/(\d{5})(\d)/, '$1-$2')
}
/**
 *
 * @param phone - O telefone a ser formatado
 * @returns O telefone formatado
 */
export function formatarTelefone(phone: string) {
  return phone?.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
