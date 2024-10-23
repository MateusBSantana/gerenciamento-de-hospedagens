import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
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
  const { id } = useParams(); // Pega o ID da URL

  // Função para buscar os dados da acomodação pelo ID (para edição)
  const fetchAcomodacaoById = async (id) => {
    try {
      const response = await api.get(`/acomodacoes/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Erro ao buscar acomodação:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAcomodacaoById(id); // Se houver ID, busca a acomodação para editar
    }
  }, [id]);

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

    try {
      if (id) {
        // Atualiza a acomodação existente
        await api.put(`/acomodacoes/${id}`, formData);
      } else {
        // Cria uma nova acomodação
        await api.post('/acomodacoes', formData);
      }
      navigate('/listagem_acomodacoes'); // Redireciona para a listagem de acomodações
    } catch (error) {
      console.error('Erro ao salvar a acomodação:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h2>{id ? 'Editar Acomodação' : 'Nova Acomodação'}</h2>
        </Col>
        <Col className="text-end">
          <Button variant="secondary" onClick={() => navigate('/listagem_acomodacoes')}>
            Voltar
          </Button>
        </Col>
      </Row>
      <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)} className="mb-3">
        <Tab eventKey="acomodacao" title="Acomodação">
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
            {id ? 'Salvar Alterações' : 'Finalizar Cadastro'}
          </Button>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CadastroAcomodacao;
