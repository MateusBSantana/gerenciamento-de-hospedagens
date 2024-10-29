const params = [
    'nome_hospede',
    /*'rg',
    'cpf',
    'data_nascimento',
    'sexo',
    'celular',
    'email',
    'CEP',
    'Estado',
    'cidade',
    'bairro',
    'rua',
    'complemento',
    'observacoes'*/
  ];
  
  export function isNullOrEmpty(value) {
    return value === null || value === '' || value === undefined;
  }
  
  export function validateHospede(hospede) {
    return params.some((param) => {
      return isNullOrEmpty(hospede[param]);
    });
  }
  