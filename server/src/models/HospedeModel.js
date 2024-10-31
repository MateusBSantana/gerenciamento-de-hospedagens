//importando pacote mysql
import mysql from 'mysql2/promise';

//importando configurações do banco
import db from '../conexao.js';



//Cadastrando hóspede
export async function createHospede(hospede) {
    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO hospedes 
          (nome_hospede, rg, cpf, data_nascimento, sexo, celular, email, CEP, Estado, cidade, bairro, rua, complemento, observacoes) 
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const params = [
      hospede.nome_hospede,
      hospede.rg,
      hospede.cpf,
      hospede.data_nascimento,
      hospede.sexo,
      hospede.celular,
      hospede.email,
      hospede.CEP,
      hospede.Estado,
      hospede.cidade,
      hospede.bairro,
      hospede.rua,
      hospede.complemento,
      hospede.observacoes,
    ];
  
    try {
      const [retorno] = await conexao.query(sql, params);
      console.log('Hóspede Cadastrado');
      return [201, retorno];
    } catch (mensagem) {
      console.log(mensagem);
      return [500, mensagem];
    }
  }

  export async function readHospedes() {
    console.log("HospedeModel: readHospedes");
    const conexao = mysql.createPool(db);

    const sql = 'SELECT * FROM hospedes';

    try {
        const [retorno] = await conexao.query(sql);
        console.log('Listando Hóspedes');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [500, { message: "Erro ao recuperar hóspedes", error }];
    }
}


  export async function updateHospede(hospede, id) {
    console.log("HospedeModel: updateHospede");
    const conexao = mysql.createPool(db);
    const sql = `UPDATE hospedes SET 
        nome_hospede = ?, 
        rg = ?, 
        cpf = ?, 
        data_nascimento = ?, 
        sexo = ?, 
        celular = ?, 
        email = ?, 
        CEP = ?, 
        Estado = ?, 
        cidade = ?, 
        bairro = ?, 
        rua = ?, 
        complemento = ?, 
        observacoes = ?
        WHERE id_hospede = ?`;

    const params = [
        hospede.nome_hospede, 
        hospede.rg, 
        hospede.cpf, 
        hospede.data_nascimento, 
        hospede.sexo, 
        hospede.celular, 
        hospede.email, 
        hospede.CEP, 
        hospede.Estado, 
        hospede.cidade, 
        hospede.bairro, 
        hospede.rua, 
        hospede.complemento, 
        hospede.observacoes,
        id
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Atualizando Hóspede');
        if (retorno.affectedRows < 1) {
            return [404, { message: "Hóspede não encontrado" }];
        }
        return [200, { message: "Hóspede Atualizado" }];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}

export async function deleteHospede(id) {
  console.log("HospedeModel: deleteHospede");
  const conexao = mysql.createPool(db);
  const sql = 'DELETE FROM hospedes WHERE id_hospede = ?'; // Verifique se 'id' é o nome correto da coluna
  const params = [id];

  try {
      const [retorno] = await conexao.query(sql, params);
      console.log('Deletando Hóspede');
      
      if (retorno.affectedRows < 1) {
          return [404, { message: "Hóspede não encontrado" }];
      }
      
      return [200, { message: "Hóspede deletado com sucesso" }];
  } catch (error) {
      console.log(error);
      return [500, { message: "Erro ao deletar hóspede", error }];
  }
}



  