import { saveAs } from "file-saver";

export const txtReserva = (reservaData, nomeHospede, nomeAcomodacao) => {


      
    const reservaText = `
  ===============================
           DETALHES DA RESERVA
  ===============================

  INFORMAÇÕES DA RESERVA:
  -------------------------
  Status da Reserva:      ${reservaData.status_reserva}
  Hóspede:               ${reservaData.nome_hospede}
  Acomodação:            ${reservaData.nome}
  Data de Check-in:      ${reservaData.data_checkin}
  Data de Check-out:     ${reservaData.data_checkout}
  Número de Adultos:     ${reservaData.numero_adulto}
  Número de Crianças:    ${reservaData.numero_crianca}
  Valor da Diária:       R$ ${reservaData.valor_diaria}
  Pago:                  ${reservaData.pago}
  Observações:           ${reservaData.observacoes}

  ===============================
           Pousada Hospeda Fácil
  ===============================
    `;
    
    const blob = new Blob([reservaText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `Reserva_${nomeHospede}.txt`); // Nome do arquivo com base no nome do hóspede
};
