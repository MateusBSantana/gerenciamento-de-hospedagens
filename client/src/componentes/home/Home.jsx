import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Badge } from 'react-bootstrap';
import { FaDoorOpen } from 'react-icons/fa'; // Importando o ícone de porta
import api from '../../services/api';
import './Home.css';

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
    const fetchAcomodacoes = async () => {
      try {
        const response = await api.get('/acomodacoes');
        setAcomodacoes(response.data);

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

  const getStatusStyles = (status) => {
    if (status === 'Disponível') return { borderColor: 'green', backgroundColor: 'green' };
    if (status === 'Reservado') return { borderColor: 'orange', backgroundColor: 'orange' };
    if (status === 'Ocupado') return { borderColor: 'red', backgroundColor: 'red' };
    if (status === 'Limpeza') return { borderColor: 'blue', backgroundColor: 'blue' };
    if (status === 'Bloqueado') return { borderColor: 'gray', backgroundColor: 'gray' };
    return { borderColor: 'transparent', backgroundColor: 'transparent' };
  };

  return (
    <div>
      <h1>Quartos</h1>
      <div className="d-flex justify-content-between mb-4">
        <Badge bg="success" className="p-3 text-light">
          Disponível: {statusQuartos.disponivel}
        </Badge>
        <Badge bg="warning" className="p-3 text-light">
          Reservado: {statusQuartos.reservado}
        </Badge>
        <Badge bg="danger" className="p-3 text-light">
          Ocupado: {statusQuartos.ocupado}
        </Badge>
        <Badge bg="primary" className="p-3 text-light">
          Limpeza: {statusQuartos.limpeza}
        </Badge>
        <Badge bg="secondary" className="p-3 text-light">
          Bloqueado: {statusQuartos.bloqueado}
        </Badge>
      </div>

      <Row>
        {acomodacoes.map((acomodacao) => (
          <Col key={acomodacao.id} md={3} className="mb-4">
            <Card className="card">
              <Card.Body className="d-flex flex-column justify-content-between text-center">
                <Card.Title
                  className="card-title"
                  style={{
                    border: `2px solid ${getStatusStyles(acomodacao.status).borderColor}`,
                    backgroundColor: getStatusStyles(acomodacao.status).backgroundColor,
                    padding: '10px',
                    color: 'white',
                  }}
                >
                  {acomodacao.nome}
                </Card.Title>
                <Button 
                  className="card-button mt-auto" 
                  style={{
                    backgroundColor: '#b0b0b0', // Cor de fundo cinza
                    borderColor: '#808080', // Cor da borda cinza
                    color: 'white', // Cor do texto branco
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s', // Transição suave para o hover
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#007bff'} // Altera o fundo para azul ao passar o mouse
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#b0b0b0'} // Retorna para cinza ao sair
                >
                  <FaDoorOpen style={{ marginRight: '8px' }} /> Hospedar {/* Ícone de porta */}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
