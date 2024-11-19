//importando pacote mysql
import mysql from 'mysql2/promise';

//importando configurações do banco
import db from '../conexao.js';



//Cadastrando Funcionario
export async function createFuncionario(funcionario) {
    const conexao = mysql.createPool(db);

    const sqlFuncionario = `INSERT INTO funcionarios 
          (nome_funcionario, rg, cpf, data_nascimento, sexo, email, telefone, observacoes, 
          cep, Estado, cidade, bairro, logradouro, numero, complemento, observacoes_endereco,
          cargo, data_admissao, data_emissao_carteira, banco, agencia, conta, status_funcionario, observacoes_adicionais) 
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const paramsFuncionario = [
        funcionario.nome_funcionario,
        funcionario.rg,
        funcionario.cpf,
        funcionario.dataNascimento,
        funcionario.sexo,
        funcionario.email,
        funcionario.telefone,
        funcionario.observacoes,
        funcionario.cep,
        funcionario.estado,
        funcionario.cidade,
        funcionario.bairro,
        funcionario.logradouro,
        funcionario.numero,
        funcionario.complemento,
        funcionario.observacoesEndereco,
        funcionario.cargo,
        funcionario.dataAdmissao,
        funcionario.dataEmissaoCarteira,
        funcionario.banco,
        funcionario.agencia,
        funcionario.conta,
        funcionario.status,
        funcionario.observacoesAdicionais,
    ];

    try {
        console.log('Inserindo funcionário com os seguintes dados:', paramsFuncionario);

        const connection = await conexao.getConnection();
        try {
            await connection.beginTransaction(); // Inicia a transação
            
            // Insere o funcionário na tabela
            const [resultadoFuncionario] = await connection.query(sqlFuncionario, paramsFuncionario);
            const idFuncionario = resultadoFuncionario.insertId;

            // Gera login e senha com base no CPF (ou outra lógica que você preferir)
            const login = funcionario.cpf; // Login será o CPF
            const senha = funcionario.cpf.slice(0, 6); // Os 6 primeiros dígitos do CPF como senha inicial

            const sqlUsuario = `INSERT INTO usuarios (id_usuario, login, senha) VALUES (?, ?, ?)`;
            const paramsUsuario = [idFuncionario, login, senha];

            // Insere o usuário na tabela
            await connection.query(sqlUsuario, paramsUsuario);

            await connection.commit(); // Confirma a transação

            console.log('Funcionário e usuário cadastrados com sucesso');
            return [201, { mensagem: 'Funcionário e usuário cadastrados com sucesso' }];
        } catch (error) {
            await connection.rollback(); // Reverte a transação em caso de erro
            console.error('Erro ao cadastrar funcionário e usuário:', error);
            throw error; // Retorna o erro para ser tratado em outro lugar
        } finally {
            connection.release(); // Libera a conexão
        }
    } catch (mensagem) {
        console.log('Erro no banco:', mensagem);
        return [500, { mensagem: 'Erro interno ao processar cadastro' }];
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
    funcionario.data_nascimento,
    funcionario.sexo,
    funcionario.email,
    funcionario.telefone,
    funcionario.observacoes,
    funcionario.cep,
    funcionario.estado,
    funcionario.cidade,
    funcionario.bairro,
    funcionario.logradouro,
    funcionario.numero,
    funcionario.complemento,
    funcionario.observacoesEndereco,
    funcionario.cargo,
    funcionario.dataAdmissao,
    funcionario.dataEmissaoCarteira,
    funcionario.banco,
    funcionario.agencia,
    funcionario.conta,
    funcionario.status,
    funcionario.observacoesAdicionais,
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
