// acomodacoesController.js
import { createAcomodacao, updateAcomodacao, deleteAcomodacao, readAcomodacoes } from '../models/acomodacaoModel.js';
import { validarAcomodacao, verificarErros } from '../validations/acomodacoesValidation.js';

export async function cadastroAcomodacao(req, res) {
    console.log('AcomodacoesController cadastroAcomodacao');
    const acomodacao = req.body;

    console.log('Dados recebidos do frontend:', acomodacao);

    const validationErrors = verificarErros(req, res);
    if (validationErrors) return validationErrors;

    try {
        const [status, resposta] = await createAcomodacao(acomodacao);
        res.status(status).json({ success: true, data: resposta });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Erro ao cadastrar a acomodação', error });
    }
}

export async function mostrandoAcomodacoes(req, res) {
    console.log('AcomodacoesController mostrandoAcomodacoes');

    try {
        const [status, resposta] = await readAcomodacoes();
        res.status(status).json({ success: true, data: resposta });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Erro ao recuperar acomodações', error });
    }
}

export async function atualizandoAcomodacao(req, res) {
    console.log('AcomodacoesController atualizandoAcomodacao');
    const { id } = req.params;
    const acomodacao = req.body;

    const validationErrors = verificarErros(req, res);
    if (validationErrors || !id) {
        return res.status(400).json({ success: false, message: 'Acomodação não pode ter campos vazios' });
    }

    try {
        const [status, resposta] = await updateAcomodacao(acomodacao, id);
        res.status(status).json({ success: true, data: resposta });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar a acomodação', error });
    }
}

export async function excluindoAcomodacao(req, res) {
    console.log('AcomodacoesController excluindoAcomodacao');
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'O id deve ser preenchido!' });
    }

    try {
        const [status, resposta] = await deleteAcomodacao(id);
        res.status(status).json({ success: true, data: resposta });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Erro ao excluir a acomodação', error });
    }
}
