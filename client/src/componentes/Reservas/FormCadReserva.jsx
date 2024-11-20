import React, { useEffect, useState } from "react"; // Importação das bibliotecas necessárias
import "bootstrap/dist/css/bootstrap.min.css"; // Importação do estilo do Bootstrap
import { Form, Button } from "react-bootstrap"; // Componentes do Bootstrap
import { useNavigate, useParams } from "react-router-dom"; // Hooks para navegação e parâmetros de rota
import FormReserva from "./FormReserva"; // Componente personalizado para o formulário de reserva
import Alertas from "../layout/Alertas"; // Componente de alerta para mensagens de feedback

function FormCadReserva({ handleSubmit }) {
  const navigate = useNavigate(); // Hook para redirecionamento de página
  const { id } = useParams(); // Captura o parâmetro `id` da URL para edição
  const isEditing = !!id; // Determina se o formulário está em modo de edição com base na presença do `id`
  
  // Estado inicial para os dados do formulário
  const [formData, setFormData] = useState({
    status_reserva: "",
    fk_hospede: "",
    data_checkin: "",
    data_checkout: "",
    fk_acomodacao: "",
    numero_adulto: "",
    numero_crianca: "0",
    valor_diaria: "",
    pago: "não",
    observacoes: "",
  });

  const [dataInicio, setDataInicio] = useState(""); // Estado para armazenar a data de início
  const [dataFim, setDataFim] = useState(""); // Estado para armazenar a data de fim

  // Efeito para monitorar mudanças nas datas
  useEffect(() => {
    console.log("Data Início cad:", dataInicio); // Log para depuração
    console.log("Data Fim cad:", dataFim); // Log para depuração
  }, [dataInicio, dataFim]);

  // Efeito para validar as datas e carregar os dados ao editar
  useEffect(() => {
    const validarDatas = () => {
      if (!isDataValida()) {
        return; // Se as datas forem inválidas, retorna sem prosseguir
      }
      setDataInicio(formData.data_checkin); // Define a data de início
      setDataFim(formData.data_checkout); // Define a data de fim
    };

    if (formData.data_checkin && formData.data_checkout) {
      validarDatas(); // Valida as datas caso estejam preenchidas
    }

    // Busca os dados da reserva caso esteja no modo de edição
    if (isEditing) {
      fetch(`http://localhost:5000/reservas/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Erro: ${response.status} - ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          setFormData(data); // Preenche os dados do formulário com os dados retornados
        })
        .catch((error) => {
          console.error("Erro ao buscar a reserva:", error); // Loga erros na requisição
        });
    }
  }, [id, isEditing, formData.data_checkin, formData.data_checkout]);

  

  // Estado para configurar as mensagens de alerta
  const [alertProps, setAlertProps] = useState({
    show: false,
    message: "",
    variant: "danger",
  });

  // Função para exibir alertas com mensagem e estilo
  const showAlert = (message, variant) => {
    setAlertProps({ show: true, message, variant });
    // Oculta o alerta automaticamente após 5 segundos
    setTimeout(() => setAlertProps((prev) => ({ ...prev, show: false })), 5000);
  };

  // Função para validar se as datas de check-in e check-out são válidas
  const isDataValida = () => {
    if (formData.data_checkin && formData.data_checkout) {
      const dataInicio = new Date(formData.data_checkin);
      const dataFim = new Date(formData.data_checkout);
      if (dataInicio > dataFim) {
        showAlert(
          "A data de saída não pode ser anterior à data de entrada.",
          "danger"
        );
        // Reseta as datas inválidas
        setFormData((prevState) => ({
          ...prevState,
          data_checkin: "",
          data_checkout: "",
        }));
        return false;
      }
    }
    return true;
  };

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target; // Captura o nome e valor do campo alterado
    setFormData({
      ...formData,
      [name]: value, // Atualiza o estado do formulário com o novo valor
    });
  };

  const submit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
    
    // Verifica se as datas são válidas antes de continuar
    if (!isDataValida()) {
      return;
    }
  
    const { name, value } = e.target;
    const today = new Date().toISOString().split("T")[0]; // Data de hoje para comparar com a data de checkin
    
    // Validação para garantir que a data de checkin não seja anterior a hoje
    if (name === "data_checkin" && value < today) {
      showAlert("A data de entrada não pode ser anterior a hoje!.", "danger");
      return;
    }
  
    // ---------Validações para garantir que os campos obrigatórios não estejam vazios--------

    if (!formData.status_reserva) { // Validação do campo "Situação"
      showAlert("O campo Situação é obrigatório.", "danger");
      return;
    }
  
    if (!formData.fk_hospede) { // Validação do campo "Hospede"
      showAlert("O campo Hóspede é obrigatório.", "danger");
      return;
    }
  
    if (!formData.data_checkin) { // Validação do campo "Data de Entrada"
      showAlert("O campo Data de Entrada é obrigatório.", "danger");
      return;
    }
  
    if (!formData.data_checkout) { // Validação do campo "Data de Saida"
      showAlert("O campo Data de Saida é obrigatório.", "danger");
      return;
    }
  
    if (!formData.fk_acomodacao) { // Validação do campo "Acomodação"
      showAlert("O campo Acomodação é obrigatório.", "danger");
      return;
    }
  
    if (!formData.numero_adulto || parseInt(formData.numero_adulto) < 1) { // Validação do campo "Número de Adultos"
      showAlert("O campo Nº de Adultos é obrigatório e deve ser maior que 0.", "danger");
      return;
    }
  
    const numeroCrianca = parseInt(formData.numero_crianca); // Validação adicional: Verificar se o número de crianças é um valor válido
    if (isNaN(numeroCrianca) || numeroCrianca < 0) {
      showAlert("O campo Nº de Crianças deve ser um número válido maior ou igual a 0.", "danger");
      return;
    }
  
    if (// Validação do campo "Valor da Diária"
      formData.valor_diaria === "" ||
      isNaN(parseFloat(formData.valor_diaria.replace(",", ".")))
    ) {
      showAlert("O campo Valor da Diária é obrigatório e deve ser um número válido.", "danger");
      return;
    }
    // Se estamos editando uma reserva, faz uma requisição PUT para atualizar
    if (isEditing) {
      fetch(`http://localhost:5000/reservas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Envia os dados atualizados
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Erro: ${response.status} - ${response.statusText}`
            );
          }
          return response.json();
        })
        .then(() => {
          navigate("/tabela_reserva"); // Redireciona para a página de reservas após sucesso
        })
        .catch((error) => {
          console.error("Erro ao atualizar a reserva:", error);
        });
    } else {
      // Se não estamos editando, chama o handleSubmit para adicionar uma nova reserva
      handleSubmit(formData);
      navigate("/tabela_reserva"); // Redireciona para a página de reservas após sucesso
    }
  };
  
  return (
    <div className="container mt-4">
      {/* Alerta exibido para o usuário caso haja algum erro ou sucesso */}
      <Alertas
        show={alertProps.show}
        variant={alertProps.variant}
        message={alertProps.message}
        onClose={() => setAlertProps((prev) => ({ ...prev, show: false }))}
      />
      <h2 style={{ marginLeft: "40px" }}>
        {isEditing ? "Editar Reserva" : "Nova Reserva"} {/* Título que muda conforme o modo (editar ou criar) */}
      </h2>
      <Form onSubmit={submit}> {/* Formulário que chama a função de submit */}
        <FormReserva
          formData={formData} // Dados do formulário
          setFormData={setFormData} // Função para atualizar os dados do formulário
          handleChange={handleChange} // Função para tratar as mudanças nos campos do formulário
          isEditing={isEditing} // Determina se está em modo de edição ou não
          dataInicio={dataInicio} // Data de início do check-in
          dataFim={dataFim} // Data de fim do check-out
        />
        <div className="text-center mt-4">
          {/* Botões de Cancelar e Salvar */}
          <Button
            variant="danger"
            className="mt-2 me-2"
            onClick={() => navigate("/tabela_reserva")} // Redireciona para a página de reservas sem salvar
          >
            Cancelar
          </Button>
          <Button variant="primary" className="mt-2" type="submit">
            {isEditing ? "Salvar Alterações" : "Salvar"} {/* Texto do botão dependendo se estamos editando ou criando */}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default FormCadReserva;
