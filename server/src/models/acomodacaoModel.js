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
