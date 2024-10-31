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
      funcionario.nome,
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
  