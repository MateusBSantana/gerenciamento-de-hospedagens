import mysql from 'mysql2/promise';
import db from '../conexao.js';

// Criação do Pool de Conexões
const conexao = mysql.createPool(db);

// Cadastrando Acomodação
export async function createAcomodacao(acomodacao) {
    const sql = `INSERT INTO acomodacoes 
        (Nome, Capacidade, Tipo, Observacoes, Status, Wifi, Tv, Ar_Condicionado, Frigobar, Banheiros_Adaptados, Sinalizacao_Em_Braille, Entrada_Acessivel, Estacionamento_Acessivel) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        acomodacao.nome,
        acomodacao.capacidade,
        acomodacao.tipo,
        acomodacao.observacoes,
        acomodacao.status || 'Disponível',
        acomodacao.wifi || false,
        acomodacao.tv || false,
        acomodacao.ar_condicionado || false,
        acomodacao.frigobar || false,
        acomodacao.banheiros_adaptados || false,
        acomodacao.sinalizacao_em_braille || false,
        acomodacao.entrada_acessivel || false,
        acomodacao.estacionamento_acessivel || false
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        return [201, retorno];  // Retorna código 201 para sucesso
    } catch (error) {
        console.error('Erro ao cadastrar acomodação:', error);
        throw error;  // Lança erro para ser tratado em outro lugar
    }
}

// Mostrando todas as Acomodações
export async function mostrandoAcomodacoes() {
    const sql = `SELECT * FROM acomodacoes`;

    try {
        const [acomodacoes] = await conexao.query(sql);
        return acomodacoes;  // Retorna todas as acomodações
    } catch (error) {
        console.error('Erro ao listar acomodações:', error);
        throw error;  // Lança erro para ser tratado em outro lugar
    }
}

// Mostrando Acomodação por ID
export async function mostrandoAcomodacaoPorId(id) {
    const sql = `SELECT * FROM acomodacoes WHERE id = ?`;

    try {
        const [acomodacao] = await conexao.query(sql, [id]);
        return acomodacao[0]; // Retorna a acomodação ou undefined se não encontrada
    } catch (error) {
        console.error('Erro ao buscar acomodação por ID:', error);
        throw error;  // Lança erro para ser tratado em outro lugar
    }
}

// Atualizando Acomodação
export async function atualizandoAcomodacao(id, acomodacao) {
    const sql = `UPDATE acomodacoes SET 
        Nome = ?, Capacidade = ?, Tipo = ?, Observacoes = ?, Status = ?, 
        Wifi = ?, Tv = ?, Ar_Condicionado = ?, Frigobar = ?, 
        Banheiros_Adaptados = ?, Sinalizacao_Em_Braille = ?, 
        Entrada_Acessivel = ?, Estacionamento_Acessivel = ?
        WHERE id = ?`;

    const params = [
        acomodacao.nome,
        acomodacao.capacidade,
        acomodacao.tipo,
        acomodacao.observacoes,
        acomodacao.status || 'Disponível',
        acomodacao.wifi || false,
        acomodacao.tv || false,
        acomodacao.ar_condicionado || false,
        acomodacao.frigobar || false,
        acomodacao.banheiros_adaptados || false,
        acomodacao.sinalizacao_em_braille || false,
        acomodacao.entrada_acessivel || false,
        acomodacao.estacionamento_acessivel || false,
        id
    ];

    try {
        const [retorno] = await conexao.query(sql, params);
        return [200, retorno];  // Retorna código 200 para sucesso
    } catch (error) {
        console.error('Erro ao atualizar acomodação:', error);
        throw error;  // Lança erro para ser tratado em outro lugar
    }
}

// Excluindo Acomodação
export async function excluindoAcomodacao(id) {
    const sql = `DELETE FROM acomodacoes WHERE id = ?`;

    try {
        const [retorno] = await conexao.query(sql, [id]);
        return [200, retorno];  // Retorna código 200 para sucesso
    } catch (error) {
        console.error('Erro ao excluir acomodação:', error);
        throw error;  // Lança erro para ser tratado em outro lugar
    }
}

// Filtrando Acomodações por Status
export async function filtrandoAcomodacoesPorStatus(status) {
    const sql = `SELECT * FROM acomodacoes WHERE Status = ?`;

    try {
        const [acomodacoes] = await conexao.query(sql, [status]);
        return acomodacoes;  // Retorna as acomodações filtradas pelo status
    } catch (error) {
        console.error('Erro ao filtrar acomodações por status:', error);
        throw error;  // Lança erro para ser tratado em outro lugar
    }
}
