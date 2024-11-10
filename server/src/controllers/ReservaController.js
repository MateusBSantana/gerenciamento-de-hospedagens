import { createReserva, readReservas,  getOneReserva, updateReserva} from "../models/reservaModel.js";
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

  