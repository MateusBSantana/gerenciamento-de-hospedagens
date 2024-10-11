import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Nav, Form, Button } from 'react-bootstrap';
import FormFuncionario from '../componentes/Funcionarios/FormCadFuncionario/FormFuncionario';

function EditarFuncionario() {
  const { id } = useParams(); // Captura o ID do funcionário da URL
  const navigate = useNavigate(); // Para navegação
  const [activeTab, setActiveTab] = useState('informacoes'); // Controla as abas ativas
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar dados do funcionário pelo ID
    async function buscarFuncionario() {
      try {
        const resposta = await fetch(`http://localhost:5000/funcionario/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!resposta.ok) {
          throw new Error('Erro ao buscar funcionário');
        }

        const dadosFuncionario = await resposta.json();
        setFormData(dadosFuncionario); // Preenche os dados do funcionário no formulário
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar funcionário', error);
      }
    }

    buscarFuncionario();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Se estamos na aba 'adicionais', tentamos salvar os dados
    if (activeTab === 'adicionais') {
      try {
        const resposta = await fetch(`http://localhost:5000/funcionario/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Envia os dados atualizados
        });
  
        if (!resposta.ok) {
          throw new Error('Erro ao atualizar funcionário');
        }
  
        navigate('/Tabela_Funcionarios'); // Redireciona para a tabela de funcionários após salvar
      } catch (error) {
        console.error('Erro ao atualizar funcionário', error);
      }
    } else {
      // Muda para a próxima aba dependendo da aba atual
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

  if (loading) {
    return <p>Carregando...</p>; // Exibe uma mensagem de carregamento
  }
  
  return (
    <div className="container mt-4">
      <h2>Editando Funcionário</h2>

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
          onClick={handleCancel} // Chama handleCancel ao clicar
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          className="mt-2"
          type="submit"
          onClick={handleSubmit} // Chama handleSubmit ao clicar
        >
          {activeTab === 'adicionais' ? 'Salvar' : 'Continuar'}
        </Button>
      </div>
    </div>
  );
}

export default EditarFuncionario;
