
import { createHospede } from "../models/HospedeModel.js";
import { isNullOrEmpty, validateHospede } from "../validations/HospedeValidations.js";





export async function cadastroHospede(req, res) {
    console.log('HospedeController cadastroHospede');
    const hospede = req.body;
  
    console.log('Dados recebidos do frontend:', hospede); // Log dos dados recebidos

    if (validateHospede(hospede)) {
      res.status(400).json({ mensagem: 'Hóspede não pode ter campos vazios' });
    } else {
      try {
        const [status, resposta] = await createHospede(hospede);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
}
