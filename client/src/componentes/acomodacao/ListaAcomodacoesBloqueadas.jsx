import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Button } from 'react-bootstrap';

function ListaAcomodacoesBloqueadas() {
  const [acomodacoesBloqueadas, setAcomodacoesBloqueadas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar acomodações bloqueadas
  const fetchAcomodacoesBloqueadas = async () => {
    try {
      const response = await fetch('http://localhost:5000/reservas/bloqueadas'); // Endpoint do backend
      if (!response.ok) {
        throw new Error('Erro ao buscar acomodações bloqueadas');
      }
      const data = await response.json();
      setAcomodacoesBloqueadas(data);
    } catch (error) {
      console.error('Erro ao buscar acomodações bloqueadas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para desbloquear uma acomodação
  const handleDesbloquear = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:5000/reservas/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ novoStatus: 'desbloqueada' }), // Campo conforme esperado pelo backend
      });

      if (!resposta.ok) {
        const errorMessage = await resposta.text();
        throw new Error(`Erro ao atualizar status da reserva ${id}: ${errorMessage}`);
      }

      console.log(`Status da reserva ${id} atualizado para "desbloqueada" com sucesso.`);
      // Atualiza a lista de acomodações bloqueadas
      await fetchAcomodacoesBloqueadas();
    } catch (error) {
      console.error(`Erro ao atualizar status da reserva ${id}:`, error);
    }
  };

  // Carregar acomodações bloqueadas ao montar o componente
  useEffect(() => {
    fetchAcomodacoesBloqueadas();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Acomodações Bloqueadas</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID do Bloqueio</th>
              <th>Nome da Acomodação</th>
              <th>Responsável</th>
              <th>Data Início do Bloqueio</th>
              <th>Data Fim do Bloqueio</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {acomodacoesBloqueadas.length > 0 ? (
              acomodacoesBloqueadas.map((item, index) => (
                <tr key={index}>
                  <td>{item.id_reserva}</td> {/* ID do Bloqueio */}
                  <td>{item.nome_acomodacao}</td>
                  <td>{item.nome_hospede}</td> {/* Agora é Responsável */}
                  <td>{new Date(item.data_checkin).toLocaleDateString()}</td>
                  <td>{new Date(item.data_checkout).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDesbloquear(item.id_reserva)} // Passa o ID da reserva
                    >
                      Desbloquear
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">Nenhuma acomodação bloqueada encontrada.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ListaAcomodacoesBloqueadas;
