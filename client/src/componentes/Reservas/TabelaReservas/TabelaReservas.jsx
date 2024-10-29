import React, { useEffect, useState } from 'react';
import styles from './TabelaReserva.module.css';
import { Link } from 'react-router-dom';

function TabelaReservas() {
  // Estado para armazenar a lista de reservas
  const [reservas, setReservas] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTimeout(() => {
      carregarReservas();
    }, 300);
  }, []);

  async function carregarReservas() {
    try {
      const resposta = await fetch('http://localhost:5000/reserva', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resposta.ok) {
        throw new Error('Erro ao buscar Reservas');
      }
      const consulta = await resposta.json();
      setReservas(consulta);
      setRemoveLoading(true);
    } catch (error) {
      console.log('erro ao buscar Reservas', error);
    }
  }

  // Atualizando a pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrando reservas
  const filteredReservas = reservas.filter((reserva) =>
    reserva.id.toString().includes(searchTerm) // Pesquisa pelo ID da reserva
  );

  return (
    <div className="d-flex">
      <div className="flex-grow-1 p-3">
        <h2 className="text-center">Lista de Reservas</h2>

        <div className="d-flex mb-3 mx-auto" style={{ width: '40%', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Pesquisar Reserva pelo Número"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control me-2"
            style={{ flex: '1' }}
          />
          <Link to="/cadastro_reserva">
            <button className="btn btn-primary">Nova Reserva</button>
          </Link>
        </div>

        {removeLoading && filteredReservas.length === 0 && (
          <h1 className="mt-3 mx-auto" style={{ width: '50%', textAlign: 'center' }}>
            Não há reservas disponíveis
          </h1>
        )}

        <div className={styles.Reservas}>
          <table className={`${styles.TabelaReservas} table-bordered mt-3`}>
            <thead>
              <tr>
                <th>Número da Reserva</th>
                <th>Hóspede</th>
                <th>Data Entrada</th>
                <th>Data Saída</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.hospede}</td>
                  <td>{reserva.dataEntrada}</td>
                  <td>{reserva.dataSaida}</td>
                  <td>{reserva.situacao}</td>
                  <td className="bg-light">
                    <Link className="btn btn-primary btn-sm" to={`/cadastro_reserva/${reserva.id}`}>
                      Editar
                    </Link>
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

export default TabelaReservas;
