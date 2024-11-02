import {createFuncionario, readFuncionario} from '../models/FuncionarioModel.js';
import {isNullOrEmpty,validateFuncionario} from '../validations/FuncionarioValidations.js';

export async function cadastroFuncionario(req, res) {
  console.log('FuncionarioController cadastroFuncionario');
  const funcionario = req.body;

  console.log('Dados recebidos do frontend:', funcionario); // Log dos dados recebidos

  if (validateFuncionario(funcionario)) {
    res
      .status(400)
      .json({ mensagem: 'Funcionario não pode ter campos vazios' });
  } else {
    try {
      const [status, resposta] = await createFuncionario(funcionario);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export async function mostrandoFuncionarios(req, res) {
  console.log('FuncionarioController mostrandoFuncionarios');
  try {
      const [status, resposta] = await readFuncionario();
      res.status(status).json(resposta);
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
}
