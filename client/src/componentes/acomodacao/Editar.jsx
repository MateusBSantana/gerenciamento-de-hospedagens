// src/components/Acomodacao/Editar.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const EditarAcomodacao = () => {
  const { id } = useParams(); // Captura o ID da acomodação
  const [formData, setFormData] = useState({
    nome: '',
    capacidade: '',
    tipo: '',
    observacoes: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcomodacao = async () => {
      try {
        const response = await api.get(`/acomodacoes/${id}`);
        if (response.data) {
          setFormData(response.data);
        } else {
          console.error('Acomodação não encontrada');
        }
      } catch (error) {
        console.error('Erro ao buscar acomodação:', error);
      }
    };

    fetchAcomodacao();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/acomodacoes/${id}`, formData);
      alert('Acomodação atualizada com sucesso!');
      navigate('/listagem_acomodacoes'); // Redireciona para a lista
    } catch (error) {
      console.error('Erro ao atualizar acomodação:', error);
      alert('Erro ao atualizar acomodação. Tente novamente.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Editar Acomodação</h2>
        </Col>
        <Col className="text-end"> {/* Alinhando o botão à direita */}
          <Button 
            variant="secondary" 
            onClick={() => navigate('/listagem_acomodacoes')}
          >
            Voltar
          </Button>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nome">
          <Form.Label>Nome da Acomodação</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="capacidade">
          <Form.Label>Capacidade</Form.Label>
          <Form.Control
            type="number"
            name="capacidade"
            value={formData.capacidade}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="tipo">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="observacoes">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            as="textarea"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Salvar Alterações
        </Button>
      </Form>
    </Container>
  );
};

export default EditarAcomodacao;
