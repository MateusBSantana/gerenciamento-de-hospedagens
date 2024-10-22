// src/componentes/acomodacao/Cadastro.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Importando o serviço da API
import Comodidades from './Comodidades'; // Importando o componente Comodidades

const CadastroAcomodacao = () => {
  const [formData, setFormData] = useState({
    nome: '',
    capacidade: '',
    tipo: '',
    observacoes: '',
    comodidades: {
      wifi: false,
      tv: false,
      arCondicionado: false,
      frigobar: false,
      banheirosAdaptados: false,
      sinalizacaoBraille: false,
      entradaAcessivel: false,
      estacionamentoAcessivel: false,
    }
  });

  const [activeTab, setActiveTab] = useState('acomodacao'); // Controle das abas
  const navigate = useNavigate();

  // Ajuste para separar campos comuns de comodidades
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    if (name in formData.comodidades) {
      // Atualizando comodidades
      setFormData((prevData) => ({
        ...prevData,
        comodidades: {
          ...prevData.comodidades,
          [name]: updatedValue
        }
      }));
    } else {
      // Atualizando os outros campos
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue
      }));
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setActiveTab('comodidades'); // Alterna para a aba de Comodidades
  };

  // Função atualizada para incluir logs no console
  const handleFinalizarCadastro = async (e) => {
    e.preventDefault();
    console.log("Dados a serem enviados:", formData); // Exibe os dados no console

    try {
      const response = await api.post('/acomodacoes', formData); // Salva a acomodação na API
      console.log("Resposta da API:", response.data); // Exibe a resposta no console
      navigate('/listagem_acomodacoes'); // Navega para a listagem de acomodações
    } catch (error) {
      console.error('Erro ao salvar a acomodação:', error); // Exibe o erro no console
    }
  };

  return (
    <Container className="mt-5">
      <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)} className="mb-3">
        <Tab eventKey="acomodacao" title="Nova Acomodação">
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
        </Tab>
        <Tab eventKey="comodidades" title="Comodidades">
          <Comodidades formData={formData} handleChange={handleChange} />
          <Button variant="success" className="mt-3" onClick={handleFinalizarCadastro}>
            Finalizar Cadastro
          </Button>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CadastroAcomodacao;
