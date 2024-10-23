// src/componentes/acomodacao/Cadastro.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Importando o serviço da API
import Comodidades from './Comodidades'; // Importando o componente Comodidades

const CadastroAcomodacao = () => {
  const [formData, setFormData] = useState({
    id: 0, // Inicializando ID como 0, mas não será exibido no formulário
    nome: '',
    capacidade: '',
    tipo: '',
    observacoes: '',
    status: 'disponivel', // Campo de status
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

  // Função para buscar os dados de acomodações
  const fetchAcomodacoes = async () => {
    try {
      const response = await api.get('/acomodacoes'); // Fazendo a requisição para obter as acomodações
      const acomModacoes = response.data;

      // Encontrando o maior ID existente
      const maxId = acomModacoes.length > 0 
        ? Math.max(...acomModacoes.map(ac => ac.id)) 
        : 0;

      setFormData((prevData) => ({
        ...prevData,
        id: maxId + 1 // Define o ID como maior ID + 1, mas não será exibido no formulário
      }));
    } catch (error) {
      console.error('Erro ao buscar acomodações:', error);
    }
  };

  useEffect(() => {
    fetchAcomodacoes(); // Chama a função ao carregar o componente
  }, []);

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

            {/* Novo campo de status */}
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="disponivel">Disponível</option>
                <option value="reservado">Reservado</option>
              </Form.Control>
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
