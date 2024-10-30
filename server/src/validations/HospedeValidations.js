const params = [
    'nome_hospede',
    'rg',
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
    'observacoes' ,
];

export function isNullOrEmpty(value) {
    return (value === null || value === '' || value === undefined);
}

export function validateHospede(aula) {
    return params.some(param => 
        isNullOrEmpty(aula[param]));
}
