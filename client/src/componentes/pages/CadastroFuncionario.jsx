import React from 'react';
import FormCadFuncionario from '../Funcionarios/FormCadFuncionario/FormCadFuncionario';
import MenuLateral from '../layout/MenuLateral/MenuLateral';
import 'bootstrap/dist/css/bootstrap.min.css';

function CadastroFuncionario() {
  async function cadastrarFuncionario(infoFuncinario) {
    try {
      const resposta = await fetch('http://localhost:5000/funcionario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoFuncinario),
      });
      if (!resposta.ok) {
        console.log('Erro ao cadastrar funcionario');
      } else {
        alert('Funcionario Cadastrado');
      }
    } catch (error) {
      console.log('Erro ao cadastrar funcionario', error);
    }
  }

  return (
    <div className="d-flex">
      <MenuLateral />
        <FormCadFuncionario
          titulo="Cadastro Funcionário"
          txtBtn="Cadastrar"
          handleSubmit={cadastrarFuncionario}
        />
      
    </div>
  );
}

export default CadastroFuncionario;
