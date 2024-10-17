import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Nav, Form, Button } from 'react-bootstrap';
import FormHospede from '../Hospedes/FormCadHospedes/FormHospedes';
import MenuLateral from '../layout/MenuLateral/MenuLateral';

function EditarHospede() {
  const { id } = useParams(); // Captura o ID do hóspede da URL
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
    // Função para buscar dados do hóspede pelo ID
    async function buscarHospede() {
      try {
        const resposta = await fetch(`http://localhost:5000/hospede/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!resposta.ok) {
          throw new Error('Erro ao buscar hóspede');
        }
        const dadosHospede = await resposta.json();
        setFormData(dadosHospede); // Preenche os dados do hóspede no formulário
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar hóspede', error);
      }
    }
    buscarHospede();
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
        const resposta = await fetch(`http://localhost:5000/hospede/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Envia os dados atualizados
        });

        if (!resposta.ok) {
          throw new Error('Erro ao atualizar hóspede');
        }

        navigate('/Tabela_Hospedes'); // Redireciona para a tabela de hóspedes após salvar
      } catch (error) {
        console.error('Erro ao atualizar hóspede', error);
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
    navigate('/Tabela_Hospedes'); // Redireciona para a página TabelaHospedes
  };

  if (loading) {
    return <p>Carregando...</p>; // Exibe uma mensagem de carregamento
  }

  return (
    <div className="d-flex">
      <MenuLateral />
      <div className="container mt-4">
        <div className="">
          <h2 style={{ marginLeft: '50px' }}>Editando Hóspede</h2>
        </div>
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
    </div>
  );
}

export default EditarHospede;
