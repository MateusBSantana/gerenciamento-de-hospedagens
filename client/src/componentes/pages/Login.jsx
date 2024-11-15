import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({ login: '', senha: '' });
  const [errors, setErrors] = useState({ login: '', senha: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [authError, setAuthError] = useState('');

  // Função para validar os campos
  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'login' && value.trim() === '') {
      errorMsg = 'Login é obrigatório.';
    } else if (name === 'senha' && value.length < 6) {
      errorMsg = 'A senha deve ter pelo menos 6 caracteres.';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  // Manipulador de mudança de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  // Função para efetuar login
  async function efetuarLogin() {
    const { login, senha } = formData;

    try {
      const resposta = await fetch('http://localhost:5000/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, senha }),
      });

      if (!resposta.ok) {
        const errorData = await resposta.json();
        throw new Error(errorData.message || 'Erro ao efetuar login');
      }

      setShowAlert(true);
      setAuthError(''); // Limpa o erro de autenticação
      console.log("Login bem-sucedido com:", formData);
      window.location.href = "http://localhost:3000"; // Redireciona após login bem-sucedido
    } catch (error) {
      console.log("Erro ao efetuar login:", error);
      setShowAlert(false);
      setAuthError('Login ou senha incorretos.'); // Define uma mensagem de erro
    }
  }

  // Manipulador de submissão de formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se há erros antes de enviar o formulário
    if (!errors.login && !errors.senha && formData.login && formData.senha) {
      efetuarLogin();
    } else {
      setShowAlert(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col xs={12} md={6} className="mx-auto">
          <h3 className="text-center mb-4">Login</h3>

          {showAlert && <Alert variant="success">Login realizado com sucesso!</Alert>}
          {authError && <Alert variant="danger">{authError}</Alert>} {/* Exibe o erro de autenticação */}

          <Form onSubmit={handleSubmit} className="border p-4 shadow rounded">
            <Form.Group className="mb-3" controlId="formLogin">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
                isInvalid={!!errors.login}
                placeholder="Digite seu login"
                required
              />
              <Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                isInvalid={!!errors.senha}
                placeholder="Digite sua senha"
                required
              />
              <Form.Control.Feedback type="invalid">{errors.senha}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
