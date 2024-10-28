import React, { useEffect, useState } from 'react';

function BuscarImfReserva() {
  const [hospedes, setHospedes] = useState([]);

  // Função para buscar hóspedes
  async function buscarHospedes() {
    try {
      const resposta = await fetch('http://localhost:5000/hospede'); // Endpoint para buscar hóspedes
      if (!resposta.ok) {
        throw new Error('Erro ao buscar hóspedes');
      }
      const dados = await resposta.json();
      return dados.hospede || []; // Garante que dados.hospede seja um array, mesmo se não existir
    } catch (error) {
      console.error('Erro ao buscar hóspedes:', error);
      return []; // Retorna um array vazio em caso de erro
    }
  }

  useEffect(() => {
    async function obterHospedes() {
      const listaHospedes = await buscarHospedes();
      setHospedes(listaHospedes);
    }
    obterHospedes();
  }, []);

  return (
    <div>
      <h3>Lista de Hóspedes</h3>
      <ul>
        {hospedes.length > 0 ? (
          hospedes.map((hospede) => (
            <li key={hospede.id}>{hospede.nome}</li>
          ))
        ) : (
          <p>Nenhum hóspede encontrado.</p> // Mensagem se a lista estiver vazia
        )}
      </ul>
    </div>
  );
}

export default BuscarImfReserva;
