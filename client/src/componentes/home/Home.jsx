import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Função para formatar datas no formato dd-MM-yyyy
function formatDateToDash(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const Home = () => {
  const [acomodacoes, setAcomodacoes] = useState([]); // Estado para armazenar as acomodações
  const [loading, setLoading] = useState(true); // Estado para exibir o indicador de carregamento
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar a exibição do modal de confirmação
  const [selectedReserva, setSelectedReserva] = useState(null); // Estado para armazenar a reserva selecionada
  const [newStatus, setNewStatus] = useState(''); // Estado para armazenar o novo status da reserva

  // Função para buscar acomodações e seus respectivos status
  const fetchAcomodacoesComStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/acomodacoes');
      if (!response.ok) {
        throw new Error('Erro ao buscar acomodações');
      }
  
      const acomodacoesData = await response.json(); // Dados recebidos do backend
      console.log('Dados das acomodações:', acomodacoesData);
  
      const dataAtual = new Date().toLocaleDateString('en-CA'); // Data atual no formato ISO
  
      // Atualizando os status das acomodações com base nas reservas
      const acomodacoesComStatus = await Promise.all(
        acomodacoesData.map(async (acomodacao) => {
          try {
            const reservaResponse = await fetch(
              `http://localhost:5000/status/${acomodacao.id}?data=${dataAtual}`
            );
  
            if (reservaResponse.status === 404) {
              // Caso não haja reservas para a acomodação
              console.log(`Acomodação ${acomodacao.id} sem reservas. Status: disponível`);
              return { ...acomodacao, status: 'disponível', nomeHospede: '-', dataCheckin: '-', dataCheckout: '-', idReserva: null };
            }
  
            if (!reservaResponse.ok) {
              throw new Error(`Erro ao buscar reservas para acomodação ${acomodacao.id}`);
            }
  
            const reservaData = await reservaResponse.json();
            console.log(`Dados da reserva para acomodação ${acomodacao.id}:`, reservaData);
  
            const status = reservaData?.status_reserva?.toLowerCase() || 'disponível';
  
            // Filtrar apenas os status permitidos
            if (!['reservado', 'hospedado', 'bloqueado'].includes(status)) {
              return { ...acomodacao, status: 'disponível', nomeHospede: '-', dataCheckin: '-', dataCheckout: '-', idReserva: null };
            }
  
            const nomeHospede = reservaData?.nome_hospede || 'Sem hóspede';
            const dataCheckin = reservaData?.data_checkin ? formatDateToDash(reservaData.data_checkin) : '-';
            const dataCheckout = reservaData?.data_checkout ? formatDateToDash(reservaData.data_checkout) : '-';
            const idReserva = reservaData?.id_reserva || null;
  
            return {
              ...acomodacao,
              status,
              nomeHospede,
              dataCheckin,
              dataCheckout,
              idReserva,
            };
          } catch (error) {
            console.error(`Erro na acomodação ${acomodacao.id}:`, error);
            return { ...acomodacao, status: 'indefinido', nomeHospede: '-', dataCheckin: '-', dataCheckout: '-', idReserva: null };
          }
        })
      );
  
      console.log('Acomodações com status atualizado:', acomodacoesComStatus);
      setAcomodacoes(acomodacoesComStatus); // Atualiza o estado com os dados das acomodações
    } catch (error) {
      console.error('Erro ao buscar status das acomodações:', error);
    } finally {
      setLoading(false); // Define o carregamento como concluído
    }
  };
  

  // Carrega os dados ao montar o componente
  useEffect(() => {
    fetchAcomodacoesComStatus();
  }, []);

  // Função para atualizar o status da reserva
  const handleStatusAction = async () => {
    if (!selectedReserva || !newStatus) return;

    try {
      const resposta = await fetch(`http://localhost:5000/reservas/${selectedReserva}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ novoStatus: newStatus }),
      });

      if (!resposta.ok) {
        throw new Error(`Erro ao atualizar status da reserva ${selectedReserva}`);
      }

      console.log(`Reserva ${selectedReserva} atualizada para o status: ${newStatus}`);
      setShowConfirmation(false);
      fetchAcomodacoesComStatus(); // Atualiza os dados das acomodações
    } catch (error) {
      console.error(`Erro ao atualizar status da reserva ${selectedReserva}:`, error);
    }
  };

  // Abre o modal de confirmação
  const openConfirmationModal = (idReserva, novoStatus) => {
    setSelectedReserva(idReserva);
    setNewStatus(novoStatus);
    setShowConfirmation(true);
  };

  // Estilos dos cards com base no status
  const getCardStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'reservado':
        return { backgroundColor: '#ADD8E6', color: '#000' }; // Azul claro
      case 'hospedado':
        return { backgroundColor: '#0000FF', color: '#FFF' }; // Azul escuro
      case 'bloqueado':
        return { backgroundColor: '#FF0000', color: '#FFF' }; // Vermelho
      default:
        return { backgroundColor: '#90EE90', color: '#000' }; // Verde (Disponível)
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Carregando...</div>;
  }

  return (
    <div className="container-fluid mt-3" style={{ maxWidth: '95%' }}>
      <h2 className="text-center mb-4">Acomodações Cadastradas</h2>
      <div className="custom-scroll-container" style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '15px' }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
          {acomodacoes.map((acomodacao) => (
            <div className="col" key={acomodacao.id}>
              <div className="card h-100" style={getCardStyle(acomodacao.status)}>
                <div className="card-body">
                  <h5 className="card-title">{acomodacao.nome}</h5>
                  {acomodacao.status.toLowerCase() === 'disponível' ? (
                    <>
                      <p className="card-text">Capacidade: {acomodacao.capacidade} pessoas</p>
                      <p className="card-text">Comodidades:</p>
                      <ul>
                        {acomodacao.wifi === 1 && <li>Wi-Fi</li>}
                        {acomodacao.tv === 1 && <li>TV</li>}
                        {acomodacao.arCondicionado === 1 && <li>Ar Condicionado</li>}
                        {acomodacao.frigobar === 1 && <li>Frigobar</li>}
                        {acomodacao.banheirosAdaptados === 1 && <li>Banheiros Adaptados</li>}
                        {acomodacao.sinalizacaoBraille === 1 && <li>Sinalização em Braille</li>}
                        {acomodacao.entradaAcessivel === 1 && <li>Entrada Acessível</li>}
                        {acomodacao.estacionamentoAcessivel === 1 && <li>Estacionamento Acessível</li>}
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="card-text">Hóspede: {acomodacao.nomeHospede}</p>
                      <p className="card-text">Check-in: {acomodacao.dataCheckin}</p>
                      <p className="card-text">Check-out: {acomodacao.dataCheckout}</p>
                      {acomodacao.idReserva && (
                        <p className="card-text">ID da Reserva: {acomodacao.idReserva}</p>
                      )}
                    </>
                  )}
                  <p className="card-text">
                    Status: <span className="badge bg-light text-dark">{acomodacao.status}</span>
                  </p>
                  <button
                    className="btn btn-primary mt-2 w-100"
                    onClick={() => {
                      if (acomodacao.status.toLowerCase() === 'disponível') {
                        window.location.href = '/cadastro_reserva';
                      } else if (acomodacao.idReserva) {
                        window.location.href = `/cadastro_reserva/${acomodacao.idReserva}`;
                      } else {
                        alert(`ID da reserva não encontrado para a acomodação ${acomodacao.nome}`);
                      }
                    }}
                  >
                    {acomodacao.status.toLowerCase() === 'disponível' ? 'Nova Reserva' : 'Ver Detalhes'}
                  </button>
                  {(acomodacao.status.toLowerCase() === 'reservado' || acomodacao.status.toLowerCase() === 'hospedado') && (
                    <button
                      className="btn btn-primary mt-2 w-100"
                      onClick={() =>
                        openConfirmationModal(
                          acomodacao.idReserva,
                          acomodacao.status.toLowerCase() === 'reservado' ? 'hospedado' : 'finalizada'
                        )
                      }
                    >
                      {acomodacao.status.toLowerCase() === 'reservado' ? 'Hospedar' : 'Finalizar Reserva'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmation && (
        <div
          className="position-fixed top-50 start-50 translate-middle bg-light border rounded shadow-lg p-4 w-50"
          style={{ zIndex: 1060 }}
        >
          <h5 className="text-center mb-3">
            Deseja realmente {newStatus === 'hospedado' ? 'hospedar' : 'finalizar'} esta reserva?
          </h5>
          <div className="text-center">
            <button className="btn btn-secondary me-3" onClick={() => setShowConfirmation(false)}>
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={handleStatusAction}>
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
