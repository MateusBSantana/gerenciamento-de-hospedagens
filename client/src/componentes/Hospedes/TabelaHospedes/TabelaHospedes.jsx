import React, { useEffect, useState } from 'react';

import styles from './TabelaHospede.module.css';
import { Link } from 'react-router-dom';
import { deletarHospede } from './deletarHospede'; // Verifique se a importação está correta
import MenuLateral from '../../layout/MenuLateral/MenuLateral';

function TabelaHospede() {
  // Estado para armazenar a lista de hóspedes
  const [hospedes, setHospedes] = useState([]);
  // Estado para controlar o loading de remoção
  const [removeLoading, setRemoveLoading] = useState(false);
  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect para carregar os hóspedes ao montar o componente
  useEffect(() => {
    setTimeout(() => {
      carregarHospedes();
    }, 300);
  }, []);

  // Função assíncrona para carregar a lista de hóspedes da API
  async function carregarHospedes() {
    try {
      const resposta = await fetch('http://localhost:5000/hospede', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resposta.ok) {
        throw new Error('Erro ao buscar Hóspedes');
      }
      const consulta = await resposta.json();
      setHospedes(consulta);
      setRemoveLoading(true);
    } catch (error) {
      console.log('erro ao buscar Hóspedes', error);
    }
  }

  // Função para deletar um hóspede
  const handleDelete = async (id) => {
    const sucesso = await deletarHospede(id); // Corrigir para deletarHospede
    if (sucesso) {
      setHospedes(hospedes.filter((hospede) => hospede.id !== id));
    }
  };

  // Função para atualizar o estado de pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrando os hóspedes com base no termo de pesquisa (nome ou CPF)
  const filteredHospedes = hospedes.filter((hospede) =>
    hospede.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospede.cpf.includes(searchTerm)
  );

  return (
    <div className="d-flex">
      {/* Componente de menu lateral */}
      <MenuLateral />
      <div className="flex-grow-1 p-3">
        <h2 className="text-center">Lista de Hóspedes</h2>
        {/* Campo de pesquisa e botão ao lado direito */}
        <div className="d-flex mb-3 mx-auto" style={{ width: '40%', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Pesquisar Hóspede por Nome ou CPF"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control me-2"
            style={{ flex: '1' }}
          />
          <Link to="/cadastro_hospede">
            <button className="btn btn-primary">Novo Hóspede</button>
          </Link>
        </div>
        {/* Mensagem de ausência de hóspedes */}
        {removeLoading && filteredHospedes.length === 0 && (
          <h1 className="mt-3 mx-auto" style={{ width: '50%', textAlign: 'center' }}>Não há hóspedes disponíveis</h1>
        )}
        <div className={styles.Hospedes}>
          <table className={`${styles.TabelaHospedes} table-bordered mt-3`}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Sexo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Renderizando os hóspedes filtrados */}
              {filteredHospedes.map((hospede) => (
                <tr key={hospede.id}>
                  <td>{hospede.nome}</td>
                  <td>{hospede.cpf}</td>
                  <td>{hospede.telefone}</td>
                  <td>{hospede.sexo}</td>
                  <td className="bg-light">
                    <Link className="btn btn-primary btn-sm" to={`/editar_hospede/${hospede.id}`}>Editar</Link>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(hospede.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TabelaHospede;
