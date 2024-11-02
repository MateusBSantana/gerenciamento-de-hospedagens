
import { createHospede, updateHospede, deleteHospede, readHospedes } from "../models/HospedeModel.js";
import { isNullOrEmpty, validateHospede } from "../validations/HospedeValidations.js";


export async function cadastroHospede(req, res) {
    console.log('HospedeController cadastroHospede');
    const hospede = req.body;
  
    console.log('Dados recebidos do frontend:', hospede);

    //if (validateHospede(hospede)) {
    //  res.status(400).json({ mensagem: 'Hóspede não pode ter campos vazios' });
    //} else {
      try {
        const [status, resposta] = await createHospede(hospede);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
   // }
}

export async function mostrandoHospedes(req, res) {
  console.log('HospedeController mostrandoHospedes');

  try {
    const [status, resposta] = await readHospedes();
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao recuperar hóspedes', error });
  }
}


export async function atualizandoHospede(req, res) {
  console.log('HospedeController AtulizandoHospede');
  const { id } = req.params;
  const hospede = req.body;

  if(validateHospede(hospede) || isNullOrEmpty(id)){
    res.status(400).json({message:'Hospede não pode ter campos vazios'})
  } else {
      try {
      const [status, resposta] = await updateHospede(hospede, id);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export async function excluindoHospede(req, res) {
  console.log('HospedeController excluindoHospede');
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'O id deve ser preenchido!' });
  } else {
    try {
      const [status, resposta] = await deleteHospede(id);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao excluir o hóspede', error });
    }
  }
}

