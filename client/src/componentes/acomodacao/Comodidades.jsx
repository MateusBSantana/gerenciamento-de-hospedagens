// src/componentes/acomodacao/Comodidades.jsx
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Comodidades = () => {
  const [comodidades, setComodidades] = useState({
    wifi: false,
    arCondicionado: false,
    tv: false,
    frigobar: false,
    banheiroAdaptado: false,
    entradaAcessivel: false,
    braille: false,
    estacionamentoAcessivel: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setComodidades((prevComodidades) => ({
      ...prevComodidades,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode salvar as comodidades em localStorage ou enviar para o servidor
    localStorage.setItem('comodidades', JSON.stringify(comodidades));
    alert('Comodidades cadastradas com sucesso!');
    navigate('/listagem_acomodacoes'); // Redireciona para a lista de acomodações
  };

  return (
    <Container className="mt-5">
      <h2>Selecionar Comodidades e Acessibilidades</h2>
      <Form onSubmit={handleSubmit}>
        <h5>Confortos</h5>
        <Form.Check
          type="checkbox"
          label="Wi-Fi"
          name="wifi"
          checked={comodidades.wifi}
          onChange={handleChange}
        />
        <Form.Check
          type="checkbox"
          label="Ar-condicionado"
          name="arCondicionado"
          checked={comodidades.arCondicionado}
          onChange={handleChange}
        />
        <Form.Check
          type="checkbox"
          label="TV"
          name="tv"
          checked={comodidades.tv}
          onChange={handleChange}
        />
        <Form.Check
          type="checkbox"
          label="Frigobar"
          name="frigobar"
          checked={comodidades.frigobar}
          onChange={handleChange}
        />

        <h5>Acessibilidades</h5>
        <Form.Check
          type="checkbox"
          label="Banheiros Adaptados"
          name="banheiroAdaptado"
          checked={comodidades.banheiroAdaptado}
          onChange={handleChange}
        />
        <Form.Check
          type="checkbox"
          label="Entrada Acessível"
          name="entradaAcessivel"
          checked={comodidades.entradaAcessivel}
          onChange={handleChange}
        />
        <Form.Check
          type="checkbox"
          label="Sinalização em Braille"
          name="braille"
          checked={comodidades.braille}
          onChange={handleChange}
        />
        <Form.Check
          type="checkbox"
          label="Estacionamento Acessível"
          name="estacionamentoAcessivel"
          checked={comodidades.estacionamentoAcessivel}
          onChange={handleChange}
        />

        <Button variant="primary" type="submit">
          Salvar Comodidades
        </Button>
      </Form>
    </Container>
  );
};

export default Comodidades;
