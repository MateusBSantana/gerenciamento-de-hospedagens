import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import FormReserva from "./FormReserva";


function FormCadReserva({ handleSubmit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
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

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  useEffect(() => {
    console.log("Data Início cad:", dataInicio);
    console.log("Data Fim cad:", dataFim);
  }, [dataInicio, dataFim]);

  function showAlert(message, type = "warning") { // função para mostar mensagens de alerta
    const alertContainer = document.getElementById("alert-container");
    const alertId = `alert-${Date.now()}`; // Gerar um ID único para o alerta
  
    alertContainer.innerHTML = `
      <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show alert-overlay" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  
    // Configurar o tempo para remover o alerta
    setTimeout(() => {
      const alertElement = document.getElementById(alertId);
      if (alertElement) {
        alertElement.classList.remove("show"); // Adiciona a transição do Bootstrap
        setTimeout(() => alertElement.remove(), 150); // Espera o tempo da animação do Bootstrap antes de remover
      }
    }, 5000); // 5 segundos
  }

  const isDataValida = () => {
    if (formData.data_checkin && formData.data_checkout) {
      const dataInicio = new Date(formData.data_checkin);
      const dataFim = new Date(formData.data_checkout);
      if (dataInicio > dataFim) {
        showAlert("A data de saída não pode ser anterior à data de entrada.", "danger");
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

  useEffect(() => {
    const isDatasPreenchidas = () => {
      return formData.data_checkin && formData.data_checkout;
    };

    const validarDatas = () => {

      if (!isDataValida()) {
        return;
      }
      setDataInicio(formData.data_checkin);
      setDataFim(formData.data_checkout);
      console.log("data inicio:", formData.data_checkin);
      console.log("data fim:", formData.data_checkout);
    };

    if (formData.data_checkin && formData.data_checkout) {
      validarDatas();
    }

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
          setFormData(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar a reserva:", error);
        });
    }
  }, [id, isEditing, formData.data_checkin, formData.data_checkout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    
    
    
    if (!isDataValida()) {
      return;
    }
    const { name, value } = e.target;
    const today = new Date().toISOString().split("T")[0];
    if (name === "data_checkin" && value < today) {
      showAlert("A data de entrada não pode ser anterior a hoje!.", "danger");
      return;
    }

    if (!formData.status_reserva) {
      // Validação do campo "Situação"
      showAlert("O campo Situação é obrigatório.", "danger");
      return;
    }

    if (!formData.fk_hospede) {
      // Validação do campo "Hospede"
      showAlert("O campo Hóspede é obrigatório.", "danger");
      return;
    }

    if (!formData.data_checkin) {
      // Validação do campo "Data de Entrada"
      showAlert("O campo Data de Entrada é obrigatório.", "danger");
      return;
    }

    if (!formData.data_checkout) {
      // Validação do campo "Data de Saida"
      showAlert("O campo Data de Saida é obrigatório.", "danger");
      return;
    }

    if (!formData.fk_acomodacao) {
      // Validação do campo "Acomodação"
      showAlert("O campo Acomodação é obrigatório.", "danger");
      return;
    }

    if (!formData.numero_adulto || parseInt(formData.numero_adulto) < 1) {
      // Validação do campo "Número de Adultos"
      showAlert("O campo Nº de Adultos é obrigatório e deve ser maior que 0.", "danger");
      return;
    }

    const numeroCrianca = parseInt(formData.numero_crianca); // Validação adicional (se necessário): Verificar valores numéricos
    if (isNaN(numeroCrianca) || numeroCrianca < 0) {
      showAlert("O campo Nº de Crianças deve ser um número válido maior ou igual a 0.", "danger");
      return;
    }

    if (
      formData.valor_diaria === "" ||
      isNaN(parseFloat(formData.valor_diaria.replace(",", ".")))
    ) {
      // Validação do campo "Valor da Diária"
      showAlert("O campo Valor da Diária é obrigatório e deve ser um número válido.", "danger");
      return;
    }

    if (isEditing) {
      fetch(`http://localhost:5000/reservas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
          navigate("/tabela_reserva");
        })
        .catch((error) => {
          console.error("Erro ao atualizar a reserva:", error);
        });
    } else {
      handleSubmit(formData);
      navigate("/tabela_reserva");
    }
  };

  return (
    <div className="container mt-4">
      {/* Contêiner para mensagens de alerta */}
      <div id="alert-container" className="mb-3"></div>
      <h2 style={{ marginLeft: "40px" }}>
        {isEditing ? "Editar Reserva" : "Nova Reserva"}
      </h2>
      <Form onSubmit={submit}>
        <FormReserva
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          isEditing={isEditing}
          dataInicio={dataInicio}
          dataFim={dataFim}
        />

        <div className="text-center mt-4">
          <Button
            variant="danger"
            className="mt-2 me-2"
            onClick={() => navigate("/tabela_reserva")}
          >
            Cancelar
          </Button>

          <Button variant="primary" className="mt-2" type="submit">
            {isEditing ? "Salvar Alterações" : "Salvar"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FormCadReserva;
