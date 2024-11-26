import React, { useEffect, useState } from 'react';
import styles from './TabelaReserva.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alertas from '../../layout/Alertas';

function TabelaReservas() {
  const [reservas, setReservas] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Estado para configurar as mensagens de alerta
  const [alertProps, setAlertProps] = useState({
    show: false,
    message: "",
    variant: "danger",
  });

  // Função para exibir alertas com mensagem e estilo
  const showAlert = (message, variant) => {
    setAlertProps({ show: true, message, variant });
    // Oculta o alerta automaticamente após 5 segundos
    setTimeout(() => setAlertProps((prev) => ({ ...prev, show: false })), 5000);
  };

  // Captura o alerta passado pelo navigate, apenas na montagem inicial
  useEffect(() => {
    const alertData = location.state?.alert;
    if (alertData) {
      showAlert(alertData.message, alertData.type);
      navigate(location.pathname, { replace: true }); // Limpa o estado após exibir o alerta
    }
  }, [location, navigate]);

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
      setReservas(consulta);
      console.log(consulta)
      setRemoveLoading(true);
    } catch (error) {
      console.log('Erro ao buscar Reservas', error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusAction = async (id, statusAtual) => {
    // Determina o novo status baseado no atual
    let novoStatus;
    if (statusAtual === 'reservado') {
      novoStatus = 'cancelada';
    } else if (statusAtual === 'hospedado') {
      novoStatus = 'finalizada';
    } else {
      return; // Caso nenhum dos estados seja aplicável, não faz nada
    }

    try {
      const resposta = await fetch(`http://localhost:5000/reservas/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ novoStatus }),
      });

      if (!resposta.ok) {
        throw new Error(`Erro ao atualizar status da reserva ${id}`);
      }

      // Atualize a lista de reservas após a alteração
      carregarReservas();
    } catch (error) {
      console.error(`Erro ao atualizar status da reserva ${id}:`, error);
    }
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
    {/* Alerta exibido para o usuário caso haja algum erro ou sucesso */}
    <Alertas
        show={alertProps.show}
        variant={alertProps.variant}
        message={alertProps.message}
        onClose={() => setAlertProps((prev) => ({ ...prev, show: false }))}
      />
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
                    <Link
                      className="btn btn-primary btn-sm me-2"
                      to={`/cadastro_reserva/${reserva.id_reserva}`}
                    >
                      {reserva.status_reserva === 'cancelada' || reserva.status_reserva === 'finalizada'
                        ? 'Visualizar Reserva'
                        : 'Editar'}
                    </Link>
                    {reserva.status_reserva === 'reservado' && (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleStatusAction(reserva.id_reserva, reserva.status_reserva)}
                      >
                        Cancelar Reserva
                      </button>
                    )}
                    {reserva.status_reserva === 'hospedado' && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleStatusAction(reserva.id_reserva, reserva.status_reserva)}
                      >
                        Finalizar Reserva
                      </button>
                    )}
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
