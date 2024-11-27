import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Filters from './Filters';  // Componente de filtros
import ReportCard from './ReportCard';  // Componente para exibir as métricas
import Header from './Header';  // Componente de cabeçalho
import './css.css';  // Arquivo CSS para estilos

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registre os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Estado para armazenar os valores de estatísticas
  const [ocupacao, setOcupacao] = useState('75%');
  const [mediaPorDia, setMediaPorDia] = useState('12 Reservas/Dia');
  const [totalReservas, setTotalReservas] = useState('300 Reservas');
  const [chartData, setChartData] = useState([12, 19, 3, 5, 2]);  // Dados para o gráfico
  const [selectedMonth, setSelectedMonth] = useState('all'); // Estado para armazenar o mês selecionado

  // Função para atualizar as estatísticas e dados do gráfico com base no filtro
  const handleFilterChange = (year, month) => {
    console.log(`Ano: ${year}, Mês: ${month}`);
    setSelectedMonth(month); // Atualiza o estado com o mês selecionado

    // Lógica para atualizar as estatísticas e os dados do gráfico com base no filtro
    if (year === '2024' && month === 'all') {
      setOcupacao('80%');
      setMediaPorDia('15 Reservas/Dia');
      setTotalReservas('500 Reservas');
      setChartData([20, 25, 30, 35, 40]); // Dados para todos os meses
    } else if (year === '2023' && month === 'all') {
      setOcupacao('70%');
      setMediaPorDia('10 Reservas/Dia');
      setTotalReservas('350 Reservas');
      setChartData([10, 15, 20, 25, 30]); // Dados para todos os meses
    } else {
      setOcupacao('75%');
      setMediaPorDia('12 Reservas/Dia');
      setTotalReservas('300 Reservas');
      setChartData([12, 19, 3, 5, 2]); // Dados padrão
    }
  };

  // Filtra os dados do gráfico com base no mês selecionado
  const filteredData = selectedMonth === 'all' ? chartData : [chartData[selectedMonth]];

  // Rótulos do gráfico (meses)
  const monthLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'];

  // Filtra os rótulos com base no mês selecionado
  const filteredLabels = selectedMonth === 'all' ? monthLabels : [monthLabels[selectedMonth]];

  // Dados do gráfico
  const data = {
    labels: filteredLabels,  // Usando os rótulos filtrados
    datasets: [
      {
        label: 'Reservas',
        data: filteredData,  // Usando os dados filtrados
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opções do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Reservas Mensais',
      },
    },
  };

  return (
    <div className="container">
      <Header />  {/* Agora o Header é renderizado */}
      <Filters onFilterChange={handleFilterChange} />  {/* Passa a função de atualização para o filtro */}

      <div className="dashboard">
        <ReportCard title="Taxa de Ocupação" value={ocupacao} />
        <ReportCard title="Média por Dia" value={mediaPorDia} />
        <ReportCard title="Total de Reservas" value={totalReservas} />
      </div>

      <div className="chart-container">
        <h3>Gráfico de Reservas Mensais</h3>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
