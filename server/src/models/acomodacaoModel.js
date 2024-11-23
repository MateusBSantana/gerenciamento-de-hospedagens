// models/acomodacaoModel.js

import mysql from 'mysql2/promise';
import db from '../conexao.js';

// Cadastrando Acomodação
export async function createAcomodacao(acomodacao) {
    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO acomodacoes 
        (Nome, Capacidade, Tipo, Observacoes, Status) 
        VALUES (?, ?, ?, ?, ?)`;
    const params = [
        acomodacao.nome,
        acomodacao.capacidade,
        acomodacao.tipo,
        acomodacao.observacoes,
        acomodacao.status,
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        return [201, retorno];
    } catch (error) {
        console.error('Erro ao cadastrar acomodação:', error);
        throw error;
    }
}

// Mostrando Acomodação
export async function mostrandoAcomodacoes() {
    const conexao = mysql.createPool(db);
    const sql = `SELECT * FROM acomodacoes`;

    try {
        const [acomodacoes] = await conexao.query(sql);
        return acomodacoes;
    } catch (error) {
        console.error('Erro ao listar acomodações:', error);
        throw error;
    }
}

// Mostrando Acomodação por ID
export async function mostrandoAcomodacaoPorId(id) {
    const conexao = mysql.createPool(db);
    const sql = `SELECT * FROM acomodacoes WHERE id = ?`;

    try {
        const [acomodacao] = await conexao.query(sql, [id]);
        return acomodacao[0]; // Retorna a acomodação ou undefined se não encontrada
    } catch (error) {
        console.error('Erro ao buscar acomodação por ID:', error);
        throw error;
    }
}

// Atualizando Acomodação
export async function atualizandoAcomodacao(id, acomodacao) {
    const conexao = mysql.createPool(db);
    const sql = `UPDATE acomodacoes SET 
        Nome = ?, Capacidade = ?, Tipo = ?, Observacoes = ?, Status = ?
        WHERE id = ?`;
    const params = [
        acomodacao.nome,
        acomodacao.capacidade,
        acomodacao.tipo,
        acomodacao.observacoes,
        acomodacao.status,
        id,
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        return [200, retorno];
    } catch (error) {
        console.error('Erro ao atualizar acomodação:', error);
        throw error;
    }
}

// Excluindo Acomodação
export async function excluindoAcomodacao(id) {
    const conexao = mysql.createPool(db);
    const sql = `DELETE FROM acomodacoes WHERE id = ?`;
    
    try {
        const [retorno] = await conexao.query(sql, [id]);
        return [200, retorno];
    } catch (error) {
        console.error('Erro ao excluir acomodação:', error);
        throw error;
    }
}

export async function getAcomodacoesDisponiveis(dataInicio, dataFim) {
    console.log('ReservaModel: getAcomodacoesDisponiveis');
    const conexao = mysql.createPool(db);
    
    // A consulta
    const sql = `
    SELECT a.*
FROM acomodacoes a
WHERE NOT EXISTS (
    SELECT 1
    FROM reservas r
    WHERE r.fk_acomodacao = a.id
    AND (
        -- Verificar se há sobreposição completa das datas
        (? < r.data_checkout AND ? > r.data_checkin) OR
        (? < r.data_checkout AND ? > r.data_checkin)
    )
    AND r.status_reserva IN ('reservado', 'hospedado') -- Adicionando a condição para excluir 'reservado' e 'hospedado'
)

    `;

    // Parâmetros para as datas
    const params = [dataInicio, dataFim, dataInicio, dataFim, dataInicio, dataFim];

    try {
      const [acomodacoesDisponiveis] = await conexao.query(sql, params);
      console.log('Mostrando acomodações disponíveis',dataInicio, dataFim, );

      
      if (acomodacoesDisponiveis.length < 1) {
        return [404, { mensagem: 'Nenhuma acomodação disponível encontrada' }];
      }
  
      return [200, acomodacoesDisponiveis];
    } catch (error) {
      console.error('Erro ao buscar acomodações disponíveis:', error);
      return [500, error];
    }
}
