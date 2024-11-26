import { saveAs } from "file-saver";

export const txtReserva = (reservaData, nomeHospede, nomeAcomodacao) => {

  function formatDateToDash(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Formatar datas de check-in e check-out
  const formattedCheckin = formatDateToDash(reservaData.data_checkin);
  const formattedCheckout = formatDateToDash(reservaData.data_checkout);

  const reservaText = `
  ====================================
         🏨 DETALHES DA RESERVA 🏨
====================================

🔑 **INFORMAÇÕES DA RESERVA**:
------------------------------------
👤 **Hóspede:**           ${reservaData.nome_hospede}
🏠 **Acomodação:**        ${reservaData.nome}
📅 **Check-in:**          ${formattedCheckin}
📅 **Check-out:**         ${formattedCheckout}
👨‍👩‍👧‍👦 **Adultos:**          ${reservaData.numero_adulto}
🧒 **Crianças:**          ${reservaData.numero_crianca}
💵 **Valor da Diária:**    R$ ${reservaData.valor_diaria}
✅ **Pago:**              ${reservaData.pago ? 'Sim' : 'Não'}
📝 **Observações:**       ${reservaData.observacoes || 'Nenhuma'}
📌 **Status da Reserva:** ${reservaData.status_reserva}

====================================
       🌴 Hospeda Fácil 🌴
====================================

    `;
    
  const blob = new Blob([reservaText], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `Reserva_${nomeHospede}.txt`); // Nome do arquivo com base no nome do hóspede
};
