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
  const [acomodacoes, setAcomodacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcomodacoesComStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/acomodacoes');
        if (!response.ok) {
          throw new Error('Erro ao buscar acomodações');
        }

        const acomodacoesData = await response.json();
        console.log('Dados das acomodações:', acomodacoesData);

        const dataAtual = new Date().toLocaleDateString('en-CA');

        const acomodacoesComStatus = await Promise.all(
          acomodacoesData.map(async (acomodacao) => {
            try {
              const reservaResponse = await fetch(
                `http://localhost:5000/status/${acomodacao.id}?data=${dataAtual}`
              );

              if (reservaResponse.status === 404) {
                console.log(`Acomodação ${acomodacao.id} sem reservas. Status: disponível`);
                return { ...acomodacao, status: 'disponível', nomeHospede: '-', dataCheckin: '-', dataCheckout: '-' };
              }

              if (!reservaResponse.ok) {
                throw new Error(`Erro ao buscar reservas para acomodação ${acomodacao.id}`);
              }

              const reservaData = await reservaResponse.json();
              console.log(`Dados da reserva para acomodação ${acomodacao.id}:`, reservaData);

              const status = reservaData?.status_reserva || 'disponível';
              const nomeHospede = reservaData?.nome_hospede || 'Sem hóspede';
              const dataCheckin = reservaData?.data_checkin ? formatDateToDash(reservaData.data_checkin) : '-';
              const dataCheckout = reservaData?.data_checkout ? formatDateToDash(reservaData.data_checkout) : '-';

              return { 
                ...acomodacao, 
                status, 
                nomeHospede, 
                dataCheckin, 
                dataCheckout 
              };
            } catch (error) {
              console.error(`Erro na acomodação ${acomodacao.id}:`, error);
              return { ...acomodacao, status: 'indefinido', nomeHospede: '-', dataCheckin: '-', dataCheckout: '-' };
            }
          })
        );

        console.log('Acomodações com status atualizado:', acomodacoesComStatus);
        setAcomodacoes(acomodacoesComStatus);
      } catch (error) {
        console.error('Erro ao buscar status das acomodações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcomodacoesComStatus();
  }, []);

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
    <div
      className="container-fluid mt-3"
      style={{
        maxWidth: '95%',
      }}
    >
      <h2 className="text-center mb-4">Acomodações Cadastradas</h2>
      <div
        className="custom-scroll-container"
        style={{
          maxHeight: '80vh',
          overflowY: 'auto',
          paddingRight: '15px',
        }}
      >
        <div className="row g-4">
          {acomodacoes.map((acomodacao) => (
            <div className="col-md-3" key={acomodacao.id}>
              <div className="card h-100" style={getCardStyle(acomodacao.status)}>
                <div className="card-body">
                  <h5 className="card-title">{acomodacao.nome}</h5>
                  {(acomodacao.status.toLowerCase() === 'reservado' || acomodacao.status.toLowerCase() === 'hospedado') && (
                    <>
                      <p className="card-text">Hóspede: {acomodacao.nomeHospede}</p>
                      <p className="card-text">Check-in: {acomodacao.dataCheckin}</p>
                      <p className="card-text">Check-out: {acomodacao.dataCheckout}</p>
                    </>
                  )}
                  <p className="card-text">
                    Status: <span className="badge bg-light text-dark">{acomodacao.status}</span>
                  </p>
                  <button 
                    className="btn btn-outline-dark mt-2 w-100" 
                    onClick={() => alert(`Ação para acomodação ${acomodacao.nome}`)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
