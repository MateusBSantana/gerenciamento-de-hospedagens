import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Nav, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './FormCadHospedes.css';
import FormHospede from './FormHospedes';

function FormCadHospede({ handleSubmit }) {
  const navigate = useNavigate(); // Navegação entre páginas
  const [activeTab, setActiveTab] = useState('informacoes'); // Aba ativa
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    sexo: '',
    Profissao: '',
    observacoes: '',
    endereco: {
      rua: '',
      numero: '',
      cidade: '',
      estado: '',
      cep: '',
      bairro: '',
      complemento: '',
      observacoes: '',
    },
      email: '',
      telefone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Captura o nome e valor do campo

    // Atualiza os dados do formulário com base no campo modificado
    if (name.startsWith('endereco')) {
      setFormData((prevState) => ({
        ...prevState,
        endereco: {
          ...prevState.endereco,
          [name.split('.')[1]]: value,
        },
      }));
    } else if (name.startsWith('adicionais')) {
      setFormData((prevState) => ({
        ...prevState,
        adicionais: {
          ...prevState.adicionais,
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão
    if (activeTab === 'adicionais') {
      handleSubmit(formData); // Envia os dados
      navigate('/tabela_hospedes'); // Navega para a tabela
    } else {
      // Muda a aba ativa
      if (activeTab === 'informacoes') {
        setActiveTab('endereco');
      } else if (activeTab === 'endereco') {
        setActiveTab('adicionais');
      }
    }
  };

  const handleCancel = () => {
    navigate('/tabela_hospedes'); // Cancela e redireciona
  };

  return (
    <div className="container mt-4 ">
      <h2 style={{ marginLeft: '50px' }}>Novo Hóspede</h2> {/* Título */}
      <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant="tabs"> {/* Navegação das abas */}
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
            formData={formData} // Dados do formulário
            handleChange={handleChange} // Função de alteração
          />
        </Tab.Content>
      </Tab.Container>

      <div className="text-center mt-4">
        <Button
          variant="danger" // Botão de cancelar
          className="mt-2 me-2"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="primary" // Botão de salvar ou continuar
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

export default FormCadHospede; // Exporta o componente
