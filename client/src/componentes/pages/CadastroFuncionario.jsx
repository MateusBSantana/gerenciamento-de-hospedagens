import React from 'react';
import FormCadFuncionario from '../Funcionarios/FormCadFuncionario/FormCadFuncionario';
import 'bootstrap/dist/css/bootstrap.min.css';

function CadastroFuncionario() {
  async function cadastrarFuncionario(infoFuncionario) {
    try {
      const resposta = await fetch('http://localhost:5000/funcionario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoFuncionario),
      });
      if (!resposta.ok) {
        console.log('Erro ao cadastrar funcionario');
      } else {
        alert('Funcionário Cadastrado');
      }
    } catch (error) {
      console.log('Erro ao cadastrar funcionario', error);
    }
  }

  return (
    <div className="flex-grow-1 p-3"> {/* Removendo MenuLateral */}
      <FormCadFuncionario
        titulo="Cadastro Funcionário"
        txtBtn="Cadastrar"
        handleSubmit={cadastrarFuncionario}
      />
    </div>
  );
}

export default CadastroFuncionario;
