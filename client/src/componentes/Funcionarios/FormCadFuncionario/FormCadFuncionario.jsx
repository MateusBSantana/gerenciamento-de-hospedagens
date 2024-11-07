import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Nav, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './FormCadFuncionario.css';
import FormFuncionario from './FormFuncionario';

function FormCadFuncionario({ handleSubmit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('informacoes');
  const [formData, setFormData] = useState({
    nome_funcionario: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    sexo: '',
    email: '',
    telefone: '',
    observacoes: '',
    endereco: {
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      numero: '',
      complemento: '',
      observacoesEndereco: '',
    },
    adicionais: {
      cargo: '',
      dataAdmissao: '',
      dataEmissaoCarteira: '',
      banco: '',
      agencia: '',
      conta: '',
      status: '',
      observacoesAdicionais: '',
    },
  });

 
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/funcionario/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        const data = await response.json();
  
        setFormData({
          nome_funcionario: data.nome_funcionario || '',
          cpf: data.cpf || '',
          rg: data.rg || '',
          dataNascimento: data.dataNascimento || '',
          sexo: data.sexo || '',
          email: data.email || '',
          telefone: data.telefone || '',
          observacoes: data.observacoes || '',
          endereco: {
            cep: data.endereco?.cep || '',
            estado: data.endereco?.estado || '',
            cidade: data.endereco?.cidade || '',
            bairro: data.endereco?.bairro || '',
            logradouro: data.endereco?.logradouro || '',
            numero: data.endereco?.numero || '',
            complemento: data.endereco?.complemento || '',
            observacoesEndereco: data.endereco?.observacoesEndereco || '',
          },
          adicionais: {
            cargo: data.adicionais?.cargo || '',
            dataAdmissao: data.adicionais?.dataAdmissao || '',
            dataEmissaoCarteira: data.adicionais?.dataEmissaoCarteira || '',
            banco: data.adicionais?.banco || '',
            agencia: data.adicionais?.agencia || '',
            conta: data.adicionais?.conta || '',
            status: data.adicionais?.status || '',
            observacoesAdicionais: data.adicionais?.observacoesAdicionais || '',
          },
        });
      } catch (error) {
        console.error('Erro ao carregar os dados', error);
      }
    }
  
    if (id) {
      fetchData();
    }
  }, [id]);
  

  
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
      navigate('/Tabela_Funcionarios');
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
    <div className="container mt-4 ">
      <div className="">
        <h2 style={{ marginLeft: '50px' }}>Novo Funcionário</h2>
      </div>
      <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="informacoes" className="p-1 fs-6">Informações do Funcionário</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="endereco" className="p-1 fs-6">Endereço</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="adicionais" className="p-1 fs-6">Adicionais</Nav.Link>
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
