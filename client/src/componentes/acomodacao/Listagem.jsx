// src/componentes/acomodacao/Listagem.jsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Acomodacao.css';

const ListagemAcomodacoes = () => {
  const [acomodacoes, setAcomodacoes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/acomodacoes');
      setAcomodacoes(response.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/acomodacoes/${id}`);
    setAcomodacoes(acomodacoes.filter((acomodacao) => acomodacao.id !== id));
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col>
          <h2>Lista de Acomodações</h2>
        </Col>
        <Col className="text-end">
          <Link to="/cadastro_acomodacao">
            <Button variant="custom" className="btn-custom mb-3">
              Nova Acomodação
            </Button>
          </Link>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Capacidade</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {acomodacoes.map((acomodacao) => (
            <tr key={acomodacao.id}>
              <td>{acomodacao.nome}</td>
              <td>{acomodacao.capacidade}</td>
              <td>{acomodacao.tipo}</td>
              <td>
                <Link to={`/editar_acomodacao/${acomodacao.id}`} className="btn btn-warning">
                  Editar
                </Link>
                <Button variant="danger" className="btn ms-3" onClick={() => handleDelete(acomodacao.id)}>
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
