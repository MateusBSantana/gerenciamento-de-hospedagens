import React, { useEffect, useState } from 'react';
import styles from './TabelaHospede.module.css';
import { Link, Navigate } from 'react-router-dom';



function TabelaHospede({ exibirAcoes = true, textoBotao = "Editar", onSelectHospede }) {  // Recebe a prop exibirAcoes
  const [hospedes, setHospedes] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hospedeId, setHospedeId] = useState(null);
  const [hospedeNome, setHospedeNome] = useState('');
  const [mostrarTabelaHospedes, setMostrarTabelaHospedes] = useState(false);





  useEffect(() => {
    setTimeout(() => {
      carregarHospedes();
    }, 300);
  }, []);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredHospedes = hospedes.filter((hospede) =>
    hospede.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospede.cpf.includes(searchTerm)
  );

  return (
    <>
      <div className="d-flex">
        <div className="flex-grow-1 p-3">
          <h2 className="text-center">Lista de Hóspedes</h2>

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

          {removeLoading && filteredHospedes.length === 0 && (
            <h1 className="mt-3 mx-auto" style={{ width: '50%', textAlign: 'center' }}>
              Não há hóspedes disponíveis
            </h1>
          )}

          <div className={styles.Hospedes}>
            <table className={`${styles.TabelaHospedes} table-bordered mt-3`}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Sexo</th>
                  {exibirAcoes && <th>Ações</th>}
                </tr>
              </thead>
              <tbody>
                {filteredHospedes.map((hospede) => (
                  <tr key={hospede.id}>
                    <td>{hospede.nome}</td>
                    <td>{hospede.cpf}</td>
                    <td>{hospede.telefone}</td>
                    <td>{hospede.sexo}</td>
                    {exibirAcoes && (
                      <td className="bg-light">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            if (textoBotao === 'Hospedar') {
                              onSelectHospede(hospede); // Passe os dados do hóspede selecionado
                            } else if (textoBotao === 'Editar') {
                              Navigate(`/editar_hospede/${hospede.id}`);
                            }
                          }}
                        >
                          {textoBotao}
                        </button>
                      </td>
                    )}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabelaHospede;
