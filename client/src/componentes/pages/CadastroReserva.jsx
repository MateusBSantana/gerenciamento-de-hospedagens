// CadastroReserva.js
import React from 'react';
import FormCadReserva from '../Reservas/FormCadReserva';
import 'bootstrap/dist/css/bootstrap.min.css';

function CadastroReserva() {
  // Função assíncrona para cadastrar uma nova reserva
  async function cadastrarReserva(infoReserva) {
    try {
      const resposta = await fetch('http://localhost:5000/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoReserva), // Envia os dados como JSON, incluindo o ID do hóspede
      });

      if (!resposta.ok) {
        console.log('Erro ao cadastrar Reserva');
      } else {
        alert('Reserva Cadastrada');
      }
    } catch (error) {
      console.log('Erro ao cadastrar Reserva', error);
    }
  }

  return (
    <div className="d-flex">
      <FormCadReserva
        handleSubmit={cadastrarReserva} // Passa a função de cadastro
      />
    </div>
  );
}

export default CadastroReserva;

