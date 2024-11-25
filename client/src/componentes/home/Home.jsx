import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Badge } from 'react-bootstrap';
import api from '../../services/api'; // A API para fazer a requisição
import './Home.css';  // Importe o arquivo CSS

const Home = () => {
  const [acomodacoes, setAcomodacoes] = useState([]);
  const [statusQuartos, setStatusQuartos] = useState({
    disponivel: 0,
    reservado: 0,
    ocupado: 0,
    limpeza: 0,
    bloqueado: 0,
  });

  useEffect(() => {
    // Função para buscar as acomodações da API
    const fetchAcomodacoes = async () => {
      try {
        const response = await api.get('/acomodacoes'); // Supondo que sua rota no backend seja '/acomodacoes'
        setAcomodacoes(response.data);

        // Contabilizar os status
        const disponiveis = response.data.filter((item) => item.status === 'Disponível').length;
        const reservados = response.data.filter((item) => item.status === 'Reservado').length;
        const ocupados = response.data.filter((item) => item.status === 'Ocupado').length;
        const limpeza = response.data.filter((item) => item.status === 'Limpeza').length;
        const bloqueado = response.data.filter((item) => item.status === 'Bloqueado').length;

        setStatusQuartos({ disponivel: disponiveis, reservado: reservados, ocupado: ocupados, limpeza, bloqueado });
      } catch (error) {
        console.error('Erro ao buscar acomodações:', error);
      }
    };

    fetchAcomodacoes();
  }, []);

  // Função para definir a cor da borda e fundo baseada no status
  const getStatusStyles = (status) => {
    if (status === 'Disponível') return { borderColor: 'green', backgroundColor: 'green' }; // Borda e fundo verde para disponível
    if (status === 'Reservado') return { borderColor: 'yellow', backgroundColor: 'yellow' }; // Borda e fundo amarelo para reservado
    if (status === 'Ocupado') return { borderColor: 'red', backgroundColor: 'red' }; // Borda e fundo vermelho para ocupado
    if (status === 'Limpeza') return { borderColor: 'blue', backgroundColor: 'blue' }; // Borda e fundo azul para limpeza
    if (status === 'Bloqueado') return { borderColor: 'gray', backgroundColor: 'gray' }; // Borda e fundo cinza para bloqueado
    return { borderColor: 'transparent', backgroundColor: 'transparent' }; // Sem borda e fundo transparente para outros status
  };

  return (
    <div>
      <h1>Quartos</h1>
      {/* Exibição dos contadores de status */}
      <div className="d-flex justify-content-between mb-4">
        <Badge bg="success" className="p-3">
          Disponível: {statusQuartos.disponivel}
        </Badge>
        <Badge bg="warning" className="p-3 text-dark">
          Reservado: {statusQuartos.reservado}
        </Badge>
        <Badge bg="danger" className="p-3">
          Ocupado: {statusQuartos.ocupado}
        </Badge>
        <Badge bg="primary" className="p-3">
          Limpeza: {statusQuartos.limpeza}
        </Badge>
        <Badge bg="secondary" className="p-3">
          Bloqueado: {statusQuartos.bloqueado}
        </Badge>
      </div>

      {/* Exibição das acomodações */}
      <Row>
        {acomodacoes.map((acomodacao) => (
          <Col key={acomodacao.id} md={3} className="mb-4"> {/* Altere o valor de md={3} para garantir 4 colunas */}
            <Card>
              <Card.Body className="text-center">
                <Card.Title
                  className="card-title"
                  style={{
                    border: `2px solid ${getStatusStyles(acomodacao.status).borderColor}`,
                    backgroundColor: getStatusStyles(acomodacao.status).backgroundColor,
                    padding: '10px',
                    color: 'white', // Texto em branco para contraste
                  }}
                >
                  {acomodacao.nome}
                </Card.Title>
                <Button className="card-button">Hospedar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
