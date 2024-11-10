import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import FormReserva from './FormReserva';

function FormCadReserva({ handleSubmit }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o ID da reserva da URL
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

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/reservas/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Dados da reserva recebidos do backend:', data);
          setFormData(data);
        })
        .catch(error => {
          console.error('Erro ao buscar a reserva:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(`Mudança detectada: ${name} = ${value}`); // Verificação de mudança
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const submit = (e) => {
    e.preventDefault();

    if (id) {
      // Se o ID estiver presente, atualiza a reserva
      fetch(`http://localhost:5000/reservas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envia os dados atualizados
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Dados da reserva recebidos:', data);
          navigate('/tabela_reserva'); // Navegação após atualização
        })
        .catch(error => {
          console.error('Erro ao atualizar a reserva:', error);
        });
    } else {
      // Se não houver ID, cria uma nova reserva
      handleSubmit(formData);
      navigate('/tabela_reserva'); // Navegação após envio
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Reserva' : 'Nova Reserva'}</h2> {/* Título dinâmico */}
      <Form onSubmit={submit}>
        <FormReserva
          formData={formData}
          handleChange={handleChange}
          fk_hospede={formData.fk_hospede}
          acomodacaoNome={formData.fk_acomodacao}
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
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FormCadReserva;
