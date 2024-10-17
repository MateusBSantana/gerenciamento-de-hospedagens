import React from 'react';
import FormCadHospede from '../Hospedes/FormCadHospedes/FormCadHospedes'
import MenuLateral from '../layout/MenuLateral/MenuLateral';
import 'bootstrap/dist/css/bootstrap.min.css';

function CadastroHospede() {
  async function cadastrarHospede(infoHospede) {
    try {
      const resposta = await fetch('http://localhost:5000/hospede', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoHospede),
      });
      if (!resposta.ok) {
        console.log('Erro ao cadastrar Hóspede');
      } else {
        alert('Hóspede Cadastrado');
      }
    } catch (error) {
      console.log('Erro ao cadastrar Hóspede', error);
    }
  }

  return (
    <div className="d-flex">
      <MenuLateral />
        <FormCadHospede
          titulo="Cadastro Hóspede"
          txtBtn="Cadastrar"
          handleSubmit={cadastrarHospede}
        />
      
    </div>
  );
}

export default CadastroHospede;
