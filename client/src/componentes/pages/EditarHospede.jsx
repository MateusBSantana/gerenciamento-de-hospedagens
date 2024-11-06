import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Nav, Button } from 'react-bootstrap';
import FormHospede from '../Hospedes/FormCadHospedes/FormHospedes';

function EditarHospede() {
  const { id } = useParams(); // Captura o ID do hóspede da URL
  const navigate = useNavigate(); // Para navegação
  const [activeTab, setActiveTab] = useState('informacoes'); // Controla as abas ativas
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
  const [loading, setLoading] = useState(true); // Para mostrar o status de carregamento

  useEffect(() => {
    // Função para buscar dados do hóspede pelo ID
    async function buscarHospede() {
      try {
        const resposta = await fetch(`http://localhost:5000/hospedes/${id}`, {
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
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:5000/hospedes/${id}`, {
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
  };

  const handleCancel = () => {
    navigate('/Tabela_Hospedes'); // Redireciona para a página TabelaHóspedes
  };

  /* 
  if (loading) {
    return <p>Carregando...</p>; // Exibe uma mensagem de carregamento
  }
  */

  return (
    <div className="container mt-4">
      <h2>Editar Hóspede</h2>

      <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="informacoes">Informações do Hóspede</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="endereco">Endereço</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <FormHospede
            formData={formData} // Passa os dados do formulário para o componente
            handleChange={handleChange} // Função para manipular mudanças
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
          onClick={handleSubmit} // Chama handleSubmit ao clicar em "Salvar"
        >
          {activeTab === 'endereco' ? 'Salvar' : 'Continuar'}
        </Button>
      </div>
    </div>
  );
}

export default EditarHospede;
