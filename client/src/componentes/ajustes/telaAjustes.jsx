import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Certifique-se de importar Link

function TelaAjustes() {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 text-center">
        <Col md={12} className="mb-3">
          <Link to="/cadastro_funcionario" className="w-100">
            <Button variant="primary" className="w-100" type="button">
              Cadastrar Funcionários
            </Button>
          </Link>
        </Col>
        <Col md={12} className="mb-3">
          <Link to="/tabela_funcionarios" className="w-100">
            <Button variant="primary" className="w-100" type="button">
              Tabela Funcionários
            </Button>
          </Link>
        </Col>
        <Col md={12} className="mb-3">
          <Link to="/cadastro_acomodacao" className="w-100">
            <Button variant="primary" className="w-100" type="button">
              Cadastrar Acomodações
            </Button>
          </Link>
        </Col>
        <Col md={12} className="mb-3">
          <Link to="/listagem_acomodacoes" className="w-100">
            <Button variant="primary" className="w-100" type="button">
              Tabela Acomodações
            </Button>
          </Link>
        </Col>
        <Col md={12} className="mb-3">
          <Link to="#" className="w-100">
            <Button variant="primary" className="w-100" type="button">
              Bloquear Acomodação
            </Button>
          </Link>
        </Col>
        <Col md={12} className="mb-3">
          <Link to="#" className="w-100">
            <Button variant="primary" className="w-100" type="button">
              Relatório
            </Button>
          </Link>
        </Col>
        <Col md={12} className="mb-3">
          <Link to="#" className="w-100">
            <Button variant="primary" className="w-100" type="button">
              Opção 7
            </Button>
          </Link>
        </Col>
        <Col md={12} className="mb-3">
          <Link to="#" className="w-100">
            <Button variant="primary" className="w-100" type="button">
              Opção 8
            </Button>
          </Link>
        </Col>
        <Col md={12} className="mb-3">
          <Link to="#" className="w-100">
            <Button variant="primary" className="w-100" type="button">
              Opção 9
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default TelaAjustes;
