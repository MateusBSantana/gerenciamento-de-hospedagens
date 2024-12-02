import { useState } from "react";
import { Form, Tab } from "react-bootstrap";

function FormHospede({ formData, handleChange, submit }) {
  const [errors, setErrors] = useState({});

  // Valida campos individuais
  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "cpf") {
      if (!/^\d{11}$/.test(value)) {
        errorMsg = "O CPF deve conter exatamente 11 dígitos.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  // Manipula o evento de perda de foco (onBlur)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  return (
    <>
      <Tab.Pane eventKey="informacoes">
        <Form
          onSubmit={submit}
          className="border rounded pt-3"
          style={{ textAlign: "left" }}
        >
          <div className="mx-auto">
            {/* Nome Completo */}
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
                name="nome_hospede"
                value={formData.nome_hospede}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                required
                style={{ width: "400px" }}
              />
            </div>

            {/* CPF */}
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
                onBlur={handleBlur} // Valida ao perder o foco
                isInvalid={!!errors.cpf} // Destaca o campo com erro
                placeholder="Digite seu CPF"
                maxLength={11}
                required
                style={{ width: "200px" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cpf}
              </Form.Control.Feedback>
            </div>

            {/* RG */}
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

            {/* Data de Nascimento */}
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
                name="data_nascimento"
                value={
                  formData.data_nascimento
                    ? formData.data_nascimento.split("T")[0]
                    : ""
                }
                onChange={handleChange}
                required
                style={{ width: "200px" }}
              />
            </div>

            {/* Sexo */}
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

            {/* Profissão */}
            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formProfissao"
                style={{ width: "160px" }}
              >
                Profissão:
              </Form.Label>
              <Form.Control
                type="text"
                id="formProfissao"
                name="profissao"
                value={formData.profissao}
                onChange={handleChange}
                required
                style={{ width: "400px" }}
              />
            </div>

            {/* Observações */}
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
            {/* Endereço - CEP */}
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
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                required
                style={{ width: "180px" }}
              />
            </div>

            {/* Endereço - Estado */}
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
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                style={{ width: "250px" }}
              />
            </div>

            {/* Endereço - Cidade */}
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
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
                style={{ width: "250px" }}
              />
            </div>

            {/* Endereço - Bairro */}
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
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                required
                style={{ width: "250px" }}
              />
            </div>

            {/* Endereço - Rua */}
            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formRua"
                style={{ width: "160px" }}
              >
                Logradouro:
              </Form.Label>
              <Form.Control
                type="text"
                id="formRua"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                required
                style={{ width: "350px" }}
              />
            </div>

            {/* Endereço - Número */}
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
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
                style={{ width: "100px" }}
              />
            </div>

            {/* Endereço - Complemento */}
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
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
            </div>

            {/* Endereço - Observações */}
            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formObservacoes_endereco"
                style={{ width: "160px" }}
              >
                Observações:
              </Form.Label>
              <Form.Control
                as="textarea"
                id="formObservacoes_endereco"
                name="observacoes_endereco"
                value={formData.observacoes_endereco}
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
            {/* Email */}
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

            {/* celular */}
            <div className="mb-3 d-flex align-items-center">
              <Form.Label
                className="me-2 text-end"
                htmlFor="formCelular"
                style={{ width: "160px" }}
              >
                Número do Celular:
              </Form.Label>
              <Form.Control
                type="tel"
                id="formCelular"
                name="celular"
                value={formData.celular}
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
