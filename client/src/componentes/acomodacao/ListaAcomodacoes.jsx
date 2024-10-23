// src/componentes/acomodacao/ListagemAcomodacoes.jsx
import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ListagemAcomodacoes = () => {
  const [acomodacoes, setAcomodacoes] = useState([]);
  const navigate = useNavigate();

  const fetchAcomodacoes = async () => {
    try {
      const response = await api.get('/acomodacoes');
      setAcomodacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar acomodações:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/acomodacoes/${id}`);
      setAcomodacoes(acomodacoes.filter((acomodacao) => acomodacao.id !== id)); // Atualiza a lista de acomodações
    } catch (error) {
      console.error('Erro ao deletar acomodação:', error);
    }
  };

  useEffect(() => {
    fetchAcomodacoes();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h2> Acomodações</h2>
          <Button
            variant="primary"
            onClick={() => navigate('/cadastro_acomodacao')}
          >
            Nova Acomodação
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Capacidade</th>
            <th>Tipo</th>
            <th>Observações</th>
            <th>Status</th>
            <th>Ações</th> {/* Coluna para os botões de ação */}
          </tr>
        </thead>
        <tbody>
          {acomodacoes.map((acomodacao) => (
            <tr key={acomodacao.id}>
              <td>{acomodacao.id}</td>
              <td>{acomodacao.nome}</td>
              <td>{acomodacao.capacidade}</td>
              <td>{acomodacao.tipo}</td>
              <td>{acomodacao.observacoes}</td>
              <td>{acomodacao.status}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => navigate(`/editar_acomodacao/${acomodacao.id}`)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(acomodacao.id)}
                >
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListagemAcomodacoes;
