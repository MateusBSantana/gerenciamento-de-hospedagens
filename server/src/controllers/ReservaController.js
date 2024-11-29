import { createReserva, readReservas, getOneReserva, updateReserva, updateStatusReserva, verificarDisponibilidade } from "../models/reservaModel.js";
import { isNullOrEmpty, validateReserva } from "../validations/ReservaValidation.js";




// Cadastrando Reserva
export async function cadastroReserva(req, res) {
  console.log('ReservaController cadastroReserva');
  const reserva = req.body;

  console.log('Dados recebidos do frontend:', reserva); // Log dos dados recebidos

  //if (validateReserva(reserva)) {
  // res
  //    .status(400)
  //   .json({ mensagem: 'A reserva não pode ter campos vazios' });
  // } else {
  try {
    const [status, resposta] = await createReserva(reserva);
    res.status(status).json(resposta);
  } catch (error) {
    console.error('Erro ao cadastrar reserva:', error);
    res.status(500).json(error);
  }
  //}
}

// Mostrando todas as reservas
export async function mostrandoReservas(req, res) {
  console.log('ReservaController mostrandoReservas');
  try {
    const [status, resposta] = await readReservas();
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// exibindo uma reserva
export async function mostrandoUmaReserva(req, res) {
  console.log('ReservaController mostrandoUmaReserva');
  const { id } = req.params;

  // Verificação simples para garantir que o ID foi passado
  if (!id) {
    return res.status(400).json({ mensagem: 'O ID da reserva deve ser preenchido' });
  }

  try {
    // Tenta buscar a reserva
    const [status, resposta] = await getOneReserva(id);
    console.log('Dados da reserva recebidos do banco:', resposta);
    // Se não encontrar, retorna um erro 404 com uma mensagem
    if (status === 404) {
      return res.status(status).json({ mensagem: resposta.mensagem });
    }
    // Caso a reserva seja encontrada, retorna a resposta com status 200
    res.status(status).json(resposta);
  } catch (error) {
    // Se ocorrer um erro durante a busca, retorna erro 500
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao exibir a reserva' });
  }
}


// Atualizando uma Reserva
export async function atualizandoReserva(req, res) {
  console.log('ReservaController AtualizandoReserva');

  const { id } = req.params;
  const reserva = req.body;
  console.log("function atualizandoReserva", reserva);
  // Verifique se o corpo da requisição não está indefinido
  if (!reserva || typeof reserva !== 'object' || Array.isArray(reserva)) {
    return res.status(400).json({ mensagem: 'Dados da reserva não estão válidos' });
  }

  // Valide os dados da reserva e se o ID não é nulo ou vazio
  if (validateReserva(reserva) || isNullOrEmpty(id)) {
    return res.status(400).json({ mensagem: 'Reserva não pode ter campos vazios' });
  }

  try {
    const [status, resposta] = await updateReserva(reserva, id);
    res.status(status).json(resposta);
  } catch (error) {
    console.error('Erro ao atualizar reserva:', error);
    res.status(500).json({ mensagem: 'Erro ao atualizar reserva', erro: error.message });
  }
}

// Controlador para alterar o status da reserva
export async function alterarStatusReserva(req, res) {
  const id = req.params.id;
  const { novoStatus } = req.body;

  console.log(`Recebida requisição para alterar status da reserva ID: ${id} para ${novoStatus}`);

  // Validação do campo `novoStatus`
  const statusPermitidos = ['cancelada', 'finalizada', 'hospedado'];
  if (!statusPermitidos.includes(novoStatus)) {
    return res.status(400).json({ mensagem: `Status inválido. Use um dos seguintes: ${statusPermitidos.join(', ')}.` });
  }

  try {
    // Chama a função do modelo para atualizar o status
    const [status, resposta] = await updateStatusReserva(id, novoStatus);

    // Retorna a resposta com o status apropriado
    res.status(status).json(resposta);
  } catch (error) {
    console.error('Erro no controlador ao alterar o status da reserva:', error.message);
    res.status(500).json({ mensagem: 'Erro interno ao processar a solicitação.', detalhes: error.message });
  }
}

// Função de verificação de disponibilidade da acomodação
export const verificarDisponibilidadeAcomodacao = async (req, res) => {
  const { dataEntrada, dataSaida, acomodacaoAtual, idReserva } = req.params;

  console.log('Dados recebidos no backend:');
  console.log('dataEntrada:', dataEntrada);
  console.log('dataSaida:', dataSaida);
  console.log('acomodacaoAtual:', acomodacaoAtual);
  console.log('idReserva:', idReserva);

  // Validação dos parâmetros
  if (!dataEntrada || !dataSaida || !acomodacaoAtual) {
    return res
      .status(400)
      .json({ error: 'Faltando parâmetros: dataEntrada, dataSaida, acomodacaoAtual são necessários' });
  }

  try {
    // Conversão e validação das datas
    const dataEntradaFormatada = new Date(dataEntrada);
    const dataSaidaFormatada = new Date(dataSaida);

    if (isNaN(dataEntradaFormatada) || isNaN(dataSaidaFormatada)) {
      return res
        .status(400)
        .json({ error: 'Datas inválidas. Certifique-se de enviar datas no formato válido (YYYY-MM-DD).' });
    }

    // Chamada para verificar a disponibilidade
    const disponivel = await verificarDisponibilidade(
      dataEntradaFormatada,
      dataSaidaFormatada,
      acomodacaoAtual,
      idReserva // ID da reserva, se aplicável
    );

    // Garantia de que o valor seja tratado como booleano puro
    const isDisponivel = Boolean(disponivel);
    console.log('Disponibilidade calculada:', isDisponivel);

    // Resposta para o cliente
    return res.json({ disponivel: isDisponivel });
  } catch (error) {
    console.error('Erro ao verificar disponibilidade:', error);
    return res.status(500).json({ error: 'Erro ao verificar disponibilidade no servidor' });
  }
};

