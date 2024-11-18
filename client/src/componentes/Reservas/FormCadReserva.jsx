import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import FormReserva from './FormReserva';

function FormCadReserva({ handleSubmit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const [formData, setFormData] = useState({
    status_reserva: '',
    fk_hospede: '',
    data_checkin: '',
    data_checkout: '',
    fk_acomodacao: '',
    numero_adulto: '',
    numero_crianca: '0',
    valor_diaria: '',
    pago: 'não',
    observacoes: ''
  });

  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  useEffect(() => {
    console.log('Data Início cad:', dataInicio);
    console.log('Data Fim cad:', dataFim);
  }, [dataInicio, dataFim]);


  const isDataValida = () => {
    if (formData.data_checkin && formData.data_checkout) {
      const dataInicio = new Date(formData.data_checkin);
      const dataFim = new Date(formData.data_checkout);
      if (dataInicio > dataFim) {
        alert("A data de saída não pode ser anterior à data de entrada.");
        setFormData(prevState => ({
          ...prevState,
          data_checkin: '',
          data_checkout: ''
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
      if (!isDatasPreenchidas()) {
        alert("Por favor, preencha as datas de entrada e saída antes de buscar acomodações.");
        return;
      }

      if (!isDataValida()) {
        return;
      }
      setDataInicio(formData.data_checkin);
      setDataFim(formData.data_checkout);
      console.log('data inicio:', formData.data_checkin);
      console.log('data fim:', formData.data_checkout);

    };

    if (formData.data_checkin && formData.data_checkout) {
      validarDatas();
    }

    if (isEditing) {
      fetch(`http://localhost:5000/reservas/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setFormData(data);
        })
        .catch(error => {
          console.error('Erro ao buscar a reserva:', error);
        });
    }
  }, [id, isEditing, formData.data_checkin, formData.data_checkout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const submit = (e) => {
    e.preventDefault();

    if (!isDataValida()) {
      return;
    }
    const { name, value } = e.target;
    const today = new Date().toISOString().split('T')[0];
    if (name === "data_checkin" && value < today) {
      alert("A data de entrada não pode ser anterior a hoje!");
      return;
    }

    if (!formData.status_reserva) { // Validação do campo "Situação"
      alert("O campo Situação é obrigatório.");
      return;
    }

    if (!formData.fk_hospede) { // Validação do campo "Hospede"
      alert("O campo Hóspede é obrigatório.");
      return;
    }

    if (!formData.data_checkin) { // Validação do campo "Data de Entrada"
      alert("O campo Data de Entrada é obrigatório.");
      return;
    }

    if (!formData.data_checkout) { // Validação do campo "Data de Saida"
      alert("O campo Data de Saida é obrigatório.");
      return;
    }

    if (!formData.fk_acomodacao) {// Validação do campo "Acomodação"
      alert("O campo Acomodação é obrigatório.");
      return;
    }

    if (!formData.numero_adulto || parseInt(formData.numero_adulto) < 1) {// Validação do campo "Número de Adultos"
      alert("O campo Nº de Adultos é obrigatório e deve ser maior que 0.");
      return;
    }

    const numeroCrianca = parseInt(formData.numero_crianca);// Validação adicional (se necessário): Verificar valores numéricos
    if (isNaN(numeroCrianca) || numeroCrianca < 0) {
      alert("O campo Nº de Crianças deve ser um número válido maior ou igual a 0.");
      return;
    }

    if (formData.valor_diaria === "" || isNaN(parseFloat(formData.valor_diaria.replace(',', '.')))) { // Validação do campo "Valor da Diária"
      alert("O campo Valor da Diária é obrigatório e deve ser um número válido.");
      return;
    }

    if (isEditing) {
      fetch(`http://localhost:5000/reservas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(() => {
          navigate('/tabela_reserva');
        })
        .catch(error => {
          console.error('Erro ao atualizar a reserva:', error);
        });
    } else {
      handleSubmit(formData);
      navigate('/tabela_reserva');
    }
  };

  return (
    <div className="container mt-4">
      <h2 style={{ marginLeft: '40px' }}>{isEditing ? 'Editar Reserva' : 'Nova Reserva'}</h2>
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
            onClick={() => navigate('/tabela_reserva')}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            className="mt-2"
            type="submit"
          >
            {isEditing ? 'Salvar Alterações' : 'Salvar'}
          </Button>
        </div>

      </Form>
    </div>
  );
}

export default FormCadReserva;
