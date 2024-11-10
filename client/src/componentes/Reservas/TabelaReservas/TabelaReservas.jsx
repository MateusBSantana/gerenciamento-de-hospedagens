import React, { useEffect, useState } from 'react';
import styles from './TabelaReserva.module.css';
import { Link } from 'react-router-dom';

function TabelaReservas() {
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
      const resposta = await fetch('http://localhost:5000/reservas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resposta.ok) {
        throw new Error('Erro ao buscar Reservas');
      }
      const consulta = await resposta.json();
      console.log("Dados recebidos da API:", consulta);
      setReservas(consulta);
      setRemoveLoading(true);
    } catch (error) {
      console.log('erro ao buscar Reservas', error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReservas = reservas.filter((reserva) =>
    (reserva.id_reserva && reserva.id_reserva.toString().includes(searchTerm)) ||
    (reserva.cpf && reserva.cpf.includes(searchTerm))
  );

  function formatDateToDash(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="d-flex">
      <div className="flex-grow-1 p-">
        <h2 className="text-center">Lista de Reservas</h2>

        <div className="d-flex mb-3 mx-auto" style={{ width: '40%', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Pesquisar Reserva pelo Número ou CPF do Hóspede"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control me-2"
            style={{ flex: '1' }}
          />
          <Link to="/cadastro_reserva">
            <button className="btn btn-primary">Nova Reserva</button>
          </Link>
        </div>

        {removeLoading && reservas.length > 0 && filteredReservas.length === 0 && (
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
                <th>CPF</th>
                <th>Data Entrada</th>
                <th>Data Saída</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservas.map((reserva) => (
                <tr key={reserva.id_reserva}>
                  <td>{reserva.id_reserva}</td>
                  <td>{reserva.nome_hospede}</td>
                  <td>{reserva.cpf}</td>
                  <td>{formatDateToDash(reserva.data_checkin)}</td>
                  <td>{formatDateToDash(reserva.data_checkout)}</td>
                  <td>{reserva.status_reserva}</td>
                  <td className="bg-light">
                    <Link className="btn btn-primary btn-sm" to={`/cadastro_reserva/${reserva.id_reserva}`}>
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
