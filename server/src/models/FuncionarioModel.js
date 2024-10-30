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
      funcionario.data_nascimento,
      funcionario.sexo,
      funcionario.email,
      funcionario.telefone,
      funcionario.observacoes,
      funcionario.cep,
      funcionario.Estado,
      funcionario.cidade,
      funcionario.bairro,
      funcionario.logradouro,
      funcionario.numero,
      funcionario.complemento,
      funcionario.observacoes_endereco,
      funcionario.cargo,
      funcionario.data_admissao,
      funcionario.data_emissao_carteira,
      funcionario.banco,
      funcionario.agencia,
      funcionario.conta,
      funcionario.status_funcionario,
      funcionario.observacoes_adicionais,
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
  