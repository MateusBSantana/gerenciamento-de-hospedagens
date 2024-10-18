// src/componentes/acomodacao/Cadastro.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Importando o serviço da API

const CadastroAcomodacao = () => {
  const [formData, setFormData] = useState({
    nome: '',
    capacidade: '',
    tipo: '',
    observacoes: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    
    try {
      await api.post('/acomodacoes', formData); // Salva a acomodação na API
      navigate('/comodidades'); // Redireciona para a página de comodidades
    } catch (error) {
      console.error('Erro ao salvar a acomodação:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col>
          <h2>Cadastrar Acomodação</h2>
        </Col>
        <Col className="text-end">
          <Button variant="secondary" className="ms-2" onClick={() => navigate('/listagem_acomodacoes')}>
            Voltar
          </Button>
        </Col>
      </Row>

      <Form onSubmit={handleContinue}>
        <Form.Group controlId="nome">
          <Form.Label>Nome da Acomodação</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="capacidade">
          <Form.Label>Capacidade</Form.Label>
          <Form.Control
            type="number"
            name="capacidade"
            value={formData.capacidade}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="tipo">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
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
          Continuar
        </Button>
      </Form>
    </Container>
  );
};

export default CadastroAcomodacao;
