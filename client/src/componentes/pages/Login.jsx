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
    console.log("Tentando efetuar login...");
    try {
      const resposta = await fetch("http://localhost:5000/logar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf: formData.login }), // Envia o login como CPF
      });

      console.log("Status da resposta:", resposta.status); // Loga o status HTTP da resposta
      console.log("Headers da resposta:", resposta.headers); // Loga os headers da resposta

      const data = await resposta.json();
      console.log("Resposta do backend:", data); // Log detalhado da resposta do backend

      // Verifica se o backend retornou sucesso
      if (resposta.ok) {
        if (data && data.nome_funcionario) {
          // Salva os dados no localStorage
          console.log("Dados do funcionário recebidos:", data);
          localStorage.setItem("userId", data.id_funcionario);
          localStorage.setItem("userName", data.nome_funcionario);
          localStorage.setItem("userCargo", data.cargo);
          localStorage.setItem("userCPF", formData.login);
          console.log("Dados do funcionário salvos no localStorage:", {
            userId: data.id_funcionario,
            userName: data.nome_funcionario,
          });
          setAuthError("");
          console.log("Login bem-sucedido com CPF:", formData.login);
          window.location.href = "http://localhost:3000/home"; // Redireciona após login
        } else {
          console.error("Nome do usuário não encontrado na resposta da API.");
          setAuthError("Erro inesperado: Nome do usuário não encontrado.");
        }
      } else {
        console.error("Erro do backend:", data.message || "Erro desconhecido.");
        setAuthError(data.message || "CPF ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao efetuar login:", error);
      setAuthError("Erro ao se comunicar com o servidor.");
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
