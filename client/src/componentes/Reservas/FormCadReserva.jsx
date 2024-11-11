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
  const [acomodacoesDisponiveis, setAcomodacoesDisponiveis] = useState([]);

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

    const buscarAcomodacoesDisponiveis = () => {
      if (!isDatasPreenchidas()) {
        alert("Por favor, preencha as datas de entrada e saída antes de buscar acomodações.");
        return;
      }

      if (!isDataValida()) {
        return;
      }

      const dataInicio = formData.data_checkin;
      const dataFim = formData.data_checkout;

      fetch(`http://localhost:5000/api/acomodacoes?dataInicio=${dataInicio}&dataFim=${dataFim}`)
        .then(response => response.json())
        .then(acomodacoes => {
          setAcomodacoesDisponiveis(acomodacoes);
        })
        .catch(error => console.error('Erro ao buscar acomodações:', error));
    };

    if (formData.data_checkin && formData.data_checkout) {
      buscarAcomodacoesDisponiveis();
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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    if (!isDataValida()) {
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

  const handleStatusAction = () => {
    const actionUrl = `http://localhost:5000/reservas/${id}/status`;
    const novoStatus = formData.status_reserva === 'reservado' ? 'cancelado' : 'finalizado';

    fetch(actionUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ novoStatus })
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
        console.error(`Erro ao ${formData.status_reserva === 'reservado' ? 'cancelar' : 'finalizar'} a reserva:`, error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>{isEditing ? 'Editar Reserva' : 'Nova Reserva'}</h2>
      <Form onSubmit={submit}>
        <FormReserva
          formData={formData}
          handleChange={handleChange}
          isEditing={isEditing}
        />

        <div className="text-center mt-4">
          <Button
            variant="danger"
            className="mt-2 me-2"
            onClick={() => navigate('/tabela_reserva')}
          >
            Cancelar
          </Button>

          {isEditing && (
            <Button
              variant={formData.status_reserva === 'reservado' ? 'warning' : 'success'}
              className="mt-2 me-2"
              onClick={handleStatusAction}
            >
              {formData.status_reserva === 'reservado' ? 'Cancelar Reserva' : 'Finalizar Reserva'}
            </Button>
          )}

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
