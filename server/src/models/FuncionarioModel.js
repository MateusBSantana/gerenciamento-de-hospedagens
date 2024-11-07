//importando pacote mysql
import mysql from 'mysql2/promise';

//importando configurações do banco
import db from '../conexao.js';



//Cadastrando Funcionario
export async function createFuncionario(funcionario) {
    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO funcionarios 
          (nome_funcionario, rg, cpf, data_nascimento, sexo, email, telefone, observacoes, 
          cep, Estado, cidade, bairro, logradouro, numero, complemento, observacoes_endereco,
          cargo, data_admissao, data_emissao_carteira, banco, agencia, conta, status_funcionario, observacoes_adicionais) 
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const params = [
      funcionario.nome_funcionario,
      funcionario.rg,
      funcionario.cpf,
      funcionario.dataNascimento,
      funcionario.sexo,
      funcionario.email,
      funcionario.telefone,
      funcionario.observacoes,
      funcionario.endereco.cep,
      funcionario.endereco.estado,
      funcionario.endereco.cidade,
      funcionario.endereco.bairro,
      funcionario.endereco.logradouro,
      funcionario.endereco.numero,
      funcionario.endereco.complemento,
      funcionario.endereco.observacoesEndereco,
      funcionario.adicionais.cargo,
      funcionario.adicionais.dataAdmissao,
      funcionario.adicionais.dataEmissaoCarteira,
      funcionario.adicionais.banco,
      funcionario.adicionais.agencia,
      funcionario.adicionais.conta,
      funcionario.adicionais.status,
      funcionario.adicionais.observacoesAdicionais,
    ];
  
    try {
      const [retorno] = await conexao.query(sql, params);
      console.log('Funcionario Cadastrado');
      return [201, retorno];
    } catch (mensagem) {
      console.log(mensagem);
      console.log('erro banco');
      return [500, mensagem];
    }
  }
  
  // Lendo aulas
  export async function readFuncionario() {
    console.log("FuncionarioModel: readFuncionario");
    const conexao = mysql.createPool(db);

    const sql = 'SELECT * FROM funcionarios';

    try {
        const [retorno] = await conexao.query(sql);
        console.log("Mostrando Funcionarios");
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}


// buscando um Funcionario
export async function getOneFuncionario(id) {
  console.log("FuncionarioModel: getOneFuncionario");
  const conexao = mysql.createPool(db);
  const sql = 'SELECT * FROM funcionarios WHERE id_funcionario = ?';
  const params = [id];

  try {
      const [retorno] = await conexao.query(sql, params);
      console.log("Mostrando Funcionario");
      console.log(retorno);
      if (retorno.length < 1) {
          return [404, { mensagem: "Funcionario não encontrado" }];
      }
      
      return [200, retorno[0]];
  } catch (error) {
      console.error(error);
      return [500, error];
  }
}


// Editando funcionario

export async function updateFuncionario(funcionario, id) {
  console.log("FuncionarioModel: updateFuncionario");
  console.log('Dados recebidos para atualização:', funcionario);
  const conexao = mysql.createPool(db);
  
  const sql = `UPDATE funcionarios SET 
          nome_funcionario = ?, 
          rg = ?, 
          cpf = ?, 
          data_nascimento = ?, 
          sexo = ?, 
          email = ?, 
          telefone = ?, 
          observacoes = ?, 
          cep = ?, 
          Estado = ?, 
          cidade = ?, 
          bairro = ?, 
          logradouro = ?, 
          numero = ?, 
          complemento = ?, 
          observacoes_endereco = ?, 
          cargo = ?, 
          data_admissao = ?, 
          data_emissao_carteira = ?, 
          banco = ?, 
          agencia = ?, 
          conta = ?, 
          status_funcionario = ?, 
          observacoes_adicionais = ? 
          WHERE id_funcionario = ?`;

  const params = [
    funcionario.nome_funcionario,
    funcionario.rg,
    funcionario.cpf,
    funcionario.dataNascimento,
    funcionario.sexo,
    funcionario.email,
    funcionario.telefone,
    funcionario.observacoes,
    funcionario.endereco.cep,
    funcionario.endereco.estado,
    funcionario.endereco.cidade,
    funcionario.endereco.bairro,
    funcionario.endereco.logradouro,
    funcionario.endereco.numero,
    funcionario.endereco.complemento,
    funcionario.endereco.observacoesEndereco,
    funcionario.adicionais.cargo,
    funcionario.adicionais.dataAdmissao,
    funcionario.adicionais.dataEmissaoCarteira,
    funcionario.adicionais.banco,
    funcionario.adicionais.agencia,
    funcionario.adicionais.conta,
    funcionario.adicionais.status,
    funcionario.adicionais.observacoesAdicionais,
    id,
  ];

  try {
      const [retorno] = await conexao.query(sql, params);
      console.log("Atualizando Funcionario");
      
      if (retorno.affectedRows < 1) {
          return [404, { mensagem: "Funcionario não encontrado" }];
      }
      
      return [200, { mensagem: "Funcionario atualizado" }];
  } catch (error) {
      console.error(error);
      return [500, error];
  }
}
