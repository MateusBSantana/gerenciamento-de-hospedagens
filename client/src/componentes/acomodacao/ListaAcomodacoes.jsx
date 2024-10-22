// src/componentes/acomodacao/ListaAcomodacoes.jsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';

const ListaAcomodacoes = () => {
  const [acomodacoes, setAcomodacoes] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchAcomodacoes = async () => {
      try {
        const response = await api.get('/acomodacoes');
        setAcomodacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar acomodações:', error);
      }
    };

    fetchAcomodacoes();
  }, []);

  const acomFiltradas = acomodacoes.filter((acomodacao) =>
    acomodacao.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    acomodacao.numero.includes(filtro)
  );

  return (
    <div>
      <h2>Acomodações</h2>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Pesquise por número ou nome"
          onChange={(e) => setFiltro(e.target.value)}
        />
        <Button variant="primary">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Número</th>
            <th>Capacidade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {acomFiltradas.length > 0 ? (
            acomFiltradas.map((acomodacao) => (
              <tr key={acomodacao.id}>
                <td>{acomodacao.nome}</td>
                <td>{acomodacao.numero}</td>
                <td>{acomodacao.capacidade}</td>
                <td>{acomodacao.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">Nenhuma acomodação encontrada.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button variant="outline-primary" className="mt-3">+ Nova Acomodação</Button>
    </div>
  );
};

export default ListaAcomodacoes;
