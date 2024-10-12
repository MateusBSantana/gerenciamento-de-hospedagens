import React, { useEffect, useState } from 'react';
import styles from './TabelaFuncionarios.module.css';
import { Link } from 'react-router-dom';
import { deletarFuncionario } from './deletarFuncionario';
import MenuLateral from '../../layout/MenuLateral/MenuLateral';

function TabelaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      carregarFuncionarios();
    }, 300);
  }, []);

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

  const handleDelete = async (id) => {
    const sucesso = await deletarFuncionario(id);
    if (sucesso) {
      setFuncionarios(funcionarios.filter((funcionario) => funcionario.id !== id));
    }
  };

  return (
    <div className="d-flex">
      <MenuLateral />
      <div className="flex-grow-1 p-3">
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
              {funcionarios.map((funcionario) => (
                <tr key={funcionario.id}>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.cpf}</td>
                  <td>{funcionario.telefone}</td>
                  <td>{funcionario.sexo}</td>
                  <td className="bg-light">
                    <Link className="btn btn-warning btn-sm" to={`/editar_funcionario/${funcionario.id}`}>Editar</Link>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(funcionario.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {removeLoading && funcionarios.length === 0 && <h1>Não há funcionários disponíveis</h1>}
          <Link to="/cadastro_funcionario">
            <button className="btn btn-primary mt-3 border border-start-1">Novo Funcionário</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TabelaFuncionarios;
