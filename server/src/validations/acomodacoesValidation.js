// acomodacaoValidations.js
import { body, validationResult } from 'express-validator';

const validarAcomodacao = [
    body('nome').notEmpty().withMessage('O nome é obrigatório'),
    body('capacidade').isInt().withMessage('A capacidade deve ser um número inteiro'),
    body('tipo').notEmpty().withMessage('O tipo é obrigatório'),
    // Adicione outras validações conforme necessário
];

const verificarErros = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

export { validarAcomodacao, verificarErros };
