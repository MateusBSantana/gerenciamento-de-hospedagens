import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Nav, Form, Button } from 'react-bootstrap';
import FormHospede from '../Hospedes/FormCadHospedes/FormHospedes';

function EditarHospede() {
  // Captura o ID do hóspede diretamente da URL
  const { id } = useParams();
  // Permite navegar para outras páginas do app
  const navigate = useNavigate();

  // Controla qual aba (tab) está ativa, começando pela aba de informações
  const [activeTab, setActiveTab] = useState('informacoes');

  // Armazena os dados do formulário, incluindo dados do hóspede e informações adicionais
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

  // Variável de estado para mostrar uma mensagem de "Carregando..." enquanto os dados são buscados
  const [loading, setLoading] = useState(true);

  // Função chamada ao carregar o componente. Busca os dados do hóspede usando o ID capturado.
  useEffect(() => {
    async function buscarHospede() {
      try {
        // Requisição GET para obter os dados do hóspede com o ID específico
        const resposta = await fetch(`http://localhost:5000/hospede/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Verifica se a resposta da requisição foi bem-sucedida
        if (!resposta.ok) throw new Error('Erro ao buscar hóspede');

        // Converte a resposta em JSON e armazena no estado para preencher o formulário
        const dadosHospede = await resposta.json();
        setFormData(dadosHospede);
        setLoading(false); // Define que os dados já foram carregados, ocultando o "Carregando..."
      } catch (error) {
        console.error('Erro ao buscar hóspede', error);
      }
    }
    buscarHospede();
  }, [id]); // A função será chamada sempre que o ID mudar

  // Função para atualizar os dados do formulário conforme o usuário preenche os campos
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Verifica se o campo faz parte do endereço e atualiza o valor específico no estado
    if (name.startsWith('endereco')) {
      setFormData((prevState) => ({
        ...prevState,
        endereco: {
          ...prevState.endereco,
          [name.split('.')[1]]: value,
        },
      }));
    }
    // Verifica se o campo faz parte das informações adicionais e atualiza o valor específico no estado
    else if (name.startsWith('adicionais')) {
      setFormData((prevState) => ({
        ...prevState,
        adicionais: {
          ...prevState.adicionais,
          [name.split('.')[1]]: value,
        },
      }));
    }
    // Atualiza os demais campos
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Função chamada ao enviar o formulário (clicar no botão "Salvar" ou "Continuar")
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Se o usuário estiver na aba "Adicionais", salva os dados no backend
    if (activeTab === 'adicionais') {
      try {
        // Requisição PUT para atualizar os dados do hóspede com o ID específico
        const resposta = await fetch(`http://localhost:5000/hospede/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Envia os dados do formulário como JSON
        });

        // Verifica se a resposta da requisição foi bem-sucedida
        if (!resposta.ok) throw new Error('Erro ao atualizar hóspede');

        // Redireciona para a página de listagem de hóspedes
        navigate('/Tabela_Hospedes');
      } catch (error) {
        console.error('Erro ao atualizar hóspede', error);
      }
    } else {
      // Avança para a próxima aba, dependendo da aba atual
      setActiveTab(activeTab === 'informacoes' ? 'endereco' : 'adicionais');
    }
  };

  // Função chamada ao clicar no botão "Cancelar", redireciona para a lista de hóspedes
  const handleCancel = () => {
    navigate('/Tabela_Hospedes');
  };

  // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) return <p>Carregando...</p>;

  return (
    <div className="d-flex">
      <div className="container mt-4">
        {/* Título do formulário de edição */}
        <h2 style={{ marginLeft: '50px' }}>Editando Hóspede</h2>
        
        {/* Tab.Container é usado para gerenciar as abas do formulário */}
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          {/* Navegação entre abas para acessar diferentes partes do formulário */}
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
  
          {/* Exibe o componente FormHospede para renderizar os campos do formulário */}
          <Tab.Content>
            <FormHospede formData={formData} handleChange={handleChange} />
          </Tab.Content>
        </Tab.Container>
  
        {/* Botões para cancelar ou continuar/salvar o formulário */}
        <div className="text-center mt-4">
          <Button variant="danger" className="mt-2 me-2" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="primary" className="mt-2" type="submit" onClick={handleSubmit}>
            {/* Alterna o texto do botão dependendo da aba ativa */}
            {activeTab === 'adicionais' ? 'Salvar' : 'Continuar'}
          </Button>
        </div>
      </div>
    </div>
  );
  
}

export default EditarHospede;
