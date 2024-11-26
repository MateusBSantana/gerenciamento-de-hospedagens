import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarHeader = ({ startDate, endDate, setStartDate, setEndDate }) => {
  // Função para validar as datas
  const validateDates = (newStartDate, newEndDate) => {
    if (newStartDate > newEndDate) {
      alert('A data inicial não pode ser maior que a data final.');
      return false;
    }
    return true;
  };

  // Manipula o clique no botão "Anterior"
  const handlePreviousPeriod = () => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(startDate);
    newStartDate.setMonth(newStartDate.getMonth() - 1); // Subtrai 1 mês
    newEndDate.setMonth(newStartDate.getMonth() + 1); // Adiciona 1 mês ao início

    if (validateDates(newStartDate, newEndDate)) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    }
  };

  // Manipula o clique no botão "Próximo"
  const handleNextPeriod = () => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(startDate);
    newStartDate.setMonth(newStartDate.getMonth() + 1); // Adiciona 1 mês
    newEndDate.setMonth(newStartDate.getMonth() + 1); // Adiciona 1 mês ao início

    if (validateDates(newStartDate, newEndDate)) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    }
  };

  return (
    <>
      {/* Cabeçalho fixo, acima do mapa */}
      <div
        className="position-fixed top-0 start-50 translate-middle-x bg-light border py-3 px-4 rounded shadow-lg d-flex justify-content-center align-items-center gap-3"
        style={{
          zIndex: 1050,
          width: '50%', // Para ajustar o tamanho do cabeçalho
        }}
      >
        <button className="btn btn-secondary" onClick={handlePreviousPeriod}>
          Anterior
        </button>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            const newEndDate = new Date(date);
            newEndDate.setMonth(newEndDate.getMonth() + 1); // Garante um mês de intervalo
            if (validateDates(date, newEndDate)) {
              setStartDate(date);
              setEndDate(newEndDate);
            }
          }}
          dateFormat="dd/MM/yyyy"
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="form-control"
        />
        <span>à</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            const newStartDate = new Date(date);
            newStartDate.setMonth(newStartDate.getMonth() - 1); // Garante um mês de intervalo
            if (validateDates(newStartDate, date)) {
              setEndDate(date);
              setStartDate(newStartDate);
            }
          }}
          dateFormat="dd/MM/yyyy"
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          className="form-control"
        />
        <button className="btn btn-secondary" onClick={handleNextPeriod}>
          Próximo
        </button>
      </div>

      {/* Espaço reservado para evitar que o cabeçalho sobreponha o mapa */}
      <div style={{ height: '100px' }}></div>
    </>
  );
};

export default CalendarHeader;
