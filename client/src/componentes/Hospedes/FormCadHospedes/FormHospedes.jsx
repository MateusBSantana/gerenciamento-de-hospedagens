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
    </>
  );
}

export default FormHospede;
