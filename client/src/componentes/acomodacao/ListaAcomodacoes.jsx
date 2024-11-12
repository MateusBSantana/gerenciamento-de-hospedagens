import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './ListaAcomodacoes.css'; // Importa o CSS

const ListagemAcomodacoes = ({ textoBotao = "Editar", onSelectAcomodacao }) => {
  const [acomodacoes, setAcomodacoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
    // Verifica se a acomodação contém comodidades
    const comodidades = [];

    if (acomodacao.wifi) comodidades.push('Wi-Fi');
    if (acomodacao.tv) comodidades.push('TV');
    if (acomodacao.ar_condicionado) comodidades.push('Ar-condicionado');
    if (acomodacao.frigobar) comodidades.push('Frigobar');
    if (acomodacao.banheiros_adaptados) comodidades.push('Banheiros Adaptados');
    if (acomodacao.sinalizacao_em_braille) comodidades.push('Sinalização Braille');
    if (acomodacao.entrada_acessivel) comodidades.push('Entrada Acessível');
    if (acomodacao.estacionamento_acessivel) comodidades.push('Estacionamento Acessível');

    // Caso não tenha nenhuma comodidade marcada
    return comodidades.length > 0 ? comodidades.join(', ') : 'Sem comodidades';
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
            <th>Comodidades</th> {/* Nova coluna para as comodidades */}
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
                  {/* Exibe todas as comodidades associadas a cada acomodação */}
                  {getComodidades(acomodacao)}
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      if (textoBotao === 'Selecionar') {
                        onSelectAcomodacao(acomodacao); // Chama a função onSelectAcomodacao com a acomodação selecionada
                      } else if (textoBotao === 'Editar') {
                        navigate(`/editar_acomodacao/${acomodacao.id}`); // Navega para a página de edição de acomodação
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
    </Container>
  );
};

export default ListagemAcomodacoes;
