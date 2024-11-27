import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarHeader = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const validateDates = (newStartDate, newEndDate) => {
    if (newStartDate > newEndDate) {
      alert('A data inicial não pode ser maior que a data final.');
      return false;
    }
    return true;
  };

  const handlePreviousPeriod = () => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(startDate);
    newStartDate.setMonth(newStartDate.getMonth() - 1);
    newEndDate.setMonth(newStartDate.getMonth() + 1);

    if (validateDates(newStartDate, newEndDate)) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    }
  };

  const handleNextPeriod = () => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(startDate);
    newStartDate.setMonth(newStartDate.getMonth() + 1);
    newEndDate.setMonth(newStartDate.getMonth() + 1);

    if (validateDates(newStartDate, newEndDate)) {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    }
  };

  return (
    <>
      {/* Cabeçalho fixo no topo da tela */}
      <div
        className="position-fixed start-50 translate-middle-x bg-light border py-3 px-4 rounded shadow-lg d-flex flex-column align-items-center gap-3"
        style={{
          zIndex: 1050,
          width: '50%', // Ajusta o tamanho do cabeçalho
          top: '20px', // Coloca o componente no topo da tela
        }}
      >
        {/* Título do componente */}
        <h1 className="mb-3">Mapa de Reserva</h1>

        {/* Botões e campos de data */}
        <div className="d-flex justify-content-center align-items-center gap-3 w-100">
          <button className="btn btn-secondary" onClick={handlePreviousPeriod}>
            Anterior
          </button>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              const newEndDate = new Date(date);
              newEndDate.setMonth(newEndDate.getMonth() + 1);
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
              newStartDate.setMonth(newStartDate.getMonth() - 1);
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
      </div>

      {/* Espaço reservado para evitar que o cabeçalho sobreponha o mapa */}
      <div style={{ height: '150px' }}></div>
    </>
  );
};

export default CalendarHeader;
