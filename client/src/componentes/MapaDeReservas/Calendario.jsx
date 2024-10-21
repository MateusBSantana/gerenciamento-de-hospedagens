import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendario.css';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)));
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const generateDates = (start, end) => {
      const dateArray = [];
      let currentDate = new Date(start);

      while (currentDate <= end) {
        dateArray.push({
          date: currentDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setDates(dateArray);
    };

    generateDates(startDate, endDate);
  }, [startDate, endDate]);

  const rooms = ['Quarto 1', 'Quarto 2', 'Quarto 3', 'Quarto 4', 'Quarto 5', 'Quarto 6', 'Quarto 7', 'Quarto 8'];

  const [reservations, setReservations] = useState({
    'Quarto 1': [{ start: '21/10', end: '23/10', name: 'João', status: 'reservado' }, { start: '11/11', end: '13/11', name: 'Sofia', status: 'hospedado' }],
    'Quarto 2': [{ start: '24/10', end: '26/10', name: 'Maria', status: 'cancelada' }],
    'Quarto 3': [{ start: '27/10', end: '29/10', name: 'Pedro', status: 'finalizada' }],
    'Quarto 4': [{ start: '30/10', end: '01/11', name: 'Ana', status: 'reservado' }],
    'Quarto 5': [{ start: '02/11', end: '04/11', name: 'Carlos', status: 'hospedado' }],
    'Quarto 6': [{ start: '05/11', end: '07/11', name: 'Mariana', status: 'reservado' }],
    'Quarto 7': [{ start: '08/11', end: '10/11', name: 'Lucas', status: 'finalizada' }],
    'Quarto 8': [{ start: '11/11', end: '13/11', name: 'Sofia', status: 'cancelada' }],
  });

  const isDateInRange = (currentDate, start, end) => {
    const [startDay, startMonth] = start.split('/');
    const [endDay, endMonth] = end.split('/');
    const [currentDay, currentMonth] = currentDate.split('/');

    const startDate = new Date(2024, startMonth - 1, startDay);
    const endDate = new Date(2024, endMonth - 1, endDay);
    const checkDate = new Date(2024, currentMonth - 1, currentDay);

    return checkDate >= startDate && checkDate <= endDate;
  };

  const handleAddReservation = (room) => {
    const name = prompt('Enter reservation name:');
    const start = prompt('Enter start date (dd/mm):');
    const end = prompt('Enter end date (dd/mm):');
    const status = prompt('Enter reservation status (reservado/hospedado/finalizada/cancelada):');

    setReservations({
      ...reservations,
      [room]: [...(reservations[room] || []), { start, end, name, status }],
    });
  };

  const handlePreviousPeriod = () => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    newStartDate.setMonth(newStartDate.getMonth() - 1);
    newEndDate.setMonth(newEndDate.getMonth() - 1);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleNextPeriod = () => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    newStartDate.setMonth(newStartDate.getMonth() + 1);
    newEndDate.setMonth(newEndDate.getMonth() + 1);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reservado':
        return '#ADD8E6'; // Azul claro
      case 'hospedado':
        return '#0000FF'; // Azul
      case 'finalizada':
        return '#800080'; // Roxo
      case 'cancelada':
        return '#FF0000'; // Vermelho
      default:
        return '#FFFFFF'; // Branco
    }
  };

  return (
    <div className="container">
      <h2>Mapa de Reservas</h2>
      <div className="d-flex align-items-center mb-3">
        <button className="btn btn-secondary me-2" onClick={handlePreviousPeriod}>Anterior</button>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <span className="mx-2">à</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd/MM/yyyy"
          selectsEnd
          startDate={startDate}
          endDate={endDate}
        />
        <button className="btn btn-secondary ms-2" onClick={handleNextPeriod}>Próximo</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Dia/Mês</th>
            {dates.map((d) => (
              <th key={d.date}>{d.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room}>
              <td>{room}</td>
              {dates.map((d, index) => {
                const reservation = reservations[room]?.find((r) => isDateInRange(d.date, r.start, r.end));

                if (reservation && d.date === reservation.start) {
                  const startIdx = dates.findIndex((date) => date.date === reservation.start);
                  const endIdx = dates.findIndex((date) => date.date === reservation.end);
                  const colSpan = endIdx - startIdx + 1;

                  return (
                    <td
                      key={d.date}
                      colSpan={colSpan}
                      className="reservation-cell"
                    >
                      <button
                        className="reservation-button"
                        onClick={() => alert(`Reserva de ${reservation.name}`)}
                        style={{ 
                          position: 'absolute', 
                          top: '3px', 
                          right: '-30px', 
                          backgroundColor: getStatusColor(reservation.status), 
                          color: '#ffffff', 
                        }}
                      >
                        {reservation.name}
                      </button>
                    </td>
                  );
                }

                const isCoveredByReservation = reservations[room]?.some((r) => isDateInRange(d.date, r.start, r.end));
                if (!isCoveredByReservation) {
                  return <td key={d.date} onClick={() => handleAddReservation(room)}></td>;
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
