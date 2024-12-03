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
    reserva.data_checkout,          
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
  
  // Verifica se o campo observacoes está vazio, e se sim, substitui por null
  const observacoes = reserva.observacoes && reserva.observacoes.trim() !== "" 
                        ? reserva.observacoes 
                        : null;

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
    observacoes,  // Campo observacoes tratado como null quando vazio
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


// Alterando o status de uma reserva
export async function updateStatusReserva(id, novoStatus) {
  console.log("ReservaModel: updateStatusReserva");
  
  const conexao = mysql.createPool(db); // Configuração da conexão com o banco de dados
  
  // SQL para atualizar o campo `status_reserva` da reserva com o ID especificado
  const sql = `UPDATE reservas SET status_reserva = ? WHERE id_reserva = ?`;
  const params = [novoStatus, id];

  try {
    // Executa a consulta no banco de dados
    const [retorno] = await conexao.query(sql, params);
    console.log("Atualizando status da reserva no banco de dados");

    // Verifica se a reserva foi encontrada e atualizada
    if (retorno.affectedRows < 1) {
      console.log(`Nenhuma reserva encontrada com o ID: ${id}`);
      return [404, { mensagem: "Reserva não encontrada ou nenhum registro atualizado." }];
    }

    // Retorna sucesso com mensagem
    return [200, { mensagem: `Status da reserva atualizado para '${novoStatus}' com sucesso.` }];
  } catch (error) {
    console.error('Erro ao atualizar status da reserva:', error.message);

    // Retorna erro com detalhes
    return [500, { mensagem: 'Erro ao atualizar status da reserva.', detalhes: error.message }];
  } finally {
    // Fecha a conexão do pool
    await conexao.end();
  }
}


export const verificarDisponibilidade = async (dataEntrada, dataSaida, acomodacaoId, reservaId) => {
  console.log('ReservaModel: verificarDisponibilidade');
  
  const conexao = mysql.createPool(db);
  
  const sql = `
    SELECT COUNT(*) as count
    FROM reservas
    WHERE fk_acomodacao = ? 
    AND (id_reserva != ? OR ? IS NULL) -- Ignorar a reserva atual, caso reservaId seja fornecido
    AND (
      (data_checkin BETWEEN ? AND ?) 
      OR (data_checkout BETWEEN ? AND ?)
      OR (? BETWEEN data_checkin AND data_checkout)
      OR (? BETWEEN data_checkin AND data_checkout)
    )
  `;
  
  const params = [
    acomodacaoId,
    reservaId,
    reservaId,
    dataEntrada, dataSaida,
    dataEntrada, dataSaida,
    dataEntrada, dataSaida
  ];

  try {
    const [retorno] = await conexao.query(sql, params);
    console.log('Resultado da consulta:', retorno);

    // Retorna um valor booleano diretamente
    const disponivel = retorno[0].count === 0;
    console.log('Disponibilidade calculada:', disponivel);
    return disponivel;
  } catch (error) {
    console.error('Erro ao verificar a disponibilidade:', error);
    throw error; // Deixe o erro ser tratado na camada superior
  }
};




export async function buscarStatusReservaPorData(acomodacaoId, dataAtual) {
  const conexao = mysql.createPool(db);

  const sql = `
    SELECT 
      status_reserva, 
      nome_hospede, 
      data_checkin, 
      data_checkout,
      id_reserva 
    FROM view_informacoes_reserva
    WHERE fk_acomodacao = ?
      AND ? BETWEEN data_checkin AND data_checkout
      AND status_reserva IN ('Reservado', 'Hospedado', 'Bloqueado')
  `;

  const params = [acomodacaoId, dataAtual];

  try {
    // Validação dos parâmetros
    if (!acomodacaoId || !dataAtual) {
      throw new Error('Parâmetros inválidos: "acomodacaoId" ou "dataAtual" não fornecidos.');
    }

    // Executa a consulta
    const [retorno] = await conexao.query(sql, params);

    // Verifica se a reserva foi encontrada
    if (retorno.length > 0) {
      return [200, retorno[0]]; // Retorna o status, nome do hóspede e datas
    } else {
      return [404, { mensagem: 'Nenhuma reserva encontrada para a data especificada.' }];
    }
  } catch (error) {
    console.error('Erro ao buscar status da reserva:', error);

    // Retorno de erro padronizado
    return [500, { mensagem: 'Erro interno ao buscar status da reserva.', detalhes: error.message }];
  } finally {
    // Fecha a conexão
    if (conexao && conexao.end) {
      await conexao.end();
    }
  }
}













