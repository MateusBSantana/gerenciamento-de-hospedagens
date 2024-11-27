import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('all');

  // Função para lidar com a mudança no filtro
  const handleYearChange = (e) => {
    setYear(e.target.value);
    onFilterChange(e.target.value, month); // Chama a função de mudança de filtro
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    onFilterChange(year, e.target.value); // Chama a função de mudança de filtro
  };

  return (
    <div className="filters">
      <label>
        Ano:
        <select value={year} onChange={handleYearChange}>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </label>
      <label>
        Mês:
        <select value={month} onChange={handleMonthChange}>
          <option value="all">Todos</option>
          <option value="0">Janeiro</option>
          <option value="1">Fevereiro</option>
          <option value="2">Março</option>
          <option value="3">Abril</option>
          <option value="4">Maio</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
