import { saveAs } from "file-saver";

export const txtReserva = (reservaData, nomeHospede, nomeAcomodacao) => {


      
    const reservaText = `
  ====================================
         🏨 DETALHES DA RESERVA 🏨
====================================

🔑 **INFORMAÇÕES DA RESERVA**:
------------------------------------
👤 **Hóspede:**           ${reservaData.nome_hospede}
🏠 **Acomodação:**        ${reservaData.nome}
📅 **Check-in:**          ${reservaData.data_checkin}
📅 **Check-out:**         ${reservaData.data_checkout}
👨‍👩‍👧‍👦 **Adultos:**          ${reservaData.numero_adulto}
🧒 **Crianças:**          ${reservaData.numero_crianca}
💵 **Valor da Diária:**    R$ ${reservaData.valor_diaria}
✅ **Pago:**              ${reservaData.pago ? 'Sim' : 'Não'}
📝 **Observações:**       ${reservaData.observacoes || 'Nenhuma'}
📌 **Status da Reserva:** ${reservaData.status_reserva}

====================================
       🌴 Pousada Hospeda Fácil 🌴
====================================

    `;
    
    const blob = new Blob([reservaText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `Reserva_${nomeHospede}.txt`); // Nome do arquivo com base no nome do hóspede
};
