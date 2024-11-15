import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './ListaAcomodacoes.css'; // Importa o CSS

const ListagemAcomodacoes = ({ textoBotao = "Editar", onSelectAcomodacao }) => {
  const [acomodacoes, setAcomodacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAcomodacao, setSelectedAcomodacao] = useState(null); // Adicionando estado para acomodação selecionada
  const navigate = useNavigate();
   
  // Função para buscar as acomodações
  const fetchAcomodacoes = async () => {
    try {
      const response = await api.get('/acomodacoes');
      console.log('Resposta da API:', response.data); // Verificando o retorno da API
      const validAcomodacoes = response.data.filter(Boolean); // Remove nulos
      setAcomodacoes(validAcomodacoes);
    } catch (error) {
      console.error('Erro ao buscar acomodações:', error);
    }
  };

  // Hook que carrega as acomodações quando o componente é montado
  useEffect(() => {
    fetchAcomodacoes();
  }, []);

  // Função para filtrar as acomodações conforme o termo de pesquisa
  const filteredAcomodacoes = acomodacoes.filter((acomodacao) => {
    return (
      acomodacao &&
      (acomodacao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acomodacao.id.toString().includes(searchTerm) ||
        acomodacao.tipo.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Função para listar todas as comodidades possíveis de uma acomodação
  const getComodidades = (acomodacao) => {
    const comodidades = [];

    if (acomodacao.wifi) comodidades.push('Wi-Fi');
    if (acomodacao.tv) comodidades.push('TV');
    if (acomodacao.ar_condicionado) comodidades.push('Ar-condicionado');
    if (acomodacao.frigobar) comodidades.push('Frigobar');
    if (acomodacao.banheiros_adaptados) comodidades.push('Banheiros Adaptados');
    if (acomodacao.sinalizacao_em_braille) comodidades.push('Sinalização Braille');
    if (acomodacao.entrada_acessivel) comodidades.push('Entrada Acessível');
    if (acomodacao.estacionamento_acessivel) comodidades.push('Estacionamento Acessível');

    return comodidades.length > 0 ? comodidades.join(', ') : 'Sem comodidades';
  };

  // Função para criar os checkboxes no formulário de edição
  const renderComodidadesCheckboxes = () => {
    return (
      <div>
        <Form.Check 
          type="checkbox"
          label="Wi-Fi"
          checked={selectedAcomodacao?.wifi || false}
          onChange={() => handleComodidadeChange('wifi')}
        />
        <Form.Check 
          type="checkbox"
          label="TV"
          checked={selectedAcomodacao?.tv || false}
          onChange={() => handleComodidadeChange('tv')}
        />
        <Form.Check 
          type="checkbox"
          label="Ar Condicionado"
          checked={selectedAcomodacao?.ar_condicionado || false}
          onChange={() => handleComodidadeChange('ar_condicionado')}
        />
        <Form.Check 
          type="checkbox"
          label="Frigobar"
          checked={selectedAcomodacao?.frigobar || false}
          onChange={() => handleComodidadeChange('frigobar')}
        />
        <Form.Check 
          type="checkbox"
          label="Banheiros Adaptados"
          checked={selectedAcomodacao?.banheiros_adaptados || false}
          onChange={() => handleComodidadeChange('banheiros_adaptados')}
        />
        <Form.Check 
          type="checkbox"
          label="Sinalização Braille"
          checked={selectedAcomodacao?.sinalizacao_em_braille || false}
          onChange={() => handleComodidadeChange('sinalizacao_em_braille')}
        />
        <Form.Check 
          type="checkbox"
          label="Entrada Acessível"
          checked={selectedAcomodacao?.entrada_acessivel || false}
          onChange={() => handleComodidadeChange('entrada_acessivel')}
        />
        <Form.Check 
          type="checkbox"
          label="Estacionamento Acessível"
          checked={selectedAcomodacao?.estacionamento_acessivel || false}
          onChange={() => handleComodidadeChange('estacionamento_acessivel')}
        />
      </div>
    );
  };

  // Função para lidar com a mudança de estado dos checkboxes durante a edição
  const handleComodidadeChange = (comodidade) => {
    setSelectedAcomodacao((prevAcomodacao) => ({
      ...prevAcomodacao,
      [comodidade]: !prevAcomodacao[comodidade], // Inverte o valor da comodidade
    }));
  };

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

      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Pesquisar por nome, ID ou tipo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Capacidade</th>
            <th>Tipo</th>
            <th>Observações</th>
            <th>Status</th>
            <th>Comodidades</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAcomodacoes.length > 0 ? 
            filteredAcomodacoes.map((acomodacao) => (
              <tr key={acomodacao.id}>
                <td>{acomodacao.id}</td>
                <td>{acomodacao.nome}</td>
                <td>{acomodacao.capacidade}</td>
                <td>{acomodacao.tipo}</td>
                <td>{acomodacao.observacoes}</td>
                <td>{acomodacao.status}</td>
                <td>
                  {getComodidades(acomodacao)}
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      if (textoBotao === 'Selecionar') {
                        onSelectAcomodacao(acomodacao);
                      } else if (textoBotao === 'Editar') {
                        setSelectedAcomodacao(acomodacao); // Definir a acomodação selecionada para edição
                        navigate(`/editar_acomodacao/${acomodacao.id}`);
                      }
                    }}
                    className="me-2"
                  >
                    {textoBotao}
                  </Button>
                </td>
              </tr>
            ))
           : (
            <tr>
              <td colSpan="8" className="text-center">
                Nenhuma acomodação encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Exibe os checkboxes para edição, caso uma acomodação tenha sido selecionada */}
      {selectedAcomodacao && (
        <div>
          <h3>Editar Comodidades</h3>
          {renderComodidadesCheckboxes()}
        </div>
      )}
    </Container>
  );
};

export default ListagemAcomodacoes;
