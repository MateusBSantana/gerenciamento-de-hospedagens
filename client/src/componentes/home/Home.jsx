import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Badge } from 'react-bootstrap';
import { FaDoorOpen } from 'react-icons/fa'; // Ícone de porta
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
    <div className="container-fluid">
      <h1 className="text-center mb-4">Acomodações</h1>
      <div className="d-flex justify-content-center mb-4 flex-wrap">
        <Badge bg="success" className="p-3 text-light mx-2 mb-2">
          Disponível: {statusQuartos.disponivel}
        </Badge>
        <Badge bg="warning" className="p-3 text-light mx-2 mb-2">
          Reservado: {statusQuartos.reservado}
        </Badge>
        <Badge bg="danger" className="p-3 text-light mx-2 mb-2">
          Ocupado: {statusQuartos.ocupado}
        </Badge>
        <Badge bg="primary" className="p-3 text-light mx-2 mb-2">
          Limpeza: {statusQuartos.limpeza}
        </Badge>
        <Badge bg="secondary" className="p-3 text-light mx-2 mb-2">
          Bloqueado: {statusQuartos.bloqueado}
        </Badge>
      </div>

      <Row className="gy-4 justify-content-center custom-row">
        {acomodacoes.map((acomodacao) => (
          <Col key={acomodacao.id} xs={12} sm={6} md={3} className="d-flex justify-content-center custom-col">
            <Card className="card w-100 h-100">
              <Card.Body className="d-flex flex-column justify-content-between text-center">
                <Card.Title
                  className="card-title"
                  style={{
                    border: `2px solid ${getStatusStyles(acomodacao.status).borderColor}`,
                    backgroundColor: getStatusStyles(acomodacao.status).backgroundColor,
                    padding: '8px',
                    color: 'white',
                    fontSize: '1.1rem',
                  }}
                >
                  {acomodacao.nome}
                </Card.Title>
                <Button
                  className="card-button mt-auto"
                  style={{
                    backgroundColor: '#b0b0b0',
                    borderColor: '#808080',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    height: '40px',
                    fontSize: '0.9rem',
                    padding: '10px',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#007bff')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#b0b0b0')}
                >
                  <FaDoorOpen style={{ marginRight: '8px' }} /> Hospedar
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
