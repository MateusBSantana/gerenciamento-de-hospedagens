import { createReserva, readReservas } from "../models/reservaModel.js";
import { validateReserva } from "../validations/ReservaValidation.js";


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
  