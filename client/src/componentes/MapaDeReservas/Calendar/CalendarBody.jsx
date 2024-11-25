import React from 'react';
import './CalendarBody.css';

const CalendarBody = ({ dates, accommodations, reservations }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'reservado':
        return '#ADD8E6';
      case 'hospedado':
        return '#0000FF';
      case 'finalizada':
        return '#800080';
      case 'cancelada':
        return '#FF0000';
      default:
        return '#FFFFFF';
    }
  };

  const isDateInRange = (currentDate, start, end) => {
    if (!currentDate || !start || !end) return false;

    const [startDay, startMonth] = start.split('/');
    const [endDay, endMonth] = end.split('/');
    const [currentDay, currentMonth] = currentDate.split('/');

    const startDate = new Date(2024, startMonth - 1, startDay);
    const endDate = new Date(2024, endMonth - 1, endDay);
    const checkDate = new Date(2024, currentMonth - 1, currentDay);

    return checkDate >= startDate && checkDate <= endDate;
  };

  return (
    <div className="table-container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Acomodação</th>
            {dates.map((d) => (
              <th key={d.date}>{d.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {accommodations.map((accommodation) => {
            const roomReservations = reservations[accommodation.nome] || [];

            return (
              <tr key={accommodation.id}>
                <td>{accommodation.nome}</td>
                {dates.map((d, index) => {
                  const reservation = roomReservations.find((r) =>
                    isDateInRange(d.date, r.start, r.end)
                  );

                  if (reservation) {
                    const startIdx = dates.findIndex((date) => date.date === reservation.start);
                    const endIdx = dates.findIndex((date) => date.date === reservation.end);

                    // Caso seja o primeiro dia da reserva
                    if (d.date === reservation.start) {
                      return (
                        <td
                          key={d.date}
                          style={{
                            position: 'relative',
                            padding: 0,
                            zIndex: 0,
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: getStatusColor(reservation.status),
                              position: 'absolute',
                              top: '25%',
                              left: '50%',
                              width: '50%',
                              height: '50%',
                              borderRadius: '10px 0 0 10px',
                              zIndex: 1,
                            }}
                          ></div>
                        </td>
                      );
                    }

                    // Caso seja o último dia da reserva
                    if (d.date === reservation.end) {
                      return (
                        <td
                          key={d.date}
                          style={{
                            position: 'relative',
                            padding: 0,
                            zIndex: 0,
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: getStatusColor(reservation.status),
                              position: 'absolute',
                              top: '25%',
                              left: '0%',
                              width: '50%',
                              height: '50%',
                              borderRadius: '0 10px 10px 0',
                              zIndex: 1,
                            }}
                          ></div>
                        </td>
                      );
                    }

                    // Caso seja um dia intermediário
                    if (index > startIdx && index < endIdx) {
                      return (
                        <td
                          key={d.date}
                          style={{
                            position: 'relative',
                            padding: 0,
                            zIndex: 0,
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: getStatusColor(reservation.status),
                              position: 'absolute',
                              top: '25%',
                              left: '0',
                              width: '100%',
                              height: '50%',
                              borderRadius: '0',
                              zIndex: 1,
                            }}
                          ></div>
                        </td>
                      );
                    }
                  }
                  // Renderiza células vazias normalmente
                  return <td key={d.date}></td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarBody;
