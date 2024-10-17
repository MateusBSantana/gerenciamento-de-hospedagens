import React from "react";
import { Form, Tab } from "react-bootstrap";

function FormHospede({ formData, handleChange, submit }) {
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
                Profissão:
              </Form.Label>
              <Form.Control
                type="text"
                id="formProfissao"
                name="Profissao"
                value={formData.Profissao}
                onChange={handleChange}
                required
                style={{ width: "400px" }}
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

          </div>
        </Form>
      </Tab.Pane>
    </>
  );
}

export default FormHospede;
