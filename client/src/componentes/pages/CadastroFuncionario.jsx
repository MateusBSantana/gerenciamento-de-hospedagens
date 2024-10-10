import React from 'react';
import FormCadFuncionario from '../FormCadFuncionario/FormCadFuncionario';

function CadastroFuncionario() {

  async function cadastrarFuncionario(infoFuncinario) {
    try{
      //o POST é usado para inserir elementos na API
      const resposta = await fetch('http://localhost:5000/funcionario',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },body:JSON.stringify(infoFuncinario)

      })
      if(!resposta.ok){
        console.log('erro ao cadastrar funcionario');

      }else{
        alert('Funcionario Cadastrado');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      }
    }catch (error) {
      console.log('erro ao cadastrar funcionario',error)
    }
  }

  return (
    <div>
       <FormCadFuncionario titulo="Cadastro Funcionário" txtBtn="Cadastrar"  handleSubmit={cadastrarFuncionario}
      />
    </div>
  );
}

export default CadastroFuncionario;
