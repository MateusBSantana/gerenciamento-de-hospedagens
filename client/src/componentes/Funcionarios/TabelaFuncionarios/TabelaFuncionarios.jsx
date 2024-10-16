import React, { useEffect, useState } from 'react';
import styles from './TabelaFuncionarios.module.css';
import { Link } from 'react-router-dom';
import { deletarFuncionario } from './deletarFuncionario';
import MenuLateral from '../../layout/MenuLateral/MenuLateral';

function TabelaFuncionarios() {
  // Estado para armazenar a lista de funcionários
  const [funcionarios, setFuncionarios] = useState([]);
  // Estado para controlar o loading de remoção
  const [removeLoading, setRemoveLoading] = useState(false);
  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect para carregar os funcionários ao montar o componente
  useEffect(() => {
    setTimeout(() => {
      carregarFuncionarios();
    }, 300);
  }, []);

  // Função assíncrona para carregar a lista de funcionários da API
  async function carregarFuncionarios() {
    try {
      const resposta = await fetch('http://localhost:5000/funcionario', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resposta.ok) {
        throw new Error('Erro ao buscar funcionários');
      }
      const consulta = await resposta.json();
      setFuncionarios(consulta);
      setRemoveLoading(true);
    } catch (error) {
      console.log('erro ao buscar funcionários', error);
    }
  }

  // Função para deletar um funcionário
  const handleDelete = async (id) => {
    const sucesso = await deletarFuncionario(id);
    if (sucesso) {
      setFuncionarios(funcionarios.filter((funcionario) => funcionario.id !== id));
    }
  };

  // Função para atualizar o estado de pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrando os funcionários com base no termo de pesquisa (nome ou CPF)
  const filteredFuncionarios = funcionarios.filter((funcionario) =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funcionario.cpf.includes(searchTerm)
  );

  return (
    <div className="d-flex">
      {/* Componente de menu lateral */}
      <MenuLateral />
      <div className="flex-grow-1 p-3">
        <h2 className="text-center">Lista de Funcionários</h2>
        {/* Campo de pesquisa e botão ao lado direito */}
        <div className="d-flex mb-3 mx-auto" style={{ width: '40%', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Pesquisar Funcionário por Nome ou CPF"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control me-2"
            style={{ flex: '1' }}
          />
          <Link to="/cadastro_funcionario">
            <button className="btn btn-primary">Novo Funcionário</button>
          </Link>
        </div>
        {/* Mensagem de ausência de funcionários */}
        {removeLoading && filteredFuncionarios.length === 0 && (
          <h1 className="mt-3 mx-auto" style={{ width: '50%', textAlign: 'center' }}>Não há funcionários disponíveis</h1>
        )}
        <div className={styles.Funcionarios}>
          <table className={`${styles.TabelaFuncionarios} table-bordered mt-3`}>
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
              {/* Renderizando os funcionários filtrados */}
              {filteredFuncionarios.map((funcionario) => (
                <tr key={funcionario.id}>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.cpf}</td>
                  <td>{funcionario.telefone}</td>
                  <td>{funcionario.sexo}</td>
                  <td className="bg-light">
                    <Link className="btn btn-primary btn-sm" to={`/editar_funcionario/${funcionario.id}`}>Editar</Link>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(funcionario.id)}>Deletar</button>
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

export default TabelaFuncionarios;
