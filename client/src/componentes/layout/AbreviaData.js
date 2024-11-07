function AbreviaData(dataBanco) {
    const data = new Date (dataBanco);
    const ano = data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', year: 'numeric' });
    const mes = data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', month: '2-digit' });
    const dia = data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit' });

  return (
    `${ano}-${mes}-${dia}`
  )
}

export default AbreviaData;
