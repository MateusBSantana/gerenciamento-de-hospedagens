import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ListagemAcomodacoes = () => {
  const [acomodacoes, setAcomodacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o campo de busca
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
      fetchAcomodacoes(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao deletar acomodação:', error);
    }
  };

  useEffect(() => {
    fetchAcomodacoes();
  }, []);

  // Função para filtrar as acomodações com base no campo de pesquisa
  const filteredAcomodacoes = acomodacoes.filter((acomodacao) =>
    acomodacao.nome.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra pelo nome
    acomodacao.id.toString().includes(searchTerm) || // Filtra pelo ID
    acomodacao.tipo.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra pelo tipo
  );

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h2>Acomodações</h2>
          <Button
            variant="primary"
            onClick={() => navigate('/cadastro_acomodacao')}
          >
            Nova Acomodação
          </Button>
        </Col>
      </Row>

      {/* Campo de busca */}
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Pesquisar por nome, ID ou tipo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o valor da pesquisa
          />
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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAcomodacoes.map((acomodacao) => (
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
