//importando pacote mysql
import mysql from 'mysql2/promise';

//importando configurações do banco
import db from '../conexao.js';



//Cadastrando hóspede
export async function createHospede(hospede) {
    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO hospedes (nome_hospede) VALUES (?)`;
    const params = [hospede.nome_hospede];


    try {
        const [retorno] = await conexao.query(sql,params);
        console.log('Hóspede Cadastrado');
        return [201, retorno];
    } catch (mensagem) {
        console.log(mensagem);
        return [500, mensagem];
    }
}
