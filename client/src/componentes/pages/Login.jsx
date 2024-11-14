import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    login: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // Validação básica dos campos
  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "login" && value.trim() === "") {
      errorMsg = "Login é obrigatório.";
    } else if (name === "password" && value.length < 6) {
      errorMsg = "A senha deve ter pelo menos 6 caracteres.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  // Manipulador de mudança de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  // Manipulador de submissão de formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errors.login && !errors.password && formData.login && formData.password) {
      setShowAlert(true);
      console.log("Login bem-sucedido com:", formData);
      // Redirecionamento para localhost:3000
      window.location.href = "http://localhost:3000"; // Isso irá redirecionar para a página desejada
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

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                placeholder="Digite sua senha"
                required
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
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
