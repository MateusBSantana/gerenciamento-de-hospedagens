import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Nav, Form, Button } from 'react-bootstrap';
import './FormCadFuncionario.css';

function FormCadFuncionario({ handleSubmit }) {
  const [activeTab, setActiveTab] = useState('informacoes');
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    sexo: '',
    email: '',
    telefone: '',
    observacao: '',
    endereco: {
      rua: '',
      numero: '',
      cidade: '',
      estado: '',
      cep: '',
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

  const submit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      cpf: '',
      rg: '',
      dataNascimento: '',
      sexo: '',
      email: '',
      telefone: '',
      observacao: '',
      endereco: {
        rua: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: '',
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
    setActiveTab('informacoes');
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
          <Tab.Pane eventKey="informacoes">
            <Form onSubmit={submit} className="border rounded p-3">
              <div className="w-75 mx-auto">
                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formNome" style={{ width: '200px' }}>Nome Completo:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formNome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    style={{ width: '400px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formCpf" style={{ width: '200px' }}>CPF:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formCpf"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                    style={{ width: '200px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formRg" style={{ width: '200px' }}>RG:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formRg"
                    name="rg"
                    value={formData.rg}
                    onChange={handleChange}
                    required
                    style={{ width: '150px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formDataNascimento" style={{ width: '200px' }}>Data de Nascimento:</Form.Label>
                  <Form.Control
                    type="date"
                    id="formDataNascimento"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    required
                    style={{ width: '200px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formSexo" style={{ width: '200px' }}>Sexo:</Form.Label>
                  <Form.Control
                    as="select"
                    id="formSexo"
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    required
                    style={{ width: '200px' }} 
                  >
                    <option value="">Por favor selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </Form.Control>
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formEmail" style={{ width: '200px' }}>E-mail:</Form.Label>
                  <Form.Control
                    type="email"
                    id="formEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: '400px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formTelefone" style={{ width: '200px' }}>Número de Telefone:</Form.Label>
                  <Form.Control
                    type="tel"
                    id="formTelefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    style={{ width: '200px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formObservacao" style={{ width: '200px' }}>Observação:</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="formObservacao"
                    name="observacao"
                    value={formData.observacao}
                    onChange={handleChange}
                    style={{ width: '400px' }} 
                  />
                </div>
              </div>
            </Form>
          </Tab.Pane>

          <Tab.Pane eventKey="endereco">
            <Form onSubmit={submit} className="border rounded p-3">
              <div className="w-75 mx-auto">
                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formRua" style={{ width: '200px' }}>CEP:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formRua"
                    name="endereco.rua"
                    value={formData.endereco.rua}
                    onChange={handleChange}
                    required
                    style={{ width: '500px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formNumero" style={{ width: '200px' }}>Estado:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formNumero"
                    name="endereco.numero"
                    value={formData.endereco.numero}
                    onChange={handleChange}
                    required
                    style={{ width: '500px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formCidade" style={{ width: '200px' }}>Cidade:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formCidade"
                    name="endereco.cidade"
                    value={formData.endereco.cidade}
                    onChange={handleChange}
                    required
                    style={{ width: '500px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formEstado" style={{ width: '200px' }}>Bairro:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formEstado"
                    name="endereco.estado"
                    value={formData.endereco.estado}
                    onChange={handleChange}
                    required
                    style={{ width: '500px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formCep" style={{ width: '200px' }}>Endereço:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formCep"
                    name="endereco.cep"
                    value={formData.endereco.cep}
                    onChange={handleChange}
                    required
                    style={{ width: '500px' }} 
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formCep" style={{ width: '200px' }}>Numero:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formCep"
                    name="endereco.cep"
                    value={formData.endereco.cep}
                    onChange={handleChange}
                    required
                    style={{ width: '500px' }} 
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formCep" style={{ width: '200px' }}>Complemento:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formCep"
                    name="endereco.cep"
                    value={formData.endereco.cep}
                    onChange={handleChange}
                    required
                    style={{ width: '500px' }} 
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formObservacao" style={{ width: '200px' }}>Observação:</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="formObservacao"
                    name="observacao"
                    value={formData.observacao}
                    onChange={handleChange}
                    style={{ width: '400px' }} 
                  />
                </div>
              </div>
            </Form>
          </Tab.Pane>

          <Tab.Pane eventKey="adicionais">
            <Form onSubmit={submit} className="border rounded p-3">
              <div className="w-75 mx-auto">
                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formCargo" style={{ width: '200px' }}>Cargo:</Form.Label>
                  <Form.Control
                    as="select"
                    id="formCargo"
                    name="adicionais.cargo"
                    value={formData.adicionais.cargo}
                    onChange={handleChange}
                    required
                    style={{ width: '200px' }} 
                    >
                    <option value="">Por favor selecione</option>
                    <option value="administrador">Administrador</option> 
                    <option value="recepcionista">Recepcionista</option>
                    <option value="recepcionista">Camareira</option>
                    </Form.Control>
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formDataAdmissao" style={{ width: '200px' }}>Data de Admissão:</Form.Label>
                  <Form.Control
                    type="date"
                    id="formDataAdmissao"
                    name="adicionais.dataAdmissao"
                    value={formData.adicionais.dataAdmissao}
                    onChange={handleChange}
                    required
                    style={{ width: '200px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formDataEmissaoCarteira" style={{ width: '200px' }}>Data de Emissão da Carteira:</Form.Label>
                  <Form.Control
                    type="date"
                    id="formDataEmissaoCarteira"
                    name="adicionais.dataEmissaoCarteira"
                    value={formData.adicionais.dataEmissaoCarteira}
                    onChange={handleChange}
                    required
                    style={{ width: '200px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formBanco" style={{ width: '200px' }}>Banco:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formBanco"
                    name="adicionais.banco"
                    value={formData.adicionais.banco}
                    onChange={handleChange}
                    required
                    style={{ width: '500px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formAgencia" style={{ width: '200px' }}>Agência:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formAgencia"
                    name="adicionais.agencia"
                    value={formData.adicionais.agencia}
                    onChange={handleChange}
                    required
                    style={{ width: '500px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formConta" style={{ width: '200px' }}>Conta:</Form.Label>
                  <Form.Control
                    type="text"
                    id="formConta"
                    name="adicionais.conta"
                    value={formData.adicionais.conta}
                    onChange={handleChange}
                    required
                    style={{ width: '500px' }} 
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formStatus" style={{ width: '200px' }}>Status:</Form.Label>
                  <Form.Control
                    as="select"
                    id="formStatus"
                    name="adicionais.status"
                    value={formData.adicionais.status}
                    onChange={handleChange}
                    required
                    style={{ width: '200px' }} 
                  >
                    <option value="">Por favor selecione</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </Form.Control>
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formObservacoes" style={{ width: '200px' }}>Observações:</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="formObservacoes"
                    name="adicionais.observacoes"
                    value={formData.adicionais.observacoes}
                    onChange={handleChange}
                    style={{ width: '500px' }} 
                  />
                </div>
              </div>
            </Form>
          </Tab.Pane>
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
