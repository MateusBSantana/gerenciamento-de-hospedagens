const params = [
    'hospede',
    'acomodacao',
    'dataEntrada',
    'dataSaida',
    'valorDiaria',
    'numAdultos',
    'numCriancas',
    'pago',
    'observacoes',
    'situacao'
];

export function isNullOrEmpty(value) {
    return (value === null || value === '' || value === undefined);
}

export function validateReserva(reserva) {
    return params.some(param => 
        isNullOrEmpty(reserva[param]));
}
