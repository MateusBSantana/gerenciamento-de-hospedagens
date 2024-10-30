const params = [
    'nome_hospede',
    'rg',
    'cpf',
    'data_nascimento',
    'sexo',
    'email',
    'telefone',
    'observacoes',
    'CEP',
    'Estado',
    'cidade',
    'bairro',
    'rua',
    'complemento',
    'observacoes'
  ];
  
  
  export function isNullOrEmpty(value) {
    return value === null || value === '' || value === undefined;
  }
  
  export function validateFuncionario(funcionario) {
    return params.some((param) => {
      return isNullOrEmpty(funcionario[param]);
    });
  }
  