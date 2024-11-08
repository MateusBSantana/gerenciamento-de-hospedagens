import React, { useState } from 'react';

function ApiCep() {
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [complemento, setComplemento] = useState('');
    const [errors, setErrors] = useState({ CEP: false });

    const handleBuscarCep = async () => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setErrors((prevErrors) => ({ ...prevErrors, CEP: true }));
            } else {
                setEstado(data.uf || '');
                setCidade(data.localidade || '');
                setBairro(data.bairro || '');
                setRua(data.logradouro || '');
                setComplemento(data.complemento || '');
                setErrors((prevErrors) => ({ ...prevErrors, CEP: false }));
            }
        } catch (error) {
            console.error('Erro ao consultar o CEP:', error);
            setErrors((prevErrors) => ({ ...prevErrors, CEP: true }));
        }
    };

    return (
        <div>
            <h2>Buscar Endereço pelo CEP</h2>
            <input
                type="text"
                placeholder="Digite o CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
            />
            <button onClick={handleBuscarCep}>Buscar CEP</button>
            {errors.CEP && <p style={{ color: 'red' }}>Erro ao buscar o CEP. Verifique o valor.</p>}
            <div>
                <p>Estado: {estado}</p>
                <p>Cidade: {cidade}</p>
                <p>Bairro: {bairro}</p>
                <p>Rua: {rua}</p>
                <p>Complemento: {complemento}</p>
            </div>
        </div>
    );
}

export default ApiCep;
