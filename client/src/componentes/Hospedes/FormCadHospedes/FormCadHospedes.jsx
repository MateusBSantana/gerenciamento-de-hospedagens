import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { txtHospede } from '../../../services/txtHospede.js'; 
import './FormCadHospedes.css';
import FormHospede from './FormHospedes';

function FormCadHospede({ handleSubmit }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('informacoes');
  const [formData, setFormData] = useState({
      nome_hospede: '',
      cpf: '',
      rg: '',
      data_nascimento: '',
      sexo: '',
      profissao: '',
      observacoes: '',
      rua: '',
      numero: '',
      cidade: '',
      estado: '',
      cep: '',
      bairro: '',
      complemento: '',
      observacoes_endereco: '',  
      email: '',
      celular: '',  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Verifica se o campo alterado é o CEP e chama a função de busca de endereço
    if (name === 'cep' && value.length === 8) {
      handleBuscarCep(value);
    }
  };

  // Função para buscar o endereço pelo CEP
  const handleBuscarCep = async (cep) => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
            setFormData((prevData) => ({
                ...prevData,
                estado: data.uf || '',
                cidade: data.localidade || '',
                bairro: data.bairro || '',
                rua: data.logradouro || '',
                complemento: data.complemento || '',
            }));
        } else {
            console.error('CEP inválido');
        }
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
    }
  };
  
  const submit = (e) => {
    e.preventDefault();
    if (activeTab === 'adicionais') {
      handleSubmit(formData);
      txtHospede(formData); 
      navigate('/tabela_hospedes');
    } else {
      if (activeTab === 'informacoes') {
        setActiveTab('endereco');
      } else if (activeTab === 'endereco') {
        setActiveTab('adicionais');
      }
    }
  };

  const handleCancel = () => {
    navigate('/tabela_hospedes');
  };

  return (
    <div className="container mt-4">
      <h2 style={{ marginLeft: '50px' }}>Novo Hóspede</h2>
      <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="informacoes" className="p-1 fs-6">Informações do Hóspede</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="endereco" className="p-1 fs-6">Endereço</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="adicionais" className="p-1 fs-6">Adicionais</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <FormHospede
            formData={formData}
            handleChange={handleChange}
          />
        </Tab.Content>
      </Tab.Container>

      <div className="text-center mt-4">
        <Button
          variant="danger"
          className="mt-2 me-2"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          className="mt-2"
          type="submit"
          onClick={submit}
        >
          {activeTab === 'adicionais' ? 'Salvar' : 'Continuar'}
        </Button>
      </div>
    </div>
  );
}

export default FormCadHospede;
