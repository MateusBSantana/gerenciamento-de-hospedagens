import mysql from 'mysql2/promise';
import db from '../conexao.js';

// Criação do Pool de Conexões
const conexao = mysql.createPool(db);

// Cadastrando Acomodação
export async function createAcomodacao(acomodacao) {
    const sql = `INSERT INTO acomodacao 
        (Nome, Capacidade, Tipo, Observacoes, Status, Wifi, Tv, arCondicionado, Frigobar, banheirosAdaptados, sinalizacaoBraille, entradaAcessivel, estacionamentoAcessivel) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        acomodacao.nome,
        acomodacao.capacidade,
        acomodacao.tipo,
        acomodacao.observacoes,
        acomodacao.status || 'Disponível',
        acomodacao.wifi || false,
        acomodacao.tv || false,
        acomodacao.arCondicionado || false,
        acomodacao.frigobar || false,
        acomodacao.banheirosAdaptados || false,
        acomodacao.sinalizacaoBraille || false,
        acomodacao.entradaAcessivel || false,
        acomodacao.estacionamentoAcessivel || false
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
    const sql = `SELECT * FROM acomodacao`;

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
    const sql = `SELECT * FROM acomodacao WHERE id = ?`;

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
    const sql = `UPDATE acomodacao SET 
        Nome = ?, Capacidade = ?, Tipo = ?, Observacoes = ?, Status = ?, 
        Wifi = ?, Tv = ?, arCondicionado = ?, Frigobar = ?, 
        banheirosAdaptados = ?, sinalizacaoBraille = ?, 
        entradaAcessivel = ?, estacionamentoAcessivel = ?
        WHERE id = ?`;

    const params = [
        acomodacao.nome,
        acomodacao.capacidade,
        acomodacao.tipo,
        acomodacao.observacoes,
        acomodacao.status || 'Disponível',
        acomodacao.wifi || false,
        acomodacao.tv || false,
        acomodacao.arCondicionado || false,
        acomodacao.frigobar || false,
        acomodacao.banheirosAdaptados || false,
        acomodacao.sinalizacaoBraille || false,
        acomodacao.entradaAcessivel || false,
        acomodacao.estacionamentoAcessivel || false,
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
    const sql = `DELETE FROM acomodacao WHERE id = ?`;

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
    const sql = `SELECT * FROM acomodacao WHERE Status = ?`;

    try {
        const [acomodacoes] = await conexao.query(sql, [status]);
        return acomodacoes;  // Retorna as acomodações filtradas pelo status
    } catch (error) {
        console.error('Erro ao filtrar acomodações por status:', error);
        throw error;  // Lança erro para ser tratado em outro lugar
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
