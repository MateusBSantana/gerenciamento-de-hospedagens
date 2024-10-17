import React from "react";
import { Form, Tab } from "react-bootstrap";

function FormFuncionario({ formData, handleChange, submit }) {
  return (
    <>
      <Tab.Pane eventKey="informacoes">
        <Form
          onSubmit={submit}
          className="border rounded pt-3"
          style={{ textAlign: "left" }}
        >
          <div className="mx-auto">
            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formNome"
                style={{ width: "160px" }}
              >
                Nome Completo:
              </Form.Label>
              <Form.Control
                type="text"
                id="formNome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                style={{ width: "400px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formCpf"
                style={{ width: "160px" }}
              >
                CPF:
              </Form.Label>
              <Form.Control
                type="text"
                id="formCpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
                style={{ width: "200px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formRg"
                style={{ width: "160px" }}
              >
                RG:
              </Form.Label>
              <Form.Control
                type="text"
                id="formRg"
                name="rg"
                value={formData.rg}
                onChange={handleChange}
                required
                style={{ width: "150px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formDataNascimento"
                style={{ width: "160px" }}
              >
                Data de Nascimento:
              </Form.Label>
              <Form.Control
                type="date"
                id="formDataNascimento"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
                style={{ width: "200px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formSexo"
                style={{ width: "160px" }}
              >
                Sexo:
              </Form.Label>
              <Form.Control
                as="select"
                id="formSexo"
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
                required
                style={{ width: "160px" }}
              >
                <option value="">Por favor selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </Form.Control>
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formEmail"
                style={{ width: "160px" }}
              >
                E-mail:
              </Form.Label>
              <Form.Control
                type="email"
                id="formEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "400px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formTelefone"
                style={{ width: "160px" }}
              >
                Número de Telefone:
              </Form.Label>
              <Form.Control
                type="tel"
                id="formTelefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                style={{ width: "200px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formObservacoes"
                style={{ width: "160px" }}
              >
                Observações:
              </Form.Label>
              <Form.Control
                as="textarea"
                id="formObservacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                style={{ width: "400px" }}
              />
            </div>
          </div>
        </Form>
      </Tab.Pane>

      <Tab.Pane eventKey="endereco">
        <Form onSubmit={submit} className="border rounded p-3">
          <div className="mx-auto">
            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formCep"
                style={{ width: "160px" }}
              >
                CEP:
              </Form.Label>
              <Form.Control
                type="text"
                id="formCep"
                name="endereco.cep"
                value={formData.endereco.cep}
                onChange={handleChange}
                required
                style={{ width: "180px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formEstado"
                style={{ width: "160px" }}
              >
                Estado:
              </Form.Label>
              <Form.Control
                type="text"
                id="formEstado"
                name="endereco.estado"
                value={formData.endereco.estado}
                onChange={handleChange}
                required
                style={{ width: "250px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formCidade"
                style={{ width: "160px" }}
              >
                Cidade:
              </Form.Label>
              <Form.Control
                type="text"
                id="formCidade"
                name="endereco.cidade"
                value={formData.endereco.cidade}
                onChange={handleChange}
                required
                style={{ width: "250px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formBairro"
                style={{ width: "160px" }}
              >
                Bairro:
              </Form.Label>
              <Form.Control
                type="text"
                id="formBairro"
                name="endereco.bairro"
                value={formData.endereco.bairro}
                onChange={handleChange}
                required
                style={{ width: "250px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formRua"
                style={{ width: "160px" }}
              >
                Endereço:
              </Form.Label>
              <Form.Control
                type="text"
                id="formRua"
                name="endereco.rua"
                value={formData.endereco.rua}
                onChange={handleChange}
                required
                style={{ width: "350px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formNumero"
                style={{ width: "160px" }}
              >
                Número:
              </Form.Label>
              <Form.Control
                type="text"
                id="formNumero"
                name="endereco.numero"
                value={formData.endereco.numero}
                onChange={handleChange}
                required
                style={{ width: "100px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formComplemento"
                style={{ width: "160px" }}
              >
                Complemento:
              </Form.Label>
              <Form.Control
                type="text"
                id="formComplemento"
                name="endereco.complemento"
                value={formData.endereco.complemento}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formObservacaoendereco"
                style={{ width: "160px" }}
              >
                Observações:
              </Form.Label>
              <Form.Control
                as="textarea"
                id="formObservacaoendereco"
                name="endereco.observacoes"
                value={formData.endereco.observacoes}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
            </div>
          </div>
        </Form>
      </Tab.Pane>

          <Tab.Pane eventKey="adicionais">
            <Form onSubmit={submit} className="border rounded p-3">
              <div className="mx-auto">
                <div className="mb-3 d-flex align-items-center">
                  <Form.Label className="me-2 text-end" htmlFor="formCargo" style={{ width: '160px' }}>Cargo:</Form.Label>
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
              <Form.Label
                className="me-2 text-end"
                htmlFor="formDataAdmissao"
                style={{ width: "160px" }}
              >
                Data de Admissão:
              </Form.Label>
              <Form.Control
                type="date"
                id="formDataAdmissao"
                name="adicionais.dataAdmissao"
                value={formData.adicionais.dataAdmissao}
                onChange={handleChange}
                required
                style={{ width: "200px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formDataEmissaoCarteira"
                style={{ width: "160px" }}
              >
                Data de Emissão da Carteira:
              </Form.Label>
              <Form.Control
                type="date"
                id="formDataEmissaoCarteira"
                name="adicionais.dataEmissaoCarteira"
                value={formData.adicionais.dataEmissaoCarteira}
                onChange={handleChange}
                required
                style={{ width: "200px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formBanco"
                style={{ width: "160px" }}
              >
                Banco:
              </Form.Label>
              <Form.Control
                type="text"
                id="formBanco"
                name="adicionais.banco"
                value={formData.adicionais.banco}
                onChange={handleChange}
                required
                style={{ width: "250px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formAgencia"
                style={{ width: "160px" }}
              >
                Agência:
              </Form.Label>
              <Form.Control
                type="text"
                id="formAgencia"
                name="adicionais.agencia"
                value={formData.adicionais.agencia}
                onChange={handleChange}
                required
                style={{ width: "150px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formConta"
                style={{ width: "160px" }}
              >
                Conta:
              </Form.Label>
              <Form.Control
                type="text"
                id="formConta"
                name="adicionais.conta"
                value={formData.adicionais.conta}
                onChange={handleChange}
                required
                style={{ width: "150px" }}
              />
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formStatus"
                style={{ width: "160px" }}
              >
                Status:
              </Form.Label>
              <Form.Control
                as="select"
                id="formStatus"
                name="adicionais.status"
                value={formData.adicionais.status}
                onChange={handleChange}
                required
                style={{ width: "200px" }}
              >
                <option value="">Por favor selecione</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </Form.Control>
            </div>

            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formObservacoes"
                style={{ width: "160px" }}
              >
                Observações:
              </Form.Label>
              <Form.Control
                as="textarea"
                id="formObservacoes"
                name="adicionais.observacoes"
                value={formData.adicionais.observacoes}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
            </div>
          </div>
        </Form>
      </Tab.Pane>
    </>
  );
}

export default FormFuncionario;
