// src/componentes/acomodacao/Comodidades.jsx
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Comodidades = ({ formData, handleChange }) => {
  return (
    <div>
      <h5>Confortos</h5>
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

      <h5 className="mt-4">Acessibilidades</h5>
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
            label="Sinalização em Braille"
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

      <Form.Group controlId="observacoesComodidades" className="mt-3">
        <Form.Label>Observações</Form.Label>
        <Form.Control
          as="textarea"
          name="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
        />
      </Form.Group>
    </div>
  );
};

export default Comodidades;
