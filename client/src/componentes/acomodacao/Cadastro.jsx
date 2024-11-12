import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api'; // Serviço de API
import './Cadastro.css'; // Estilo CSS
import { v4 as uuidv4 } from 'uuid'; // Função para gerar IDs únicos

const CadastroAcomodacao = () => {
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    capacidade: '',
    tipo: '',
    observacoes: '',
    status: 'disponivel',
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

  const [activeTab, setActiveTab] = useState('acomodacao'); // Controle de abas
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL, se existir

  // Função para buscar a acomodação no backend pelo ID
  const fetchAcomodacaoById = async (id) => {
    try {
      const response = await api.get(`/acomodacoes/${id}`);
      const data = response.data;

      setFormData({
        id: data.id,
        nome: data.nome,
        capacidade: data.capacidade,
        tipo: data.tipo,
        observacoes: data.observacoes,
        status: data.status,
        comodidades: { ...data.comodidades }
      });
    } catch (error) {
      console.error('Erro ao buscar acomodação:', error);
    }
  };

  // Ao carregar o componente ou quando o ID mudar, buscar a acomodação para editar
  useEffect(() => {
    if (id) {
      fetchAcomodacaoById(id); // Buscar os dados se ID estiver presente na URL
    }
  }, [id]);

  // Função para atualizar o estado ao mudar os campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    if (name in formData.comodidades) {
      setFormData((prevData) => ({
        ...prevData,
        comodidades: {
          ...prevData.comodidades,
          [name]: updatedValue,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    }
  };

  // Função para continuar para a aba de comodidades
  const handleContinue = (e) => {
    e.preventDefault();

    // Validação dos campos obrigatórios antes de continuar
    if (!formData.nome || !formData.capacidade || !formData.tipo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setActiveTab('comodidades'); // Mudar para a aba de comodidades
  };

  // Função para finalizar o cadastro ou edição
  const handleFinalizarCadastro = async (e) => {
    e.preventDefault();

    // Validação para garantir que os campos obrigatórios estejam preenchidos
    if (!formData.nome || !formData.capacidade || !formData.tipo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      if (id) {
        // Atualiza acomodação existente
        await api.put(`/acomodacoes/${id}`, formData);
      } else {
        // Cria uma nova acomodação com um novo ID
        const newAcomodacao = { ...formData, id: uuidv4() }; // Gerar um ID único para nova acomodação
        await api.post('/acomodacoes', newAcomodacao);
      }
      // Redireciona para a lista de acomodações
      navigate('/listagem_acomodacoes');
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
          <div className="form-container">
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
          </div>
        </Tab>

        <Tab eventKey="comodidades" title="Comodidades">
          <div>
            <h5>Comodidades</h5>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Wi-Fi"
                  name="wifi"
                  checked={formData.comodidades.wifi}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="TV"
                  name="tv"
                  checked={formData.comodidades.tv}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Ar-condicionado"
                  name="arCondicionado"
                  checked={formData.comodidades.arCondicionado}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Frigobar"
                  name="frigobar"
                  checked={formData.comodidades.frigobar}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <h5 className="mt-4">Acessibilidade</h5>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Banheiros Adaptados"
                  name="banheirosAdaptados"
                  checked={formData.comodidades.banheirosAdaptados}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Sinalização Braille"
                  name="sinalizacaoBraille"
                  checked={formData.comodidades.sinalizacaoBraille}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Entrada Acessível"
                  name="entradaAcessivel"
                  checked={formData.comodidades.entradaAcessivel}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Estacionamento Acessível"
                  name="estacionamentoAcessivel"
                  checked={formData.comodidades.estacionamentoAcessivel}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Button variant="primary" onClick={handleFinalizarCadastro} className="mt-3">
              Finalizar Cadastro
            </Button>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CadastroAcomodacao;
