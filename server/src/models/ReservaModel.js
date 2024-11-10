// Importando pacote mysql
import mysql from 'mysql2/promise';

// Importando configurações do banco
import db from '../conexao.js';

// Cadastrando reserva
export async function createReserva(reserva) {
  const conexao = mysql.createPool(db);
  const sql = `INSERT INTO reservas 
    (status_reserva, fk_hospede, fk_acomodacao, data_checkin, data_checkout, valor_diaria, numero_adulto, numero_crianca, observacoes, pago ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    reserva.status_reserva,           
    reserva.fk_hospede,            
    reserva.fk_acomodacao,      
    reserva.data_checkin,       
    reserva.data_checkin,          
    reserva.valor_diaria,        
    reserva.numero_adulto,         
    reserva.numero_crianca,        
    reserva.observacoes,
    reserva.pago      
    
  ];

  try {
    const [retorno] = await conexao.query(sql, params);
    console.log('Reserva cadastrada');
    return [201, retorno];
  } catch (error) {
    console.error('Erro ao cadastrar reserva:', error);
    return [500, error];
  }
}

// Lendo Reservas
export async function readReservas() {
    console.log("ReservaModel: readReservas");
    const conexao = mysql.createPool(db);

    const sql = 'SELECT * FROM view_informacoes_reserva';

    try {
        const [retorno] = await conexao.query(sql);
        console.log("Mostrando Reservas");
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return [500, error];
    }
}


// Buscando uma reserva específica pelo ID
export async function getOneReserva(id) {
  console.log('ReservaModel: getOneReserva');
  const conexao = mysql.createPool(db);
  const sql = 'SELECT * FROM reservas WHERE id_reserva = ?';
  const params = [id];

  try {
    const [retorno] = await conexao.query(sql, params);
    console.log('Mostrando reserva');
    if (retorno.length < 1) {
      return [404, { mensagem: 'Reserva não encontrada' }];
    }

    return [200, retorno[0]];
  } catch (error) {
    console.error('Erro ao buscar reserva:', error);
    return [500, error];
  }
}


export async function updateReserva(reserva, id) {
  console.log("ReservaModel: updateReserva");
  console.log('Dados recebidos para atualização:', reserva);
  const conexao = mysql.createPool(db);
  
  const sql = `UPDATE reservas SET 
      status_reserva = ?, 
      fk_hospede = ?, 
      fk_acomodacao = ?, 
      data_checkin = ?, 
      data_checkout = ?, 
      valor_diaria = ?, 
      numero_adulto = ?, 
      numero_crianca = ?, 
      observacoes = ?, 
      pago = ?
      WHERE id_reserva = ?`;

  const params = [
    reserva.status_reserva,           
    reserva.fk_hospede,            
    reserva.fk_acomodacao,      
    reserva.data_checkin,       
    reserva.data_checkout,          
    reserva.valor_diaria,        
    reserva.numero_adulto,         
    reserva.numero_crianca,        
    reserva.observacoes,
    reserva.pago,
    id
  ];

  try {
      const [retorno] = await conexao.query(sql, params);
      console.log("Atualizando Reserva");
      
      if (retorno.affectedRows < 1) {
          return [404, { mensagem: "Reserva não encontrada" }];
      }
      
      return [200, { mensagem: "Reserva atualizada" }];
  } catch (error) {
      console.error(error);
      return [500, error];
  }
}


