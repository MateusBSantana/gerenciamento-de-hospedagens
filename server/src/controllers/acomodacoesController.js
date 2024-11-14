// controllers/acomodacoesController.js

import {
    createAcomodacao,
    mostrandoAcomodacoes as mostrandoAcomodacoesModel,
    atualizandoAcomodacao as atualizandoAcomodacaoModel,
    excluindoAcomodacao as excluindoAcomodacaoModel,
    mostrandoAcomodacaoPorId as mostrandoAcomodacaoPorIdModel,
    getAcomodacoesDisponiveis 
} from '../models/acomodacaoModel.js';

// Cadastrando Acomodação
export async function cadastroAcomodacao(req, res) {
    const acomodacao = req.body;
    try {
        const resultado = await createAcomodacao(acomodacao);
        res.status(resultado[0]).json({ message: "Acomodação cadastrada com sucesso!", id: resultado[1].insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cadastrar a acomodação." });
    }
}

// Mostrando Acomodação por ID
export async function mostrandoAcomodacaoPorId(req, res) {
    const { id } = req.params; // Pegando o id da requisição
    try {
        const acomodacao = await mostrandoAcomodacaoPorIdModel(id); // Chama o model para pegar a acomodação por ID
        if (!acomodacao) {
            return res.status(404).json({ message: "Acomodação não encontrada." });
        }
        res.status(200).json(acomodacao); // Retorna a acomodação encontrada
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar acomodação." });
    }
}

// Mostrando Acomodação
export async function mostrandoAcomodacoes(req, res) {
    try {
        const acomodacoes = await mostrandoAcomodacoesModel();
        res.status(200).json(acomodacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao listar as acomodações." });
    }
}

// Atualizando Acomodação
export async function atualizandoAcomodacao(req, res) {
    const { id } = req.params;
    const acomodacao = req.body;
    try {
        const resultado = await atualizandoAcomodacaoModel(id, acomodacao);
        res.status(resultado[0]).json({ message: "Acomodação atualizada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar a acomodação." });
    }
}

// Excluindo Acomodação
export async function excluindoAcomodacao(req, res) {
    const { id } = req.params;
    try {
        const resultado = await excluindoAcomodacaoModel(id);
        res.status(resultado[0]).json({ message: "Acomodação excluída com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir a acomodação." });
    }
}

export async function mostrandoAcomodacoesDisponiveis(req, res) {
    console.log('Função mostrandoAcomodacoesDisponiveis foi chamada'); // Indica a entrada na função

    const { dataInicio, dataFim } = req.params; // Recebe as datas dos parâmetros da URL

    try {
        // Chama a função de modelo passando as datas de início e fim
        const [status, resultado] = await getAcomodacoesDisponiveis(dataInicio, dataFim);
        
        // Verifica o status de retorno da função
        if (status === 404) {
            console.log('Nenhuma acomodação disponível encontrada para o período'); // Log para o caso 404
            return res.status(404).json(resultado); // Retorna 404 se não encontrar acomodações disponíveis
        }

        console.log('Acomodações disponíveis encontradas:', resultado); // Log do resultado em caso de sucesso
        res.status(200).json(resultado); // Retorna 200 com a lista de acomodações disponíveis
    } catch (error) {
        console.error('Erro ao listar acomodações disponíveis:', error);
        res.status(500).json({ message: "Erro ao listar acomodações disponíveis." });
    }
}






