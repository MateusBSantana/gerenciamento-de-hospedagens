import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Nav, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './FormCadFuncionario.css';
import FormFuncionario from './FormFuncionario';

function FormCadFuncionario({ handleSubmit }) {
  const navigate = useNavigate(); // Inicializa o hook de navegação
  const [activeTab, setActiveTab] = useState('informacoes');
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    sexo: '',
    email: '',
    telefone: '',
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
    adicionais: {
      cargo: '',
      dataAdmissao: '',
      dataEmissaoCarteira: '',
      banco: '',
      agencia: '',
      conta: '',
      status: '',
      observacoes: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    e.preventDefault();
    if (activeTab === 'adicionais') {
      handleSubmit(formData);
      navigate('/Tabela_Funcionarios');// Redireciona para a página TabelaFuncionarios
    } else {
      if (activeTab === 'informacoes') {
        setActiveTab('endereco');
      } else if (activeTab === 'endereco') {
        setActiveTab('adicionais');
      }
    }
  };

  const handleCancel = () => {
    navigate('/Tabela_Funcionarios'); // Redireciona para a página TabelaFuncionarios
  };

  return (
    <div className="container mt-4">
      <h2>Novo Funcionário</h2>

      <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="informacoes">Informações do Funcionário</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="endereco">Endereço</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="adicionais">Adicionais</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <FormFuncionario
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

export default FormCadFuncionario;