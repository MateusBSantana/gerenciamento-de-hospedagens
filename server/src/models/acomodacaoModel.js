// acomodacaoModel.js
import mysql from 'mysql2/promise';
import db from '../conexao.js';

// Função para criar uma acomodação
export async function createAcomodacao(acomodacao) {
    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO acomodacoes (nome, capacidade, tipo) VALUES (?, ?, ?)`;
    const params = [acomodacao.nome, acomodacao.capacidade, acomodacao.tipo];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Acomodação Cadastrada');
        return [201, retorno];
    } catch (mensagem) {
        console.log(mensagem);
        return [500, mensagem];
    }
}

// Funções para atualizar, deletar e ler acomodações (exemplos simplificados)
export async function updateAcomodacao(acomodacao, id) {
    const conexao = mysql.createPool(db);
    const sql = `UPDATE acomodacoes SET nome = ?, capacidade = ?, tipo = ? WHERE id = ?`;
    const params = [acomodacao.nome, acomodacao.capacidade, acomodacao.tipo, id];

    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Acomodação Atualizada');
        return [200, retorno];
    } catch (mensagem) {
        console.log(mensagem);
        return [500, mensagem];
    }
}

export async function deleteAcomodacao(id) {
    const conexao = mysql.createPool(db);
    const sql = `DELETE FROM acomodacoes WHERE id = ?`;
    
    try {
        const [retorno] = await conexao.query(sql, [id]);
        console.log('Acomodação Excluída');
        return [200, retorno];
    } catch (mensagem) {
        console.log(mensagem);
        return [500, mensagem];
    }
}

export async function readAcomodacoes() {
    const conexao = mysql.createPool(db);
    const sql = `SELECT * FROM acomodacoes`;
    
    try {
        const [rows] = await conexao.query(sql);
        console.log('Acomodações Recuperadas');
        return [200, rows];
    } catch (mensagem) {
        console.log(mensagem);
        return [500, mensagem];
    }
}
