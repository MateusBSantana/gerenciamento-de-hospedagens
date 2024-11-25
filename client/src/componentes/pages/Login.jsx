import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col, Spinner } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({ login: "", senha: "" });
  const [errors, setErrors] = useState({ login: "", senha: "" });
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Valida campos individuais
  const validateField = (name, value) => {
    let errorMsg = "";
    if (!/^\d{11}$/.test(value)) {
      errorMsg = "O campo deve conter exatamente 11 dígitos (CPF).";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  // Valida o formulário
  const validateForm = () => {
    const { login, senha } = formData;
    return (
      login === senha &&
      /^\d{11}$/.test(login) &&
      !errors.login &&
      !errors.senha
    );
  };

  // Manipula mudanças nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  // Função para efetuar login
  async function efetuarLogin() {
    setIsLoading(true);
    console.log('teste')
    try {
      const resposta = await fetch("http://localhost:5000/logar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf: formData.login }), // Envia o login como CPF
      });

      if (!resposta.ok) {
        const errorData = await resposta.json();
        throw new Error(errorData.message || "Erro ao efetuar login");
      }
      console.log(resposta);
      // Supondo que a resposta contenha o nome do usuário
      const data = await resposta.json();

      // Verifique a resposta da API
      console.log(data); // Isso vai mostrar o que foi retornado da API

      if (data && data.nome_funcionario) {
        // Armazena o nome do usuário no localStorage corretamente
        localStorage.setItem("userName", data.nome_funcionario); // Usa o nome real retornado pela API
        localStorage.setItem("userCPF", formData.login); // Salva o CPF do usuário
      } else {
        console.error("Nome do usuário não encontrado na resposta da API.");
      }

      // Login bem-sucedido
      setAuthError("");
      console.log("Login bem-sucedido com CPF:", formData.login);
      window.location.href = "http://localhost:3000"; // Redireciona após login
    } catch (error) {
      console.log("Erro ao efetuar login:", error);
      setAuthError("CPF ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  }

  // Manipula o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      efetuarLogin();
    } else {
      setAuthError("Login e senha devem ser válidos.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col xs={12} md={6} className="mx-auto">
          <h3 className="text-center mb-4">Login</h3>

          {authError && <Alert variant="danger">{authError}</Alert>}

          <Form onSubmit={handleSubmit} className="border p-4 shadow rounded">
            {/* Campo Login (CPF) */}
            <Form.Group className="mb-3" controlId="formLogin">
              <Form.Label>CPF (Login)</Form.Label>
              <Form.Control
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
                isInvalid={!!errors.login}
                placeholder="Digite seu CPF"
                maxLength={11}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>
            </Form.Group>

            {/* Campo Senha (CPF) */}
            <Form.Group className="mb-3" controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                isInvalid={!!errors.senha}
                placeholder="Digite sua senha"
                maxLength={11}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.senha}</Form.Control.Feedback>
            </Form.Group>

            {/* Botão de envio */}
            <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Entrar"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
